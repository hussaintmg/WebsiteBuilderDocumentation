# Rule Specification: Safe Development, Zero-Regression & FILE-MAP Synchronization Standard

> **MANDATORY FOR ALL AI AGENTS & DEVELOPERS**  
> **Core Principle**: *"Kabhi bhi purani working cheezain tode baghair aur nayi cheezain add karte hue faltu bloat/code dale baghair proper tareeqe se kaam karna."* (Zero breaking changes, zero redundant bloat, 100% verified traceability).

---

## 🛑 1. The 10 Inviolable Safety Laws (Rules of Engagement)

When entering an existing repository or developing a new project across sprints, every agent and engineer must strictly obey these ten laws:

1. **Read & Trace Before Touching Code**: Never make assumptions based solely on filenames. Trace real imports, exports, functions, routes, and database schemas before writing a single line of code.
2. **Strict Backward Compatibility (Additive Only)**:
   - Existing exported types, interfaces, functions, route paths, API contracts, and database fields **MUST NOT be renamed, deleted, or altered** unless the user has explicitly requested a breaking change.
   - All new features must be **additive** (e.g., optional props, new non-conflicting routes, extended schemas with default fallbacks).
3. **Anti-Bloat & Zero-Duplicate Rule ("Faltu Cheezain Nahi Daalni")**:
   - Before adding any new utility function, UI component, or icon, search the codebase. If a modal, toast, date formatter, or HTTP client already exists, **reuse it**.
   - **Zero redundant npm/pip packages**: Never install a package (e.g., `axios`, `dayjs`, `lodash`) if the project already uses native `fetch`, `date-fns`, or built-in standard libraries.
4. **Never Break Unrelated Files**:
   - Limit file modifications strictly to the scope of the assigned task.
   - Do not "clean up", format, or re-structure unrelated files.
5. **Context-First & Model-First Architecture**:
   - Respect root `/models` and root `/context` encapsulations. Never write direct component-level database queries or bypass existing state managers.
6. **Graceful Error Handling & Fallbacks**:
   - If an external integration or service times out or fails, fail-safe or fail-open gracefully without crashing the whole application.
7. **No Hardcoded Secrets or Random Env Mutations**:
   - Never mutate `.env` directly without checking existing key names. Never hardcode credentials in code.
8. **UI Non-Disruption**:
   - Ensure new UI components seamlessly inherit existing design-system rules (`design-system/FRONTEND_DESIGN_RULES.md`), typography, colors, animations, and dark mode classes without visual jank or layout shift.
9. **Synchronized FILE-MAP Maintenance**:
   - The root `FILE-MAP.md` is the living navigation manual of the repository. After adding or modifying any functionality, the agent must update `FILE-MAP.md` to reflect the new verified state.
10. **Evidence-Based Completion**:
    - Never claim a task is "done" without executing lint/type checks and providing verified evidence.

---

## 🛡️ 2. The 4-Tier Safe Execution Pipeline

```
┌────────────────────────────────────────────────────────────────────────┐
│                   TIER 1: PRE-FLIGHT REPO TRACING                      │
│  • Scan root FILE-MAP.md or trace the directory tree                   │
│  • Map: Entry Point ➔ Route ➔ Controller ➔ Service ➔ DB ➔ External     │
│  • Identify existing components, shared utilities, and contexts       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│               TIER 2: ADDITIVE ARCHITECTURE DESIGN                     │
│  • Design new functionality with ZERO breaking changes                 │
│  • Optional props / backward-compatible schema extensions              │
│  • Select existing UI components, icons, and context hooks to reuse    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  TIER 3: TARGETED IMPLEMENTATION                       │
│  • Write focused, cleanly isolated code                                │
│  • Zero unrelated file alterations                                     │
│  • Strict type safety, clean error toasts, and loading states          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│              TIER 4: VERIFICATION & FILE-MAP SYNC                      │
│  • Run TypeScript compilation / lint / tests                           │
│  • Update root FILE-MAP.md with new routes, models, and dependencies   │
│  • Mark confidence levels: "Verified" vs "Likely" vs "Unknown"         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🗺️ 3. The `FILE-MAP.md` Blueprint & Maintenance Standard

Every repository governed by this framework must have a root-level `FILE-MAP.md`.

### 3.1 Purpose & Role of `FILE-MAP.md`
- Acts as a **verified navigation map** of the repository for developers and autonomous AI agents.
- Eliminates redundant multi-file grep scans and token wastage.
- Answers the fundamental question: **"Where is the verified code for this functionality?"** in under 5 seconds.

### 3.2 Standard Format of `FILE-MAP.md`

```markdown
# Repository Navigation & Functional File Map (FILE-MAP.md)

