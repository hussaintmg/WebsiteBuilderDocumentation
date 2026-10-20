# Module Specification: Dual-View Order Management & Slide Carousel Workflow

> **PURPOSE**: Provides a high-efficiency order management workflow combining an exhaustive data table with a distraction-free, 1-by-1 slide/carousel review interface for Staff and Owners.

---

## 🔄 1. Dual-View Architecture Overview

```
┌────────────────────────────────────────────────────────────────────────┐
│                        VIEWPORT DETECTION                              │
│         Screen >= 1024px (Desktop)         Screen < 1024px (Mobile)    │
│                     │                                  │               │
│                     ▼                                  ▼               │
│      [VIEW 1A: MASTER ORDER TABLE]      [VIEW 1B: MOBILE CARDS GRID]   │
│         Class: `hidden lg:block`           Class: `block lg:hidden`    │
│                                                                        │
│  • Google Drive Marquee Drag Selection (Box select across rows/cards)  │
│  • Tri-state Column Sorting (Amount, Date, Status, Customer)           │
│  • Arrow-Key Pagination (← / →) with Animated Spinner Button Loaders   │
│  • Two-Tier Selection: Current Page vs "Select on all other pages"     │
│  • Floating Bulk Action Bar (Delete, Bulk PDF, Email, WhatsApp)        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                        Click "Start Processing" (or press Enter)
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│               VIEW 2: FOCUSED 1-BY-1 SLIDE REVIEW CAROUSEL             │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ ◄ Prev Order (←)         Order 4 of 28 (Pending)    Next Order (→) ► │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│ ┌─────────────────────────────┐ ┌────────────────────────────────────┐ │
│ │ Customer & Shipping Info    │ │ Ordered Items Breakdown            │ │
│ │ • Name: Ahmed Khan          │ │ • 2x Premium Wireless Headphones   │ │
│ │ • Phone: +92 300 1234567    │ │ • 1x Fast USB-C Cable              │ │
│ │ • Address: Karachi, PK      │ │ Subtotal: $45.50 | Tax: $4.00      │ │
│ └─────────────────────────────┘ └────────────────────────────────────┘ │
│                                                                        │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ RAPID ACTION PANEL:                                                │ │
│ │ [ 🏷️ Edit Price ] [ 💳 Mark Paid ] [ 🚚 Mark Shipped ] [ ❌ Cancel ]│ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│ Hotkeys: [← / →] Navigate Slides | [Ctrl+Enter] Approve | [Esc] Exit   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🗃️ 2. View 1: Master Order Table & Mobile Cards Hybrid Engine

Cross-referenced with [`modules/DATA_TABLE_AND_CARDS_SYSTEM.md`](./DATA_TABLE_AND_CARDS_SYSTEM.md) and [`modules/SHORTCUT_KEYS_SYSTEM.md`](./SHORTCUT_KEYS_SYSTEM.md).

### 2.1 Viewport Separation
- **Desktop (`lg:`, `>= 1024px`)**: Renders `OrderTableView.tsx` (`hidden lg:block`). Displays rich columns (Order ID, Customer, Items count, Total Amount, Payment Status, Order Status, Created Date, Actions).
- **Mobile & Tablet (`< 1024px`)**: Renders `OrderCardView.tsx` (`block lg:hidden`). Compact touch-friendly cards with status badges and quick action buttons.

### 2.2 Google Drive-Style Marquee Drag Selection
- Staff can click and drag anywhere on the order container to draw an interactive bounding box (`border-sky-400 bg-sky-500/15`).
- Intersecting orders are selected in real-time.
- `Shift + Drag` adds to selection; `Ctrl + Drag` toggles selection; `Escape` clears selection.

### 2.3 Smart Arrow Pagination with Loading Spinners
- Hotkeys: `ArrowLeft` flips to previous page, `ArrowRight` flips to next page.
- While fetching, navigation buttons show `Loader2 animate-spin` and are disabled to prevent double-click race conditions.

### 2.4 Floating Bulk Action Bar & Mandatory Animated Icons
When orders are selected:
1. Shows **"Select on all other pages"** banner if current page is full.
2. Floating bar features buttons with **mandatory animated icons**:
   - **Bulk Delete** (`Alt + D`): Lordicon animated trash can + safety prompt.
   - **Bulk PDF Download** (`Alt + E`): Animated document downloader (invoices/packing slips).
   - **Bulk Send Email** (`Alt + M`): Animated flying email envelope (order updates).
   - **Bulk Send WhatsApp** (`Alt + W`): Animated pulsing WhatsApp bubble (tracking info).

---

## 🎠 3. View 2: Focused 1-by-1 Slide Review Carousel (`OrderSlideModal.tsx`)

When Staff or Owner clicks **"Start Processing"**, the interface smoothly transitions into full-screen focus mode.

### 3.1 Carousel State & Hotkey Controller

```typescript
// hooks/useOrderCarousel.ts
import { useState, useEffect, useCallback } from "react";
import { Order } from "@/types/order";

