# Module Specification: Master Keyboard Shortcuts System

> **PURPOSE**: Provides power-user keyboard navigation and contextual shortcuts across the entire application ecosystem. Eliminates reliance on the mouse for repetitive operations, accelerates operational workflows (tables, cards, pagination, bulk operations), and guarantees accessible keyboard compliance.

---

## ⌨️ 1. Complete Shortcut Architecture & Priority Engine

Shortcuts operate on a **3-Layer Scoped Event Stack**:
1. **Layer 1: Global Shortcuts** (Theme toggle, Sidebar collapse, Command palette, Global search `F`, Help modal `?`).
2. **Layer 2: Component-Level Contextual Shortcuts** (Table row traversal, Card grid navigation, Pagination arrow flips, Marquee select helpers).
3. **Layer 3: Form & Modal Guardrails** (Escape to close, Ctrl+Enter to submit, Ctrl+S to save).

```
┌────────────────────────────────────────────────────────┐
│                   KEYBOARD EVENT                       │
└──────────────────────────┬─────────────────────────────┘
                           │
             Is target INPUT / TEXTAREA?
              /                         \
            YES                         NO
            /                             \
Only allow:                           Allow Layer 1 (Global),
- Escape (close modal/blur)           Layer 2 (Component),
- Ctrl + Enter (submit)               Layer 3 (Modals)
- Ctrl + S (save draft)               Including single-key 'F' search
```

---

## 🗂️ 2. Exhaustive Shortcut Key Matrices

### 2.1 The Complete `Ctrl` / `Cmd` Key Matrix

