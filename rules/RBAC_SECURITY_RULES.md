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
