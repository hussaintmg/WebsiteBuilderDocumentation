# Execution Contract

This document defines the non-negotiable runtime behavior of WebsiteBuilderDocumentation when used by a coding agent. It supersedes conflicting legacy examples and generic stack assumptions.

## 1. Repository reconnaissance
- Establish repository root, git status, uncommitted changes and workspace boundaries.
- Read package manifests, lockfiles, runtime/configuration files, source entry points, routes, shared components, styles/tokens, models, API contracts, auth/authorization, tests and CI.
- Build a concise architecture map from observed evidence.
- Search for existing implementations before creating new abstractions.
- For large projects, inventory all files and inspect all files in the affected dependency graph. Explicitly disclose files not inspected.

## 2. Outcome and scope
For every request, define:
- User-visible outcome.
- Functional behavior and edge cases.
- Affected routes/components/API/data/permissions.
- Required and dependency-required changes.
- Out-of-scope areas.
- Acceptance tests and rollback concerns.

Broad inspection does not authorize broad unrelated modification. Keep the existing design language unless a redesign is requested.

## 3. Architecture selection
The repository is the source of truth. Do not force:
- Next.js or a root /app layout,
- MongoDB/Mongoose or any database,
- Tailwind or plain CSS,
- React Context or any state library,
- Framer Motion/GSAP,
- Lucide or any icon library,
- glassmorphism, dark mode, floating labels, sidebars or other fixed UI patterns.

Use the project's established stack and conventions. For greenfield work, select a stack only after requirements and constraints are understood.

## 4. Phased execution
1. Baseline: git status, current test/build health, relevant behavior.
2. Plan: dependency graph, files, contracts, risks and acceptance criteria.
3. Implement: smallest coherent vertical slice; preserve interfaces.
4. Integrate: connect UI, API, persistence, permissions and state.
5. Review: inspect diff for scope creep, secrets, unsafe operations and regressions.
6. Verify: execute relevant tests, build, typecheck, lint and browser checks.
7. Report: evidence, blockers, limitations and deployment/migration steps.

Never overwrite uncommitted user changes. Use migrations for persisted data changes and define rollback where practical.

## 5. Motion acceptance
A motion spec must describe semantic stages rather than relying on a vague "smooth animation" instruction. For each stage record:
- Trigger and initial state.
- Visual object(s) and coordinate/origin relationship.
- Intermediate stages and timing.
- Easing/physics and overlap.
- Final state and data/layout synchronization.
- Cancellation, rapid repeated input and failure behavior.
- prefers-reduced-motion behavior.

Browser verification should inspect the actual rendered animation, not only source code. Check mobile viewport, overflow/clipping, z-index/portal behavior, focus, keyboard interaction and reduced motion. If browser access is unavailable, state NOT VERIFIED.

## 6. Verification status vocabulary
- PASS: command/tool executed and returned successful evidence.
- FAIL: command/tool executed and returned a failure.
- NOT CONFIGURED: project has no corresponding command or test harness.
- NOT RUN: command exists but was not executed.
- BLOCKED: execution was attempted but environment/tooling prevented it.
- NOT APPLICABLE: check does not apply to this project.

Missing scripts, missing TypeScript, or test files without execution are never PASS. Do not use arbitrary compliance percentages as a completion threshold.

## 7. Completion report
Include requested outcomes, files changed, decisions, exact verification commands/status, pre-existing failures, unverified items, known risks and next operational steps.
