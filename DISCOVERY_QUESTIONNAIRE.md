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

### Q1.2: Core Technology Stack (Konsa Framework & Database?)
Which technology stack do you prefer?
- [x] **(Recommended) Next.js (App Router) + FastAPI (Python Backend) + PostgreSQL (Supabase/Neon)**  
  *Best for high-performance dedicated server tasks, data processing, and enterprise dashboards.*
- [ ] **Full-Stack Next.js (TypeScript) + Serverless Route Handlers + PostgreSQL / Prisma**  
  *Best for rapid deployment on Vercel without maintaining a dedicated Python backend.*
- [ ] **Vite + React (Frontend SPA) + Node.js / Express (Backend) + MongoDB**  
  *Best for flexible MERN stack architectures.*
- [ ] **FastAPI Backend Only + Swagger/OpenAPI Docs + PostgreSQL / SQLAlchemy**
- [ ] **Custom Stack** *(Specify frontend, backend, database, and ORM)*

---

### Q1.3: Server vs Serverless Deployment (Hosting Model)
How should the backend be hosted?
- [x] **(Recommended) Dedicated ASGI Server (FastAPI / Uvicorn in Docker or VPS)**  
  *Ideal if long-running tasks, heavy computing, or WebSocket connections are required.*
- [ ] **Serverless Functions (Next.js API Routes / Vercel Serverless / AWS Lambda)**  
  *Zero server maintenance, auto-scaling, pay-per-execution.*

---

## 🎨 Phase 2: Design Aesthetics & UI/UX Experience

### Q2.1: Visual Theme & Aesthetic Direction (Design Kesa Chahiye?)
What aesthetic vibe should the application project?
- [x] **(Recommended) Sleek Dark Modern with Glassmorphism**  
  *Deep slate/charcoal backgrounds (`#0B0F19`), subtle gradient borders, backdrop-blur glass panels, vibrant accent glowing buttons (Emerald, Indigo, or Cyan).*
- [ ] **Clean SaaS Corporate Light/Dark Hybrid**  
  *Crisp contrast, high readability, refined grays, subtle borders, crisp modern typography.*
- [ ] **Cyberpunk / High-Tech Neon**  
  *Dark futuristic aesthetic, high-contrast neon accents, monospaced data readouts.*
- [ ] **Minimalist Editorial / Luxury**  
  *Monochrome elegance, generous whitespace, serif/sans-serif pairing, subtle micro-interactions.*

---

### Q2.2: Styling System & Design Tokens
What styling engine should be configured?
- [x] **(Recommended) Custom Vanilla CSS Design Tokens (CSS Variables)**  
  *Maximum flexibility, zero build overhead, pure custom micro-animations and smooth gradients.*
- [ ] **Tailwind CSS (Specify v3 or v4)**  
  *Utility-first styling with custom plugin tokens.*

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
  - **Developer** controls system infrastructure, multi-tenant company onboarding, database migrations, and developer safeguards.  
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

## 📝 Phase 6: Content Management System (CMS)

### Q6.1: CMS Requirement & Integration
Is a Content Management System (CMS) required?
- [x] **(Recommended) Integrated Dashboard CMS**:  
  *Embedded inside the Owner/Admin dashboard. Allows dynamic creation and editing of announcements, landing page banners, articles, FAQs, and SEO meta tags without leaving the app.*
- [ ] **Standalone Headless CMS / Dedicated View**:  
  *A completely separate CMS interface managed by content editors or Developer.*
- [ ] **No CMS Needed** (Content is static or code-managed).

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
Should high-security biometric or facial authentication be provided?
- [x] **(Recommended) WebAuthn Passkeys & Biometric Lock (Face/Fingerprint)**:  
  *Allows Owner and Staff to authenticate high-value transactions, order refunds, or sensitive login via device biometrics (Windows Hello, Touch ID, Face ID).*
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
