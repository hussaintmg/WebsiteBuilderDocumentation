# Website Builder Engine — Tier 0 Core Directives & Laws

> **MANDATORY PREREQUISITE FOR ALL AI AGENTS (Claude Code, Gemini, Cursor, Copilot)**  
> Read this document first before writing code. This lightweight specification establishes the non-negotiable architectural laws and engineering standards of Website Builder Engine.

---

## Precedence: Architecture-Aware Execution Contract

Read [../../EXECUTION_CONTRACT.md](../EXECUTION_CONTRACT.md) before applying the laws below. That contract supersedes legacy universal stack assumptions. The laws below are patterns for projects where they are applicable, not permission to force a stack or redesign unrelated areas.

- Detect the project's real framework, architecture, package manager, design system and conventions first.
- Root /app, MongoDB, Tailwind, React Context, Framer Motion and glassmorphism are conditional, not universal.
- Missing tests/build/typecheck are NOT CONFIGURED or NOT VERIFIED, never a pass.
- Inspect widely; change only requested outcomes and necessary dependencies.

## 1. The 10 Ironclad Engine Laws

### Law 1: Rule Zero (Plan First, Code Second)
Never start writing production code until a structured implementation plan (`/.project/PLAN.md` or task plan) is created and aligned with the user.

### Law 2: Preserve the Framework-Native Project Structure
- For existing projects, preserve the actual supported root/`src/` layout and established folder conventions.
- For greenfield projects, choose the framework's supported structure deliberately; Next.js may use root `app/` or `src/app/`.
- Add `components`, `context`, `models`, `hooks`, `lib`, `public` or `styles` only when the selected architecture benefits from them. Do not migrate folders merely to satisfy this skill.

### Law 3: Respect the Existing Design System and Motion Language
- Preserve the project's established visual language and accessibility conventions.
- Glassmorphism, dark mode, Framer Motion, GSAP and spring effects are optional patterns, not universal requirements.
- Use motion only when it improves the requested interaction; honor reduced-motion preferences.

### Law 4: State Ownership and Data Boundaries
Keep data access in the project's established service/state layer. React Context is one option, not a universal requirement. Avoid duplicated fetching and inconsistent sources of truth.

### Law 5: Secure, Accessible Authentication (When Auth Is in Scope)
- Never add hidden backdoor access or expose real credentials. Demo access, if intentionally provided, must be isolated, clearly labeled and safe for the environment.
- Use clear form defaults and accessible labels; empty strings are a sensible default for credential fields.
- Provide recovery and cross-navigation links appropriate to the product's actual authentication flows.

### Law 6: Safe Destructive Operations
Use confirmation, authorization, idempotency and clear failure handling for destructive actions. A screen-level Genie trash animation is an optional visual pattern only when requested or consistent with the product.

### Law 7: Honest Action Feedback and Purposeful Motion
- Every asynchronous action must communicate pending, success and failure states clearly.
- Use task-specific in-flight motion when it improves clarity and fits the product. A concise spinner, progress indicator or disabled pending state is valid when appropriate; never add decorative motion that harms accessibility or performance.
- When a task-specific animation is selected, examples include:
  - **Delete**: In-button trash bin loop (bin glides in, lid pops open, document drops in, lid snaps, bin departs left; repeats until API settles).
  - **Order / Dispatch**: Delivery truck driving along an animated road with spinning tyres ($\omega = 360^\circ$), moving road dashes, and trailing tyre dust lines.
  - **Live Sync / Refresh**: Communications tower with apex blinking beacon, radiating RF wave arcs, and animated live pulsing status badge with audio equalizer bars.

### Law 8: Responsive Navigation
Choose wrapping, scrolling, dropdown overflow or alternate navigation based on the number of tabs, viewport, accessibility and existing design. Keep the active destination understandable and keyboard accessible.

### Law 9: File Necessity, Anti-Bloat and Safe Cleanup
- Prefer cohesive modules and avoid knowingly adding dead code, duplicate abstractions or unnecessary dependencies.
- Treat apparently orphaned files and legacy packages as investigation candidates, not automatic deletion targets. Confirm references, build/runtime loading and ownership before removing anything.

### Law 10: Evidence-Based Verification
- Execute the project's configured, relevant test/build/typecheck/lint/browser checks.
- Missing checks are NOT CONFIGURED or NOT VERIFIED, never PASS. TypeScript checks are NOT APPLICABLE when the project does not use TypeScript.
- No percentage score substitutes for acceptance criteria and fresh evidence.

---

## 2. Progressive Documentation Loading Reference

When implementing specific features, read the targeted module from the repository or invoke `node scripts/load-docs.js <topic>`:

| Feature / Domain | Reference Documentation (load when relevant) |
| :--- | :--- |
| **Responsive Mobile Tabs** | `design-system/RESPONSIVE_MOBILE_TABS_SYSTEM.md` |
| **In-Flight Button Animations** | `design-system/BUTTON_IN_FLIGHT_TASK_ANIMATIONS_SPECIFICATION.md` |
| **Genie Trash Bin Deletion** | `design-system/APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md` |
| **Auth & Edge Proxy Protection** | `modules/AUTH_AND_FACELOCK.md` & `modules/ROUTE_PROXY_AND_PROTECTION_SYSTEM.md` |
| **Data Tables & Mobile Cards** | `modules/DATA_TABLE_AND_CARDS_SYSTEM.md` |
| **Rapid Click Batching** | `modules/OPTIMISTIC_RAPID_CLICK_BATCHING_ENGINE.md` |
| **Retrofit Protocol** | `modules/EXISTING_PROJECT_RETROFIT_ENGINE.md` |
| **Mandatory Execution Checklist** | `rules/MANDATORY_EXECUTION_CHECKLIST.md` |
| **Testing Standards & Verification** | `rules/TESTING_AND_VERIFICATION.md` |

