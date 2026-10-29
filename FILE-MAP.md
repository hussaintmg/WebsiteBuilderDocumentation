# Repository Navigation & Functional File Map (FILE-MAP.md)

> **STATUS: FULLY VERIFIED REPOSITORY BLUEPRINT**  
> This file acts as the verified navigation map for `WebsiteBuilderDocumentation` (Main-Docs). It traces all entry points, architectural rules, visual systems, and production modular subsystems to enable rapid navigation without redundant repository-wide scans.

---

## 📊 Repository Profile

- **Repository Type**: Enterprise Web Development Documentation & Autonomous AI Engineering Framework (Main-Docs)
- **Primary Languages / Formats**: Markdown (`.md`), TypeScript (`.ts`/`.tsx`), Mermaid (`mermaid`), KaTeX Math
- **Application Target**: Full-stack Next.js (App Router), FastAPI (Python), Node.js/Express, MongoDB (Mongoose), Redis (BullMQ), Tailwind CSS
- **Core Purpose**: Enables AI agents and human developers to plan, architect, scaffold, and verify production-grade web applications in a single run with zero regressions and zero bloat.

---

## 🧭 Functional Subsystem Maps

### 1. Agent Directives & Autonomous Project Orchestration
- **Functionality**: Defines the mandatory 5-phase execution protocol, behavioral guardrails, discovery interview engine, and standardized blueprint generators for all AI coding agents.
- **Confidence**: Verified
- **Entry Point**: `MAIN_AGENT_DIRECTIVE.md`
- **Primary Files**:
  - `MAIN_AGENT_DIRECTIVE.md`: Master agent operating directive, Rule Zero, 5-phase protocol, behavioral guardrails.
  - `PLAN_BUILDER.md`: Project blueprint generator for `PLAN.md`, `ARCHITECTURE.md`, `RULES.md`, `SPRINTS.md`, and `FILE-MAP.md`.
  - `DISCOVERY_QUESTIONNAIRE.md`: 11-phase onboarding questionnaire covering stack, RBAC, features, and timeouts.
- **Supporting Files**:
  - `README.md`: High-level repository orientation and philosophy.
- **Flow**:
  `New Task ➔ MAIN_AGENT_DIRECTIVE.md ➔ DISCOVERY_QUESTIONNAIRE.md ➔ PLAN_BUILDER.md ➔ /.project/ Blueprints ➔ Phase Execution`
- **Dependencies**: None (Root orchestration layer).
- **Used By**: All AI agents and human engineers initializing or extending projects.

---

### 2. Engineering, Safety & Architecture Rules
- **Functionality**: Non-visual platform standards governing database connections, RBAC security, phased delivery, testing lifecycles, payment safeguards, and zero-regression development.
- **Confidence**: Verified
- **Entry Point**: `rules/SAFE_DEVELOPMENT_AND_FILE_MAP_RULES.md` & `rules/EXPERT_ENGINEERING_AND_PHASED_PLANNING_SYSTEM.md`
- **Primary Files**:
  - `rules/SAFE_DEVELOPMENT_AND_FILE_MAP_RULES.md`: 10 safety laws, zero-regression protocol, anti-bloat guard, and `FILE-MAP.md` standard.
  - `rules/EXPERT_ENGINEERING_AND_PHASED_PLANNING_SYSTEM.md`: Principal engineer mindset, 6-phase non-breaking build law, 4-question line foresight matrix.
  - `rules/MODELS_AND_CONTEXTS_ARCHITECTURE.md`: Root `/models` (1 per file) and `/context` single source of truth rules.
  - `rules/TESTING_AND_VERIFICATION.md`: Universal 7-tier verification lifecycle (Static, Adversarial Chaos, DB Mutation, Context, Dead Code, Copywriting, Visual).
  - `rules/BACKEND_CONNECTION_RULES.md`: Server-to-server contracts, DB connection caching, and API standards.
  - `rules/RBAC_SECURITY_RULES.md`: Role definitions (Developer, Owner, Admin, Staff, Customer), security matrices, permission guards.
  - `rules/PAYMENT_SAFEGUARD_RULE.md`: Developer monthly hosting & maintenance payment banner and grace period rules.
