# Module Specification: Master Data Table, Mobile Cards & Drag Selection Architecture

> **PURPOSE**: Defines the gold standard for data presentation, sorting, filtering, pagination, bulk operations, and interactive multi-selection across the application. Solves the desktop-vs-mobile dilemma with a unified hybrid rendering engine and introduces Google Drive-grade marquee drag selection.

---

## 🖥️ 1. The Strict Hybrid Responsive Rule (Table vs Cards)

> **MANDATORY ARCHITECTURAL DIRECTIVE**:  
> Anywhere in the application where datasets are previewed, listed, or managed (Orders, Invoices, Customers, Products, Audit Logs, Users, CMS Articles):
> - **Desktop (`lg:`, `>= 1024px`)**: ALWAYS render the comprehensive **Master Data Table**. The Mobile Cards grid is strictly hidden (`hidden lg:block`).
> - **Mobile & Small Tablet (`< 1024px`)**: ALWAYS render the touch-optimized **Interactive Cards Grid**. The Data Table is strictly hidden (`block lg:hidden`).
> - **Unified State**: Both views share the exact same underlying state (`selectedIds`, `searchQuery`, `filters`, `sortConfig`, `pagination`, and bulk actions). A selection made via marquee drag or keyboard syncs seamlessly.
> - **Original Design Mandate (Design Apna Banana Hai)**: The components, code snippets, and classes in this module define the **architectural mechanics** (responsive breakpoints, AABB collision math, loading states, keyboard hotkeys). The actual **visual styling, badge colors, card layouts, table column aesthetics, and animations** MUST be handcrafted uniquely for each application—**never blindly copy-paste the dummy colors or sample cards verbatim from this documentation**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        VIEWPORT DETECTION                              │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
               ┌────────────────────┴────────────────────┐
               ▼                                         ▼
     Screen Width >= 1024px                    Screen Width < 1024px
           (Desktop)                             (Mobile / Tablet)
               │                                         │
               ▼                                         ▼
┌──────────────────────────────┐          ┌──────────────────────────────┐
│       MASTER DATA TABLE      │          │     INTERACTIVE CARD GRID    │
│  • Sticky sortable headers   │          │  • High-density swipe cards  │
│  • High-density rows         │          │  • Touch-friendly tap badges │
│  • Multi-column data preview │          │  • Status badge + hero price │
│  • Class: `hidden lg:block`  │          │  • Class: `block lg:hidden`  │
└──────────────────────────────┘          └──────────────────────────────┘
               │                                         │
               └────────────────────┬────────────────────┘
                                    │
                                    ▼
       ┌─────────────────────────────────────────────────────────┐
       │             SHARED DATA & CONTROL LAYER                 │
       │  • Debounced Search & Faceted Filter Bar                │
       │  • Animated Pagination Controls with Arrow Navigation   │
       │  • "Select on All Other Pages" Master State             │
       │  • Google Drive Marquee Drag Selection Engine           │
       │  • Floating Bulk Action Bar with Animated Icons         │
       └─────────────────────────────────────────────────────────┘
```

---

## 📄 2. Advanced Pagination Engine & Arrow Navigation

### 2.1 Arrow Key Shortcuts & Page Flipping
- Pressing **`ArrowLeft`** navigates to the previous page.
- Pressing **`ArrowRight`** navigates to the next page.
- Shortcuts are automatically suppressed when user is focused inside text inputs, textareas, or dropdown search filters.

### 2.2 Optimistic Rapid-Click Batching & Debounced Network Settlement
- When users rapidly click **Next**, **Previous**, or hit arrow keys multiple times (e.g. clicking "Next" 3 times in 400ms to jump from Page 1 to Page 4):
  - **Zero Frozen Disabled States**: Buttons MUST NOT freeze or disable on the first click. The local page counter increments **optimistically in 0ms** (`1 ➔ 2 ➔ 3 ➔ 4`) with an animated pulsing badge.
  - **300ms Settling Quiet Window**: Every rapid click resets the debounce timer. Zero intermediate network requests are fired while the user is actively clicking.
  - **Single Settled Request**: Once 300ms elapses without further clicks, a single API request fires for the final target (Page 4).
  - **AbortController In-Flight Cancellation**: Any previous request is immediately aborted, eliminating 75% of wasteful backend queries and out-of-order race conditions per [`modules/OPTIMISTIC_RAPID_CLICK_BATCHING_ENGINE.md`](./OPTIMISTIC_RAPID_CLICK_BATCHING_ENGINE.md).

### 2.3 Pagination Component Specification (`DataTablePagination.tsx`)

```tsx
"use client";

