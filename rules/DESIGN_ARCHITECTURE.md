# Master Design Architecture & UI/UX System Specification

> **CORE MANDATE**: Tailwind CSS is the exclusive, mandatory styling framework across all projects. Every interface must feature state-of-the-art micro-animations, bespoke typography, fluid hover transitions, accessible dark/light themes, and specialized interactive components (Floating Label inputs, resizable `dvh` sidebars, animated toasts, and animated icons).
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

### 2.3 Three.js & WebGL 3D Models (Strict User Permission & Free Models Rule)
- **Hard Constraint**: Three.js 3D scenes are ONLY enabled with explicit user confirmation.
- **Model Policy**:
  - We can construct procedural lightweight 3D geometry (e.g. geometric wireframes, glowing particle clouds, floating glass shapes).
  - External 3D models MUST be **100% free, animated, and lightweight** (`.gltf` / `.glb` format from verified free sources like Kenney, Three.js official assets, or Sketchfab CC0). Heavy or commercial paid models are strictly forbidden.
  - Graceful fallback: If WebGL is unsupported or mobile battery is constrained, fallback to animated 2D SVGs or Lottie.

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


