# Plan Builder Specification & Generation Engine

> **Applicability:** This is a planning template, not a mandatory architecture. Read [EXECUTION_CONTRACT.md](./EXECUTION_CONTRACT.md) first. The Next.js + MongoDB + Tailwind structure below is an example profile only. For an existing project, preserve its actual stack; for a greenfield project, choose each technology from requirements and trade-offs. Mark irrelevant modules NOT APPLICABLE instead of enabling everything.

> **FOR THE AGENT**: When conducting project onboarding or starting a new build, use this guide to compile the user's interview responses into a concrete, executable project directory (`/.project/`).

---

## 🏗️ The Project Blueprint Directory Structure

Whenever an agent initializes a project, it must create a dedicated project folder at the root:

```
<project_root>/
├── FILE-MAP.md                        # Living verified navigation map & functional index
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
- **Styling Engine**: Project-native styling system (Tailwind is one option)
- **Typography Choice**: [Display: Neofolio / Nexo Kora / Bierika / OSIRIS | Body: Plus Jakarta Sans / Outfit]
- **Animation Stack**: [Framer Motion + GSAP ScrollTrigger | Three.js (Optional with User Permission)]
- **Icon Ecosystem**: [Lucide React + Animated Icons (Lordicon, Icons8, LottieFlow, LottieFiles)]
- **UI Architecture**: [Floating Label Inputs (No Placeholders) | Resizable dvh Sidebar | Public Mobile Bottom Bar with "More" Drawer | Dashboard Floating "Menu"/"Close" Pill | Framer Toasts]
- **Backend Framework**: [FastAPI (ASGI) | Next.js Serverless Route Handlers | Node Express]
- **Database & Storage**: Database selected from domain, hosting, scale and team requirements
- **ODM / Query Driver**: **Mongoose (Next.js/Node) | Motor / Beanie (FastAPI Python)**
- **Authentication**: [NextAuth/Auth.js | Supabase Auth | Custom JWT + Custom AI Face Models]
- **State Management**: [Zustand | React Query (TanStack) | Context API]
- **Capacity & Scaling Tier**: [Tier 1 (<10k Users, <100 RPS, Lightweight In-Memory) | Tier 2 (10k–100k Users, 100–1,000 RPS, ALB + Redis + BullMQ) | Tier 3 (100k–1M+ Users, 1,000–10,000+ RPS, Multi-AZ ALB + L1/L2 Pub/Sub Cache + Worker Pool)]
- **Worker Queue & Failover**: [In-Process (Tier 1) | BullMQ Redis 30s Heartbeat Lease with Auto-Failover (Tier 2 & 3)]
- **Circuit Breaker Engine**: [In-Memory | Distributed Redis Circuit Breaker for Payments & External Gateways]

## 3. Active Feature Modules
| Module | Status | Configuration / Notes |
| :--- | :--- | :--- |
| **RBAC System** | [Enabled/Disabled] | Roles: Developer, Owner, Admin, Staff, Customer |
| **Multi-Tenancy** | [Enabled/Disabled] | [Single-tenant | Multi-company (Subdomains / Custom Domains)] |
| **Order Slide Workflow** | [Enabled/Disabled] | Table View + 1-by-1 Slide Carousel with Fast Actions |
| **CMS Engine** | [Enabled/Disabled] | [Integrated in Dashboard (/dashboard/cms) | Standalone Portal (/cms)] + Dual WYSIWYG/Monaco Sync, Variable Registry, Visual Workflow Studio, 30 Templates, Section SDK, FFmpeg Scroll Video, Dynamic PDF Canvas Studio, Email Builder, WhatsApp Studio, Central Assets DAM (Auto-Ingestion & Video Previewer), Website Details Cascading, Auth Pages Theme Customizer & Multi-Tenant CMS Delegation |
| **Keyboard Shortcuts** | [Enabled/Disabled] | [Basic (Cmd+K, Esc) | Master (Vim-style, Hotkeys)] |
| **Facelock / Biometrics** | [Enabled/Disabled] | Custom AI Face Models (128-d Vector Embeddings, No Passkeys) |
| **Automations & SMTP** | [Enabled/Disabled] | SMTP emails + WhatsApp Business alerts |
| **Settings System** | Conditional | Dual-tier: Normal Settings + System Settings (SMTP, WA, Multi-Storage, Multi-Key AI) |
| **Route Proxy & Protection** | Conditional (when auth/protected routes exist) | Edge Middleware (`middleware.ts`), Interception Toasts & Login/Logout Cache Invalidation |
| **Dynamic Feature Flags** | [Enabled/Disabled] | Developer/Owner toggle matrix with strict Zero-Leak UI elimination |
| **Developer Payment Safeguard** | [Enabled/Disabled] | Grace period up to 8th of month, Owner-only banner |
| **Custom 404 Experience** | Optional product choice | Standalone `app/not-found.tsx` with playable HTML5 Canvas arcade mini-game, high score counter & return CTAs |
| **Models & State/Data Layer** | Conditional | Dedicated root `/models` (1 file per MongoDB model) + root `/context` (1 context per model + 3 global), context-first API encapsulation (Zero direct component API calls), in-place state mutation & single-fetch guarantee |
| **Backend Scaling & Resilience Engine** | When scale/reliability requirements justify it | 3-Tier Progressive Capacity Matrix, BullMQ 30s Heartbeat Lease Worker Failover, Two-Tier L1/L2 Cache with Redis Pub/Sub Invalidation, Payment Circuit Breaker & Safe Add/Remove Adapter Protocol (`modules/BACKEND_SCALING_AND_RESILIENCE_ARCHITECTURE.md`) |
| **Advanced System Designs & Hyper-Scale Patterns** | [Enabled/Disabled] | 20M Likes Buffer, Hybrid Push/Pull Feeds, Millions-Scale Reminders, Uber H3 Hexagonal Rides with Surge Pricing, CQRS Search, and 20 Production System Designs (`modules/ADVANCED_SYSTEM_DESIGNS_AND_HIGH_SCALE_PATTERNS.md`) |
| **Payment Idempotency & Reconciliation Engine** | [Enabled/Disabled] | Order-bound idempotency keys, Redis Mutex locking, Inquire-Before-Charge (IBC) timeout recovery, dual webhooks + BullMQ poller reconciliation (`modules/PAYMENT_IDEMPOTENCY_AND_RECONCILIATION_ENGINE.md`) |
| **Multi-Storage Polymorphic Media Engine** | [Enabled/Disabled] | Heterogeneous storage (Local, Vercel Blob, Supabase, Firebase, S3/R2, GridFS), presigned uploads, 2MB chunked GridFS streaming for Vercel Free plan, polymorphic `<UnifiedMedia />` resolver (`modules/MULTI_STORAGE_POLYMORPHIC_MEDIA_ENGINE.md`) |
| **Low-Bandwidth & Performance** | When required by measured constraints | 5 Pillars of Low-Bandwidth Speed: Adaptive WebP/AVIF images with BlurHash LQIP, React Server Component streaming (<50ms TTFB), MongoDB projection pruning, IndexedDB offline-first SWR cache, and 80KB JS budget (`modules/LOW_BANDWIDTH_AND_EXTREME_PERFORMANCE_ENGINE.md`) |
| **Optimistic Rapid-Click Batching Engine** | For high-frequency interactions where it fits | 0ms local optimistic UI updates with 300ms settling debounce & AbortController cancellation for pagination, cart quantity steppers, slide carousels, like bursts, and tri-state sorting (`modules/OPTIMISTIC_RAPID_CLICK_BATCHING_ENGINE.md`) |
| **Existing Project Retrofit Engine** | [Enabled/Disabled] | scoped, dependency-aware retrofit with independent review and evidence-based verification (`modules/EXISTING_PROJECT_RETROFIT_ENGINE.md`) |
| **Screen-Level Genie Trash Bin Deletion** | [Enabled/Disabled] | Kinetic right-edge bin entrance, screen portal elevation via getBoundingClientRect, 3D vacuum siphon drop, and layout glide re-flow (`design-system/APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md`) |

## 4. Acceptance Criteria & Success Metrics
- [ ] Users can authenticate via configured auth methods.
- [ ] Auth pages (`/login`, `/signup`, `/forgot-password`, `/reset-password`) feature ZERO demo credentials or quick-login buttons, and implement full bidirectional navigation ergonomics (Login ⇄ Signup ⇄ Forgot Password).
- [ ] Strict role-based permissions prevent unauthorized page visits and button actions.
- [ ] All forms feature robust validation with clear, responsive error toasts.
- [ ] Zero layout shifts, high aesthetic standard (curated typography, dark mode, smooth transitions).
- [ ] Every required acceptance criterion has fresh evidence; unconfigured checks are explicitly marked NOT CONFIGURED.
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
    AuthMiddleware -->|ODM / Queries| DB[(Database / MongoDB)]
    Backend -->|Webhooks / Notifications| External[WhatsApp / SMTP Services]
\`\`\`

## 2. Example Directory & Component Structure (Next.js Profile Only)
```
<project_root>/
├── app/                               # Next.js App Router (Root-level, NO src/ wrapper)
│   ├── (auth)/                        # Grouped auth routes (login, register, facelock)
│   ├── (dashboard)/                   # Protected dashboard routes (orders, cms, settings)
│   ├── (public)/                      # Public marketing / storefront routes
│   ├── api/                           # Serverless route handlers (REST endpoints, webhooks)
│   │   ├── auth/                      # Authentication endpoints
│   │   ├── payments/                  # Payment idempotency & webhook handlers
│   │   ├── media/                     # Streaming cached media (/api/media/[id]) & chunked upload
│   │   └── [resource]/                # Domain resource endpoints
│   ├── favicon.ico                    # Favicon
│   ├── globals.css                    # Tailwind CSS directives & theme variables
│   ├── layout.tsx                     # Root HTML, Fonts, and Master Provider tree
│   ├── not-found.tsx                  # Standalone 404 Canvas Mini-Game page
│   └── page.tsx                       # Public Home Landing Page
├── components/                        # Reusable React UI components
│   ├── ui/                            # Atomic primitives (Button, AppleGenieModal, FloatingInput, Badge, Toast)
│   ├── layout/                        # Sidebar, Navbar, PublicMobileBottomBar, DashboardMenuPill
│   ├── media/                         # UnifiedMedia, AdaptiveImage, VideoPlayer
│   └── modules/                       # Subsystem UI (OrderSlideView, CMSBuilder, FacelockScanner)
├── context/                           # Root domain state contexts (1 per model + Auth, Theme, Settings)
├── models/                            # Root MongoDB / Mongoose models (1 file per collection: User.ts, Order.ts, MediaAsset.ts)
├── hooks/                             # Custom React hooks (useAuth, useNetworkQuality, useResilientPayment, useMultiStorageUpload)
├── lib/                               # Server utilities, DB connection, storage adapters, payment locks
│   ├── db/                            # MongoDB connection pool (dbConnect.ts)
│   ├── storage/                       # Storage adapters (Supabase, Vercel Blob, GridFS, S3)
│   ├── payments/                      # Payment adapters & mutex locks (paymentLock.ts, jazzCashAdapter.ts)
│   └── utils/                         # Pure utility functions (formatting, CN helper)
├── public/                            # Static public assets (SVGs, brand logos, favicons suite, manifest)
├── styles/                            # Design tokens, keyframe animations, font definitions
├── rules/                             # Project-specific rules (generated from framework)
├── FILE-MAP.md                        # Living verified repository navigation map
├── .env.example                       # Documented environment variables template
├── next.config.ts                     # Next.js configuration (with edge image domains)
├── tailwind.config.ts                 # Tailwind configuration (dark mode, custom fonts, plugins)
└── tsconfig.json                      # Strict TypeScript configuration with root alias paths ("@/*": ["./*"])
```

## 3. Optional Database Schema Blueprint (MongoDB / NoSQL Example)
Define core document collections (users, companies/tenants, roles, orders, cms_posts, audit_logs).
Include BSON ObjectIds, tenant scoping (`companyId`), compound indexes, and validation rules.

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

Compile project-specific rules selected from `design-system/` (visual design) and `rules/` (engineering/security):
1. **Design Rules**: Palette tokens, CSS variables, dark/light contrast rules, responsive breakpoints.
2. **Backend & API Connection Rules**: API base URLs, typed error responses, CORS whitelists, connection timeouts.
3. **RBAC Guardrails**: Hierarchy tree, protected roles (Owner cannot be degraded; Developer cannot tamper business data).
4. **Developer Payment Safeguard Rules**: Logic for `{ paymentClear: boolean }`, 8th-day grace period, and Owner sticky banner.

---

---

## 🏃 File 4: `/.project/SPRINTS.md` Template

The agent must structure the implementation plan following the **6-Phase Non-Breaking Phased Architecture** defined in [`rules/EXPERT_ENGINEERING_AND_PHASED_PLANNING_SYSTEM.md`](rules/EXPERT_ENGINEERING_AND_PHASED_PLANNING_SYSTEM.md).

> 🛡️ **THE OPEN-CLOSED PHASED BUILD LAW**:  
> Every subsequent phase must build upon previous phases without breaking them. Existing working code is enhanced, never dismantled. All major new features and subsystems MUST reside in dedicated, newly created files that integrate cleanly through established interfaces.

```markdown
# Implementation Sprints: [Project Name]

