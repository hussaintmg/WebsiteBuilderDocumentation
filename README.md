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
- `/.project/RULES.md`: Project-specific rules selected from `design-system/` and `rules/`.
- `/.project/SPRINTS.md`: Phased, step-by-step implementation checklist.

### Step 4: Execution & Verification
The agent loads the specific feature guides from `modules/` and executes sprint by sprint. Every milestone is tested and verified following `rules/TESTING_AND_VERIFICATION.md` before claiming completion.

---

## 🛡️ Core Highlights

- **The "Design Apna Banana Hai" Law (Original & Bespoke Design)**: Documentation defines architectural and structural mechanics. Agents and developers **MUST craft an original, brand-tailored, state-of-the-art visual identity for every project**—never blindly copy-paste dummy colors, mock cards, or example templates verbatim from docs.
- **Bespoke Brand Logo & Real Favicon Suite Mandate**: Every project must feature an authentic, high-resolution vector Brand Logo (both full wordmark and compact 32x32 glyph) and a complete real Favicon & PWA Suite (`favicon.ico`, `icon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest`). Zero tolerance for default framework icons (Next.js, Vite, React) or generic unstyled text.
- **Project-appropriate styling & rich aesthetics**: Project-appropriate styling system with dual-theme (`dark:`) support, glow shadows, bespoke glassmorphism, and spring animations.
- **Custom Floating Label Inputs (No Placeholders)**: Centered label transitions to top border notch upon focus or entry; First-line textarea alignment; Google Forms style Select.
- **Fixed Resizable `h-dvh` Sidebar**: Dynamic viewport height (`h-dvh`), smooth drag handle to resize width with `localStorage` memory, and collapse/expand toggle.
- **Bespoke Typography & Animated Icons**: Expressive fonts (**Neofolio**, **Nexo Kora**, **Bierika**, **OSIRIS**, **Plus Jakarta Sans**, **Outfit**) combined with vector icons (Lucide, FontAwesome, Material) and animated micro-icons (**Lordicon**, **Icons8**, **LottieFlow**, **LottieFiles**).
- **Animations & Free 3D Models**: Framer Motion for layout & toast animations, GSAP ScrollTrigger for storytelling, and Three.js 3D models (opt-in with free models only).
- **Granular RBAC**: Not just page protection, but button/action-level security (`<ActionGuard permission="orders:delete">`).
- **Dual-View Order Processing**: Normal data table + focused single-order review carousel with hotkeys (`ArrowRight`, `ArrowLeft`, `Ctrl+Enter`).
- **Hybrid Responsive Data Presentation**: Master Table on Desktop (`hidden lg:block`), touch-friendly Cards Grid on Mobile (`block lg:hidden`), with real-time synchronized state.
- **Google Drive Marquee Drag Selection**: Canvas pixel drag-to-select tool with AABB collision detection, Shift/Ctrl modifiers, and floating bulk action bar.
- **Smart Pagination & Filter Engine**: Arrow key navigation (`←` / `→`), animated loading spinners on buttons to prevent race conditions, debounced search, and faceted filter pills.
- **Floating Bulk Action Bar with Animated Icons**: Delete All (`Alt+D`), Bulk PDF (`Alt+E`), Bulk Email (`Alt+M`), Bulk WhatsApp (`Alt+W`) with mandatory Lordicon/Lottie micro-animations.
- **Multi-Tenant with Custom Domains**: Clean separation of company data, developer super-admin tenant onboarding, and company-specific domains/subdomains.
- **Client Payment Safeguard**: Built-in developer safeguard rule with grace period (up to 8th of the month) and non-intrusive Owner-only top banner.
- **Custom AI Facelock & Multi-Account Security**: Custom client-side face recognition AI models (128-d vector embeddings, zero passkeys), silent background face detection, multi-face account conflict resolution, instant account switching from topbar, 6-box auto-verifying OTP, constant-time dummy bcrypt hashing against timing attacks, and strict rate limiting.
- **Master Keyboard Shortcuts Engine**: Complete `Ctrl` key suite (`Ctrl+A,C,V,X,O,Z,Y,S,Enter,K,B,P`), complete `Alt` key suite (`Alt+T,S,N,F,P,D,M,W,E`), single-key `F` Global Search, and component shortcuts.
- **Mandatory Dual-Tier Settings & Dynamic Zero-Leak Feature Flags**: Every project features a dedicated Settings page with Normal Settings (user profile, preferences, theme, regional locale, company profile) and System Settings (SMTP, WhatsApp, Multi-Provider Storage, Multi-Key AI Hub with Fallback). Includes live "Test Connection" buttons for all services, multi-tenant settings isolation, and a Developer/Owner Feature Flagging matrix with strict Zero-Leak UI elimination (features toggled OFF completely vanish from UI and return 404).
- **Edge Route Proxy & Interception Toast Engine**: Complete Next.js Edge Middleware (`middleware.ts`) route protection and client `RouteGuard`. Unauthorized users are strictly blocked at the network edge and redirected with an instant animated toast: *"⛔ Aap is page pe nahi ja sakte hain"*. Mandates complete proxy session invalidation and re-evaluation on every login and logout with `Cache-Control: no-store` history protection.
- **Mobile Navigation Architecture (Public Bottom Bar vs Dashboard Floating Menu Pill)**: Strict No-Sidebar rule on mobile public/marketing pages in favor of a fixed bottom tab bar with 3-4 curated links + "More" bottom sheet drawer. Mobile dashboards feature a full slide-out drawer triggered via a floating bottom-center obsidian glass pill ("Menu" ➔ "Close" morphing state) with **Dual Close Controls** (pill morphs into 'X' and drawer header features a dedicated top 'X' close button).





## Execution and Verification Contract
The skill is architecture-aware: it discovers the existing project's actual framework, package manager, folder conventions and design system before recommending changes. It does not impose Next.js, MongoDB, Tailwind, glassmorphism or a specific animation library on unrelated projects. Read `EXECUTION_CONTRACT.md` for scope control, phased implementation, animation acceptance criteria and evidence-based completion rules.

Run framework self-checks with:
```sh
npm test
npm run validate:docs
```
For an application audit, run `npm run audit -- <project-directory>`. The audit reports commands that were not configured or could not be executed as unverified; it never treats missing tests as a pass.
