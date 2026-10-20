# Role-Based Access Control (RBAC) & Security Rules

> **PURPOSE**: Establishes strict security hierarchy, dual-protection boundaries between Developer and Owner, and enforces granular action-level (button & API) permissions across all pages.

---

## 👑 1. The Separation of Powers: Developer vs. Owner

A common vulnerability in SaaS and client applications is ambiguous role boundaries between the Technical Developer and the Business Owner. This rule establishes a strict **Dual-Protection Model**:

```
                       ┌────────────────────────────────────────┐
                       │          SYSTEM ARCHITECTURE           │
                       └───────────────────┬────────────────────┘
                                           │
                ┌──────────────────────────┴──────────────────────────┐
                ▼                                                     ▼
┌─────────────────────────────────┐                 ┌─────────────────────────────────┐
│         DEVELOPER ROLE          │                 │           OWNER ROLE            │
│       (Platform Sovereign)      │                 │       (Business Sovereign)      │
├─────────────────────────────────┤                 ├─────────────────────────────────┤
│ • Manages server & infra        │                 │ • Owns all commercial data      │
│ • Registers & provisions tenants│                 │ • Controls staff permissions    │
│ • Runs DB indexes & logs        │                 │ • Manages revenue, prices & bank│
│ • Configures developer safeguards│                │ • Full authority over operations│
├─────────────────────────────────┤                 ├─────────────────────────────────┤
│ ❌ CANNOT modify Owner data     │                 │ ❌ CANNOT access server console │
│ ❌ CANNOT lock out the Owner    │                 │ ❌ CANNOT tamper with developer │
│ ❌ CANNOT alter business pricing│                 │    licensing / safeguard modules│
└─────────────────────────────────┘                 └─────────────────────────────────┘
```

### Protection Invariants:
1. **Owner Immutability**: The Developer cannot demote, delete, or revoke the business access of an Owner via business portals.
2. **Infrastructure Isolation & System Settings Delegation**:
   - By default, Developer manages infrastructure and System Settings (SMTP, WhatsApp, Storage, AI keys, Feature Flags).
   - The Developer can explicitly delegate System Settings to the Owner via configuration.
   - **Mandatory Fallback (No Developer Role)**: If no Developer role exists in the application, System Settings is **ALWAYS granted to the Owner / Main User role** to ensure critical credentials and integrations remain fully accessible.
3. **Owner Business Safeguards**: The Owner cannot view Developer system logs or tamper with developer licensing / safeguard modules.

---

## 👥 2. Complete Role Hierarchy

| Role | Scope | Default Permissions | Protected From Demotion By |
| :--- | :--- | :--- | :--- |
| **Developer** | Entire Platform / Multi-Tenant | System config, Tenant registration, Health logs, System Settings, Feature Flags | System Level |
| **Owner** | Specific Company / Tenant | Full business access, Billing, Staff management, Normal Settings *(+ System Settings if delegated or if no Dev)* | Developer & Staff |
| **Admin** | Specific Company / Tenant | Daily management, Staff assignments, Inventory, Normal Settings | Staff |
| **Staff / Employee**| Assigned Tasks | Order processing, Customer support, Status updates, Personal Settings | Admins |
| **Customer** | Own Account Only | Place orders, View own profile & invoices, Personal Profile Settings | Everyone |

---

## 🎯 3. Action-Level Granular Permissions (Button & API Level)

Never rely solely on page-level routing. Access control must be enforced at both the **UI Button/Component level** and the **Backend API level**.

### Permission Key Format: `<resource>:<action>`
Examples:
- `orders:view`
- `orders:create`
- `orders:edit`
- `orders:delete`
- `orders:override_price`
- `staff:invite`
- `billing:view`
- `settings:view_normal`
- `settings:edit_normal`
- `settings:view_system`
- `settings:edit_system`
- `features:manage`
- `chat:access`
- `chat:assign_staff`
- `chat:delete_everyone`
- `ai:copilot_access`
- `ai:action_execution`
- `ai:cms_builder`
- `enquiries:view`
- `enquiries:reply`
- `enquiries:edit`
- `enquiries:assign`
- `enquiries:convert`
- `enquiries:delete`
- `newsletter:view`
- `newsletter:compose`
- `newsletter:send`
- `newsletter:subscribers_manage`
- `blogs:view`
- `blogs:create`
- `blogs:edit`
- `blogs:publish`
- `blogs:delete`

