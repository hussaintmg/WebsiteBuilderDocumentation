# Master Design Architecture & UI/UX System Specification

> **Applicability:** This document describes a Tailwind-oriented design system profile. Use it when Tailwind is already selected or explicitly requested. For projects using CSS Modules, vanilla CSS, Sass, styled-components, another utility framework or a design-system package, preserve the existing styling architecture and translate only the relevant visual principles. This document does not authorize a framework migration.


> **CORE MANDATE**: Tailwind CSS is the styling framework for this documented design profile, not a universal requirement across all projects. Every interface must feature state-of-the-art micro-animations, bespoke typography, fluid hover transitions, accessible dark/light themes, and specialized interactive components (Floating Label inputs, resizable `dvh` sidebars, animated toasts, and animated icons).
>
> 👑 **THE GOLDEN LAW: "DESIGN APNA BANANA HAI" (ZERO BLIND COPYING FROM DOCS)**:  
> This documentation defines architectural mechanics, structural patterns, and behavioral contracts. The AI agent or developer **MUST craft an original, bespoke, brand-tailored visual design** for each specific project. **NEVER copy-paste the exact dummy colors, example layouts, or sample palettes verbatim from these docs**. The color harmonies, typography pairings, card layouts, hero styling, and aesthetic personality must be handcrafted uniquely to match the client's domain and brand identity.

---

## 🎨 1. The Visual Foundations & Tailwind Theme System

### 1.1 Dual-Theme Harmony (Dark Mode Default + Light Mode)
All color utilities must use Tailwind's `dark:` variant and CSS variable blending for instantaneous, zero-flash theme toggling.

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          light: '#f8fafc',
          dark: '#07090e',
        },
        surface: {
          light: '#ffffff',
          dark: '#0f141f',
          elevatedLight: '#f1f5f9',
          elevatedDark: '#182030',
        },
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          400: '#38bdf8', /* Primary Sky Cyan */
          500: '#0ea5e9',
          600: '#0284c7',
        },
        accent: {
          indigo: '#6366f1',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
        }
      },
      boxShadow: {
        'glow-sky': '0 0 25px -5px rgba(56, 189, 248, 0.35)',
        'glow-indigo': '0 0 25px -5px rgba(99, 102, 241, 0.35)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
      },
      height: {
        dvh: '100dvh',
      },
      minHeight: {
        dvh: '100dvh',
      },
      maxHeight: {
        dvh: '100dvh',
      }
    },
  },
  plugins: [],
}
```

---

## 🎭 2. Animation & 3D Engineering Stack

### 2.1 Framer Motion (Component & Layout Animations)
- **Mandatory** for modal entrance/exits, layout morphing, toast popups, and hover physics.
- Standard easing curve: `cubic-bezier(0.16, 1, 0.3, 1)` (spring-like deceleration).

### 2.2 GSAP & ScrollTrigger (Scroll Sequences & High-Performance Timelines)
- Used for complex landing page reveals, timeline synchronizations, smooth parallax, and text scramble/reveal animations.

### 2.3 Three.js & WebGL 3D Models (High-Fidelity Standard, Parts Audit & Inspection Protocol)
- **Hard Constraint**: Three.js 3D scenes are ONLY enabled with explicit user confirmation.
- **The High-Quality 3D Model Law**: Every 3D model introduced—whether procedural in code or imported from verified sources—must be an exceptionally high-quality, complete 3D model with high-precision parameters. Unfinished or crude low-poly assets are strictly prohibited.
- **Mandatory Multi-Part Decomposition**: Every 3D model must be broken down and audited into its constituent child meshes, nodes, and bones:
  - Verify every part's geometry, world coordinates, pivot alignment, scale $(1, 1, 1)$, and surface normals.
  - Audit PBR materials (`roughness`, `metalness`, `envMapIntensity`, soft shadows, and power-of-two textures).
- **3D Staging & Inspection Tools**: All models must be inspected in the **Three.js Editor** (`threejs.org/editor`), Blender, or via our built-in `<ThreeModelInspector />` component before production integration.
- **Scroll & Timeline Rigging**: GSAP ScrollTrigger camera dollies, exploded part disassemblies, and turntable rotations must strictly adhere to geometric motion instructions.
- **Performance & Sourcing Budgets**:
  - External models must be 100% free, lightweight, animated, and licensed under CC0/Open Source (`.glb` with Draco compression from Kenney, Three.js official assets, or Sketchfab CC0).
  - Strict performance budgets: Desktop $\le 100\text{k}$ triangles; draw calls $\le 40$; mobile $\le 30\text{k}$ triangles.
  - Strict GPU disposal: On React unmount, recursively traverse the scene to dispose geometries, materials, textures, and force WebGL context loss to prevent memory leaks.
  - Graceful fallback: If WebGL is unsupported or mobile battery is constrained, fallback to animated 2D SVGs or Lottie.
- **Master Documentation**: See [`design-system/THREEJS_3D_MODEL_ARCHITECTURE_AND_INSPECTION_SYSTEM.md`](./THREEJS_3D_MODEL_ARCHITECTURE_AND_INSPECTION_SYSTEM.md).

---

## ✨ 3. Iconography, Animated Icons & Lottie Ecosystem

All projects must leverage high-grade iconography. Combine static icon sets with interactive, animated vector libraries:

### 3.1 Static & Lucide Icon Libraries
- **Lucide React** (`lucide-react`): Primary modern vector icon library.
- **FontAwesome** (`@fortawesome/react-fontawesome`): Comprehensive utility icons.
- **Google Material Symbols / Material Icons**: Enterprise & Google forms parity.

### 3.2 Animated Icons & Lottie Sources
| Platform | Asset Type | Best Use Case | Integration Method |
| :--- | :--- | :--- | :--- |
| **Lordicon** (`https://lordicon.com/` / `lordicons.com`) | Interactive Morphing Icons | Action triggers (Download, Delete, Success tick, Payment cards) | Web Component / Lordicon Lottie Player |
| **Icons8** (`https://icons8.com/`) | Animated & Illustrated Icons | Status cards, empty states, features | SVG / Animated WebP / Lottie |
| **LottieFlow** (`https://lottieflow.com/`) | Minimal Flow Animations | Toggle switches, menu burger-to-cross, spinners | `@dotlottie/react-player` |
| **LottieFiles** (`https://lottiefiles.com/`) | Rich Character & Scene Animations | Hero illustrations, checkout celebration, 404 pages | `@lottiefiles/react-lottie-player` |

