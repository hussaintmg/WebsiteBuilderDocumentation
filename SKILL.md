---
name: website-builder-engine
description: Use when planning, building, debugging, retrofitting, modernizing, or verifying web applications and full-stack projects across existing stacks. Requires architecture-aware discovery, scoped implementation, real verification evidence, and truthful completion reporting.
---

# Website Builder & Autonomous Web Engineering Engine (`website-builder-engine`)

> **PURPOSE**: Master production architecture and autonomous engineering engine for building, modernizing, and retrofitting complete, high-performance, non-breaking web applications in a single run. Enforces Rule Zero ("Plan First, Code Second"), bespoke visual branding, root-level `/app` directory standard (Zero `src/` wrapper), polymorphic multi-storage, split-brain payment resilience, 5-pillar low-bandwidth performance, optimistic rapid-click batching, mandatory deep-documentation inspection, and automated evidence-based acceptance criteria audit score gates.

---



## MANDATORY EXECUTION CONTRACT — OVERRIDES LEGACY CONFLICTS

This contract has precedence over older examples, score gates, and stack-specific defaults elsewhere in this skill.

### A. Discover the real project before choosing an architecture
1. Inspect repository root, all relevant source/configuration files, package manifests and lockfiles, framework entry points, route structure, existing design tokens/components, data models, API boundaries, auth/RBAC, tests, CI and deployment configuration.
2. Identify the actual framework, language, package manager, runtime, workspace/monorepo boundaries and installed libraries from repository evidence. Do not infer Next.js, MongoDB, Tailwind, Framer Motion, Lucide, a root `/app`, or any other stack component unless the project demonstrates it or the user explicitly requests it.
3. For large repositories, use a repeatable inventory and targeted file reads. Record what was inspected and what could not be inspected; never claim a complete audit when files were truncated, inaccessible or skipped.
4. Read only the documentation modules relevant to the request and its discovered dependencies. Load additional modules when implementation reveals a dependency.

### B. Understand intent and control scope
1. Translate the request into observable outcomes and acceptance criteria before editing.
2. Classify work as: required, dependency-required, optional recommendation, or unrelated. Implement the first two categories; do not silently expand into unrelated redesigns or rewrites.
3. Inspect broadly to understand impact, but change only the requested outcome and necessary connected work.
4. Preserve existing architecture, naming, conventions, working behavior and useful documentation unless a documented reason and migration plan justify a change.
5. Ask a concise clarification only when a decision materially changes architecture, security, cost, user-visible behavior or irreversible data operations. Otherwise choose the least disruptive evidence-based default and state it.

### C. Plan and implement in safe phases
1. Establish a baseline: current git status/diff, existing tests, build state and known failures. Never overwrite user changes.
2. Produce a dependency-aware plan listing affected files, contracts, migration risks, acceptance criteria and verification commands.
3. Implement the smallest coherent vertical slice, then integrate dependent layers. Keep API, schema, UI, permissions, loading/error/empty states and responsive behavior consistent.
4. Use existing project libraries and design system before introducing dependencies. Add dependencies only when justified and compatible with the package manager/runtime.
5. Do not generate placeholder handlers, fake data presented as real, dead controls, TODO-only implementations or success states that are not backed by actual operations.
6. Preserve backward compatibility where required; use explicit migrations and rollback plans for data/schema changes.

### D. Design and motion must be contextual and complete
1. Existing brand, visual language, accessibility, platform conventions and user requirements outrank generic aesthetic mandates. Glassmorphism, dark mode, floating labels, sidebars, specific icon libraries and any one animation style are optional unless requested or already part of the product system.
2. Treat animation documentation as a pattern library, not a requirement to add motion to every control.
3. For multi-stage motion, specify semantic stages, start/end states, timing, easing, interruption/cancellation behavior, reduced-motion fallback and final layout/data state. Two CSS keyframes can interpolate smoothly; the acceptance criterion is whether the complete intended choreography is present and works, not the number of keyframes.
4. Verify motion in a real browser when browser tooling is available. Check actual rendered states, clipping/overflow, stacking contexts, responsive layouts, reduced motion and interaction interruption. If browser verification is unavailable, report it as NOT VERIFIED.