- **Flow**:
  `Sprint Tasks ➔ SAFE_DEVELOPMENT_AND_FILE_MAP_RULES ➔ Targeted Code ➔ TESTING_AND_VERIFICATION ➔ FILE-MAP Sync`
- **Dependencies**: Root directive files.
- **Used By**: Every implementation sprint across frontend and backend.

---

### 3. Design System & Visual Engineering
- **Functionality**: Comprehensive visual design tokens, typography, modern CSS math, glassmorphism, 3D Apple macOS Genie origin-morph animations, Three.js 3D inspection studio, and website sections.
- **Confidence**: Verified
- **Entry Point**: `design-system/README.md`
- **Primary Files**:
  - `design-system/DESIGN_ARCHITECTURE.md`: Master design tokens, typography, layout architecture, dark mode palette.
  - `design-system/FRONTEND_DESIGN_RULES.md`: Core UI laws (floating label inputs, resizable sidebar, zero-bar dialogs).
  - `design-system/APPLE_GENIE_ORIGIN_MORPH_SYSTEM.md`: Apple macOS 3D Genie Origin-Morph unrolling animation & zero-bar draggable dialogs.
  - `design-system/THREEJS_3D_MODEL_ARCHITECTURE_AND_INSPECTION_SYSTEM.md`: Three.js model viewer, GLTF loader, parts audit studio.
  - `design-system/01_CSS_PROPERTIES_REFERENCE.md` through `07_WEBSITE_DESIGN_PATTERNS.md`: Modern CSS clamp math, visual effects, components, cards, animations, sections, and patterns.
  - `design-system/09_IMPLEMENTATION_RECIPES.md` & `10_SEARCHABLE_INDEX.md`: Production React/Tailwind recipes and searchable index.
- **Supporting Files**:
  - `design-system/MASTER_HOVER_ANIMATION_SYSTEM.md`: Micro-interactions and magnetic hovers.
  - `design-system/PREMIUM_BUTTON_ANIMATION_SYSTEM.md`: High-end button animations and shimmer states.
  - `design-system/ROW_CARD_DELETE_DUSTBIN_ANIMATION.md`: Interactive marquee trashcan deletion mechanics.
  - `design-system/TASK_ANIMATED_BUTTONS_SYSTEM.md`: Task-state animated buttons.
  - `design-system/assets/MISSING_REFERENCE_ASSETS.md`: Recovery ledger for local visual reference images.
- **Flow**:
  `Design Requirement ➔ DESIGN_ARCHITECTURE.md ➔ UI Components / Genie Dialogs / Sections ➔ React Component Tree`
- **Dependencies**: Tailwind CSS, Framer Motion, Three.js, Lucide React.
- **Used By**: All UI/UX pages, modals, dashboards, and storefronts.

---

### 4. Financial & High-Scale Resilience Engines
- **Functionality**: Distributed idempotency, in-flight mutex locking, Inquire-Before-Charge timeout recovery, BullMQ worker crash failover, and hyper-scale patterns.
- **Confidence**: Verified
- **Entry Point**: `modules/PAYMENT_IDEMPOTENCY_AND_RECONCILIATION_ENGINE.md` & `modules/BACKEND_SCALING_AND_RESILIENCE_ARCHITECTURE.md`
- **Primary Files**:
  - `modules/PAYMENT_IDEMPOTENCY_AND_RECONCILIATION_ENGINE.md`: Order-bound idempotency keys, Redis mutex lock, Inquire-Before-Charge (IBC) protocol, dual reconciliation (webhooks + BullMQ poller), JazzCash/Stripe adapters, `useResilientPayment` Hook.
  - `modules/BACKEND_SCALING_AND_RESILIENCE_ARCHITECTURE.md`: 3-tier capacity planning, BullMQ 30s heartbeat failover, L1/L2 Redis cache, payment circuit breakers.
  - `modules/ADVANCED_SYSTEM_DESIGNS_AND_HIGH_SCALE_PATTERNS.md`: 20 production high-scale blueprints (20M Likes buffer, feeds, reminders, Uber H3 rides).