### 3.3 Bespoke Brand Logo & Real Favicon Suite Architecture

> **MANDATORY BRAND ASSET RULE**:  
> Every project MUST have custom-crafted brand assets. Leaving the default Next.js triangle, Vite bird, React atom, or empty globe icon is strictly forbidden. The agent must create real, high-resolution, beautiful branding assets.

#### 1. Reusable Vector Brand Logo (`components/ui/BrandLogo.tsx`)
```tsx
"use client";

import React from "react";

export const BrandLogo: React.FC<{
  variant?: "full" | "icon";
  className?: string;
  brandName?: string;
}> = ({ variant = "full", className = "", brandName = "NovaSaaS" }) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Custom Vector Brand Mark */}
      <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-cyan-400 p-[1.5px] shadow-glow-sky group cursor-pointer">
        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
            <defs>
              <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="url(#logo-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="url(#logo-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="url(#logo-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Styled Wordmark (Only in full variant) */}
      {variant === "full" && (
        <span className="font-display font-extrabold text-lg tracking-tight text-slate-900 dark:text-white flex items-center">
          {brandName}
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 ml-0.5 animate-pulse" />
        </span>
      )}
    </div>
  );
};
```

#### 2. Complete Favicon & PWA Suite Checklist
Before deploying or completing foundation scaffolding, generate and install:
- `/public/favicon.ico`: Multi-resolution icon for legacy browser tabs.
- `/public/icon.svg` or `/src/app/icon.tsx`: Modern crisp SVG vector favicon that scales to Retina displays without pixelation.
- `/public/apple-touch-icon.png`: 180x180 px PNG for iOS home screen bookmarks and Safari tabs.
- `/public/icon-192.png` & `/public/icon-512.png`: PWA manifest icons.
- `/public/site.webmanifest`: Complete with `name`, `short_name`, `theme_color`, and `background_color`.

---

## 🔠 4. Bespoke Typography & Font Discovery

Never default to generic standard browser fonts. Recommend and configure expressive modern display typefaces alongside ultra-clean body fonts:

### 4.1 Curated Font Catalog
- **Display & Hero Statement Fonts**:
  - **Neofolio**: Modern geometric neo-grotesque with sharp high-contrast tech personality.
  - **Nexo Kora**: Futuristic, bold, cyber-industrial display font for SaaS & FinTech headers.
  - **Bierika**: Elegant, avant-garde editorial modern styling with curved terminals.
  - **OSIRIS**: Sci-fi, clean, minimalist architectural aesthetic for titles and badges.
  - **Clash Display / Cabinet Grotesk / Syne**: High-impact modern SaaS headlines.
- **Body & Interface Fonts**:
  - **Plus Jakarta Sans**: Crisp, ultra-legible contemporary UI font.
  - **Outfit**: Clean, geometric, friendly interface typeface.
  - **Inter**: High-density operational data tables and forms.

### 4.2 Discovery Protocol
During the planning interview, the agent presents 2-3 tailored font combinations from this catalog, showcases their vibe, and obtains the user's explicit approval before locking into the Tailwind font family config.

---

## 🧩 5. Custom Floating Label Input Components (Zero Placeholders!)

> **MANDATE**: Do NOT use default HTML `placeholder="..."` attributes. All inputs must use the custom floating label architecture designed below.

### 5.1 Floating Label Text & Password Input (`FloatingInput.tsx`)

#### Interaction Mechanics:
1. **Empty & Unfocused**: The label sits **vertically centered** inside the input, horizontally aligned to the left with padding (`left-4 top-1/2 -translate-y-1/2`).
2. **On Focus OR Has Value (`value.length > 0`)**: The label smoothly animates up to the **top border outline** (`top-0 -translate-y-1/2 scale-75`), with an opaque background notch matching the card/surface background.
3. **On Blur with Empty Value**: Smoothly returns to vertical center.

```tsx
"use client";

import React, { useState, useId } from "react";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  value = "",
  onChange,
  onFocus,
  onBlur,
  error,
  type = "text",
  className = "",
  ...props
}) => {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = String(value).length > 0;
  const isFloating = isFocused || hasValue;

  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        placeholder=" " /* Empty space trick for CSS peer fallback */
        className={`peer w-full rounded-xl border px-4 pt-4 pb-2 text-base text-slate-900 dark:text-slate-100 bg-transparent transition-all duration-200 outline-none
          ${
            error
              ? "border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
              : "border-slate-300 dark:border-slate-700/80 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
          } ${className}`}
        {...props}
      />
      
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all duration-200 origin-[0] px-1 font-medium select-none
          bg-surface-light dark:bg-surface-dark
          ${
            isFloating
              ? "top-0 -translate-y-1/2 text-xs font-semibold text-sky-600 dark:text-sky-400"
              : "top-1/2 -translate-y-1/2 text-base text-slate-500 dark:text-slate-400"
          }
          ${error ? "!text-rose-500" : ""}`}
      >
        {label}
      </label>

      {error && <p className="mt-1.5 text-xs text-rose-500 font-medium pl-1">{error}</p>}
    </div>
  );
};
```

---

### 5.2 Floating Label Textarea (`FloatingTextarea.tsx`)

#### Interaction Mechanics:
- In a textarea, the label must **never start in the middle of a tall box**. It sits aligned with the **first line** of text (`top-4`).
- Upon focus or when containing text, it transitions smoothly up to the top border notch (`top-0 -translate-y-1/2 text-xs`).

```tsx
"use client";

import React, { useState, useId } from "react";

