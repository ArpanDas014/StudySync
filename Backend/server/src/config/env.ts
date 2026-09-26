import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env file
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(3001),
  CLIENT_URL: z.string().default('http://localhost:5173'),

  // Supabase Configuration
  SUPABASE_URL: z.string().url('SUPABASE_URL must be a valid HTTPS URL'),
  SUPABASE_PUBLISHABLE_KEY: z.string().min(1, 'SUPABASE_PUBLISHABLE_KEY is required'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

  // LiveKit Configuration
  LIVEKIT_API_KEY: z.string().optional(),
  LIVEKIT_API_SECRET: z.string().optional(),
});

function parseEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Invalid or missing environment configuration:');
    for (const issue of result.error.issues) {
      console.error(`   - ${issue.path.join('.')}: ${issue.message}`);
    }
    // In production or test, fail immediately so bad deployments don't run in an invalid state
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    // In development, throw to alert developer immediately
    throw new Error('Server startup aborted due to invalid environment variables.');
  }

  const parsed = result.data;

  // Additional production checks
  if (parsed.NODE_ENV === 'production') {
    if (!parsed.SUPABASE_SERVICE_ROLE_KEY) {
      console.warn('⚠️ WARNING: SUPABASE_SERVICE_ROLE_KEY is not defined. Admin queries may fail due to Supabase RLS.');
    }
    if (!parsed.LIVEKIT_API_KEY || !parsed.LIVEKIT_API_SECRET) {
      console.warn('⚠️ WARNING: LIVEKIT_API_KEY or LIVEKIT_API_SECRET is missing. WebRTC live sessions will be disabled.');
    }
  }

  return parsed;
}

export const env = parseEnv();
export type Env = z.infer<typeof envSchema>;