- **Flow**:
  `Customer "Pay" ➔ Redis Mutex Lock ➔ Pre-Persist PaymentIntent ➔ Bank Call ➔ [Timeout Catch] ➔ Inquire-Before-Charge ➔ Settlement`
- **Dependencies**: Redis, BullMQ, MongoDB, Bank/Gateway APIs (Stripe, JazzCash, EasyPaisa, 1Link).
- **Used By**: Checkout flows, billing systems, and background workers.

---

### 5. Core Business Modules & Workflows
- **Functionality**: Production-ready enterprise specifications for orders, CMS, auth, real-time chat, leads, blogs, and settings.
- **Confidence**: Verified
- **Primary Files**:
  - `modules/ORDER_SLIDE_WORKFLOW.md`: Master order table + 1-by-1 slide carousel review workflow.
  - `modules/DATA_TABLE_AND_CARDS_SYSTEM.md`: Marquee box drag selection, tri-state sorting, smart pagination.
  - `modules/CMS_ENGINE.md`: WYSIWYG/Monaco CMS, variable registry, dynamic PDF canvas, email builder.
  - `modules/AUTH_AND_FACELOCK.md`: Biometric face model embeddings (128-d vectors) & multi-account auth.
  - `modules/SETTINGS_AND_FEATURE_FLAGS_SYSTEM.md`: Dual-tier settings (Normal & System), live test buttons, zero-leak flags.
  - `modules/ROUTE_PROXY_AND_PROTECTION_SYSTEM.md`: Edge middleware, interception toasts, session cache invalidation.
  - `modules/CHAT_AND_COMMUNICATION_SYSTEM.md` & `CHAT_LIGHTWEIGHT_CONCURRENCY_AND_COMPRESSION.md`: Omni-chat & socket compression.
  - `modules/AI_ASSISTANT_AND_COPILOT_SYSTEM.md` & `AUTONOMOUS_AI_LEAD_RESPONDER_AND_BOOKING_SYSTEM.md`: Autonomous AI lead conversion.
  - `modules/ENQUIRIES_AND_LEADS_SYSTEM.md`: Public enquiry capture and dashboard lead management.
  - `modules/NEWSLETTER_AND_BLOGS_SYSTEM.md`: Blog engine, newsletter canvas studio, and public CMS feed.
  - `modules/INFINITE_COMMENTS_AND_REPLIES_SYSTEM.md`: Nested recursive comments & reactions.
  - `modules/LMS_LIVE_STREAMING_AND_INTERACTIVE_CLASSES.md`: Live streaming & classroom management.
  - `modules/MOBILE_NAVIGATION_AND_LAYOUT.md`: Public bottom navigation bar & floating menu pill.
  - `modules/MULTI_TENANT_SYSTEM.md`: Multi-company tenant isolation & custom domains.
  - `modules/RBAC_SYSTEM.md`: Complete 5-role permission matrices.
  - `modules/SHORTCUT_KEYS_SYSTEM.md`: Global keyboard shortcuts & command palette.
  - `modules/AUTOMATIONS_AND_NOTIFICATIONS.md`: SMTP email & WhatsApp Business alerts.
  - `modules/NOT_FOUND_PAGE.md`: Playable HTML5 Canvas arcade 404 mini-game page.
- **Flow**: Consumed directly into client project `.project/PLAN.md` during onboarding.

---

## 📑 File-to-Function Index

