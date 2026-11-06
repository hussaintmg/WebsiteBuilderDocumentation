# Project Intelligence Engine

## Purpose
Build a fact-based model of the target repository before proposing architecture or editing code. This engine prevents an agent from applying a remembered stack template to a project that uses a different architecture.

## Discovery sequence

### 1. Establish the workspace
- Confirm the repository root, active branch, working-tree changes and monorepo/workspace boundaries.
- Inventory files while excluding generated/vendor directories such as node_modules, .git, build output and caches.
- Identify all package manifests, lockfiles, runtime versions, environment examples, deployment files and CI workflows.
- Never overwrite or discard existing user changes.

### 2. Detect the actual stack
Record evidence for:
- Framework and version.
- Language and compiler.
- Package manager and lockfile.
- Frontend entry points and route conventions.
- Backend/API entry points and service boundaries.
- Database, ORM/ODM and migration strategy.
- State management, data fetching and caching.
- Styling system, tokens, component library and icon library.
- Animation/runtime libraries.
- Authentication, sessions, RBAC and tenant boundaries.
- Test runners, build, typecheck, lint and browser tooling.

A dependency in package.json is evidence of installation, not proof that every feature uses it. Trace actual imports and usage before deciding.

### 3. Trace the requested feature
Follow the feature across layers:
1. Route/page entry point.
2. Shared layout and components.
3. State/query hooks or stores.
4. API client and server handler.
5. Service/domain logic.
6. Models/schema and persistence.
7. Permissions, validation and tenant isolation.
8. Tests, fixtures, jobs, notifications and external integrations.

Use repository search and import/reference tracing. Search for existing functionality before creating duplicates.

### 4. Build an evidence-backed architecture map
For each relevant layer record:
- File/path.
- Responsibility.
- Inputs and outputs.
- Dependencies and consumers.
- Data ownership and security boundary.
- Existing tests and observed behavior.
- Confidence: verified, inferred, or unknown.

Do not present inference as fact. If a file could not be read or output was truncated, record that limitation.

### 5. Identify risks before implementation
Check:
- Shared components used by unrelated pages.
- API contract consumers.
- Database migration/backfill implications.
- Auth and authorization checks on both server and client.
- Multi-tenant scoping and data leakage.
- Async race conditions, retries and idempotency.
- Loading, empty, error and offline states.
- Accessibility, keyboard behavior and reduced motion.
- Mobile layout, long content and slow network behavior.

## Required discovery artifact
Create or update a task-scoped architecture note only when the work warrants it. It should contain:
- Detected stack and evidence.
- Relevant route/component/API/data-flow map.
- Existing conventions to preserve.
- Related modules/documentation loaded.
- Unknowns and assumptions.
- Files in the implementation dependency graph.

## Stop conditions
Ask the user only when an unknown materially changes architecture, security, irreversible data operations, cost or visible behavior. Otherwise choose the least disruptive evidence-based default and document it.
