# System Architecture & Technical Design Document — StudySync

---

## 1. Architecture Overview & Principles

StudySync uses a modern, separated client-server architecture built on four architectural pillars:
1. **Separated Concerns**: Thin, reactive single-page client; secure, lightweight API gateway; managed high-availability backend-as-a-service.
2. **Zero-Secret Client**: All sensitive third-party API keys (LiveKit Secret, Supabase Service Role, AI Provider credentials) remain strictly on the Fastify backend server.
3. **Database-Level Security Boundary**: Authorization is enforced directly inside PostgreSQL using Row-Level Security (RLS) policies based on cryptographic JWT claims.
4. **Selective Forwarding Unit (SFU) WebRTC**: Collaborative video and audio rooms leverage LiveKit's SFU architecture instead of peer-to-peer mesh to scale to dozens of concurrent camera streams without overloading client uplink bandwidth.

---

## 2. C4 Architecture Model

### 2.1 Level 1: System Context Diagram
The System Context diagram illustrates how human actors interact with StudySync and its external ecosystem.

```mermaid
flowchart TD
    User["🎓 Student / Learner"]
    Moderator["👨‍🏫 Study Group Host"]
    
    subgraph StudySync_System ["StudySync Digital Platform"]
        ClientApp["StudySync Web & PWA Client\n(React 19 + Vite)"]
        ServerApp["StudySync API Gateway\n(Node.js + Fastify)"]
    end
    
    SupabaseAuth["Supabase Auth\n(Identity & JWTs)"]
    SupabaseDB["Supabase PostgreSQL\n(Database & RLS)"]
    SupabaseStorage["Supabase Storage\n(S3-compatible Object Store)"]
    SupabaseRealtime["Supabase Realtime\n(PostgreSQL CDC WebSockets)"]
    LiveKitCloud["LiveKit WebRTC Cloud\n(SFU Media Server)"]
    AIProvider["AI LLM Provider\n(Anthropic / OpenAI / Google)"]

    User -->|Uses browser| ClientApp
    Moderator -->|Hosts rooms & groups| ClientApp
    
    ClientApp -->|REST API calls| ServerApp
    ClientApp -->|Authenticate / Get Session| SupabaseAuth
    ClientApp -->|Direct RLS Data Queries| SupabaseDB
    ClientApp -->|Signed File Uploads| SupabaseStorage
    ClientApp -->|WebSocket Subscriptions| SupabaseRealtime
    ClientApp -->|WebRTC Audio/Video/Screen| LiveKitCloud

    ServerApp -->|Validate JWTs & Bypass RLS| SupabaseDB
    ServerApp -->|Issue Room JWTs| LiveKitCloud
    ServerApp -->|Prompt Engineering & Inference| AIProvider
```

---

### 2.2 Level 2: Container Diagram
The Container diagram breaks down the subsystems, technologies, and inter-container protocols.

```mermaid
flowchart LR
    subgraph Client_Container ["Client Application (SPA / PWA)"]
        ReactUI["React 19 Components\n(Framer Motion, Lucide Icons)"]
        LiveKitClient["@livekit/components-react\n(WebRTC Client SDK)"]
        SupaClient["@supabase/supabase-js\n(Auth & Data SDK)"]
    end

    subgraph Backend_Container ["Application Server (Fastify API)"]
        FastifyCore["Fastify 5 Server\n(Node.js v22 LTS)"]
        AuthMiddleware["JWT Authentication Middleware\n(Supabase Token Verification)"]
        LiveService["LiveKit Token Service\n(livekit-server-sdk)"]
        UserRouter["User & Profile Router"]
        LandingRouter["Newsletter & Marketing Router"]
    end

    subgraph Cloud_Services ["Managed Cloud Infrastructure"]
        SupaPG[(Supabase PostgreSQL 17\nRow-Level Security Policies)]
        SupaBuckets[(Supabase S3 Storage\n'resource-originals')]
        LiveKitSFU["LiveKit SFU Cluster\n(TURN/STUN & WebRTC)"]
    end

    ReactUI --> LiveKitClient
    ReactUI --> SupaClient

    SupaClient -->|HTTPS / WSS| SupaPG
    SupaClient -->|HTTPS S3 API| SupaBuckets
    LiveKitClient -->|WebRTC / UDP| LiveKitSFU

    ReactUI -->|HTTPS REST| FastifyCore
    FastifyCore --> AuthMiddleware
    AuthMiddleware --> UserRouter
    AuthMiddleware --> LiveService
    FastifyCore --> LandingRouter

    LiveService -->|HMAC-SHA256 Token Generation| LiveKitClient
    UserRouter -->|Service Role Client| SupaPG
    LandingRouter -->|Service Role Client| SupaPG
```

