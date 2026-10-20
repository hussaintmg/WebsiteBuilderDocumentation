# Module Specification: Mobile Navigation & Responsive Layout Architecture

> **PURPOSE**: Establishes the mobile navigation standard across the platform: **Strict No-Sidebar on Public Pages** with a **Fixed Bottom Footer Bar & "More" Drawer**, and **Full Mobile Sidebar on Dashboards** powered by a **Floating Bottom-Center "Menu" / "Close" Morphing Pill with Dual Close Controls**.

---

## 🏛️ 1. Architecture & The Public vs. Dashboard Distinction

Mobile navigation must never use a one-size-fits-all approach. Navigation dynamics are strictly partitioned based on page context:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              MOBILE NAVIGATION ARCHITECTURE                            │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│   1. PUBLIC / MARKETING / STOREFRONT PAGES (< 1024px)                                  │
│   ───────────────────────────────────────────────────                                  │
│   ❌ NO Sidebar / NO Sidepanel drawer.                                                 │
│   ✅ Fixed Bottom Footer Bar (`fixed bottom-0`) with 3-4 primary curated links.       │
│   ✅ Last link is always "More" (...) which opens an animated Bottom Sheet Drawer.    │
│                                                                                        │
│   2. DASHBOARD / INTERNAL APP PAGES (< 1024px)                                         │
│   ────────────────────────────────────────────                                         │
│   ✅ Full Navigation Sidebar available as a mobile slide-out drawer.                  │
│   ✅ Floating Bottom-Center "Menu" Pill (Vercel-inspired bespoke glass pill).          │
│   ✅ Dual Close ('X') Controls:                                                        │
│      • Bottom floating pill morphs into "Close" ('X' icon + text).                     │
│      • Sidebar header contains a dedicated top Close ('X') button.                     │
│                                                                                        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📱 2. Public Pages: Mobile Bottom Footer Bar & "More" Drawer

### 2.1 The Strict No-Sidebar Law for Public Pages
- On public pages (Home `/`, Pricing `/pricing`, Catalog `/products`, Blog `/blog`, About `/about`):
  - **Sidebars and slide-out sidepanels are strictly forbidden on mobile.**
  - Traditional hamburger menus that slide out large navigation panels clutter marketing experiences and reduce mobile conversion.

### 2.2 The Fixed Bottom Bar Specifications
- **Positioning**: Fixed at the bottom of the viewport: `fixed bottom-0 inset-x-0 z-40`.
- **Aesthetic**: Bespoke glassmorphism (`backdrop-blur-xl bg-surface-light/85 dark:bg-surface-dark/85 border-t border-slate-200/80 dark:border-slate-800/80`).
- **Safe Area Inset**: `pb-safe` (padding bottom for iOS home indicator bar).
- **Curated Primary Items**: Exactly 3 to 4 high-priority destinations to guarantee zero text wrapping and effortless single-thumb access:
  1. **Home** (`/`)
  2. **Explore / Catalog** (`/products` or `/explore`)
  3. **Cart / Orders** (`/cart` or `/orders`)
  4. **More** (`...` / Grid Icon - Triggers Drawer)

```
┌────────────────────────────────────────────────────────────────────────┐
│ PUBLIC MOBILE VIEW: FIXED BOTTOM BAR                                   │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   [ 🏠 Home ]      [ 🔍 Explore ]      [ 🛒 Cart (2) ]     [ ⋯ More ]  │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.3 The "More" Bottom Sheet Drawer
Tapping the **"More"** button triggers an animated native-style bottom sheet drawer (powered by Framer Motion or Vaul):
- Smooth drag-to-dismiss handle at top center.
- Houses all secondary and tertiary links:
  - Company Info: About Us, Careers, Press, Contact.
  - Help & Legal: FAQ, Documentation, Terms of Service, Privacy Policy.
  - Preferences: Theme Toggle (Dark/Light), Language Switcher, Currency Selector.
  - User Actions: Sign In / Create Account button.

---

## 🎛️ 3. Dashboard Pages: Floating Bottom-Center "Menu" Pill & Mobile Sidebar

### 3.1 Mobile Dashboard Sidebar Drawer
In authenticated dashboard spaces (Staff `/staff`, Admin `/admin`, Owner `/dashboard`, Developer `/system-console`):
- Navigation complexity requires a complete sidebar.
- On mobile screens (`< 1024px`), the sidebar is unmounted or translated off-screen by default (`-translate-x-full`) and slides in smoothly when triggered.

### 3.2 Floating Bottom-Center "Menu" Pill (Vercel-Inspired)
Instead of an unreachable top-left hamburger button, dashboards feature a **Floating Bottom-Center Trigger Pill**:
- **Positioning**: Fixed floating at bottom center: `fixed bottom-6 left-1/2 -translate-x-1/2 z-50`.
- **Visual Design**:
  - High-end obsidian glassmorphism: `bg-slate-900/90 dark:bg-slate-900/90 backdrop-blur-md text-white`.
  - Rounded pill geometry: `rounded-full px-5 py-2.5 shadow-2xl shadow-sky-500/20 border border-slate-700/80 hover:border-sky-400/50`.
  - Content: An animated micro-icon + clear typography label: `"Menu"`.

```
┌────────────────────────────────────────────────────────────────────────┐
│ DASHBOARD MOBILE VIEW: FLOATING CENTER PILL                            │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│                     ┌───────────────────────────┐                      │
│                     │   [ ☰ ]  Menu             │                      │
│                     └───────────────────────────┘                      │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 3.3 Dual Close ('X') Controls & State Morphing

