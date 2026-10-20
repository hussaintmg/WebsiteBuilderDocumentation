# Master Discovery Questionnaire ("Kiya Puchna Hai")

> **FOR THE AGENT**: When onboarding a user or starting any new project, use this questionnaire to interview the user.  
> Ask questions in **focused batches** (Phase 1, then Phase 2, etc.) rather than sending the entire document at once. Always highlight the **(Recommended)** option.

---

## 🧭 Phase 1: Project Scope, Framework & Architecture

### Q1.1: Project Type & Scope (Kiya Banana Chahte Hain?)
What is the scope of this build?
- [x] **(Recommended) Full-Stack Application** (Complete Frontend + Backend + Database)
- [ ] **Frontend Only** (User Interface, Dashboards, Marketing SPA/PWA connecting to existing APIs)
- [ ] **Backend Only** (API server, Database models, Background jobs, Business logic)
- [ ] **Standalone REST / GraphQL APIs** (Microservices or API gateway)

---

### Q1.2: Core Technology Stack & Backend Placement (Backend Kahan Rakhna Hai?)
> **MANDATORY AGENT REQUIREMENT**: The agent MUST ask the user upfront how they want the backend structured (inside the same Next.js project, as a separate Next.js backend project, as Python FastAPI, or Node.js).
Which architectural setup do you prefer?
- [x] **(Recommended Dual Next.js) Next.js Frontend + Dedicated Next.js Backend API (2 Separate Next.js Projects)**:  
  - `frontend/`: Next.js App Router for UI, Layouts, SSR, and Client Components.  
  - `backend/`: Dedicated Next.js project solely hosting `/api` Route Handlers, Database ODM (Mongoose / MongoDB), Background Jobs, and Webhooks.  
  *Best for team separation, independent deployments, and end-to-end TypeScript.*
- [ ] **Next.js (App Router) Frontend + Dedicated FastAPI (Python) Backend + MongoDB (Motor)**:  
  *Best for high-performance dedicated server tasks, Python AI/data pipelines, and enterprise scale.*
- [ ] **Unified Full-Stack Next.js Monolith (Single Next.js Project)**:  
  *Frontend UI and internal `/api` Route Handlers reside inside a single repository. Zero CORS, fast deployment.*
- [ ] **Next.js Frontend + Dedicated Node.js / Express Backend + MongoDB (Mongoose)**:  
  *Best for traditional Node microservices.*
- [ ] **Custom Stack** *(Specify frontend, backend, collections, and ODM driver)*

---

### Q1.3: Server vs Serverless Deployment (Hosting Model)
How should the backend be hosted?
- [x] **(Recommended) Dedicated ASGI Server (FastAPI / Uvicorn in Docker or VPS)**  
  *Ideal if long-running tasks, heavy computing, or WebSocket connections are required.*
- [ ] **Serverless Functions (Next.js API Routes / Vercel Serverless / AWS Lambda)**  
  *Zero server maintenance, auto-scaling, pay-per-execution.*

---

## 🎨 Phase 2: Design Aesthetics, UI/UX & Component Architecture

### Q2.0: Bespoke Brand Identity & Aesthetic Theme ("Design Apna Banana Hai")
> **MANDATORY PRINCIPLE**: Documentation code snippets are mechanical blueprints. The agent will craft a completely original, bespoke visual identity for your project, NOT a generic copy-paste from docs.
What is the visual personality, vibe, and bespoke color motif of your brand?
- [x] **(Recommended) High-End Obsidian & Sky Cyan / Electric Indigo** (Sleek dark mode, glowing sky-cyan highlights, deep frosted glass).
- [ ] **Emerald Mint & Deep Slate** (Fintech / Banking / Growth aesthetic, prestige feel).
- [ ] **Warm Amber, Gold & Midnight Charcoal** (Luxury e-commerce, hospitality, premium agency).
- [ ] **Vibrant Violet & Rose Gradient** (Creator economy, AI SaaS, modern social tool).
- [ ] **Minimalist Monochrome & Architectural Precision** (Clean black, stark white, fine borders, high Swiss typographic rigor).
- [ ] **Custom Brand Identity** *(User provides brand primary hex code, secondary color, and style guidelines)*.

---

