# Module Specification: Master Authentication, Biometric Facelock & Multi-Account Engine

> **PURPOSE**: Defines the enterprise-grade authentication ecosystem combining standard credentials (Email/Password), **Silent Background Facelock & Hardware WebAuthn**, **Multi-Account Switching without re-login**, **Anti-Enumeration Signup with 6-box Auto-Verifying OTP**, **Timing Attack Protection via Constant-Time Dummy Hashing**, and **Strong Password Governance**.

---

## 🔐 1. End-to-End Authentication Architecture

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               MASTER AUTHENTICATION GATEWAY                            │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
        ┌───────────────────────────────────┼────────────────────────────────────┐
        ▼                                   ▼                                    ▼
┌───────────────────────┐       ┌───────────────────────┐            ┌───────────────────────┐
│     LOGIN PAGE        │       │      SIGNUP FLOW      │            │    FORGOT PASSWORD    │
│ • Email + Password    │       │ • Email-Only Step 1   │            │ • Email input         │
│ • Silent Facelock     │       │ • No Enumeration      │            │ • ?token=..           │
│ • Manual Facelock     │       │ • ?token=..&option=otp│            │ • 6-box OTP Auto-Check│
│ • Multi-Face Conflict │       │ • 6-box OTP Auto-Check│            │ • /reset-password     │
│ • Generic Error Msg   │       │ • ?option=registration│            │ • Strong Pwd Enforced │
│ • Dummy Hash Bcrypt   │       │   or Redirect to Login│            └───────────────────────┘
└───────────────────────┘       └───────────────────────┘
        │
        ▼
