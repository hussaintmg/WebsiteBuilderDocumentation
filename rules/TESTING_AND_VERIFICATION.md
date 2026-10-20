# Master Testing & Verification Architecture: The Ironclad Quality Engine

> **THE IRONCLAD LAW OF VERIFICATION**:  
> An agent or developer must **NEVER** claim a feature is complete, working, fixed, or passing without providing **concrete, fresh execution evidence** (terminal test output, compiler logs, database mutation confirmations, or browser visual inspection records).  
> **Assertions without evidence are strictly prohibited.** Violating the letter of this rule is violating the spirit of the entire engineering architecture.

---

## 🏛️ 1. Executive Mandate & Universal Verification Lifecycle

### 1.1 Scope of Obligation
Every single file operation within the codebase—whether **creating**, **editing**, or **deleting** a Page, API Route, Utility Function, Database Model, React Context, Custom Hook, Component, or Configuration file—triggers this mandatory verification lifecycle. No change is too small to bypass this protocol.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        UNIVERSAL FILE OPERATION EVENT DETECTED                         │
│                    (Page / API Route / Utility / Model / Context / Component)          │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 1. LINE-BY-LINE ALGORITHMIC AUDIT & DEAD CODE PURGE                                    │
│    - Deterministic purpose for each line; zero arbitrary/dumped code                   │
│    - Check existing utilities & packages; eliminate duplicate functions/variables      │
│    - Audit downstream dependents; ensure zero side-effect breakage                      │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. TIER 1: STATIC COMPILATION, TYPE SAFETY & STRICT BUILD GATE                         │
│    - `npx tsc --noEmit` & `npm run build` (Exit Code: 0, Zero TS Errors)               │
│    - Backend linting & type checks (`ruff check .`, `pyright`, `mypy`)                 │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. TIER 2: ADVERSARIAL "BRAINLESS USER" DESTRUCTION TESTING (CHAOS MONKEY)             │
│    - Fuzzing with wrong types: `null`, `undefined`, NaN, extreme lengths, SQLi/XSS    │
│    - Erratic behavior: frantic multi-clicks, aborted requests, out-of-order flows       │
│    - Assertions: Zero white-screens, clean user-facing error toasts, strict security   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 4. TIER 3: API CONTRACTS, DATABASE MUTATION FIDELITY & REACTIVE UI HANDSHAKE           │
│    - Envelope validation: `{ success: boolean, data, error }`                          │
│    - DB Mutation Check: Confirms ONLY targeted document/field mutated; zero dirty state│
│    - Reactive DOM: Instant UI update on mutation without `window.location.reload()`   │
│    - Performance & Redundancy: Eliminate duplicate calls, premature calls & lag        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 5. TIER 4: SINGLE SOURCE OF TRUTH & CONTEXT LAW                                        │
│    - Zero direct component API calls when a Domain Context exists                      │
│    - Audit context methods; eliminate zombie/neglected state variables                 │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 6. TIER 5: UI COPYWRITING ABSTRACTION & HUMAN PREDICTABILITY STANDARDS                 │
│    - Zero leaked backend jargon (no database pipelines or Axios terms on UI)           │
│    - Human Mental Model Test: Predictable, intuitive control discovery                 │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 7. TIER 6: VISUAL, RESPONSIVE, THEME & SCROLL ANIMATION FIDELITY                       │
│    - Theme tokens check (Light, Dark, Tenant/CMS DB themes; zero rogue hex codes)      │
│    - Font family fidelity; 60 FPS scroll animations; DAM image parallax; mobile checks │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        EVIDENCE RECORDED IN `SPRINTS.md`                               │
│                      Only NOW may task be marked as complete [x]                       │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🚦 2. The 7-Tier Verification Framework