### Q2.0B: Brand Logo & Real Favicon Suite Style (Logo & Favicon Kesa Chahiye?)
> **MANDATORY BRANDING RULE**: Leaving framework default favicons (Next.js triangle, Vite bird, React atom) or generic unstyled text for a logo is strictly forbidden. The agent MUST create a bespoke, production-ready SVG brand logo and full favicon suite.
Which visual style should be crafted for your brand logo and favicon suite?
- [x] **(Recommended) High-End Geometric Abstract Mark + Wordmark**:
  - **Full Logo**: Bespoke geometric vector emblem with glowing multi-stop gradient paired with bold typographic wordmark (using display font).
  - **Collapsed Glyph**: High-contrast 32x32 vector glyph tailored for the `h-dvh` collapsed sidebar, mobile topbar, and PWA icon.
  - **Complete Favicon Suite**: Real `favicon.ico` (multi-resolution), `icon.svg` (crisp scalable vector), `apple-touch-icon.png` (180x180 iOS), `icon-192.png` & `icon-512.png` (Android/PWA), and `site.webmanifest`.
- [ ] **Modern Tech Monogram / Stylized Lettermark**:
  - High-impact typography monogram with ambient glow and clean corporate subtitle.
- [ ] **Minimalist Architectural Shield / Emblem**:
  - Clean vector crest/shield with fine geometric lines (ideal for fintech, legal, security, enterprise).
- [ ] **Custom Existing Brand Assets**:
  - *User provides exact SVG vector paths, high-res PNGs, and existing brand guidelines to integrate.*

---

### Q2.1: Styling Framework
- [x] **(Mandatory) Tailwind CSS (v3 / v4)**  
  *Tailwind CSS is the official styling engine. Built with `dark:` class dual-theme support, custom glassmorphism utilities, and glow effects.*

---

### Q2.2: Bespoke Typography & Font Discovery (Konsa Font Chahiye?)
Which modern typeface pairing would you like for headers and interface body text?
- [x] **(Recommended) High-Impact Modern Tech Pairing**:  
  - **Display / Headers**: **Neofolio** or **Nexo Kora** *(Sharp, high-contrast, futuristic neo-grotesque)*  
  - **Body / Interface**: **Plus Jakarta Sans** or **Outfit** *(Clean, geometric, ultra-legible)*
- [ ] **Editorial Luxury & Avant-Garde Pairing**:  
  - **Display / Headers**: **Bierika** or **OSIRIS** *(Architectural, curved terminals, high elegance)*  
  - **Body / Interface**: **Inter** or **Plus Jakarta Sans**
- [ ] **Bold Cyberpunk / Monospaced**:  
  - **Display**: **Clash Display** or **Syne** | **Body**: **Geist Mono** / **Outfit**
- [ ] **Custom Approved Font Combination** *(Specify font names)*

---

### Q2.3: Animation & 3D WebGL Capabilities
Which animation libraries and interactive 3D elements should be active?
- [x] **(Recommended) Framer Motion + GSAP ScrollTrigger**:  
  *Fluid layout morphing, spring entrance/exit toasts, interactive cards glow hover, and smooth scroll animations.*
- [ ] **Add Three.js Interactive 3D Model (User Permission Granted)**:  
  *Includes a lightweight, 100% free, animated 3D GLTF model (from free sources like Kenney or Three.js official models) or procedural 3D particle canvas. (Paid/heavy models are forbidden).*
- [ ] **Lightweight CSS/Framer Motion Only (No 3D)**.

---

### Q2.4: Iconography & Animated Lottie Ecosystem
Which icon libraries should be integrated?
- [x] **(Recommended) Hybrid Modern Vectors + Animated Micro-Icons**:  
  - **Static Vectors**: `lucide-react`, `@fortawesome/react-fontawesome`, Google Material Symbols.  
  - **Animated Icons & Lottie**: **Lordicon** (`lordicon.com`), **Icons8** (`icons8.com`), **LottieFlow** (`lottieflow.com`), **LottieFiles** (`lottiefiles.com`) for interactive button triggers, success toasts, and empty states.
- [ ] **Static Lucide React Only**.

---

### Q2.5: Form Inputs Architecture (Floating Label Rule)
- [x] **(Mandatory Standard) Custom Floating Label Inputs (Zero Placeholders)**:  
  - Text/Password inputs: Label starts vertically centered; floats to top border outline on focus or when value exists.  
  - Textarea: Label starts aligned to the first line; floats to top border on focus.  
  - Select: Google Forms style centered label with zero premature placeholder text.

---

