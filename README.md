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
├── design-system/                     # Master Design System, CSS Reference & UI Component Knowledge Base
│   ├── 01_CSS_PROPERTIES_REFERENCE.md # Foundations (Layout, Gradients, Shadows, Math clamp(), Timelines, Variables)
│   ├── 02_VISUAL_EFFECTS_CATALOGUE.md  # 35+ Visual Effects (Glass, Neumorphism, Auroras, Spotlights, Reveals)
│   ├── 03_UI_COMPONENTS_LIBRARY.md     # 100+ Production UI Components (Buttons, Nav, Forms, Overlays, Media)
│   ├── 04_CARDS_AND_CARD_STACKS_LIBRARY.md # 42+ Card Patterns & Stacked Deck Interactive Physics (Tinder, Fan-Out, 3D Tilt)
│   ├── 05_ANIMATIONS_CATALOGUE.md      # 45+ Motion Choreographies (Transitions, Keyframes, ScrollTimeline, A11y)
│   ├── 06_WEBSITE_SECTIONS_LIBRARY.md  # 35+ Full Page Sections (Heroes, Bento Grids, Timelines, Mega Footers)
│   ├── 07_WEBSITE_DESIGN_PATTERNS.md   # 16 Complete Industry Archetypes (SaaS, AI, Agency, E-commerce, Luxury)
│   ├── 08_SOURCES_AND_REFERENCES.md    # Verified Technical Standards & Component Repositories (MDN, 21st.dev, W3C)
│   ├── 09_IMPLEMENTATION_RECIPES.md    # Copy-Paste TypeScript + Tailwind CSS Production Component Code
│   └── 10_SEARCHABLE_INDEX.md          # Faceted Search Taxonomy Matrix & Bidirectional Cross-Reference Graph
│
├── rules/                             # Core Technical & Business Rules
│   ├── DESIGN_ARCHITECTURE.md         # Master Design System (Tailwind, Floating Inputs, dvh Sidebar, Fonts, Lottie)
│   ├── EXPERT_ENGINEERING_AND_PHASED_PLANNING_SYSTEM.md # Principal Engineer Mindset, Line Decision Matrix & 6-Phase Non-Breaking Delivery
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
    ├── DATA_TABLE_AND_CARDS_SYSTEM.md # Hybrid Responsive Table vs Cards, Pagination, Sort, Drag Selection & Bulk Actions
    ├── CMS_ENGINE.md                  # Integrated vs Standalone CMS, content modeling & dynamic pages
    ├── SHORTCUT_KEYS_SYSTEM.md        # Complete Ctrl/Alt key matrix, single-key 'F' search, component shortcuts
    ├── AUTH_AND_FACELOCK.md           # Silent Facelock, Multi-Account Switching, Anti-Enumeration, 6-Box OTP, Dummy Bcrypt Hash
    ├── AUTOMATIONS_AND_NOTIFICATIONS.md # SMTP emails, WhatsApp automation, Web Push, GitHub CI/CD
    ├── SETTINGS_AND_FEATURE_FLAGS_SYSTEM.md # Dual-Tier Settings (Normal vs System), Multi-Storage, Multi-Key AI Fallback & Zero-Leak Feature Flags
    ├── ROUTE_PROXY_AND_PROTECTION_SYSTEM.md # Next.js Edge Middleware Proxy, Protected Route Interception Toasts & Login/Logout Cache Invalidation
    └── MOBILE_NAVIGATION_AND_LAYOUT.md # Public Mobile Bottom Bar with "More" Drawer, Dashboard Floating "Menu"/"Close" Pill & Dual Close Controls
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

- **The "Design Apna Banana Hai" Law (Original & Bespoke Design)**: Documentation defines architectural and structural mechanics. Agents and developers **MUST craft an original, brand-tailored, state-of-the-art visual identity for every project**—never blindly copy-paste dummy colors, mock cards, or example templates verbatim from docs.
- **Bespoke Brand Logo & Real Favicon Suite Mandate**: Every project must feature an authentic, high-resolution vector Brand Logo (both full wordmark and compact 32x32 glyph) and a complete real Favicon & PWA Suite (`favicon.ico`, `icon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest`). Zero tolerance for default framework icons (Next.js, Vite, React) or generic unstyled text.
- **Mandatory Tailwind CSS & Rich Aesthetics**: 100% Tailwind CSS with dual-theme (`dark:`) support, glow shadows, bespoke glassmorphism, and spring animations.
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



