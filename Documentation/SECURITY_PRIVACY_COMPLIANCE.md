# Security, Privacy & Compliance Guide — StudySync

---

## 1. Executive Summary & Student Privacy Mandate

StudySync is designed as a secure, trustworthy digital sanctuary for students. Because the platform stores academic records, personal study notes, private calendar commitments, and live video streams, security and student privacy are treated as non-negotiable architectural foundations rather than afterthoughts.

---

## 2. Regulatory Compliance Frameworks

### 2.1 FERPA (Family Educational Rights and Privacy Act) Compliance
Although StudySync is a direct-to-student platform, it adheres to core FERPA principles to ensure compatibility with institutional learning policies:
- **Private Educational Records**: User notes, assignments, grades, and schedules are strictly classified as private records accessible only by the owning student.
- **Explicit Consent for Disclosure**: No student work, notes, or quiz performance is shared with peer groups or public directories unless the student explicitly selects public visibility.
- **Directory Information Controls**: Students may choose whether their full name, college, and profile bio appear in group member listings.

### 2.2 GDPR (General Data Protection Regulation) Compliance
For European Union students and global privacy parity, StudySync enforces:
- **Article 15 (Right of Access)**: Students can export their complete profile, notes, and task history via a machine-readable JSON archive.
- **Article 17 (Right to Erasure / Right to be Forgotten)**: Deleting an account initiates a cascading purge across `auth.users`, `public.profiles`, `public.resources`, and associated files in Supabase Storage.
- **Article 25 (Data Protection by Design and by Default)**: All uploaded resources default to `visibility = 'private'`.

### 2.3 COPPA (Children's Online Privacy Protection Act)
- StudySync is restricted to users aged 13 and older.
- The registration flow disallows personal data collection from minors under 13 without verified parental consent.

---

## 3. STRIDE Threat Model Analysis

| Threat Category | Potential Vector | Impact | StudySync Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Spoofing** | Attacker impersonates another student or forges a LiveKit WebRTC token. | Unauthorized access to private video study rooms and notes. | Fastify API verifies Supabase RS256/ES256 signed JWTs before issuing LiveKit tokens; LiveKit tokens are HMAC-SHA256 signed with server secret. |
| **Tampering** | User attempts to modify another student's task or escalate their own user role to `admin`. | Unauthorized privilege escalation or data corruption. | PostgreSQL Row-Level Security checks `auth.uid() = owner_id`. `PUT /api/user/profile` explicitly strips `body.role` before updating database. |
| **Repudiation** | Malicious participant claims they did not harass someone in a study room. | Accountability disputes in community rooms. | Fastify structured logger (Pino) records user ID, IP, room join timestamps, and token issuance metadata. |
| **Information Disclosure** | Unauthorized crawler scrapes uploaded exam notes or private PDFs. | Academic leak and privacy breach. | Storage bucket `resource-originals` is strictly non-public (`public = false`); storage RLS policy verifies `(storage.foldername(name))[1] = auth.uid()`. |
| **Denial of Service** | Malicious actor floods token endpoint or uploads gigabyte files. | Server resource exhaustion and storage cost spikes. | 50 MB hard database check constraint on `resource_files.size_bytes`; rate limiting on Fastify endpoints (`@fastify/cors`, rate-limit plugin). |
| **Elevation of Privilege** | User attempts to mark custom subjects as canonical. | Pollutes system-wide curriculum for all students. | Database constraint: `check ((select auth.uid()) = created_by and not is_canonical)`. Only system service role can set `is_canonical = true`. |

---

## 4. Multi-Layer Defense in Depth Architecture

```
Layer 1: Edge & Transport Security
└── TLS 1.3 / HTTPS on all endpoints
└── WSS (Secure WebSockets) for Supabase Realtime
└── DTLS-SRTP for LiveKit WebRTC Audio/Video Media Encryption

Layer 2: Gateway & API Security (Fastify Server)
└── Strict CORS Whitelisting (CLIENT_URL)
└── Header Verification: Authorization: Bearer <JWT>
└── Input validation & Role Escalation Defense (stripping body.role)
└── Zero storage of user passwords (delegated to Supabase Auth)

Layer 3: Database & Storage Security (Supabase Cloud)
└── Row-Level Security (RLS) on all public schema tables
└── Storage RLS enforcing user folder prefix matching auth.uid()
└── CHECK constraints on sizes, lengths, and valid enums
└── Foreign key cascading deletes

Layer 4: Secret Management Hygiene
└── Zero secrets in frontend bundle (only VITE_SUPABASE_PUBLISHABLE_KEY)
└── LIVEKIT_API_SECRET and SUPABASE_SERVICE_ROLE_KEY isolated to server .env
└── Service role key used only for administrative operations
```

---

## 5. Storage Security & File Upload Validation

### 5.1 Storage Isolation Rules
1. **Bucket Configuration**: The bucket `resource-originals` is created with `public = false`. Direct anonymous URLs are disabled.
2. **Directory Structure**:
   ```
   resource-originals/
   └── <user_uuid>/
       └── <random_uuid>.<extension>
   ```
3. **PostgreSQL RLS on Storage Objects**:
   ```sql
   create policy "Users can upload their private resource files"
   on storage.objects for insert to authenticated
   with check (
     bucket_id = 'resource-originals'
     and (storage.foldername(name))[1] = (select auth.jwt()->>'sub')
   );
   ```

### 5.2 Upload Validation Rules
- **Maximum File Size**: 52,428,800 bytes (50 MB) enforced both client-side and at the database constraint level.
- **Allowed MIME Types**:
  - `application/pdf`
  - `image/png`, `image/jpeg`, `image/webp`
  - `text/plain`, `text/markdown`
- **Quarantine Workflow**: The `processing_status` column in `public.resources` tracks uploaded items through states: `uploading` $\rightarrow$ `processing` $\rightarrow$ `ready` (or `quarantined` if validation fails).

---

## 6. WebRTC Media Security

- **Encryption**: Video, audio, and data channel streams in LiveKit study rooms are encrypted end-to-end between the client and SFU using **DTLS** (Datagram Transport Layer Security) and **SRTP** (Secure Real-time Transport Protocol).
- **Ephemeral Token Lifespan**: LiveKit access tokens minted by `/api/live/token` expire after 6 hours. Reconnection requires obtaining a fresh token via authenticated session.
- **Room Isolation**: A token minted for room `room-a` cannot be used to join or listen to `room-b`.