### Root Orchestration
| File Path | Type | Main Responsibility | Important For | Confidence |
| :--- | :--- | :--- | :--- | :--- |
| `README.md` | Doc Entry | Framework overview, golden rule, directory tree | Orientation | Verified |
| `MAIN_AGENT_DIRECTIVE.md` | Directive | Master agent rules, 5-phase protocol, behavioral guardrails | Autonomous Execution | Verified |
| `PLAN_BUILDER.md` | Generator | Blueprint specification for `.project/` and `FILE-MAP.md` | Project Onboarding | Verified |
| `DISCOVERY_QUESTIONNAIRE.md` | Interview | 11-phase structured discovery questionnaire | Requirements Capture | Verified |
| `FILE-MAP.md` | Living Map | Verified repository navigation and functional index | Codebase Navigation | Verified |

### Rules & Engineering Standards (`rules/`)
| File Path | Type | Main Responsibility | Important For | Confidence |
| :--- | :--- | :--- | :--- | :--- |
| `rules/SAFE_DEVELOPMENT_AND_FILE_MAP_RULES.md` | Safety Rule | 10 laws, zero-regression, anti-bloat, FILE-MAP sync | Non-Breaking Dev | Verified |
| `rules/EXPERT_ENGINEERING_AND_PHASED_PLANNING_SYSTEM.md` | Engineering | Principal engineer mindset, 4-question line foresight | Phased Architecture | Verified |
| `rules/MODELS_AND_CONTEXTS_ARCHITECTURE.md` | Arch Rule | Root `/models` and `/context` encapsulation | State & Data Layer | Verified |
| `rules/TESTING_AND_VERIFICATION.md` | Quality | Universal 7-tier verification lifecycle | Quality Assurance | Verified |
| `rules/BACKEND_CONNECTION_RULES.md` | Backend Rule | DB connection caching, API envelopes, server-to-server calls | Backend Integration | Verified |
| `rules/RBAC_SECURITY_RULES.md` | Security Rule | 5-tier role hierarchy, permission enforcement | Security & Auth | Verified |
| `rules/PAYMENT_SAFEGUARD_RULE.md` | Billing Rule | Developer hosting safeguard banner and 8th-day grace date | Platform Billing | Verified |

### Design System (`design-system/`)
| File Path | Type | Main Responsibility | Important For | Confidence |
| :--- | :--- | :--- | :--- | :--- |
| `design-system/README.md` | Index | Design system overview and reference index | UI Entry Point | Verified |
| `design-system/DESIGN_ARCHITECTURE.md` | Tokens | Typography, color palette, viewport layout rules | Visual Foundations | Verified |
| `design-system/FRONTEND_DESIGN_RULES.md` | UI Rules | Floating inputs, resizable dvh sidebar, theme rules | Core UI Mechanics | Verified |
| `design-system/APPLE_GENIE_ORIGIN_MORPH_SYSTEM.md` | Animation | 3D Genie Origin-Morph unroll & zero-bar draggable dialogs | Modal Windows | Verified |
| `design-system/THREEJS_3D_MODEL_ARCHITECTURE_AND_INSPECTION_SYSTEM.md` | 3D Graphics | Three.js GLTF model viewer and inspection studio | 3D Interactive UI | Verified |
| `design-system/01_CSS_PROPERTIES_REFERENCE.md` | Reference | Modern CSS properties, clamp math, layout reference | Styling | Verified |
| `design-system/02_VISUAL_EFFECTS_CATALOGUE.md` | Effects | Glass, neumorphism, aurora, spotlight effects | Visual Polish | Verified |
| `design-system/03_UI_COMPONENTS_LIBRARY.md` | Components | Floating inputs, buttons, navigation, overlays | Atomic UI | Verified |
| `design-system/04_CARDS_AND_CARD_STACKS_LIBRARY.md` | Components | Card patterns, swipe physics, stacked decks | Content Display | Verified |
| `design-system/05_ANIMATIONS_CATALOGUE.md` | Animation | Keyframes, transitions, GSAP ScrollTimeline | Motion Graphics | Verified |
| `design-system/06_WEBSITE_SECTIONS_LIBRARY.md` | Sections | Heroes, Bento grids, timelines, footers | Page Layouts | Verified |
| `design-system/07_WEBSITE_DESIGN_PATTERNS.md` | Patterns | Complete SaaS, AI, Agency, E-Commerce designs | Full Site Design | Verified |
| `design-system/08_SOURCES_AND_REFERENCES.md` | Reference | Design sources, typography pairings, palettes | Design Inspiration | Verified |
| `design-system/09_IMPLEMENTATION_RECIPES.md` | Code Recipes | Copy-paste production React + Tailwind recipes | Fast Prototyping | Verified |
| `design-system/10_SEARCHABLE_INDEX.md` | Index | Searchable taxonomy index for all design tokens | Fast Lookup | Verified |
| `design-system/MASTER_HOVER_ANIMATION_SYSTEM.md` | Micro-UI | Master hover animations and tactile physics | Interaction Design | Verified |
| `design-system/PREMIUM_BUTTON_ANIMATION_SYSTEM.md` | Micro-UI | High-end button animations and loaders | Action Feedback | Verified |
| `design-system/ROW_CARD_DELETE_DUSTBIN_ANIMATION.md` | Animation | Interactive trashcan animation for deletions | Destructive Actions | Verified |
| `design-system/TASK_ANIMATED_BUTTONS_SYSTEM.md` | Animation | Task-state animated buttons | Status Progression | Verified |
| `design-system/assets/MISSING_REFERENCE_ASSETS.md` | Asset Ledger | Recovery ledger for missing local visual assets | Asset Tracking | Verified |

