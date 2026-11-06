# Existing Project Retrofit and Modernization Engine

> This is the canonical workflow for existing-project changes. Read [EXECUTION_CONTRACT.md](../EXECUTION_CONTRACT.md) first. Older stack-specific recipes in this repository are optional patterns and must not override the target project's actual architecture or the user's accepted scope.

## Purpose
Prevent shallow cosmetic edits while also preventing unrelated full-site rewrites. The agent must understand the connected system, implement the requested outcome end-to-end, and prove it with relevant evidence.

## Stage 0 — Baseline and preservation
1. Confirm repository root, active branch and working-tree status.
2. Record uncommitted user changes and do not overwrite them.
3. Run the relevant existing tests/build before editing when practical; record pre-existing failures.
4. Identify generated files, migrations and deployment-sensitive configuration.

## Stage 1 — Project intelligence
Use [Project Intelligence](../engines/PROJECT_INTELLIGENCE.md):
- Detect actual framework, language, package manager, folder conventions and dependencies.
- Map routes, shared components, state/data layer, APIs, models, auth/RBAC and integrations.
- Trace the requested behavior through every affected layer.
- Search for existing implementations and downstream consumers.
- Record unknowns rather than guessing.

## Stage 2 — Outcome and scope
Use [Intent and Scope](../engines/INTENT_AND_SCOPE.md):
- Convert the request into observable acceptance criteria.
- Classify work as required, dependency-required, optional or unrelated.
- Inspect broadly, but implement only the requested outcome and necessary dependencies.
- Record unchanged behavior and explicit exclusions.
- Ask only when a material architectural, security, cost or irreversible-data decision is unknown.

## Stage 3 — Dependency-aware plan
Create a task plan containing:
- User outcome and acceptance criteria.
- Affected routes, components, API contracts, models and permissions.
- Files to add/change and why.
- Data migration/backfill and rollback steps, if needed.
- Loading, empty, error, success, permission and cancellation states.
- Regression surfaces and exact verification commands.

## Stage 4 — Complete scoped implementation
Implement a coherent vertical slice and connect all required layers:
1. UI and responsive behavior.
2. State ownership, queries and mutations.
3. Server/API validation and error contracts.
4. Persistence and data consistency.
5. Authentication, authorization and tenant isolation.
6. Notifications, jobs and external integrations, if in scope.
7. Loading, empty, error, success and offline behavior.

Preserve existing libraries and design tokens. Do not install a generic animation stack, impose glassmorphism, migrate folder structures, or redesign unrelated pages simply because an example document recommends it.

## Stage 5 — Independent review
Use [Independent Reviewer](../engines/INDEPENDENT_REVIEWER.md):
- Inspect the full diff against the original request.
- Check scope creep, duplicate logic, secrets, permissions, tenant boundaries, async races and API contract regressions.
- Verify shared components still serve unrelated consumers.
- Fix blocker/high-severity issues before acceptance.

## Stage 6 — Evidence-based verification
Use [Testing & Verification](../rules/TESTING_AND_VERIFICATION.md) and [Acceptance Criteria](../quality/ACCEPTANCE_CRITERIA.md):
- Run the actual configured tests relevant to the changed behavior.
- Run configured build, typecheck and lint commands when applicable.
- Run integration/E2E tests for affected critical flows when available.
- Use real-browser inspection for changed UI, responsive layouts and animations when browser tooling exists.
- Re-run failed checks after fixes.
- Record PASS, FAIL, NOT CONFIGURED, NOT RUN, BLOCKED or NOT APPLICABLE with evidence.

A missing test runner is not a pass. A JavaScript project without TypeScript is not a typecheck pass. A static scan cannot certify runtime or visual behavior. There is no universal 95% score gate.

## Optional pattern catalogue
Load only when the project and request justify it:
- Tailwind, glass effects and typography: design-system documents.
- Genie trash/deletion choreography: APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md.
- Task-specific button animations: BUTTON_IN_FLIGHT_TASK_ANIMATIONS_SPECIFICATION.md.
- Responsive tab overflow: RESPONSIVE_MOBILE_TABS_SYSTEM.md.
- Multi-tenancy, RBAC, payments, storage, CMS, chat and AI: their corresponding modules.

These are optional implementation patterns, not retrofit obligations for every project.

## Completion report
List the delivered outcomes, files changed, important decisions, exact verification commands/results, pre-existing failures, unverified checks, known risks and deployment/migration steps. Do not claim full completion for any criterion without evidence.
