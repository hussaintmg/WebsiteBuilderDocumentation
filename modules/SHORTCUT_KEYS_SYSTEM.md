# Module Specification: Keyboard Shortcuts System

> **PURPOSE**: Provides power-user keyboard navigation across the application, categorized into **Basic Level** (Search & Dialogs) and **Master Level** (Full Vim/Table/Carousel Navigation).

---

## ⌨️ 1. Shortcut Tiers & Capability Matrix

| Tier | Target User | Key Combos | Functionality |
| :--- | :--- | :--- | :--- |
| **Basic Level** | General Users & Clients | `Cmd/Ctrl + K` | Open Global Command Palette / Search |
| | | `Esc` | Close any active modal, drawer, or slide view |
| | | `Alt + T` | Toggle Dark / Light / System theme |
| **Master Level** | Power Staff & Operations | `?` *(Shift + /)* | Open Keyboard Shortcut Cheat Sheet Modal |
| | *(Includes Basic +)* | `j` / `ArrowDown` | Move selection down to next table row |
| | | `k` / `ArrowUp` | Move selection up to previous table row |
| | | `Enter` | Open currently selected table row / item |
| | | `ArrowRight` | Next order in Slide Carousel view |
| | | `ArrowLeft` | Previous order in Slide Carousel view |
| | | `Ctrl + Enter` | Instant submit form / approve current order |
| | | `Ctrl + S` | Save draft without closing |
| | | `g then h` | Navigate to Dashboard Home |
| | | `g then o` | Navigate to Orders View |

---

## 🛠️ 2. Central Hook Implementation (`useKeyboardShortcuts.ts`)

```typescript
import { useEffect } from "react";

export interface ShortcutConfig {
  key: string;            // e.g. "k", "Enter", "ArrowRight"
  ctrlOrMeta?: boolean;   // true for Ctrl on Win/Linux or Cmd on Mac
  alt?: boolean;
  shift?: boolean;
  description: string;
  category: "Global" | "Orders" | "Navigation" | "Forms";
  action: (e: KeyboardEvent) => void;
}

export function useKeyboardShortcuts(shortcuts: ShortcutConfig[], isEnabled = true) {
  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Ignore shortcuts when user is typing in form inputs (unless key is Esc or Ctrl combo)
      const target = e.target as HTMLElement;
      const isInput = ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable;

      for (const sc of shortcuts) {
        const matchesKey = e.key.toLowerCase() === sc.key.toLowerCase();
        const matchesCtrlOrMeta = sc.ctrlOrMeta ? (e.ctrlKey || e.metaKey) : (!e.ctrlKey && !e.metaKey);
        const matchesAlt = sc.alt ? e.altKey : !e.altKey;
        const matchesShift = sc.shift ? e.shiftKey : !e.shiftKey;

        if (matchesKey && matchesCtrlOrMeta && matchesAlt && matchesShift) {
          // If typing in input, only allow Escape or Ctrl+Enter/Ctrl+S
          if (isInput && sc.key !== "Escape" && !sc.ctrlOrMeta) {
            continue;
          }

          e.preventDefault();
          sc.action(e);
          return;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts, isEnabled]);
}
```

---

## 🎨 3. Shortcut Badge UI Component (`<Kbd />`)

```tsx
import React from "react";

export const Kbd: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <kbd className="inline-flex items-center justify-center px-1.5 py-0.5 font-mono text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-white/15 rounded shadow-sm">
    {children}
  </kbd>
);
```

---

## 📋 4. Shortcut Help Modal (`ShortcutCheatSheet.tsx`)

Pressing `?` triggers a sleek glassmorphic modal displaying all currently registered shortcuts with grouped categories.