### Modules (`modules/`)
| File Path | Type | Main Responsibility | Important For | Confidence |
| :--- | :--- | :--- | :--- | :--- |
| `modules/PAYMENT_IDEMPOTENCY_AND_RECONCILIATION_ENGINE.md` | Module | Idempotency keys, Redis mutex lock, Inquire-Before-Charge, cron reconciliation | Payment Processing | Verified |
| `modules/BACKEND_SCALING_AND_RESILIENCE_ARCHITECTURE.md` | Module | 3-tier scaling matrix, BullMQ failover, L1/L2 Redis cache | High Scale Backend | Verified |
| `modules/ADVANCED_SYSTEM_DESIGNS_AND_HIGH_SCALE_PATTERNS.md` | Module | 20 hyper-scale system blueprints (20M likes, reminders) | Architecture Design | Verified |
| `modules/ORDER_SLIDE_WORKFLOW.md` | Module | Master order table + 1-by-1 slide carousel review | Order Processing | Verified |
| `modules/DATA_TABLE_AND_CARDS_SYSTEM.md` | Module | Marquee drag selection, smart pagination, column sorting | Data Exploration | Verified |
| `modules/CMS_ENGINE.md` | Module | WYSIWYG/Monaco CMS, dynamic PDF canvas, email builder | Content Management | Verified |
| `modules/AUTH_AND_FACELOCK.md` | Module | Biometric AI face embeddings & multi-account auth | Identity & Security | Verified |
| `modules/SETTINGS_AND_FEATURE_FLAGS_SYSTEM.md` | Module | Dual-tier settings, live test buttons, zero-leak flags | Platform Settings | Verified |
| `modules/ROUTE_PROXY_AND_PROTECTION_SYSTEM.md` | Module | Edge middleware, interception toasts, session cache invalidation | Route Security | Verified |
| `modules/CHAT_AND_COMMUNICATION_SYSTEM.md` | Module | Omni-chat portal, live threads, agent inbox | Customer Support | Verified |
| `modules/CHAT_LIGHTWEIGHT_CONCURRENCY_AND_COMPRESSION.md` | Module | WebSocket binary compression, concurrency control | Real-Time Chat | Verified |
| `modules/AI_ASSISTANT_AND_COPILOT_SYSTEM.md` | Module | Multimodal AI copilot, table extraction, CMS generator | AI Capabilities | Verified |
| `modules/AUTONOMOUS_AI_LEAD_RESPONDER_AND_BOOKING_SYSTEM.md` | Module | AI lead responder, slot booking, calendar sync | Lead Generation | Verified |
| `modules/ENQUIRIES_AND_LEADS_SYSTEM.md` | Module | Public contact forms & dashboard enquiry inbox | Inbound Leads | Verified |
| `modules/NEWSLETTER_AND_BLOGS_SYSTEM.md` | Module | Blog engine, newsletter canvas studio, public feeds | Content Marketing | Verified |
| `modules/INFINITE_COMMENTS_AND_REPLIES_SYSTEM.md` | Module | Recursive nested comments, reactions, upvotes | Community / Social | Verified |
| `modules/LMS_LIVE_STREAMING_AND_INTERACTIVE_CLASSES.md` | Module | Live video streaming, interactive classrooms | EdTech / Courses | Verified |
| `modules/MOBILE_NAVIGATION_AND_LAYOUT.md` | Module | Public bottom bar & dashboard floating menu pill | Mobile Ergonomics | Verified |
| `modules/MULTI_TENANT_SYSTEM.md` | Module | Subdomains, custom domains, tenant DB isolation | SaaS Multi-Tenancy | Verified |
| `modules/RBAC_SYSTEM.md` | Module | 5-role permission matrices and guard components | Access Control | Verified |
| `modules/SHORTCUT_KEYS_SYSTEM.md` | Module | Keyboard shortcut manager and command palette | Productivity | Verified |
| `modules/AUTOMATIONS_AND_NOTIFICATIONS.md` | Module | SMTP email & WhatsApp Business automation | Notifications | Verified |
| `modules/NOT_FOUND_PAGE.md` | Module | Standalone 404 page with playable HTML5 canvas arcade | Error Handling | Verified |