> **STATUS: VERIFIED LIVING DOCUMENT**  
> This file maps all confirmed subsystems, entry points, data models, APIs, and critical execution flows.

---

## 📊 Repository Profile
- **Repository Type**: [Fullstack Next.js | FastAPI Microservice | Monorepo | Documentation Framework]
- **Primary Languages**: [TypeScript, Python, SQL, etc.]
- **Database Layer**: [MongoDB (Mongoose), PostgreSQL (Prisma), Redis, etc.]
- **State Management**: [Context API, Zustand, TanStack Query, Redux]
- **Styling & UI**: [Tailwind CSS, Framer Motion, Lucide React]

---

## 🧭 Functional Subsystem Maps

### 1. [Feature / Subsystem Name]
- **Description**: [Concise summary of what the feature does]
- **Confidence**: [Verified | Likely | Unknown]
- **Entry Point**: `path/to/entry.tsx` or `path/to/route.ts`
- **Primary Files**:
  - `path/to/PrimaryComponent.tsx`: [Role]
  - `path/to/primaryService.ts`: [Role]
- **Data Layer**:
  - `models/PrimaryModel.ts`: [Database schema]
- **Supporting Files**:
  - `hooks/useFeature.ts`: [Client state hook]
  - `utils/featureHelper.ts`: [Utility]
- **Flow**: `Entry Point ➔ Route ➔ Controller ➔ Service ➔ Database ➔ UI`
- **Dependencies**: [Internal modules or external services]
- **Used By**: [Modules or pages consuming this feature]

---

## 📑 File-to-Function Index

| File / Module Path | Type | Main Responsibility | Important For | Confidence |
| :--- | :--- | :--- | :--- | :--- |
| `app/page.tsx` | Page Entry | Landing page layout and hero | Public Storefront | Verified |
| `context/CartContext.tsx` | State | Cart state, optimistic updates | Checkout & Order | Verified |

---

## 🔄 Critical Business & User Execution Flows

### Flow 1: [Flow Name, e.g., User Checkout & Idempotent Payment]
1. `components/checkout/PaymentModal.tsx` (User clicks Pay)
2. `hooks/useResilientPayment.ts` (Manages lock & retry state)
3. `app/api/payments/process/route.ts` (Acquires Redis lock, executes IBC)
4. `lib/payments/adapters/jazzCashAdapter.ts` (Communicates with bank)
5. `models/PaymentIntent.ts` (Settles ledger and marks order PAID)

---

## ⚠️ Anti-Corruption Rules for `FILE-MAP.md`
1. Never guess: If an entry point or relationship cannot be verified from real imports or routes, label it `"Unknown"`.
2. Keep it synchronized: Whenever a sprint creates new files or deprecates old ones, update this file immediately.
3. No noisy dumps: Exclude build artifacts (`.next/`, `node_modules/`, `dist/`), lockfiles, and raw assets.
```

---

## 📋 4. Developer / Agent Self-Audit Checklist

Before finishing any task, run through this checklist:

- [ ] **Did I read existing code first?** Confirmed by checking existing imports and models.
- [ ] **Are all existing APIs and routes preserved?** Zero broken routes or altered contracts.
- [ ] **Did I avoid installing duplicate packages?** Reused existing project libraries.
- [ ] **Did I avoid modifying unrelated files?** Git diff contains only relevant files.
- [ ] **Is `FILE-MAP.md` updated?** New routes, services, or models are added to `FILE-MAP.md`.
- [ ] **Did build / lint pass cleanly?** Zero syntax or type errors.

