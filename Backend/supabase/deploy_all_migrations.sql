-- ====================================================================
-- StudySync: Consolidated Database Migrations & Production Schema
-- Safe & Idempotent (Can be run safely in Supabase SQL Editor)
-- ====================================================================

-- ====================================================================
-- 1. Initial Private Library, Profiles & Resources Schema
-- ====================================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text check (char_length(trim(display_name)) between 1 and 80),
  timezone text not null default 'UTC',
  onboarding_completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 1 and 100),
  slug text,
  is_canonical boolean not null default false,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (created_by, name)
);

create table if not exists public.user_subjects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete restrict,
  priority smallint not null default 3 check (priority between 1 and 5),
  target_date date,
  created_at timestamptz not null default now(),
  unique (user_id, subject_id)
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(trim(title)) between 1 and 180),
  description text,
  resource_type text not null check (resource_type in ('pdf', 'image', 'text', 'video_link')),
  subject_id uuid references public.subjects(id) on delete set null,
  visibility text not null default 'private' check (visibility = 'private'),
  processing_status text not null default 'uploading' check (processing_status in ('uploading', 'processing', 'ready', 'failed', 'quarantined')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.resource_files (
  id uuid primary key default gen_random_uuid(),
  resource_id uuid not null references public.resources(id) on delete cascade,
  storage_bucket text not null default 'resource-originals' check (storage_bucket = 'resource-originals'),
  storage_path text not null unique,
  original_filename text not null,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0 and size_bytes <= 52428800),
  created_at timestamptz not null default now()
);

create index if not exists resources_owner_created_at_idx on public.resources (owner_id, created_at desc) where deleted_at is null;
create index if not exists resources_subject_created_at_idx on public.resources (subject_id, created_at desc) where deleted_at is null;
create index if not exists resource_files_resource_id_idx on public.resource_files (resource_id);

alter table public.profiles enable row level security;
alter table public.subjects enable row level security;
alter table public.user_subjects enable row level security;
alter table public.resources enable row level security;
alter table public.resource_files enable row level security;

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.subjects to authenticated;
grant select, insert, update, delete on public.user_subjects to authenticated;
grant select, insert, update, delete on public.resources to authenticated;
grant select, insert, update, delete on public.resource_files to authenticated;

-- Policies for Profiles & Library
drop policy if exists "Users can read their profile" on public.profiles;
create policy "Users can read their profile"
on public.profiles for select to authenticated
using ((select auth.uid()) = id);

drop policy if exists "Users can create their profile" on public.profiles;
create policy "Users can create their profile"
on public.profiles for insert to authenticated
with check ((select auth.uid()) = id);

drop policy if exists "Users can update their profile" on public.profiles;
create policy "Users can update their profile"
on public.profiles for update to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

drop policy if exists "Users can read canonical or own subjects" on public.subjects;
create policy "Users can read canonical or own subjects"
on public.subjects for select to authenticated
using (is_canonical or (select auth.uid()) = created_by);

drop policy if exists "Users can create custom subjects" on public.subjects;
create policy "Users can create custom subjects"
on public.subjects for insert to authenticated
with check ((select auth.uid()) = created_by and not is_canonical);

drop policy if exists "Users can update custom subjects" on public.subjects;
create policy "Users can update custom subjects"
on public.subjects for update to authenticated
using ((select auth.uid()) = created_by and not is_canonical)
with check ((select auth.uid()) = created_by and not is_canonical);

drop policy if exists "Users can delete custom subjects" on public.subjects;
create policy "Users can delete custom subjects"
on public.subjects for delete to authenticated
using ((select auth.uid()) = created_by and not is_canonical);

drop policy if exists "Users can manage their subject preferences" on public.user_subjects;
create policy "Users can manage their subject preferences"
on public.user_subjects for all to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can manage private resources" on public.resources;
create policy "Users can manage private resources"
on public.resources for all to authenticated
using ((select auth.uid()) = owner_id)
with check ((select auth.uid()) = owner_id and visibility = 'private');

drop policy if exists "Users can manage files for their resources" on public.resource_files;
create policy "Users can manage files for their resources"
on public.resource_files for all to authenticated
using (exists (
  select 1 from public.resources
  where resources.id = resource_files.resource_id
    and resources.owner_id = (select auth.uid())
))
with check (exists (
  select 1 from public.resources
  where resources.id = resource_files.resource_id
    and resources.owner_id = (select auth.uid())
));