```
┌────────────────────────────────────────────────────────────────────────────┐
│  Tier 7: Visual, Responsive, Theme & Scroll Animation Fidelity             │
├────────────────────────────────────────────────────────────────────────────┤
│  Tier 6: UX Copywriting Abstraction & Human Predictability Standards       │
├────────────────────────────────────────────────────────────────────────────┤
│  Tier 5: Line-by-Line Algorithmic Audit & Dead Code/File Purge             │
├────────────────────────────────────────────────────────────────────────────┤
│  Tier 4: Single Source of Truth & Context Law Verification                 │
├────────────────────────────────────────────────────────────────────────────┤
│  Tier 3: API Contracts, Database Mutation Fidelity & Reactive UI Sync     │
├────────────────────────────────────────────────────────────────────────────┤
│  Tier 2: Adversarial "Brainless User" Destruction Testing (Chaos Monkey)   │
├────────────────────────────────────────────────────────────────────────────┤
│  Tier 1: Static Compilation, Type Safety & Strict Build Gate               │
└────────────────────────────────────────────────────────────────────────────┘
```

---

### 🔍 2.1 Tier 1: Static Compilation, Type Safety & Strict Build Gate

Before any browser testing or pull request creation, static compilation must pass completely.

#### Mandatory Checks:
1. **Frontend TypeScript Compilation**:
   ```bash
   npx tsc --noEmit
   # or
   npm run build
   ```
   - **Requirement**: Exit code `0`. Zero TypeScript diagnostics errors (`TS2304`, `TS2322`, `TS2345`, `TS2769`, etc.).
   - **No `any` Escapes**: Using `any` to silence compiler errors is strictly forbidden. Use proper union types, generics, or type assertions backed by Zod schemas.
2. **Backend Type Checking & Linting**:
   ```bash
   # Python / FastAPI
   ruff check . && pyright
   # or Node.js / Express
   npm run lint
   ```
   - **Requirement**: Zero unresolved imports, zero syntax errors, and zero type mismatch warnings.
3. **Environment & Schema Validation**:
   - Validate that all referenced environment variables are defined in `.env.example` and parsed via type-safe schemas (e.g., Zod `env.mjs`).

---

### 💥 2.2 Tier 2: Adversarial "Brainless User" Destruction Testing (Chaos Monkey Protocol)

> **THE BRAINLESS USER PHILOSOPHY**:  
> In production, users will not follow your expected happy path. They will double-click frantically, press back mid-upload, input emojis where numbers are expected, leave required fields blank, paste 20,000 words into a name field, and tamper with hidden payload parameters.  
> **Your job as a verification engineer is to aggressively try to BREAK, CORRUPT, and CRASH your own functions and APIs before a user ever touches them.**

#### 2.2.1 Destructive Payload & Type Fuzzing Matrix
Every API endpoint and utility function must be subjected to the following adversarial payloads:

| Payload Category | Injection / Fuzz Value | Expected System Reaction | Forbidden Failure Mode |
| :--- | :--- | :--- | :--- |
| **Wrong Types** | Passing `{}` or `[]` where string expected; `true` where number expected | Returns `400 Bad Request` or `422 Unprocessable Entity` with validation detail | Crashing with `TypeError: x.toLowerCase is not a function` (500 Internal Error) |
| **Null & Undefined** | `{ title: null, amount: undefined }` | Gracefully rejected with field-level validation error | `Cannot read property 'x' of undefined` crash |
| **Numeric Edge Cases** | `-100`, `0`, `1e20`, `NaN`, `Infinity`, `0.000000001` | Rejected if quantity/price must be positive; clamped safely if unbounded | Negative balances, database overflow, or `NaN` saved in MongoDB |
| **String Extremes** | Empty string `""`, whitespace only `"   "`, 50,000-character payload | Returns polite toast: *"Title must be between 3 and 100 characters"* | Buffer overflow, UI layout breaking, or database truncation error |
| **Unicode & Special Chars**| Emojis (`🔥🎉🚀`), RTL overrides (`\u202E`), accents, zero-width spaces | Stored and rendered correctly without UTF-8 encoding corruption | Broken character display (`???`), regex infinite loop (ReDoS) |
| **Injection Vectors** | SQL (`' OR '1'='1`), NoSQL (`{ "$gt": "" }`), XSS (`<script>alert(1)</script>`) | Sanitized, parameterized, and treated as inert string literals | Database extraction, unauthorized data bypass, script execution in DOM |
| **Malformed JSON** | Truncated JSON `{"name": "test"`, missing brackets, raw text | Returns `400 Bad Request` with structured error envelope | Server crash or silent hanging request |

