import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from '../config/env.js';

const activeKey = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_PUBLISHABLE_KEY;

export const hasServiceRoleKey = Boolean(env.SUPABASE_SERVICE_ROLE_KEY);

// Primary backend Supabase client.
// Uses the Service Role Key when configured (bypassing RLS for server-side operations),
// or the Publishable/Anon Key as fallback.
export const supabase: SupabaseClient = createClient(env.SUPABASE_URL, activeKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

/**
 * Creates a user-scoped Supabase client that forwards the student's JWT.
 * This guarantees proper Row Level Security (RLS) enforcement where auth.uid()
 * is matched, even when SUPABASE_SERVICE_ROLE_KEY is not configured.
 */
export function createUserClient(token: string): SupabaseClient {
  return createClient(env.SUPABASE_URL, env.SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}
