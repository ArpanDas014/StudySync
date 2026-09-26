# StudySync Documentation Hub

Welcome to the central engineering and product documentation hub for **StudySync** — a modern, student-first learning workspace integrating resource organization, smart calendar planning, real-time WebRTC collaborative study rooms, interactive quizzes, and AI-driven academic support.

---

## 📚 Documentation Index

| Document | Primary Audience | Description | Status |
| :--- | :--- | :--- | :--- |
| [**Product Requirements Document (PRD)**](./PRD_Product_Requirements_Document.md) | Product Managers, Designers, Stakeholders | Product vision, user personas, problem statements, feature hierarchy (MVP vs Phase 2), success metrics (KPIs), and user journeys. | `Complete` |
| [**Software Requirements Specification (SRS)**](./SRS_Software_Requirements_Specification.md) | Software Engineers, QA, System Architects | IEEE 830 / ISO/IEC/IEEE 29148 standard specification containing numbered functional requirements (`FR-xxx`) and non-functional requirements (`NFR-xxx`). | `Complete` |
| [**Architecture & System Design**](./ARCHITECTURE_SYSTEM_DESIGN.md) | Backend/Frontend Engineers, DevOps, Architects | C4 system architecture model, component topology, sequence diagrams (WebRTC handshake, RLS uploads, auth hydration), and tech stack rationale. | `Complete` |
| [**Database Design & Data Dictionary**](./DATABASE_DESIGN_DATA_DICTIONARY.md) | Backend Engineers, Database Administrators | Complete PostgreSQL schema definitions, Mermaid Entity-Relationship (ER) diagrams, column dictionaries, indexing strategy, and Row-Level Security (RLS) policies. | `Complete` |
| [**API Contract & Interface Specification**](./API_SPECIFICATION.md) | Frontend/Backend Engineers, API Consumers | OpenAPI 3.1-aligned REST API contracts (`/health`, `/api/user/*`, `/api/live/*`, `/api/newsletter/*`), status codes, payloads, and Supabase Realtime channels. | `Complete` |
| [**UI/UX Specification & Design System**](./UI_UX_SPECIFICATION_DESIGN_SYSTEM.md) | Frontend Engineers, UI/UX Designers | Design tokens (palette, typography, spacing), component state specifications, responsive drawer navigation, and view mockup catalog. | `Complete` |
| [**Security, Privacy & Compliance Guide**](./SECURITY_PRIVACY_COMPLIANCE.md) | SecOps, Backend Engineers, Compliance | Student data protection (FERPA, GDPR, COPPA principles), STRIDE threat model, zero-client-secret architecture, RLS security barriers, and rate limiting. | `Complete` |
| [**Deployment, DevOps & Environment Guide**](./DEPLOYMENT_DEVOPS_GUIDE.md) | DevOps, Full-Stack Engineers | Local developer environment setup, comprehensive `.env` dictionary, Supabase CLI operations, LiveKit server integration, and CI/CD pipelines. | `Complete` |
| [**Test Strategy & QA Plan**](./TEST_STRATEGY_QA_PLAN.md) | QA Engineers, Developers | Multi-tier test pyramid (Unit, Integration, E2E via Vitest/Playwright), WebRTC live room testing scenarios, acceptance criteria, and edge case matrices. | `Complete` |
| [**Developer Onboarding & Contributing Guide**](./DEVELOPER_GUIDE.md) | New Engineers, Open Source Contributors | 10-minute quickstart guide, repository anatomy, branch and commit conventions, pull request workflows, and coding standards. | `Complete` |

---

## 🧭 Role-Based Reading Paths

Depending on your role, we recommend following these reading paths to ramp up quickly:

### 🎯 For Product Managers & Designers
1. [Product Requirements Document (PRD)](./PRD_Product_Requirements_Document.md) — Understand core user journeys, personas, and phased feature scopes.
2. [UI/UX Specification & Design System](./UI_UX_SPECIFICATION_DESIGN_SYSTEM.md) — Review design tokens, view hierarchy, and responsive interaction behavior.
3. [Software Requirements Specification (SRS)](./SRS_Software_Requirements_Specification.md) — Inspect functional feature specifications.