#### 2.2.2 State & UI Destruction Attacks
Simulate the impatient, frantic user in browser testing:
1. **The Rapid Multi-Click Attack**:
   - Rapidly click a submit button 5 to 10 times within 500ms.
   - **Verification Requirement**: The button must immediately enter its disabled/loading state on the first click. Debounce or mutex locks must prevent duplicate API calls and duplicate database entries.
2. **The Aborted Request / Navigation Attack**:
   - Initiate a large file upload or long API call, and immediately navigate to another page or press browser Back.
   - **Verification Requirement**: `AbortController` cleanly cancels the fetch. Component unmount does not trigger *"Can't perform a React state update on an unmounted component"* console warnings.
3. **Out-of-Order Execution Attack**:
   - Open two tabs on the same record; edit in Tab A and delete in Tab B; then try to save in Tab A.
   - **Verification Requirement**: System gracefully detects stale version or returns `404 Not Found` with a clear toast: *"This record has been modified or deleted elsewhere"*.
4. **Mandatory Outcome Assertions**:
   - 🛡️ **Zero White-Screens**: The application MUST NEVER show a blank white screen or an unhandled React error boundary crash.
   - 🔔 **Polite Error Toasts**: Any failure must trigger an animated, human-readable error toast (via `ToastContext` / `sonner`) explaining the issue cleanly without technical jargon.
   - 🔒 **Rock-Solid Security Boundaries**: Unauthorized requests or role violations MUST return `403 Forbidden` with a standardized security envelope, completely preventing unauthorized data leakage.

---

### 🔄 2.3 Tier 3: API Contracts, Database Mutation Fidelity & Reactive UI Handshake

When an API responds or state changes, data integrity across the backend and frontend must be mathematically sound.

#### 2.3.1 Standard API Envelope Contract
All API endpoints must respond with the standardized envelope defined in [`rules/BACKEND_CONNECTION_RULES.md`](./BACKEND_CONNECTION_RULES.md):
```typescript
// Success Response
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Please provide a valid program title.",
    "details": [
      { "field": "title", "issue": "Minimum 3 characters required" }
    ]
  }
}
```

#### 2.3.2 Targeted Database Mutation Audit (Zero Dirty State)
When testing an API endpoint that mutates data (`POST`, `PUT`, `PATCH`, `DELETE`):
1. **Targeted Field Isolation**:
   - Verify that the API mutates **ONLY** the designated record and the designated fields.
   - **Check**: Does updating a user's phone number accidentally wipe their permissions array or reset their `createdAt` timestamp?
   - **Check**: Does deleting an order inadvertently delete or detach related customer documents without explicit cascading rules?
2. **Multi-Tenant Isolation Verification**:
   - Inspect the database query filter: Every read and write MUST include `companyId` (or `tenantId`).
   - Confirm that an update query cannot mutate a record belonging to another company under any circumstance:
     ```typescript
     // ✅ SECURE: Strict tenant isolation in mutation
     await Program.findOneAndUpdate(
       { _id: programId, companyId: session.companyId },
       { $set: updateData },
       { new: true }
     );
     ```

#### 2.3.3 Reactive UI Update Handshake (No Reload Rule)
> 🚫 **STRICTLY FORBIDDEN**: Using `window.location.reload()` or forcing a hard page refresh to reflect updated data.

1. **Live State Synchronization**:
   - When an API call succeeds (e.g. creating, editing, or deleting a record), the existing React Context state array must be updated **in-place** immediately.
   - The UI table, cards, or metrics must reflect the updated data reactively in real time.
2. **Animation Synchronization**:
   - If an animated button was triggered, the loading animation must play cleanly until the API returns; if the API finishes faster than the animation cycle, the animation must complete smoothly before displaying the success state and triggering the toast.

