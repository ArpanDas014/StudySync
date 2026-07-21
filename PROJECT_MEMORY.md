# StudySync Project Memory

## Locked technology decision

StudySync uses a separated TypeScript architecture:

- **Client:** React, Vite, TypeScript, and Tailwind CSS.
- **Server API:** Node.js, TypeScript, and Fastify. Express may be used only if there is a clear project reason.
- **Platform services:** Supabase Postgres, Auth, Storage, and Realtime.
- **AI:** Provider calls run only on the Node.js server; browser code must never contain AI or Supabase service-role secrets.

## Working rules

- Keep `client/`, `server/`, and `packages/shared/` separate.
- Share API contracts, TypeScript types, and validation schemas through `packages/shared/`.
- Keep privileged actions in the server API, including AI, signed-upload authorization, moderation, rate-limited workflows, and service-role operations.
- Use Supabase Row-Level Security as a database-level authorization boundary.

## Current implementation state

- The responsive Vite client is implemented with the warm academic UI system from `StudySync_UI_UX_Design_Logic_Blueprint.md`.
- The Node.js/Fastify API currently exposes `GET /health` at port `3001`.
- The initial private-library migration is prepared locally under `supabase/migrations/` but must only be applied after a dedicated StudySync Supabase project is selected or created.
