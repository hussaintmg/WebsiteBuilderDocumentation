# Main Agent Directive & Autonomous Workflow Engine

> **STATUS: MANDATORY FOR ALL AI AGENTS**  
> If you are an AI assistant (Antigravity, Claude, ChatGPT, etc.) working on a project using this framework, you MUST read and execute this directive before taking any coding action.

---

## 🛑 Rule Zero: The Absolute Prerequisite

```
                       ┌─────────────────────────┐
                       │  New User Request Received  │
                       └────────────┬────────────┘
                                    │
                                    ▼
                      /───────────────────────────\
                     <  Does /.project/PLAN.md     >
                     <  already exist & approved?  >
                      \───────────────────────────/
                                    │
                    NO              │            YES
         ┌──────────────────────────┴─────────────┐
         ▼                                        ▼
┌───────────────────────────────┐     ┌──────────────────────────────┐
│ STOP! DO NOT WRITE ANY CODE.  │     │ 1. Read .project/PLAN.md     │
│ 1. Load DISCOVERY_QUESTIONNAIRE│     │ 2. Read .project/RULES.md    │
│ 2. Ask user clarifying questions│    │ 3. Execute current Sprint    │
│ 3. Generate .project/ plan    │     │ 4. Verify evidence & test    │
└───────────────────────────────┘     └──────────────────────────────┘
```

**Never start scaffolding or writing production code until the user approves the generated plan file!**  
Doing otherwise results in misaligned architecture, wasted tokens, and rework.

---

## 📋 The 5-Phase Agent Execution Protocol

### Phase 1: Interactive Discovery Interview
When the user presents an idea or starts a new project:
1. Open [`DISCOVERY_QUESTIONNAIRE.md`](./DISCOVERY_QUESTIONNAIRE.md).
2. Ask questions in structured, digestible batches (never overwhelm the user with 50 questions at once; group them logically by Phase: Scope -> UI/UX -> RBAC -> Features -> Safeguards).
3. Always suggest recommended defaults (e.g. `(Recommended) Next.js App Router with FastAPI backend`).
4. Support the user in their preferred language (English, Urdu, or Roman Urdu).

---

### Phase 2: Project Workspace Initialization
Once answers are received:
1. Create a dedicated project configuration directory at the root:
   - For single-project repos: `/.project/`
   - For multi-project monorepos: `/projects/<project-name>/`
2. Generate the following core blueprint files using [`PLAN_BUILDER.md`](./PLAN_BUILDER.md):
   - `PLAN.md`: Objectives, stack, chosen modules, and scope boundaries.
   - `ARCHITECTURE.md`: Data models, API contracts, RBAC permissions, and file structure.
   - `RULES.md`: Design tokens, connection standards, and security rules extracted from `rules/`.
   - `SPRINTS.md`: Phased task list with clear checkboxes and test gates.
3. Present the plan summary to the user and request explicit confirmation to proceed.

---

### Phase 3: Scaffolding & Foundation First
Once the plan is approved:
1. Follow **Foundation-First rule**:
   - Set up **Tailwind CSS** with dual-theme (`dark:`) configuration and bespoke typography imports per [`rules/DESIGN_ARCHITECTURE.md`](./rules/DESIGN_ARCHITECTURE.md) and [`rules/FRONTEND_DESIGN_RULES.md`](./rules/FRONTEND_DESIGN_RULES.md).
   - Scaffold the foundational UI atoms: custom Floating Label Inputs (Text, Textarea, Select), `cursor-pointer` Buttons, and Resizable `h-dvh` Sidebar.
   - Set up the database schema and connection layer per [`rules/BACKEND_CONNECTION_RULES.md`](./rules/BACKEND_CONNECTION_RULES.md).
   - Set up the environment variables template (`.env.example`).
2. Scaffold only the necessary components and routes specified in the approved sprint.

---

### Phase 4: Module-Specific Implementation
Whenever implementing a specific subsystem, the agent **MUST read the corresponding module guide** from the `modules/` and `rules/` directories before writing code:

| Subsystem to Implement | Mandatory Module Document to Read |
| :--- | :--- |
| Tailwind Design System, Floating Inputs, Resizable Sidebar | [`rules/DESIGN_ARCHITECTURE.md`](./rules/DESIGN_ARCHITECTURE.md) & [`rules/FRONTEND_DESIGN_RULES.md`](./rules/FRONTEND_DESIGN_RULES.md) |
| User Roles, Portals, Action Permissions | [`modules/RBAC_SYSTEM.md`](./modules/RBAC_SYSTEM.md) & [`rules/RBAC_SECURITY_RULES.md`](./rules/RBAC_SECURITY_RULES.md) |
| Multi-Company / Multi-Tenant / Custom Domains | [`modules/MULTI_TENANT_SYSTEM.md`](./modules/MULTI_TENANT_SYSTEM.md) |
| Order Table & 1-by-1 Slide/Carousel Processing | [`modules/ORDER_SLIDE_WORKFLOW.md`](./modules/ORDER_SLIDE_WORKFLOW.md) |
| Content Management System (CMS) | [`modules/CMS_ENGINE.md`](./modules/CMS_ENGINE.md) |
| Keyboard Shortcuts Engine | [`modules/SHORTCUT_KEYS_SYSTEM.md`](./modules/SHORTCUT_KEYS_SYSTEM.md) |
| Passkeys, Face-lock, Biometric Auth | [`modules/AUTH_AND_FACELOCK.md`](./modules/AUTH_AND_FACELOCK.md) |
| SMTP, WhatsApp Automations, GitHub CI/CD | [`modules/AUTOMATIONS_AND_NOTIFICATIONS.md`](./modules/AUTOMATIONS_AND_NOTIFICATIONS.md) |
| Client Payment Tracking & 8th-Date Banner | [`rules/PAYMENT_SAFEGUARD_RULE.md`](./rules/PAYMENT_SAFEGUARD_RULE.md) |

---

### Phase 5: Verification & Completion Gate
Before marking any task or sprint as completed:
1. Read [`rules/TESTING_AND_VERIFICATION.md`](./rules/TESTING_AND_VERIFICATION.md).
2. Execute real verification commands (build scripts, unit tests, API curl tests, browser visual verification).
3. **Never claim success without actual terminal output or browser screenshots.** Evidence must always precede assertions.
4. Update `SPRINTS.md` marking completed tasks with `[x]` and notes on tested behavior.

---

## ⚡ Agent Behavioral Guardrails

1. **Aesthetics are Non-Negotiable**: No barebones, plain HTML, or default browser aesthetics. Use sleek dark modes, glassmorphism, curated typography (e.g. Outfit / Inter), smooth transitions, and polished micro-animations.
2. **Strict RBAC Separation**: Developer role is infrastructure/platform guardian; Owner is business master. Developer must NEVER lock out or modify Owner business permissions without explicit credentials.
3. **Payment Safeguard UI Discretion**: If the developer payment safeguard is enabled, the unpaid notification bar must ONLY be visible to the `Owner` role. Never expose it to customers, employees, or public users.
4. **Resilience & Graceful Fallbacks**: If external APIs (WhatsApp, SMTP, Biometric hardware) are unavailable or fail, provide graceful UI fallbacks and clear error toasts instead of crashing the app.
