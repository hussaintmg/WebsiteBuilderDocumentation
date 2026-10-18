# Developer Payment Safeguard Rule & Client Billing Banner

> **CONTEXT**: This is a default platform rule for client projects. It guarantees developer hosting and maintenance fee visibility without disrupting the client's end users or operational staff.

---

## 🎯 Core Principles & Security Constraints

1. **Backend-Only Verification Mandate (Zero Direct Frontend Calls)**:
   - All license checks, payment status verifications, and safeguard API calls **MUST ALWAYS originate from the Backend Server** (FastAPI / Dedicated Next.js Backend / Node.js).
   - **NEVER allow the frontend client or browser to make direct calls to the developer licensing server.** Frontend-originating calls are vulnerable to browser devtool interception, request blocking, and script tampering.
2. **Sovereign Backend Gate ("Backend Allow Kare Ga To Hi Website Chale Gi")**:
   - The backend server is the absolute sovereign gatekeeper of the application.
   - The backend periodically queries the developer licensing authority server-to-server (with secure background caching, e.g. 1-6 hour TTL, to prevent external network hiccups).
   - **Backend Permission Gate**: If the backend verifies that the account is in good standing, it serves all API routes and data normally. If the backend determines that service is locked/unpaid past the 8th grace period, the backend restricts protected endpoints and transmits the locked status to the frontend.
3. **Owner-Only Visibility**:
   - The payment status banner must **ONLY** ever be rendered for authenticated users with the `Owner` role.
   - Under no circumstances should `Customer`, `Staff / Employee`, or public anonymous visitors ever see or have DOM access to this banner.
4. **Grace Period Rule (The 8th of the Month)**:
   - For monthly billing cycles, the client has a built-in grace period until the **8th calendar day of each month**.
   - If payment is pending on or before the 8th: A clean, respectful, non-blocking notification bar is displayed at the top of the Owner's dashboard.
   - If payment is pending after the 8th: The banner switches to an urgent payment resolution status.
5. **Zero Accidental Downtime (Fail-Open / Cache Resilience)**:
   - If the developer licensing server is temporarily unreachable or times out, the backend relies on the last verified cached state or gracefully fails open (`paymentClear: true` fallback) while logging the issue silently.
6. **Future Payment Architecture Note**:
   - Complete extended payment safeguards, tier-based lockouts, and billing integration specs will be expanded further per client requirements, but the **Backend-Only Call Standard** is immutable across all projects.

---

## 📡 Architecture & API Contract (Server-to-Server Flow)

```
┌─────────────────────────┐          Internal API Call          ┌──────────────────────────┐
│   Frontend Client App   │ ───────────────────────────────────►│      Backend Server      │
│ (Next.js UI / React)    │ ◄───────────────────────────────────│ (FastAPI / Next.js API)  │
└─────────────────────────┘      Status: CLEAR or RESTRICTED    └────────────┬─────────────┘
                                                                             │
                                                                 Server-to-Server HTTPS
                                                                 (Never exposed to browser)
                                                                             │
                                                                             ▼
                                                                ┌──────────────────────────┐
                                                                │  Developer Licensing /   │
                                                                │  Billing Authority API   │
                                                                └──────────────────────────┘
```

### Server-to-Server Request (Backend to Licensing API)
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

export const OwnerPaymentBanner: React.FC = () => {
  const { user } = useAuth();
  const { data: billing, isLoading } = useBillingStatus();

  if (isLoading || !user) return null;

  const state = evaluatePaymentState(billing, user.role);

  if (state === "CLEAR") return null;

  const isGracePeriod = state === "GRACE_PERIOD_NOTICE";

  return (
    <aside
      className={`sticky top-0 left-0 right-0 z-50 w-full flex items-center justify-between px-6 py-3 font-sans text-sm shadow-md transition-all duration-300 animate-in slide-in-from-top ${
        isGracePeriod
          ? "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-100 border-b-2 border-sky-400"
          : "bg-gradient-to-r from-red-950 via-rose-900 to-red-950 text-rose-50 border-b-2 border-rose-500"
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{isGracePeriod ? "ℹ️" : "⚠️"}</span>
        <p className="m-0 leading-snug">
          {isGracePeriod ? (
            <>
              <strong className="font-semibold text-sky-300">Notice for Account Owner:</strong> Scheduled monthly hosting
              & maintenance fee is pending. Please complete payment before the{" "}
              <strong className="font-bold underline decoration-sky-400">8th of this month</strong> to ensure uninterrupted service.
            </>
          ) : (
            <>
              <strong className="font-semibold text-rose-300">Payment Urgent:</strong> The monthly service invoice for this
              account is past the 8th grace date. Please settle payment immediately.
            </>
          )}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {billing?.portalUrl && (
          <a
            href={billing.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-semibold text-xs transition-all duration-200 cursor-pointer shadow-sm hover:-translate-y-0.5 active:scale-95 bg-sky-400 hover:bg-sky-300 text-slate-950"
          >
            Review & Settle Invoice →
          </a>
        )}
      </div>
    </aside>
  );
};
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
