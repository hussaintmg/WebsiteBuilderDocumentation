# Acceptance Criteria and Evidence Ledger

## Task acceptance template

| ID | Requirement | Expected evidence | Status | Evidence reference |
|---|---|---|---|---|
| AC-01 | User-visible outcome | Repro steps or browser capture | NOT RUN | |
| AC-02 | Data/API behavior | Test output or request/response evidence | NOT RUN | |
| AC-03 | Permissions/security | Authorized and unauthorized test results | NOT RUN | |
| AC-04 | Responsive behavior | Tested viewport sizes | NOT RUN | |
| AC-05 | Regression safety | Relevant existing test suite | NOT RUN | |

Remove rows that are genuinely not applicable and explain why. Add task-specific criteria rather than blindly reusing this example.

## Evidence status vocabulary
- PASS: executed and successful.
- FAIL: executed and unsuccessful.
- NOT CONFIGURED: no test or command exists.
- NOT RUN: available but not executed.
- BLOCKED: attempted but environment/tooling prevented execution.
- NOT APPLICABLE: does not apply to the detected stack or task.

## Evidence requirements
Every PASS must identify:
- Exact command or tool.
- Commit/worktree state tested.
- Exit code or observed result.
- Relevant output, test name or browser state.

A green static scan does not prove runtime behavior. A passing unit test does not prove browser layout. A successful build does not prove authorization. Choose evidence that matches the requirement.

## Completion gate
The task is accepted only when:
1. Every required acceptance criterion is PASS.
2. Required dependency criteria are PASS.
3. No unresolved blocker/high-severity review issue remains.
4. Relevant regression checks have run.
5. Unverified checks are disclosed and do not affect a claim of full completion.
6. Final report lists changed files, evidence, limitations and operational steps.

No percentage score can replace this gate.