#### 2.3.4 Redundant Call & Performance Audit
1. **Eliminate Duplicate API Calls**:
   - Open Browser DevTools Network tab.
   - On page load, verify that each endpoint is called **exactly once**.
   - If an endpoint is called 2, 3, or more times, investigate and eliminate root causes:
     - Missing or unstable dependency arrays in `useEffect`.
     - Multiple child components making duplicate fetches instead of consuming a parent Context.
     - React StrictMode double-mounting in dev (ensure cleanup logic or cache deduplication via SWR/TanStack Query).
2. **Prevent Premature Calls**:
   - Verify that endpoints requiring user action (e.g. search, filter, export) are NOT called on initial page mount before the user interacts.
3. **Latency Benchmark**:
   - Local development API responses must resolve in `< 150ms`.
   - Any endpoint taking `> 500ms` locally must be profiled for unindexed database queries, N+1 query waterfalls, or missing projections.

---

### 🌐 2.4 Tier 4: Single Source of Truth & Context Law

Per [`rules/MODELS_AND_CONTEXTS_ARCHITECTURE.md`](../rules/MODELS_AND_CONTEXTS_ARCHITECTURE.md), React Contexts are the sole guardians of entity state and API interactions.

#### 2.4.1 The Context Law: Zero Direct Component API Calls
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ❌ FORBIDDEN ANTI-PATTERN                                                  │
│ Inside /app/programs/page.tsx:                                              │
│ const res = await fetch('/api/programs');                                   │
│ const data = await res.json();                                              │
│ // Direct fetch bypasses global cache, causes state desync and duplicate code│
└─────────────────────────────────────────────────────────────────────────────┘
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ ✅ THE CONTEXT LAW                                                          │
│ Inside /app/programs/page.tsx:                                              │
│ const { programs, isLoading, createProgram } = useProgram();                │
│ // Consumes centralized, reactive state with single source of truth         │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 2.4.2 Context Integrity Verification Checklist:
- [ ] **Context Function Availability**: Before creating a direct API call or local state, verify if a Context already exists for this domain (`ProgramContext`, `OrderContext`, `UserContext`, `RoleContext`, `CustomerContext`, `CmsPageContext`, etc.).
- [ ] **Zero Zombie Context Methods**: Audit the Context file. Are there functions defined in the Context interface (e.g. `archiveProgram()`, `exportOrders()`) that are never imported or called anywhere in the app? Either wire them up to their UI triggers or safely prune them.
- [ ] **State Reuse Verification**: If a Context already holds `userList` or `companySettings`, verify that pages do NOT re-fetch this data independently.
- [ ] **Optimistic vs Server State Alignment**: Ensure mutations update the Context's internal array so that sibling components and downstream selectors receive the fresh state instantly.

---

### 🧹 2.5 Tier 5: Line-by-Line Algorithmic Audit, Dead Code Elimination & Side-Effect Tracing

> **THE STEP-BY-STEP ALGORITHMIC CONSTRUCTION RULE**:  
> Code must never be dumped haphazardly ("and shand nahi dalna"). Every single line written must be a deliberate, logical step in an explicit algorithm with known inputs and deterministic outputs.

#### 2.5.1 The Line-by-Line Audit Protocol
Before finalizing any code modification:
1. **Line-by-Line Purpose Justification**:
   - Inspect every line added or modified.
   - Ask: *"What is the exact purpose of this line? What is its input? What is its guaranteed output? Can this line cause an unhandled exception if input is unexpected?"*
2. **Duplicate Logic & Variable Search**:
   - Before declaring a new utility function (e.g., date formatter, currency parser, slugifier, regex validator), search the entire workspace:
     ```bash
     # Check if a similar helper already exists
     git grep -i "formatDate"
     git grep -i "slugify"
     ```
   - If a function already exists in `utils/` or `lib/`, **import and reuse it**. Never create duplicate variations of the same logic.