### E. Verification is evidence-based; no false passes
1. Execute the relevant existing test command(s). A test file existing is not evidence that tests passed.
2. Run the project's actual build, typecheck and lint commands when configured and relevant. Do not substitute a guessed command or install dependencies without authorization/context.
3. For projects with no test script, report TESTS: NOT CONFIGURED / NOT VERIFIED. Do not mark them passed.
4. A JavaScript project without TypeScript is NOT APPLICABLE for TypeScript checking, not a TypeScript pass.
5. Separate PASS, FAIL, NOT RUN, NOT CONFIGURED, NOT APPLICABLE and BLOCKED. Every PASS must include the command/tool, exit status and useful output/evidence.
6. Compare against the baseline and run focused regression tests for changed behavior. Add tests for new behavior and bug fixes when a test harness exists.
7. Static regex checks are advisory only. They cannot prove visual quality, runtime correctness, security, API behavior or animation quality.
8. Do not use a universal percentage threshold as a completion gate. Completion is based on acceptance criteria and evidence for the actual task.

### F. Completion report
Report: requested outcomes; files changed; important design/architecture decisions; tests/build/typecheck/lint/browser checks with exact status; known failures and pre-existing failures; unverified items and why; migration/deployment steps; and remaining risks.
Never say "complete", "passed", "production-ready" or "verified" for an item without supporting evidence. If a tool or environment prevents verification, say so plainly and identify the next exact step.

## 🌐 UNIVERSAL CROSS-PLATFORM PATH RESOLUTION LAW

> 📌 **CROSS-ENVIRONMENT COMPLIANCE DIRECTIVE**:  
> The Website Builder Engine is designed to run seamlessly across all major AI coding environments:
> - **Claude Code**: Installed at `~/.claude/skills/website-builder-engine/` or in project configuration.
> - **Google Gemini / Antigravity**: Installed at `~/.gemini/config/skills/website-builder-engine/`.
> - **Cursor / VS Code**: Installed at `~/.cursor/skills/` or cloned in your active workspace.
> - **Autonomous CLI / CI/CD**: Supported via environment variable `WEBSITE_BUILDER_SKILL_DIR` or the global CLI `node scripts/website-builder.js`.
> 
> The framework automatically resolves its canonical root via `scripts/resolve-paths.js`. You may invoke commands using standard relative paths, via the unified CLI `website-builder`, or directly via node:
> - **Audit CLI Runner**: `node scripts/audit-engine.js .` *(or `node scripts/website-builder.js audit .`)*
> - **Scaffolding Runner**: `node scripts/scaffold-engine.js .` *(or `node scripts/website-builder.js scaffold .`)*
> - **Documentation Loader**: `node scripts/load-docs.js <topic>` *(or `node scripts/website-builder.js docs <topic>`)*
> - **Automated Test Suite**: `npm test` *(or `node scripts/website-builder.js test`)*

---

## 🧠 MANDATORY TIERED PROGRESSIVE INGESTION PROTOCOL

> ⚡ **CRITICAL FIRST ACTION FOR THE AGENT (NO CONTEXT BLOWOUT)**:  
> Attempting to read the entire 1.8MB `BRAIN.md` in one turn causes tool read limits (46KB) or context truncation.
> The framework enforces **Tiered Progressive Ingestion**:
> 
> 1. **Step 1 — Ingest Tier 0 Core Laws**: Read [`rules/CORE_DIRECTIVE.md`](./rules/CORE_DIRECTIVE.md) and [`rules/MANDATORY_EXECUTION_CHECKLIST.md`](./rules/MANDATORY_EXECUTION_CHECKLIST.md). This loads all mandatory architectural rules, context laws, motion physics, and test gates into working memory in under 200 lines.
> 2. **Step 2 — Load Targeted Module on Demand**: Use [`SKILL_MANIFEST.json`](./SKILL_MANIFEST.json) or run `node scripts/load-docs.js <topic>` (e.g. `responsive-tabs`, `buttons`, `auth`, `datatable`, `genie-trash`, `retrofit`) to load ONLY the exact specifications needed for your active task.
> 3. **Step 3 — Master Brain Reference**: `BRAIN.md` is compiled as a unified single-file offline reference and search index. Compile anytime via `node scripts/compile-brain.js`.

---

## 🧠 MANDATORY DEEP-INSPECTION & ZERO-SHALLOW DIRECTIVE

