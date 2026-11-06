# Mandatory Task Execution Checklist & Verification Gate

> **UNIVERSAL PROTOCOL FOR ALL AI AGENTS & PAIR PROGRAMMERS**  
> Use these checkpoints for every meaningful task; mark genuinely irrelevant checkpoints NOT APPLICABLE with a reason.
> 
> **PREMATURE COMPLETION PROHIBITION**: An agent is strictly forbidden from declaring any task complete, finished, or resolved until Checkpoints 1 through 10 have been executed with concrete terminal evidence. Merely mentioning or planning a test command does NOT qualify as executing it.

---

## Precedence and status rules

Apply [../EXECUTION_CONTRACT.md](../EXECUTION_CONTRACT.md) first. This checklist is architecture-aware: skip checks that are not applicable, do not migrate a project to satisfy a folder convention, and record each skipped item as NOT APPLICABLE with a reason. Do not treat missing test configuration as a pass. Record PASS only with a fresh command/tool result.

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
- [ ] Preserve and follow the detected project design system, state/data layer and interaction patterns.
- [ ] Add animation patterns only when required by the task and product language.
- [ ] Complete all required UI/API/data/permission/error/loading integrations.
- [ ] **NO PARTIAL WORK**: Do not stop after editing 1 or 2 files or leaving screens unstyled.

### 5. Dependency Verification
- [ ] Inspect the actual package manifest and lockfile for dependencies required by the accepted design.
- [ ] Verify compatibility and avoid introducing duplicate libraries or unnecessary dependencies.
- [ ] Run `npm ls` or inspect node modules if import errors occur.

### 6. Build Execution
- [ ] Run the configured project-native production build command, if one exists.
- [ ] Run the configured typecheck command when the project uses a typed language and a checker is available.
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

### 10. Final Verification & Evidence Ledger
- [ ] Map every required acceptance criterion to an actual command, browser check or other relevant evidence.
- [ ] Record PASS, FAIL, NOT CONFIGURED, NOT RUN, BLOCKED or NOT APPLICABLE with a reason.
- [ ] Re-run checks after fixes and confirm they match the current diff.
- [ ] Document remaining risks and unverified items in the final response.

---

## 🚫 Premature Completion Prevention Rules

1. **The "1-File Exit" Violation**: If an agent edits only 1 or 2 files and says *"I have updated the component, you can integrate it"*, this is a critical framework violation. The agent must complete the entire integration, tests, and verification.
2. **The "Unverified Success" Violation**: Claiming *"Tests pass"* without running a terminal command is strictly forbidden.
3. **The "Ignored Build" Violation**: Marking a task complete without executing the configured, relevant build/typecheck commands—or disclosing that they are not configured—is invalid.