### Example Permission Matrix:
| Permission Key | Developer | Owner | Admin | Staff | Customer |
| :--- | :---: | :---: | :---: | :---: | :---: |
| `orders:view` | ✅ | ✅ | ✅ | ✅ | ✅ (Own Only) |
| `orders:create` | ❌ | ✅ | ✅ | ✅ | ✅ (Self) |
| `orders:edit` | ❌ | ✅ | ✅ | ✅ | ❌ |
| `orders:delete` | ❌ | ✅ | ✅ | ❌ *(Hidden)* | ❌ |
| `orders:override_price` | ❌ | ✅ | ❌ | ❌ | ❌ |
| `tenant:register` | ✅ | ❌ | ❌ | ❌ | ❌ |
| `billing:view_owner` | ❌ | ✅ | ❌ | ❌ | ❌ |
| `settings:view_normal` | ✅ | ✅ | ✅ | ✅ | ✅ (Own Only) |
| `settings:edit_normal` | ✅ | ✅ | ✅ | ✅ | ✅ (Own Only) |
| `settings:view_system` | ✅ | ⚡ *(Delegatable)* | ❌ | ❌ | ❌ |
| `settings:edit_system` | ✅ | ⚡ *(Delegatable)* | ❌ | ❌ | ❌ |
| `features:manage` | ✅ | ⚡ *(If no Dev)* | ❌ | ❌ | ❌ |
| `chat:access` | ✅ | ✅ | ✅ | ⚡ *(Owner Delegated)* | ✅ (Portal) |
| `chat:assign_staff` | ✅ | ✅ | ✅ | ❌ | ❌ |
| `chat:delete_everyone` | ✅ | ✅ | ⚡ *(Owner Delegated)* | ❌ | ❌ |
| `ai:copilot_access` | ✅ | ✅ | ✅ | ⚡ *(Owner Delegated)* | ❌ |
| `ai:action_execution` | ✅ | ✅ | ✅ | ⚡ *(Scoped to perms)* | ❌ |
| `ai:cms_builder` | ✅ | ✅ | ⚡ *(Owner Delegated)* | ❌ | ❌ |
| `enquiries:view` | ✅ | ✅ | ✅ | ⚡ *(Assigned Only)* | ❌ |
| `enquiries:reply` | ✅ | ✅ | ✅ | ⚡ *(Assigned Only)* | ❌ |
| `enquiries:edit` | ✅ | ✅ | ✅ | ⚡ *(Assigned Only)* | ❌ |
| `enquiries:assign` | ✅ | ✅ | ✅ | ❌ | ❌ |
| `enquiries:convert` | ✅ | ✅ | ✅ | ⚡ *(Owner Delegated)* | ❌ |
| `enquiries:delete` | ✅ | ✅ | ✅ | ❌ | ❌ |
| `newsletter:view` | ✅ | ✅ | ✅ | ⚡ *(Owner Delegated)* | ❌ |
| `newsletter:compose` | ✅ | ✅ | ✅ | ⚡ *(Owner Delegated)* | ❌ |
| `newsletter:send` | ✅ | ✅ | ✅ | ❌ | ❌ |
| `newsletter:subscribers_manage` | ✅ | ✅ | ✅ | ⚡ *(Owner Delegated)* | ❌ |
| `blogs:view` | ✅ | ✅ | ✅ | ⚡ *(Assigned Staff)* | ❌ |
| `blogs:create` | ✅ | ✅ | ✅ | ⚡ *(Assigned Staff)* | ❌ |
| `blogs:edit` | ✅ | ✅ | ✅ | ⚡ *(Assigned Staff)* | ❌ |
| `blogs:publish` | ✅ | ✅ | ✅ | ❌ | ❌ |
| `blogs:delete` | ✅ | ✅ | ✅ | ❌ | ❌ |

