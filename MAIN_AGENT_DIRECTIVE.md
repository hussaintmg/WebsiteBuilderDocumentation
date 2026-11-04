# Main Agent Directive & Autonomous Workflow Engine

> **STATUS: MANDATORY FOR ALL AI AGENTS**  
> If you are an AI assistant (Antigravity, Claude, ChatGPT, etc.) working on a project using this framework, you MUST read and execute this directive before taking any coding action.

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

**Never start scaffolding or writing production code until the user approves the generated plan file!**  
Doing otherwise results in misaligned architecture, wasted tokens, and rework.

---

## 📋 The 5-Phase Agent Execution Protocol

### Phase 1: Interactive Discovery Interview
When the user presents an idea or starts a new project:
1. Open [`DISCOVERY_QUESTIONNAIRE.md`](./DISCOVERY_QUESTIONNAIRE.md).
2. Ask questions in structured, digestible batches (never overwhelm the user with 50 questions at once; group them logically by Phase: Scope -> UI/UX -> RBAC -> Features -> Safeguards).
3. **Explicit Backend Placement Inquiry**: The agent **MUST explicitly ask the user upfront** whether they want the backend built:
   - Inside the same Next.js project (Unified Monolith).
   - As a dedicated Next.js Backend API project (Dual Next.js: `frontend/` + `backend/`).
   - As a dedicated Python FastAPI backend.
   - As a dedicated Node.js/Express backend.
4. Always suggest recommended defaults based on their workload.
5. Support the user in their preferred language (English, Urdu, or Roman Urdu).

---

### Phase 2: Project Workspace Initialization
Once answers are received:
1. Create a dedicated project configuration directory at the root:
   - For single-project repos: `/.project/`
   - For multi-project monorepos: `/projects/<project-name>/`
2. Generate the following core blueprint files using [`PLAN_BUILDER.md`](./PLAN_BUILDER.md):
   - `PLAN.md`: Objectives, stack, chosen modules, and scope boundaries.
   - `ARCHITECTURE.md`: Data models, API contracts, RBAC permissions, and file structure.
   - `RULES.md`: Design rules extracted from `design-system/` plus connection and security rules selected from `rules/`.
   - `SPRINTS.md`: Phased task list with clear checkboxes and test gates.
3. Present the plan summary to the user and request explicit confirmation to proceed.

---

### Phase 3: Scaffolding & Foundation First
Once the plan is approved:
1. Follow **Foundation-First rule**:
   - **Original & Bespoke Design Mandate (Design Apna Banana Hai)**: Documentation code examples and color palettes are technical architecture blueprints—**NEVER copy them verbatim into the project**. The agent must craft an original visual identity, bespoke color palette, tailored card layouts, and custom typography pairing for every single project.
   - **Bespoke Brand Logo & Complete Favicon Suite (With Canva Refinement Mandate)**: The agent MUST design and integrate an authentic, high-resolution vector Brand Logo (both full wordmark and compact 32x32 glyph) and a complete real Favicon & PWA suite (`favicon.ico`, `icon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest`). Leaving default framework favicons or generic unstyled text is strictly prohibited. **Canva Refinement Workflow**: If programmatic SVGs or generated logos/favicons do not meet state-of-the-art standards, developers/agents must leverage Canva to craft, refine, and export clean, high-resolution transparent vector/PNG brand assets.
   - **Zero-Bar Draggable Modals & Apple Genie Origin-Morph System**: All modals, popup forms, confirmation boxes, and dropdowns must implement the Apple macOS 3D Genie Origin-Morph animation (unrolls from origin button, funnels back on close while origin button elevates and absorbs). Once open, dialogs are freely draggable via their top padding region with zero extra titlebar and zero grip icons per [`design-system/APPLE_GENIE_ORIGIN_MORPH_SYSTEM.md`](./design-system/APPLE_GENIE_ORIGIN_MORPH_SYSTEM.md).
   - **Backend-Only Payment Safeguard Enforcement**: All licensing checks and payment verification calls must execute **strictly from the backend server**; the frontend browser must never call the licensing API directly.
   - Set up **Tailwind CSS** with dual-theme (`dark:`) configuration and bespoke typography imports per [`design-system/DESIGN_ARCHITECTURE.md`](./design-system/DESIGN_ARCHITECTURE.md) and [`design-system/FRONTEND_DESIGN_RULES.md`](./design-system/FRONTEND_DESIGN_RULES.md).
   - Scaffold the foundational UI atoms: custom Floating Label Inputs (Text, Textarea, Select), `cursor-pointer` Buttons, Resizable `h-dvh` Sidebar, and Universal `AppleGenieModal`.
   - Set up the database schema and connection layer per [`rules/BACKEND_CONNECTION_RULES.md`](./rules/BACKEND_CONNECTION_RULES.md).
   - Set up the environment variables template (`.env.example`).
