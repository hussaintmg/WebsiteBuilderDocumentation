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
> **No agent or developer is permitted to write a single line of production code without first creating an explicit, approved project folder containing the project plan, architecture spec, and sprint roadmap.**

---

## 📂 System Architecture & File Directory

```
Main-docs/
│
├── README.md                          # Master Overview & Architecture Map (You are here)
├── MAIN_AGENT_DIRECTIVE.md            # Mandatory execution workflow & instructions for the AI Agent
├── PLAN_BUILDER.md                    # Blueprint for constructing project plans & folder structures
├── DISCOVERY_QUESTIONNAIRE.md         # Master requirements interview script ("Kiya Puchna Hai")
│
├── rules/                             # Core Technical & Business Rules
│   ├── DESIGN_ARCHITECTURE.md         # Master Design System (Tailwind, Floating Inputs, dvh Sidebar, Fonts, Lottie)
│   ├── PAYMENT_SAFEGUARD_RULE.md      # Developer client payment tracking & 8th-of-month banner rule
│   ├── FRONTEND_DESIGN_RULES.md       # Tailwind CSS standards, typography, animations, UX
│   ├── BACKEND_CONNECTION_RULES.md    # API contracts, FastAPI/Node connection, CORS, typed clients
│   ├── RBAC_SECURITY_RULES.md         # Developer vs Owner hierarchy, protection boundaries
│   └── TESTING_AND_VERIFICATION.md    # Evidence-based verification, TDD, zero mock assertions
│
└── modules/                           # Plug-and-Play Feature Specs
    ├── RBAC_SYSTEM.md                 # Granular action-level (CRUD buttons) & page-level permissions
    ├── MULTI_TENANT_SYSTEM.md         # Multi-company architecture, custom domains, subdomain routing
    ├── ORDER_SLIDE_WORKFLOW.md        # Dual-view Order System: Master Table + 1-by-1 Slide Carousel
    ├── CMS_ENGINE.md                  # Integrated vs Standalone CMS, content modeling & dynamic pages
    ├── SHORTCUT_KEYS_SYSTEM.md        # Basic & Master keyboard shortcut navigation engine
    ├── AUTH_AND_FACELOCK.md           # Standard Auth + WebAuthn / Face-lock biometric access
    └── AUTOMATIONS_AND_NOTIFICATIONS.md # SMTP emails, WhatsApp automation, Web Push, GitHub CI/CD
```

---

## 🚀 How to Use Main-Docs in Any Project

### Step 1: Agent Initialization
When an AI agent starts a new session or project, it reads `MAIN_AGENT_DIRECTIVE.md`.
The agent checks for an existing plan in `/.project/PLAN.md` or `/projects/<project-name>/PLAN.md`.

### Step 2: The Discovery Interview
If no approved plan exists:
1. The agent opens `DISCOVERY_QUESTIONNAIRE.md`.
2. The agent interviews the user in structured phases (Tech Stack, UI/UX, RBAC, CMS, Multi-Tenant, Special Features, Safeguards).
3. The user responds or selects recommended defaults.

### Step 3: Plan Generation
Following `PLAN_BUILDER.md`, the agent generates:
- `/.project/PLAN.md`: Scope, architecture, chosen tech stack, and feature acceptance criteria.
- `/.project/ARCHITECTURE.md`: Database schemas, API endpoints, component tree, and data flows.
- `/.project/RULES.md`: Project-specific rules inherited from `rules/` (including `DESIGN_ARCHITECTURE.md`).
- `/.project/SPRINTS.md`: Phased, step-by-step implementation checklist.

### Step 4: Execution & Verification
The agent loads the specific feature guides from `modules/` and executes sprint by sprint. Every milestone is tested and verified following `rules/TESTING_AND_VERIFICATION.md` before claiming completion.

---

## 🛡️ Core Highlights

- **Mandatory Tailwind CSS & Bespoke Design**: 100% Tailwind CSS with dual-theme (`dark:`) support, glow shadows, and glassmorphism.
- **Custom Floating Label Inputs (No Placeholders)**: Centered label transitions to top border notch upon focus or entry; First-line textarea alignment; Google Forms style Select.
- **Fixed Resizable `h-dvh` Sidebar**: Dynamic viewport height (`h-dvh`), smooth drag handle to resize width with `localStorage` memory, and collapse/expand toggle.
- **Bespoke Typography & Animated Icons**: Expressive fonts (**Neofolio**, **Nexo Kora**, **Bierika**, **OSIRIS**, **Plus Jakarta Sans**, **Outfit**) combined with vector icons (Lucide, FontAwesome, Material) and animated micro-icons (**Lordicon**, **Icons8**, **LottieFlow**, **LottieFiles**).
- **Animations & Free 3D Models**: Framer Motion for layout & toast animations, GSAP ScrollTrigger for storytelling, and Three.js 3D models (opt-in with free models only).
- **Granular RBAC**: Not just page protection, but button/action-level security (`<ActionGuard permission="orders:delete">`).
- **Dual-View Order Processing**: Normal data table + focused single-order review carousel with hotkeys (`ArrowRight`, `ArrowLeft`, `Ctrl+Enter`).
- **Multi-Tenant with Custom Domains**: Clean separation of company data, developer super-admin tenant onboarding, and company-specific domains/subdomains.
- **Client Payment Safeguard**: Built-in developer safeguard rule with grace period (up to 8th of the month) and non-intrusive Owner-only top banner.
- **Biometric / Facelock Security**: Modern passkey and biometric auth specifications.
- **Keyboard Shortcuts Engine**: Basic navigation up to Master power-user shortcuts.