┌────────────────────────────────────────────────────────┐
│             MULTI-ACCOUNT SESSION ENGINE               │
│ • Active Account: `active_account_id` cookie           │
│ • Authenticated Vault: Multi-session encrypted store   │
│ • Topbar Switcher: Instant switch (Zero password re-ask│
│ • "Add Account" route to login without sign-out        │
└────────────────────────────────────────────────────────┘
```

---

## 👤 2. Login Page & Silent Facelock Architecture

### 2.1 The Two-Tier Facelock Strategy
If enabled in the project plan (`PLAN.md`), the Login page offers both standard email/password authentication and Face Biometric login:

1. **Tier 1: Silent Background Detection (Zero Camera UI)**:
   - On page mount, the system automatically initializes a hidden background face detection scan once (via hidden video element or silent WebAuthn platform authenticator probe).
   - **No video preview, no visible camera stream, and no intrusive popups** are presented to the user during this background attempt.
   - If the user's face is successfully recognized and verified against the backend biometric descriptor/credential:
     - The user is logged in automatically.
   - If face detection fails, times out (e.g. 2.5 seconds), or camera permission is not yet granted:
     - The system gracefully falls back without any jarring errors.
     - The manual **"Sign in with Face Biometric"** button becomes prominently active.

2. **Tier 2: Manual Face Biometric Trigger**:
   - Clicking **"Sign in with Face Biometric"** opens an explicit visual modal with camera stream feedback, face alignment circle, and status indicators.

### 2.2 Multi-Account Conflict Resolution (Same Face on Multiple Accounts)
In multi-tenant or enterprise environments, a single individual (e.g. a Manager) may possess multiple distinct user accounts (e.g. `alex.admin@company.com`, `alex.personal@company.com`, `alex.support@company.com`):

1. When the face biometric matches **2 or more accounts**:
   - The backend returns an ambiguous biometric verification token along with a list of matched account profiles (Avatar, Display Name, Masked Email, Role Badge).
   - The UI presents the **`<FaceAccountSelectionModal />`**:
     > *"Biometric scan matched 3 accounts on this device. Select which account you want to open:"*
2. The user clicks their desired account:
   - That account becomes the **Active Account**.
   - The other matched accounts are simultaneously registered into the **Multi-Session Store** so the user can switch between them instantly from the topbar without re-authenticating!

```tsx
// components/auth/FaceAccountSelectionModal.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Shield, User } from "lucide-react";

interface MatchedAccount {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export const FaceAccountSelectionModal: React.FC<{
  isOpen: boolean;
  accounts: MatchedAccount[];
  onSelect: (account: MatchedAccount) => void;
}> = ({ isOpen, accounts, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md p-6 rounded-3xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-white/10 shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-2xl bg-sky-500/10 text-sky-500">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Multiple Accounts Detected</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Select which profile to activate</p>
          </div>
        </div>

        <div className="space-y-2.5 my-4">
          {accounts.map((acc) => (
            <button
              key={acc.id}
              onClick={() => onSelect(acc)}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/40 hover:border-sky-500/50 hover:bg-sky-500/5 transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200">
                  {acc.avatarUrl ? <img src={acc.avatarUrl} alt={acc.name} className="w-full h-full rounded-xl object-cover" /> : acc.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-sky-400 transition-colors">
                    {acc.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{acc.email}</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                {acc.role}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
```

---

## 🔄 3. Multi-Account Management & Account Switching ("Switch Account")

### 3.1 Session Architecture
To allow seamless multi-account workflows without logging out:
1. **`active_account_id` Cookie**: Holds the ID/token of the currently active session (`HttpOnly; SameSite=Lax; Secure`).
2. **`auth_sessions` Vault**: Encrypted HttpOnly cookie or secure server-side session registry containing the active JWTs/refresh tokens of all currently signed-in accounts on this device.
3. **Switching Logic**:
   - Switching accounts updates `active_account_id` to the target user's session.
   - **ZERO PASSWORD RE-PROMPT**: The user is already authenticated. The page reloads state instantaneously.
4. **Adding an Account**:
   - User clicks **"Add Another Account"**: Routed to `/login?mode=add_account`.
   - Logging in with new credentials appends the new session to the `auth_sessions` vault and sets it as the active account without clearing existing sessions.
5. **Zero Additional Account Fallback**:
   - If only 1 account is signed in, clicking "Switch Account" in the user dropdown automatically redirects directly to `/login?mode=add_account`.

### 3.2 Topbar User Dropdown UI with Switcher (`UserAccountDropdown.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Users, Plus, LogOut, Check, ChevronDown } from "lucide-react";

interface LoggedInAccount {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

export const UserAccountDropdown: React.FC<{
  accounts: LoggedInAccount[];
  onSwitch: (id: string) => void;
  onAddAccount: () => void;
  onLogout: () => void;
}> = ({ accounts, onSwitch, onAddAccount, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeAccount = accounts.find((a) => a.isActive) || accounts[0];

  const handleSwitchClick = () => {
    if (accounts.length <= 1) {
      onAddAccount(); // If no second account exists, direct to login
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition cursor-pointer"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-glow-sky">
          {activeAccount.name.charAt(0)}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate max-w-[120px]">
            {activeAccount.name}
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">{activeAccount.role}</p>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-72 p-2 rounded-3xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-2xl z-50"
          >
            {/* Active Account Header */}
            <div className="px-3 py-2.5 border-b border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Signed In As</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{activeAccount.name}</p>
              <p className="text-xs text-slate-500 truncate">{activeAccount.email}</p>
            </div>

            {/* Switch Account Section */}
            <div className="py-2 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between px-3 pb-1.5">
                <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  Switch Account
                </span>
              </div>

              <div className="space-y-1">
                {accounts.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => {
                      if (!acc.isActive) onSwitch(acc.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                      acc.isActive
                        ? "bg-sky-500/10 text-sky-500 font-bold"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                        {acc.name.charAt(0)}
                      </div>
                      <span className="truncate">{acc.email}</span>
                    </div>
                    {acc.isActive && <Check className="w-4 h-4 text-sky-500 flex-shrink-0" />}
                  </button>
                ))}

                {/* Add Another Account */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onAddAccount();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-sky-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add another account</span>
                </button>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition cursor-pointer mt-1"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out current account</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
```

---

## 🛡️ 4. Login API Security: Generic Errors & Constant-Time Dummy Hash

### 4.1 Strict Anti-Enumeration Rule
- **NEVER** return: `"Email not found"` or `"Incorrect password"`.
- **ALWAYS** return: `"Invalid email or password"`.
- Status Code: Always HTTP `401 Unauthorized`.

### 4.2 Timing Attack Defense via Bcrypt Dummy Hash
Attackers use precision timing to see if an API responds faster when an email doesn't exist (because password hashing is skipped). **To eliminate this vulnerability**:
- If the email does **not** exist in the database, the backend **MUST execute a dummy `bcrypt.compare()`** against a fixed pre-computed hash.
- This ensures that every login request takes the exact same computation time (~80-120ms) regardless of whether the email exists.

```python
# app/services/auth_service.py
import bcrypt
from fastapi import HTTPException, status
from app.core.config import settings

# Pre-computed dummy bcrypt hash (cost 12) for constant-time comparison
DUMMY_BCRYPT_HASH = "$2b$12$e8uq0wNq1X3Z.z7uR6Cg2.1vG4yJ9nO5zB2c8X0mR3pL9kW1qD2uS".encode("utf-8")

def authenticate_user(db, email: str, password: str):
    user = db.query(User).filter(User.email == email.lower().strip()).first()

    if not user:
        # TIMING ATTACK MITIGATION: Run real bcrypt check against dummy hash
        bcrypt.checkpw(password.encode("utf-8"), DUMMY_BCRYPT_HASH)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Verify real user password
    is_valid = bcrypt.checkpw(password.encode("utf-8"), user.password_hash.encode("utf-8"))
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    return user
```

### 4.3 Environment-Based Rate Limiting
All authentication endpoints must be protected with dynamic rate limiting configured in `.env`:

```env
# .env.example
RATE_LIMIT_LOGIN_PER_MIN=5
RATE_LIMIT_SIGNUP_PER_MIN=5
RATE_LIMIT_OTP_VERIFY_PER_MIN=5
RATE_LIMIT_GLOBAL_PER_MIN=60
```

---

## 📝 5. Signup Flow: Multi-Step Verification (Zero Enumeration)

### 5.1 Step-by-Step State Progression

```
[ Step 1: /signup ] ── User enters Email ONLY 
         │
         ▼
[ Backend Check ]
         ├── Email DOES NOT exist ──► Issue signed token & send OTP
         └── Email ALREADY exists ──► Issue signed token & send OTP (Zero error leakage!)
         │
         ▼
[ Step 2: /signup?token=<jwt>&option=otp ]
         │── 1. Page verifies `token` validity
         │── 2. User enters 6-digit OTP in auto-verifying boxes
         ▼
[ Step 3: Backend OTP Verify ]
         │
         ├── If NEW Email:
         │   └── Redirect to `/signup?token=<verified_token>&option=registration`
         │       └── User sets Username & Strong Password ──► Account Created!
         │
         └── If EXISTING Email:
             └── Redirect to `/login?email=<encoded_email>`
                 └── Toast: "Account already exists. Please sign in."
```

---

## 🔢 6. The 6-Digit Auto-Verifying OTP Component (`OtpInputGroup.tsx`)

### 6.1 Mechanical Specifications
- **6 Separate Text Boxes**: Uses `type="text"`, `inputMode="numeric"`, `maxLength={1}`.
- **`Ctrl + V` Paste Listener**: Automatically parses pasted 6-digit string, fills all 6 boxes, and focuses the 6th box.
- **Auto-Verification**: When all 6 digits are populated, it invokes `onComplete(otpCode)` automatically **without any "Verify" button**.
- **Keyboard Navigation**: Typing advances to next box; `Backspace` deletes and returns to previous box.

```tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface OtpInputProps {
  length?: number;
  isLoading?: boolean;
  onComplete: (otp: string) => void;
}

export const OtpInputGroup: React.FC<OtpInputProps> = ({ length = 6, isLoading = false, onComplete }) => {
  const [digits, setDigits] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only accept numeric digit
    const cleaned = value.replace(/\D/g, "");
    const char = cleaned.slice(-1);

    const nextDigits = [...digits];
    nextDigits[index] = char;
    setDigits(nextDigits);

    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify if all fields are filled
    if (nextDigits.every((d) => d !== "") && nextDigits.join("").length === length) {
      onComplete(nextDigits.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;

    const nextDigits = [...digits];
    for (let i = 0; i < pasted.length; i++) {
      nextDigits[i] = pasted[i];
    }
    setDigits(nextDigits);

    const focusIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[focusIndex]?.focus();

    if (pasted.length === length) {
      onComplete(pasted);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2 sm:gap-3">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={isLoading}
            className="w-11 h-14 sm:w-12 sm:h-16 text-center text-xl font-extrabold rounded-2xl bg-slate-100 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all shadow-sm"
          />
        ))}
      </div>
      {isLoading && (
        <div className="flex items-center gap-2 text-xs font-semibold text-sky-500 animate-pulse">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Verifying security code...</span>
        </div>
      )}
    </div>
  );
};
```

---

## 🔑 7. Forgot Password Flow

1. User navigates to `/forgot-password`, enters email.
2. Backend creates a short-lived reset JWT and emails a 6-digit OTP.
3. User redirected to `/forgot-password?token=<reset_jwt>`.
4. Page verifies `token`.
5. 6-box auto-verifying OTP modal opens.
6. Upon OTP verification, backend generates an authorization ticket and redirects user to:
   `/reset-password?token=<verified_ticket>`
7. User inputs their new password, which is strictly evaluated against the Strong Password Policy.
8. Upon password reset, all existing user sessions are invalidated, and user is redirected to `/login` with success confirmation.

---

## 🔒 8. Strong Password Policy & Validation Engine

### 8.1 Required Conditions
All passwords must satisfy 5 strict rules:
1. **Length**: Minimum 8 characters (Recommended 10+).
2. **Uppercase Letter**: At least one `[A-Z]`.
3. **Lowercase Letter**: At least one `[a-z]`.
4. **Number**: At least one digit `[0-9]`.
5. **Special Symbol**: At least one symbol `[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]`.

### 8.2 Password Strength Component (`PasswordStrengthMeter.tsx`)

```tsx
"use client";

import React, { useMemo } from "react";
import { Check, X } from "lucide-react";

export const PasswordStrengthMeter: React.FC<{ password: string }> = ({ password }) => {
  const criteria = useMemo(() => [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Uppercase letter (A-Z)", met: /[A-Z]/.test(password) },
    { label: "Lowercase letter (a-z)", met: /[a-z]/.test(password) },
    { label: "Number (0-9)", met: /[0-9]/.test(password) },
    { label: "Special symbol (!@#$%^&*)", met: /[^A-Za-z0-9]/.test(password) },
  ], [password]);

  const score = criteria.filter((c) => c.met).length;

  const strengthColor =
    score <= 2 ? "bg-rose-500" : score <= 4 ? "bg-amber-500" : "bg-emerald-500";
  const strengthText =
    score <= 2 ? "Weak" : score <= 4 ? "Moderate" : "Strong";

  return (
    <div className="space-y-3 mt-3">
      {/* Strength Bar */}
      <div>
        <div className="flex justify-between items-center text-[11px] font-bold mb-1">
          <span className="text-slate-400">Password Strength:</span>
          <span className={score === 5 ? "text-emerald-400" : "text-slate-400"}>{strengthText}</span>
        </div>
        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex gap-1">
          {[1, 2, 3, 4, 5].map((lvl) => (
            <div
              key={lvl}
              className={`h-full flex-1 transition-all duration-300 ${lvl <= score ? strengthColor : "bg-transparent"}`}
            />
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {criteria.map((c, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs">
            {c.met ? (
              <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            ) : (
              <X className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            )}
            <span className={c.met ? "text-slate-800 dark:text-slate-200 font-medium" : "text-slate-400"}>
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## 🛡️ 9. Verification & Best Practice Checklist

- [ ] **Silent Facelock Verified**: Automatically attempts face detection once on load without showing visible camera UI; falls back to manual button if unverified.
- [ ] **Multi-Account Conflict Modal Verified**: Prompts user when 1 face matches multiple accounts, and loads remaining accounts into session vault.
- [ ] **Switch Account Verified**: Switches between logged-in accounts via topbar dropdown with zero password re-prompts; clicking "Switch Account" when only 1 exists redirects to login.
- [ ] **Anti-Enumeration Verified**: Login returns generic `"Invalid email or password"`; Signup does not reveal if email is already taken.
- [ ] **Constant-Time Bcrypt Verified**: Non-existent emails trigger `bcrypt.checkpw()` against `DUMMY_BCRYPT_HASH`.
- [ ] **Rate Limiting Verified**: All auth endpoints enforce environment-driven rate limits (`.env`).
- [ ] **6-Box OTP Verified**: Text type with numeric mode, `Ctrl+V` paste support, and auto-verification on 6th digit.
- [ ] **Strong Password Policy Verified**: Min 8 chars, uppercase, lowercase, digit, and symbol with real-time UI feedback.