3. **Existing Package Leverage Check**:
   - Before writing 50 lines of custom date arithmetic or query string parsing, check `package.json`.
   - If standard, audited packages exist in the project (e.g. `date-fns`, `clsx`, `tailwind-merge`, `lucide-react`, `zod`), utilize them. Never reinvent the wheel with custom, error-prone boilerplate.
4. **Dead Code & Unused Import Elimination**:
   - Run linter checks to detect unused variables, dead functions, and dangling imports:
     ```bash
     npm run lint
     ```
   - Search for unused files: If a component, utility, or route file is not imported anywhere in the project and is not an active Next.js page route, investigate why it exists and safely prune it.
5. **Downstream Dependency & Architectural Impact Analysis**:
   - Before modifying or deleting any function signature, model property, or component prop, perform a repository-wide grep for its identifier:
     ```bash
     git grep -n "oldFunctionName"
     ```
   - Trace all calling sites across all files. Update all callers in the same changeset to ensure zero downstream regressions or compilation failures.

---

### ✍️ 2.6 Tier 6: UI Copywriting Abstraction & Human Predictability Standards

UI microcopy is the primary contract between the software and the human user. Technical jargon must never leak through this layer.

#### 2.6.1 The Non-Technical Copywriting Law
> 🚫 **STRICTLY FORBIDDEN**: Exposing internal database queries, backend architecture terms, framework pipelines, or developer workflows on user-facing UI elements.

| Leaked Technical Jargon (❌ Strictly Prohibited) | Clean Human-Centered UX Copy (✅ Mandatory) |
| :--- | :--- |
| `"Trigger MongoDB Aggregation Pipeline"` | `"Generate Analytics Report"` |
| `"Executing Axios POST to /api/orders"` | `"Saving Order..."` |
| `"Execute FastAPI Background Worker"` | `"Processing in Background"` |
| `"Mutate ProgramContext Array State"` | `"Update Program"` |
| `"Insert Document into Collection"` | `"Add New Record"` |
| `"Bypass Edge Proxy Middleware"` | `"Administrative Access"` |
| `"Error: MongoError E11000 duplicate key"` | `"A program with this code already exists. Please choose another."` |

#### 2.6.2 The Human Predictability & Discovery Test
Every button, filter, and action must pass the **Predictable Mental Model Test**:
1. **Can a first-time human user predict where this option lives?**
   - Destructive actions (e.g., Delete, Archive) must reside within danger zones, require explicit confirmation, and use recognizable danger iconography.
   - Primary actions (e.g., Create, Save, Export) must be anchored in predictable header or footer action bars.
   - Settings must be categorized logically: Personal Settings (`/settings`), Business Configuration (`/settings/system`), and CMS Content (`/cms`).
2. **Predictable Feedback**:
   - Every user click must provide immediate sensory feedback: button state change, loading spinner/task animation, and an unambiguous success or error toast.
   - A user must never be left wondering: *"Did my click work, or is the page frozen?"*

---

### 🎨 2.7 Tier 7: Visual, Responsive, Theme & Scroll Animation Fidelity

Visual design is the first impression and the benchmark of software excellence.

#### 2.7.1 Theme Token Adherence (Zero Rogue Colors)
1. **Strict Design Token Enforcement**:
   - Every color applied in Tailwind classes must trace back to the curated design tokens defined in [`design-system/DESIGN_ARCHITECTURE.md`](../design-system/DESIGN_ARCHITECTURE.md) and [`design-system/FRONTEND_DESIGN_RULES.md`](../design-system/FRONTEND_DESIGN_RULES.md).
   - **Rogue Hex Codes Forbidden**: Hardcoded arbitrary colors (e.g. `bg-[#ff0033]`, `text-[#123456]`) are strictly forbidden unless dynamically loaded from the tenant's CMS database theme record.
2. **Dual-Theme & CMS Theme Verification**:
   - Test every page in both **Light Mode** and **Dark Mode**.
   - Verify that text contrast satisfies WCAG AA standards (minimum `4.5:1` contrast ratio).
   - Verify that tenant-customized brand colors saved in `WebsiteDetailsContext` or `CmsWebsiteDetails` apply seamlessly across buttons, badges, and accents.