-- Storage Bucket setup
insert into storage.buckets (id, name, public)
values ('resource-originals', 'resource-originals', false)
on conflict (id) do update set public = false;

drop policy if exists "Users can upload their private resource files" on storage.objects;
create policy "Users can upload their private resource files"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'resource-originals'
  and (storage.foldername(name))[1] = (select auth.jwt()->>'sub')
);

drop policy if exists "Users can read their private resource files" on storage.objects;
create policy "Users can read their private resource files"
on storage.objects for select to authenticated
using (
  bucket_id = 'resource-originals'
  and (storage.foldername(name))[1] = (select auth.jwt()->>'sub')
);

drop policy if exists "Users can update their private resource files" on storage.objects;
create policy "Users can update their private resource files"
on storage.objects for update to authenticated
using (
  bucket_id = 'resource-originals'
  and (storage.foldername(name))[1] = (select auth.jwt()->>'sub')
)
with check (
  bucket_id = 'resource-originals'
  and (storage.foldername(name))[1] = (select auth.jwt()->>'sub')
);

drop policy if exists "Users can delete their private resource files" on storage.objects;
create policy "Users can delete their private resource files"
on storage.objects for delete to authenticated
using (
  bucket_id = 'resource-originals'
  and (storage.foldername(name))[1] = (select auth.jwt()->>'sub')
);


-- ====================================================================
-- 2. Tasks & Deadlines Schema
-- ====================================================================