2. Scaffold only the necessary components and routes specified in the approved sprint.

---

### Phase 4: Module-Specific Implementation
Whenever implementing a specific subsystem, the agent **MUST read the corresponding module guide** from the `modules/`, `rules/`, and `design-system/` directories before writing code:

| Subsystem to Implement | Mandatory Module Document to Read |
| :--- | :--- |
| Tailwind Design System, Floating Inputs, Resizable Sidebar | [`design-system/DESIGN_ARCHITECTURE.md`](./design-system/DESIGN_ARCHITECTURE.md) & [`design-system/FRONTEND_DESIGN_RULES.md`](./design-system/FRONTEND_DESIGN_RULES.md) |
| CSS Properties, Gradients, Shadows, Math clamp() & Modern CSS | [`design-system/01_CSS_PROPERTIES_REFERENCE.md`](./design-system/01_CSS_PROPERTIES_REFERENCE.md) |
| Visual Effects (Glass, Neumorphism, Auroras, Spotlights, Beams) | [`design-system/02_VISUAL_EFFECTS_CATALOGUE.md`](./design-system/02_VISUAL_EFFECTS_CATALOGUE.md) |
| Production UI Component Library (Buttons, Nav, Forms, Overlays) | [`design-system/03_UI_COMPONENTS_LIBRARY.md`](./design-system/03_UI_COMPONENTS_LIBRARY.md) |
| Card Patterns, Stacked Decks, Fan-Outs & Gesture Swipe Physics | [`design-system/04_CARDS_AND_CARD_STACKS_LIBRARY.md`](./design-system/04_CARDS_AND_CARD_STACKS_LIBRARY.md) |
| Animation Catalogue, Transitions, Keyframes & ScrollTimeline | [`design-system/05_ANIMATIONS_CATALOGUE.md`](./design-system/05_ANIMATIONS_CATALOGUE.md) |
| Apple macOS 3D Genie Origin-Morph & Zero-Bar Draggable Modals | [`design-system/APPLE_GENIE_ORIGIN_MORPH_SYSTEM.md`](./design-system/APPLE_GENIE_ORIGIN_MORPH_SYSTEM.md) |
| Apple macOS Screen-Level Genie Trash Bin & Vacuum Deletion | [`design-system/APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md`](./design-system/APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md) |
| Three.js 3D Model Architecture, Parts Audit & Inspection Studio | [`design-system/THREEJS_3D_MODEL_ARCHITECTURE_AND_INSPECTION_SYSTEM.md`](./design-system/THREEJS_3D_MODEL_ARCHITECTURE_AND_INSPECTION_SYSTEM.md) |
| Full-Page Website Sections (Heroes, Bento Grids, Timelines, Footers) | [`design-system/06_WEBSITE_SECTIONS_LIBRARY.md`](./design-system/06_WEBSITE_SECTIONS_LIBRARY.md) |
| Complete Website Design Patterns (SaaS, AI, Agency, E-Commerce) | [`design-system/07_WEBSITE_DESIGN_PATTERNS.md`](./design-system/07_WEBSITE_DESIGN_PATTERNS.md) |
| Production React + Tailwind Recipes & Searchable Taxonomy Index | [`design-system/09_IMPLEMENTATION_RECIPES.md`](./design-system/09_IMPLEMENTATION_RECIPES.md) & [`design-system/10_SEARCHABLE_INDEX.md`](./design-system/10_SEARCHABLE_INDEX.md) |
| User Roles, Portals, Action Permissions | [`modules/RBAC_SYSTEM.md`](./modules/RBAC_SYSTEM.md) & [`rules/RBAC_SECURITY_RULES.md`](./rules/RBAC_SECURITY_RULES.md) |
| Multi-Company / Multi-Tenant / Custom Domains | [`modules/MULTI_TENANT_SYSTEM.md`](./modules/MULTI_TENANT_SYSTEM.md) |
| Order Table & 1-by-1 Slide/Carousel Processing | [`modules/ORDER_SLIDE_WORKFLOW.md`](./modules/ORDER_SLIDE_WORKFLOW.md) |
| Master Data Table, Mobile Cards & Drag Selection | [`modules/DATA_TABLE_AND_CARDS_SYSTEM.md`](./modules/DATA_TABLE_AND_CARDS_SYSTEM.md) |
| Content Management System (CMS) | [`modules/CMS_ENGINE.md`](./modules/CMS_ENGINE.md) |
| Keyboard Shortcuts Engine | [`modules/SHORTCUT_KEYS_SYSTEM.md`](./modules/SHORTCUT_KEYS_SYSTEM.md) |
| Custom AI Face Recognition & Multi-Account Auth | [`modules/AUTH_AND_FACELOCK.md`](./modules/AUTH_AND_FACELOCK.md) |
| SMTP, WhatsApp Automations, GitHub CI/CD | [`modules/AUTOMATIONS_AND_NOTIFICATIONS.md`](./modules/AUTOMATIONS_AND_NOTIFICATIONS.md) |
| Settings Hub, Third-Party Integrations & Dynamic Feature Flags | [`modules/SETTINGS_AND_FEATURE_FLAGS_SYSTEM.md`](./modules/SETTINGS_AND_FEATURE_FLAGS_SYSTEM.md) |
| Edge Proxy Route Protection, Interception Toasts & Session Invalidation | [`modules/ROUTE_PROXY_AND_PROTECTION_SYSTEM.md`](./modules/ROUTE_PROXY_AND_PROTECTION_SYSTEM.md) |
| Mobile Bottom Navigation Bar & Dashboard Floating Menu Pill | [`modules/MOBILE_NAVIGATION_AND_LAYOUT.md`](./modules/MOBILE_NAVIGATION_AND_LAYOUT.md) |
| Real-Time Omni-Chat & Customer Portal Communication | [`modules/CHAT_AND_COMMUNICATION_SYSTEM.md`](./modules/CHAT_AND_COMMUNICATION_SYSTEM.md) |
| High-Concurrency Lightweight Sockets & Message Compression | [`modules/CHAT_LIGHTWEIGHT_CONCURRENCY_AND_COMPRESSION.md`](./modules/CHAT_LIGHTWEIGHT_CONCURRENCY_AND_COMPRESSION.md) |
| AI Assistant, Multimodal Copilot & CMS Builder Engine | [`modules/AI_ASSISTANT_AND_COPILOT_SYSTEM.md`](./modules/AI_ASSISTANT_AND_COPILOT_SYSTEM.md) |
| Tenant Public Contact Form & Dashboard Enquiries System | [`modules/ENQUIRIES_AND_LEADS_SYSTEM.md`](./modules/ENQUIRIES_AND_LEADS_SYSTEM.md) |
| Newsletter Canvas Studio, Blog Engine & Public CMS Loop | [`modules/NEWSLETTER_AND_BLOGS_SYSTEM.md`](./modules/NEWSLETTER_AND_BLOGS_SYSTEM.md) |
| Principal Engineer Mindset, Non-Breaking Phased Planning & Line Decision Matrix | [`rules/EXPERT_ENGINEERING_AND_PHASED_PLANNING_SYSTEM.md`](./rules/EXPERT_ENGINEERING_AND_PHASED_PLANNING_SYSTEM.md) |
| Client Payment Tracking & 8th-Date Banner | [`rules/PAYMENT_SAFEGUARD_RULE.md`](./rules/PAYMENT_SAFEGUARD_RULE.md) |
| Safe Development, Zero-Regression & FILE-MAP Synchronization | [`rules/SAFE_DEVELOPMENT_AND_FILE_MAP_RULES.md`](./rules/SAFE_DEVELOPMENT_AND_FILE_MAP_RULES.md) |
| Payment Idempotency & Split-Brain Timeout Reconciliation | [`modules/PAYMENT_IDEMPOTENCY_AND_RECONCILIATION_ENGINE.md`](./modules/PAYMENT_IDEMPOTENCY_AND_RECONCILIATION_ENGINE.md) |
| Multi-Storage Polymorphic Media Engine & Vercel Free Workaround | [`modules/MULTI_STORAGE_POLYMORPHIC_MEDIA_ENGINE.md`](./modules/MULTI_STORAGE_POLYMORPHIC_MEDIA_ENGINE.md) |
| Extreme Low-Bandwidth & Slow Network Performance Optimization | [`modules/LOW_BANDWIDTH_AND_EXTREME_PERFORMANCE_ENGINE.md`](./modules/LOW_BANDWIDTH_AND_EXTREME_PERFORMANCE_ENGINE.md) |
| Optimistic Rapid-Click Batching & Debounced Settlement | [`modules/OPTIMISTIC_RAPID_CLICK_BATCHING_ENGINE.md`](./modules/OPTIMISTIC_RAPID_CLICK_BATCHING_ENGINE.md) |
| Existing Website Retrofit & Modernization Engine | [`modules/EXISTING_PROJECT_RETROFIT_ENGINE.md`](./modules/EXISTING_PROJECT_RETROFIT_ENGINE.md) |

