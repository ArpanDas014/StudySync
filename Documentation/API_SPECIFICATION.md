# API Contract & Interface Specification — StudySync

---

## 1. Overview & General Conventions

The StudySync Application Programming Interface (API) is served by a **Fastify 5** Node.js server. The API operates as a secure gateway for authenticated business logic, WebRTC token generation, and administrative tasks.

### 1.1 Base URLs
- **Local Development**: `http://localhost:3001`
- **Staging**: `https://api-staging.studysync.io`
- **Production**: `https://api.studysync.io`

### 1.2 Authentication Protocol
All endpoints requiring authentication enforce JSON Web Token (JWT) verification via the `authMiddleware` pre-handler hook.
- **Header**: `Authorization: Bearer <supabase_access_token>`
- **Token Format**: Standard RFC 7519 signed JWT issued by Supabase Auth (`alg: RS256` or `ES256`).
- **Missing / Invalid Token Response**: HTTP `401 Unauthorized`

### 1.3 Standard Error Format
All failure responses return a uniform JSON error payload:
```json
{
  "error": "Human-readable description of error",
  "code": "OPTIONAL_ERROR_CODE",
  "statusCode": 400
}
```

---

## 2. Implemented Endpoints

### 2.1 System Health Check

#### `GET /health`
Verifies that the Fastify server is running and ready to accept traffic.
* **Authentication**: None (Public)
* **Rate Limit**: 120 req/min

##### Response
* **`200 OK`**:
```json
{
  "status": "ok",
  "service": "studysync-api"
}
```

---

### 2.2 User Profile Management

#### `GET /api/user/profile`
Retrieves the profile of the currently authenticated student.
* **Authentication**: Required (`Bearer <JWT>`)

##### Headers
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

##### Response
* **`200 OK`**:
```json
{
  "profile": {
    "id": "e4b52e37-9d7a-4c28-9844-32ff4874c7cf",
    "display_name": "Arpan Das",
    "timezone": "America/New_York",
    "bio": "CS junior passionate about algorithms and systems.",
    "college": "State University",
    "degree": "B.S. Computer Science",
    "onboarding_completed_at": "2026-09-01T12:00:00Z",
    "created_at": "2026-09-01T11:45:00Z",
    "updated_at": "2026-09-20T14:30:00Z"
  }
}
```
* **`401 Unauthorized`**:
```json
{
  "error": "Unauthorized: Invalid token"
}
```
* **`404 Not Found`**:
```json
{
  "error": "Profile not found"
}
```

---

#### `PUT /api/user/profile`
Updates profile metadata for the authenticated student.
* **Authentication**: Required (`Bearer <JWT>`)
* **Security Control**: Any incoming `role` field in the request body is stripped automatically by the server to prevent privilege escalation.

##### Request Body
```json
{
  "display_name": "Arpan Das",
  "timezone": "America/Chicago",
  "bio": "Updated bio focusing on distributed systems.",
  "college": "State University",
  "degree": "Computer Science"
}
```

##### Response
* **`200 OK`**:
```json
{
  "profile": {
    "id": "e4b52e37-9d7a-4c28-9844-32ff4874c7cf",
    "display_name": "Arpan Das",
    "timezone": "America/Chicago",
    "bio": "Updated bio focusing on distributed systems.",
    "college": "State University",
    "degree": "Computer Science",
    "updated_at": "2026-09-26T17:30:00Z"
  }
}
```
* **`500 Internal Server Error`**:
```json
{
  "error": "Failed to update user profile"
}
```

---

### 2.3 LiveKit WebRTC Token Issuance

#### `POST /api/live/token`
Generates a cryptographically signed LiveKit Access Token granting entry to an interactive video study room.
* **Authentication**: Required (`Bearer <JWT>`)

##### Headers
```http
Authorization: Bearer <supabase_jwt>
Content-Type: application/json
```

##### Request Body
```json
{
  "roomName": "algorithms-exam-prep",
  "participantName": "Arpan Das"
}
```