- [ ] **Phase 1: Foundation & Identity Core (Zero-Debt Skeleton)**
  - [ ] Initialize the selected framework/runtime and its native type/config setup.
  - [ ] Configure database connection pool and environment variables template (`.env.example`)
  - [ ] Scaffold root `/models` and root `/context` directory structure
  - [ ] Implement minimal robust Auth: User model, password hashing (bcrypt), JWT session cookies, and login/signup handlers with strict Zero-Demo credentials policy and full inter-auth navigation ergonomics
  - [ ] Mount root navigation shells (Topbar and Sidebar skeleton)
  - [ ] Verification Gate: User can signup, login, view empty authenticated dashboard, and logout with zero warnings

- [ ] **Phase 2: Core Domain Purpose & Business Workflows (Functional Minimal Core)**
  - [ ] Define domain models and tenant scoping only when the selected database/product requires them.
  - [ ] Implement corresponding domain React Contexts in `context/` encapsulating 100% of API calls
  - [ ] Implement primary REST/Serverless CRUD API routes with strict validation (`POST`, `GET`, `PATCH`, `DELETE`)
  - [ ] Build functional master data tables and input forms (functional end-to-end before heavy styling)
  - [ ] Verification Gate: Primary business workflow executes with complete database mutation fidelity

- [ ] **Phase 3: Visual Excellence, Design System & Ergonomics**
  - [ ] Implement the selected styling system and design tokens per [`design-system/01_CSS_PROPERTIES_REFERENCE.md`](design-system/01_CSS_PROPERTIES_REFERENCE.md)
  - [ ] Apply visual effects (Glassmorphism, Frosted Glass, Border Beams, Ambient Mesh) per [`design-system/02_VISUAL_EFFECTS_CATALOGUE.md`](design-system/02_VISUAL_EFFECTS_CATALOGUE.md)
  - [ ] Scaffold production UI components (Floating Labels, Gated Action Buttons, Feedback Overlays) per [`design-system/03_UI_COMPONENTS_LIBRARY.md`](design-system/03_UI_COMPONENTS_LIBRARY.md) & [`design-system/09_IMPLEMENTATION_RECIPES.md`](design-system/09_IMPLEMENTATION_RECIPES.md)
  - [ ] Implement card layouts and stacked decks (Fan-Out, 3D Tilt, Bento Grids) per [`design-system/04_CARDS_AND_CARD_STACKS_LIBRARY.md`](design-system/04_CARDS_AND_CARD_STACKS_LIBRARY.md)
  - [ ] Configure keyframes, transitions, and scroll animations per [`design-system/05_ANIMATIONS_CATALOGUE.md`](design-system/05_ANIMATIONS_CATALOGUE.md)
  - [ ] Structure full page sections per [`design-system/06_WEBSITE_SECTIONS_LIBRARY.md`](design-system/06_WEBSITE_SECTIONS_LIBRARY.md) and industry archetypes per [`design-system/07_WEBSITE_DESIGN_PATTERNS.md`](design-system/07_WEBSITE_DESIGN_PATTERNS.md)
  - [ ] Build resizable `h-dvh` Sidebar, mobile bottom navigation bar with drawer, and dashboard floating glass menu pill
  - [ ] Enforce mobile responsive standard: zero horizontal overflow (`overflow-x: hidden`) and minimum `44x44px` touch targets
  - [ ] Verification Gate: Visual review passes on Desktop (`1440px`), Tablet (`768px`), and Mobile (`390px`)