To maximize ergonomic convenience, **two independent Close ('X') controls** are provided whenever the mobile sidebar is active:

```
┌────────────────────────────────────────────────────────────────────────┐
│ OPEN MOBILE SIDEBAR STATE: DUAL CLOSE CONTROLS                         │
├────────────────────────────────────────────────────────────────────────┤
│ ┌───────────────────────────────────────┐                              │
│ │  [Brand Logo]                 [ ✕ ] ──┼── Control 1: Header 'X' Close│
│ ├───────────────────────────────────────┤                              │
│ │  • Dashboard                          │                              │
│ │  • Orders                             │                              │
│ │  • Customers                          │                              │
│ │  • Settings                           │                              │
│ └───────────────────────────────────────┘                              │
│                                                                        │
│                     ┌───────────────────────────┐                      │
│                     │   [ ✕ ]  Close            │                      │
│                     └─────────────┬─────────────┘                      │
│                                   │                                    │
│       Control 2: Bottom Floating Pill Morphs to "Close"                │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Control 1: Floating Bottom Pill Morphing**:
   - When the sidebar opens, the bottom floating pill **morphs in place**:
     - Hamburger icon animates into a crisp 'X' (cross).
     - Text label transitions from `"Menu"` ➔ `"Close"`.
     - Tapping the pill immediately closes the sidebar.
2. **Control 2: Sidebar Top Header Close ('X') Button**:
   - The top header of the open sidebar drawer includes a dedicated circular close button with a cross ('X') icon (`aria-label="Close Sidebar"`).
   - Tapping the header button closes the sidebar.
3. **Backdrop Tap**:
   - Tapping anywhere on the darkened, blurred backdrop (`bg-black/60 backdrop-blur-sm`) also dismisses the sidebar.

---

## 💻 4. Production Code Implementation Blueprints

### 4.1 Public Mobile Footer Navigation Bar (`components/layout/PublicMobileFooterBar.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, ShoppingBag, MoreHorizontal, X, Info, HelpCircle, Phone, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const PublicMobileFooterBar: React.FC = () => {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const PRIMARY_TABS = [
    { label: "Home", href: "/", icon: Home },
    { label: "Explore", href: "/explore", icon: Compass },
    { label: "Orders", href: "/orders", icon: ShoppingBag },
  ];

  return (
    <>
      {/* 1. Fixed Bottom Tab Bar (Mobile Only: lg:hidden) */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800/80 pb-safe"
      >
        <div className="flex items-center justify-around h-16 px-2">
          {PRIMARY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors duration-150 ${
                  isActive
                    ? "text-sky-500 font-semibold"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${isActive ? "stroke-[2.5px]" : "stroke-[1.75px]"}`} />
                <span className="text-[11px] tracking-tight">{tab.label}</span>
              </Link>
            );
          })}

          {/* Mandatory "More" Button */}
          <button
            type="button"
            onClick={() => setIsMoreOpen(true)}
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors duration-150 ${
              isMoreOpen
                ? "text-sky-500 font-semibold"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
          >
            <MoreHorizontal className="w-5 h-5 mb-1 stroke-[1.75px]" />
            <span className="text-[11px] tracking-tight">More</span>
          </button>
        </div>
      </nav>

      {/* 2. "More" Bottom Sheet Drawer */}
      <AnimatePresence>
        {isMoreOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMoreOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Bottom Sheet Card */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 260 }}
              className="absolute bottom-0 inset-x-0 bg-white dark:bg-slate-900 rounded-t-3xl border-t border-slate-200 dark:border-slate-800 p-6 max-h-[85vh] overflow-y-auto pb-safe shadow-2xl"
            >
              {/* Drag Handle Bar */}
              <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-6" />

              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Quick Navigation</h3>
                <button
                  onClick={() => setIsMoreOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Auxiliary Links Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Link
                  href="/about"
                  onClick={() => setIsMoreOpen(false)}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-500/10 text-slate-800 dark:text-slate-200 text-sm font-medium"
                >
                  <Info className="w-4 h-4 text-sky-500" />
                  <span>About Us</span>
                </Link>
                <Link
                  href="/faq"
                  onClick={() => setIsMoreOpen(false)}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-500/10 text-slate-800 dark:text-slate-200 text-sm font-medium"
                >
                  <HelpCircle className="w-4 h-4 text-sky-500" />
                  <span>FAQ & Help</span>
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMoreOpen(false)}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-500/10 text-slate-800 dark:text-slate-200 text-sm font-medium"
                >
                  <Phone className="w-4 h-4 text-sky-500" />
                  <span>Contact</span>
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsMoreOpen(false)}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-sky-500/10 text-sky-500 text-sm font-semibold"
                >
                  <span>Sign In ➔</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
```

---

### 4.2 Dashboard Mobile Menu Floating Pill (`components/layout/DashboardMobileMenuPill.tsx`)

```tsx
"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardMobileMenuPillProps {
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * Vercel-inspired bespoke floating bottom-center Menu trigger pill.
 * Automatically morphs between "Menu" and "Close" with spring animations.
 */
export const DashboardMobileMenuPill: React.FC<DashboardMobileMenuPillProps> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden">
      <motion.button
        type="button"
        onClick={onToggle}
        whileTap={{ scale: 0.94 }}
        animate={{
          backgroundColor: isOpen ? "rgba(239, 68, 68, 0.95)" : "rgba(15, 23, 42, 0.92)",
          borderColor: isOpen ? "rgba(248, 113, 113, 0.4)" : "rgba(56, 189, 248, 0.3)",
        }}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold shadow-2xl backdrop-blur-xl border transition-colors cursor-pointer"
        style={{
          boxShadow: isOpen
            ? "0 10px 25px -5px rgba(239, 68, 68, 0.4)"
            : "0 10px 25px -5px rgba(14, 165, 233, 0.35)",
        }}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close dashboard menu" : "Open dashboard menu"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1.5"
            >
              <X className="w-4 h-4 stroke-[2.5px]" />
              <span>Close</span>
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1.5"
            >
              <Menu className="w-4 h-4 stroke-[2.5px]" />
              <span>Menu</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
```

---

### 4.3 Mobile Dashboard Sidebar Drawer with Dual Close Controls (`components/layout/DashboardMobileSidebar.tsx`)

```tsx
"use client";

import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardMobileMenuPill } from "./DashboardMobileMenuPill";

interface DashboardMobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  brandLogoNode?: React.ReactNode;
}

export const DashboardMobileSidebar: React.FC<DashboardMobileSidebarProps> = ({
  isOpen,
  onClose,
  children,
  brandLogoNode,
}) => {
  return (
    <>
      {/* Control 2: Floating Bottom Center "Menu" / "Close" Morphing Pill */}
      <DashboardMobileMenuPill isOpen={isOpen} onToggle={() => (isOpen ? onClose() : undefined)} />

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-out Sidebar Surface */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 260 }}
              className="absolute top-0 left-0 bottom-0 w-[82vw] max-w-xs bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-2xl"
            >
              {/* Header with Brand Logo & Dedicated Control 1 (Top 'X' Close Button) */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  {brandLogoNode || <span className="font-bold text-lg">App Dashboard</span>}
                </div>

                {/* Control 1: Dedicated Sidebar Header Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close sidebar"
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 stroke-[2.25px]" />
                </button>
              </div>

              {/* Navigation Body */}
              <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin">
                {children}
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
```

---

## 🛡️ 5. Verification & Acceptance Checklist

Before completing mobile layout implementation, verify:

1. [ ] **Public Pages Mobile Audit**:
   - [ ] On mobile viewports (`< 1024px`), verified that NO sidebar, sidepanel, or hamburger drawer exists on public pages (`/`, `/about`, `/explore`, `/pricing`).
   - [ ] Verified fixed bottom navigation bar is visible at bottom with 3-4 primary links.
   - [ ] Tapping the "More" link smoothly slides up the bottom sheet drawer with secondary links.
2. [ ] **Dashboard Pages Mobile Audit**:
   - [ ] On mobile viewports (`< 1024px`), verified that the floating bottom-center pill is visible with `"Menu"` and hamburger icon.
   - [ ] Clicking `"Menu"` smoothly slides in the dashboard navigation sidebar from the left.
3. [ ] **Dual Close Controls Audit**:
   - [ ] Verified that when the sidebar opens, the bottom floating pill morphs into `"Close"` with an 'X' icon.
   - [ ] Clicking the bottom floating `"Close"` pill successfully dismisses the sidebar.
   - [ ] Verified that the top header of the mobile sidebar contains a dedicated close ('X') button.
   - [ ] Clicking the top header close button also dismisses the sidebar.
   - [ ] Clicking the backdrop dismisses the sidebar.
4. [ ] **Desktop Regression Check (`>= 1024px`)**:
   - [ ] On desktop, public mobile bottom bar and floating menu pill are strictly hidden (`lg:hidden`).
   - [ ] Desktop dashboard renders the full resizable `h-dvh` draggable sidebar (`hidden lg:flex`).
