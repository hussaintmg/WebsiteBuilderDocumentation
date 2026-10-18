# Testing & Verification Rules: Evidence Before Completion

> **IRONCLAD RULE**: An agent must NEVER claim a feature is complete, working, or fixed without providing concrete execution evidence (terminal test output, compiler logs, or browser verification). Assertions without evidence are strictly prohibited.

---

## 🚦 The 4-Tier Verification Hierarchy

Every sprint and feature must pass through all 4 verification tiers before being marked done in `SPRINTS.md`:

```
┌────────────────────────────────────────────────────────┐
│  Tier 4: Visual & Responsive UI/UX Verification       │
├────────────────────────────────────────────────────────┤
│  Tier 3: RBAC Boundary & Security Penetration Testing  │
├────────────────────────────────────────────────────────┤
│  Tier 2: Backend API Contracts & Integration Tests     │
├────────────────────────────────────────────────────────┤
│  Tier 1: Type Checking, Compilation & Linter Pass      │
└────────────────────────────────────────────────────────┘
```

---

## 🔍 Tier 1: Compilation & Static Verification
Before committing any code or testing features in browser:
1. **TypeScript / Type Check**:
   ```bash
   npm run build  # or npx tsc --noEmit
   ```
   *Requirement*: Zero TypeScript errors (`TS2304`, `TS2322`, etc.).
2. **Backend Type Checking & Linting**:
   ```bash
   ruff check .   # or pyright / flake8
   ```
   *Requirement*: Zero unresolved import errors or syntax bugs.

---

## 🧪 Tier 2: API Contract & Database Testing
Every backend endpoint must be verified against positive and negative cases:
1. **Happy Path Test**: Confirm `200 OK` or `201 Created` with valid payload envelope `{ success: true, data: ... }`.
2. **Validation Error Test**: Send malformed JSON or missing fields and confirm `422 Unprocessable Entity` or `400 Bad Request`.
3. **Database Mutation Verification**: Confirm changes actually persist to PostgreSQL / SQLite and return the updated entity.

---

## 🛡️ Tier 3: RBAC Boundary & Action-Level Testing
Security rules must be explicitly tested against unauthorized access:
1. **Staff Role Gate Test**:
   - Make a request as `Staff` to `DELETE /api/orders/ord_123`.
   - **Mandatory Outcome**: Backend returns `403 Forbidden` with `{ code: "FORBIDDEN_ACTION" }`.
2. **UI Button Absence Test**:
   - Inspect the DOM as `Staff`: Confirm that the `#delete-order-btn` element is NOT rendered in the HTML.
3. **Owner Safeguard Banner Privacy Test**:
   - Fetch billing status as `Staff` or anonymous user: Confirm that `OwnerPaymentBanner` is completely absent from the DOM.

---

## 🖥️ Tier 4: Visual, Responsive & Browser Testing
1. **Mobile & Desktop Viewport Testing**:
   - Desktop: `1440x900`
   - Mobile: `390x844` (iPhone viewport)
   - Verify: No horizontal page overflow, navigation collapses to mobile drawer/sheet, touch targets are at least `44x44px`.
2. **Console Error Audit**:
   - Check browser developer tools / console logs.
   - Verify: Zero unhandled promise rejections, zero React key warnings, zero 404 missing asset errors.
3. **Interactive Flow Test**:
   - Test full interactive flow (e.g. In Order Slide Review: click "Start Processing", navigate between orders with `ArrowRight`, update order status, click save, verify toast notification appears).

---

## 📝 Evidence Log Template in `SPRINTS.md`

Whenever marking a task as `[x]`, record the evidence directly in the task notes:

```markdown
- [x] Implement Order Slide Carousel Review Mode
  - *Evidence*: `npm run build` passed with zero errors. Tested slide navigation via hotkey `ArrowRight` on 12 mock orders. Tested status update payload via `PATCH /api/orders/ord_123/status` (200 OK verified).
```
