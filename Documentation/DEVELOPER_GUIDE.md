# Developer Onboarding & Contributing Guide — StudySync

---

## 1. Welcome to the StudySync Team!

Welcome to the **StudySync** engineering project. Whether you are building real-time WebRTC collaborative features, designing calm academic interfaces, or writing resilient backend APIs, this guide will get you up and coding in less than 10 minutes.

---

## 2. 10-Minute Quickstart

### 2.1 Prerequisites
Ensure you have installed:
- **Node.js**: v20 or v22 LTS (`node -v`)
- **npm**: v10+ (`npm -v`)
- **Git**: (`git --version`)

### 2.2 Clone & Install
```bash
# Clone the repository
git clone https://github.com/your-org/Study-Sync.git
cd Study-Sync

# Install Backend dependencies
cd Backend/server
npm install

# Install Frontend dependencies
cd ../../Frontend/StudySync
npm install
```

### 2.3 Setup Environment Files
In `Backend/server/.env`:
```env
PORT=3001
CLIENT_URL=http://localhost:5173
SUPABASE_URL=https://ajyfofikdqdectsumljb.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_TTxHM6mdc5b6vu7MzH5i8Q_HWaqXlX3
SUPABASE_SERVICE_ROLE_KEY=<ask-lead-for-service-key>
LIVEKIT_API_KEY=<ask-lead-for-livekit-key>
LIVEKIT_API_SECRET=<ask-lead-for-livekit-secret>
```

In `Frontend/StudySync/.env`:
```env
VITE_SUPABASE_URL=https://ajyfofikdqdectsumljb.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_TTxHM6mdc5b6vu7MzH5i8Q_HWaqXlX3
VITE_API_URL=http://localhost:3001
```

### 2.4 Run Locally
Start Backend (Terminal 1):
```bash
cd Backend/server
npm run dev
```

Start Frontend (Terminal 2):
```bash
cd Frontend/StudySync
npm run dev
```
Open your browser to `http://localhost:5173`.

---

## 3. Repository Anatomy

```
Study-Sync/
├── Backend/
│   ├── server/             # Node.js + Fastify API
│   │   ├── src/
│   │   │   ├── middleware/ # authMiddleware.ts (JWT verification)
│   │   │   ├── routes/     # userRoutes.ts, liveRoutes.ts, landingRoutes.ts
│   │   │   ├── utils/      # supabase.ts (Admin client)
│   │   │   ├── app.ts      # Fastify plugin registrations & CORS
│   │   │   └── server.ts   # Entry point
│   │   └── tsconfig.json
│   └── supabase/           # Database configurations and DDL
│       ├── config.toml     # Supabase CLI configuration
│       └── migrations/     # SQL files (20260721181756_initial_private_library.sql)
├── Documentation/          # Complete engineering documentation suite
└── Frontend/
    └── StudySync/          # React 19 + Vite client
        ├── src/
        │   ├── components/ # Shared components (GlobalHeader, Sidebar)
        │   ├── lib/        # supabase.ts (Browser client)
        │   ├── pages/      # LandingPage.tsx, Dashboard.tsx
        │   ├── *Mockup.tsx # LiveRoom, Planner, Quiz, Notes, Groups
        │   ├── styles.css  # Base styles
        │   ├── theme.css   # Dark/light mode design tokens
        │   └── App.tsx     # Client routing and shell layout
        └── vite.config.ts
```

---

## 4. Git & Branching Workflow

We follow a clean, trunk-based / feature-branch workflow:

```
main (Production)
 ▲
 │ (Release PR)
develop (Staging)
 ▲
 ├── feature/live-screen-share
 ├── fix/planner-timezone-offset
 └── docs/api-specification-update
```

### 4.1 Branch Naming Convention
- `feature/<short-description>`: New functional capabilities (e.g., `feature/ai-study-schedule`).
- `fix/<issue-name>`: Bug fixes (e.g., `fix/jwt-auth-header-parser`).
- `docs/<doc-name>`: Documentation updates (e.g., `docs/api-contracts`).
- `refactor/<module>`: Code restructuring without behavior change (e.g., `refactor/supabase-client`).

### 4.2 Commit Message Standards (Conventional Commits)
All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
```
<type>(<scope>): <short imperative summary>

[optional detailed body]
```

**Allowed Types**:
- `feat`: A new user-facing feature.
- `fix`: A bug fix.
- `docs`: Documentation only changes.
- `style`: Changes that do not affect the meaning of the code (white-space, formatting).
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `perf`: A code change that improves performance.
- `test`: Adding missing tests or correcting existing tests.
- `chore`: Changes to build process, dependency updates, or tooling.

*Example*:
```
feat(livekit): add screen sharing track support to LiveRoom
fix(auth): prevent role escalation in PUT /api/user/profile
docs(api): add OpenAPI documentation for newsletter subscribe
```

---

## 5. Coding Standards & Best Practices

### 5.1 TypeScript Conventions
- **Strict Mode**: `strict: true` is enabled across all `tsconfig.json` configurations.
- **No Implicit `any`**: Explicitly declare interfaces and types for props, route parameters, and API response envelopes.
- **Shared Types**: When defining entities used across both backend and frontend, maintain parity with the PostgreSQL database schema.

### 5.2 React 19 Client Guidelines
- **Functional Components**: Use modern React 19 functional components with TypeScript interfaces for props.
- **Lucide Icons**: Standardize on `lucide-react` for all iconography. Specify standard sizes: `size={16}` for inline actions, `size={20}` for headers, `size={24}` for primary feature icons.
- **Motion & Animations**: Use `framer-motion` for transitions. Avoid jarring, overly long animations; maintain durations between `0.2s` and `0.4s` with `ease: "easeOut"`.
- **CSS Design Tokens**: Never hardcode hex color values in inline styles. Always reference semantic CSS variables from `theme.css` (`var(--theme-bg)`, `var(--theme-text-primary)`).

### 5.3 Fastify Backend Guidelines
- **Async Route Handlers**: Always use `async (request, reply) => { ... }`.
- **Pre-Handler Hooks**: Protect routes with `fastify.addHook('preHandler', requireAuth)`.
- **Status Codes**: Always return explicit HTTP status codes (`reply.status(200).send(...)`, `reply.status(401).send(...)`).
- **Structured Logging**: Use `request.log.info()` or `request.log.error()` instead of `console.log()` to preserve structured Pino log context.

---

## 6. Pre-Pull Request Checklist

Before submitting a Pull Request, make sure you have:
1. Ran typechecking:
   ```bash
   cd Backend/server && npm run typecheck
   cd ../../Frontend/StudySync && npm run typecheck
   ```
2. Verified the production build succeeds without warnings:
   ```bash
   cd Frontend/StudySync && npm run build
   ```
3. Ensured no secrets or private keys (`.env`) are staged in git:
   ```bash
   git status
   ```
4. Tested all relevant views in both **Light Mode** and **Dark Mode**.
5. Verified keyboard navigation (`Ctrl+B`, `Tab`) functions without trapping focus.
