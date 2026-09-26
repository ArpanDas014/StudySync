# Software Requirements Specification (SRS) — StudySync

> **Standard:** Conforms to **IEEE Std 830-1998** / **ISO/IEC/IEEE 29148:2018**  
> **System Name:** StudySync Digital Learning Platform  
> **Status:** Approved Engineering Baseline  
> **Version:** 1.0.0  

---

## Table of Contents
1. [Introduction](#1-introduction)
   - 1.1 Purpose
   - 1.2 Document Conventions
   - 1.3 Intended Audience & Reading Suggestions
   - 1.4 Product Scope
   - 1.5 References
2. [Overall Description](#2-overall-description)
   - 2.1 Product Perspective
   - 2.2 Product Functions
   - 2.3 User Classes and Characteristics
   - 2.4 Operating Environment
   - 2.5 Design and Implementation Constraints
   - 2.6 User Documentation
   - 2.7 Assumptions and Dependencies
3. [External Interface Requirements](#3-external-interface-requirements)
   - 3.1 User Interfaces
   - 3.2 Hardware Interfaces
   - 3.3 Software Interfaces
   - 3.4 Communications Interfaces
4. [System Features & Functional Requirements](#4-system-features--functional-requirements)
   - 4.1 User Authentication & Profile Management (`FR-AUTH`, `FR-PROF`)
   - 4.2 Resource Library & Storage Management (`FR-RES`)
   - 4.3 Study Planner & Calendar Engine (`FR-PLAN`)
   - 4.4 Live Collaborative Video Study Rooms (`FR-LIVE`)
   - 4.5 Task Management System (`FR-TSK`)
   - 4.6 Study Groups & Social Communities (`FR-GRP`)
   - 4.7 Quiz & Practice Testing Engine (`FR-QUIZ`)
   - 4.8 Newsletter & Marketing Integration (`FR-NEWS`)
5. [Non-Functional Requirements](#5-non-functional-requirements)
   - 5.1 Performance Requirements (`NFR-PERF`)
   - 5.2 Security & Privacy Requirements (`NFR-SEC`)
   - 5.3 Reliability & Availability Requirements (`NFR-REL`)
   - 5.4 Usability & Accessibility Requirements (`NFR-ACC`)
   - 5.5 Maintainability & Portability Requirements (`NFR-MAIN`)
6. [Requirements Traceability Matrix](#6-requirements-traceability-matrix)

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) establishes the complete, authoritative functional and non-functional requirements for the **StudySync** platform. It defines operational boundaries, system interfaces, security policies, and performance criteria for frontend engineers, backend developers, QA testers, and infrastructure engineers.

### 1.2 Document Conventions
- **Requirement IDs**: Each requirement is prefixed by its domain (e.g., `FR-AUTH-001`, `NFR-SEC-002`).
- **Priority**: High (Must-have for baseline operations), Medium (Should-have for enhanced workflow), Low (Nice-to-have).
- **Keywords**: "SHALL" indicates mandatory requirements; "SHOULD" indicates recommendations; "MAY" indicates optional capabilities.

### 1.3 Intended Audience & Reading Suggestions
- **Developers**: Focus on Section 3 (External Interfaces), Section 4 (Functional Requirements), and Section 5 (Non-Functional Requirements).
- **QA Engineers**: Use Section 4 and Section 5 as the basis for test case generation and acceptance criteria.
- **Architects**: Focus on Section 2.1 (Product Perspective), Section 3 (Interfaces), and Section 5.2 (Security).

### 1.4 Product Scope
StudySync is a web application and progressive web app (PWA) facilitating student productivity. Major subsystems include:
1. User Authentication and Identity Management (Supabase Auth).
2. Private & Group Educational Resource Repository (PostgreSQL + Supabase Storage).
3. Constraint-aware Study Calendar and Daily Task Scheduler.
4. Interactive WebRTC Study Rooms (LiveKit Selective Forwarding Unit).
5. Self-assessment Quiz Engine and Flashcard System.
6. Real-time Community Group Collaboration.

### 1.5 References
- IEEE Std 830-1998: Recommended Practice for Software Requirements Specifications.
- RFC 8446: The Transport Layer Security (TLS) Protocol Version 1.3.
- RFC 8825: Overview: Real-Time Communication in Web Browsers (WebRTC).
- W3C Web Content Accessibility Guidelines (WCAG) 2.1 AA.
- StudySync Master Blueprint (`Documentation/StudySync_Blueprint.md`).

---

## 2. Overall Description

### 2.1 Product Perspective
StudySync operates as a multi-tier client-server architecture:
```
[Client Tier: React 19 + Vite SPA]
       │                 ▲
   HTTP/REST          WebSockets / WebRTC
       ▼                 ▼
[Application Tier: Fastify API Server] ──► [LiveKit Cloud / WebRTC SFU]
       │
   PostgreSQL / S3
       ▼
[Data Tier: Supabase Cloud (Postgres + Auth + Storage + Realtime)]
```

### 2.2 Product Functions Summary
- Provide single sign-on (SSO) and password authentication.
- Securely store and catalog course materials (PDF, images, plain text, code files).
- Generate, visualize, and modify daily/weekly study schedules.
- Connect 2 to 50 concurrent students in low-latency WebRTC video rooms with screen sharing and chat.
- Manage assignments with deadlines, priority tags, and completion tracking.
- Test subject retention via interactive multiple-choice quizzes.

### 2.3 User Classes and Characteristics
| User Class | Description | Technical Competency | Permissions |
| :--- | :--- | :--- | :--- |
| **Student (Standard)** | Primary end-user managing notes, schedules, and joining rooms. | Moderate (standard web/mobile user) | Full CRUD on own resources, read access to public groups. |
| **Group Moderator / Host** | Student who creates study groups or hosts live study rooms. | Moderate to High | Kick/mute participants in room, manage group memberships. |
| **System Administrator** | Platform operator monitoring abuse and system health. | High (Sysadmin / Engineer) | Service-role access to logs, reports, and moderation flags. |

### 2.4 Operating Environment
- **Client**: Modern Evergreen Web Browsers (Google Chrome 110+, Mozilla Firefox 115+, Apple Safari 16+, Microsoft Edge 110+).
- **Server Runtime**: Node.js v20.x or v22.x LTS on Linux (Ubuntu 22.04 LTS / Alpine Docker containers).
- **Database Engine**: PostgreSQL 15+ / 17+ with PostGIS and pgcrypto extensions on Supabase.
- **Media Engine**: LiveKit SFU v1.6+ supporting VP8/H.264 video and Opus audio codecs.

### 2.5 Design and Implementation Constraints
- **Zero Client Secrets**: Browser code SHALL NOT possess `SUPABASE_SERVICE_ROLE_KEY` or `LIVEKIT_API_SECRET`.
- **Database-Level Authorization**: Every multi-tenant database table SHALL implement Row-Level Security (RLS).
- **Strict File Upload Cap**: File uploads SHALL NOT exceed 50 MB (52,428,800 bytes) per object.
- **Framework Uniformity**: Frontend SHALL strictly use React 19 with TypeScript; Backend API SHALL strictly use Fastify 5.x.

---

## 3. External Interface Requirements

### 3.1 User Interfaces
- **Responsive Layout**: Fluid breakpoints supporting Mobile (< 640px), Tablet (640px - 1024px), and Desktop (> 1024px).
- **Global Header**: Fixed top navigation with dynamic sidebar toggle, fullscreen toggle, quick search trigger (`Cmd+K`), notification badge, and profile menu.
- **Collapsible Drawer**: Sidebar supporting three distinct visual states: `expanded` (260px), `collapsed` (72px), and `hidden` (0px with `Ctrl+B` toggle).
- **Color Theme**: Native dark/light mode switching complying with CSS design tokens (`var(--theme-bg)`, `var(--theme-text)`).

### 3.2 Hardware Interfaces
- **Camera & Microphone**: HTML5 `MediaDevices.getUserMedia()` access for video/audio capture in live study rooms.
- **Display Capture**: HTML5 `MediaDevices.getDisplayMedia()` for desktop and window screen sharing.

### 3.3 Software Interfaces
- **Supabase Auth API**: OAuth 2.0 and JWT token generation via `@supabase/supabase-js`.
- **Supabase Storage API**: S3-compatible signed storage upload and streaming.
- **LiveKit Server SDK**: JWT room token generation via `livekit-server-sdk`.
- **LiveKit Client SDK**: WebRTC peer connection handling via `@livekit/components-react` and `livekit-client`.

### 3.4 Communications Interfaces
- **HTTPS**: All REST communication strictly over TLS 1.3 (port 443 / port 3001 in local dev).
- **WebSockets (`wss://`)**:
  - Supabase Realtime channel subscription for live updates (`public:live_sessions`).
  - LiveKit WebRTC signaling WebSocket connection.
- **WebRTC**: Peer-to-SFU media transport using UDP/TCP with ICE, STUN, and TURN fallback protocols.

---

## 4. System Features & Functional Requirements

### 4.1 User Authentication & Profile Management
* **`FR-AUTH-001`**: The system SHALL allow users to register and authenticate using Email and Password.
* **`FR-AUTH-002`**: The system SHALL support OAuth 2.0 social authentication (Google, GitHub) via Supabase Auth.
* **`FR-AUTH-003`**: Upon successful registration, the system SHALL trigger automatic creation of a corresponding record in `public.profiles`.
* **`FR-AUTH-004`**: All protected API endpoints SHALL validate the Bearer JWT in the `Authorization` HTTP header via `authMiddleware`.
* **`FR-AUTH-005`**: The system SHALL allow users to retrieve their profile data via `GET /api/user/profile`.
* **`FR-AUTH-006`**: The system SHALL allow users to update their display name, timezone, bio, college, and social links via `PUT /api/user/profile`.
* **`FR-AUTH-007`**: The system SHALL sanitize input and prohibit users from modifying their own security `role` attribute during profile update.

### 4.2 Resource Library & Storage Management
* **`FR-RES-001`**: The system SHALL allow authenticated users to upload documents up to 50 MB in size.
* **`FR-RES-002`**: The system SHALL support the following file formats: PDF (`application/pdf`), Images (`image/png`, `image/jpeg`, `image/webp`), and Plain Text/Code (`text/plain`, `text/markdown`).
* **`FR-RES-003`**: Uploaded files SHALL be stored in the private Supabase storage bucket `resource-originals`.
* **`FR-RES-004`**: Storage paths SHALL enforce tenant isolation using the format `<user_id>/<uuid>.<ext>`.
* **`FR-RES-005`**: The system SHALL record file metadata (size, MIME type, original name) in `public.resource_files`.
* **`FR-RES-006`**: Users SHALL only be able to view, query, and download their own private resources via PostgreSQL RLS policies.
* **`FR-RES-007`**: Users SHALL be able to soft-delete resources by populating `deleted_at`.

### 4.3 Study Planner & Calendar Engine
* **`FR-PLAN-001`**: The system SHALL render calendar views in Daily, Weekly, and Monthly formats.
* **`FR-PLAN-002`**: Users SHALL be able to create scheduled study blocks linked to a specific subject (`subjects.id`).
* **`FR-PLAN-003`**: The system SHALL calculate and display upcoming deadlines with urgency indicators (e.g., "High Priority", "Due Tomorrow").
* **`FR-PLAN-004`**: The planner UI SHALL provide an interactive Pomodoro timer with configurable focus (25 min) and break (5 min) intervals.
* **`FR-PLAN-005`**: The system SHALL persist completed study intervals to update the student's daily study streak counter.

### 4.4 Live Collaborative Video Study Rooms
* **`FR-LIVE-001`**: The Fastify API SHALL expose `POST /api/live/token` to issue cryptographically signed LiveKit access tokens.
* **`FR-LIVE-002`**: Token issuance SHALL require a valid Supabase JWT and verified user ID.
* **`FR-LIVE-003`**: The LiveKit token SHALL grant permissions: `roomJoin: true`, `canPublish: true`, `canSubscribe: true` for the designated `roomName`.
* **`FR-LIVE-004`**: The frontend SHALL join the WebRTC room using `@livekit/components-react`'s `<LiveKitRoom>`.
* **`FR-LIVE-005`**: Participants SHALL be able to toggle local microphone (mute/unmute) and camera (enable/disable) tracks.
* **`FR-LIVE-006`**: Participants SHALL be able to publish desktop screen share tracks.
* **`FR-LIVE-007`**: The room SHALL render a real-time participant roster with active speaking indicators.
* **`FR-LIVE-008`**: The room SHALL include real-time text messaging between room participants.
* **`FR-LIVE-009`**: Active sessions SHALL be listed in the Live Sessions directory with status flags (`scheduled`, `live`, `ended`).

### 4.5 Task Management System
* **`FR-TSK-001`**: Users SHALL be able to create tasks with title, subject, due date, and priority (`High`, `Medium`, `Low`).
* **`FR-TSK-002`**: Tasks SHALL be categorized into visual buckets: `TODAY`, `TOMORROW`, `THIS WEEK`, `LATER`, and `COMPLETED`.
* **`FR-TSK-003`**: Clicking a task checkbox SHALL toggle completion status and automatically update the streak metric.
* **`FR-TSK-004`**: Users SHALL be able to filter tasks by status: `All`, `Today`, `Upcoming`, `Completed`, `Overdue`.

### 4.6 Study Groups & Social Communities
* **`FR-GRP-001`**: The system SHALL allow users to browse and search study groups by subject and academic level.
* **`FR-GRP-002`**: Users SHALL be able to create new study groups with name, subject, and description.
* **`FR-GRP-003`**: Group members SHALL be able to post messages and participate in group discussion threads.
* **`FR-GRP-004`**: Groups SHALL display active member count and the number of members currently studying.

### 4.7 Quiz & Practice Testing Engine
* **`FR-QUIZ-001`**: The system SHALL provide self-assessment quizzes categorized by subject (e.g., Algorithms, DBMS, Web Development).
* **`FR-QUIZ-002`**: The UI SHALL present multiple-choice questions with instantaneous score calculation upon submission.
* **`FR-QUIZ-003`**: Quiz completion SHALL award experience points (XP) and increment user achievement metrics.

### 4.8 Newsletter & Marketing Integration
* **`FR-NEWS-001`**: The Fastify API SHALL expose `POST /api/newsletter/subscribe` allowing unauthenticated users to submit an email address.
* **`FR-NEWS-002`**: The API SHALL validate email syntax and insert records into `public.newsletter_subscribers`.
* **`FR-NEWS-003`**: Duplicate subscriptions (PostgreSQL error code `23505`) SHALL return HTTP 200 with an idempotent "Already subscribed" message.

---

## 5. Non-Functional Requirements

### 5.1 Performance Requirements
* **`NFR-PERF-001`**: Fastify REST API response times SHALL be less than 200 milliseconds (p95) for database queries under normal load.
* **`NFR-PERF-002`**: WebRTC audio/video latency in LiveKit rooms SHALL not exceed 150 milliseconds under standard domestic broadband.
* **`NFR-PERF-003`**: Frontend First Contentful Paint (FCP) SHALL occur within 1.2 seconds; Largest Contentful Paint (LCP) within 2.2 seconds on 4G connections.
* **`NFR-PERF-004`**: The Vite production bundle SHALL be code-split with initial JavaScript size not exceeding 250 KB (gzipped).

### 5.2 Security & Privacy Requirements
* **`NFR-SEC-001`**: All incoming API requests to protected routes SHALL require a cryptographic JWT issued by Supabase Auth with RS256/ES256 signature.
* **`NFR-SEC-002`**: Client-side source code SHALL NOT contain service-role API keys, database connection strings, or LiveKit secret keys.
* **`NFR-SEC-003`**: Every database query on user data SHALL be governed by PostgreSQL Row-Level Security (RLS) enforcing `(select auth.uid()) = owner_id`.
* **`NFR-SEC-004`**: Cross-Origin Resource Sharing (CORS) on the Fastify API SHALL strictly whitelist trusted frontend origins (`CLIENT_URL`).
* **`NFR-SEC-005`**: File uploads SHALL validate file headers and MIME types to prevent malicious executable execution.

### 5.3 Reliability & Availability Requirements
* **`NFR-REL-001`**: The platform SHALL target 99.9% monthly uptime availability, excluding scheduled maintenance windows.
* **`NFR-REL-002`**: In the event of a brief network disconnection, the WebRTC room client SHALL automatically attempt reconnection for up to 30 seconds before notifying the user.
* **`NFR-REL-003`**: Supabase Realtime WebSocket client SHALL implement exponential backoff reconnection.

### 5.4 Usability & Accessibility Requirements
* **`NFR-ACC-001`**: The web application SHALL comply with **WCAG 2.1 Level AA** standards, including color contrast ratios of at least 4.5:1 for normal text.
* **`NFR-ACC-002`**: All interactive elements (buttons, inputs, modals) SHALL be fully operable via keyboard navigation.
* **`NFR-ACC-003`**: Screen readers SHALL receive appropriate ARIA labels and roles (`aria-expanded`, `aria-label`, `role="dialog"`).

### 5.5 Maintainability & Portability Requirements
* **`NFR-MAIN-001`**: Both frontend and backend codebases SHALL maintain 100% strict TypeScript typing without the use of unconstrained `any` types in production paths.
* **`NFR-MAIN-002`**: The web client SHALL function uniformly across Chromium, Gecko, and WebKit rendering engines on Windows, macOS, Linux, iOS, and Android.

---

## 6. Requirements Traceability Matrix

| Requirement ID | Module | Implementation File / Component | Verification Method |
| :--- | :--- | :--- | :--- |
| `FR-AUTH-001..003` | Authentication | `Frontend/src/AuthView.tsx`, `Backend/supabase/migrations/*` | Automated E2E Test |
| `FR-AUTH-004..007` | Auth Middleware & Profile | `Backend/src/middleware/authMiddleware.ts`, `Backend/src/routes/userRoutes.ts` | Integration Test |
| `FR-RES-001..007` | Resource Library | `Backend/supabase/migrations/*`, `Frontend/src/NotesFilesMockup.tsx` | Unit / Storage Test |
| `FR-PLAN-001..005` | Study Planner | `Frontend/src/PlannerMockup.tsx` | Component Test |
| `FR-LIVE-001..003` | LiveKit Token Issuance | `Backend/src/routes/liveRoutes.ts` | API Integration Test |
| `FR-LIVE-004..009` | WebRTC Video Room | `Frontend/src/LiveRoomMockup.tsx`, `Frontend/src/LiveSessionsMockup.tsx` | Manual / WebRTC Test |
| `FR-TSK-001..004` | Task Board | `Frontend/src/TasksMockup.tsx` | Component Test |
| `FR-GRP-001..004` | Study Groups | `Frontend/src/StudyGroupsMockup.tsx`, `Frontend/src/GroupDetailMockup.tsx` | Component Test |
| `FR-QUIZ-001..003` | Quiz Engine | `Frontend/src/QuizMockup.tsx` | Component Test |
| `FR-NEWS-001..003` | Newsletter API | `Backend/src/routes/landingRoutes.ts` | API Integration Test |
| `NFR-SEC-001..005` | Security & Privacy | Fastify Server + PostgreSQL RLS Policies | Security Audit / Static Analysis |
| `NFR-PERF-001..004` | Performance | Vite build optimization + Fastify benchmark | Lighthouse & k6 load test |