### Q2.6: Layout Architecture & Mobile Navigation (Sidebar, Mobile Bottom Bar & Floating Menu Pill)
- [x] **(Recommended Master Responsive Layout Engine)**:  
  - **Desktop (`>= 1024px`)**: Fixed resizable `h-dvh` sidebar with drag handle, `localStorage` width memory, collapse/expand toggle, and glass topbar.
  - **Public Pages Mobile (`< 1024px`)**: **Strict No-Sidebar Rule**. Fixed bottom footer navigation bar (`fixed bottom-0`) with 3-4 primary links + a mandatory "More" (`...`) link that slides open a native-style bottom sheet drawer for all auxiliary pages.
  - **Dashboard Mobile (`< 1024px`)**: Slide-out mobile navigation drawer triggered via a floating bottom-center obsidian glass pill labeled `"Menu"` (Vercel-inspired design). Features **Dual Close Controls**: bottom pill morphs into `"Close"` ('X') while the sidebar header also contains a dedicated top 'X' close button.
- [ ] **Standard Responsive Hamburger Menu (Traditional top hamburger on all pages)**.


---

## 🔐 Phase 3: Roles, Hierarchy & RBAC Permissions

### Q3.1: User Roles & Actors (System Main Kon Kon Ho Ga?)
Which user personas exist in this application?
- [x] **Developer (Super-Root)**: Platform architect, manages server health, registers client companies.
- [x] **Owner (Business Master)**: Owns the company account, views financials, manages staff, controls billing.
- [x] **Admin**: Manages day-to-day operations, assigns tasks, manages inventory/users.
- [x] **Staff / Employee**: Executes daily workflow (e.g. processes orders, updates status).
- [x] **Customer / Client**: Public user who places orders, views invoices, and manages their own profile.

---

### Q3.2: Developer vs Owner Hierarchy & Protection Boundaries
Who holds the ultimate business authority, and can the Developer alter the Owner's rights?
- [x] **(Recommended) Strict Dual-Protection Model**:  
  - **Developer** controls system infrastructure, multi-tenant company onboarding, database indexing & schemas, and developer safeguards.  
  - **Owner** is the sovereign business master. **Developer cannot revoke Owner's company rights or modify business data without explicit consent.**  
  - **Owner cannot lock out Developer from platform infrastructure.**