---

### Phase 5: Verification & Completion Gate
Before marking any task, file operation, or sprint as completed:
1. Read [`rules/TESTING_AND_VERIFICATION.md`](./rules/TESTING_AND_VERIFICATION.md).
2. Execute the **7-Tier Universal Verification Lifecycle**:
   - **Tier 1 (Static Gate)**: `npx tsc --noEmit` & `npm run build` with zero errors (Exit code 0).
   - **Tier 2 (Adversarial "Brainless User" Testing)**: Fuzz endpoints and utilities with malformed types (`null`, `undefined`, NaN, extreme lengths, SQLi/NoSQL payloads, multi-click attacks); assert zero white-screens, polite error toasts, and rock-solid security boundaries.
   - **Tier 3 (API Contracts & DB Mutation Fidelity)**: Validate `{ success, data, error }` envelopes; assert database mutations mutate ONLY targeted fields/documents (zero dirty state); verify reactive DOM updates without page reloads; eliminate redundant or slow calls.
   - **Tier 4 (Single Source of Truth & Context Law)**: Enforce zero direct component API calls when a domain Context exists; eliminate zombie/abandoned context methods.
   - **Tier 5 (Line-by-Line Algorithmic Audit & Dead Code Purge)**: Write code step-by-step; verify purpose of every line; eliminate duplicate utilities and dead files; leverage existing npm packages; analyze downstream dependents.
   - **Tier 6 (UI Copywriting & UX Predictability)**: Never leak technical backend terms (database pipelines, Axios terms) on UI; pass the human predictability discovery test.
   - **Tier 7 (Visual, Responsive, Theme & Animations)**: Verify Light/Dark/CMS themes (zero rogue hex codes); ensure 60 FPS animations and mobile responsiveness (`390x844`).
