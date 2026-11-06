# Master Web Development Documentation Framework (Main-Docs)

Welcome to **Main-Docs** — an enterprise-grade, modular web development documentation and planning blueprint designed for autonomous and pair-programming AI agents (Antigravity, Claude, etc.) and human developers.

---

## 🎯 Purpose & Philosophy

Main-Docs allows any AI agent or engineering team to build **complete, robust web applications in a single, systematic run** — whether building:
1. **Full-Stack Applications** (e.g. Next.js / React Frontend + FastAPI or Node.js Backend + Database)
2. **Frontend-Only Applications** (SPA, PWA, Marketing, Dashboards)
3. **Backend-Only / Microservices** (FastAPI, Express, NestJS)
4. **Standalone REST & GraphQL APIs**

### The Golden Rule: "Plan First, Code Second"
> Before significant implementation, establish a proportionate plan and acceptance criteria. A full `/.project/` blueprint is useful for greenfield or substantial work; a small scoped fix does not require a heavyweight planning ceremony. Ask for approval when a material decision, risk or irreversible change requires it.

---

## 📂 System Architecture & File Directory

```text
Main-docs/
├── README.md
├── package.json
├── SKILL.md
├── EXECUTION_CONTRACT.md
├── engines/                       # Project discovery, scope and independent review
├── quality/                       # Animation QA and acceptance evidence
├── MAIN_AGENT_DIRECTIVE.md
├── PLAN_BUILDER.md
├── DISCOVERY_QUESTIONNAIRE.md
├── design-system/                 # All design guidance in one canonical location
│   ├── README.md
│   ├── DESIGN_ARCHITECTURE.md
│   ├── FRONTEND_DESIGN_RULES.md
│   ├── MASTER_HOVER_ANIMATION_SYSTEM.md
│   ├── PREMIUM_BUTTON_ANIMATION_SYSTEM.md
│   ├── ROW_CARD_DELETE_DUSTBIN_ANIMATION.md
│   ├── TASK_ANIMATED_BUTTONS_SYSTEM.md
│   ├── 01_CSS_PROPERTIES_REFERENCE.md through 10_SEARCHABLE_INDEX.md
│   └── assets/                    # Image-asset recovery ledger and restored references
├── rules/                         # Non-visual engineering, security and delivery rules
│   ├── BACKEND_CONNECTION_RULES.md
│   ├── EXPERT_ENGINEERING_AND_PHASED_PLANNING_SYSTEM.md
│   ├── MODELS_AND_CONTEXTS_ARCHITECTURE.md
│   ├── PAYMENT_SAFEGUARD_RULE.md
│   ├── RBAC_SECURITY_RULES.md
│   └── TESTING_AND_VERIFICATION.md
├── modules/                       # Feature and subsystem specifications
├── tests/                         # Framework and audit regression tests
└── .github/workflows/             # CI validation and verification
```

> **Single source of truth:** All visual-design rules and component/animation guidance now live in `design-system/`. `rules/` is reserved for engineering, security, planning, payment, and verification standards. Start with [`design-system/README.md`](./design-system/README.md). A few machine-local reference images were not present in the supplied ZIP; see [`design-system/assets/MISSING_REFERENCE_ASSETS.md`](./design-system/assets/MISSING_REFERENCE_ASSETS.md).

---

## 🚀 How to Use Main-Docs in Any Project

### Step 1: Agent Initialization
When an AI agent starts a new session or project, it reads `MAIN_AGENT_DIRECTIVE.md`.
The agent checks for an existing plan in `/.project/PLAN.md` or `/projects/<project-name>/PLAN.md`; for small tasks, it may use a concise in-chat task plan.

### Step 2: The Discovery Interview
If no approved plan exists:
1. The agent opens `DISCOVERY_QUESTIONNAIRE.md`.
2. The agent interviews the user in structured phases (Tech Stack, UI/UX, RBAC, CMS, Multi-Tenant, Special Features, Safeguards).
3. The user responds to only the questions needed to resolve material product and architecture decisions; no option is assumed by default.

### Step 3: Plan Generation
Following `PLAN_BUILDER.md`, the agent generates:
- `/.project/PLAN.md`: Scope, architecture, chosen tech stack, and feature acceptance criteria.
- `/.project/ARCHITECTURE.md`: Database schemas, API endpoints, component tree, and data flows.
- `/.project/RULES.md`: Project-specific rules selected from `design-system/` and `rules/`.
- `/.project/SPRINTS.md`: Phased, step-by-step implementation checklist.

### Step 4: Execution & Verification
The agent loads the specific feature guides from `modules/` and executes sprint by sprint. Every milestone is tested and verified following `rules/TESTING_AND_VERIFICATION.md` before claiming completion.

---

## 🧩 Optional Pattern Library

The repository contains detailed implementation references for many product patterns. They are a **catalogue**, not a universal feature checklist. Select only what matches the product, user request, architecture, accessibility needs and measured constraints.

Examples include:
- Original visual identity, branding and favicon design when branding is in scope.
- Project-native styling, typography, themes and visual effects; glassmorphism and dark mode are optional.
- Accessible form patterns, sidebars, mobile navigation and responsive data tables/cards.
- Task-specific button feedback, Genie-style deletion, hover effects and 3D interactions when the interaction benefits from them.
- RBAC, multi-tenancy, custom domains, payments, storage, AI assistants, keyboard shortcuts and settings when required by the product.
- Performance strategies selected from measured bottlenecks rather than copied as fixed budgets.

Do not add a settings hub, payment system, face recognition, a specific animation library, a database, or a particular navigation layout merely because it appears in this catalogue. Preserve the existing design language and architecture unless a change is requested or required for the accepted outcome.

---

## Execution and Verification Contract

For a copy-ready agent instruction, see [MASTER_SUMMONING_PROMPT.md](./MASTER_SUMMONING_PROMPT.md). Existing-project work should follow [the retrofit engine](./modules/EXISTING_PROJECT_RETROFIT_ENGINE.md).
The skill is architecture-aware: it discovers the existing project's actual framework, package manager, folder conventions and design system before recommending changes. It does not impose Next.js, MongoDB, Tailwind, glassmorphism or a specific animation library on unrelated projects. Read `EXECUTION_CONTRACT.md` for scope control, phased implementation, animation acceptance criteria and evidence-based completion rules.

Run framework self-checks with:
```sh
npm test
npm run validate:docs
```
For an application audit, run `npm run audit -- <project-directory>`. The audit reports commands that were not configured or could not be executed as unverified; it never treats missing tests as a pass.


### Safe scaffolding
The scaffold CLI is read-only by default. Run `node scripts/website-builder.js scaffold <project-dir>` to preview the proposed files. Add `--apply` only after reviewing the plan. Existing files are skipped by default; `--force` requires `--apply` and creates timestamped backups before overwriting. The scaffold does not install packages or mutate package.json and is limited to projects that declare the React/Tailwind dependencies it uses.
