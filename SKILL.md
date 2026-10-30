---
name: website-builder-engine
description: Use when planning, architecting, scaffolding, building, or modifying full-stack web applications, CMS, dashboards, APIs, or SaaS using Next.js, FastAPI, Node.js, and MongoDB
---

# Website Builder & Autonomous Web Engineering Engine (`website-builder-engine`)

> **PURPOSE**: Master production architecture and autonomous engineering engine for building complete, high-performance, non-breaking web applications in a single run. Enforces Rule Zero ("Plan First, Code Second"), bespoke visual branding, root-level `/app` directory standard (Zero `src/` wrapper), polymorphic multi-storage, split-brain payment resilience, 5-pillar low-bandwidth performance, optimistic rapid-click batching, and mandatory deep-documentation inspection.

---

## 🧠 MANDATORY DEEP-INSPECTION & ZERO-SHALLOW DIRECTIVE

> ⚠️ **STRICT MANDATE FOR ALL AI AGENTS & PAIR PROGRAMMERS**:  
> When the `/website-builder-engine` command or skill is activated, you **MUST NOT** provide shallow, generic, or off-the-cuff boilerplate code. You **MUST NOT** rely on vague memory or hallucinate patterns when canonical, battle-tested specifications exist in this framework.
> 
> **Every decision and architecture proposal MUST be grounded in the framework's actual documentation files:**
> 1. **Scan the Living Map First**: Always consult [`FILE-MAP.md`](./FILE-MAP.md) to locate the exact module, rule, or design pattern needed.
> 2. **Read Before Designing or Coding**: You MUST explicitly read the canonical documentation files (`modules/`, `rules/`, `design-system/`) relevant to the user's task before proposing solutions or scaffolding code.
> 3. **Cite & Link Specific Blueprints**: Explicitly reference the underlying module specification, models, hooks, and component recipes in your plan.
> 4. **No Generic Fallbacks**: If the user asks for pagination, cart steppers, modals, auth, or storage, you MUST use the engine's canonical implementations (`useRapidClickBatcher`, `AppleGenieModal`, `useResilientPayment`, `useMultiStorageUpload`, `UnifiedMedia`, `useNetworkQuality`), NEVER generic un-optimized placeholders.

---

## 🛑 Rule Zero: The Absolute Prerequisite

```
                     ┌─────────────────────────────┐
                     │  New User Request Received  │
                     └──────────────┬──────────────┘
                                    │
                                    ▼
                      /───────────────────────────\
                     <  Does /.project/PLAN.md     >
                     <  already exist & approved?  >
                      \───────────────────────────/
                                    │
                    NO              │            YES
               ┌────────────────────┴───────────────────┐
               ▼                                        ▼
┌──────────────────────────────────┐     ┌──────────────────────────────┐
│ STOP! DO NOT WRITE ANY CODE.     │     │ 1. Read .project/PLAN.md     │
│ 1. Load DISCOVERY_QUESTIONNAIRE  │     │ 2. Read .project/RULES.md    │
│ 2. Ask user clarifying questions │     │ 3. Execute current Sprint    │
│ 3. Generate .project/ plan       │     │ 4. Verify evidence & test    │
└──────────────────────────────────┘     └──────────────────────────────┘
```

**Never start scaffolding or writing production code until the user approves the generated plan file!** Doing otherwise results in architectural drift, token waste, and painful rework.

---

## 📋 The 5-Phase Agent Execution Protocol

### Phase 1: Interactive Discovery Interview
When the user presents an idea or starts a new project:
1. Open [`DISCOVERY_QUESTIONNAIRE.md`](./DISCOVERY_QUESTIONNAIRE.md).
2. Ask questions in structured, digestible batches (grouped logically: Scope -> UI/UX -> RBAC -> Features -> Safeguards -> Storage -> Performance).
3. **Explicit Backend Placement Inquiry**: Ask whether backend is Unified Monolith, Dual Next.js (`frontend/` + `backend/`), FastAPI (Python), or Node.js.
4. Support the user in their preferred language (English, Urdu, or Roman Urdu).

---