> ⚠️ **STRICT MANDATE FOR ALL AI AGENTS & PAIR PROGRAMMERS**:  
> When the `/website-builder-engine` command or skill is activated, you **MUST NOT** provide shallow, generic, or off-the-cuff boilerplate code. You **MUST NOT** rely on vague memory or hallucinate patterns when canonical, battle-tested specifications exist in this framework.
> 
> **Every decision and architecture proposal MUST be grounded in the framework's actual documentation files:**
> 1. **Scan the Living Map First**: Always consult [`FILE-MAP.md`](./FILE-MAP.md) or [`SKILL_MANIFEST.json`](./SKILL_MANIFEST.json) to locate the exact module, rule, or design pattern needed.
> 2. **Read Before Designing or Coding**: You MUST explicitly read the canonical documentation files (`modules/`, `rules/`, `design-system/`) relevant to the user's task before proposing solutions or scaffolding code.
> 3. **Cite & Link Specific Blueprints**: Explicitly reference the underlying module specification, models, hooks, and component recipes in your plan.
> 4. **No Generic Fallbacks**: If the user asks for pagination, cart steppers, modals, auth, or storage, you MUST use the engine's canonical implementations (`useRapidClickBatcher`, `AppleGenieModal`, `useResilientPayment`, `useMultiStorageUpload`, `UnifiedMedia`, `useNetworkQuality`), NEVER generic un-optimized placeholders.

---

## Project Intelligence, Scope and Independent Review

Before implementing a task, use:
- [Project Intelligence Engine](./engines/PROJECT_INTELLIGENCE.md) to discover the actual architecture and trace the relevant dependency graph.
- [Intent and Scope Engine](./engines/INTENT_AND_SCOPE.md) to turn the request into acceptance criteria and prevent unrelated work.
- [Independent Reviewer](./engines/INDEPENDENT_REVIEWER.md) to inspect the final diff and evidence.
- [Acceptance Criteria Ledger](./quality/ACCEPTANCE_CRITERIA.md) for task-specific verification.
- [Animation QA](./quality/ANIMATION_QA.md) whenever the task changes meaningful motion.

These are required workflow guides; their instructions remain architecture-aware and do not force a particular stack or visual style.

## 🧭 DUAL WORKFLOW PROTOCOL: GREENFIELD VS EXISTING RETROFIT

Choose your workflow based on the current workspace state:

```
                     ┌─────────────────────────────┐
                     │  New User Request Received  │
                     └──────────────┬──────────────┘
                                    │
                                    ▼
                      /───────────────────────────\
                     <    Is this an EXISTING      >
                     <    Website / Repository?    >
                      \───────────────────────────/
                                    │
                     YES            │            NO (Greenfield)
               ┌────────────────────┴───────────────────┐
               ▼                                        ▼
┌──────────────────────────────────┐     ┌──────────────────────────────┐
│ WORKFLOW B: RETROFIT ENGINE      │     │ WORKFLOW A: GREENFIELD BUILD │
│ 1. Run audit-engine.js baseline  │     │ 1. Rule Zero: Discovery Qs   │
│ 2. Read RETROFIT_ENGINE.md       │     │ 2. Generate /.project/PLAN   │
│ 3. Upgrade UI, Motion, Security  │     │ 3. Scaffold Root /app & DB   │
│ 4. Implement scoped changes and verify each acceptance criterion with evidence       │     │ 4. Phased Sprints Execution  │
└──────────────────────────────────┘     └──────────────────────────────┘
```

---

## 🛠️ WORKFLOW A: GREENFIELD APPLICATION SCAFFOLDING

### Phase 1: Interactive Discovery Interview
When starting a brand new project:
1. Open [`DISCOVERY_QUESTIONNAIRE.md`](./DISCOVERY_QUESTIONNAIRE.md).
2. Ask questions in structured, digestible batches (Scope -> UI/UX -> RBAC -> Features -> Safeguards -> Storage -> Performance).
3. **Backend Placement Inquiry**: Ask whether backend is Unified Monolith, Dual Next.js (`frontend/` + `backend/`), FastAPI (Python), or Node.js.
4. Support the user in their preferred language (English, Urdu, or Roman Urdu).

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

## ⚡ WORKFLOW B: EXISTING PROJECT RETROFIT & MODERNIZATION

