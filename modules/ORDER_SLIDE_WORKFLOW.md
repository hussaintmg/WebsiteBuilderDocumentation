# Module Specification: Dual-View Order Management & Slide Carousel Workflow

> **PURPOSE**: Provides a high-efficiency order management workflow combining an exhaustive data table with a distraction-free, 1-by-1 slide/carousel review interface for Staff and Owners.

---

## 🔄 1. Dual-View Architecture Overview

```
┌────────────────────────────────────────────────────────────────────────┐
│                        VIEW 1: MASTER ORDER TABLE                      │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Filters: [All Statuses ▼] [Payment Status ▼] [Search: ord_...    ] │ │
│ │ Buttons: [Export CSV]                  [🔥 Start Processing Mode]  │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ │ ID       │ Customer       │ Total   │ Status     │ Date   │ Action │ │
│ │ #1001    │ Sarah Jenkins  │ $120.00 │ Pending    │ 10m ago│ View   │ │
│ │ #1002    │ Ahmed Khan     │ $45.50  │ Processing │ 25m ago│ View   │ │
│ │ #1003    │ Elena Rostova  │ $310.00 │ Paid       │ 1h ago │ View   │ │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                       Click "Start Processing"
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

## 🗃️ 2. View 1: Master Order Table (`OrderTableView.tsx`)

### Key Features:
- Real-time search by Customer Name, Phone, Email, or Order ID.
- Multi-filter tabs: `All`, `Pending Review`, `Processing`, `Completed`, `Cancelled`.
- Column sorting (Amount, Date, Status).
- Prominent **"Start Processing"** primary button triggers Slide Mode.

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
import styles from "./OrderActionPanel.module.css";

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
    <div className={styles.actionPanel}>
      {/* 1. Payment Toggle */}
      <button
        id="order-toggle-payment-btn"
        className={order.isPaid ? styles.btnPaid : styles.btnUnpaid}
        onClick={() => onUpdatePayment(order.id, !order.isPaid)}
        disabled={loading}
      >
        {order.isPaid ? "✓ Paid" : "Mark as Paid"}
      </button>

      {/* 2. Process / Shipped Action */}
      <button
        id="order-advance-status-btn"
        className={styles.btnPrimary}
        onClick={() => handleStatusChange("PROCESSING")}
        disabled={loading || order.status === "PROCESSING"}
      >
        Approve & Process →
      </button>

      {/* 3. Owner-Only Price Override Guard */}
      <ActionGuard permission="orders:override_price">
        <button
          id="order-override-price-btn"
          className={styles.btnSecondary}
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
          className={styles.btnDanger}
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

## 🎨 5. Glassmorphism Slide Card Styling (`OrderSlideModal.module.css`)

```css
.slideBackdrop {
  position: fixed;
  inset: 0;
  background: rgba(7, 9, 14, 0.85);
  backdrop-filter: blur(12px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.slideCard {
  width: 100%;
  max-width: 900px;
  background: var(--bg-surface, #0f141f);
  border: 1px solid var(--border-glass, rgba(255, 255, 255, 0.12));
  border-radius: var(--radius-lg, 16px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.slideHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.75rem;
  border-bottom: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
}

.navArrows {
  display: flex;
  gap: 0.5rem;
}

.navBtn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.navBtn:hover:not(:disabled) {
  background: var(--accent-primary, #38bdf8);
  color: #07090e;
}

.actionPanel {
  display: flex;
  gap: 0.75rem;
  padding: 1.25rem 1.75rem;
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid var(--border-subtle);
  flex-wrap: wrap;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.97);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```