- [ ] **Phase 4: Advanced Subsystems Expansion (Modular Plug-ins)**
  - *(Note: All subsystems built in dedicated new files; zero modification to core domain tables)*
  - [ ] Subsystem A: Omni-Chat & Socket.IO (`modules/CHAT_AND_COMMUNICATION_SYSTEM.md`) + Lightweight Concurrency (`modules/CHAT_LIGHTWEIGHT_CONCURRENCY_AND_COMPRESSION.md`)
  - [ ] Subsystem B: Autonomous AI Copilot with Voice Waveforms & Confirmation Gates (`modules/AI_ASSISTANT_AND_COPILOT_SYSTEM.md`)
  - [ ] Subsystem C: Next-Gen CMS Engine & 2D Vector Canvas with Knife Tool (`modules/CMS_ENGINE.md`)
  - [ ] Subsystem D: Public Enquiries & Leads Triage with Honeypot Defense (`modules/ENQUIRIES_AND_LEADS_SYSTEM.md`)
  - [ ] Subsystem E: Newsletter Canvas Studio & Blog Engine with Dynamic CMS Loop (`modules/NEWSLETTER_AND_BLOGS_SYSTEM.md`)
  - [ ] Subsystem F: Automations, SMTP & WhatsApp Dispatches (`modules/AUTOMATIONS_AND_NOTIFICATIONS.md`)
  - [ ] Subsystem G: Keyboard Shortcuts Engine (`modules/SHORTCUT_KEYS_SYSTEM.md`)
  - [ ] Subsystem H: Three.js 3D Model Architecture, Parts Inspection & Anatomy Engine (`design-system/THREEJS_3D_MODEL_ARCHITECTURE_AND_INSPECTION_SYSTEM.md`)
  - [ ] Subsystem I: 24/7 Autonomous AI Lead Responder, Auto-Guide & Booking/Order Engine (`modules/AUTONOMOUS_AI_LEAD_RESPONDER_AND_BOOKING_SYSTEM.md`)
  - [ ] Verification Gate: Each modular subsystem functions smoothly and interacts strictly via context hooks