*(Note: If no Developer role exists, `settings:view_system`, `settings:edit_system`, and `features:manage` are automatically assigned ✅ to Owner / Main User. Chat, AI Copilot, Enquiries, Newsletter, and Blog permissions are assigned by the Owner to designated Staff roles; action execution is strictly mirrored to the user's underlying entity permissions).*

---

## 💻 4. Code Implementation Standards

### 4.1 Frontend Permission Gate Component (`PermissionGate.tsx`)
```tsx
"use client";

import React from "react";
import { useRBAC } from "@/hooks/useRBAC";

interface PermissionGateProps {
  permission: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  permission,
  fallback = null,
  children,
}) => {
  const { hasPermission } = useRBAC();

  if (!hasPermission(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

// Usage Example inside Order Table:
// <PermissionGate permission="orders:delete">
//   <button id="delete-order-btn" onClick={() => deleteOrder(order.id)}>Delete</button>
// </PermissionGate>
```

### 4.2 Backend Enforcement Middleware (FastAPI Example)
```python
from fastapi import Depends, HTTPException, status
from app.core.security import get_current_user

def require_permission(required_perm: str):
    def dependency(current_user = Depends(get_current_user)):
        if required_perm not in current_user.permissions:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Forbidden: Missing '{required_perm}' permission."
            )
        return current_user
    return dependency

# Usage in Router:
@router.delete("/orders/{order_id}")
def delete_order(order_id: str, user = Depends(require_permission("orders:delete"))):
    return order_service.delete(order_id)
```

---

## 🛡️ 5. Authentication Security, Anti-Enumeration & Rate Limiting Guardrails

Cross-referenced with [`modules/AUTH_AND_FACELOCK.md`](../modules/AUTH_AND_FACELOCK.md).

### 5.1 Strict Anti-Enumeration Principle
Under no circumstances should the backend or frontend leak whether an account exists:
- **Login API**: NEVER respond with `"Email not found"` or `"Incorrect password"`. Always respond with a generic HTTP 401: `"Invalid email or password"`.
- **Signup Flow**: NEVER respond with `"Email already exists"`. Both existing and non-existing emails receive an OTP via email. Only after OTP verification is the user routed to either password setup (new user) or the login page (existing user).

### 5.2 Timing Attack Defense: Bcrypt Constant-Time Dummy Hash
To prevent attackers from distinguishing valid emails from invalid emails through response latency:
- When a requested email is NOT found in the database, the backend **MUST execute a real `bcrypt.checkpw()` against a pre-computed dummy hash** before raising HTTP 401.
- This guarantees identical computation time (~80-120ms) across all login attempts.

```python
# app/core/security.py
import bcrypt

DUMMY_BCRYPT_HASH = b"$2b$12$e8uq0wNq1X3Z.z7uR6Cg2.1vG4yJ9nO5zB2c8X0mR3pL9kW1qD2uS"

def verify_password_safe(plain_password: str, hashed_password: str | None) -> bool:
    if not hashed_password:
        # Run dummy check to keep response time constant
        bcrypt.checkpw(plain_password.encode("utf-8"), DUMMY_BCRYPT_HASH)
        return False
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))
```

### 5.3 Dynamic Environment-Driven Rate Limiting
All authentication routes (login, signup, OTP verify, password reset) must enforce strict IP and user-based rate limits defined via environment variables:

```env
# .env.example
RATE_LIMIT_LOGIN_PER_MIN=5
RATE_LIMIT_SIGNUP_PER_MIN=5
RATE_LIMIT_OTP_VERIFY_PER_MIN=5
RATE_LIMIT_GLOBAL_PER_MIN=60
```
- Requests exceeding thresholds MUST return HTTP 429 Too Many Requests with a `Retry-After` header.

### 5.4 Strong Password Policy Standard
All passwords must satisfy 5 mandatory criteria:
1. Minimum 8-12 characters.
2. At least 1 Uppercase letter (`[A-Z]`).
3. At least 1 Lowercase letter (`[a-z]`).
4. At least 1 Numeric digit (`[0-9]`).
5. At least 1 Special symbol (`[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]`).

---

## 🚦 6. Edge Proxy Route Protection, Interception Toasts & Session Cache Invalidation

Cross-referenced with [`modules/ROUTE_PROXY_AND_PROTECTION_SYSTEM.md`](../modules/ROUTE_PROXY_AND_PROTECTION_SYSTEM.md).

### 6.1 Dual-Shield Route Proxy Enforcement
- **Network Edge Proxy (`middleware.ts`)**: Evaluates user session token, role claims, and feature flags before rendering any page.
- **Client Route Guard (`RouteGuard.tsx`)**: Intercepts client-side SPA navigations before DOM transitions to prevent unrendered flashes.

### 6.2 The Interception Toast Notification Mandate ("Aap Is Page Pe Nahi Ja Sakte Hain")
- Unauthorized users navigating to protected routes (e.g. Staff attempting to enter `/settings/system` or `/finance`) **MUST NOT be silently redirected**.
- The system must dispatch a short-lived flash cookie (`x-flash-error: access_denied`) during redirect.
- The destination landing view automatically triggers an animated error toast:  
  **`"⛔ Aap is page pe nahi ja sakte hain!"`** (Access Denied: You do not have permission to view this section).

### 6.3 Mandatory Login & Logout Proxy Cache Invalidation
- **On Every Login**:
  1. Invalidate stale client and proxy session cache.
  2. Mint fresh session cookie with updated roles, action permissions, and tenant ID.
  3. Recompute allowed vs protected routes whitelist.
  4. Perform intelligent role-based redirection to the appropriate portal.
- **On Every Logout**:
  1. Immediately expire session cookies (`Max-Age=0`).
  2. Wipe client TanStack Query cache (`queryClient.clear()`) and auth state.
  3. Reset Edge Proxy to public-only mode.
  4. Enforce `Cache-Control: no-store, no-cache, must-revalidate` so browser Back-button navigation cannot expose cached protected screens.

---

## 🏢 7. Multi-Tenant Data Scoping, Staff-Client Attribution & Zero-Leak UI Elimination Law

Cross-referenced with master specification [`modules/RBAC_SYSTEM.md`](../modules/RBAC_SYSTEM.md).

### 7.1 Staff-Client Attribution & Data Scoping
When a staff member brings or onboards a client/customer into the company:
1. **Document Ownership Attribution**: The client record stamps `createdBy: staffUser._id`, `assignedStaffId: staffUser._id`, and optional `referralStaffId`.
2. **Autonomous Scoping (`OWN_ONLY`)**: Staff members with `OWN_ONLY` scope seamlessly view, manage, and create orders for their own clients. Records belonging to other staff members remain strictly invisible in both the UI and database queries.
3. **Data Scope Taxonomy**: The Owner can assign 5 row-level visibility tiers:
   - `OWNER_ONLY`: Records created directly by the company Owner.
   - `OWN_ONLY`: Records created by or assigned to the authenticated user.
   - `ALL_USERS`: All records in the company.
   - `SELECTED_ROLES`: Records created by users of specific selected roles in this company.
   - `SELECTED_USERS`: Records created by or assigned to specific individual staff members in this company.
4. **Tenant Isolation Guarantee**: All role and user picker dropdowns in the Owner's permission configuration must strictly execute queries filtered by `companyId == currentTenant.id`.

### 7.2 The Zero-Leak UI Elimination Law
1. **Navigation Links**: If a page is disabled for a role, its navigation item is **completely stripped** from sidebars, mobile bottom navigation, and search command palettes.
2. **Action Buttons**: If an action button (Delete, Edit, Create, Export PDF, WhatsApp) is disallowed for a role or record, `<ActionGuard />` returns `null`.
   - **Strict Ban**: Disallowed buttons must **never** be rendered disabled, greyed-out, or visually hidden with CSS opacity. If an action is forbidden, it does not exist in the DOM.

### 7.3 Task-Synchronized Save Animation
- Saving permissions triggers the **`save_vault_lock`** task animation preset.
- Follows the **Minimum Cycle & Loop Synchronization Law**: guarantees a full 1000ms cyber-vault tumbler lock motion, smooth looping during network latency, flawless transition to a checkmark shield, and triggers success toast notifications strictly *after* motion completion.



