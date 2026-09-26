-- 1. Newsletter Subscribers Table (Landing Page)
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
GRANT INSERT ON public.newsletter_subscribers TO anon, authenticated;
GRANT SELECT ON public.newsletter_subscribers TO service_role;

DROP POLICY IF EXISTS "Anyone can subscribe to the newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe to the newsletter"
ON public.newsletter_subscribers FOR INSERT TO anon, authenticated
WITH CHECK (true);

-- 2. Live Study Sessions Table
CREATE TABLE IF NOT EXISTS public.live_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    host_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    topic TEXT,
    status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'ended')),
    scheduled_at TIMESTAMP WITH TIME ZONE,
    started_at TIMESTAMP WITH TIME ZONE,
    ended_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS live_sessions_status_scheduled_idx ON public.live_sessions (status, scheduled_at ASC);
CREATE INDEX IF NOT EXISTS live_sessions_host_id_idx ON public.live_sessions (host_id);

ALTER TABLE public.live_sessions ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.live_sessions TO authenticated;

DROP POLICY IF EXISTS "Authenticated users can view live sessions" ON public.live_sessions;
CREATE POLICY "Authenticated users can view live sessions"
ON public.live_sessions FOR SELECT TO authenticated
USING (true);

DROP POLICY IF EXISTS "Authenticated users can create sessions" ON public.live_sessions;
CREATE POLICY "Authenticated users can create sessions"
ON public.live_sessions FOR INSERT TO authenticated
WITH CHECK ((select auth.uid()) = host_id);

DROP POLICY IF EXISTS "Hosts can update their own sessions" ON public.live_sessions;
CREATE POLICY "Hosts can update their own sessions"
ON public.live_sessions FOR UPDATE TO authenticated
USING ((select auth.uid()) = host_id)
WITH CHECK ((select auth.uid()) = host_id);

DROP POLICY IF EXISTS "Hosts can delete their own sessions" ON public.live_sessions;
CREATE POLICY "Hosts can delete their own sessions"
ON public.live_sessions FOR DELETE TO authenticated
USING ((select auth.uid()) = host_id);

-- 3. Live Session Participants Table
CREATE TABLE IF NOT EXISTS public.live_session_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES public.live_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'participant' CHECK (role IN ('host', 'co-host', 'participant')),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    left_at TIMESTAMP WITH TIME ZONE,
    UNIQUE (session_id, user_id)
);

CREATE INDEX IF NOT EXISTS live_session_participants_session_idx ON public.live_session_participants (session_id);
CREATE INDEX IF NOT EXISTS live_session_participants_user_idx ON public.live_session_participants (user_id);

ALTER TABLE public.live_session_participants ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.live_session_participants TO authenticated;

DROP POLICY IF EXISTS "Authenticated users can view session participants" ON public.live_session_participants;
CREATE POLICY "Authenticated users can view session participants"
ON public.live_session_participants FOR SELECT TO authenticated
USING (true);

DROP POLICY IF EXISTS "Users can manage their own participation" ON public.live_session_participants;
CREATE POLICY "Users can manage their own participation"
ON public.live_session_participants FOR ALL TO authenticated
USING ((select auth.uid()) = user_id)
WITH CHECK ((select auth.uid()) = user_id);

-- 4. Live Session Chat Messages Table
CREATE TABLE IF NOT EXISTS public.live_session_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES public.live_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL CHECK (char_length(trim(content)) > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS live_session_messages_session_idx ON public.live_session_messages (session_id, created_at ASC);

ALTER TABLE public.live_session_messages ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.live_session_messages TO authenticated;

DROP POLICY IF EXISTS "Participants can view session messages" ON public.live_session_messages;
CREATE POLICY "Participants can view session messages"
ON public.live_session_messages FOR SELECT TO authenticated
USING (true);

DROP POLICY IF EXISTS "Users can insert their own messages" ON public.live_session_messages;
CREATE POLICY "Users can insert their own messages"
ON public.live_session_messages FOR INSERT TO authenticated
WITH CHECK ((select auth.uid()) = user_id);

-- 5. Realtime Publication Enablement (for live room chat & participant syncing)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.live_sessions;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.live_session_participants;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.live_session_messages;
  END IF;
END $$;
