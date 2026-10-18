# Plan Builder Specification & Generation Engine

> **FOR THE AGENT**: When conducting project onboarding or starting a new build, use this guide to compile the user's interview responses into a concrete, executable project directory (`/.project/`).

---

## 🏗️ The Project Blueprint Directory Structure

Whenever an agent initializes a project, it must create a dedicated project folder at the root:

```
<project_root>/
└── .project/                          # Single-project app (OR /projects/<name>/ in a monorepo)
    ├── PLAN.md                        # Master scope, stack, requirements, and module selection
    ├── ARCHITECTURE.md                # System design, data models, API endpoints, component tree
    ├── RULES.md                       # Tailored engineering, security, and styling constraints
    └── SPRINTS.md                     # Step-by-step phased execution plan with test checkboxes
```

---

## 📄 File 1: `/.project/PLAN.md` Template

The agent must generate `PLAN.md` using the following standardized layout:

```markdown
# Project Plan: [Project Name]

## 1. Executive Summary & Objective
- **Description**: [Concise 2-3 sentence summary of the application]
- **Target Audience / End Users**: [Customers, Internal Staff, B2B Clients, Enterprise Admins]
- **Deployment Target**: [Vercel, AWS, VPS, Docker, Serverless]

## 2. Technical Stack Matrix
- **Scope**: [Fullstack | Frontend Only | Backend Only | Standalone APIs]
- **Frontend Framework**: [Next.js App Router | Vite + React | Other]
- **Styling Engine**: **Tailwind CSS (v3 / v4) - Mandatory**
- **Typography Choice**: [Display: Neofolio / Nexo Kora / Bierika / OSIRIS | Body: Plus Jakarta Sans / Outfit]
- **Animation Stack**: [Framer Motion + GSAP ScrollTrigger | Three.js (Optional with User Permission)]
- **Icon Ecosystem**: [Lucide React + Animated Icons (Lordicon, Icons8, LottieFlow, LottieFiles)]
- **UI Architecture**: [Floating Label Inputs (No Placeholders) | Resizable dvh Sidebar | Framer Toasts]
- **Backend Framework**: [FastAPI (ASGI) | Next.js Serverless Route Handlers | Node Express]
- **Database & Storage**: [PostgreSQL (Supabase/Neon) | SQLite | MongoDB]
- **ORM / Query Builder**: [Drizzle | Prisma | SQLAlchemy]
- **Authentication**: [NextAuth/Auth.js | Supabase Auth | Custom JWT + Custom AI Face Models]
- **State Management**: [Zustand | React Query (TanStack) | Context API]

## 3. Active Feature Modules
| Module | Status | Configuration / Notes |
| :--- | :--- | :--- |
| **RBAC System** | [Enabled/Disabled] | Roles: Developer, Owner, Admin, Staff, Customer |
| **Multi-Tenancy** | [Enabled/Disabled] | [Single-tenant | Multi-company (Subdomains / Custom Domains)] |
| **Order Slide Workflow** | [Enabled/Disabled] | Table View + 1-by-1 Slide Carousel with Fast Actions |
| **CMS Engine** | [Enabled/Disabled] | [Integrated in Dashboard | Standalone Headless] |
| **Keyboard Shortcuts** | [Enabled/Disabled] | [Basic (Cmd+K, Esc) | Master (Vim-style, Hotkeys)] |
| **Facelock / Biometrics** | [Enabled/Disabled] | Custom AI Face Models (128-d Vector Embeddings, No Passkeys) |
| **Automations & SMTP** | [Enabled/Disabled] | SMTP emails + WhatsApp Business alerts |
| **Developer Payment Safeguard** | [Enabled/Disabled] | Grace period up to 8th of month, Owner-only banner |

## 4. Acceptance Criteria & Success Metrics
- [ ] Users can authenticate via configured auth methods.
- [ ] Strict role-based permissions prevent unauthorized page visits and button actions.
- [ ] All forms feature robust validation with clear, responsive error toasts.
- [ ] Zero layout shifts, high aesthetic standard (curated typography, dark mode, smooth transitions).
- [ ] Production build passes with zero lint, type, or runtime errors.
```

---

## 🏛️ File 2: `/.project/ARCHITECTURE.md` Template

The agent must define the technical blueprint and data flows:

```markdown
# Architecture Specification: [Project Name]

## 1. System Topology & Data Flow
\`\`\`mermaid
graph TD
    Client[Web Browser / Client]
    Client -->|HTTPS / WSS| Frontend[Frontend (Next.js / React)]
    Frontend -->|REST / Typed API| Backend[Backend API (FastAPI / Serverless)]
    Backend -->|Auth Verification| AuthMiddleware[RBAC & Auth Middleware]
    AuthMiddleware -->|ORM / Queries| DB[(Database / PostgreSQL)]
    Backend -->|Webhooks / Notifications| External[WhatsApp / SMTP Services]
\`\`\`

## 2. Directory & Component Structure
\`\`\`
src/
├── app/ (or pages/)           # Route handlers & UI pages
├── components/
│   ├── ui/                    # Reusable atom components (Button, Modal, Input, Badge)
│   ├── layout/                # Sidebar, Navbar, OwnerSafeguardBanner, Footer
│   ├── orders/                # OrderTable, OrderSlideView, OrderActionPanel
│   └── modules/               # Feature-specific components (CMS, Shortcuts, Facelock)
├── hooks/                     # useAuth, useRBAC, useShortcuts, useTheme
├── lib/                       # API clients, DB connection, utils, formatters
└── styles/                    # tokens.css, globals.css, theme.css
\`\`\`

## 3. Database Schema Blueprint
Define core entities (Users, Companies/Tenants, Roles, Orders, CMS Items, AuditLogs).
Include primary keys, foreign keys, indexes, and row-level security policies.

## 4. API Endpoints Contract
List all endpoints with HTTP Method, Path, Required Role, and Payload summary.
Example:
- `POST /api/v1/auth/login` (Public)
- `GET /api/v1/orders` (Auth: Staff, Admin, Owner)
- `PATCH /api/v1/orders/:id/status` (Auth: Action permission `orders:edit`)
- `DELETE /api/v1/orders/:id` (Auth: Action permission `orders:delete` - Owner/Admin only)
```

---

## 🛡️ File 3: `/.project/RULES.md` Template

Compile project-specific rules selected from `rules/`:
1. **Design Rules**: Palette tokens, CSS variables, dark/light contrast rules, responsive breakpoints.
2. **Backend & API Connection Rules**: API base URLs, typed error responses, CORS whitelists, connection timeouts.
3. **RBAC Guardrails**: Hierarchy tree, protected roles (Owner cannot be degraded; Developer cannot tamper business data).
4. **Developer Payment Safeguard Rules**: Logic for `{ paymentClear: boolean }`, 8th-day grace period, and Owner sticky banner.

---

## 🏃 File 4: `/.project/SPRINTS.md` Template

Break implementation into 4 to 6 measurable sprints:

```markdown
# Implementation Sprints: [Project Name]

- [ ] **Sprint 0: Foundations & Scaffolding**
  - [ ] Initialize repository structure and dependencies
  - [ ] Configure Tailwind CSS (theme colors, glow shadows, dark mode)
  - [ ] Configure bespoke font imports (Neofolio / Nexo Kora / Bierika / OSIRIS / Outfit)
  - [ ] Build reusable Floating Label Input components (Text, Textarea, Select)
  - [ ] Build resizable `h-dvh` Sidebar and Topbar skeleton
  - [ ] Configure database schemas and migrations
  - [ ] Setup API client and connection ping test

- [ ] **Sprint 1: Authentication & RBAC Engine**
  - [ ] Setup Auth tables, password hashing & Face Vector Embedding storage (PostgreSQL / JSONB)
  - [ ] Implement `useRBAC` hook and backend role middleware
  - [ ] Implement action-level permission buttons (create, edit, delete gates)

- [ ] **Sprint 2: Core Domain Logic & Modules**
  - [ ] Build primary database models & CRUD endpoints
  - [ ] Implement Master Order Table + Focused Slide Review Carousel
  - [ ] Implement Multi-tenant isolation / Custom domain router (if enabled)

- [ ] **Sprint 3: Advanced UX, Shortcuts & Global Search**
  - [ ] Implement Cmd+K command palette
  - [ ] Configure keyboard shortcuts (Basic or Master Vim mode)
  - [ ] Integrate Theme toggle (Dark / Light / System)

- [ ] **Sprint 4: Automations & Developer Safeguards**
  - [ ] Configure SMTP email sender & templates
  - [ ] Setup WhatsApp webhook / notification dispatcher
  - [ ] Implement Developer Payment Safeguard banner for Owner

- [ ] **Sprint 5: Testing, Hardening & Verification**
  - [ ] Run end-to-end integration tests
  - [ ] Audit responsive layouts on Mobile, Tablet, and Desktop
  - [ ] Validate zero console errors, zero lint warnings
```