import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2 } from "lucide-react";
import { Kbd } from "@/components/ui/Kbd";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalRecords: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export const DataTablePagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalRecords,
  isLoading,
  onPageChange,
  onPageSizeChange,
}) => {
  const startItem = totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalRecords);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-slate-200 dark:border-white/10 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md rounded-b-2xl">
      {/* Records Counter & Page Size Selector */}
      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
        <span>
          Showing <strong className="text-slate-900 dark:text-white font-semibold">{startItem}</strong> to{" "}
          <strong className="text-slate-900 dark:text-white font-semibold">{endItem}</strong> of{" "}
          <strong className="text-slate-900 dark:text-white font-semibold">{totalRecords.toLocaleString()}</strong> entries
        </span>

        <div className="flex items-center gap-1.5">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            disabled={isLoading}
            className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:border-sky-500 cursor-pointer"
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Navigation Buttons with Loading & Hotkey Badges */}
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-1 mr-2 text-[11px] text-slate-400">
          <Kbd>←</Kbd>
          <Kbd>→</Kbd>
          <span>to flip page</span>
        </div>

        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1 || isLoading}
          className="p-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          title="First Page"
        >
          <ChevronsLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-sky-500" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
          <span>Prev</span>
        </button>

        {/* Current / Total Indicator */}
        <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs font-bold text-slate-800 dark:text-white">
          {currentPage} / {Math.max(totalPages, 1)}
        </div>

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || isLoading}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer"
        >
          <span>Next</span>
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-sky-500" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages || isLoading}
          className="p-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          title="Last Page"
        >
          <ChevronsRight className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </button>
      </div>
    </div>
  );
};
```

---

## 🔍 3. Real-Time Filter & Search System

The data view includes an interactive filter bar above the table/cards:
1. **Debounced Search Input**: Emits query after 300ms idle, searches across customer names, reference numbers, emails, and notes. Pressing `f` automatically focuses this search bar.
2. **Faceted Filter Dropdowns**: Multi-select options for Status (`Pending`, `Paid`, `Shipped`, `Cancelled`), Payment Method, Date Ranges (Today, Last 7 Days, This Month, Custom).
3. **Active Filter Badges (Pills)**: Visual pills render below the search bar. Each pill features an animated dismiss button (`x`), plus a **"Reset All Filters"** trigger.

---

## ↕️ 4. Dynamic Column Sorting System

### 4.1 Permitted Sortable Columns Rule
- Sorting is enabled ONLY on structured, comparable columns:
  - Numeric values: `Amount`, `Quantity`, `Price`, `Tax`.
  - Temporal values: `Date`, `Updated At`, `Due Date`.
  - Lexicographical values: `Order ID`, `Customer Name`, `SKU`, `Status`.
- Sorting is **STRICTLY DISABLED** on decorative or action columns (e.g. Checkbox selector, Avatar image, Action buttons).

### 4.2 Tri-State Sort Logic & UI Headers
Each sortable column header cycles through 3 states upon click or `Enter` key:
1. **Neutral (`null`)**: Bi-directional light arrows (`↕`).
2. **Ascending (`asc`)**: Upward arrow with sky cyan glow (`↑`).
3. **Descending (`desc`)**: Downward arrow with sky cyan glow (`↓`).

```tsx
export const SortableHeader: React.FC<{
  label: string;
  columnKey: string;
  currentSortKey: string | null;
  sortDirection: "asc" | "desc" | null;
  onSort: (columnKey: string) => void;
}> = ({ label, columnKey, currentSortKey, sortDirection, onSort }) => {
  const isActive = currentSortKey === columnKey;

  return (
    <th
      onClick={() => onSort(columnKey)}
      className="px-4 py-3.5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider cursor-pointer select-none hover:text-sky-500 transition-colors group"
    >
      <div className="flex items-center gap-1.5">
        <span>{label}</span>
        <span className="flex flex-col text-[10px] leading-[8px] transition-transform">
          <span className={isActive && sortDirection === "asc" ? "text-sky-400 font-extrabold" : "text-slate-400 group-hover:text-slate-200"}>▲</span>
          <span className={isActive && sortDirection === "desc" ? "text-sky-400 font-extrabold" : "text-slate-400 group-hover:text-slate-200"}>▼</span>
        </span>
      </div>
    </th>
  );
};
```

---

## 🖱️ 5. Google Drive-Style Marquee Drag Selection Engine

### 5.1 User Experience & Mechanics
- **Canvas Dragging**: Holding the left mouse button down on any empty space inside the table body or card container and moving the pointer generates a translucent, glowing blue bounding box.
- **Visual Marquee Box**:
  - Class: `border border-sky-400 bg-sky-500/15 backdrop-blur-[1px] pointer-events-none rounded-sm`.
- **AABB Collision / Intersection Algorithm**:
  - Every selectable row (`<tr data-selectable-id="...">`) or card (`<div data-selectable-id="...">`) has its bounding rect measured via `getBoundingClientRect()`.
  - Any element whose bounding box intersects with the mouse drag rectangle is immediately added to the active selection set in real-time.
- **Modifier Keys**:
  - `Shift + Drag`: Adds intersected items to already selected items (union).
  - `Ctrl + Drag`: Inverts the selection of intersected items.
  - Normal Drag: Clears previous selection and selects only newly enclosed items.
  - `Escape`: Cancels selection and clears all checked items.

### 5.2 Production Hook: `useDragSelect.ts`

```typescript
"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export interface Rect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export function useDragSelect(containerRef: React.RefObject<HTMLElement | null>, onSelectionChange: (selectedIds: string[]) => void) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectionBox, setSelectionBox] = useState<{ startX: number; startY: number; currentX: number; currentY: number } | null>(null);
  const initialSelectionRef = useRef<Set<string>>(new Set());

  // Check if two Axis-Aligned Bounding Boxes (AABB) intersect
  const checkIntersection = (r1: Rect, r2: Rect) => {
    return !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
  };

  const handleMouseDown = useCallback((e: MouseEvent) => {
    // Only trigger on primary left click
    if (e.button !== 0 || !containerRef.current) return;

    // Do not initiate drag if user clicked directly on interactive elements
    const target = e.target as HTMLElement;
    if (["BUTTON", "INPUT", "A", "SELECT", "TEXTAREA"].includes(target.tagName) || target.closest("button") || target.closest("input")) {
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    setIsDragging(true);
    setSelectionBox({ startX: x, startY: y, currentX: x, currentY: y });

    // Store existing selection if Shift is held
    if (e.shiftKey) {
      // Keep existing selection
    } else {
      initialSelectionRef.current.clear();
      onSelectionChange([]);
    }
  }, [containerRef, onSelectionChange]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !selectionBox || !containerRef.current) return;

    setSelectionBox((prev) => prev ? { ...prev, currentX: e.clientX, currentY: e.clientY } : null);

    const dragRect: Rect = {
      left: Math.min(selectionBox.startX, e.clientX),
      top: Math.min(selectionBox.startY, e.clientY),
      right: Math.max(selectionBox.startX, e.clientX),
      bottom: Math.max(selectionBox.startY, e.clientY),
    };

    // Find all selectable items within container
    const selectableElements = containerRef.current.querySelectorAll("[data-selectable-id]");
    const selected = new Set<string>(initialSelectionRef.current);

    selectableElements.forEach((el) => {
      const itemRect = el.getBoundingClientRect();
      const id = el.getAttribute("data-selectable-id");
      if (!id) return;

      if (checkIntersection(dragRect, itemRect)) {
        selected.add(id);
      }
    });

    onSelectionChange(Array.from(selected));
  }, [isDragging, selectionBox, containerRef, onSelectionChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setSelectionBox(null);
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    node.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      node.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp, containerRef]);

  return { isDragging, selectionBox };
}
```

### 5.3 Marquee Overlay Component (`DragSelectOverlay.tsx`)

```tsx
export const DragSelectOverlay: React.FC<{
  box: { startX: number; startY: number; currentX: number; currentY: number } | null;
}> = ({ box }) => {
  if (!box) return null;

  const left = Math.min(box.startX, box.currentX);
  const top = Math.min(box.startY, box.currentY);
  const width = Math.abs(box.currentX - box.startX);
  const height = Math.abs(box.currentY - box.startY);

  return (
    <div
      style={{
        position: "fixed",
        left,
        top,
        width,
        height,
        zIndex: 9999,
      }}
      className="border border-sky-400 bg-sky-500/15 backdrop-blur-[1px] rounded-sm pointer-events-none shadow-glow-sky"
    />
  );
};
```

---

## 📦 6. Multi-Selection & "Select on All Other Pages" Architecture

### 6.1 Current Page vs Global Dataset Selection
Standard checkbox systems only select the 25 items on the currently visible page. This framework implements a **two-tier master selection state**:

1. **Step 1**: User checks the header checkbox or presses `Ctrl + A`.
   - All 25 items on the current page are marked selected.
2. **Step 2**: An animated informational banner instantly appears above the table / cards:
   > ℹ️ *All 25 items on this page are selected.*  
   > `[ Button: Select all 1,450 items across all other pages ]`
3. **Step 3**: If the user clicks **"Select all 1,450 items"**:
   - The selection state transitions to `{ mode: "ALL", totalCount: 1450 }`.
   - The banner updates to:
   > ⚡ *All 1,450 items across all pages are selected.* `[ Button: Clear Selection ]`
4. Any bulk operation executed in this state (Bulk Delete, Bulk PDF, Bulk Email, Bulk WhatsApp) dispatches a backend task using the active search/filter criteria rather than a payload of 1,450 individual IDs.

```tsx
export const SelectAllPagesBanner: React.FC<{
  pageCount: number;
  totalRecords: number;
  isAllPagesSelected: boolean;
  onSelectAllPages: () => void;
  onClearSelection: () => void;
}> = ({ pageCount, totalRecords, isAllPagesSelected, onSelectAllPages, onClearSelection }) => {
  if (pageCount === 0) return null;

  return (
    <div className="flex items-center justify-center gap-3 py-2.5 px-4 mb-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 text-xs text-sky-900 dark:text-sky-200 transition-all">
      {!isAllPagesSelected ? (
        <>
          <span>All <strong>{pageCount}</strong> items on this page are selected.</span>
          <button
            onClick={onSelectAllPages}
            className="font-bold underline text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 cursor-pointer"
          >
            Select all {totalRecords.toLocaleString()} items across all pages
          </button>
        </>
      ) : (
        <>
          <span>⚡ All <strong>{totalRecords.toLocaleString()}</strong> items across all pages are currently selected.</span>
          <button
            onClick={onClearSelection}
            className="font-bold underline text-rose-500 hover:text-rose-600 cursor-pointer"
          >
            Clear selection
          </button>
        </>
      )}
    </div>
  );
};
```

---

## ⚡ 7. Floating Bulk Action Toolbar & Mandatory Animated Icons

Whenever `selectedIds.length > 0`, a glassmorphic floating pill action bar animates up from the bottom center of the screen.

### 7.1 Mandatory Animated Icons Rule
Every button in the Bulk Action Toolbar **MUST** contain an animated icon:
- **Delete All**: Animated Morphing Trash Can (lid flies open on hover via Lordicon or Framer Motion SVG).
- **Bulk PDF Download**: Animated Document / File Downloader with bouncing arrow.
- **Bulk Send Email**: Animated Flying Envelope / Mail morph.
- **Bulk Send WhatsApp**: Animated WhatsApp Speech Bubble with pulsing wave.

### 7.2 Bulk Action Toolbar Implementation (`BulkActionToolbar.tsx`)

```tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, FileDown, Mail, MessageCircle, X } from "lucide-react";
import { Kbd } from "@/components/ui/Kbd";