export function useOrderCarousel(orders: Order[], initialIndex = 0) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const currentOrder = orders[currentIndex] || null;
  const hasNext = currentIndex < orders.length - 1;
  const hasPrev = currentIndex > 0;

  const goToNext = useCallback(() => {
    if (hasNext) setCurrentIndex((prev) => prev + 1);
  }, [hasNext]);

  const goToPrev = useCallback(() => {
    if (hasPrev) setCurrentIndex((prev) => prev - 1);
  }, [hasPrev]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing inside an input or textarea
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  return {
    currentIndex,
    totalCount: orders.length,
    currentOrder,
    goToNext,
    goToPrev,
    hasNext,
    hasPrev,
  };
}
```

---

## ⚡ 4. Rapid Action Panel & RBAC Button Guards

Within the slide view, rapid action buttons allow staff to update records without opening secondary pages:

```tsx
// components/orders/OrderActionPanel.tsx
import React, { useState } from "react";
import { Order } from "@/types/order";
import { ActionGuard } from "@/components/common/ActionGuard";

interface Props {
  order: Order;
  onUpdateStatus: (orderId: string, newStatus: string) => Promise<void>;
  onUpdatePayment: (orderId: string, paid: boolean) => Promise<void>;
  onPriceOverride: (orderId: string, newPrice: number) => Promise<void>;
  onNext: () => void;
}

export const OrderActionPanel: React.FC<Props> = ({
  order,
  onUpdateStatus,
  onUpdatePayment,
  onPriceOverride,
  onNext,
}) => {
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (status: string) => {
    setLoading(true);
    await onUpdateStatus(order.id, status);
    setLoading(false);
    onNext(); // Auto-advance to next order after action
  };

  return (
    <div className="flex flex-wrap items-center gap-3 p-5 bg-slate-950/40 border-t border-slate-200/80 dark:border-white/10">
      {/* 1. Payment Toggle */}
      <button
        id="order-toggle-payment-btn"
        className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 active:scale-95 shadow-sm ${
          order.isPaid
            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
            : "bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30"
        }`}
        onClick={() => onUpdatePayment(order.id, !order.isPaid)}
        disabled={loading}
      >
        {order.isPaid ? "✓ Paid" : "Mark as Paid"}
      </button>

      {/* 2. Process / Shipped Action */}
      <button
        id="order-advance-status-btn"
        className="px-5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 active:scale-95 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 shadow-md hover:shadow-glow-sky disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handleStatusChange("PROCESSING")}
        disabled={loading || order.status === "PROCESSING"}
      >
        Approve & Process →
      </button>

      {/* 3. Owner-Only Price Override Guard */}
      <ActionGuard permission="orders:override_price">
        <button
          id="order-override-price-btn"
          className="px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 active:scale-95 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10"
          onClick={() => {
            const newPrice = prompt("Enter adjusted price:", String(order.totalAmount));
            if (newPrice) onPriceOverride(order.id, parseFloat(newPrice));
          }}
        >
          🏷️ Override Price
        </button>
      </ActionGuard>

      {/* 4. Cancel Action */}
      <ActionGuard permission="orders:edit">
        <button
          id="order-cancel-btn"
          className="px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 active:scale-95 bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30"
          onClick={() => handleStatusChange("CANCELLED")}
          disabled={loading}
        >
          Cancel Order
        </button>
      </ActionGuard>
    </div>
  );
};
```

---

## 🎨 5. Glassmorphic Slide Card Implementation (Tailwind CSS + Framer Motion)

```tsx
// components/orders/OrderSlideModal.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Order } from "@/types/order";
import { OrderActionPanel } from "./OrderActionPanel";

interface Props {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalCount: number;
  onUpdateStatus: (id: string, status: string) => Promise<void>;
  onUpdatePayment: (id: string, paid: boolean) => Promise<void>;
  onPriceOverride: (id: string, price: number) => Promise<void>;
}

export const OrderSlideModal: React.FC<Props> = ({
  order,
  isOpen,
  onClose,
  onNext,
  onPrev,
  currentIndex,
  totalCount,
  onUpdateStatus,
  onUpdatePayment,
  onPriceOverride,
}) => {
  if (!isOpen || !order) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="w-full max-w-4xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-3xl shadow-glass-dark overflow-hidden flex flex-col max-h-[90dvh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 font-semibold">
                Order #{order.id}
              </span>
              <span className="text-xs text-slate-400">
                ({currentIndex + 1} of {totalCount} Pending)
              </span>
            </div>

            {/* Carousel Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={onPrev}
                disabled={currentIndex === 0}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                title="Previous Order (←)"
              >
                ◄ Prev
              </button>
              <button
                onClick={onNext}
                disabled={currentIndex === totalCount - 1}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                title="Next Order (→)"
              >
                Next ►
              </button>
              <button
                onClick={onClose}
                className="ml-2 text-slate-400 hover:text-white cursor-pointer text-lg p-1"
                title="Close (Esc)"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Box */}
              <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 space-y-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Customer Details</h4>
                <p className="text-base font-bold text-white">{order.customerName}</p>
                <p className="text-sm text-slate-300">{order.customerPhone}</p>
                <p className="text-sm text-slate-400">{order.shippingAddress}</p>
              </div>

              {/* Order Summary Box */}
              <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 space-y-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Financial Overview</h4>
                <div className="flex justify-between text-sm text-slate-300">
                  <span>Subtotal:</span>
                  <span>${order.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-300">
                  <span>Shipping:</span>
                  <span>${order.shippingFee}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-sky-400 border-t border-white/10 pt-2">
                  <span>Total Amount:</span>
                  <span>${order.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Panel Footer */}
          <OrderActionPanel
            order={order}
            onUpdateStatus={onUpdateStatus}
            onUpdatePayment={onUpdatePayment}
            onPriceOverride={onPriceOverride}
            onNext={onNext}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
```