> 🛡️ **THE AUTONOMOUS UPGRADE MANDATE**:  
> When instructed to *"complete this existing website according to the skill"*, *"modernize this project"*, or *"is website ko theek karo"*, you **MUST NOT** exit prematurely after doing 1 or 2 cosmetic edits. You must follow the 6-stage protocol in [`modules/EXISTING_PROJECT_RETROFIT_ENGINE.md`](./modules/EXISTING_PROJECT_RETROFIT_ENGINE.md):

1. **Run Automated Baseline Audit**:
   ```bash
   node scripts/audit-engine.js .
   # Or via global CLI: node scripts/website-builder.js audit .
   ```
2. **Generate Gap Checklist (`.project/RETROFIT_PLAN.md`)**:
   Record all failing items (missing animations, plain HTML inputs, direct component API calls, demo buttons, missing edge proxy).
3. **Harmonize Packages**: Install `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge` if missing.
4. **Execute End-to-End Visual Overhaul Across ALL Pages**:
   - Wrap page containers with Framer Motion entry transitions (`initial={{ opacity: 0, y: 16 }}`).
   - Elevate cards and dialogs to frosted glassmorphism (`backdrop-blur-xl bg-neutral-900/60 border border-white/10`).
   - Add micro-animations (`transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`) to interactive elements.
   - Upgrade flat inputs to Floating Label inputs per [`design-system/03_UI_COMPONENTS_LIBRARY.md`](./design-system/03_UI_COMPONENTS_LIBRARY.md).
   - Implement public mobile bottom bar & dashboard floating menu pill (`"Menu"` / `"Close"`).
5. **Security & Context Law Retrofit**:
   - Purge all demo accounts / "Click to login as Admin" backdoor buttons from `/login`, `/signup`, `/forgot-password`.
   - Add inter-auth navigation links (`"Forgot password?"`, `"Don't have an account? Sign up"`, `"Already have an account? Log in"`).
   - Move direct page component `fetch`/`axios` calls into dedicated domain Contexts (`/context/`).
   - Deploy Next.js Edge Middleware (`middleware.ts`).
6. **Continuous Audit Loop**:
   - Re-run `audit-engine.js`.
   - **DO NOT STOP** until the script exits with Code 0 (Score >= 95%).
   - Verify `npm run build` succeeds with zero errors.

---

## 📚 Master Modular Subsystems Library

Before designing or implementing any subsystem, the agent **MUST read the canonical specification**:

| Domain | Capability | Canonical Framework Specification |
| :--- | :--- | :--- |
| **Retrofit** | Existing Website Modernization & evidence-based acceptance criteria Audit Protocol | [`modules/EXISTING_PROJECT_RETROFIT_ENGINE.md`](./modules/EXISTING_PROJECT_RETROFIT_ENGINE.md) |
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
| **Trash & Delete** | Apple macOS Screen-Level Genie Trash Bin & Vacuum Deletion | [`design-system/APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md`](./design-system/APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md) |

---

## ⚡ Non-Negotiable Engineering Guardrails