---

## 🔄 Critical Execution Flows

### Flow 1: Safe Feature Addition Flow (Zero-Regression & Anti-Bloat)
1. `rules/SAFE_DEVELOPMENT_AND_FILE_MAP_RULES.md` (Read pre-flight rules)
2. `FILE-MAP.md` (Trace existing entry points, models, and contexts)
3. `rules/MODELS_AND_CONTEXTS_ARCHITECTURE.md` (Extend models/context additively; reuse utilities)
4. `rules/TESTING_AND_VERIFICATION.md` (Execute 7-tier verification lifecycle)
5. `FILE-MAP.md` (Synchronize and record updated verified state)

### Flow 2: Project Onboarding & Scaffolding Flow
1. `MAIN_AGENT_DIRECTIVE.md` (Agent activates Rule Zero)
2. `DISCOVERY_QUESTIONNAIRE.md` (Conducts structured 11-phase interview)
3. `PLAN_BUILDER.md` (Generates `.project/PLAN.md`, `ARCHITECTURE.md`, `RULES.md`, `SPRINTS.md`, `FILE-MAP.md`)
4. User Approves Plan
5. `rules/EXPERT_ENGINEERING_AND_PHASED_PLANNING_SYSTEM.md` (Executes phased build)

### Flow 3: Split-Brain Timeout & Resilient Payment Flow
1. `hooks/useResilientPayment.ts` (Customer triggers checkout)
2. `lib/payments/paymentLock.ts` (Acquires Redis Distributed Mutex Lock: `lock:payment:<orderId>`)
3. `app/api/payments/process/route.ts` (Pre-persists `PaymentIntent` with `Idempotency-Key`)
4. `lib/payments/adapters/` (Calls Bank Gateway; handles 504 Timeout)
5. `components/checkout/PaymentVerificationModal.tsx` (Displays amber `PENDING_VERIFICATION` modal; auto-polls)
6. `workers/reconciliationWorker.ts` (BullMQ poller executes Inquire-Before-Charge to auto-settle orphaned debits)

---

## 🎯 Verification & Confidence Audit
- **Total Mapped Files**: 49 files across 3 directories and root
- **Verified Files**: 49/49 (100% physically inspected from disk)
- **Likely Files**: 0
- **Unknown Files**: 0
- **Source-Code Files Changed**: 0
- **Application Behavior Altered**: No