3. **Never claim success without actual terminal output or browser inspection logs.** Evidence must always precede assertions.
4. **Mandatory Audit Engine Execution**: Run `node scripts/audit-engine.js .` (or `npx website-builder audit .`). The script must exit with Code 0 (Compliance Score >= 95%). If the score is below 95%, the agent is strictly prohibited from marking the task complete and must resolve all listed gaps.
5. **10-Step Mandatory Task Execution Checklist**: Strictly track all 10 stages per [`rules/MANDATORY_EXECUTION_CHECKLIST.md`](./rules/MANDATORY_EXECUTION_CHECKLIST.md). Never declare work complete without running actual test and build commands with verified exit code 0.
5. Update `SPRINTS.md` marking completed tasks with `[x]` and logging complete tier-by-tier evidence notes.
6. **Continuous FILE-MAP Synchronization**: Update the root `FILE-MAP.md` to reflect all newly created, updated, or removed files, routes, models, and critical execution flows per [`rules/SAFE_DEVELOPMENT_AND_FILE_MAP_RULES.md`](./rules/SAFE_DEVELOPMENT_AND_FILE_MAP_RULES.md).

---

## ⚡ Agent Behavioral Guardrails

1. **Aesthetics are Non-Negotiable**: No barebones, plain HTML, or default browser aesthetics. Use sleek dark modes, glassmorphism, curated typography (e.g. Outfit / Inter), smooth transitions, and polished micro-animations.
2. **Original & Bespoke Design (Design Apna Banana Hai - No Blind Copying from Docs)**: Documentation code examples and sample palettes are architectural blueprints and mechanical references. The agent MUST create a completely original, brand-tailored, and project-specific design. Never copy-paste dummy colors, mock cards, or placeholder layouts from `Main-docs`.
3. **Strict RBAC Separation & Settings Fallback**: Developer role is infrastructure/platform guardian; Owner is business master. Developer must NEVER lock out or modify Owner business permissions without explicit credentials. In projects without a Developer role, System Settings is ALWAYS granted to the Owner / Main User role.
4. **Mandatory Dual-Tier Settings & Live Verification Testing**: Every project MUST feature a Settings hub with Normal Settings (`/settings`) and System Settings (`/settings/system`). All platform integrations (SMTP, WhatsApp, Multi-Provider Storage, Multi-Key AI with Fallback) MUST have working "Test Connection" buttons that verify end-to-end connectivity with real status and latency feedback.
5. **Strict Zero-Leak Feature Flagging**: When a modular feature (AI, WhatsApp, 3D Models, Facelock, Barcodes, Portals) is toggled OFF, it must completely disappear from the UI. Zero disabled buttons, zero grayed-out teaser menus, zero direct route access (clean 404).
6. **Edge Proxy Route Protection & Interception Toast Mandate**: The agent MUST configure Next.js Edge Middleware (`middleware.ts`) and client `RouteGuard`. Protected routes must never be accessed by unauthorized users. Any unauthorized attempt MUST immediately redirect and trigger an animated error toast: *"⛔ Aap is page pe nahi ja sakte hain"*. On every login and logout, the proxy session cookie and client cache MUST be invalidated and re-evaluated from scratch with `Cache-Control: no-store`.
7. **Mobile Navigation Law (Public Bottom Bar vs Dashboard Floating Menu Pill)**: Public marketing/storefront pages on mobile (`< 1024px`) MUST NEVER render a sidebar or sidepanel drawer; they must feature a fixed bottom footer bar (`fixed bottom-0`) with 3-4 primary curated links and a "More" drawer. Dashboard pages on mobile MUST provide a full slide-out sidebar triggered by a floating bottom-center glass pill (`"Menu"`), featuring **Dual Close Controls** (pill morphs into `"Close"` and the sidebar header features a dedicated top 'X' close button).
8. **Payment Safeguard UI Discretion**: If the developer payment safeguard is enabled, the unpaid notification bar must ONLY be visible to the `Owner` role. Never expose it to customers, employees, or public users.
9. **Resilience & Graceful Fallbacks**: If external APIs (WhatsApp, SMTP, Biometric hardware, AI providers) are unavailable or fail, provide graceful UI fallbacks, automatic key/provider rotation, and clear error toasts instead of crashing the app.
10. **Bespoke Logo & Favicon Suite Obligation**: Never launch or build an interface with default framework icons (Next.js, Vite, React) or placeholder typography logos. Every application must feature custom SVG vector branding and a full multi-resolution favicon/PWA suite matching the brand aesthetic.
11. **The Ironclad Verification & Adversarial Chaos Law**: Any code addition, modification, or file deletion MUST undergo adversarial "Brainless User" chaos testing and line-by-line algorithmic review before marking done. Zero completion claims without fresh, concrete evidence.
12. **The Principal Engineer Mindset & Open-Closed Phased Build Law**: Every project must follow the 6-Phase Non-Breaking Delivery sequence (Phase 1: Foundation & Auth -> Phase 2: Core Domain Purpose -> Phase 3: Visual Polish & Ergonomics -> Phase 4: Modular Subsystems -> Phase 5: Security & Edge Protection -> Phase 6: Universal Verification). Later phases MUST NOT break earlier phases: new capabilities must be implemented in dedicated new modular files (`modules/`, `context/`, `models/`, `components/`) and enhance existing surfaces through clean, open-closed boundaries. Before writing any line of code, the agent MUST run the 4-question line foresight matrix per [`rules/EXPERT_ENGINEERING_AND_PHASED_PLANNING_SYSTEM.md`](./rules/EXPERT_ENGINEERING_AND_PHASED_PLANNING_SYSTEM.md).
13. **The Zero-Regression, Anti-Bloat & Living FILE-MAP Mandate ("Cheezain Tore Baghair Kaam Karna")**: Never modify existing working code blindly. Always trace imports, models, and routes first. Additive-only changes; never rename/delete existing exports without migration. Strictly forbid duplicate utility functions or redundant npm packages. The root `FILE-MAP.md` is the living navigation map of the repository and must be kept 100% verified and synchronized after every sprint per [`rules/SAFE_DEVELOPMENT_AND_FILE_MAP_RULES.md`](./rules/SAFE_DEVELOPMENT_AND_FILE_MAP_RULES.md).
14. **The Root-Level `/app` Directory Standard (Zero `src/` Wrapper)**: All Next.js projects governed by this framework MUST place the Next.js App Router directly at the project root (`<root>/app/`). Wrapping application files inside an unnecessary `src/` folder is strictly prohibited. Sibling root folders are strictly designated as: `/app`, `/components`, `/context`, `/models`, `/hooks`, `/lib`, `/public`, `/styles`, and `/.project/`. TypeScript path aliases in `tsconfig.json` MUST map `"@/*": ["./*"]`.
15. **The Optimistic Rapid-Click Batching Mandate**: High-frequency interactive controls (pagination skipping, cart quantity steppers, slide carousels, like bursts, and tri-state table sorts) MUST implement `useRapidClickBatcher` with instant 0ms optimistic UI updates, 300ms settling debounce, and `AbortController` cancellation. Never freeze or disable interactive controls on the first click per [`modules/OPTIMISTIC_RAPID_CLICK_BATCHING_ENGINE.md`](./modules/OPTIMISTIC_RAPID_CLICK_BATCHING_ENGINE.md).
16. **Zero Demo Credentials & Inter-Auth Navigation Ergonomics Mandate**: Authentication pages (`/login`, `/signup`, `/forgot-password`, `/reset-password`) MUST NEVER feature pre-filled demo credentials, mock accounts, or "Click to login as Owner/Admin" backdoor buttons in production or development environments. Forms must initialize input states to clean empty strings (`""`). Furthermore, every auth page MUST implement complete bidirectional navigation ergonomics: `/login` must feature a right-aligned "Forgot password?" link adjacent to the password input label and a bottom-card "Don't have an account? Sign up" link; `/signup` must feature an "Already have an account? Log in" footer link; and password recovery views must feature a "← Back to log in" link per [`modules/AUTH_AND_FACELOCK.md`](./modules/AUTH_AND_FACELOCK.md).
17. **The Autonomous Retrofit & Universal 95%+ Audit Mandate**: When instructed to complete, upgrade, or modernize an existing website, the agent is strictly forbidden from doing partial cosmetic work, leaving screens unstyled, skipping animations, or stopping prematurely. The agent must execute the 6-stage protocol in [`modules/EXISTING_PROJECT_RETROFIT_ENGINE.md`](./modules/EXISTING_PROJECT_RETROFIT_ENGINE.md), refactor all screens with modern motion physics and glass depth, and verify compliance via `node scripts/audit-engine.js .` (or `npx website-builder audit .`). Completion is only permitted when the audit exits with Code 0 (Score >= 95%).
18. **Screen-Level Genie Trash Bin & Vacuum Deletion Mandate**: In table views, data grids, and card decks, deletions MUST NEVER be restricted to local container divs with `overflow: hidden`. Deleting items MUST be elevated to a fixed screen-level portal overlay (`fixed inset-0 z-[99999]`) using `getBoundingClientRect()` snapshots. The animated Trash Bin MUST rush onto the screen from the right edge with kinetic spring physics (`x: 260 -> 0`), its motorized lid MUST swing open (`rotate: -55deg`), and deleting items MUST be sucked into the glowing can aperture via a 3D Genie vacuum deform (`scaleX: 0.12, rotateX: 65deg`). The lid MUST slam shut with elastic bounce, and remaining table rows MUST glide up smoothly via Framer Motion `layout` FLIP animations per [`design-system/APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md`](./design-system/APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md).
19. **Task-Specific In-Flight Button Animations Mandate (Zero Generic Spinners)**: Generic circular loading spinners (`animate-spin` borders) on action buttons are strictly forbidden across all public pages, dashboard tables, and modal dialogs. Every interactive action button triggering an asynchronous API operation MUST display a task-specific vector micro-animation inside its icon frame during network transit ($T_{\text{api}}$). For deletion, the button MUST display the in-button dustbin loop (bin glides in from right, lid pops open, document drops in, lid snaps shut, bin departs left; repeats smoothly until API settles). For orders/dispatch, it MUST display a delivery truck driving along an animated road with spinning tyres ($\omega = 360^\circ$), moving dashed road strip, and trailing tyre dust lines. For live synchronization/refresh, it MUST display a communications tower with an apex blinking beacon, radiating RF wave arcs, and an animated live pulsing status badge with audio equalizer bars. Toast notifications MUST be strictly deferred until the full animation cycle and completion morph finish per [`design-system/BUTTON_IN_FLIGHT_TASK_ANIMATIONS_SPECIFICATION.md`](./design-system/BUTTON_IN_FLIGHT_TASK_ANIMATIONS_SPECIFICATION.md).
20. **Responsive Mobile Tabs & Dynamic Overflow Mandate**: Tab navigation on mobile screens MUST NEVER force horizontal scrolling (`overflow-x: auto`) or break layouts through wrapping. All tab components MUST dynamically compute container width via `ResizeObserver`, retain visible tabs that cleanly fit, and automatically collapse overflow tabs into an Apple-inspired `[More ▼]` glass dropdown menu. The active tab must always be visibly indicated (pinned to visible slot or highlighted on the dropdown trigger) with 60 FPS Framer Motion gliding indicator per [`design-system/RESPONSIVE_MOBILE_TABS_SYSTEM.md`](./design-system/RESPONSIVE_MOBILE_TABS_SYSTEM.md).




