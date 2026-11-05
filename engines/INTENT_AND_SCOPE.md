# Intent and Scope Engine

## Convert requests into observable outcomes
Do not plan from keywords alone. Rewrite the request as a concise outcome statement and list observable acceptance criteria.

For every acceptance criterion, specify:
- User action or system trigger.
- Expected visible result.
- Expected data/API side effect.
- Permission and validation rules.
- Loading, empty, error and cancellation behavior.
- Responsive/accessibility requirements when relevant.
- How the result will be verified.

## Dependency-aware scope classification
Classify each candidate change:

| Class | Meaning | Default action |
|---|---|---|
| Required | Directly requested outcome | Implement |
| Dependency-required | Needed for requested behavior to work safely | Implement and explain |
| Optional improvement | Useful but not required | Recommend separately |
| Unrelated | Does not support the requested outcome | Do not implement |

Inspect broadly enough to discover dependencies; do not treat broad inspection as permission for broad rewrites.

## Scope boundary questions
Before implementation, answer:
1. Which exact routes, screens, controls or workflows change?
2. Which shared components or contracts are affected?
3. What data, permission or external integration changes?
4. What existing behavior must remain unchanged?
5. What is explicitly out of scope?
6. What are the acceptance tests and rollback concerns?

## Existing-project rules
- Preserve established framework, naming, folder layout, styling, state and API patterns.
- Do not migrate architecture solely to match a documentation example.
- Do not replace a working design system with a generic redesign unless requested.
- Do not introduce new dependencies when an existing supported primitive is sufficient.
- Keep unrelated files untouched and explain any unavoidable cross-cutting change.

## Greenfield rules
For a new project, derive architecture from product requirements, scale, team skill, deployment target, data sensitivity, budget and maintenance needs. Present material trade-offs before locking choices.

## Plan format
1. Outcome.
2. Acceptance criteria.
3. Detected project facts.
4. Required/dependency-required work.
5. Explicit exclusions.
6. Files and contracts affected.
7. Phases and dependency order.
8. Verification plan.
9. Risks, migration and rollback.