- [ ] **Phase 5: Sovereign Security, Biometrics & Hardening**
  - [ ] Enforce granular Role-Based Access Control (`<resource>:<action>`) across UI buttons and API endpoints
  - [ ] Implement custom AI Face Recognition biometrics (128-d vector embeddings)
  - [ ] Implement the selected framework's server-side route protection and session invalidation when auth/protected routes are in scope.
  - [ ] Implement Developer Payment Safeguard banner for Owner
  - [ ] Implement standalone interactive Universal 404 Arcade Game page (`app/not-found.tsx`)
  - [ ] Verification Gate: Penetration tests pass; unauthorized actions blocked with flash toasts

- [ ] **Phase 6: Universal Verification, Chaos Testing & Code Review Gate**
  - [ ] Execute the 7-Tier Universal Verification Lifecycle (`rules/TESTING_AND_VERIFICATION.md`)
  - [ ] Tier 1: Run configured project-native build and typecheck commands when applicable.
  - [ ] Tier 2 (Chaos Monkey): Fuzz forms and endpoints with `null`, `undefined`, extreme strings, and multi-clicks
  - [ ] Tier 3: Verify zero dirty state mutations in database
  - [ ] Tier 4: Verify state/data access follows the project's established architecture.
  - [ ] Tier 5: Verify zero leaked backend technical jargon on UI
  - [ ] Tier 6: Verify relevant visual/motion behavior and responsive viewports.
  - [ ] Tier 7: Perform Principal Code Review using 8-point inspection checklist
  - [ ] Execute configured, relevant tests/build/typecheck/lint/browser checks and complete the acceptance evidence ledger.
  - [ ] Verification Gate: Fresh terminal output evidence recorded; final build signed off
```

