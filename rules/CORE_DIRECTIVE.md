# Website Builder Engine — Tier 0 Core Directives & Laws

> **MANDATORY PREREQUISITE FOR ALL AI AGENTS (Claude Code, Gemini, Cursor, Copilot)**  
> Read this document first before writing code. This lightweight specification establishes the non-negotiable architectural laws and engineering standards of Website Builder Engine.

---

## 1. The 10 Ironclad Engine Laws

### Law 1: Rule Zero (Plan First, Code Second)
Never start writing production code until a structured implementation plan (`/.project/PLAN.md` or task plan) is created and aligned with the user.

### Law 2: Root-Level `/app` Standard (Zero `src/` Wrapper)
In all Next.js projects governed by this framework:
- App Router is situated directly at `<root>/app/`.
- Sibling root folders: `/components`, `/context`, `/models`, `/hooks`, `/lib`, `/public`, `/styles`.
- Path aliases: `"@/*": ["./*"]` in `tsconfig.json`. Wrapping project files inside an unnecessary `src/` directory is prohibited unless an existing legacy project strictly requires migration.

### Law 3: Aesthetics, Glassmorphism & Motion Physics Are Non-Negotiable
- **Zero Plain HTML**: Barebones, unstyled HTML or basic white cards with flat gray borders are forbidden.
- **Glassmorphic Canvas**: Dark obsidian canvas (`bg-neutral-950`), frosted glass panels (`backdrop-blur-xl bg-neutral-900/60 border border-white/10`), ambient radial glow, and refined typography.
- **Framer Motion Micro-Interactions**: Wrap pages in animated transitions (`initial={{ opacity: 0, y: 16 }}`). Hover/active states must have kinetic tactile spring feedback (`hover:scale-[1.02] active:scale-[0.98]`).

### Law 4: Context Law & State Integrity
Page components must **NEVER** make direct raw `fetch()` or `axios` calls. All state mutations and queries must be encapsulated inside domain React Contexts (`/context/`).

### Law 5: Zero-Demo Auth & Bidirectional Ergonomics
- Never place prefilled demo credentials or backdoor buttons ("Click to login as Admin") in any environment.
- Initialize form inputs to empty strings (`""`).
- Provide bidirectional navigation links (`/login` has right-aligned "Forgot password?" and bottom "Sign up"; `/signup` has "Log in"; recovery pages have "← Back to log in").

### Law 6: Screen-Level Genie Trash Bin & Deletion Portal
- Deletions in tables and card grids must escape local container `overflow: hidden` via `getBoundingClientRect()` snapshots into a fixed screen-level portal (`fixed inset-0 z-[99999]`).
- The animated Trash Bin rushes from the right edge (`x: 260 -> 0`), its motorized lid swings open (`rotate: -55deg`), and deleting items are sucked in via a 3D Genie vacuum deform (`scaleX: 0.12, rotateX: 65deg`).
- The lid slams shut with elastic bounce, and remaining table rows glide up smoothly via Framer Motion `layout` FLIP animations.

### Law 7: Task-Specific In-Flight Button Animations (Zero Generic Spinners)
- Generic circular loading spinners (`animate-spin` borders) on action buttons are strictly forbidden.
- During network transit, buttons must display task-specific micro-animations inside their icon frames:
  - **Delete**: In-button trash bin loop (bin glides in, lid pops open, document drops in, lid snaps, bin departs left; repeats until API settles).
  - **Order / Dispatch**: Delivery truck driving along an animated road with spinning tyres ($\omega = 360^\circ$), moving road dashes, and trailing tyre dust lines.
  - **Live Sync / Refresh**: Communications tower with apex blinking beacon, radiating RF wave arcs, and animated live pulsing status badge with audio equalizer bars.

### Law 8: Responsive Mobile Tabs & Zero Horizontal Scrolling Law
- UI tabs must never force ugly horizontal scrolling or clip awkwardly on mobile screens.
- Implement dynamic width calculation via `ResizeObserver`: tabs that fit remain in the primary bar; overflow tabs automatically collapse into an Apple-inspired `[More ▼]` glass dropdown.
- The active tab must always be visibly represented (pinned or highlighted on the dropdown trigger button).

### Law 9: File Necessity, Anti-Bloat & Zero Dead-Code
- Every file in the repository must serve a verified active purpose.
- Unreferenced orphan files, dummy placeholder stubs (`// TODO`), and duplicate conflicting packages (`axios` vs `fetch`, `moment` vs `date-fns`) must be audited and cleaned.

### Law 10: Mandatory Test Execution & 95%+ Audit Gate
- Merely mentioning a test command does not count. The agent **MUST execute real commands** (`npm test`, `npx tsc --noEmit`, `node scripts/audit-engine.js .`).
- Premature completion claims are strictly forbidden. Compliance score must be >= 95% and `audit-engine.js` must exit with Code 0.

---

## 2. Progressive Documentation Loading Reference

When implementing specific features, read the targeted module from the repository or invoke `node scripts/load-docs.js <topic>`:

| Feature / Domain | Mandatory Documentation Path |
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

