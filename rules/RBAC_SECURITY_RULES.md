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
│ • Runs DB migrations & logs     │                 │ • Manages revenue, prices & bank│
│ • Configures developer safeguards│                │ • Full authority over operations│
├─────────────────────────────────┤                 ├─────────────────────────────────┤
│ ❌ CANNOT modify Owner data     │                 │ ❌ CANNOT access server console │
│ ❌ CANNOT lock out the Owner    │                 │ ❌ CANNOT tamper with developer │
│ ❌ CANNOT alter business pricing│                 │    licensing / safeguard modules│
└─────────────────────────────────┘                 └─────────────────────────────────┘
```

### Protection Invariants:
1. **Owner Immutability**: The Developer cannot demote, delete, or revoke the business access of an Owner via business portals.
2. **Infrastructure Isolation**: The Owner cannot view Developer system logs, secret API keys, or disable developer safeguard checks.

---

## 👥 2. Complete Role Hierarchy

| Role | Scope | Default Permissions | Protected From Demotion By |
| :--- | :--- | :--- | :--- |
| **Developer** | Entire Platform / Multi-Tenant | System config, Tenant registration, Health logs | System Level |
| **Owner** | Specific Company / Tenant | Full business access, Billing, Staff management | Developer & Staff |
| **Admin** | Specific Company / Tenant | Daily management, Staff assignments, Inventory | Staff |
| **Staff / Employee**| Assigned Tasks | Order processing, Customer support, Status updates | Admins |
| **Customer** | Own Account Only | Place orders, View own profile & invoices | Everyone |

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

