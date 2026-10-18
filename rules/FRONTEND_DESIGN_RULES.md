# Frontend Design & UI/UX Standards

> **CORE PRINCIPLE**: The user must be WOWED at first glance. Generic, default HTML or basic MVP designs are considered a complete failure. Every page must look polished, high-end, responsive, and alive.

---

## 🎨 1. Core Visual Aesthetics & Design System

### 1.1 Curated Color Palette (Dark Theme Primary)
Never use harsh default primaries (pure `#FF0000`, `#00FF00`, `#0000FF`). Use deeply tuned, balanced HSL/Hex tokens:

```css
:root {
  /* Surface & Backgrounds */
  --bg-canvas: #07090e;           /* Deepest background */
  --bg-surface: #0f141f;          /* Standard card/panel background */
  --bg-surface-elevated: #182030; /* Dropdowns, modals, floating panels */
  --bg-surface-glass: rgba(15, 20, 31, 0.75); /* Frosted glass */

  /* Borders & Dividers */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-focus: rgba(56, 189, 248, 0.4);
  --border-glass: rgba(255, 255, 255, 0.12);

  /* Typography */
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --text-inverse: #07090e;

  /* Brand & Accents */
  --accent-primary: #38bdf8;       /* Vibrant Sky/Cyan */
  --accent-secondary: #6366f1;     /* Royal Indigo */
  --accent-glow: rgba(56, 189, 248, 0.25);
  
  /* Status Colors */
  --status-success: #10b981;
  --status-warning: #f59e0b;
  --status-danger: #ef4444;
  --status-info: #0ea5e9;

  /* Elevation & Shadows */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.45);
  --shadow-glow: 0 0 24px var(--accent-glow);

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-smooth: 250ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 🔤 2. Typography & Font Hierarchy

- Use modern Google Fonts (e.g. **Plus Jakarta Sans**, **Outfit**, or **Inter**).
- Establish clear scale and line heights:
  - `h1`: 2.5rem (40px) | font-weight: 700 | letter-spacing: -0.02em
  - `h2`: 1.875rem (30px) | font-weight: 600 | letter-spacing: -0.01em
  - `h3`: 1.375rem (22px) | font-weight: 600
  - `body`: 1rem (16px) | line-height: 1.6 | font-weight: 400
  - `caption / small`: 0.8125rem (13px) | font-weight: 500

---

## 💎 3. Glassmorphism & Modern Card Styling

All card elements should feel layered, frosted, and tactile:

```css
.glass-panel {
  background: var(--bg-surface-glass);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-smooth), border-color var(--transition-smooth), box-shadow var(--transition-smooth);
}

.glass-panel:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: var(--shadow-lg), var(--shadow-glow);
}
```

---

## ⚡ 4. Dynamic Interactions & Micro-Animations

1. **Button Micro-Interactions**:
   - Subtle scale on hover: `transform: translateY(-1px);`
   - Active click compression: `transform: scale(0.98);`
   - Glowing gradient borders on primary CTA buttons.
2. **Smooth Transitions**:
   - Tab switching, modal popups, and dropdowns must animate using smooth cubic-bezier timing (`cubic-bezier(0.16, 1, 0.3, 1)`).
   - Never use abrupt instant appearances without transition.
3. **Skeleton Loading**:
   - Display subtle shimmering skeleton loaders rather than generic spinning loaders or blank screens.

---

## 📱 5. Responsive Design Grid (Mobile-First)

- Breakpoint standards:
  - Mobile: `< 640px` (Single column, full width cards, bottom sheet drawers)
  - Tablet: `640px - 1024px` (2 columns, collapsible sidebar)
  - Desktop: `1024px - 1440px` (Expanded dashboard layout, sticky sidebars)
  - Ultra-Wide: `> 1440px` (Centered container capped at 1440px or 1600px with generous margins)

---

## 🏷️ 6. Unique IDs & Testing Attributes

Every interactive element (Buttons, Inputs, Modals, Tabs, Order action triggers) **MUST** include:
1. A unique, descriptive `id` (e.g. `id="order-process-start-btn"`, `id="global-search-input"`).
2. Proper `aria-label` or `aria-describedby` attributes for accessibility.
3. Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
