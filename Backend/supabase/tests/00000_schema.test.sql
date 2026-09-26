begin;
select plan(11);

-- 1-9: Check that core tables exist in the public schema
select has_table('public', 'profiles', 'Table public.profiles should exist');
select has_table('public', 'subjects', 'Table public.subjects should exist');
select has_table('public', 'user_subjects', 'Table public.user_subjects should exist');
select has_table('public', 'resources', 'Table public.resources should exist');
select has_table('public', 'resource_files', 'Table public.resource_files should exist');
select has_table('public', 'tasks', 'Table public.tasks should exist');
select has_table('public', 'live_sessions', 'Table public.live_sessions should exist');
select has_table('public', 'live_session_participants', 'Table public.live_session_participants should exist');
select has_table('public', 'newsletter_subscribers', 'Table public.newsletter_subscribers should exist');

-- 10-11: Check Row Level Security (RLS) is enabled on sensitive tables
select results_eq(
  $$ select relrowsecurity from pg_class where relname = 'profiles' and relnamespace = 'public'::regnamespace $$,
  $$ values (true) $$,
  'RLS should be enabled on public.profiles'
);

select results_eq(
  $$ select relrowsecurity from pg_class where relname = 'tasks' and relnamespace = 'public'::regnamespace $$,
  $$ values (true) $$,
  'RLS should be enabled on public.tasks'
);

select * from finish();
rollback;