interface FloatingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const FloatingTextarea: React.FC<FloatingTextareaProps> = ({
  label,
  value = "",
  onChange,
  onFocus,
  onBlur,
  error,
  rows = 4,
  className = "",
  ...props
}) => {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = String(value).length > 0;
  const isFloating = isFocused || hasValue;

  return (
    <div className="relative w-full">
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={onChange}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        placeholder=" "
        className={`peer w-full rounded-xl border px-4 pt-5 pb-3 text-base text-slate-900 dark:text-slate-100 bg-transparent transition-all duration-200 outline-none resize-y
          ${
            error
              ? "border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
              : "border-slate-300 dark:border-slate-700/80 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
          } ${className}`}
        {...props}
      />

      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all duration-200 origin-[0] px-1 font-medium select-none
          bg-surface-light dark:bg-surface-dark
          ${
            isFloating
              ? "top-0 -translate-y-1/2 text-xs font-semibold text-sky-600 dark:text-sky-400"
              : "top-4 text-base text-slate-500 dark:text-slate-400"
          }
          ${error ? "!text-rose-500" : ""}`}
      >
        {label}
      </label>

      {error && <p className="mt-1.5 text-xs text-rose-500 font-medium pl-1">{error}</p>}
    </div>
  );
};
```

---

### 5.3 Google Forms Style Floating Select (`FloatingSelect.tsx`)

#### Interaction Mechanics:
- Vertically centered label; no default selected placeholder text until the user actively picks an option or focuses.
- On focus or selection, the label rises to the top border.

```tsx
"use client";

import React, { useState, useId } from "react";

interface Option {
  value: string;
  label: string;
}

interface FloatingSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: string;
}

export const FloatingSelect: React.FC<FloatingSelectProps> = ({
  label,
  options,
  value = "",
  onChange,
  onFocus,
  onBlur,
  error,
  className = "",
  ...props
}) => {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = String(value).length > 0;
  const isFloating = isFocused || hasValue;

  return (
    <div className="relative w-full">
      <select
        id={id}
        value={value}
        onChange={onChange}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        className={`w-full rounded-xl border px-4 pt-4 pb-2 text-base text-slate-900 dark:text-slate-100 bg-transparent transition-all duration-200 outline-none appearance-none cursor-pointer
          ${
            error
              ? "border-rose-500 focus:border-rose-500"
              : "border-slate-300 dark:border-slate-700/80 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
          } ${className}`}
        {...props}
      >
        <option value="" disabled hidden />
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            {opt.label}
          </option>
        ))}
      </select>

      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all duration-200 origin-[0] px-1 font-medium select-none
          bg-surface-light dark:bg-surface-dark
          ${
            isFloating
              ? "top-0 -translate-y-1/2 text-xs font-semibold text-sky-600 dark:text-sky-400"
              : "top-1/2 -translate-y-1/2 text-base text-slate-500 dark:text-slate-400"
          }
          ${error ? "!text-rose-500" : ""}`}
      >
        {label}
      </label>

      {/* Custom Chevron Indicator */}
      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {error && <p className="mt-1.5 text-xs text-rose-500 font-medium pl-1">{error}</p>}
    </div>
  );
};
```

---

## 🔘 6. Interactive Atoms: Buttons, Links, Scrollbars & Dropdowns

### 6.1 Mandatory `cursor: pointer` Rule
Every interactive button, clickable card, tab, dropdown trigger, and link component **MUST** include `cursor-pointer` explicitly.
- **Button Micro-Interactions**:
  - `active:scale-[0.98]`
  - `hover:-translate-y-0.5`
  - Radiant border glow on primary CTAs (`shadow-glow-sky`).

```tsx
// components/ui/AppButton.tsx
export const AppButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' }> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const styles = {
    primary: "bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-semibold shadow-md hover:shadow-glow-sky hover:from-sky-300 hover:to-blue-400",
    secondary: "bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-700",
    danger: "bg-rose-600 text-white hover:bg-rose-500 shadow-md hover:shadow-rose-500/25",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl cursor-pointer transition-all duration-200 active:scale-[0.98] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

### 6.2 Custom Animated Scrollbars
In `globals.css` via Tailwind `@layer utilities`:
```css
@layer utilities {
  /* Ultra-sleek custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.25);
    border-radius: 9999px;
    transition: background 0.2s ease;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(56, 189, 248, 0.6);
  }
}
```

---

## 🍞 7. High-End Animated Toast System (Framer Motion)

- Entrance: Slides in from top/right with spring bounce.
- Hover: Pause timer and subtle scale-up + border highlight.
- Exit: Smooth shrink and slide-out.

```tsx
// components/ui/ToastContainer.tsx
import { motion, AnimatePresence } from "framer-motion";

export const ToastItem = ({ toast, onDismiss }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -15, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-slate-900/90 text-slate-100 border border-sky-400/30 backdrop-blur-xl shadow-glow-sky cursor-pointer"
      onClick={onDismiss}
    >
      <span className="text-xl">✨</span>
      <div>
        <h4 className="font-semibold text-sm">{toast.title}</h4>
        <p className="text-xs text-slate-300">{toast.message}</p>
      </div>
    </motion.div>
  );
};
```

---

## 📐 8. Layout Engine: Resizable `h-dvh` Sidebar & Glass Topbar

### 8.1 The Resizable Dynamic Viewport Sidebar (`Sidebar.tsx`)
- **Position**: `fixed top-0 left-0`.
- **Height**: `h-dvh` (Dynamic viewport height to prevent mobile browser URL bar bugs).
- **Collapsible**: Smooth collapse to icon rail (e.g. 72px) or zero.
- **Draggable Handle**: A split handle on the right edge allows users to drag and set custom width (e.g. between 220px and 450px), saved in `localStorage`.

```tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

export const ResizableSidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [width, setWidth] = useState(280);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isResizingRef = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar_width");
    if (saved) setWidth(Number(saved));
    const savedCollapse = localStorage.getItem("sidebar_collapsed");
    if (savedCollapse !== null) setIsCollapsed(savedCollapse === "true");
  }, []);

  // Keyboard shortcut toggle: Ctrl+B or Alt+S
  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("sidebar_collapsed", String(next));
      return next;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable;
      if (isInput) return;

      if ((e.ctrlKey && e.key.toLowerCase() === "b") || (e.altKey && e.key.toLowerCase() === "s")) {
        e.preventDefault();
        toggleCollapse();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleCollapse]);

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizingRef.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!isResizingRef.current) return;
      const newWidth = Math.min(Math.max(moveEvent.clientX, 200), 480);
      setWidth(newWidth);
    };

    const onMouseUp = () => {
      isResizingRef.current = false;
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
      localStorage.setItem("sidebar_width", String(width));
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <aside
      style={{ width: isCollapsed ? 76 : width }}
      className="fixed top-0 left-0 h-dvh bg-surface-light dark:bg-surface-dark border-r border-slate-200 dark:border-slate-800/80 z-40 transition-[width] duration-150 ease-out flex flex-col justify-between"
    >
      <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin">
        {children}
      </div>

      {/* Drag & Resize Handle */}
      {!isCollapsed && (
        <div
          onMouseDown={startResizing}
          className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-sky-400/50 active:bg-sky-400 transition-colors"
          title="Drag to resize sidebar width"
        />
      )}
    </aside>
  );
};
```

---

### 8.2 Mobile Public Pages: Strict No-Sidebar & Fixed Bottom Footer Bar

