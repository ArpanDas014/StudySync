# Supabase Backend CI/CD Pipeline Setup Guide

This document describes the automated Continuous Integration (CI) and Continuous Deployment (CD) pipelines configured for StudySync's Supabase backend using GitHub Actions.

---

## 1. Pipeline Overview

The pipeline is split into two workflows located in `.github/workflows/`:

| Workflow | File | Trigger | Purpose |
| :--- | :--- | :--- | :--- |
| **Backend CI** | [`.github/workflows/backend-ci.yml`](file:///.github/workflows/backend-ci.yml) | Pull Requests to `main`, pushes touching `Backend/**`, or manual dispatch | Validates migrations on a clean local Supabase container, lints database schema & RLS policies, runs pgTAP tests, verifies TypeScript type generation, and validates backend server build & typecheck. |
| **Backend CD** | [`.github/workflows/backend-cd.yml`](file:///.github/workflows/backend-cd.yml) | Push to `main` (merges) modifying `Backend/supabase/**` or manual dispatch | Automatically links to your remote Supabase project and deploys new migrations via `supabase db push`. Supports manual dry-run previews. |

---

## 2. Required GitHub Repository Secrets

To enable automated deployments to your Supabase project, you need to configure 3 repository secrets in GitHub:

### Steps to Add Secrets:
1. Open your repository on GitHub: `https://github.com/<owner>/<repo>`
2. Go to **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret** and add the following:

| Secret Name | How to Get It | Description |
| :--- | :--- | :--- |
| `SUPABASE_ACCESS_TOKEN` | [Supabase Account Tokens](https://supabase.com/dashboard/account/tokens) -> Click **Generate New Token** | Personal Access Token authorizing GitHub Actions to manage your Supabase resources. |
| `SUPABASE_PROJECT_ID` | Supabase Dashboard -> Select your Project -> **Settings** (gear icon) -> **General** -> Copy **Reference ID** (e.g., `abcdefghijklmnopqrst`) | Unique project reference identifier. |
| `SUPABASE_DB_PASSWORD` | Supabase Dashboard -> **Settings** -> **Database** -> Database password | Password configured when the database was created (can be reset in Database Settings if forgotten). |

---

## 3. How the Workflows Function

### A. CI Workflow (`backend-ci.yml`)
Runs on every Pull Request and verifies that no broken schema or type changes reach `main`:
1. **Isolated Container Spin-up:** Runs `supabase start` in GitHub runner's native Docker daemon.
2. **Fresh Migration Verification:** Runs `supabase db reset`, executing all migrations from scratch (`Backend/supabase/migrations/`) and `Backend/supabase/seed.sql`.
3. **Database Linting:** Runs `supabase db lint` to detect security issues or bad practices (e.g. missing RLS on public tables).
4. **pgTAP Database Testing:** Runs `supabase test db` executing tests in `Backend/supabase/tests/database/` (verifies table existence and RLS flags).
5. **Type Verification:** Confirms `supabase gen types typescript` can generate types cleanly.
6. **Backend Server Verification:** Runs `npm ci`, `npm run typecheck`, and `npm run build` in `Backend/server` to ensure server code is in sync.

### B. CD Workflow (`backend-cd.yml`)
Runs automatically when a PR is merged into `main` touching `Backend/supabase/**`:
1. Installs Supabase CLI (`supabase/setup-cli@v1`).
2. Links to the remote Supabase project using `supabase link`.
3. Safely applies unapplied migrations using `supabase db push`.

#### Manual Dry-Run Option:
You can preview pending migrations without applying them:
1. Navigate to **Actions** in GitHub.
2. Select **Backend CD (Supabase Deploy)** in the sidebar.
3. Click **Run workflow**, check the **Dry run** checkbox, and click **Run workflow**.

---

## 4. Local Development Workflow

When modifying the database schema:

```bash
# 1. Create a new timestamped migration
cd Backend
npx supabase migration new your_feature_name

# 2. Add your SQL statements to the generated file in Backend/supabase/migrations/

# 3. Test migrations locally (if Docker is installed locally)
npx supabase db reset
npx supabase test db

# 4. Commit and push to a feature branch
git add supabase/migrations/
git commit -m "feat(db): add your_feature_name migration"
git push origin your-branch

# 5. Open a Pull Request to main -> GitHub Actions CI will automatically test and validate your changes!
```