- [ ] **Developer-First (Developer controls all permissions, including Owner's).**
- [ ] **Owner-First (Owner is absolute root; Developer is an internal staff technician).**

---

### Q3.3: Permission Granularity (Page-Level vs Action/Button-Level)
How deep should RBAC security be implemented?
- [x] **(Recommended) Action-Level Granular RBAC (Button & API Level)**  
  *Permissions are granular per action (e.g., `orders:view`, `orders:create`, `orders:edit`, `orders:delete`). Staff can view and edit an order, but the "Delete" button is physically hidden/disabled in the UI AND rejected by the backend API if attempted.*
- [ ] **Page-Level RBAC Only**  
  *Access is controlled by URL route (e.g., Staff can access `/orders`, but not `/finance`). Once on the page, all actions are allowed.*

---

### Q3.4: Dedicated User Portals
Which dedicated portal interfaces are required?
- [x] **(Recommended) Multi-Portal System**:
  - `Customer Portal`: Clean storefront / client dashboard (`/portal` or `/my-account`).
  - `Employee/Staff Portal`: Operational task view (`/staff` or `/app`).
  - `Owner / Executive Dashboard`: Analytics, revenue, audit logs (`/admin` or `/dashboard`).
  - `Developer Super Console`: Tenant management, API logs, system health (`/system-console`).
- [ ] **Unified Dashboard (All roles use the same dashboard with conditional UI components).**

---

### Q3.5: Authentication Engine, Silent Facelock & Multi-Account Switcher
Which authentication and identity workflows should be enabled?
- [x] **(Recommended) Advanced Multi-Account & Biometric Facelock Suite**:
  - **Silent Background Facelock**: Automatically probes face detection on login page without opening visible camera UI; falls back to manual button.
  - **Multi-Face Conflict Dialog**: If 1 face matches multiple profiles, user chooses target account; remaining profiles load into multi-session vault.
  - **Topbar Account Switcher**: Switch between active accounts instantly from the user profile dropdown without re-entering passwords.
  - **Anti-Enumeration & Timing Attack Defense**: Generic `"Invalid email or password"` message; backend executes constant-time bcrypt checks against a dummy hash for non-existent users.
  - **Multi-Step Signup & 6-Box OTP**: Email-first registration with signed token URL (`?token=&option=otp`), 6-box auto-verifying OTP (with `Ctrl+V` support), and strong password policy enforcement.
  - **Dynamic Rate Limiting**: All auth endpoints governed by `.env` request caps.
- [ ] **Standard Credentials Only (Email + Password + Simple OTP)**.

---

### Q3.6: Edge Proxy Route Protection & Unauthorized Access Feedback (Proxy & Protected Routes)
> **MANDATORY SECURITY PROXY RULE**: Protected routes must be strictly guarded via Next.js Edge Middleware (`middleware.ts`). Unauthorized or unauthenticated visitors must be immediately blocked, redirected to a safe view, and alerted via toast notification ("Aap is page pe nahi ja sakte hain").
Which route protection and proxy behavior should be enforced?
- [x] **(Recommended Mandatory Standard) Dual-Shield Edge Proxy + Interception Toasts + Fresh Evaluation on Auth**:
  - **Edge Middleware Proxy**: Intercepts every route before server render; blocks unauthorized users at the network edge.
  - **Client RouteGuard**: Prevents visual layout flashing on client-side SPA transitions.
  - **Animated Interception Toast**: Blocked navigation triggers an instant error toast: *"⛔ Aap is page pe nahi ja sakte hain (Access Denied)"*.
  - **Fresh Login/Logout Invalidation**: On every login and logout, the proxy session cookie and client cache are wiped and re-evaluated from scratch. Browser Back-button navigation is blocked via `Cache-Control: no-store`.
- [ ] **Basic Client-Only Route Redirects (No Edge Middleware)**.

---

## 🏢 Phase 4: Multi-Company & Multi-Tenant Architecture

### Q4.1: Single Company vs Multi-Company (Multi-Tenancy)
Will this application serve a single company or multiple independent organizations?
- [x] **Multi-Company / Multi-Tenant SaaS Platform**:  
  *Multiple companies register on the platform. Each company's data is completely isolated. Developer onboards companies; each company manages its own staff and customers.*
- [ ] **Single Company / Dedicated Instance**:  
  *The entire app belongs exclusively to one organization.*

---

### Q4.2: Public Pages & Custom Domain Routing
How should multi-tenant routing and public storefronts work?
- [x] **(Recommended) Hybrid Custom Domains & Subdomains**:  
  - Each company gets a subdomain (e.g. `company1.app.com`).
  - Optional custom domain mapping (e.g. `clientstore.com` -> routes to `company1`).
  - Main root (`/` on `app.com`) serves as the SaaS platform landing page & login portal.
- [ ] **Path / ID Based Routing**:  
  *Shared domain with path-based tenants (e.g., `app.com/c/company1/orders`).*
- [ ] **Replace Root Home Page with Tenant Lookup**:  
  *Root `/` prompts user to enter company code or redirects to the user's registered company portal.*

---

## 📦 Phase 5: Order Processing System & Slide Review Workflow

### Q5.1: Order Management Architecture
Do you need an Order Management System?
- [x] **(Recommended) Dual-View Order System**:  
  1. **Master Table View**: Comprehensive data table with multi-criteria filtering (status, date, payment), search, sorting, and pagination.  
  2. **Focused 1-by-1 Slide/Carousel Processing View**: Staff or Owner clicks **"Start Processing"** -> opens an immersive, distraction-free single-order card showing complete customer items, payment status, and quick action buttons (Update Price, Mark Paid, Change Status, Cancel, Print Invoice) with **Next / Previous Order** hotkeys.
- [ ] **Standard Table View Only** (No focused slide mode).
- [ ] **Kanban Board View** (Drag and drop across Pending -> Processing -> Delivered columns).
- [ ] **No Order System Needed** (Project is not an e-commerce or order-based app).

---

## 📝 Phase 6: Content Management System (CMS) & Visual Site Operating System

### Q6.1: CMS Requirement & Shell Placement
Which architectural mode should the CMS use?
- [x] **(Recommended) Integrated Dashboard CMS (`/dashboard/cms`)**:  
  *Embedded inside the Owner/Admin dashboard. Features an Options Card Grid, auto-syncing sidebar submenus, a Live Status Report (active theme, published pages overview), and a Recent Activity Feed with one-click revision rollback.*
- [ ] **Standalone Portal Mode (`/cms` or `/studio`)**:  
  *A dedicated full-screen visual studio with an isolated navigation rail, "← Back to Dashboard" and "↗ View Live Website" buttons, and full keyboard shortcut integration (`Ctrl+S`, `Ctrl+Z`, `Alt+T`).*
- [ ] **Dual-Mode (Both Available)**:  
  *Admins use the dashboard tab for quick edits; developers use the standalone portal for deep code/layout management.*
- [ ] **No CMS Needed** (Content is static or code-managed).

---

### Q6.2: Dynamic Data, Theming & Visual Workflow Automation
What advanced CMS features should be active?
- [x] **(Recommended) Full Enterprise Suite**:  
  - **Bidirectional Live Sync**: Real-time sync between Visual WYSIWYG Canvas and Monaco HTML/CSS Editor.  
  - **Variable Registry**: Dynamic tokens (`{{user.username}}`, `{{order.total}}`) with automated "Sync Models" schema introspection.  
  - **Visual Workflow Studio**: Node-based visual API pipeline (triggers, branches, MongoDB queries, AI prompts with model fallback).  
  - **Global Theming & Skeletons**: Independent Light/Dark palettes, custom skeleton animations, and unified styling across tables, cards, and pages.  
  - **Reusable Smooth Drag-and-Drop**: Physics-based displacement for links, social icons, and layout items.
- [ ] **Basic Content Management Only** (Markdown blogs, announcements, and simple text banners).

---

### Q6.3: Template Gallery & Scroll Video Hero
Should pre-built template blueprints and interactive scroll-driven video be included?
- [x] **(Recommended) 30 Public Templates + Section SDK + FFmpeg Scroll Video Scrubber**:  
  *Includes 30 categorized blueprints, 100–200 modular sections with `<div layout>` wrappers, single-item array loops, and an FFmpeg frame extraction pipeline for cinematic scroll-scrubbed video animations.*
- [ ] **Standard Sections Only** (Hero, Features, Pricing, and Contact form without video scrubbing).

---

### Q6.4: Custom In-House Media Viewers & Universal 404 Game Experience
How should media documents and 404 error routes be handled?
- [x] **(Recommended) Custom Frosted Glass Video Player, In-House PDF Reader & Interactive 404 Game Page**:  
  - **Custom Video Player**: Custom frosted glass control pill, scrub bar with hover thumbnail preview, playback speed (0.5x to 2x), volume slider, and PiP (zero native browser controls).  
  - **In-House PDF Viewer**: Smooth virtualized scrolling, zoom slider, sidebar page thumbnail rail, in-document search, download & print buttons.  
  - **Universal 404 Interactive Game Page (`app/not-found.tsx`)**: Standalone route featuring a playable retro-arcade HTML5 Canvas mini-game (Cyber Asteroid Dodger), score counter, touch/keyboard controls, and "Return to Safety" CTAs when any deleted/disabled page is visited.
- [ ] **Standard Fallbacks Only** (Browser default `<video>` and static plain 404 text page).

---

### Q6.5: Dynamic Document Studio (PDF, Email, WhatsApp) & Bulk Worker Pipeline
How should transactional documents (invoices, receipts, emails, WhatsApp messages) and bulk batch processing be structured?
- [x] **(Recommended) Dynamic PDF Canvas Studio, Email Builder, WhatsApp Studio & Parallel Worker Pipeline**:  
  - **Dynamic PDF Studio**: Absolute positioning canvas (`x`, `y`, `width`, `height`), perimeter resize handles, dynamic QR code generator with model variables, multi-page custom sizing, layer tree with drag reordering, and strict missing-data omission.  
  - **Email Template Builder**: Cross-client flow/table layout (`width`, `margin`, `padding`, `text-align`, zero absolute layers), variable loops, and code sync.  
  - **WhatsApp Message Studio**: Formatted text (`*bold*`, `_italic_`), parameter variables, dynamic action buttons, and media headers.  
  - **Cross-Template Attachments**: Automatically hydrates and attaches compiled PDF templates to outgoing emails and WhatsApp alerts.  
  - **Single Batch API & Parallel Workers**: Frontend fires a single request for selected table/card rows (`POST /api/v1/bulk/...`); backend worker pool compiles 50+ PDFs concurrently in 1–2 seconds and streams a ZIP/merged file without blocking the event loop.
- [ ] **Basic Transactional Text Only** (Simple unstyled email text without PDF canvas or WhatsApp templates).

---

### Q6.6: Digital Asset Management (DAM), Website Details Cascading & Auth Pages Theme Studio
How should brand assets, global company contact information, and authentication page styling be managed?
- [x] **(Recommended) Centralized Assets DAM, Single Source of Truth Brand Details, 5-Card Auth Customizer & Tenant CMS Delegation**:  
  - **Central Assets DAM & Universal Auto-Ingestion**: Any image, video, SVG, or document uploaded anywhere (carousel, hero, section, product, email) automatically saves into `/dashboard/cms/assets`. Features in-house frosted glass video previewer with precision scrub bar, resolution switcher (720p/1080p/4K), and high-definition image inspector with pan/zoom.  
  - **Reference-Based Media Architecture (Zero Duplication)**: Assets generate reference tokens (`{{assets.logo}}`); components store references, ensuring updating a logo in Assets updates the entire site instantly.  
  - **Website Details Studio (`/dashboard/cms/website-details`)**: Centralized management of Website Name, Favicon, Light/Dark Logos, Support Email, Phone, WhatsApp, Physical Address, and Social Links. Automatically cascades to Topbar, Sidebar, and Footer with selective override capability.  
  - **Auth Pages Theme Customizer (`/dashboard/cms/auth-themes`)**: Dedicated 5-card hub for Login, Signup, Forgot Password, Reset Password, and 6-Box OTP. Dual Light/Dark mode styling, 4 layout modes (Split Left Form, Split Right Form, Centered Card, Minimal Card), and **The Mobile Anti-Compression Law** (100% full-width collapse on `< 768px`, minimum 48px touch targets, 16px iOS anti-zoom font size).  
  - **Multi-Tenant CMS Isolation & Developer Delegation**: Every tenant operates an isolated CMS instance. The Developer can govern permissions or delegate full visual builder, code editor, and document capabilities to tenant owners.
- [ ] **Static Assets & Unstyled Auth Pages** (Manual hardcoded image links and standard uncustomizable auth templates).

---

### Q6.7: Root Models & React Contexts Architecture (State & API Standard)
How should database schemas, API operations, and client-side state variables be structured across the codebase?
- [x] **(Mandatory Standard) Dedicated Root `/models`, Corresponding Root `/context`, and Context-First API Encapsulation**:  
  - **Root `/models`**: Separate file per MongoDB collection (e.g. `models/Program.ts`, `models/Order.ts`). Mongoose schemas, compound indexes, and strict multi-tenant scoping (`companyId`).  
  - **Root `/context`**: 1-to-1 matching React Context per model (e.g. `context/ProgramContext.tsx`, `context/OrderContext.tsx`) + 3 global structural contexts (`AuthContext`, `ThemeContext`, `ToastContext`).  
  - **Zero Direct Component API Calls**: All mutations, fetches, and domain operations (e.g. `createProgram`, `editProgram`, `deleteProgram`, `downloadProgramPdf`, `sendProgramEmail`) execute exclusively through context methods.  
  - **Single-Fetch & Shared State (Zero Duplicate Variables)**: Data loads once into context state; components consume shared variables directly. Updating an item updates the context array in-place, triggering automatic re-renders across all consumer components with zero redundant network requests.  
  - **Public Pages Restraint**: Heavy domain contexts are excluded from public landing pages, mounting only within their respective protected route segments.
- [ ] **Scattered Models & Ad-Hoc Fetching** (Loose schema files and direct `fetch()` calls in random components).

---

## ⌨️ Phase 7: Special Features, Shortcuts & Global Search

### Q7.1: Global Search & Command Palette
- [x] **(Recommended) Command Palette (`Cmd+K` / `Ctrl+K`)**:  
  *Instant search modal across pages, orders, customers, settings, and quick actions.*
- [ ] **Simple Top Navbar Search Bar**.
- [ ] **No Global Search**.

---

### Q7.2: Keyboard Shortcuts Engine
What level of keyboard shortcut support should be built?
- [x] **(Recommended) Master Power-User Shortcuts**:  
  *`Cmd+K` (Search), `Esc` (Close modal/slide), `J`/`K` or `ArrowDown`/`ArrowUp` (Table row navigation), `ArrowRight`/`ArrowLeft` (Next/Prev order in Slide view), `Ctrl+Enter` (Submit/Approve), `Alt+T` (Theme toggle).*
- [ ] **Basic Shortcuts Only**:  
  *`Cmd+K` for search and `Esc` for closing dialogs.*
- [ ] **No Keyboard Shortcuts**.

---

### Q7.3: Biometric / Facelock Authentication
Should facial biometric authentication be provided?
- [x] **(Recommended) Custom Face Recognition AI Model (128-d Vector Embeddings - No Passkeys)**:  
  *Uses client-side computer vision models (MediaPipe / FaceNet) to extract 128-d face descriptors, matched on backend via vector distance. Supports silent background scan and multi-face account resolution without requiring OS WebAuthn passkeys.*
- [ ] **Standard Auth Only (Email/Password, Google OAuth, Magic Link)**.

---

### Q7.4: Theme Toggle (Dark / Light Mode)
- [x] **(Recommended) Tri-State Theme Toggle (Dark / Light / System Sync)**.
- [ ] **Dark Mode Only**.
- [ ] **Light Mode Only**.

---

## 🔔 Phase 8: Automations, Notifications & CI/CD

### Q8.1: Notification Channels
Which notification and messaging automations are needed?
- [x] **(Recommended) Multi-Channel Notifications**:  
  - **SMTP Email**: Transactional order receipts, password resets, daily executive summaries.
  - **WhatsApp Business Automation**: Instant order confirmation alerts, status update pings, OTP verification.
  - **In-App Toast & Web Push**: Real-time browser notifications for staff when a new order arrives.
- [ ] **Email (SMTP) Only**.
- [ ] **In-App Notification Bell Only**.

---

### Q8.2: CI/CD & GitHub Workflow
- [x] **(Recommended) Automated GitHub Actions**:  
  *Automated linting, TypeScript type-checking, backend test runner, and automated preview deployment on commit.*
- [ ] **Manual Deployment**.

---

## 🛡️ Phase 9: Developer Client Payment Safeguard Module

### Q9.1: Developer Client Payment Management Safeguard
Do you want to enable the Developer Payment Safeguard module for client projects?
- [x] **(Recommended) Enable Developer Payment Safeguard Module**:  
  - **Rule**: Client application queries Developer license API: `{ paymentClear: boolean }`.
  - **Behavior**:
    * If `paymentClear == true`: 100% normal, completely invisible.
    * If `paymentClear == false` AND today's date <= 8th of the month: A clean, non-intrusive sticky top banner is shown **ONLY to the Owner role** stating: *"Scheduled monthly hosting/maintenance payment is pending. Please complete payment before the 8th."* (Customers & Staff see nothing).
    * If `paymentClear == false` AND today's date > 8th: Grace period has lapsed; displays an urgent resolution banner to the Owner.
- [ ] **Disable Safeguard Module** (Project is internal or has alternative billing).

---

## ⚙️ Phase 10: Settings Architecture, Integrations & Dynamic Feature Flags

### Q10.1: Settings Structure & System Settings Access (Kisko Mile Gi System Settings?)
> **MANDATORY SETTINGS RULE**: Every project MUST feature a Settings hub with two distinct tiers: **Normal Settings** (Personal profile, security, appearance, regional preferences, company profile) and **System Settings** (Platform infrastructure, credentials, storage, AI keys, and feature flags).
Who should have access to **System Settings**?
- [x] **(Recommended if Developer Role Exists) Dual Developer Governance with Delegation Option**:
  - Developer has full platform governance over System Settings.
  - **Delegation Choice**:
    - [ ] **Delegate to Owner**: Both Developer AND Owner can access System Settings (Owner manages credentials, Developer provides backup).
    - [x] **Developer Only**: Restricted exclusively to Developer console. Owner only sees Normal Settings.
- [ ] **(Mandatory if NO Developer Role Exists) Always Grant System Settings to Owner / Main User**:
  - When the project has no Developer role, System Settings is **ALWAYS granted to the Owner / Main User role**. Critical service credentials must never become inaccessible.

---

### Q10.2: Storage Integration Providers & Live Testing (Storage Kahan Rakhna Hai?)
Which file storage providers should be configured in System Settings? *(Multiple providers can be configured; active provider chosen via dropdown)*
- [x] **(Recommended Multi-Cloud Storage Suite)**:
  - [x] **Vercel Blob** (Fast edge blob storage for Next.js deployments).
  - [x] **Supabase Storage** (S3-compatible bucket with CDN).
  - [x] **Firebase Storage** (Google Cloud Storage integration).
  - [x] **Local File Storage** (Direct server filesystem storage for on-premise / VPS).
  - [x] **Google Drive Storage** (OAuth 2.0 folder integration).
  - [x] **Cloudflare R2 / AWS S3 / MinIO** (Zero egress-fee R2 or enterprise S3 buckets).
  - **Live Verification Requirement**: Every storage provider card **MUST include a "Test Connection & Upload" button** that executes a real 1KB dummy upload, verifies read access, auto-deletes the file, and displays roundtrip latency in ms.
- [ ] **Single Dedicated Storage Provider Only** *(Specify provider)*.

---

### Q10.3: AI Integrations, Multi-Key & Fallback Engine (Konsi AI APIs & Fallback Chahiye?)
Which AI providers, models, and fallback chains should be configured?
- [x] **(Recommended Multi-Provider AI Hub with Multi-Key & Fallback)**:
  - **Supported Providers**: OpenAI (`gpt-4o`, `o1`), Anthropic Claude (`claude-3-5-sonnet`), OpenRouter (200+ models), Google Gemini (`gemini-1.5-pro/flash`), Groq (`llama-3.3-70b`), Mistral, Perplexity, DeepSeek (`deepseek-v3/r1`), Ollama (Local LLM), and Custom Endpoints.
  - **Multi-Key Capability**: Ability to enter multiple API keys for any single provider (with custom labels and priority tiers).
  - **Intelligent Fallback Chains**: Auto-fallback upon rate limits (HTTP 429) or outages (HTTP 500) (e.g. Primary OpenAI Key 1 -> Backup OpenAI Key 2 -> Claude 3.5 Sonnet -> Groq LPU).
  - **Live Test Ping**: Every key and provider features a dedicated **"Test Key" button** measuring latency (ms) and confirming model handshake.
  - **AI Placement Matrix**: Select where AI is activated across the website:
    - [x] AI Customer Chatbot & Support Assistant
    - [x] AI Product Description & SEO Content Generator
    - [x] AI Business Analytics & Executive PDF Report Summarizer
    - [x] AI Vision, Document & Invoice OCR
    - [ ] AI Image & Banner Generator
- [ ] **Single AI Provider Only (No Fallback)** *(Specify provider)*.
- [ ] **No AI Integrations Required**.

---

### Q10.4: Dynamic Feature Flags & Strict Zero-Leak UI Enforcement (Konse Features On/Off Rakhne Hain?)
> **STRICT ZERO-LEAK MANDATE**: Features toggled OFF must **COMPLETELY DISAPPEAR** from the user experience. No disabled buttons, no locked teaser menus, no routes accessible. Direct URL visits trigger a clean 404 Not Found.
Which modular features should be controllable via the Developer / Owner Feature Flags panel?
- [x] **(Recommended Comprehensive Feature Flags Engine)**:
  - [x] **AI Capabilities** (`feature:ai_engine`): Toggle all AI touchpoints on/off.
  - [x] **WhatsApp Business Automation** (`feature:whatsapp_automation`): Toggle WhatsApp notifications on/off.
  - [x] **3D Models Upload & Viewer** (`feature:3d_models`): Toggle 3D GLTF product/dashboard models on/off.
  - [x] **Biometric Facelock Auth** (`feature:facelock_auth`): Toggle face recognition login on/off.
  - [x] **Barcode & QR Code Scanner** (`feature:barcode_scanner`): Toggle camera scanning tools on/off.
  - [x] **Dedicated Portals** (`feature:customer_portal`, `feature:vendor_portal`): Toggle individual sub-portals on/off.
  - [x] **Content Management System** (`feature:cms_engine`): Toggle announcements and blog CMS on/off.
- [ ] **Static Code-Level Features Only (No Dynamic Toggle Matrix)**.

---

### Q10.5: Multi-Tenant Settings Isolation (Tenant Settings Kese Hon Gi?)
*(Applicable only if Multi-Tenancy is enabled in Phase 4)*
How should settings behave across tenant companies?
- [x] **(Recommended) Tenant-Isolated Credentials with Developer Super Console Control**:
  - Each tenant maintains independent settings (custom SMTP, custom WhatsApp, dedicated storage bucket, custom AI keys).
  - Developer Super Console (`/system-console`) can inspect, manage, or override settings per tenant, or allow tenants to inherit platform defaults.
- [ ] **Global Platform Credentials Shared for All Tenants**.

