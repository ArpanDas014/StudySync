# StudySync

StudySync is a student-first learning workspace for resources, planning, and guided AI support.

## Current foundation

- Responsive React + Vite + TypeScript client implementing the landing page, dashboard, library, planner, AI assistant, groups, and settings surfaces.
- Node.js + Fastify API with a health endpoint.
- Supabase local configuration and a first private-library migration with Row-Level Security and private Storage policies.

## Run locally

1. Copy `.env.example` to `.env.local` and add Supabase values when the dedicated StudySync project is available.
2. Install dependencies with `npm install`.
3. Start the client with `npm run dev:client`.
4. Start the API separately with `npm run dev:server`.

The client runs at `http://localhost:5173`; the API health check is at `http://localhost:3001/health`.

## Before applying the migration

The migration at `supabase/migrations/20260721181756_initial_private_library.sql` creates the first private-library data model and Storage policies. Link or create the dedicated StudySync Supabase project first; do not apply it to an unrelated project.
