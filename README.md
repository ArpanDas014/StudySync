# StudySync

StudySync is a student-first learning workspace for resources, planning, and guided AI support.

## Current foundation

- Responsive React + Vite + TypeScript client located at `Frontend/StudySync`.
- Node.js + Fastify API located at `Backend/server` with a health endpoint.
- Supabase local configuration and migrations located at `Backend/supabase`.
- Comprehensive engineering & product documentation suite located at [`Documentation/INDEX.md`](./Documentation/INDEX.md).

## Project Structure

```
├── .github/
├── Backend/
│   ├── server/          # Node.js + Fastify API
│   └── supabase/        # Supabase config and SQL migrations
├── Documentation/       # Complete Engineering Docs Suite (PRD, SRS, Architecture, etc.)
├── Frontend/
│   └── StudySync/       # React + Vite frontend client
└── README.md
```

## Run locally

1. Configure environment variables (`.env` or `.env.local`) with your Supabase values.

### Frontend (`Frontend/StudySync`)
```bash
cd Frontend/StudySync
npm install
npm run dev
```
The client runs at `http://localhost:5173`.

### Backend (`Backend/server`)
```bash
cd Backend/server
npm install
npm run dev
```
The API health check runs at `http://localhost:3001/health`.

## Before applying the migration

The migration at `Backend/supabase/migrations/20260721181756_initial_private_library.sql` creates the first private-library data model and Storage policies. Link or create the dedicated StudySync Supabase project first; do not apply it to an unrelated project.