### Phase 2: Project Workspace Initialization
Once answers are received:
1. Create a dedicated project configuration directory at the root (`/.project/` or `/projects/<project-name>/`).
2. Generate the core blueprint files using [`PLAN_BUILDER.md`](./PLAN_BUILDER.md):
   - `PLAN.md`: Objectives, stack, chosen modules, and scope boundaries.
   - `ARCHITECTURE.md`: Data models, API contracts, RBAC permissions, and root-level `/app` file structure.
   - `RULES.md`: Design rules extracted from `design-system/` plus engineering rules from `rules/`.
   - `SPRINTS.md`: Phased task list with clear checkboxes and test gates.
   - `FILE-MAP.md`: Living repository navigation map per [`rules/SAFE_DEVELOPMENT_AND_FILE_MAP_RULES.md`](./rules/SAFE_DEVELOPMENT_AND_FILE_MAP_RULES.md).
3. Present the plan summary to the user and request explicit confirmation to proceed.

---

### Phase 3: Scaffolding & Foundation First
Once the plan is approved:
1. **Root-Level `/app` Directory Standard (Zero `src/` Wrapper)**:
   - Place Next.js App Router directly at `<root>/app/`.
   - Sibling root directories: `/app`, `/components`, `/context`, `/models`, `/hooks`, `/lib`, `/public`, `/styles`.
   - Path alias: `"@/*": ["./*"]` in `tsconfig.json`.
2. **Original & Bespoke Design Mandate ("Design Apna Banana Hai")**:
   - Never copy documentation code examples or dummy colors verbatim.
   - Craft a bespoke visual identity, palette, and custom typography pairing per [`design-system/DESIGN_ARCHITECTURE.md`](./design-system/DESIGN_ARCHITECTURE.md).
3. **Bespoke Brand Logo & Complete Favicon Suite**:
   - Create vector brand logos (wordmark + 32x32 glyph) and full favicon suite (`favicon.ico`, `icon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest`).
4. **Zero-Bar Draggable Modals & Apple Genie Origin-Morph System**:
   - Implement macOS 3D Genie Origin-Morph animation unrolling from origin buttons per [`design-system/APPLE_GENIE_ORIGIN_MORPH_SYSTEM.md`](./design-system/APPLE_GENIE_ORIGIN_MORPH_SYSTEM.md).
5. **Database Schemas & Models**:
   - Dedicated root `/models` (1 collection per file) following [`rules/MODELS_AND_CONTEXTS_ARCHITECTURE.md`](./rules/MODELS_AND_CONTEXTS_ARCHITECTURE.md).

---

### Phase 4: Master Modular Subsystems Library

Before designing or implementing any subsystem, the agent **MUST read the canonical specification**:

| Domain | Capability | Canonical Framework Specification |
| :--- | :--- | :--- |
| **Interactive UI** | Optimistic Rapid-Click Batching (Pagination, Steppers, Slides, Likes) | [`modules/OPTIMISTIC_RAPID_CLICK_BATCHING_ENGINE.md`](./modules/OPTIMISTIC_RAPID_CLICK_BATCHING_ENGINE.md) |
| **Performance** | Low-Bandwidth 2G/3G & 5-Pillar Speed (BlurHash LQIP, RSC, SWR) | [`modules/LOW_BANDWIDTH_AND_EXTREME_PERFORMANCE_ENGINE.md`](./modules/LOW_BANDWIDTH_AND_EXTREME_PERFORMANCE_ENGINE.md) |
| **Storage** | Multi-Storage Polymorphic & Vercel Free Bypass (Presigned, 2MB GridFS) | [`modules/MULTI_STORAGE_POLYMORPHIC_MEDIA_ENGINE.md`](./modules/MULTI_STORAGE_POLYMORPHIC_MEDIA_ENGINE.md) |
| **Fintech** | Idempotency, Mutex & Timeout Reconciliation (Inquire-Before-Charge) | [`modules/PAYMENT_IDEMPOTENCY_AND_RECONCILIATION_ENGINE.md`](./modules/PAYMENT_IDEMPOTENCY_AND_RECONCILIATION_ENGINE.md) |
| **Scaling** | BullMQ 30s Heartbeat Lease & Two-Tier L1/L2 Redis Cache | [`modules/BACKEND_SCALING_AND_RESILIENCE_ARCHITECTURE.md`](./modules/BACKEND_SCALING_AND_RESILIENCE_ARCHITECTURE.md) |
| **High Scale** | 20 Production Hyper-Scale Blueprints (20M Likes, Feeds, Reminders) | [`modules/ADVANCED_SYSTEM_DESIGNS_AND_HIGH_SCALE_PATTERNS.md`](./modules/ADVANCED_SYSTEM_DESIGNS_AND_HIGH_SCALE_PATTERNS.md) |
| **Orders** | Dual-View Master Table & 1-by-1 Slide Review Carousel | [`modules/ORDER_SLIDE_WORKFLOW.md`](./modules/ORDER_SLIDE_WORKFLOW.md) |
| **Data Tables** | Marquee Box Drag Select, Tri-State Sorting & Smart Pagination | [`modules/DATA_TABLE_AND_CARDS_SYSTEM.md`](./modules/DATA_TABLE_AND_CARDS_SYSTEM.md) |
| **CMS** | Monaco/WYSIWYG, Dynamic PDF Canvas, Email Builder & Visual Studio | [`modules/CMS_ENGINE.md`](./modules/CMS_ENGINE.md) |
| **Auth** | Biometric AI Face Models (128-d Vector Embeddings) & Multi-Account | [`modules/AUTH_AND_FACELOCK.md`](./modules/AUTH_AND_FACELOCK.md) |
| **Settings** | Dual-Tier (Normal & System) Settings Hub & Live Ping Tests | [`modules/SETTINGS_AND_FEATURE_FLAGS_SYSTEM.md`](./modules/SETTINGS_AND_FEATURE_FLAGS_SYSTEM.md) |
| **Route Proxy** | Edge Middleware, Interception Toasts & Session Cache Invalidation | [`modules/ROUTE_PROXY_AND_PROTECTION_SYSTEM.md`](./modules/ROUTE_PROXY_AND_PROTECTION_SYSTEM.md) |
| **Chat** | Real-Time Omni-Chat & Binary WebSocket Concurrency Compression | [`modules/CHAT_AND_COMMUNICATION_SYSTEM.md`](./modules/CHAT_AND_COMMUNICATION_SYSTEM.md) |
| **AI Copilot** | Multimodal Copilot, Table Ingestion, CMS Generator & Actions | [`modules/AI_ASSISTANT_AND_COPILOT_SYSTEM.md`](./modules/AI_ASSISTANT_AND_COPILOT_SYSTEM.md) |
| **Leads** | Autonomous AI Lead Responder & Calendar Booking Engine | [`modules/AUTONOMOUS_AI_LEAD_RESPONDER_AND_BOOKING_SYSTEM.md`](./modules/AUTONOMOUS_AI_LEAD_RESPONDER_AND_BOOKING_SYSTEM.md) |
| **Public Enquiries** | Public Contact Forms & Dashboard Enquiries Inbox | [`modules/ENQUIRIES_AND_LEADS_SYSTEM.md`](./modules/ENQUIRIES_AND_LEADS_SYSTEM.md) |
| **Blogs** | Newsletter Studio, Blog Engine & Public Content Feeds | [`modules/NEWSLETTER_AND_BLOGS_SYSTEM.md`](./modules/NEWSLETTER_AND_BLOGS_SYSTEM.md) |
| **Social** | Recursive Nested Comments, Reactions & Upvotes | [`modules/INFINITE_COMMENTS_AND_REPLIES_SYSTEM.md`](./modules/INFINITE_COMMENTS_AND_REPLIES_SYSTEM.md) |
| **Education** | LMS Live Video Streaming & Virtual Classroom Studio | [`modules/LMS_LIVE_STREAMING_AND_INTERACTIVE_CLASSES.md`](./modules/LMS_LIVE_STREAMING_AND_INTERACTIVE_CLASSES.md) |
| **Mobile UX** | Public Bottom Bar vs Floating Dashboard Menu Pill | [`modules/MOBILE_NAVIGATION_AND_LAYOUT.md`](./modules/MOBILE_NAVIGATION_AND_LAYOUT.md) |
| **Multi-Tenancy** | Subdomain Routing, Custom Domains & Multi-Company DB Isolation | [`modules/MULTI_TENANT_SYSTEM.md`](./modules/MULTI_TENANT_SYSTEM.md) |
| **Access Control** | 5-Role RBAC Matrices & Permission Guards | [`modules/RBAC_SYSTEM.md`](./modules/RBAC_SYSTEM.md) |
| **Productivity** | Global Keyboard Shortcuts & Command Palette | [`modules/SHORTCUT_KEYS_SYSTEM.md`](./modules/SHORTCUT_KEYS_SYSTEM.md) |
| **Notifications** | SMTP Email Engine & WhatsApp Business Automation | [`modules/AUTOMATIONS_AND_NOTIFICATIONS.md`](./modules/AUTOMATIONS_AND_NOTIFICATIONS.md) |
| **404 UX** | Standalone Canvas Arcade Mini-Game Page | [`modules/NOT_FOUND_PAGE.md`](./modules/NOT_FOUND_PAGE.md) |
| **3D Graphics** | Three.js GLTF Viewer & Inspection Studio | [`design-system/THREEJS_3D_MODEL_ARCHITECTURE_AND_INSPECTION_SYSTEM.md`](./design-system/THREEJS_3D_MODEL_ARCHITECTURE_AND_INSPECTION_SYSTEM.md) |