| Key Combo | Action | Scope / Context | Detailed Behavior |
| :--- | :--- | :--- | :--- |
| `Ctrl + A` | **Select All** | Tables, Card Grids, Lists | Selects all items on the current page. If already all selected, triggers the "Select across all pages" prompt. In text inputs, keeps default text selection. |
| `Ctrl + C` | **Copy Selected** | Selected Table Rows / Cards | Copies the primary identifier (e.g. Order ID, Tracking #) or full JSON record of selected row(s) to clipboard with an animated success toast. |
| `Ctrl + V` | **Paste / Batch Import** | Data Tables / Import Dialogs | Parses clipboard CSV/JSON or triggers batch record creation workflow. |
| `Ctrl + X` | **Cut / Mark for Move** | Table Rows / Cards / Folders | Marks selected items into staging buffer for batch archive, folder relocation, or status shift. |
| `Ctrl + O` | **Quick Open** | Active Table Row / Card | Instantly opens the details drawer or slide-over review modal for the currently focused row or card. |
| `Ctrl + Z` | **Undo Last Action** | Application-wide History | Reverts the most recent bulk delete, status change, or inline edit within a 15-second undo window. Displays restored confirmation toast. |
| `Ctrl + Y` *(or `Ctrl+Shift+Z`)* | **Redo Action** | Application-wide History | Re-executes the last undone action. |
| `Ctrl + S` | **Save / Update Draft** | Forms, CMS, Inline Table Edits | Saves the current form or table cell edit without closing the active view. Triggers subtle glowing button micro-animation. |
| `Ctrl + Enter` | **Instant Submit / Approve** | Forms, Carousel Slide Mode | Instantly validates and submits the active form, or approves the current order in 1-by-1 Slide Review Mode. |
| `Ctrl + K` | **Command Palette** | Global | Opens the central spotlight command palette with instant search and action triggers. |
| `Ctrl + B` | **Toggle Sidebar** | Global | Toggles the dynamic viewport (`h-dvh`) sidebar between expanded and collapsed icon-rail mode. |
| `Ctrl + P` | **Print / Export PDF** | Master Table / Slide View | Triggers compiled PDF generation or native print stylesheet for selected rows or current view. |
| `Ctrl + Backspace` / `Ctrl + Delete` | **Quick Soft-Delete** | Selected Rows / Cards | Moves selected item(s) to recycle bin/soft-delete state with prompt confirmation and undo banner. |

---

### 2.2 The Complete `Alt` Key Matrix

| Key Combo | Action | Scope | Detailed Behavior |
| :--- | :--- | :--- | :--- |
| `Alt + T` | **Theme Switcher** | Global | Cycles through Dark Mode, Light Mode, and System Theme with zero page flicker. |
| `Alt + S` | **Toggle Sidebar** | Global | Secondary shortcut to collapse/expand the main navigation sidebar (mirrors `Ctrl + B`). |
| `Alt + N` | **New Record** | Master Table / Cards | Opens the creation modal for a New Order, New Product, New Customer, or New Post. |
| `Alt + F` | **Focus Filter Bar** | Data Views | Focuses the search input or opens the primary filter dropdown facet menu. |
| `Alt + P` | **Focus Pagination** | Data Views | Highlights the pagination controller bar; enables subsequent arrow key navigation. |
| `Alt + D` | **Bulk Delete Selected** | Table / Cards with Selection | Triggers Bulk Delete confirmation modal for all currently selected items with animated trash icon. |
| `Alt + M` | **Bulk Send Email** | Table / Cards with Selection | Opens the Bulk Email template composer modal with the selected recipients pre-loaded. |
| `Alt + W` | **Bulk Send WhatsApp** | Table / Cards with Selection | Opens the Bulk WhatsApp template dispatcher modal for all selected customer phone numbers. |
| `Alt + E` | **Bulk Export / PDF** | Table / Cards with Selection | Downloads consolidated PDF or Excel report of the selected items. |

---

### 2.3 The Dedicated `F` Key: Global Search Activation Rule

> **CRITICAL EXECUTION RULE FOR `F` SEARCH**:
> - When the user is **NOT** typing in an `<input>`, `<textarea>`, `<select>`, or `contenteditable` container, pressing the letter **`f`** (or **`/`**) MUST immediately open the Global Search bar or spotlight modal.
> - When the user **IS** typing inside a form field, pressing `f` enters the character `'f'` normally into the text field.
> - If Global Search is already open, pressing **`Escape`** immediately closes it and restores focus to the previously active element.

```typescript
// Rule logic inside keydown listener:
if (e.key.toLowerCase() === "f" && !e.ctrlKey && !e.altKey && !e.metaKey) {
  const isInput = ["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement).tagName) || (e.target as HTMLElement).isContentEditable;
  if (!isInput) {
    e.preventDefault();
    openGlobalSearchModal();
  }
}
```

---

### 2.4 Sidebar Open/Close Shortcuts

Users can toggle the sidebar with either:
- **`Ctrl + B`** (Standard IDE/productivity hotkey).
- **`Alt + S`** (Mnemonic: Alternate Sidebar).
- **`[`** (Square bracket hotkey when outside text inputs).

When triggered:
1. The sidebar smoothly morphs width between 280px (expanded) and 76px (icon-rail), or slides out on mobile viewports.
2. The user's preference is automatically saved in `localStorage.setItem("sidebar_collapsed", String(isCollapsed))`.

---

## 🗃️ 3. Component-Level Shortcuts

### 3.1 Data Tables (`MasterTable`) Navigation Matrix

| Key | Function |
| :--- | :--- |
| `ArrowDown` / `j` | Highlight & move focus to the **next row** in the table. |
| `ArrowUp` / `k` | Highlight & move focus to the **previous row** in the table. |
| `Space` | **Toggle selection checkbox** for the currently focused row. |
| `Shift + ArrowDown` | **Range selection**: Selects from current row down to destination row (contiguous multi-select). |
| `Shift + ArrowUp` | **Range selection**: Selects from current row up to destination row. |
| `Enter` | **Open row**: Launches the slide-over drawer or order review carousel for the focused row. |
| `ArrowLeft` | **Previous Page**: Navigates to the previous page in pagination (with button loading animation). |
| `ArrowRight` | **Next Page**: Navigates to the next page in pagination (with button loading animation). |
| `Delete` / `Backspace` | Prompts deletion for all currently checked rows. |
| `Esc` | Clears all current row selections. |

---

### 3.2 Responsive Cards (`CardGrid`) Navigation Matrix

On mobile screens and tablet views where table rows convert to rich cards:

| Key | Function |
| :--- | :--- |
| `ArrowRight` / `ArrowLeft` | Move active card focus horizontally across the grid. |
| `ArrowDown` / `ArrowUp` | Move active card focus vertically to the card directly above/below. |
| `Space` | Toggle card selection checkbox (highlights card with glowing brand border). |
| `Enter` | Open card detail modal or action drawer. |
| `Delete` | Soft-deletes selected card(s). |

---

## 🖱️ 4. Google Drive-Style Marquee Drag Selection Integration

Shortcuts integrate directly with the **Marquee Box Selection Tool**:
1. When a user holds the mouse button and drags a rectangle across rows or cards:
   - Items intersecting the rectangle are highlighted in real-time.
2. **Modifier Keys during Drag**:
   - `Shift + Drag`: Adds intersected items to existing selection (additive union).
   - `Ctrl + Drag`: Inverts selection state of intersected items (toggle).
   - Normal Drag (without modifier): Replaces current selection with newly intersected items.
3. Once selection is complete:
   - The **Floating Bulk Action Bar** automatically slides in.
   - `Ctrl + A` updates selection to entire page or opens the "Select all other pages" prompt.
   - `Alt + D` triggers bulk delete.
   - `Alt + M` triggers bulk email.
   - `Alt + W` triggers bulk WhatsApp.
   - `Alt + E` triggers bulk PDF export.
   - `Escape` cancels marquee selection and resets highlights.

---

## 💻 5. Production React Hook: `useKeyboardShortcuts.ts`

```typescript
"use client";

import { useEffect, useCallback } from "react";

export type ShortcutScope = "global" | "table" | "cards" | "form" | "modal";

export interface ShortcutConfig {
  key: string;              // e.g., "a", "c", "v", "x", "o", "z", "y", "s", "f", "Enter", "ArrowLeft"
  ctrlOrMeta?: boolean;     // Ctrl on Win/Linux, Cmd on Mac
  alt?: boolean;            // Alt / Option key
  shift?: boolean;          // Shift key
  scope?: ShortcutScope;    // Restrict action to active scope
  description: string;      // Shown in '?' Cheat Sheet modal
  category: "Global" | "Navigation" | "Data & Selection" | "Bulk Actions" | "Modals";
  action: (e: KeyboardEvent) => void;
  allowInInputs?: boolean;  // Set true for Ctrl+S or Ctrl+Enter inside textareas
}

interface UseKeyboardShortcutsOptions {
  isEnabled?: boolean;
  activeScope?: ShortcutScope;
}

export function useKeyboardShortcuts(
  shortcuts: ShortcutConfig[],
  options: UseKeyboardShortcutsOptions = {}
) {
  const { isEnabled = true, activeScope = "global" } = options;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isEnabled) return;

      const target = e.target as HTMLElement;
      const isInput =
        ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) ||
        target.isContentEditable;

      for (const sc of shortcuts) {
        // 1. Verify key match (case-insensitive)
        const matchesKey = e.key.toLowerCase() === sc.key.toLowerCase();

        // 2. Verify modifiers
        const matchesCtrl = sc.ctrlOrMeta ? (e.ctrlKey || e.metaKey) : (!e.ctrlKey && !e.metaKey);
        const matchesAlt = sc.alt ? e.altKey : !e.altKey;
        const matchesShift = sc.shift ? e.shiftKey : !e.shiftKey;

        // 3. Verify scope
        const matchesScope = !sc.scope || sc.scope === "global" || sc.scope === activeScope;

        if (matchesKey && matchesCtrl && matchesAlt && matchesShift && matchesScope) {
          // If user is inside an input/textarea:
          if (isInput) {
            // Only execute if explicitly allowed (e.g. Escape, Ctrl+Enter, Ctrl+S)
            const isAllowedSpecial = sc.allowInInputs || sc.key === "Escape" || (sc.ctrlOrMeta && ["s", "enter"].includes(sc.key.toLowerCase()));
            if (!isAllowedSpecial) {
              continue;
            }
          }

          // Special case: Single 'f' key search must NEVER trigger inside inputs
          if (sc.key.toLowerCase() === "f" && !sc.ctrlOrMeta && !sc.alt && isInput) {
            continue;
          }

          e.preventDefault();
          sc.action(e);
          return;
        }
      }
    },
    [shortcuts, isEnabled, activeScope]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
```

---

## 🎨 6. Glassmorphic Keyboard Cheat Sheet Modal (`ShortcutCheatSheet.tsx`)

Pressing **`?`** (`Shift + /`) triggers this interactive cheat sheet modal with grouped categories, search filter, and animated Kbd badges:

```tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Kbd } from "@/components/ui/Kbd";
import { Search, X, Sparkles } from "lucide-react";

interface ShortcutHelpItem {
  keys: string[];
  description: string;
  category: "Global" | "Data & Selection" | "Bulk Actions" | "Navigation";
}

const SHORTCUT_REGISTRY: ShortcutHelpItem[] = [
  { keys: ["f"], description: "Open Global Search (when not typing in form)", category: "Global" },
  { keys: ["Ctrl", "K"], description: "Open Command Palette spotlight", category: "Global" },
  { keys: ["Ctrl", "B"], description: "Toggle dynamic sidebar collapse", category: "Global" },
  { keys: ["Alt", "T"], description: "Toggle Dark / Light / System theme", category: "Global" },
  { keys: ["Ctrl", "A"], description: "Select all items on current page (or across pages)", category: "Data & Selection" },
  { keys: ["Ctrl", "C"], description: "Copy selected records to clipboard", category: "Data & Selection" },
  { keys: ["Ctrl", "O"], description: "Open details for focused item", category: "Data & Selection" },
  { keys: ["Ctrl", "Z"], description: "Undo last bulk action or edit", category: "Data & Selection" },
  { keys: ["Space"], description: "Toggle checkbox selection on focused item", category: "Data & Selection" },
  { keys: ["Alt", "D"], description: "Bulk delete all selected records", category: "Bulk Actions" },
  { keys: ["Alt", "M"], description: "Bulk send email to selected records", category: "Bulk Actions" },
  { keys: ["Alt", "W"], description: "Bulk send WhatsApp messages to selected records", category: "Bulk Actions" },
  { keys: ["Alt", "E"], description: "Bulk export PDF / Excel for selected records", category: "Bulk Actions" },
  { keys: ["←", "→"], description: "Navigate previous / next pagination page", category: "Navigation" },
  { keys: ["j", "k"], description: "Navigate down / up table rows", category: "Navigation" },
  { keys: ["Esc"], description: "Close modal / clear selection", category: "Global" },
];

export const ShortcutCheatSheet: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [filter, setFilter] = useState("");

  const filtered = SHORTCUT_REGISTRY.filter(
    (item) =>
      item.description.toLowerCase().includes(filter.toLowerCase()) ||
      item.keys.join(" ").toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-2xl rounded-3xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-white/10 p-6 shadow-2xl backdrop-blur-2xl z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Keyboard Shortcuts & Hotkeys
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Press any hotkey combination to trigger fast operations.
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Filter */}
            <div className="relative mt-4 mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search shortcuts..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Shortcuts List */}
            <div className="max-h-[380px] overflow-y-auto space-y-2 pr-2 scrollbar-thin">
              {filtered.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-white/5 hover:border-sky-500/30 transition"
                >
                  <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                    {item.description}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {item.keys.map((k, kIdx) => (
                      <Kbd key={kIdx}>{k}</Kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
```
