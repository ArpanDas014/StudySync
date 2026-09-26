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
