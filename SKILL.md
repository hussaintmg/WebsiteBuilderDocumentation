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

For an existing repository, follow the architecture-aware process in [Project Intelligence](./engines/PROJECT_INTELLIGENCE.md), [Intent and Scope](./engines/INTENT_AND_SCOPE.md), and [Execution Contract](./EXECUTION_CONTRACT.md).

1. **Baseline and discover**: inspect git status, actual stack, routes, components, data flow, shared dependencies, current tests and known failures. Preserve existing user changes.
2. **Define the outcome**: write observable acceptance criteria. Classify work as required, dependency-required, optional or unrelated.
3. **Build a dependency-aware plan**: list affected files/contracts, migration risks, regression surfaces, exclusions and exact verification commands.
4. **Implement complete connected behavior**: update the UI, state, API, persistence, permissions and loading/error/empty states needed for the requested outcome. Do not perform an unrelated full redesign.
5. **Review independently**: inspect the complete diff for scope creep, security gaps, duplicate logic and regressions.
6. **Verify with evidence**: execute relevant project-native tests, build, typecheck, lint and browser checks where configured and applicable. Missing commands are NOT CONFIGURED, never PASS.
7. **Report honestly**: list changed files, exact evidence, pre-existing failures, unverified items and operational steps. Never use a universal 95% score as a completion gate.

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

## ⚡ Engineering Guardrails (Apply When Relevant)

1. **Preserve the existing project**: trace imports, consumers, models and routes before changing shared code. Keep unrelated working behavior intact.
2. **Architecture is evidence-driven**: root `/app`, MongoDB, Tailwind, React Context, middleware, Framer Motion and named packages are used only when the project actually uses them or the user requests them.
3. **Security is server-enforced**: enforce authorization, tenant isolation, validation and secrets handling at trusted server boundaries. Client-side hiding is not authorization.
4. **Data consistency matters**: use transactions, idempotency, concurrency controls and migration/rollback strategies when the domain requires them.
5. **Design patterns are optional references**: dark mode, glass surfaces, floating labels, mobile navigation patterns, Genie deletion and task-specific button animations are selected according to the existing product design and user request. Do not add every catalogue item to every project.
6. **Motion must match the task**: use [Animation QA](./quality/ANIMATION_QA.md) for meaningful motion changes. Include full choreography, interruption, failure, reduced-motion and final data-state behavior.
7. **Performance must be measured**: optimize relevant bottlenecks and network constraints; do not add infrastructure or dependencies without evidence.
8. **Feature flags and payment safeguards**: implement only when the product has those systems or the user requests them. Protect payment and licensing operations on the server.
9. **Auth UX and demo safety**: when auth screens are in scope, keep production credentials out of UI and ensure recovery/navigation flows match the actual product.
10. **Responsive behavior**: test the layouts and interactions relevant to the changed pages and target viewport range.
11. **No false completion**: use the evidence statuses in [Acceptance Criteria](./quality/ACCEPTANCE_CRITERIA.md). A score or static scan cannot substitute for actual acceptance evidence.