---

### Phase 5: Verification, Quality Gate & Synchronization
Before marking any task, sprint, or PR as complete:
1. Execute the **7-Tier Universal Verification Lifecycle** per [`rules/TESTING_AND_VERIFICATION.md`](./rules/TESTING_AND_VERIFICATION.md):
   - Tier 1: Static TypeScript Gate (`npx tsc --noEmit` & `npm run build` exit code 0).
   - Tier 2: Adversarial "Brainless User" Chaos Testing.
   - Tier 3: API Contracts & DB Mutation Fidelity.
   - Tier 4: Single Source of Truth & Context Law (zero direct component API calls).
   - Tier 5: Line-by-Line Algorithmic Audit & Dead Code Purge.
   - Tier 6: UI Copywriting & UX Predictability (no technical leaks).
   - Tier 7: Visual, Responsive, Theme & 60 FPS Animations.
2. Synchronize the repository's root [`FILE-MAP.md`](./FILE-MAP.md) to record all verified entry points, routes, and execution flows.
3. Mark completed items in `.project/SPRINTS.md` with concrete verification evidence.

---

## ⚡ Non-Negotiable Engineering Guardrails

1. **The Zero-Regression & Anti-Bloat Law ("Cheezain Tore Baghair Kaam Karna")**: Never modify existing working code blindly. Always trace imports, models, and routes first. Additive-only changes; never rename/delete existing exports without migration. Strictly forbid duplicate utility functions or redundant npm packages (`fetch` vs `axios`, `date-fns` vs `moment`).
2. **The Root-Level `/app` Directory Standard (Zero `src/` Wrapper)**: Next.js App Router must live directly at `<root>/app/`. No `src/` folder.
3. **Optimistic Rapid-Click Batching Mandate**: High-frequency interactive controls (pagination, cart `+`/`-`, slide carousel, likes, sorting) MUST use `useRapidClickBatcher` with 300ms settling debounce, instant 0ms optimistic UI updates, and `AbortController` cancellation. Never freeze or disable buttons on the first click.
4. **Strict Zero-Leak Feature Flagging**: When a feature is toggled OFF, it must completely disappear from the UI with zero disabled buttons or teaser menus. Direct URL visits yield a clean 404 Not Found.
5. **Inquire-Before-Charge Payments**: Never double-charge a user on network timeouts. Query bank Status API before creating secondary charges.
6. **Direct-to-Storage Presigned Uploads**: Bypass Vercel Free plan's 4.5MB limit by streaming large files directly to cloud storage buckets or using 2MB chunked GridFS streaming.
7. **Low-Bandwidth 5-Pillar Speed**: Auto-transcode uploads to WebP/AVIF with 20-char BlurHash LQIP, stream RSC shells in < 50ms, prune MongoDB listing payloads by 90%, and auto-downgrade heavy 3D/video assets on slow 2G/Save-Data.