##### Server Token Generation Logic
1. Extracts Bearer token from header.
2. Validates identity against Supabase Auth (`supabase.auth.getUser()`).
3. Uses backend `LIVEKIT_API_KEY` and `LIVEKIT_API_SECRET` to instantiate `AccessToken`.
4. Attaches participant identity (`user.id`) and name.
5. Injects grants:
   - `roomJoin: true`
   - `room: roomName`
   - `canPublish: true` (Mic, Camera, Screen)
   - `canSubscribe: true` (Receive remote streams)

##### Response
* **`200 OK`**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTg5OTIwMDAsImlzcyI6IkFQSTg...<livekit_signed_token>"
}
```
* **`400 Bad Request`**: Missing `roomName` in body.
* **`401 Unauthorized`**: Missing or invalid Authorization header.
* **`500 Internal Server Error`**: LiveKit server secrets missing on backend.

---

### 2.4 Marketing & Newsletter Subscription

#### `POST /api/newsletter/subscribe`
Registers an email address for product updates from the public landing page.
* **Authentication**: None (Public)

##### Request Body
```json
{
  "email": "student@university.edu"
}
```

##### Response
* **`200 OK` (New Subscriber)**:
```json
{
  "success": true
}
```
* **`200 OK` (Duplicate Subscriber - Idempotent)**:
```json
{
  "success": true,
  "message": "Already subscribed"
}
```
* **`400 Bad Request`**:
```json
{
  "error": "Email is required"
}
```

---

## 3. Realtime WebSocket Events & Channels

StudySync combines **Supabase Realtime** for database state change notifications and **LiveKit Data Channels** for low-latency room chat.

### 3.1 Channel: `public:live_sessions` (Supabase Realtime)
Subscribed by `LiveSessionsMockup.tsx` to automatically reflect newly scheduled or started rooms.
* **Transport**: WebSocket (`wss://<supabase_project>.supabase.co/realtime/v1/websocket`)
* **Event**: `*` (Postgres Changes)
* **Schema**: `public`
* **Table**: `live_sessions`

##### Payload Example (New Live Room Created)
```json
{
  "schema": "public",
  "table": "live_sessions",
  "commit_timestamp": "2026-09-26T17:35:00Z",
  "eventType": "INSERT",
  "new": {
    "id": "b3e02028-1b6a-4d43-9831-c4266f87532f",
    "title": "OS Memory Management Discussion",
    "topic": "Operating Systems",
    "status": "live",
    "scheduled_at": "2026-09-26T17:30:00Z"
  },
  "old": {}
}
```

---

### 3.2 LiveKit WebRTC Data Channel Events
In-room instant messaging and ephemeral events broadcast via LiveKit's peer-to-SFU data channel.
* **Topic**: `chat`
* **Payload Encoding**: UTF-8 JSON String

##### Chat Message Schema
```json
{
  "id": "msg_984128",
  "senderId": "e4b52e37-9d7a-4c28-9844-32ff4874c7cf",
  "senderName": "Arpan Das",
  "message": "Can someone share the link to Slide 14?",
  "timestamp": "2026-09-26T17:42:10Z"
}
```

---

## 4. Phase 2 Target Endpoints (Specification Draft)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/resources` | Query user's private library with pagination and subject filter | Yes |
| `POST` | `/api/resources` | Create a new resource metadata record | Yes |
| `DELETE` | `/api/resources/:id` | Soft-delete a resource | Yes |
| `POST` | `/api/planner/generate` | Request AI-generated study schedule based on deadlines | Yes |
| `GET` | `/api/tasks` | Fetch tasks grouped by timeline (Today, Tomorrow, Later) | Yes |
| `POST` | `/api/tasks` | Create a new study task | Yes |
| `PATCH` | `/api/tasks/:id/complete` | Toggle task completion status | Yes |
| `GET` | `/api/quiz/:subject` | Fetch question bank for practice quiz | Yes |
| `POST` | `/api/quiz/:id/submit` | Submit answers and receive score/XP reward | Yes |