Cross-referenced with [`modules/MOBILE_NAVIGATION_AND_LAYOUT.md`](../modules/MOBILE_NAVIGATION_AND_LAYOUT.md).

> **MANDATORY PUBLIC MOBILE LAYOUT LAW**:  
> On mobile viewports (`< 1024px`), **public marketing, landing, and storefront pages MUST NEVER render a sidebar or slide-out sidepanel**.

Instead, public pages on mobile **MUST feature a Fixed Bottom Footer Navigation Bar**:
1. **Positioning**: Fixed at bottom of screen (`fixed bottom-0 inset-x-0 z-40 lg:hidden`).
2. **Glassmorphism**: High-blur frosted glass (`backdrop-blur-xl bg-white/90 dark:bg-slate-950/90 border-t border-slate-200/80 dark:border-slate-800/80 pb-safe`).
3. **Curated Primary Tabs (3-4 Only)**: Display only 3-4 key destinations (e.g. Home, Explore, Cart/Orders) with crisp icons and labels to guarantee zero clutter.
4. **Mandatory "More" Link & Bottom Sheet**: The final item in the bottom bar is always **"More"** (`...`). Tapping it smoothly slides up an animated native-style bottom sheet containing all secondary links (About, FAQs, Contact, Terms, Language/Theme controls).

---

### 8.3 Mobile Dashboard: Floating Bottom-Center "Menu" Pill & Dual Close Controls

In authenticated dashboard applications (Staff, Admin, Owner, Developer):
1. **Mobile Sidebar Available**: Dashboards provide a full navigation sidebar that slides in as a mobile drawer from the left.
2. **Floating Bottom-Center "Menu" Pill (Vercel-Inspired)**:
   - Anchored at bottom center: `fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden`.
   - Bespoke obsidian glass styling with ambient glow shadow and micro-icon: `"Menu"`.
3. **Dual Close ('X') Controls & State Morphing**:
   - When the mobile sidebar opens:
     - **Control 1 (Bottom Floating Pill Morphing)**: The bottom pill smoothly morphs into **"Close"** with an animated 'X' cross icon.
     - **Control 2 (Sidebar Header Close Button)**: Inside the open mobile drawer, the top header has a dedicated close button with an 'X' icon.
   - Clicking **either** the bottom floating Close button, the top header 'X' button, or tapping the blurred backdrop dismisses the sidebar.

---

## 📊 9. Responsive Data Presentation: Desktop Table vs Mobile Cards Hybrid Architecture

> **MANDATORY DESIGN RULE**:  
> Anywhere data is presented in a listing or management screen:
> - **Desktop (`lg:`, `>= 1024px`)**: ALWAYS render the Master Data Table. The Card Grid is strictly hidden (`hidden lg:block`).
> - **Mobile & Tablet (`< 1024px`)**: ALWAYS render the touch-optimized Interactive Cards Grid. The Data Table is strictly hidden (`block lg:hidden`).
> - Both views share the same dataset, filter bar, sorting mechanism, selection state, and pagination.

### 9.1 Column Sorting Standard
- Sorting is enabled **ONLY** on valid sortable columns (e.g. ID, Date, Amount, Status, Name).
- Action columns, avatars, and checkboxes MUST have sorting disabled.
- Tri-state toggle: Neutral (`null`) -> Ascending (`asc`) -> Descending (`desc`).
- Active sort columns display glowing Sky Cyan indicators (`▲` / `▼`).

### 9.2 Smart Pagination with Animated Navigation Loaders
- **Arrow Navigation**: `ArrowLeft` flips to Previous Page; `ArrowRight` flips to Next Page (active when user is not typing in an input).
- **Loading State**: When switching pages, the active navigation button displays an animated spinner (`Loader2 animate-spin text-sky-500`), all navigation controls are disabled to prevent double-clicks, and the data container displays a subtle skeleton/shimmer effect.

---

## 🖱️ 10. Google Drive-Style Marquee Drag Selection Engine

To provide desktop-grade power usability, users can click and drag across the screen to select multiple items:
1. **Interactive Drag Box**: Holding mouse down on any empty canvas area and dragging draws a translucent rectangle (`border border-sky-400 bg-sky-500/15 backdrop-blur-[1px] rounded-sm pointer-events-none`).
2. **AABB Intersection Detection**:
   - Each row (`<tr data-selectable-id="...">`) and card (`<div data-selectable-id="...">`) is measured against the drag rectangle's coordinates.
   - Any item that collides with or lies within the rectangle is dynamically selected in real-time.
3. **Modifiers**:
   - `Shift + Drag`: Adds items to the existing selection.
   - `Ctrl + Drag`: Inverts the selection state of intersected items.
   - Normal Drag: Replaces current selection with the newly intersected items.
   - `Escape`: Instantly cancels selection.
4. Reference full code hook in [`modules/DATA_TABLE_AND_CARDS_SYSTEM.md`](../modules/DATA_TABLE_AND_CARDS_SYSTEM.md).

---

## ⚡ 11. Floating Bulk Action Toolbar & Mandatory Animated Icons

Whenever 1 or more items are selected (via checkbox, `Ctrl + A`, or marquee drag), a floating glassmorphic toolbar slides up from the bottom center (`fixed bottom-6 left-1/2 -translate-x-1/2`).

### 11.1 "Select on All Other Pages" Banner
When all items on the current page are checked:
- Display banner: *"All 25 items on this page are selected. [Select all 1,450 items across all pages]"*.
- Clicking allows batch execution across the full filtered dataset.

### 11.2 Mandatory Animated Icons Rule
Every button in the Bulk Action Toolbar **MUST** contain an animated icon (Lordicon, Lottie, or Framer Motion animated SVG):
1. **Delete All** (`Alt + D`): Animated Trash Can with lifting lid + confirmation modal.
2. **Bulk PDF Download** (`Alt + E`): Animated Document Downloader with bouncing downward arrow.
3. **Bulk Send Email** (`Alt + M`): Animated Flying Envelope.
4. **Bulk Send WhatsApp** (`Alt + W`): Animated WhatsApp Chat Bubble with pulsing wave.

---

## ⌨️ 12. Master Keyboard Shortcuts & Global Search (`F`) System