#### 2.7.2 Typography & Font Family Verification
- Verify that configured Google Fonts (e.g. `Outfit`, `Inter`, `Plus Jakarta Sans`) load without layout shifts (CLS).
- Headings (`h1`, `h2`, `h3`) must use designated display font weights; body text must use crisp, legible weights.

#### 2.7.3 60 FPS Micro-Animations & Scroll Parallax Audit
1. **Fluid Motion Standards**:
   - Button hover animations (per [`design-system/MASTER_HOVER_ANIMATION_SYSTEM.md`](../design-system/MASTER_HOVER_ANIMATION_SYSTEM.md)) must execute with hardware-accelerated transforms (`transform`, `opacity`) without causing CPU layout recalculations or dropped frames.
   - Row deletion fabric-fold and dustbin animations (per [`design-system/ROW_CARD_DELETE_DUSTBIN_ANIMATION.md`](../design-system/ROW_CARD_DELETE_DUSTBIN_ANIMATION.md)) must trigger exactly once, run smoothly, and collapse surrounding rows without stutter.
2. **Scroll-Driven Animation Verification**:
   - CMS section scroll animations and DAM image parallax effects must execute at 60 FPS.
   - **Scroll API Storm Prevention**: Scroll listeners must be passive and debounced; scrolling down a page must NEVER trigger unthrottled API calls or re-renders.

#### 2.7.4 Multi-Viewport Mobile & Responsive Audit
Every page must be verified across three distinct viewport dimensions:
1. **Desktop Viewport (`1440x900`)**: Full layout, resizable sidebar, multi-column data tables.
2. **Tablet Viewport (`768x1024`)**: Adaptive grid layouts, collapsible toolbars.
3. **Mobile Viewport (`390x844` - iPhone standard)**:
   - Zero horizontal scrollbar or content clipping.
   - Tables automatically morph into mobile card stacks per [`modules/DATA_TABLE_AND_CARDS_SYSTEM.md`](../modules/DATA_TABLE_AND_CARDS_SYSTEM.md).
   - Public pages render the fixed bottom navigation bar; dashboard pages render the floating bottom glass pill (`Menu`) with Dual Close Controls per [`modules/MOBILE_NAVIGATION_AND_LAYOUT.md`](../modules/MOBILE_NAVIGATION_AND_LAYOUT.md).
   - Touch targets must be at least `44x44px` with adequate padding.

---

## 🛠️ 3. Concrete Verification & Adversarial Test Suites

### 3.1 Automated Adversarial API & Chaos Fuzzing Suite
Below is the standard TypeScript test suite using Jest / Vitest that agents and developers can execute against any API endpoint:

```typescript
// tests/adversarial/apiChaosFuzzer.test.ts
import { describe, it, expect } from 'vitest';

interface ChaosTestCase {
  name: string;
  payload: any;
  expectedStatus: number;
  expectedErrorCode?: string;
}

const CHAOS_PAYLOADS: ChaosTestCase[] = [
  {
    name: 'Null payload object',
    payload: null,
    expectedStatus: 400,
    expectedErrorCode: 'INVALID_PAYLOAD',
  },
  {
    name: 'Array instead of expected object',
    payload: ['invalid', 'array'],
    expectedStatus: 422,
    expectedErrorCode: 'VALIDATION_FAILED',
  },
  {
    name: 'SQL Injection in text field',
    payload: { title: "'; DROP TABLE programs; --", amount: 100 },
    expectedStatus: 201, // Stored safely as inert literal string without executing
  },
  {
    name: 'NoSQL Operator Injection',
    payload: { title: { $gt: '' }, amount: 100 },
    expectedStatus: 422,
    expectedErrorCode: 'VALIDATION_FAILED',
  },
  {
    name: 'Extreme string length (50k characters)',
    payload: { title: 'A'.repeat(50000), amount: 100 },
    expectedStatus: 422,
    expectedErrorCode: 'MAX_LENGTH_EXCEEDED',
  },
  {
    name: 'Negative numeric amount',
    payload: { title: 'Valid Program', amount: -500 },
    expectedStatus: 422,
    expectedErrorCode: 'POSITIVE_NUMBER_REQUIRED',
  },
  {
    name: 'NaN and Infinity values',
    payload: { title: 'Valid Program', amount: NaN },
    expectedStatus: 422,
    expectedErrorCode: 'INVALID_NUMBER',
  },
  {
    name: 'Raw HTML & Script Tag XSS payload',
    payload: { title: '<script>alert("xss")</script>', amount: 100 },
    expectedStatus: 201, // Sanitized or escaped on output
  },
];

describe('Adversarial Chaos Monkey API Verification', () => {
  CHAOS_PAYLOADS.forEach(({ name, payload, expectedStatus, expectedErrorCode }) => {
    it(`Adversarial Test: ${name}`, async () => {
      const response = await fetch('http://localhost:3000/api/programs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer MOCK_TEST_TOKEN',
        },
        body: JSON.stringify(payload),
      });

      // Assert status code
      expect([expectedStatus, 400, 422]).toContain(response.status);

      const json = await response.json();
      // Assert standard envelope exists
      expect(json).toHaveProperty('success');
      
      if (!json.success) {
        expect(json).toHaveProperty('error');
        expect(json.error).toHaveProperty('message');
        // Ensure NO raw server stack trace leaked to client
        expect(json.error).not.toHaveProperty('stack');
      }
    });
  });
});
```

---

### 3.2 Live Database Mutation & Isolation Verification Script
```typescript
// tests/database/mutationIsolation.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import mongoose from 'mongoose';
import { Program } from '@/models/Program';

describe('Database Mutation & Tenant Isolation Verification', () => {
  const companyA = new mongoose.Types.ObjectId().toString();
  const companyB = new mongoose.Types.ObjectId().toString();
  let programAId: string;

  beforeEach(async () => {
    // Seed initial test records
    const progA = await Program.create({
      title: 'Company A Original Program',
      code: 'PROG-A-01',
      companyId: companyA,
      amount: 500,
      status: 'active',
    });
    programAId = progA._id.toString();

    await Program.create({
      title: 'Company B Protected Program',
      code: 'PROG-B-01',
      companyId: companyB,
      amount: 1000,
      status: 'active',
    });
  });

  afterEach(async () => {
    await Program.deleteMany({ companyId: { $in: [companyA, companyB] } });
  });

  it('Mutates ONLY targeted fields and preserves all other document attributes', async () => {
    const updated = await Program.findOneAndUpdate(
      { _id: programAId, companyId: companyA },
      { $set: { amount: 750 } },
      { new: true }
    );

    expect(updated).not.toBeNull();
    expect(updated?.amount).toBe(750);
    // Verify non-targeted fields remained intact
    expect(updated?.title).toBe('Company A Original Program');
    expect(updated?.code).toBe('PROG-A-01');
    expect(updated?.status).toBe('active');
  });

  it('Strictly prevents cross-tenant mutation attacks', async () => {
    // Attempt to update Company A record using Company B credentials
    const unauthorizedUpdate = await Program.findOneAndUpdate(
      { _id: programAId, companyId: companyB }, // Malicious tenant mismatch
      { $set: { amount: 99999 } },
      { new: true }
    );

    // Must return null; record must remain untouched in database
    expect(unauthorizedUpdate).toBeNull();

    const untouched = await Program.findById(programAId);
    expect(untouched?.amount).toBe(500); // Original value preserved
  });
});
```

---

## 📋 4. Step-by-Step Verification Matrix for File Operations

Whenever an agent or developer operates on a file, follow this exact matrix:

### 4.1 When Creating a New File
1. **Check for Existing Modules / Packages**: Verify that an existing utility or library does not already perform this task.
2. **Context Alignment**: If creating a new page or domain feature, ensure it consumes its domain React Context (`models/` -> `context/`).
3. **Step-by-Step Algorithmic Code Writing**: Write code line-by-line with explicit purpose.
4. **Compile Check**: Run `npx tsc --noEmit` to confirm zero type errors.
5. **Adversarial Chaos Testing**: Fuzz the new file's exports with invalid types, nulls, and edge cases.
6. **Responsive & Theme Test**: Verify appearance across light/dark themes and mobile/desktop viewports.
7. **Document in Sprints**: Record test commands and outputs in `SPRINTS.md`.

### 4.2 When Editing an Existing File
1. **Downstream Dependent Search**: Run `git grep "modifiedExportName"` to identify every file importing this file.
2. **Line-by-Line Review**: Ensure edits do not introduce redundant variables or duplicate code blocks.
3. **Run Regression Tests**: Run existing test suites to confirm no existing functionality broke.
4. **Adversarial Edge Case Test**: Test newly added parameters or branches with invalid types and nulls.
5. **Verify Single Source of Truth**: Confirm that state updates properly propagate to Context and reactive UI.
6. **Compile Check**: Run `npm run build` with exit code `0`.

### 4.3 When Deleting a File
1. **Complete Codebase Grep**:
   ```bash
   git grep -n "deletedFileName"
   git grep -n "deletedExportName"
   ```
2. **Clean All Imports**: Remove or refactor every import statement referencing the deleted file across all files.
3. **Clean Route Registries**: Remove route from Next.js navigation menus, sidebar configs, and middleware route matchers.
4. **Compile Check**: Run `npx tsc --noEmit` and `npm run build` to prove zero dangling references or build breaks.

---

## 📝 5. Standardized Verification Evidence Log Template

Whenever marking a task as `[x]` in `SPRINTS.md` or opening a pull request, paste and complete this evidence block:

```markdown
- [x] Task Name: [e.g. Implement Granular Role Permission Matrix Studio]
  - **Tier 1 (Static Compilation)**:
    - Command: `npx tsc --noEmit` -> Passed with 0 errors (Exit code: 0).
    - Command: `npm run build` -> Clean production build completed.
  - **Tier 2 (Adversarial "Brainless User" Testing)**:
    - Injected null and malformed payloads into `POST /api/roles`: Gracefully rejected with `422 Unprocessable Entity` and user-friendly toast: *"Role name is required"*.
    - Tested rapid 10x multi-click on "Save Permissions" button: Debounced successfully; exactly 1 API call dispatched.
    - Zero white-screens or unhandled React errors observed.
  - **Tier 3 (API Contracts & DB Mutation Fidelity)**:
    - Verified response envelope `{ success: true, data: { ... } }`.
    - Confirmed MongoDB collection `roles` mutated only `permissions` field on targeted role; all other tenant roles untouched.
    - UI table updated reactively in real time without page reload.
    - Verified network tab: exactly 1 fetch executed on load, latency: 48ms.
  - **Tier 4 (Single Source of Truth & Context Law)**:
    - Verified `RoleContext.tsx` consumed via `useRole()`; zero direct component `fetch()` calls.
    - Zero zombie context methods.
  - **Tier 5 (Line-by-Line Audit & Dead Code Purge)**:
    - Code reviewed step-by-step; zero duplicate helper functions.
    - Reused existing `clsx` and `lucide-react` libraries; zero dead imports.
    - Checked downstream dependents of `Role`: all 4 referencing files updated cleanly.
  - **Tier 6 (UI Copywriting & UX Predictability)**:
    - Zero technical terms on UI; buttons labeled *"Save Role"*, *"Delete Role"*, *"Manage Permissions"*.
    - Human mental model test passed: Permissions studio intuitively located in Settings > Roles.
  - **Tier 7 (Visual, Responsive, Theme & Animations)**:
    - Tested in Light Mode and Dark Mode: zero rogue hex codes, WCAG contrast verified.
    - Mobile Viewport (`390x844`): Cards rendered smoothly, zero horizontal scroll, touch targets >= 44px.
    - Button animations and dustbin delete animated at 60 FPS without jank.
```
