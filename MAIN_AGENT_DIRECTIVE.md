# Main Agent Directive & Autonomous Workflow Engine

> **STATUS: MANDATORY FOR ALL AI AGENTS**  
> If you are an AI assistant (Antigravity, Claude, ChatGPT, etc.) working on a project using this framework, you MUST read and execute this directive before taking any coding action.

---

## Execution Contract Precedence (Read Before Applying Legacy Rules)

**First read [EXECUTION_CONTRACT.md](./EXECUTION_CONTRACT.md).** It has precedence over any older generic or stack-specific instruction in this repository.

- Discover the target project's actual framework, package manager, architecture, design system and existing conventions before selecting implementation patterns.
- The root `/app`, MongoDB, Tailwind, React Context, Framer Motion, glassmorphism, dark mode and any named component are not universal requirements. Apply them only when they fit the actual project or the user explicitly requests them.
- Inspect broadly, but implement only the requested outcome and necessary dependencies. Preserve unrelated working code and user changes.
- Define acceptance criteria and execute relevant tests/build/typecheck/lint/browser checks. Missing test configuration is **NOT CONFIGURED / NOT VERIFIED**, never PASS.
- Do not use a 95% score or static regex audit as proof of completion. Completion requires evidence for the actual requested outcomes.

## Required Engines for Every Meaningful Task

After reading [EXECUTION_CONTRACT.md](./EXECUTION_CONTRACT.md), use the following guides as relevant:
- [Project Intelligence](./engines/PROJECT_INTELLIGENCE.md) — discover actual stack, routes, dependencies and data flow.
- [Intent and Scope](./engines/INTENT_AND_SCOPE.md) — acceptance criteria, scope boundaries and implementation phases.
- [Independent Reviewer](./engines/INDEPENDENT_REVIEWER.md) — review the diff separately from implementation.
- [Acceptance Criteria](./quality/ACCEPTANCE_CRITERIA.md) — maintain requirement-to-evidence traceability.
- [Animation QA](./quality/ANIMATION_QA.md) — verify full motion choreography in browser when motion changes.

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
   - **Bespoke Brand Logo & Complete Favicon Suite (With Canva Refinement Mandate)**: When the product requires custom branding or a PWA, design and integrate an authentic vector Brand Logo (wordmark and compact glyph) and a suitable Favicon/PWA suite (`favicon.ico`, `icon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest`). Leaving default framework favicons or generic unstyled text is strictly prohibited. **Canva Refinement Workflow**: If programmatic SVGs or generated logos/favicons do not meet state-of-the-art standards, developers/agents must leverage Canva to craft, refine, and export clean, high-resolution transparent vector/PNG brand assets.
   - **Zero-Bar Draggable Modals & Apple Genie Origin-Morph System**: Use the Apple macOS 3D Genie Origin-Morph animation for modals, popup forms, confirmation boxes or dropdowns only when it is requested or fits the established product motion language (unrolls from origin button, funnels back on close while origin button elevates and absorbs). Once open, dialogs are freely draggable via their top padding region with zero extra titlebar and zero grip icons per [`design-system/APPLE_GENIE_ORIGIN_MORPH_SYSTEM.md`](./design-system/APPLE_GENIE_ORIGIN_MORPH_SYSTEM.md).
   - **Backend-Only Payment Safeguard Enforcement**: All licensing checks and payment verification calls must execute **strictly from the backend server**; the frontend browser must never call the licensing API directly.
   - Use the project's existing styling system; select **Tailwind CSS** with dual-theme (`dark:`) configuration only if it fits the chosen stack and requirements per [`design-system/DESIGN_ARCHITECTURE.md`](./design-system/DESIGN_ARCHITECTURE.md) and [`design-system/FRONTEND_DESIGN_RULES.md`](./design-system/FRONTEND_DESIGN_RULES.md).
   - Scaffold only the foundational UI atoms required by the accepted product scope, using existing component and interaction conventions.
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

1. Read [Execution Contract](./EXECUTION_CONTRACT.md), [Testing & Verification](./rules/TESTING_AND_VERIFICATION.md), and the task's acceptance ledger.
2. Run the actual project-native commands that exist: tests, production build, typecheck, lint and relevant integration/E2E checks.
3. Verify changed browser behavior in a real browser when browser tooling is available. For animation changes, follow [Animation QA](./quality/ANIMATION_QA.md).
4. Review the full diff independently using [Independent Reviewer](./engines/INDEPENDENT_REVIEWER.md).
5. Record each requirement as PASS, FAIL, NOT CONFIGURED, NOT RUN, BLOCKED or NOT APPLICABLE with evidence.
6. Do not force unrelated visual patterns, stack migrations or global retrofits to satisfy legacy examples.
7. Update FILE-MAP and task notes when repository structure or execution flows change.
8. Never claim completion without evidence. There is no universal 95% score gate.

## ⚡ Agent Behavioral Guardrails

1. Preserve the existing product design, framework, conventions and working features unless the user asks for a redesign or migration.
2. Treat all module and design-system documents as reusable patterns, not universal requirements.
3. Apply RBAC, tenant isolation, server-side authorization, validation and payment safeguards according to the product's actual security model.
4. Add settings, integrations, feature flags, multi-tenancy, custom domains, CMS, LMS, AI, 3D and communication modules only when requested or required by the accepted scope.
5. Use the project's existing navigation and responsive patterns; do not force a bottom bar, floating menu pill or sidebar.
6. Use the existing styling and animation stack. Do not force Tailwind, Framer Motion, GSAP, glassmorphism, dark mode or a specific icon library.
7. Apply Genie deletion, liquid tabs, animated task buttons and other signature motion patterns only when they fit the requested behavior and product language.
8. Keep user-facing copy understandable and consistent with the product's language and terminology.
9. Do not add mock credentials, fake success states or controls that do nothing.
10. Prefer minimal compatible changes over rewrites; document migrations and rollback steps for persisted data.
11. Run a separate diff review and the relevant project-native verification commands.
12. Report evidence and limitations precisely. Missing browser access, external services or test infrastructure must be disclosed as unverified.