create table if not exists public.tasks (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    title text not null,
    completed boolean default false,
    subject text default 'General',
    priority text default 'medium' check (priority in ('high', 'medium', 'low')),
    duration integer default 60,
    start_time time,
    date date default current_date,
    status text default 'backlog' check (status in ('backlog', 'scheduled', 'completed')),
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create index if not exists tasks_user_id_idx on public.tasks (user_id);
create index if not exists tasks_user_date_idx on public.tasks (user_id, date);

alter table public.tasks enable row level security;
grant select, insert, update, delete on public.tasks to authenticated;

drop policy if exists "Users can view their own tasks" on public.tasks;
create policy "Users can view their own tasks" 
on public.tasks for select to authenticated 
using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert their own tasks" on public.tasks;
create policy "Users can insert their own tasks" 
on public.tasks for insert to authenticated 
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own tasks" on public.tasks;
create policy "Users can update their own tasks" 
on public.tasks for update to authenticated 
using ((select auth.uid()) = user_id) 
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own tasks" on public.tasks;
create policy "Users can delete their own tasks" 
on public.tasks for delete to authenticated 
using ((select auth.uid()) = user_id);


-- ====================================================================
-- 3. Profile Schema Additions & Automatic Registration Trigger
-- ====================================================================

alter table public.profiles
add column if not exists full_name text,
add column if not exists username text,
add column if not exists role text default 'student',
add column if not exists domain text default 'Computer Science',
add column if not exists level integer default 1,
add column if not exists xp integer default 0,
add column if not exists avatar_url text,
add column if not exists bio text default 'I am a passionate student eager to learn and grow.',
add column if not exists college text,
add column if not exists degree text,
add column if not exists semester text,
add column if not exists location text,
add column if not exists learning_goal text,
add column if not exists skills text[] default array['HTML', 'CSS', 'Problem Solving']::text[],
add column if not exists languages text[] default array[]::text[],
add column if not exists technologies text[] default array[]::text[],
add column if not exists interests text[] default array[]::text[],
add column if not exists github text,
add column if not exists portfolio text,
add column if not exists linkedin text;

alter table public.profiles alter column display_name drop not null;

-- Trigger to automatically populate profile when a user signs up via Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (
    id,
    display_name,
    full_name,
    avatar_url
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do update set
    full_name = coalesce(public.profiles.full_name, excluded.full_name),
    avatar_url = coalesce(public.profiles.avatar_url, excluded.avatar_url);
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at_column();


-- ====================================================================
-- 4. Newsletter & Live Study Sessions Schema
-- ====================================================================

-- 4.1 Newsletter Subscribers Table
create table if not exists public.newsletter_subscribers (
    id uuid primary key default gen_random_uuid(),
    email text not null unique,
    created_at timestamptz default now()
);

alter table public.newsletter_subscribers enable row level security;
grant insert on public.newsletter_subscribers to anon, authenticated;
grant select on public.newsletter_subscribers to service_role;

drop policy if exists "Anyone can subscribe to the newsletter" on public.newsletter_subscribers;
create policy "Anyone can subscribe to the newsletter"
on public.newsletter_subscribers for insert to anon, authenticated
with check (true);

-- 4.2 Live Study Sessions Table
create table if not exists public.live_sessions (
    id uuid primary key default gen_random_uuid(),
    host_id uuid not null references auth.users(id) on delete cascade,
    title text not null,
    description text,
    topic text,
    status text not null default 'scheduled' check (status in ('scheduled', 'live', 'ended')),
    scheduled_at timestamptz,
    started_at timestamptz,
    ended_at timestamptz,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create index if not exists live_sessions_status_scheduled_idx on public.live_sessions (status, scheduled_at asc);
create index if not exists live_sessions_host_id_idx on public.live_sessions (host_id);

alter table public.live_sessions enable row level security;
grant select, insert, update, delete on public.live_sessions to authenticated;

drop policy if exists "Authenticated users can view live sessions" on public.live_sessions;
create policy "Authenticated users can view live sessions"
on public.live_sessions for select to authenticated
using (true);

drop policy if exists "Authenticated users can create sessions" on public.live_sessions;
create policy "Authenticated users can create sessions"
on public.live_sessions for insert to authenticated
with check ((select auth.uid()) = host_id);

drop policy if exists "Hosts can update their own sessions" on public.live_sessions;
create policy "Hosts can update their own sessions"
on public.live_sessions for update to authenticated
using ((select auth.uid()) = host_id)
with check ((select auth.uid()) = host_id);

drop policy if exists "Hosts can delete their own sessions" on public.live_sessions;
create policy "Hosts can delete their own sessions"
on public.live_sessions for delete to authenticated
using ((select auth.uid()) = host_id);

-- 4.3 Live Session Participants Table
create table if not exists public.live_session_participants (
    id uuid primary key default gen_random_uuid(),
    session_id uuid not null references public.live_sessions(id) on delete cascade,
    user_id uuid not null references auth.users(id) on delete cascade,
    role text not null default 'participant' check (role in ('host', 'co-host', 'participant')),
    joined_at timestamptz default now(),
    left_at timestamptz,
    unique (session_id, user_id)
);

create index if not exists live_session_participants_session_idx on public.live_session_participants (session_id);
create index if not exists live_session_participants_user_idx on public.live_session_participants (user_id);

alter table public.live_session_participants enable row level security;
grant select, insert, update, delete on public.live_session_participants to authenticated;

drop policy if exists "Authenticated users can view session participants" on public.live_session_participants;
create policy "Authenticated users can view session participants"
on public.live_session_participants for select to authenticated
using (true);

drop policy if exists "Users can manage their own participation" on public.live_session_participants;
create policy "Users can manage their own participation"
on public.live_session_participants for all to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- 4.4 Live Session Chat Messages Table
create table if not exists public.live_session_messages (
    id uuid primary key default gen_random_uuid(),
    session_id uuid not null references public.live_sessions(id) on delete cascade,
    user_id uuid not null references auth.users(id) on delete cascade,
    content text not null check (char_length(trim(content)) > 0),
    created_at timestamptz default now()
);

create index if not exists live_session_messages_session_idx on public.live_session_messages (session_id, created_at asc);

alter table public.live_session_messages enable row level security;
grant select, insert, update, delete on public.live_session_messages to authenticated;

drop policy if exists "Participants can view session messages" on public.live_session_messages;
create policy "Participants can view session messages"
on public.live_session_messages for select to authenticated
using (true);

drop policy if exists "Users can insert their own messages" on public.live_session_messages;
create policy "Users can insert their own messages"
on public.live_session_messages for insert to authenticated
with check ((select auth.uid()) = user_id);

-- 4.5 Enable Supabase Realtime Replication
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    alter publication supabase_realtime add table public.live_sessions;
    alter publication supabase_realtime add table public.live_session_participants;
    alter publication supabase_realtime add table public.live_session_messages;
  end if;
end $$;

-- 4.6 Refresh PostgREST schema cache
notify pgrst, 'reload schema';
