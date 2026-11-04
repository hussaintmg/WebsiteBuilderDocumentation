# Responsive Mobile Tabs & Dynamic Overflow System (`ResponsiveTabs`)

> **STATUS: CANONICAL FRAMEWORK COMPONENT & DESIGN SYSTEM SPECIFICATION**  
> Solves the universal problem of tab bars breaking, cramping, or forcing horizontal scrollbars on mobile devices (`320px` to `768px`) through an intelligent dynamic width calculation engine, Apple-inspired glassmorphism, and seamless `[More ▼]` overflow dropdown.

---

## 1. Problem Statement & Mobile Ergonomics

### The Failure Modes of Traditional Tabs
1. **The Cramping / Squish Breakdown**: Standard CSS flex rows without overflow protection shrink tabs to illegible widths (`font-size: 8px`, truncated labels like `"Set..."`, `"Not..."`).
2. **The Disastrous Layout Break (Flex Wrap)**: If set to `flex-wrap`, multi-row tab wrapping shoves page content downward, breaking sticky headers and creating jittery visual jumps.
3. **The Forced Horizontal Scrollbar**: Tab bars with `overflow-x: auto` force users into cumbersome lateral thumb swiping, hide crucial action tabs off-screen without indication, and exhibit ugly browser scrollbar tracks on Windows/Android.

### The Solution: Apple-Inspired Dynamic Tab Overflow
The `ResponsiveTabs` system measures available container width in real time via a `ResizeObserver` and automatically partitions tabs into:
1. **Visible Tabs**: The maximum number of tabs that cleanly fit within the container with proper padding and gaps.
2. **Overflow Dropdown (`[More ▼]`)**: Any tabs that cannot fit are smoothly moved into an elevated glass dropdown menu.
3. **Active Tab Priority Guarantee**: If the currently active tab is in the overflow list, the system either pins the active tab to the visible row OR elevates the `[More ▼]` button with active state styling, high-contrast typography, and an active pulse indicator so the user always knows what is selected.

---

## 2. Mathematical Partitioning Model

Let:
- $W_{\text{container}}$: Measured inner width of the tab container.
- $W_{\text{padding}}$: Total horizontal padding and borders of container.
- $G$: Inter-tab gap in pixels (default: $6\text{px}$).
- $w_i$: Measured rendered width of tab $i$ for $i \in \{0, 1, \dots, N-1\}$.
- $W_{\text{more}}$: Rendered width of the `[More ▼]` dropdown trigger button (~$96\text{px}$).
- $W_{\text{net}} = W_{\text{container}} - W_{\text{padding}}$.

### Partition Algorithm
1. **Total Width Test**:
   $$\sum_{i=0}^{N-1} w_i + (N - 1) \cdot G \le W_{\text{net}}$$
   If true, all tabs fit. $V = \{0, 1, \dots, N-1\}$ and $O = \emptyset$. No overflow trigger is rendered.
2. **Overflow Budgeting**:
   If tabs exceed $W_{\text{net}}$, the available width for visible tabs is:
   $$W_{\text{budget}} = W_{\text{net}} - W_{\text{more}} - G$$
3. **Greedy Slice with Active Tab Retention**:
   Find the largest $M < N$ such that:
   $$\sum_{i=0}^{M-1} w_i + (M - 1) \cdot G \le W_{\text{budget}}$$
   - **Active Tab Protection**: If active tab index $k \ge M$ and `pinActiveTab = true`, the system reserves a slot for tab $k$, ensuring the selected tab is always in $V$, shifting earlier lower-priority tabs to $O$.
   - **Dropdown Indicator**: If tab $k \in O$, the `[More ▼]` button receives `aria-current="true"`, active glass highlight styling, and dynamic label `"More: " + activeTab.label`.

---

## 3. Apple-Inspired Visual Tokens & Micro-Interactions

```
Desktop (> 1024px):
┌────────────────────────────────────────────────────────────────────────┐
│  [ Overview ]  [ Analytics ]  [ Transactions ]  [ Settings ]  [ Logs ] │
└────────────────────────────────────────────────────────────────────────┘

Mobile Screen (390px):
┌──────────────────────────────────────────────────┐
│  [ Overview ]  [ Analytics ]  [ More (3) ▼ ]     │
└──────────────────────────────────────┬───────────┘
                                       │ (Opens on click/down arrow)
                                       ▼
                       ┌───────────────────────────┐
                       │  • Transactions           │
                       │  ✔ Settings (Active)      │
                       │  • Audit Logs             │
                       └───────────────────────────┘
```

### Visual Styling Tokens
| UI Layer | Token / Classes | Purpose |
| :--- | :--- | :--- |
| **Tab Bar Container** | `relative flex items-center bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 shadow-inner` | Dark obsidian frosted glass track. Zero horizontal scrolling. |
| **Inactive Tab** | `px-3.5 py-2 text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors` | Subtle, accessible unselected state. |
| **Active Gliding Pill** | `layoutId="responsive-active-pill"` `bg-white/10 text-white border border-white/15 shadow-sm` | 60 FPS Framer Motion FLIP transition between active tabs. |
| **Overflow Trigger** | Glass button with animated chevron: `rotate: isOpen ? 180 : 0` | Tactile dropdown trigger with active dot if item inside is selected. |
| **Dropdown Menu** | `fixed` or `absolute right-0 mt-2 z-50 bg-neutral-900/95 backdrop-blur-2xl border border-white/15 shadow-2xl rounded-xl p-1.5` | Elevated floating glass sheet with kinetic spring entrance. |

---

## 4. Accessibility & Keyboard Navigation (WAI-ARIA)

1. **Roles & Attributes**:
   - Container has `role="tablist"` and `aria-orientation="horizontal"`.
   - Each tab button has `role="tab"`, `aria-selected={isActive}`, and `tabIndex={isActive ? 0 : -1}`.
   - The overflow trigger button has `aria-haspopup="menu"` and `aria-expanded={isOpen}`.
2. **Keyboard Traversal**:
   - `ArrowLeft` / `ArrowRight`: Moves focus and selection across visible tabs.
   - `ArrowDown` on More button: Opens the overflow menu and focuses the first item.
   - `ArrowUp` / `ArrowDown` inside dropdown: Cycles through overflow items.
   - `Enter` / `Space`: Selects focused tab and dismisses dropdown.
   - `Escape`: Closes dropdown and returns focus to the `[More ▼]` button.
3. **Reduced Motion**:
   - Integrated with `useReducedMotion()`. If active, transitions use instant opacity cuts without spring transforms.

---

## 5. React Hook: `useResponsiveTabs`

The core measurement and partition logic is separated into an uncoupled custom hook (`hooks/useResponsiveTabs.ts`):
- Uses `ResizeObserver` on container.
- Measures hidden measuring tabs off-screen with `visibility: hidden; position: absolute; pointer-events: none`.
- Re-evaluates instantly on window resize, device orientation change, and tab list updates.
