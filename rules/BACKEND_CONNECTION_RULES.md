# Backend Connection & API Integration Standards

> **PURPOSE**: Standardizes communication, authentication, error handling, and type safety between Frontend applications and Backend APIs across both Dedicated Server (FastAPI / Node) and Serverless (Next.js API) architectures.

---

## 🔌 1. Architectural Connection Modes

### Mode A: Dedicated Server (FastAPI / Node + Next.js / React)
Used when heavy compute, long-running processes, Python AI models, or persistent WebSockets are required.

```
┌─────────────────────────────────┐           HTTP/HTTPS (REST)          ┌───────────────────────────────────┐
│       Frontend Application      │ ────────────────────────────────────►│         FastAPI / Uvicorn         │
│  (Next.js App / React SPA)      │ ◄────────────────────────────────────│        (Python ASGI Server)       │
│  Base: http://localhost:3000    │           Authorization: Bearer      │   Base: http://localhost:8000     │
└─────────────────────────────────┘                                      └─────────────────┬─────────────────┘
                                                                                           │
                                                                                           ▼
                                                                                 ┌───────────────────┐
                                                                                 │  PostgreSQL / DB  │
                                                                                 └───────────────────┘
```

#### Dedicated Server Standards:
1. **Environment Variables**:
   - Frontend `.env.local`: `NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1` (or `VITE_API_URL`)
   - Backend `.env`: `CORS_ORIGINS=["http://localhost:3000", "https://yourdomain.com"]`
2. **CORS Configuration (FastAPI Example)**:
   ```python
   from fastapi import FastAPI
   from fastapi.middleware.cors import CORSMiddleware

   app = FastAPI(title="Backend Engine", version="1.0.0")

   origins = [
       "http://localhost:3000",
       "https://app.yourdomain.com",
   ]

   app.add_middleware(
       CORSMiddleware,
       allow_origins=origins,
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

---

### Mode B: Unified Serverless (Next.js Route Handlers)
Used for streamlined full-stack apps where frontend and backend reside in the same repository.

```
Next.js Application (/src/app)
├── (ui)/page.tsx           <-- Client / Server Components
└── api/
    ├── auth/[...nextauth]/route.ts
    ├── orders/route.ts     <-- Direct DB access via Drizzle / Prisma
    └── webhooks/route.ts
```

- **Zero CORS Configuration**: Same origin calls use relative paths (`/api/orders`).
- **Edge / Node Runtime**: Route handlers can run on Node.js or Edge runtimes.

---

### Mode C: Dual Next.js Projects Architecture (Frontend Next.js + Dedicated Backend Next.js API)
Used when a team desires the full power of Next.js App Router for the Frontend UI, while having a completely independent, dedicated Next.js project solely dedicated to serving the Backend API, Route Handlers, Database ORM, and Webhooks.

```
Root Workspace /
├── frontend/               <-- Next.js UI Application (Port 3000 / app.domain.com)
│   ├── src/app/            <-- Pages, Layouts, SSR & Client Components
│   └── lib/apiClient.ts    <-- Typed fetcher targeting Backend URL
│
└── backend/                <-- Dedicated Next.js Backend API (Port 3001 / api.domain.com)
    ├── src/app/api/        <-- Pure Route Handlers (GET, POST, PUT, DELETE)
    ├── src/db/             <-- Database Schemas, Drizzle / Prisma / PostgreSQL
    └── middleware.ts       <-- CORS, Auth tokens, Rate Limiting
```

#### Dual Next.js Standards:
1. **Frontend Configuration (`frontend/.env.local`)**:
   `NEXT_PUBLIC_API_URL=http://localhost:3001/api` (Production: `https://api.yourdomain.com/api`)
2. **Backend Dedicated CORS Middleware (`backend/src/middleware.ts`)**:
   Must permit cross-origin requests from the frontend with credentials (cookies):
   ```typescript
   import { NextResponse } from "next/server";
   import type { NextRequest } from "next/server";

   export function middleware(request: NextRequest) {
     const origin = request.headers.get("origin") || "";
     const allowedOrigins = [
       "http://localhost:3000",
       process.env.FRONTEND_URL || "https://app.yourdomain.com",
     ];

     if (request.method === "OPTIONS") {
       return new NextResponse(null, {
         status: 200,
         headers: {
           "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
           "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
           "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
           "Access-Control-Allow-Credentials": "true",
         },
       });
     }

     const response = NextResponse.next();
     if (allowedOrigins.includes(origin)) {
       response.headers.set("Access-Control-Allow-Origin", origin);
       response.headers.set("Access-Control-Allow-Credentials", "true");
     }
     return response;
   }

   export const config = {
     matcher: "/api/:path*",
   };
   ```
3. **Frontend Fetch Client**:
   All fetch calls include `credentials: "include"` to pass auth cookies across the dual Next.js origins.

---

## 📦 2. Standardized API Response Envelope

Every API endpoint (whether FastAPI or Serverless) must return a consistent JSON response structure:

### Success Response
```json
{
  "success": true,
  "data": {
    "id": "ord_9872",
    "total": 1450.00,
    "status": "PROCESSING"
  },
  "meta": {
    "timestamp": "2026-10-18T10:30:00Z"
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN_ACTION",
    "message": "Staff role does not have permission to delete orders.",
    "details": {
      "requiredPermission": "orders:delete",
      "userRole": "Staff"
    }
  }
}
```

---

## 🛡️ 3. Frontend Typed API Client Blueprint

All frontend calls must flow through a unified API client rather than ad-hoc `fetch` or `axios` calls across components:

```typescript
// lib/apiClient.ts
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const json: ApiResponse<T> = await response.json();

  if (!response.ok || !json.success) {
    const errorMsg = json.error?.message || `Request failed with status ${response.status}`;
    const error = new Error(errorMsg);
    (error as any).code = json.error?.code;
    (error as any).status = response.status;
    throw error;
  }

  return json.data as T;
}
```

---

## ⚡ 4. Real-time Connection Standards (WebSockets & SSE)

For instant order updates, slide reviews, and staff notifications:
1. **Server-Sent Events (SSE)** for unidirectional alerts (e.g. `GET /api/v1/orders/stream`).
2. **WebSockets (`/ws/orders`)** for bi-directional real-time collaboration (e.g. multiple staff processing live orders simultaneously without collision).