All interfaces must hook into the master shortcut engine detailed in [`modules/SHORTCUT_KEYS_SYSTEM.md`](../modules/SHORTCUT_KEYS_SYSTEM.md):
- **Global Search `F` Key**: Pressing `f` (or `/`) opens Global Search / Command Palette **ONLY** when the cursor is outside text inputs, textareas, and select elements.
- **Sidebar Toggles**: `Ctrl + B` or `Alt + S`.
- **Theme Switcher**: `Alt + T`.
- **Complete `Ctrl` Suite**: `Ctrl + A` (Select all), `Ctrl + C` (Copy record), `Ctrl + V` (Batch paste), `Ctrl + X` (Cut/stage), `Ctrl + O` (Open details), `Ctrl + Z` (Undo), `Ctrl + Y` (Redo), `Ctrl + S` (Save draft), `Ctrl + Enter` (Submit/Approve), `Ctrl + K` (Command palette), `Ctrl + P` (PDF print).
- **Complete `Alt` Suite**: `Alt + D` (Delete selected), `Alt + E` (Bulk PDF), `Alt + M` (Bulk Email), `Alt + W` (Bulk WhatsApp), `Alt + N` (New record), `Alt + F` (Focus filter).

---

## 🔐 13. Authentication & Account Switching UI/UX Standards

Cross-referenced with [`modules/AUTH_AND_FACELOCK.md`](../modules/AUTH_AND_FACELOCK.md).

### 13.1 Silent Background Facelock (Custom AI Model Engine - No Passkeys)
- When the login page mounts, biometric face recognition is initiated silently in the background via our custom client-side face landmark model **(NO WebAuthn / NO OS passkeys)** without displaying any camera feed or webcam preview box.
- The model captures a clean frame via a hidden off-screen video element, extracts a 128-dimensional embedding vector, and matches it against database vectors.
- If recognized: user is authenticated automatically.
- If unverified or unsupported: the manual "Sign in with Face Biometric" button is shown gracefully without throwing disruptive errors.

### 13.2 Multi-Account Topbar Switcher
- The topbar user profile dropdown must include an interactive **"Switch Account"** section displaying all currently logged-in accounts on this device.
- Clicking any authenticated account switches active session instantaneously **without requiring a password re-entry**.
- Includes an **"Add another account"** button linking to `/login?mode=add_account`. If only 1 account exists, clicking "Switch Account" redirects to the login screen.

### 13.3 6-Box Auto-Verifying OTP Component
- **Structure**: 6 discrete rounded input boxes (`input type="text"`, `inputMode="numeric"`, `maxLength={1}`).
- **Clipboard Paste**: Full support for pasting (`Ctrl + V`) a 6-digit code which distributes across the boxes automatically.
- **Auto-Verification**: Trigger verification immediately upon completion of the 6th digit—**never require clicking a manual "Verify" button**.

### 13.4 Real-Time Password Strength Meter
- Every password creation and reset screen must display a dynamic strength bar (Weak, Moderate, Strong) paired with real-time green checkmarks for all 5 criteria:
  1. Minimum 8 characters.
  2. Uppercase letter (`[A-Z]`).
  3. Lowercase letter (`[a-z]`).
  4. Numeric digit (`[0-9]`).
  5. Special symbol (`[!@#$%^&*]`).

---

## ⏳ 14. Loading State Architecture, Skeleton Themes & Two-Phase Dashboard Hydration