1. **The Zero-Regression & Anti-Bloat Law ("Cheezain Tore Baghair Kaam Karna")**: Never modify existing working code blindly. Always trace imports, models, and routes first. Additive-only changes; never rename/delete existing exports without migration. Strictly forbid duplicate utility functions or redundant npm packages (`fetch` vs `axios`, `date-fns` vs `moment`).
2. **The Root-Level `/app` Directory Standard (Zero `src/` Wrapper)**: Next.js App Router must live directly at `<root>/app/`. No `src/` folder.
3. **Optimistic Rapid-Click Batching Mandate**: High-frequency interactive controls (pagination, cart `+`/`-`, slide carousel, likes, sorting) MUST use `useRapidClickBatcher` with 300ms settling debounce, instant 0ms optimistic UI updates, and `AbortController` cancellation. Never freeze or disable buttons on the first click.
4. **Strict Zero-Leak Feature Flagging**: When a feature is toggled OFF, it must completely disappear from the UI with zero disabled buttons or teaser menus. Direct URL visits yield a clean 404 Not Found.
5. **Inquire-Before-Charge Payments**: Never double-charge a user on network timeouts. Query bank Status API before creating secondary charges.
6. **Direct-to-Storage Presigned Uploads**: Bypass Vercel Free plan's 4.5MB limit by streaming large files directly to cloud storage buckets or using 2MB chunked GridFS streaming.
7. **Low-Bandwidth 5-Pillar Speed**: Auto-transcode uploads to WebP/AVIF with 20-char BlurHash LQIP, stream RSC shells in < 50ms, prune MongoDB listing payloads by 90%, and auto-downgrade heavy 3D/video assets on slow 2G/Save-Data.
8. **Strict Zero-Demo Security & Inter-Auth Navigation Ergonomics**: All authentication views (`/login`, `/signup`, `/forgot-password`, `/reset-password`) must NEVER include pre-filled demo accounts or "Click to login as Admin/Owner" demo buttons. Form input states must initialize to clean empty strings (`""`). Additionally, ensure full bidirectional navigation ergonomics: `/login` must feature a right-aligned "Forgot password?" link adjacent to the password input label and a bottom-card "Don't have an account? Sign up" link; `/signup` must feature an "Already have an account? Log in" footer link; and password recovery views must feature a "← Back to log in" link per [`modules/AUTH_AND_FACELOCK.md`](./modules/AUTH_AND_FACELOCK.md).
9. **Autonomous Retrofit & evidence-based acceptance criteria Audit Mandate**: When instructed to complete, upgrade, or modernize an existing website, the agent is strictly forbidden from doing partial cosmetic work or stopping prematurely. The agent must execute the 6-stage protocol in [`modules/EXISTING_PROJECT_RETROFIT_ENGINE.md`](./modules/EXISTING_PROJECT_RETROFIT_ENGINE.md), refactor all screens with modern motion physics and glass depth, and verify compliance via `node scripts/audit-engine.js .` (or `node scripts/website-builder.js audit .`). Completion is only permitted when the audit exits with Code 0 (Score >= 95%).
10. **Screen-Level Genie Trash Bin & Vacuum Deletion Mandate**: In table views, data grids, and card decks, deletions MUST NEVER be restricted to local container divs with `overflow: hidden`. Deleting items MUST be elevated to a fixed screen-level portal overlay (`fixed inset-0 z-[99999]`) using `getBoundingClientRect()` snapshots. The animated Trash Bin MUST rush onto the screen from the right edge with kinetic spring physics (`x: 260 -> 0`), its motorized lid MUST swing open (`rotate: -55deg`), and deleting items MUST be sucked into the glowing can aperture via a 3D Genie vacuum deform (`scaleX: 0.12, rotateX: 65deg`). The lid MUST slam shut with elastic bounce, and remaining table rows MUST glide up smoothly via Framer Motion `layout` FLIP animations per [`design-system/APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md`](./design-system/APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md).
11. **Task-Specific In-Flight Button Animations Mandate (Zero Generic Spinners)**: Generic circular loading spinners (`animate-spin` borders) on action buttons are strictly forbidden across all public pages, dashboard tables, and modal dialogs. Every interactive action button triggering an asynchronous API operation MUST display a task-specific vector micro-animation inside its icon frame during network transit ($T_{\text{api}}$). For deletion, the button MUST display the in-button dustbin loop (bin glides in from right, lid pops open, document drops in, lid snaps shut, bin departs left; repeats smoothly until API settles). For orders/dispatch, it MUST display a delivery truck driving along an animated road with spinning tyres ($\omega = 360^\circ$), moving dashed road strip, and trailing tyre dust lines. For live synchronization/refresh, it MUST display a communications tower with an apex blinking beacon, radiating RF wave arcs, and an animated live pulsing status badge with audio equalizer bars. Toast notifications MUST be strictly deferred until the full animation cycle and completion morph finish per [`design-system/BUTTON_IN_FLIGHT_TASK_ANIMATIONS_SPECIFICATION.md`](./design-system/BUTTON_IN_FLIGHT_TASK_ANIMATIONS_SPECIFICATION.md).
12. **Responsive Mobile Tabs & Dynamic Overflow Mandate**: Tab navigation on mobile devices MUST NEVER force horizontal scrolling (`overflow-x: auto`) or break layouts through uncontrolled wrapping. All tab components MUST dynamically compute available container width via `ResizeObserver`, retain visible tabs that cleanly fit, and automatically collapse overflow tabs into an Apple-inspired `[More ▼]` glass dropdown menu. The active tab must always be visibly indicated (pinned to visible slot or highlighted on the dropdown trigger) with 60 FPS Framer Motion gliding indicator per [`design-system/RESPONSIVE_MOBILE_TABS_SYSTEM.md`](./design-system/RESPONSIVE_MOBILE_TABS_SYSTEM.md).
