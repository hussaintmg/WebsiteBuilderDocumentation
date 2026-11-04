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

## 5. React Hook Implementation: `hooks/useResponsiveTabs.ts`

The core measurement and partition logic is encapsulated inside an uncoupled custom hook. When implementing in any project, the AI agent must create this file at `<project-root>/hooks/useResponsiveTabs.ts`:

```typescript
'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';

export interface TabItem<T = string> {
  id: T;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface UseResponsiveTabsOptions {
  gap?: number;
  moreButtonWidth?: number;
  pinActiveTab?: boolean;
}

export interface UseResponsiveTabsResult<T = string> {
  containerRef: React.RefObject<HTMLDivElement | null>;
  measureContainerRef: React.RefObject<HTMLDivElement | null>;
  visibleTabs: TabItem<T>[];
  overflowTabs: TabItem<T>[];
  isActiveInOverflow: boolean;
  activeTab: TabItem<T> | undefined;
  containerWidth: number;
}

/**
 * useResponsiveTabs Hook
 * 
 * Dynamically computes visible tabs vs overflow tabs based on real-time
 * container pixel width measured by ResizeObserver.
 */
export function useResponsiveTabs<T extends string = string>(
  tabs: TabItem<T>[],
  activeId: T,
  options: UseResponsiveTabsOptions = {}
): UseResponsiveTabsResult<T> {
  const { gap = 6, moreButtonWidth = 96, pinActiveTab = true } = options;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureContainerRef = useRef<HTMLDivElement | null>(null);

  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [tabWidths, setTabWidths] = useState<number[]>([]);

  // Find active tab item
  const activeTab = useMemo(
    () => tabs.find(t => t.id === activeId) || tabs[0],
    [tabs, activeId]
  );

  // Measure tab widths from hidden measuring container
  const measureTabs = useCallback(() => {
    if (!measureContainerRef.current) return;
    const children = Array.from(measureContainerRef.current.children) as HTMLElement[];
    const widths = children.map(child => Math.ceil(child.getBoundingClientRect().width));
    setTabWidths(widths);
  }, []);

  // Set up ResizeObserver on visible container
  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setContainerWidth(Math.floor(width));
      }
    });

    observer.observe(el);
    setContainerWidth(Math.floor(el.getBoundingClientRect().width));

    return () => observer.disconnect();
  }, []);

  // Measure tab element widths on mount and whenever tabs change
  useEffect(() => {
    measureTabs();
  }, [tabs, measureTabs]);

  // Orientation and window resize listener
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(Math.floor(containerRef.current.getBoundingClientRect().width));
      }
      measureTabs();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [measureTabs]);

  // Compute Partitioning
  const { visibleTabs, overflowTabs, isActiveInOverflow } = useMemo(() => {
    if (tabs.length === 0) {
      return { visibleTabs: [], overflowTabs: [], isActiveInOverflow: false };
    }

    if (containerWidth === 0 || tabWidths.length !== tabs.length) {
      return { visibleTabs: tabs, overflowTabs: [], isActiveInOverflow: false };
    }

    const totalTabsWidth = tabWidths.reduce((acc, w) => acc + w, 0) + (tabs.length - 1) * gap;

    if (totalTabsWidth <= containerWidth) {
      return {
        visibleTabs: tabs,
        overflowTabs: [],
        isActiveInOverflow: false
      };
    }

    const availableForVisible = containerWidth - moreButtonWidth - gap;
    let accumulatedWidth = 0;
    const visible: TabItem<T>[] = [];
    const overflow: TabItem<T>[] = [];

    const activeIndex = tabs.findIndex(t => t.id === activeId);

    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
      const width = tabWidths[i] || 80;
      const nextTotal = visible.length === 0 ? width : accumulatedWidth + gap + width;

      if (nextTotal <= availableForVisible) {
        accumulatedWidth = nextTotal;
        visible.push(tab);
      } else {
        overflow.push(tab);
      }
    }

    if (visible.length === 0 && tabs.length > 0) {
      visible.push(tabs[0]);
      overflow.splice(0, 1);
    }

    const activeInOverflow = overflow.some(t => t.id === activeId);

    if (pinActiveTab && activeInOverflow && activeIndex !== -1 && visible.length > 0) {
      const activeItem = tabs[activeIndex];
      const lastVisible = visible.pop()!;
      overflow.push(lastVisible);

      const activeOverflowIdx = overflow.findIndex(t => t.id === activeId);
      if (activeOverflowIdx !== -1) {
        overflow.splice(activeOverflowIdx, 1);
      }
      visible.push(activeItem);

      return {
        visibleTabs: visible,
        overflowTabs: overflow,
        isActiveInOverflow: false
      };
    }

    return {
      visibleTabs: visible,
      overflowTabs: overflow,
      isActiveInOverflow: activeInOverflow
    };
  }, [tabs, activeId, tabWidths, containerWidth, gap, moreButtonWidth, pinActiveTab]);

  return {
    containerRef,
    measureContainerRef,
    visibleTabs,
    overflowTabs,
    isActiveInOverflow,
    activeTab,
    containerWidth
  };
}
```

---

## 6. Complete Component Implementation: `components/ResponsiveTabs.tsx`

The AI agent must place this component at `<project-root>/components/ResponsiveTabs.tsx`:

```tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { TabItem, useResponsiveTabs } from '../hooks/useResponsiveTabs';

export interface ResponsiveTabsProps<T extends string = string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (id: T) => void;
  className?: string;
  pinActiveTab?: boolean;
  moreLabel?: string;
}

export function ResponsiveTabs<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  className = '',
  pinActiveTab = true,
  moreLabel = 'More'
}: ResponsiveTabsProps<T>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const moreButtonRef = useRef<HTMLButtonElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const {
    containerRef,
    measureContainerRef,
    visibleTabs,
    overflowTabs,
    isActiveInOverflow,
    activeTab: currentActiveTab
  } = useResponsiveTabs(tabs, activeTab, {
    pinActiveTab,
    gap: 6,
    moreButtonWidth: 105
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        moreButtonRef.current &&
        !moreButtonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (visibleTabs.length === 0) return;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const currentIndex = visibleTabs.findIndex(t => t.id === activeTab);
      const nextIndex = (currentIndex + 1) % visibleTabs.length;
      onChange(visibleTabs[nextIndex].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const currentIndex = visibleTabs.findIndex(t => t.id === activeTab);
      const prevIndex = (currentIndex - 1 + visibleTabs.length) % visibleTabs.length;
      onChange(visibleTabs[prevIndex].id);
    } else if (e.key === 'Escape' && isDropdownOpen) {
      e.preventDefault();
      setIsDropdownOpen(false);
      moreButtonRef.current?.focus();
    }
  };

  const springTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: 'spring', stiffness: 450, damping: 35 };

  return (
    <div className={`relative w-full ${className}`} onKeyDown={handleKeyDown}>
      {/* Hidden measurement row */}
      <div
        ref={measureContainerRef}
        aria-hidden="true"
        className="absolute top-0 left-0 flex gap-1.5 opacity-0 pointer-events-none -z-50 select-none overflow-hidden h-0"
      >
        {tabs.map(tab => (
          <div
            key={tab.id}
            className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium whitespace-nowrap"
          >
            {tab.icon && <span className="w-4 h-4 shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded-full">
                {tab.badge}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Visible Tab Bar */}
      <div
        ref={containerRef}
        role="tablist"
        className="relative flex items-center w-full p-1.5 bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-inner overflow-visible gap-1.5"
      >
        {visibleTabs.map(tab => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => onChange(tab.id)}
              className={`relative flex items-center gap-2 px-3.5 py-2 text-sm font-medium whitespace-nowrap rounded-xl transition-colors cursor-pointer select-none outline-none ${
                tab.disabled
                  ? 'opacity-40 cursor-not-allowed'
                  : isActive
                  ? 'text-white'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="responsive-tabs-active-pill"
                  transition={springTransition}
                  className="absolute inset-0 bg-white/10 border border-white/15 rounded-xl shadow-sm -z-0"
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon && <span className="w-4 h-4 shrink-0">{tab.icon}</span>}
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`px-1.5 py-0.5 text-[10px] font-semibold rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-neutral-400'}`}>
                    {tab.badge}
                  </span>
                )}
              </span>
            </button>
          );
        })}

        {/* Overflow Menu Trigger */}
        {overflowTabs.length > 0 && (
          <div className="relative ml-auto shrink-0">
            <button
              ref={moreButtonRef}
              type="button"
              aria-haspopup="menu"
              aria-expanded={isDropdownOpen}
              onClick={() => setIsDropdownOpen(prev => !prev)}
              className={`relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium whitespace-nowrap rounded-xl transition-all cursor-pointer ${
                isActiveInOverflow
                  ? 'text-white bg-white/10 border border-white/25 shadow-sm'
                  : isDropdownOpen
                  ? 'text-white bg-white/10 border border-white/15'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {isActiveInOverflow && (
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
              )}
              <span>{isActiveInOverflow && currentActiveTab ? `${moreLabel}: ${currentActiveTab.label}` : `${moreLabel} (${overflowTabs.length})`}</span>
              <motion.span animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}>
                <ChevronDown className="w-3.5 h-3.5" />
              </motion.span>
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  ref={dropdownRef}
                  role="menu"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.96 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.96 }}
                  transition={springTransition}
                  className="absolute right-0 mt-2 z-50 min-w-[210px] p-1.5 rounded-xl bg-neutral-900/95 backdrop-blur-2xl border border-white/15 shadow-[0_16px_36px_rgba(0,0,0,0.5)] focus:outline-none"
                >
                  <div className="py-1">
                    {overflowTabs.map(tab => {
                      const isTabActive = tab.id === activeTab;
                      return (
                        <button
                          key={tab.id}
                          role="menuitem"
                          type="button"
                          disabled={tab.disabled}
                          onClick={() => { onChange(tab.id); setIsDropdownOpen(false); moreButtonRef.current?.focus(); }}
                          className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg text-left transition-colors cursor-pointer ${
                            tab.disabled ? 'opacity-40 cursor-not-allowed' : isTabActive ? 'bg-white/15 text-white font-medium' : 'text-neutral-300 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            {tab.icon && <span className="w-4 h-4 shrink-0 text-neutral-400">{tab.icon}</span>}
                            <span className="truncate">{tab.label}</span>
                          </div>
                          {isTabActive && <Check className="w-4 h-4 text-blue-400 shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## 7. AI Agent Scaffolding & Integration Guide

When instructed to *"modernize tabs"*, *"make tabs responsive"*, or *"is page ke tabs mobile friendly banao"*:

1. **Verify Target Files**:
   - Check if `<target-project>/hooks/useResponsiveTabs.ts` exists. If missing, create it from Section 5.
   - Check if `<target-project>/components/ResponsiveTabs.tsx` exists. If missing, create it from Section 6.
2. **Replace Static Tab Lists**:
   - Locate hardcoded tab buttons or overflowing flex containers in `app/**/page.tsx`.
   - Import `ResponsiveTabs` and pass the tab array and state handler:
     ```tsx
     import { ResponsiveTabs } from '@/components/ResponsiveTabs';
     ```
3. **Verify Zero Compilation Errors**:
   - Run `npx tsc --noEmit` to verify type safety.