Cross-referenced with [`modules/CMS_ENGINE.md`](../modules/CMS_ENGINE.md#26-two-phase-dashboard-hydration-lifecycle--hierarchical-single-fetch-context-providers).

### 14.1 The Zero Upper Progress Bar Law
> 🚫 **STRICT BAN ON TOP LOADING BARS**:
> The application must **NEVER** render a top progress line, browser-edge thin bar (e.g. NProgress), or top-screen loading indicator on the Home page, public pages, or dashboard.
>
> **The Standard**: Every asynchronous loading state must render an exact **Layout-Matching Skeleton** that preserves the physical aspect ratio, card height, and table grid of the destination view, guaranteeing **Zero Layout Shift (CLS = 0)**.

### 14.2 Skeleton Loading Themes & `localStorage` Synchronization
1. **Visual Theme Variants**:
   - **`CLASSIC_SHIMMER`**: Smooth diagonal metallic gradient sweep (`90deg` shimmer).
   - **`PULSE_WAVE`**: Sinusoidal opacity fade wave (`0.35` to `0.90`).
   - **`CYBER_NEON_GLOW`**: Subtle ambient neon edge breathing glow (Cyan / Violet tint).
   - **`LIQUID_GLASS`**: Translucent frosted shimmer with `backdrop-filter: blur(8px)`.
   - **`MINIMAL_STATIC`**: Flat, low-contrast placeholder blocks for dense tabular screens.
2. **`localStorage` Persistence**:
   - Active skeleton theme is stored in `localStorage.setItem("cms_skeleton_theme", theme)` so client-side navigation renders with zero styling flash.

### 14.3 New User / First-Time Visitor Default: Branded Circle Loader
- When a user visits the platform for the first time (no cached theme in `localStorage` or initial asset cold boot):
  - The UI presents a centered **`<BrandedCircleLoader />`** with dual concentric orbital rings and ambient brand glow.
  - As soon as the client environment initializes, the application permanently activates the customized Skeleton Loading system.

### 14.4 Two-Phase Dashboard Hydration Lifecycle
When navigating to `/dashboard/*`:
1. **Phase 1: User & Session Verification Handshake**:
   - The UI displays the centered **`<BrandedCircleLoader />`** while verifying the session cookie, tenant binding, and role permissions.
   - Prevents flashing unauthorized dashboard layouts before the proxy check passes.
2. **Phase 2: Post-Verification Layout Skeleton (`<DashboardSkeletonLayout />`)**:
   - The instant authentication is validated, the screen cross-fades into the complete **Dashboard Skeleton Layout**:
     - Sidebar skeleton with logo pill and 6–8 navigation shimmer bars.
     - Topbar skeleton with breadcrumb, search input pill, and user profile circle.
     - Main content area with 4 metric card skeletons, chart shimmer canvas, and 5-row striped table skeleton.
   - Once data arrives, the skeleton cross-fades into live interactive components.

### 14.5 The "Fetch-Once" Context Standard
- Sidebar items, user profile, unread notification counts, and company details are loaded **EXACTLY ONCE** into a `DashboardShellContext` on initial dashboard mount.
- Internal navigation between dashboard tabs (e.g. `/dashboard` -> `/dashboard/orders` -> `/dashboard/cms`) **never triggers re-fetching of sidebar or shell data**.

---

## 🧩 15. Context-Driven State Management & Automatic Component Synchronization

Cross-referenced with [`rules/MODELS_AND_CONTEXTS_ARCHITECTURE.md`](../rules/MODELS_AND_CONTEXTS_ARCHITECTURE.md).

### 15.1 The Zero-Duplicate-Variable Law
> ⚠️ **STRICT PROHIBITION**:
> Components and sub-views **must never create duplicate local state variables** for data that is already managed by a React Context.
>
> - **Anti-Pattern**: Copying context arrays into local component state (`const [localList, setLocalList] = useState(contextList)`) causes split-brain state desynchronization.
> - **The Standard**: Components must consume context variables directly:
>   ```tsx
>   // ✅ CORRECT: Direct subscription to context variables
>   const { programs, selectedProgram, editProgram, deleteProgram } = useProgram();
>   ```

### 15.2 In-Place State Mutation & Automatic UI Re-Rendering
1. When an entity is created, edited, or deleted:
   - The operation executes through the context method (e.g. `editProgram(id, updates)`).
   - Upon API confirmation, the context updates its existing state array in-place immutably using React `useState`:
     ```tsx
     setPrograms((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
     ```
2. **Automatic Synchronization Across Views**:
   - Every active component subscribed to `useProgram()` across the page (e.g. the Master Data Table, the Slide View Card, the Metric Summary Pill, and the Edit Drawer) **automatically re-renders with the fresh data**.
   - No manual window reloads, no duplicate API round-trips, and zero visual desynchronization.

### 15.3 Layout Stability & Context Scoping
- Dashboard Layouts and Shells must never execute API calls on route changes. Layout data is read directly from `DashboardShellContext`.
- Public landing pages remain lightweight by omitting domain-specific model contexts.

---

## 🚀 16. Premium Button Animation System (100 Hover & 100 Task Presets)

Cross-referenced with master specifications [`design-system/PREMIUM_BUTTON_ANIMATION_SYSTEM.md`](../design-system/PREMIUM_BUTTON_ANIMATION_SYSTEM.md), [`design-system/TASK_ANIMATED_BUTTONS_SYSTEM.md`](./TASK_ANIMATED_BUTTONS_SYSTEM.md), and [`design-system/ROW_CARD_DELETE_DUSTBIN_ANIMATION.md`](./ROW_CARD_DELETE_DUSTBIN_ANIMATION.md).

### 16.1 The 100 Hover + 100 Task Animation Standard
- **Enterprise Scope**: The application supports a centralized registry of **100 Unique Hover Presets** (Surface, Typography, Iconography, Interactive Light, and CTA Utilities) and **100 Unique Task Presets** (Shopping, Payment, Documents, Messaging, CRUD, RBAC, and Engagement).
- **The 9-State Lifecycle Machine**: Every button operates deterministically across `idle`, `hover`, `pressed`, `loading`, `processing`, `success`, `error`, `cancelled`, and `reset` states without layout shifts or text overflow.
- **The Zero-Boring-Spinner Prohibition**: Generic circle loading spinners (`animate-spin` simple borders) are strictly banned across all surfaces. Buttons must reflect the tangible physical operation being executed.

### 16.2 The Minimum Cycle & Loop Synchronization Law
1. **Looping on Slow API Response**: If the server network request takes longer than the animation cycle duration ($T_{api} > T_{cycle}$), the animation seamlessly loops continuously without stuttering or abrupt restarts.
2. **Cycle Completion on Fast API Response**: If the server responds faster than the animation cycle (e.g. API takes 150ms while $T_{cycle} = 1000\text{ms}$), the animation **MUST complete its ongoing cycle gracefully to 100% duration**. Never cut off, snap, or abort an in-flight animation.
3. **The Strict Post-Animation Toast Execution Rule**:
   - Toast notifications (`toast.success()`, `toast.error()`) **MUST NEVER be triggered mid-flight** while the button is still animating.
   - The toast trigger callback is guaranteed to fire **strictly after the full animation cycle and terminal morph transition finish**.

### 16.3 Standard Component Integration
All action buttons are implemented using the universal `<AnimatedButton />` primitive, `<TaskAnimationRenderer />`, and `useTaskAnimationSync` hook:

```tsx
<TaskAnimatedButton
  id="btn-delete-program"
  label="Delete Program"
  activeLabel="Shredding Record..."
  successLabel="Program Deleted"
  variant="destructive"
  idleIcon={<Trash2 className="w-5 h-5" />}
  animatingVector={<ShredderAnimationVector />}
  cycleDuration={850}
  onClick={() => deleteProgram(program._id)}
  onSuccessToast={() => toast.success("Program permanently deleted from MongoDB.")}
/>
```

### 16.4 The Table Row & Card Deletion Protocol (Confirmation Modal + Canvas Dustbin Fabric-Fold)
Cross-referenced with master specification [`design-system/ROW_CARD_DELETE_DUSTBIN_ANIMATION.md`](./ROW_CARD_DELETE_DUSTBIN_ANIMATION.md).

1. **The Confirmation Modal Handshake**:
   - Clicking Delete on any table row or card **never runs an abrupt in-place animation**.
   - `<DeleteConfirmationModal />` opens first.
   - The modal's Delete button loops its task-specific shredder animation while awaiting API completion.
2. **Success Sequence (Toast -> Modal Close -> Canvas Dustbin)**:
   - On HTTP 200 confirmation, Success Toast displays first, the modal closes, and the **Canvas Dustbin emerges from the right side of the screen/viewport**.
   - The deleted row or card performs a **3D Fabric Folding Wave**: curling from its right edge like silk fabric and suctioning directly into the dustbin mouth.
   - The dustbin lid snaps shut and exits right offscreen.
   - The item is removed from the single canonical React Context state array (`programs`), and all remaining rows/cards glide seamlessly into place using Framer Motion `layout` FLIP physics.
3. **Bulk Deletion Group Flight**:
   - Multiple selected rows/cards lift and fold into the right-side dustbin **together at the exact same time** (sequential deletion is banned).
4. **Error Immunity**:
   - If the backend call fails, Error Toast displays, the canvas dustbin animation **NEVER EXECUTES**, and the item remains 100% visible and untouched.

### 16.5 The Universal Hover Animation System Across 9 UI Categories
Cross-referenced with master specification [`design-system/MASTER_HOVER_ANIMATION_SYSTEM.md`](./MASTER_HOVER_ANIMATION_SYSTEM.md).

Hover micro-interactions are not restricted to buttons; they are enforced across all 9 core UI element categories:
1. **Buttons & CTAs**: Vercel ambient glow, Codrops sliding color sweep, Framer Motion spring physics.
2. **Links & Navigation Typography**: Kinetic rolling split-text, center-out underlines, cursor-following media reveals, `:has()` sibling dimming.
3. **Cards & Content Surfaces**: 3D perspective gyro tilt (`perspective: 1000px`), real-time cursor radial spotlights, offset-path border beams.
4. **Data Tables & Rows**: Progressive disclosure action toolbars, soft cyan highlighter tint shifts, left accent strips, elevation micro-shadows.
5. **Navigation Menus & Tabs**: Framer Motion shared `layoutId="active-pill"` and `layoutId="hover-pill"`, animated dropdown panels, chevron 180° rotation.
6. **Form Inputs & Controls**: Floating label `peer` transforms, glowing focus ring auras (`ring-4 ring-brand/15`), animated toggle switches.
7. **Media, Avatars & Video**: Cursor-following action badges ("EXPLORE"), coordinate-aware zoom lenses, radar acoustic beacon pings.
8. **Badges, Tags & Chips**: Lift & glow micro-elevation (`translateY(-1px)`), rotating close 'x' icons, selection state scale morphs.
9. **Overlays, Tooltips & Accordions**: Portal-rendered tooltips (`z-50`), rotating plus-to-minus indicators (45°), smooth height layout expansion.

---

## 🛡️ 17. The Granular RBAC Permission UI & Zero-Leak UI Elimination Law

Cross-referenced with master specification [`modules/RBAC_SYSTEM.md`](../modules/RBAC_SYSTEM.md).

### 17.1 The Zero-Leak UI Elimination Law
User interfaces must never expose UI elements that the user cannot interact with:
1. **Zero-Leak Navigation Elimination**:
   - If a page is disabled for a role, its navigation link is **completely stripped** from desktop sidebars, mobile bottom bars, topbar breadcrumbs, and quick action palettes.
   - If a user navigates to the URL directly, [`<RouteGuard />`](../modules/RBAC_SYSTEM.md#64-route-level-access-guard-componentscommonrouteguardtsx) returns `null` immediately and redirects, preventing any visual frame flash.
2. **Zero-Leak Button Elimination**:
   - If an action button (e.g. Delete, Export PDF, WhatsApp) is disallowed, [`<ActionGuard />`](../modules/RBAC_SYSTEM.md#62-action-level-button-guard-componentscommonactionguardtsx) returns `null`.
   - **Banned Practice**: Disallowed buttons must **never** be rendered in disabled states, greyed out, or visually styled with `opacity-0` or `pointer-events-none`. If a user cannot execute an action, the button does not exist in the DOM.

### 17.2 The Owner 3-Tier Permission Governance Studio
Implemented in [`components/rbac/OwnerPermissionStudio.tsx`](../modules/RBAC_SYSTEM.md#7-the-owner-permission-studio-component-componentsrbacownerpermissionstudiotsx):
- **Tier 1 (Role Selection)**: Owner selects the target company role from an interactive pill bar.
- **Tier 2 (Page Module Grid)**: Displays cards for each domain module (`Programs`, `Orders`, `Customers`, `Invoices`, `CMS`) with master toggle switches.
- **Tier 3 (Granular Drilldown Modal)**:
  - **Part A (Action Buttons)**: Checkbox matrix for `create`, `edit`, `delete`, `export_pdf`, `send_whatsapp`.
  - **Part B (Row-Level Data Scope)**: Radio selector for `OWNER_ONLY`, `OWN_ONLY`, `ALL_USERS`, `SELECTED_ROLES`, `SELECTED_USERS`. Role and user dropdown pickers are strictly filtered to the current tenant (`companyId`).
  - **Part C (Action-on-Scoped-Data Matrix)**: Fine-grained controls defining allowed actions on records created by other users within the selected scope.

### 17.3 Task-Synchronized Save Animation
- The "Save Permissions" button uses `<TaskAnimatedButton />` with the **`save_vault_lock`** preset.
- Follows the **Minimum Cycle & Loop Synchronization Law**: guarantees a full 1000ms cyber-vault locking animation, smooth looping during network latency, flawless transition to a checkmark shield, and triggers success toast notifications strictly *after* motion completion.

---

## 🚧 18. Website Maintenance Mode UI & Ambient Visual Standards

Cross-referenced with master specification [`modules/CMS_ENGINE.md`](../modules/CMS_ENGINE.md#25-website-maintenance-mode-studio--sovereign-access-interceptor) and [`modules/ROUTE_PROXY_AND_PROTECTION_SYSTEM.md`](../modules/ROUTE_PROXY_AND_PROTECTION_SYSTEM.md#7-edge-middleware-maintenance-mode-interception--sovereign-bypass-handshake).

### 18.1 Public Maintenance Screen Aesthetics (`<MaintenanceModeView />`)
When maintenance mode is active, public visitors must never see a crude plain text message. They encounter an enterprise-grade visual experience:
1. **Atmospheric Canvas Lighting**:
   - Deep canvas background (`#07090e`) with layered radial ambient glows: cyan blur aura (`blur-[140px]`) at top center, subtle amber bloom at bottom.
2. **Dynamic Brand Identity**:
   - Header inherits the organization's high-resolution logo and title from [`CmsWebsiteDetails`](../modules/CMS_ENGINE.md#23-website-details-studio--global-brand-cascading).
   - Real-time maintenance status pill with pulsing amber radar beacon.
3. **Typography & Message Delivery**:
   - Dynamic `headline` in high-impact font (`font-black tracking-tight text-white`).
   - Dynamic `tagline` paragraph (`text-slate-300 font-normal leading-relaxed max-w-xl mx-auto`).
   - Optional live countdown timer displaying estimated completion timestamp.
4. **Prominent Admin & Owner Login CTA**:
   - A bold, illuminated CTA button (`bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 py-4 rounded-2xl shadow-xl shadow-cyan-500/25`) directing authorized personnel to `/login`.

### 18.2 Sovereign Bypass Dashboard Banner (`<MaintenanceActiveBanner />`)
- When a Developer or Owner navigates the dashboard while maintenance mode is active, a persistent, non-intrusive warning banner is anchored to the top of the viewport (`sticky top-0 z-50 bg-amber-500 text-slate-950`).
- Displays a clear status notice: *"⚠️ MAINTENANCE MODE IS ACTIVE: Public visitors see your maintenance screen. [ Manage in CMS ]"*.

### 18.3 Non-Owner Role Lockout Screen (`<MaintenanceLockoutScreen />`)
- If a non-owner authenticated user (Staff, Admin, Customer) logs in while maintenance is active:
  - System intercepts navigation and displays a centered frosted dark card (`bg-slate-900/90 border-slate-800`).
  - Displays user email and role badge, clearly stating: *"Access to operational dashboards is restricted to Platform Developers and Business Owners during maintenance."*
  - Provides a single-click `[ Sign Out ]` button.

---

## 🎛️ 19. Animation Engine Feature Flag (`feature:animations`) & Dual-Mode Rendering Standards

Cross-referenced with master specification [`modules/SETTINGS_AND_FEATURE_FLAGS_SYSTEM.md`](../modules/SETTINGS_AND_FEATURE_FLAGS_SYSTEM.md#63-the-animation-engine-feature-flag-featureanimations--instant-fallback-contract) and [`design-system/PREMIUM_BUTTON_ANIMATION_SYSTEM.md`](./PREMIUM_BUTTON_ANIMATION_SYSTEM.md#10-feature-flag-interceptor--instant-fallback-engine-featureanimations).

The **`feature:animations`** flag allows platform operators and tenant owners to dictate whether rich micro-animations are rendered on their website and dashboard:

### 19.1 The Dual-Mode Visual Rendering Law
1. **Mode A: Rich Motion Mode (`feature:animations === true`, Default)**:
   - Full motion architecture active: all 100 Hover presets, 100 Task-synchronized animations, Mac-like 3D Fabric Fold into right-sliding Canvas Dustbin, 3D gyro perspective card tilt, and kinetic typography.
2. **Mode B: Instant Accessible Fallback Mode (`feature:animations === false`)**:
   - Designed for low-latency corporate environments, battery-constrained devices, or clients preferring clean, distraction-free software.
   - **Zero 3D Transforms / Canvas Overlays**: Canvas Dustbin and 3D gyro tilt are completely unmounted.
   - **Instant State Labels**: Action buttons swap states instantly without looping vector delays (`"Saving..."` ➔ `"Saved"`).
   - **Zero Spinners Law Preserved**: Even with animations disabled, **no generic spinning circles (`animate-spin`) are permitted**. Clean typography and status text convey state.
   - **Row/Card Deletions**: Removed from context state immediately with a clean 150ms opacity fade.

---

## 🎨 20. The Universal Decorative Shell & Component Styling Engine

Cross-referenced with master specification [`modules/CMS_ENGINE.md`](../modules/CMS_ENGINE.md#29-the-universal-component-decorator--responsive-multi-viewport-stylist).

### 20.1 Decorative Tokens & Universal Target Registry
The design system exposes a unified set of decorative styling tokens that govern both public storefront shells and operational dashboard components:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    UNIVERSAL DECORATIVE STYLING TOKENS                      │
├────────────────────┬────────────────────────────────────────────────────────┤
│ Corner Radiuses    │ `radius-none` (0px), `radius-sm` (6px), `radius-md`    │
│                    │ (12px), `radius-lg` (18px), `radius-xl` (24px),        │
│                    │ `radius-2xl` (32px), `radius-full` (9999px)            │
├────────────────────┼────────────────────────────────────────────────────────┤
│ Border Glows       │ `glow-cyan` (0 0 15px rgba(6, 182, 212, 0.35)),        │
│                    │ `glow-magenta` (0 0 15px rgba(236, 72, 153, 0.35)),     │
│                    │ `glow-amber` (0 0 15px rgba(245, 158, 11, 0.35)),      │
│                    │ `glow-subtle` (0 0 8px rgba(255, 255, 255, 0.12))      │
├────────────────────┼────────────────────────────────────────────────────────┤
│ Surface Optics     │ `glass-frosted` (bg-surface/70 backdrop-blur-md),       │
│                    │ `glass-heavy` (bg-surface/85 backdrop-blur-xl),         │
│                    │ `glass-translucent` (bg-surface/40 backdrop-blur-sm)    │
├────────────────────┼────────────────────────────────────────────────────────┤
│ Hover Physics      │ `hover-lift` (scale 1.02x, translateY -2px, 200ms),     │
│                    │ `hover-glow` (border-opacity 100%, shadow increase)     │
└────────────────────┴────────────────────────────────────────────────────────┘
```

### 20.2 Shell & Core UI Component Customization

#### 1. Public & Dashboard Navigation Shells:
- **Public Topbar & Mobile Bottom Bar**:
  - Configurable floating pill vs edge-to-edge docking.
  - Active navigation indicator pill with subtle colored underglow.
- **Dashboard Resizable Sidebar**:
  - Right-border accent gradient stroke (`border-r border-white/10 dark:border-white/5`).
  - Active menu link: illuminated background pill (`bg-cyan-500/10 text-cyan-400 border border-cyan-500/20`).
- **Dashboard Mobile Floating Menu Glass Pill**:
  - Frosted glass HUD with morphing text icon between `"Menu"` and `"Close"` and ambient glow beacon.

#### 2. Dashboard Core Data UI Components:
- **Bento & Metric Cards**:
  - Configurable corner radius (`12px` to `24px`), multi-layer box shadows, and frosted glass opacity.
- **Master Data Tables**:
  - Gradient table header with crisp uppercase typography.
  - Alternating zebra row tinting (`bg-surface/20`) and hover glow highlights.
  - Integration with the 3D Canvas Dustbin deletion animation.
- **Filters, Search Bars & Pagination**:
  - Custom floating label inputs with accent focus rings (`focus:ring-2 focus:ring-cyan-500/40`).
  - Pagination pills with active page glow and tactile chevron buttons.
- **Chart & Graph Containers**:
  - Card backdrops with subtle gradient mesh lighting and accessible axis gridline contrast.

### 20.3 Multi-Viewport Responsive Law (Desktop, Tablet, Mobile)
- **Viewport Dimension Standards**:
  - Desktop: `1440x900`
  - Tablet: `768x1024`
  - Mobile: `390x844` (iPhone standard)
- **Fluid Adaptation**:
  - All card grids automatically transition from 4-column (Desktop) ➔ 2-column (Tablet) ➔ 1-column stacked cards (Mobile).
  - Data tables automatically morph into responsive card decks on viewports `< 768px`.
  - Minimum touch target for all interactive elements on mobile is strictly **`44x44px`**.
  - Horizontal scrollbars on the document body are strictly prohibited (`overflow-x: hidden`).