interface BulkActionToolbarProps {
  selectedCount: number;
  isAllPagesSelected: boolean;
  onClear: () => void;
  onBulkDelete: () => void;
  onBulkPdf: () => void;
  onBulkEmail: () => void;
  onBulkWhatsApp: () => void;
}

export const BulkActionToolbar: React.FC<BulkActionToolbarProps> = ({
  selectedCount,
  isAllPagesSelected,
  onClear,
  onBulkDelete,
  onBulkPdf,
  onBulkEmail,
  onBulkWhatsApp,
}) => {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 sm:gap-4 px-5 py-3 rounded-2xl bg-slate-900/90 dark:bg-slate-900/95 text-white border border-sky-400/30 backdrop-blur-2xl shadow-2xl shadow-sky-500/10"
        >
          {/* Selected Counter Badge */}
          <div className="flex items-center gap-2 pr-3 border-r border-slate-700">
            <span className="flex h-2.5 w-2.5 rounded-full bg-sky-400 animate-ping" />
            <span className="text-xs font-bold whitespace-nowrap">
              {isAllPagesSelected ? "All" : selectedCount} Selected
            </span>
          </div>

          {/* Action Buttons with Animated Micro-Interactions */}
          <div className="flex items-center gap-2">
            {/* Bulk Delete */}
            <button
              onClick={onBulkDelete}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 transition-all text-xs font-semibold cursor-pointer"
              title="Delete Selected (Alt + D)"
            >
              <Trash2 className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-12 group-hover:scale-110" />
              <span>Delete</span>
              <span className="hidden md:inline"><Kbd>Alt+D</Kbd></span>
            </button>

            {/* Bulk PDF Export */}
            <button
              onClick={onBulkPdf}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500 text-sky-300 hover:text-white border border-sky-500/30 transition-all text-xs font-semibold cursor-pointer"
              title="Bulk PDF Download (Alt + E)"
            >
              <FileDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
              <span>PDF</span>
              <span className="hidden md:inline"><Kbd>Alt+E</Kbd></span>
            </button>

            {/* Bulk Email */}
            <button
              onClick={onBulkEmail}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/15 hover:bg-indigo-500 text-indigo-300 hover:text-white border border-indigo-500/30 transition-all text-xs font-semibold cursor-pointer"
              title="Bulk Send Email (Alt + M)"
            >
              <Mail className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
              <span>Email</span>
              <span className="hidden md:inline"><Kbd>Alt+M</Kbd></span>
            </button>

            {/* Bulk WhatsApp */}
            <button
              onClick={onBulkWhatsApp}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-white border border-emerald-500/30 transition-all text-xs font-semibold cursor-pointer"
              title="Bulk Send WhatsApp (Alt + W)"
            >
              <MessageCircle className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
              <span>WhatsApp</span>
              <span className="hidden md:inline"><Kbd>Alt+W</Kbd></span>
            </button>
          </div>

          {/* Dismiss Button */}
          <button
            onClick={onClear}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="Clear Selection (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
```

---

## 📱 8. Mobile & Desktop Card Rendering Architecture (`DataCardView.tsx`)

On screen sizes `< 1024px`, the system renders the mobile card grid. Each card:
1. Has attribute `data-selectable-id={item.id}` for marquee selection compatibility.
2. Contains an animated checkbox for manual touch toggling.
3. Features glowing borders when selected (`border-sky-500 ring-2 ring-sky-500/20 bg-sky-500/5`).
4. Shows primary metric (e.g. Total Amount / Price), status badge, customer name, and quick-action icon.

```tsx
export const MobileDataCard: React.FC<{
  item: any;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onOpenDetails: (item: any) => void;
}> = ({ item, isSelected, onToggleSelect, onOpenDetails }) => {
  return (
    <div
      data-selectable-id={item.id}
      onClick={() => onOpenDetails(item)}
      className={`relative p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
        isSelected
          ? "border-sky-400 bg-sky-500/10 shadow-glow-sky"
          : "border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-white/20"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Selection Checkbox */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect(item.id);
          }}
          className="pt-0.5"
        >
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => {}}
            className="w-4 h-4 rounded text-sky-500 focus:ring-sky-400 border-slate-300 dark:border-slate-700 cursor-pointer"
          />
        </div>

        {/* Card Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-sky-500">{item.code || item.id}</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {item.status}
            </span>
          </div>
          <h4 className="mt-1 font-semibold text-sm text-slate-900 dark:text-white truncate">
            {item.title || item.customerName}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {item.date || item.createdAt}
          </p>
        </div>

        {/* Value Metric */}
        {item.amount && (
          <div className="text-right">
            <span className="text-sm font-extrabold text-slate-900 dark:text-white">
              {item.amount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
```

---

## 🛡️ 9. Verification & Best Practice Checklist

1. [ ] **Responsive Switch Verified**: Table is hidden on viewports `< 1024px` (`hidden lg:block`), and Cards are hidden on viewports `>= 1024px` (`block lg:hidden`).
2. [ ] **Pagination Loading State Verified**: Navigation buttons display animated loader while fetching, and prevent double-clicks.
3. [ ] **Arrow Navigation Verified**: `ArrowLeft` and `ArrowRight` switch pages without firing inside text inputs.
4. [ ] **Marquee Box Selection Verified**: Clicking and dragging on canvas draws rectangle and selects intersected items in both table rows and cards.
5. [ ] **"Select on All Other Pages" Verified**: Selecting all visible rows shows the cross-page banner allowing full dataset selection.
6. [ ] **Bulk Action Bar Verified**: Slides in smoothly on selection with animated icons for Delete, PDF, Email, and WhatsApp.

---

## 🌐 10. Model Context Integration & Zero-Ad-Hoc API Architecture

Cross-referenced with [`rules/MODELS_AND_CONTEXTS_ARCHITECTURE.md`](../rules/MODELS_AND_CONTEXTS_ARCHITECTURE.md).

> 🚫 **THE "ZERO DIRECT COMPONENT API CALLS" DIRECTIVE**:
> Neither the Master Data Table nor the Mobile Card Grid should ever make direct HTTP requests (`fetch` / `axios`) for fetching records, updating status, or triggering bulk exports.
>
> All actions, mutations, and filter states **MUST BE ORCHESTRATED EXCLUSIVELY VIA THE MODEL'S REACT CONTEXT** (e.g. `useProgram()` or `useOrder()`).

### 10.1 Real-World Integration Example: `<ProgramManagementView />`
```tsx
// components/programs/ProgramManagementView.tsx
"use client";

import React, { useState } from "react";
import { useProgram } from "@/context/ProgramContext";
import { MasterDataTable } from "@/components/ui/MasterDataTable";
import { MobileCardGrid } from "@/components/ui/MobileCardGrid";
import { BulkActionBar } from "@/components/ui/BulkActionBar";

export const ProgramManagementView: React.FC = () => {
  // 1. Consume shared state and methods directly from ProgramContext
  const {
    programs,
    isLoading,
    filters,
    setFilters,
    downloadProgramPdf,
    sendProgramEmail,
    deleteProgram,
    bulkUpdateProgramStatus,
  } = useProgram();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Bulk PDF action triggers context method (never raw fetch in component)
  const handleBulkPdfDownload = async () => {
    for (const id of selectedIds) {
      await downloadProgramPdf(id);
    }
  };

  // Bulk Status Change triggers context method
  const handleBulkStatusChange = async (status: any) => {
    await bulkUpdateProgramStatus(selectedIds, status);
    setSelectedIds([]); // Clear selection upon completion
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Search & Filter Bar directly sets context filters */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search programs..."
          value={filters.search || ""}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800"
        />
      </div>

      {/* Desktop Master Data Table (Consumed from Context with FabricFoldRow support) */}
      <div className="hidden lg:block">
        <MasterDataTable
          items={programs}
          isLoading={isLoading}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          onDelete={(id, title) => requestDelete({ id, title, type: 'single' })}
          onDownloadPdf={(id) => downloadProgramPdf(id)}
          animatingDeleteIds={animatingDeleteIds}
        />
      </div>

      {/* Mobile Interactive Cards Grid (Consumed from SAME Context with FabricFoldCard support) */}
      <div className="block lg:hidden">
        <MobileCardGrid
          items={programs}
          isLoading={isLoading}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          onDelete={(id, title) => requestDelete({ id, title, type: 'single' })}
          onDownloadPdf={(id) => downloadProgramPdf(id)}
          animatingDeleteIds={animatingDeleteIds}
        />
      </div>

      {/* Floating Bulk Action Bar with Confirmation Handshake */}
      {selectedIds.length > 0 && (
        <BulkActionBar
          selectedCount={selectedIds.length}
          onBulkDelete={() => requestDelete({ id: 'bulk', title: 'Selected Items', type: 'bulk', bulkIds: selectedIds })}
          onDownloadPdf={handleBulkPdfDownload}
          onUpdateStatus={handleBulkStatusChange}
          onClearSelection={() => setSelectedIds([])}
        />
      )}

      {/* 4. Screen-Level Apple Genie Trash Bin Portal (Emerges from right viewport edge during deletion) */}
      <GenieTrashBinPortal
        isActive={isDustbinActive}
        items={animatingDeleteSnapshots}
        onAnimationComplete={handleGenieAnimationComplete}
      />

      {/* 5. Delete Confirmation Modal with In-Modal Task Animation */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        target={modalTarget}
        onClose={closeModal}
        onConfirm={confirmDelete}
        onSuccessToast={() => toast.success("Records permanently deleted from database.")}
        onErrorToast={(err) => toast.error(err?.message || "Failed to delete.")}
      />
    </div>
  );
};
```

### 10.2 Architectural Benefits & Deletion Synchronization:
1. **Single Source of Truth**: Both the Desktop Table and Mobile Card views subscribe to the same `programs` array in memory.
2. **Screen-Coordinate Elevation**: To bypass the table's `overflow: hidden` and `overflow-x: auto` boundary clipping, deleting rows/cards are elevated into a fixed Screen-Level Portal (`fixed inset-0 z-[99999]`) via `getBoundingClientRect()`.
3. **Coordinated Physical Deletion**: Clicking delete opens `<DeleteConfirmationModal />`. On confirm, the modal's button loops its task animation. Upon API confirmation, the Success Toast fires, the modal dismisses, the right-side **Genie Trash Bin rushes in from the screen edge with spring kinetic velocity**, its motorized lid swings open (`rotate: -55deg`), and the elevated rows/cards **execute a 3D vacuum squeeze (`scaleX: 0.1, rotateX: 65deg`) directly into the glowing bin aperture** per [`design-system/APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md`](../design-system/APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md).
4. **Immediate In-Place Re-Rendering**: When the bin lid slams shut with elastic bounce, `ProgramContext` mutates its state immutably (`setPrograms`). **Both table rows and mobile cards vanish, and remaining items glide up into position via Framer Motion FLIP (`layout`) with ZERO page reloading**.
5. **No Redundant Fetching**: Switching views, opening detail drawers, or navigating between tabs reuses the existing context state without firing repeated API calls. Subsequent new records created or fetched immediately reflect in this same array.

