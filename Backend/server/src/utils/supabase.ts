import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('⚠️ SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing. Supabase client will not work properly.');
}

// We use the service role key on the backend to bypass RLS when performing admin actions, 
// OR we can pass the user's JWT to authenticate as them.
export const supabase = createClient(supabaseUrl, supabaseServiceKey);