---

### 2.3 Level 3: Component Diagram (Fastify Backend API)

```
Backend/server/src/
├── app.ts                 # Fastify instance builder & CORS configuration
├── server.ts              # Process launcher (Host: 0.0.0.0, Port: 3001)
├── middleware/
│   └── authMiddleware.ts  # Pre-handler hook verifying Supabase Bearer JWTs
├── routes/
│   ├── userRoutes.ts      # GET /profile, PUT /profile with role-escalation defense
│   ├── liveRoutes.ts      # POST /token generating signed LiveKit access tokens
│   └── landingRoutes.ts   # POST /subscribe idempotent email newsletter ingestion
└── utils/
    └── supabase.ts        # Admin Supabase client singleton using SERVICE_ROLE_KEY
```

---

## 3. End-to-End Sequence Diagrams

### 3.1 Authentication & Session Hydration
```mermaid
sequenceDiagram
    autonumber
    actor Student as Student Browser
    participant Client as React Client (Supabase SDK)
    participant Auth as Supabase Auth Service
    participant API as Fastify Backend API
    participant DB as Supabase PostgreSQL

    Student->>Client: Enters credentials / Clicks Google Login
    Client->>Auth: signInWithPassword() / signInWithOAuth()
    Auth-->>Client: Returns Auth Session + Access JWT (Bearer)
    Client->>Client: Stores session in localStorage
    Client->>API: GET /api/user/profile (Header: Bearer JWT)
    API->>Auth: supabase.auth.getUser(token)
    Auth-->>API: Validates token, returns user ID & metadata
    API->>DB: SELECT * FROM profiles WHERE id = user.id
    DB-->>API: Returns profile record
    API-->>Client: 200 OK: { profile: { ... } }
    Client->>Student: Renders personalized dashboard
```

---

### 3.2 Live Collaborative Room Token Issuance & WebRTC Connection
```mermaid
sequenceDiagram
    autonumber
    actor Host as Room Host
    actor Guest as Student Guest
    participant Client as React Client (LiveKit SDK)
    participant API as Fastify API (/api/live/token)
    participant LiveKit as LiveKit WebRTC SFU

    Host->>Client: Clicks "Join Live Room" (roomName: "algorithms-101")
    Client->>API: POST /api/live/token { roomName, participantName } (Header: Bearer JWT)
    API->>API: Verify Supabase JWT via authMiddleware
    API->>API: Sign AccessToken with LIVEKIT_API_KEY & LIVEKIT_API_SECRET
    API->>API: Add Grants: { roomJoin: true, room: roomName, canPublish: true, canSubscribe: true }
    API-->>Client: 200 OK: { token: "<livekit_jwt>" }
    Client->>LiveKit: Connect via WebSockets signaling with token
    LiveKit-->>Client: PeerConnection negotiated (ICE / STUN / TURN)
    Client->>LiveKit: Publish local Camera / Mic / Screen tracks
    LiveKit-->>Guest: SFU selectively forwards Host tracks to all subscribed students
```

---

