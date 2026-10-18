# Developer Payment Safeguard Rule & Client Billing Banner

> **CONTEXT**: This is a default platform rule for client projects. It guarantees developer hosting and maintenance fee visibility without disrupting the client's end users or operational staff.

---

## 🎯 Core Principles & Security Constraints

1. **Owner-Only Visibility**:
   - The payment status banner must **ONLY** ever be rendered for authenticated users with the `Owner` role.
   - Under no circumstances should `Customer`, `Staff / Employee`, or public anonymous visitors ever see or have DOM access to this banner.
2. **Grace Period Rule (The 8th of the Month)**:
   - For monthly billing cycles, the client has a built-in grace period until the **8th calendar day of each month**.
   - If payment is pending on or before the 8th: A clean, respectful, non-blocking notification bar is displayed at the top of the Owner's dashboard.
   - If payment is pending after the 8th: The banner switches to an urgent payment resolution status.
3. **Zero Impact on Business Operations**:
   - The banner must never crash the application.
   - If the developer licensing API is unreachable or times out, the system **fails open** (`paymentClear: true` as fallback) or logs silently, preventing accidental downtime for the client.

---

## 📡 API Contract (Abstract Developer Specification)

The client application periodically pings the developer license/payment verification endpoint (or an environment-configured webhook):

### Request
```http
GET /api/system/billing-status
Headers:
  Authorization: Bearer <tenant_or_client_token>
```

### Expected Response Format
```json
{
  "paymentClear": true,
  "billingCycle": "monthly",
  "currentPeriod": "2026-10",
  "graceDate": 8,
  "portalUrl": "https://billing.developer.com/invoices/inv_123",
  "contactEmail": "developer@platform.com"
}
```

---

## 🧠 Business Logic & State Evaluation

```typescript
export interface BillingStatus {
  paymentClear: boolean;
  billingCycle?: "monthly" | "annual";
  graceDate?: number; // Default 8
  portalUrl?: string;
}

export function evaluatePaymentState(
  billing: BillingStatus | null,
  userRole: string
): "CLEAR" | "GRACE_PERIOD_NOTICE" | "OVERDUE_NOTICE" {
  // 1. Guard: Only Owner can see payment notices
  if (userRole !== "Owner" && userRole !== "owner") {
    return "CLEAR";
  }

  // 2. If status is missing or already cleared, render nothing
  if (!billing || billing.paymentClear) {
    return "CLEAR";
  }

  // 3. Evaluate Day of the Month
  const today = new Date().getDate();
  const graceDay = billing.graceDate || 8;

  if (today <= graceDay) {
    return "GRACE_PERIOD_NOTICE";
  } else {
    return "OVERDUE_NOTICE";
  }
}
```

---

## 🎨 UI Implementation Specification

### React / Next.js Component Blueprint (`OwnerPaymentBanner.tsx`)

```tsx
"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useBillingStatus } from "@/hooks/useBillingStatus";
import { evaluatePaymentState } from "@/lib/billingGuard";
import styles from "./OwnerPaymentBanner.module.css";

export const OwnerPaymentBanner: React.FC = () => {
  const { user } = useAuth();
  const { data: billing, isLoading } = useBillingStatus();

  if (isLoading || !user) return null;

  const state = evaluatePaymentState(billing, user.role);

  if (state === "CLEAR") return null;

  const isGracePeriod = state === "GRACE_PERIOD_NOTICE";

  return (
    <aside
      className={`${styles.paymentBanner} ${
        isGracePeriod ? styles.graceBanner : styles.overdueBanner
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className={styles.content}>
        <span className={styles.icon}>{isGracePeriod ? "ℹ️" : "⚠️"}</span>
        <p className={styles.message}>
          {isGracePeriod ? (
            <>
              <strong>Notice for Account Owner:</strong> Scheduled monthly hosting
              & maintenance fee is pending. Please complete payment before the{" "}
              <strong>8th of this month</strong> to ensure uninterrupted service.
            </>
          ) : (
            <>
              <strong>Payment Urgent:</strong> The monthly service invoice for this
              account is past the 8th grace date. Please settle payment immediately.
            </>
          )}
        </p>
      </div>

      <div className={styles.actions}>
        {billing?.portalUrl && (
          <a
            href={billing.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.payButton}
          >
            Review & Settle Invoice →
          </a>
        )}
      </div>
    </aside>
  );
};
```

### CSS Design Tokens (`OwnerPaymentBanner.module.css`)

```css
.paymentBanner {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  font-family: var(--font-sans, system-ui, sans-serif);
  font-size: 0.875rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.graceBanner {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: #f1f5f9;
  border-bottom: 2px solid #38bdf8; /* Cyan accent */
}

.overdueBanner {
  background: linear-gradient(135deg, #450a0a 0%, #1c0505 100%);
  color: #fef2f2;
  border-bottom: 2px solid #ef4444; /* Alert red */
}

.content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icon {
  font-size: 1.1rem;
}

.message {
  margin: 0;
  line-height: 1.4;
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.payButton {
  padding: 0.4rem 0.9rem;
  background-color: #38bdf8;
  color: #0b0f19;
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.8125rem;
  transition: all 0.2s ease;
}

.payButton:hover {
  background-color: #7dd3fc;
  transform: translateY(-1px);
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
```

---

## 🧪 Verification & Acceptance Tests

1. **Role Access Verification**:
   - Login as `Staff`: Verify banner is NOT in DOM.
   - Login as `Customer`: Verify banner is NOT in DOM.
   - Public landing page: Verify banner is NOT in DOM.
   - Login as `Owner`: If `paymentClear == false`, verify banner appears pinned at top.
2. **Date Logic Verification**:
   - Set mock date to 5th: Verify cyan/informational grace banner renders.
   - Set mock date to 9th: Verify red/urgent overdue banner renders.
   - Set `paymentClear == true`: Verify zero banner renders.
