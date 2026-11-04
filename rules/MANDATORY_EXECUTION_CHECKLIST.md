# Mandatory Task Execution Checklist & Verification Gate

> **UNIVERSAL PROTOCOL FOR ALL AI AGENTS & PAIR PROGRAMMERS**  
> Every development, retrofit, or modernization task MUST strictly execute and document these 10 distinct checkpoints in order.
> 
> **PREMATURE COMPLETION PROHIBITION**: An agent is strictly forbidden from declaring any task complete, finished, or resolved until Checkpoints 1 through 10 have been executed with concrete terminal evidence. Merely mentioning or planning a test command does NOT qualify as executing it.

---

## 📋 The 10 Mandatory Checkpoints

### 1. Project Analysis
- [ ] Inspect the target workspace file structure, package dependencies, framework versions, and configurations.
- [ ] Identify whether the project is Greenfield (new) or Existing (Retrofit).
- [ ] Audit existing conventions, path aliases (`@/*`), and styling setups (Tailwind, CSS modules).

### 2. Architecture Understanding
- [ ] Trace data flows, existing models, context providers, and API routes.
- [ ] Determine module boundaries and identify downstream dependencies to prevent breaking changes.
- [ ] Verify root-level directory layout (Root `/app` standard vs legacy `src/`).

### 3. Implementation Planning
- [ ] Formulate a detailed, phased implementation plan (`/.project/PLAN.md` or scoped task checklist).
- [ ] Specify exactly which files will be created, modified, or removed.
- [ ] Define the exact testing and verification strategy before writing any code.

### 4. Complete Code Implementation
- [ ] Implement all planned components, hooks, models, and routes.
- [ ] Apply dark glassmorphic aesthetics (`bg-neutral-950`, frosted glass, Framer Motion physics).
- [ ] Enforce Context Law: Zero direct raw `fetch()` or `axios` calls in UI components.
- [ ] Implement task-specific button micro-animations (no generic circular spinners).
- [ ] Implement screen-level Genie Trash Bin for deletions and dynamic responsive tab overflow for tab bars.
- [ ] **NO PARTIAL WORK**: Do not stop after editing 1 or 2 files or leaving screens unstyled.

### 5. Dependency Verification
- [ ] Check `package.json` for required peer dependencies (e.g., `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`).
- [ ] Verify compatibility between installed packages; resolve version conflicts or duplicate libraries (`axios` vs native `fetch`, `moment` vs `date-fns`).
- [ ] Run `npm ls` or inspect node modules if import errors occur.

### 6. Build Execution
- [ ] Run the project build command:
  - Next.js: `npm run build` or `npx next build`
  - TypeScript project: `npx tsc --noEmit`
- [ ] Record the exact exit code and terminal output.
- [ ] Ensure compilation finishes with **Exit Code 0** (Zero syntax errors, zero fatal build breaks).

### 7. Relevant Automated Testing (Scoped & Real Execution)
- [ ] Execute scoped, relevant automated tests targeting the modified subsystem:
  - Unit tests: `npm test` or `npx vitest run <file>` or `node scripts/test-units.mjs`
  - E2E / Integration tests (when applicable): `npx playwright test`
  - Typecheck: `npx tsc --noEmit`
- [ ] **SCOPE-AWARE RULE**: Scope tests to relevant changes and avoid running unnecessary, slow end-to-end suites that delay workflows without adding value.
- [ ] **ZERO FABRICATION RULE**: Never report fabricated test outputs. Every claim of a passing test MUST include actual command invocation and verified stdout/stderr.

### 8. Error Fixing & Defect Remediation
- [ ] If any build, typecheck, or test failure occurs, immediately analyze the root cause.
- [ ] Apply precise code fixes rather than suppressing errors with `@ts-ignore` or `eslint-disable`.
- [ ] Re-run the failing test command to verify the fix.

### 9. Regression Testing
- [ ] Verify that existing, unmodified features continue to operate normally.
- [ ] Check page navigation, auth routes, and core database interactions.
- [ ] Ensure no orphan imports or broken component links were introduced.

### 10. Final Verification & Audit Gate (Score >= 95%)
- [ ] Execute the automated compliance engine:
  ```bash
  node scripts/audit-engine.js .
  ```
  *(Or via global runner: `npx website-builder audit .`)*
- [ ] The audit engine MUST exit with **Exit Code 0 (Compliance Score >= 95%)**.
- [ ] If score is < 95%, review the generated `RETROFIT_TODO.md`, resolve all listed deficiencies, and re-run.
- [ ] Document final verification evidence in the final response to the user.

---

## 🚫 Premature Completion Prevention Rules

1. **The "1-File Exit" Violation**: If an agent edits only 1 or 2 files and says *"I have updated the component, you can integrate it"*, this is a critical framework violation. The agent must complete the entire integration, tests, and verification.
2. **The "Unverified Success" Violation**: Claiming *"Tests pass"* without running a terminal command is strictly forbidden.
3. **The "Ignored Build" Violation**: Marking a task complete without executing `npx tsc --noEmit` or `npm run build` is invalid.
