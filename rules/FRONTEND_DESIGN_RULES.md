# Frontend Design & UI/UX Standards (Tailwind CSS Engine)

> **CORE PRINCIPLE**: The user must be WOWED at first glance. Generic, default HTML or basic MVP designs are considered a complete failure. Every project MUST use **Tailwind CSS** as its foundation, paired with rich animations, glowing elements, bespoke typography, and specialized UI components.

---

## 👑 0. The Law of Original & Bespoke Design ("Design Apna Banana Hai - No Blind Copying from Docs")

> **CRITICAL ARCHITECTURAL DIRECTIVE FOR ALL AGENTS & DEVELOPERS**:
> - **Documentation is an Architectural Blueprint, NOT a Static Template**: All code snippets, color palettes, card layouts, and dummy examples in `Main-docs` exist to define **mechanics, structural rules, and behavioral contracts** (e.g. dynamic `h-dvh` sidebars, floating label transitions, hybrid desktop table vs mobile cards, marquee drag selection math, keyboard event stacks).
> - **NEVER Blindly Copy Documentation Design**: You must NEVER copy-paste the exact dummy colors, placeholder cards, or generic mock themes verbatim from the documentation into the project.
> - **Design Apna Banana Hai (Craft Bespoke UI/UX)**: Every application MUST have its own dedicated, bespoke visual identity:
>   1. **Tailored Color Palette**: Curate brand-specific primary, secondary, and accent colors tailored to the client's business domain (e.g. obsidian & emerald for fintech, deep midnight indigo & cyan for cloud SaaS, rich amber & slate for logistics).
>   2. **Distinct Typography Pairing**: Select and configure intentional font pairings from our bespoke font library (e.g. Neofolio + Plus Jakarta Sans, Bierika + Outfit, Nexo Kora + Inter) that express the unique brand personality.
>   3. **Bespoke Component Styling**: Design custom card layouts, hero sections, metric badges, and empty states tailored specifically to the project's actual data models and workflows.
>   4. **WOW-Factor Polish**: Handcrafted micro-animations, glassmorphic depths, and glowing hover states that blow the user away at first glance.

### 🏷️ 0.1 Bespoke Logo & Real Favicon Suite Mandate (Never Leave Default Icons!)

> **MANDATORY BRANDING RULE**:  
> Leaving the default framework favicon (e.g. Next.js black/white triangle `favicon.ico`, Vite bird icon, React atom, or empty browser globe) or using generic plain unstyled text for a company logo is considered **AN UNACCEPTABLE DESIGN FAILURE**.

1. **Bespoke Logo Requirements**:
   - Every application MUST feature a high-end, custom-crafted brand Logo:
     - **Full Logo (`variant="full"`)**: Scalable vector brand glyph mark + stylized brand wordmark using one of our bespoke fonts (e.g. Neofolio, Nexo Kora, Bierika, or Clash Display) for the Topbar, Auth cards, Landing page hero, and Footer.
     - **Compact Icon / Glyph (`variant="icon"`)**: Square or circular emblem for the collapsed `h-dvh` sidebar rail, mobile header, and PWA launcher.
     - **Dual Theme Support**: Logo must automatically adapt or pop across dark and light modes using glowing gradients, SVG filters, or clean monochrome contrasts.
2. **Complete Favicon Suite Requirements**:
   - The developer / agent must create a real, crisp, bespoke Favicon suite placed in `/public` or via Next.js metadata (`app/icon.tsx`):
     - `favicon.ico`: Multi-resolution (16x16, 32x32, 48x48) clean icon.
     - `icon.svg`: Crisp vector icon with glowing gradients.
     - `apple-touch-icon.png`: 180x180 px high-res icon for iOS home screen bookmarks and Safari tab bars.
     - `icon-192.png` & `icon-512.png`: PWA Android / Chrome manifest icons.
     - `site.webmanifest`: Linked with project brand theme colors.
3. **Design Quality Bar**:
   - Whether handcrafted directly in SVG code, designed with modern geometry, or generated using image/vector tools—the logo and favicon **MUST BE TOP-NOTCH, REAL, AND STATE-OF-THE-ART**. No blurry, generic, or stock icons are permitted!

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
