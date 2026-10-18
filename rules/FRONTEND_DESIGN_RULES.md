# Frontend Design & UI/UX Standards (Tailwind CSS Engine)

> **CORE PRINCIPLE**: The user must be WOWED at first glance. Generic, default HTML or basic MVP designs are considered a complete failure. Every project MUST use **Tailwind CSS** as its foundation, paired with rich animations, glowing elements, bespoke typography, and specialized UI components.

---

## 🎨 1. Tailwind CSS Mandatory Standard

Tailwind CSS (v3 / v4) is the mandatory styling engine across all applications. Do not use plain, unstyled HTML or basic CSS files.
- Enable `darkMode: 'class'` for seamless Dark/Light dual theming.
- Use Tailwind utility classes for layout, flexbox, grid, spacing, and responsive design (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`).
- Cross-reference full architecture in [`DESIGN_ARCHITECTURE.md`](./DESIGN_ARCHITECTURE.md).

---

## 🔠 2. Typography & Bespoke Fonts

Never use default system serif/sans-serif. Always configure expressive display fonts and ultra-clean interface fonts:
- **Display & Headings**: **Neofolio**, **Nexo Kora**, **Bierika**, **OSIRIS**, or **Clash Display**.
- **Body & UI**: **Plus Jakarta Sans**, **Outfit**, or **Inter**.
- Typography hierarchy in Tailwind:
  - `h1`: `text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white`
  - `h2`: `text-2xl lg:text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100`
  - `h3`: `text-xl font-semibold text-slate-800 dark:text-slate-200`
  - `body`: `text-base leading-relaxed text-slate-600 dark:text-slate-300`
  - `caption`: `text-xs font-medium text-slate-500 dark:text-slate-400`

---

## 💎 3. Glassmorphism & Hover Glow Cards

All card and surface elements should feel tactile, frosted, and alive:

```tsx
<div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl p-6 shadow-sm hover:shadow-glow-sky hover:border-sky-400/40 transition-all duration-300 hover:-translate-y-1">
  {/* Card Content */}
</div>
```

---

## ⚡ 4. Animations: Framer Motion, GSAP & Free 3D Models

1. **Framer Motion**:
   - Mandatory for all modals, slideovers, dropdown popups, and toast notifications.
   - Use `AnimatePresence` for exit animations.
2. **GSAP & ScrollTrigger**:
   - For scroll-driven storytelling, parallax sections, and complex timeline sequences.
3. **Three.js & 3D Models**:
   - ONLY with user permission.
   - External models MUST be **100% free, lightweight, and animated** (`.glb`/`.gltf` from Kenney, Three.js, Sketchfab CC0). Never load paid or unoptimized heavy assets.

---

## 🎯 5. Icon Ecosystem & Animated Lottie

Integrate high-quality vector and interactive animated icons:
- **Static Icons**: `lucide-react`, `@fortawesome/react-fontawesome`, Google Material Symbols.
- **Animated Vectors & Lottie**:
  - **Lordicon** (`https://lordicon.com/` / `lordicons.com`): Interactive morphing micro-icons.
  - **Icons8** (`https://icons8.com/`): Expressive UI status illustrations.
  - **LottieFlow** (`https://lottieflow.com/`): Micro-interaction switches and triggers.
  - **LottieFiles** (`https://lottiefiles.com/`): Hero scenes and empty states.

---

## 📝 6. Input Component Rule: Floating Labels (No Placeholders!)

All form fields must use custom Floating Label components (see [`DESIGN_ARCHITECTURE.md`](./DESIGN_ARCHITECTURE.md)):
- **Text Inputs**: Centered label floats to top border outline on focus or when value exists.
- **Textareas**: First-line aligned label floats to top border on focus.
- **Select Dropdowns**: Google Forms style centered label with zero premature placeholder text.

---

## 🖱️ 7. Interactive Elements & Layout Guardrails

1. **Mandatory `cursor-pointer`**: Every button, link, tab, clickable table row, and dropdown trigger must have `cursor-pointer`.
2. **Custom Sleek Scrollbars**: Styled with thin dimensions and semi-transparent thumb.
3. **Fixed Resizable Sidebar**:
   - Position: `fixed top-0 left-0`.
   - Height: `h-dvh` (Dynamic viewport height).
   - Resizable width handle with drag listener and `localStorage` memory.
4. **Toast Notifications**: Interactive animated toasts with hover-to-pause and glowing status borders.
