# Deployment, DevOps & Infrastructure Guide — StudySync

---

## 1. System Prerequisites

Before running or deploying StudySync, ensure your development or hosting environment has the following tools installed:
- **Node.js**: `v20.x` or `v22.x LTS` (Check with `node -v`)
- **npm**: `v10.x+` (Check with `npm -v`)
- **Git**: `v2.40+`
- **Docker Desktop** (Optional, required only for local Supabase emulation): `v24.x+`
- **Supabase CLI** (Optional for local migrations): `v1.190+`

---

## 2. Environment Variables Reference

### 2.1 Backend Server Environment (`Backend/server/.env`)

| Variable Name | Required | Default / Example | Purpose |
| :--- | :--- | :--- | :--- |
| `PORT` | No | `3001` | Local port for Fastify server to listen on. |
| `CLIENT_URL` | Yes | `http://localhost:5173` | Allowed Origin for CORS requests from the React client. |
| `SUPABASE_URL` | Yes | `https://xyz.supabase.co` | HTTPS REST/API URL for Supabase project. |
| `SUPABASE_PUBLISHABLE_KEY`| Yes | `sb_publishable_...` | Public API key used for standard token validation. |
| `SUPABASE_SERVICE_ROLE_KEY`| Yes | `sb_secret_...` | Privileged admin key for backend operations. **Keep Secret**. |
| `LIVEKIT_API_KEY` | Yes | `API...` | API Key generated in LiveKit Cloud dashboard. |
| `LIVEKIT_API_SECRET` | Yes | `secret...` | Secret Key used to sign WebRTC room access tokens. **Keep Secret**. |

### 2.2 Frontend Client Environment (`Frontend/StudySync/.env`)

| Variable Name | Required | Default / Example | Purpose |
| :--- | :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Yes | `https://xyz.supabase.co` | Supabase project URL exposed to browser. |
| `VITE_SUPABASE_PUBLISHABLE_KEY`| Yes | `sb_publishable_...` | Supabase publishable anonymous key. |
| `VITE_API_URL` | Yes | `http://localhost:3001` | Fastify backend API root URL. |
| `VITE_LIVEKIT_URL` | Yes | `wss://studysync-xxx.livekit.cloud` | WebRTC SFU WebSocket signaling URL. |

---

## 3. Local Development Setup

### 3.1 Step 1: Clone & Install Dependencies
Clone the repository to your local machine:
```bash
git clone https://github.com/your-org/Study-Sync.git
cd Study-Sync
```

Install Backend dependencies:
```bash
cd Backend/server
npm install
```

Install Frontend dependencies:
```bash
cd ../../Frontend/StudySync
npm install
```

### 3.2 Step 2: Configure Environment Files
Create `Backend/server/.env`:
```env
PORT=3001
CLIENT_URL=http://localhost:5173
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_PUBLISHABLE_KEY=<your-publishable-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
LIVEKIT_API_KEY=<your-livekit-key>
LIVEKIT_API_SECRET=<your-livekit-secret>
```

Create `Frontend/StudySync/.env`:
```env
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your-publishable-key>
VITE_API_URL=http://localhost:3001
VITE_LIVEKIT_URL=wss://<your-project>.livekit.cloud
```

### 3.3 Step 3: Run the Development Servers

In Terminal 1 (Start Fastify Backend):
```bash
cd Backend/server
npm run dev
# Server will start on http://localhost:3001
# Health check available at http://localhost:3001/health
```

In Terminal 2 (Start React Client):
```bash
cd Frontend/StudySync
npm run dev
# Vite client will launch on http://localhost:5173
```

---

## 4. Supabase Database & Migration Operations

### 4.1 Applying Migrations to Remote Supabase Project
1. Log in to Supabase CLI:
   ```bash
   npx supabase login
   ```
2. Link your dedicated StudySync project:
   ```bash
   npx supabase link --project-ref <your-project-ref>
   ```
3. Push the prepared schema migration:
   ```bash
   npx supabase db push
   ```
   *Note: Applies `Backend/supabase/migrations/20260721181756_initial_private_library.sql`.*

### 4.2 Local Emulation (Docker)
To run Supabase entirely locally:
```bash
cd Backend/supabase
npx supabase start
# Local studio available at http://localhost:54323
# Local API at http://localhost:54321
```

---

## 5. LiveKit Cloud Setup

1. Create a free account at [livekit.io](https://livekit.io).
2. Create a new project titled **StudySync**.
3. In Project Settings, navigate to **Keys**:
   - Copy the **WebSocket URL** $\rightarrow$ assign to `VITE_LIVEKIT_URL` in Frontend `.env`.
   - Copy the **API Key** $\rightarrow$ assign to `LIVEKIT_API_KEY` in Backend `.env`.
   - Copy the **API Secret** $\rightarrow$ assign to `LIVEKIT_API_SECRET` in Backend `.env`.

---

## 6. Production Deployment Targets

```
┌─────────────────────────────────────────────────────────────┐
│ Frontend Client: Vercel / Netlify / Cloudflare Pages        │
│ - SPA Rewrites: All routes rewrite to /index.html           │
│ - Build Command: npm run build                              │
│ - Output Directory: dist                                    │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Backend API: Render / Railway / Google Cloud Run            │
│ - Dockerfile / Node.js 22 LTS container                     │
│ - Build Command: npm run build                              │
│ - Start Command: npm start (node dist/server.js)            │
│ - Host: 0.0.0.0, Port: $PORT                                │
└─────────────────────────────────────────────────────────────┘
```

### 6.1 Frontend SPA Rewrite Configuration (`vercel.json`)
For Vercel deployments, ensure client-side routing is supported:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 6.2 Backend Containerfile (`Backend/server/Dockerfile`)
```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci
COPY src/ ./src/
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3001
CMD ["node", "dist/server.js"]
```

---

## 7. Continuous Integration (CI) Pipeline

GitHub Actions workflow file located at `.github/workflows/ci.yml`:
```yaml
name: CI Quality Gate

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  backend-checks:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: Backend/server
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'
          cache-dependency-path: Backend/server/package.json
      - run: npm ci
      - run: npm run typecheck
      - run: npm run build

  frontend-checks:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: Frontend/StudySync
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'
          cache-dependency-path: Frontend/StudySync/package.json
      - run: npm ci
      - run: npm run typecheck
      - run: npm run build
```