### 3.3 Resource Upload & Storage Security Flow
```mermaid
sequenceDiagram
    autonumber
    actor Student as Student
    participant Client as React Client
    participant Storage as Supabase Storage ('resource-originals')
    participant DB as PostgreSQL (public.resources & public.resource_files)

    Student->>Client: Selects file "Calculus_Notes.pdf" (2.4 MB)
    Client->>Client: Validates MIME type & size (< 50 MB)
    Client->>Storage: upload(path: `${user.id}/${uuid}.pdf`, file) (Bearer JWT)
    Note over Storage: Storage RLS Policy verifies:<br/>(storage.foldername(name))[1] == auth.uid()
    Storage-->>Client: Upload successful (storage_path confirmed)
    Client->>DB: INSERT INTO public.resources (owner_id, title, resource_type, visibility)
    Note over DB: Table RLS verifies:<br/>auth.uid() == owner_id
    DB-->>Client: Returns resource_id
    Client->>DB: INSERT INTO public.resource_files (resource_id, storage_path, size_bytes)
    DB-->>Client: Resource catalog record complete
    Client->>Student: Displays resource in "My Notes"
```

---

## 4. Technology Stack Justification

| Technology | Selection | Alternative Evaluated | Engineering Justification |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | **React 19 + TypeScript** | Vue.js, Svelte, Next.js | First-class compatibility with LiveKit React components (`@livekit/components-react`), strict type safety, zero server-side rendering latency overhead. |
| **Build Tooling** | **Vite 8** | Webpack, Turbopack | Sub-second Hot Module Replacement (HMR), lightweight ES module builds, native PWA plugin integration (`vite-plugin-pwa`). |
| **Backend Framework** | **Fastify 5** | Express.js, NestJS | 2x-3x higher requests/sec throughput than Express, built-in schema serialization, low overhead async plugin architecture, modern TypeScript support. |
| **Database & Auth** | **Supabase (PostgreSQL 17)** | Custom MongoDB + Auth0 | Row-Level Security (RLS) offers ironclad multi-tenancy at the data layer; integrated S3 object storage; built-in PostgreSQL change-data-capture (CDC) for realtime chat. |
| **Video/Audio WebRTC** | **LiveKit SFU** | Agora, Twilio, WebRTC Mesh | True Selective Forwarding Unit (SFU) reduces client bandwidth from $O(N^2)$ to $O(N)$; open-source with managed cloud availability; excellent React hooks. |
| **Styling & UI** | **Custom Design Tokens + Tailwind** | Material UI, Ant Design | Warm academic aesthetic (Ivory, Cobalt, Soft Sand, Coral) crafted specifically for student comfort without generic corporate look-and-feel. |

---

## 5. Security Architecture & Boundary Isolation

```
┌──────────────────────────────────────────────────────────────┐
│ UNTRUSTED ZONE: Public Internet & User Browser              │
│ - React 19 Client Bundle                                     │
│ - Supabase Anonymous Publishable Key (Read-safe, RLS-bound)  │
│ - Temporary User JWT in memory / local storage               │
└──────────────────────────────┬───────────────────────────────┘
                               │ HTTPS / WSS / WebRTC
                               ▼
┌──────────────────────────────────────────────────────────────┐
│ DEMILITARIZED ZONE (DMZ): Fastify API Gateway                │
│ - Strict CORS whitelisting (CLIENT_URL)                      │
│ - JWT Verification Pre-Handlers (requireAuth)                │
│ - Role Escalation Prevention                                 │
│ - LiveKit Token Minting (HMAC SHA-256)                       │
└──────────────────────────────┬───────────────────────────────┘
                               │ Private Network / Service Role
                               ▼
┌──────────────────────────────────────────────────────────────┐
│ TRUSTED ZONE: Managed Cloud Backends                         │
│ - Supabase Service Role Key (Database Admin)                 │
│ - PostgreSQL Tables protected by RLS Policies                │
│ - Private S3 Bucket ('resource-originals')                   │
│ - LiveKit SFU Cluster (Room Management API)                  │
└──────────────────────────────────────────────────────────────┘
```

1. **Defense in Depth**: Even if a malicious actor accesses the backend API directly, all data mutations require a verified Supabase JWT.
2. **PostgreSQL RLS as Final Authority**: If a compromised client queries the database directly with their user token, PostgreSQL policies prevent them from accessing any other student's private resources.
3. **Role Escalation Defense**: In `userRoutes.ts`, any client payload attempting to set `body.role` has the attribute stripped before executing the database update.