### 💻 For Frontend Engineers
1. [Developer Onboarding & Contributing Guide](./DEVELOPER_GUIDE.md) — Set up `Frontend/StudySync` with Node.js and Vite.
2. [UI/UX Specification & Design System](./UI_UX_SPECIFICATION_DESIGN_SYSTEM.md) — Understand styling conventions, Framer Motion transitions, and Lucide icons.
3. [API Contract & Interface Specification](./API_SPECIFICATION.md) — Review REST endpoints, request types, and Supabase Realtime channels.
4. [Architecture & System Design](./ARCHITECTURE_SYSTEM_DESIGN.md) — Understand LiveKit client integration and Supabase client session management.

### ⚙️ For Backend & Database Engineers
1. [Architecture & System Design](./ARCHITECTURE_SYSTEM_DESIGN.md) — Explore the Fastify server structure, plugin architecture, and service boundaries.
2. [Database Design & Data Dictionary](./DATABASE_DESIGN_DATA_DICTIONARY.md) — Deep-dive into PostgreSQL tables, constraints, foreign keys, and RLS policies.
3. [API Contract & Interface Specification](./API_SPECIFICATION.md) — Review route implementations, JWT verification hooks, and LiveKit token generation.
4. [Security, Privacy & Compliance Guide](./SECURITY_PRIVACY_COMPLIANCE.md) — Verify RLS enforcement, role privilege checks, and CORS controls.

### 🚀 For DevOps & Infrastructure Engineers
1. [Deployment, DevOps & Environment Guide](./DEPLOYMENT_DEVOPS_GUIDE.md) — Review containerization, environment variables, Supabase CLI, and LiveKit setup.
2. [Security, Privacy & Compliance Guide](./SECURITY_PRIVACY_COMPLIANCE.md) — Inspect threat vectors, firewall rules, and secret hygiene.
3. [Test Strategy & QA Plan](./TEST_STRATEGY_QA_PLAN.md) — Configure CI/CD automated test runners and smoke tests.

---

## 🏛️ Foundational & Historical Documentation

In addition to this modular documentation suite, the repository preserves its founding architectural blueprints:
- [PROJECT_MEMORY.md](./PROJECT_MEMORY.md) — Fast reference of locked technical decisions (TypeScript, Fastify, Supabase, LiveKit).
- [StudySync_Blueprint.md](./StudySync_Blueprint.md) — The comprehensive 7,000-line master product dossier and concept encyclopedia.
- [StudySync_UI_UX_Design_Logic_Blueprint.md](./StudySync_UI_UX_Design_Logic_Blueprint.md) — Original UI/UX conceptual design blueprint.

---

## 🏗️ Repository Architecture Summary

```
Study-Sync/
├── .github/                      # CI/CD workflows and actions
├── Backend/
│   ├── server/                   # Fastify Node.js API (TypeScript)
│   │   ├── src/
│   │   │   ├── middleware/       # Auth JWT verification middleware
│   │   │   ├── routes/           # User, LiveKit, Newsletter, and Health routes
│   │   │   ├── utils/            # Supabase service client and helpers
│   │   │   ├── app.ts            # Fastify application builder
│   │   │   └── server.ts         # Fastify listener entry point
│   │   └── package.json
│   └── supabase/                 # Supabase local environment & migrations
│       ├── config.toml           # Supabase CLI configuration
│       └── migrations/           # SQL DDL & Row-Level Security policies
├── Documentation/                # Complete engineering & product docs suite
└── Frontend/
    └── StudySync/                # React 19 + Vite + TypeScript client
        ├── src/
        │   ├── components/       # Reusable layout and navigation components
        │   ├── lib/              # Client-side Supabase client singleton
        │   ├── pages/            # LandingPage and Dashboard views
        │   ├── *Mockup.tsx       # LiveRoom, Planner, Quizzes, Notes, Groups views
        │   └── App.tsx           # Client root with view routing & state
        └── package.json
```
