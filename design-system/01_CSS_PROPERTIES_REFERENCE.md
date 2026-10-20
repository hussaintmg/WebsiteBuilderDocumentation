# 📚 Deliverable 1: Comprehensive CSS Properties, Functions, Selectors & At-Rules Reference Library

**File:** `design-system/01_CSS_PROPERTIES_REFERENCE.md`  
**Classification:** Core Technical Reference — Foundations of Modern Web Design  
**Related Documents:**
- [`design-system/02_VISUAL_EFFECTS_CATALOGUE.md`](./02_VISUAL_EFFECTS_CATALOGUE.md)
- [`design-system/03_UI_COMPONENTS_LIBRARY.md`](./03_UI_COMPONENTS_LIBRARY.md)
- [`design-system/09_IMPLEMENTATION_RECIPES.md`](./09_IMPLEMENTATION_RECIPES.md)
- [`design-system/10_SEARCHABLE_INDEX.md`](./10_SEARCHABLE_INDEX.md)

---

## 📑 Table of Contents
1. [Architectural Introduction & Taxonomic Distinction](#1-architectural-introduction)
2. [Section A: Layout and Positioning](#section-a-layout-and-positioning)
3. [Section B: Backgrounds, Masking and Image Design](#section-b-backgrounds-masking-and-image-design)
   - *Deep Dive: Fixed Background vs True 3D Parallax vs Sticky Scroll Storytelling*
4. [Section C: Borders, Shadows, Glows and Surfaces](#section-c-borders-shadows-glows-and-surfaces)
5. [Section D: Typography, Fluid Math and Text Artistry](#section-d-typography-fluid-math-and-text-artistry)
6. [Section E: Transforms, Motion and Scroll-Driven Timelines](#section-e-transforms-motion-and-scroll-driven-timelines)
7. [Section F: Colors, Dynamic Variables, Modern Selectors and At-Rules](#section-f-colors-dynamic-variables-modern-selectors-and-at-rules)

---

## 1. Architectural Introduction

Modern CSS has evolved from a basic presentation language into a declarative visual computing engine. In modern professional frontend engineering, styling elements are divided into distinct grammatical classifications:
1. **Properties**: Declarative key-value identifiers applied to elements (`display`, `backdrop-filter`, `transform`).
2. **Functional Notations**: Mathematical, colorimetric, or visual calculation algorithms evaluated at parse/render time (`clamp()`, `color-mix()`, `radial-gradient()`, `path()`).
3. **Pseudo-Classes**: State and relational selectors that query dynamic document tree conditions (`:hover`, `:focus-visible`, `:has()`).
4. **Pseudo-Elements**: Virtual DOM nodes generated for visual embellishment (`::before`, `::after`, `::backdrop`, `::selection`).
5. **At-Rules (`@`)**: Environmental directives that query viewport constraints, feature support, container dimensions, or define custom properties (`@media`, `@container`, `@supports`, `@property`, `@keyframes`).

---

## Section A: Layout and Positioning

---

### A.1 `display`
- **Classification**: CSS Property
- **Purpose**: Establishes the element's outer and inner layout display types, determining whether it generates block or inline formatting contexts and how its children are arranged.
- **Syntax**: `display: [ <display-outside> || <display-inside> ] | <display-listitem> | <display-internal> | <display-box> | <display-legacy>`
- **Useful Values**: `block`, `inline`, `inline-block`, `flex`, `inline-flex`, `grid`, `inline-grid`, `contents`, `none`, `flow-root`.
- **Common Design Applications**: Creating flexible row/column alignments (`flex`), 2D structured grids (`grid`), isolating margin collapses (`flow-root`), and removing wrapper elements from the accessibility/render tree without removing children (`contents`).
- **Related Properties**: `position`, `flex-direction`, `grid-template-columns`.
- **Compatibility**: Universal (100% across all evergreen browsers).
- **Practical Example**:
```css
.card-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.ghost-wrapper {
  display: contents; /* Children participate directly in parent's grid/flex */
}
```

---

### A.2 `position`, `inset`, `top`, `right`, `bottom`, `left`
- **Classification**: CSS Properties
- **Purpose**: Dictates how an element is positioned in the document flow and how its offset coordinates are calculated relative to parent containers or the viewport.
- **Syntax**:
  - `position: static | relative | absolute | fixed | sticky`
  - `inset: <length-percentage>{1,4} | auto` (shorthand for `top`, `right`, `bottom`, `left`)
- **Useful Values**:
  - `relative`: Preserves original document space; establishes containing block for absolute children.
  - `absolute`: Removed from flow; positioned relative to nearest positioned ancestor.
  - `fixed`: Positioned relative to the viewport; unaffected by document scrolling (unless an ancestor has a `transform`, `filter`, or `perspective`).
  - `sticky`: Hybrid position that toggles between `relative` and `fixed` depending on scroll threshold within its parent container.
  - `inset: 0`: Full container coverage without needing `top: 0; right: 0; bottom: 0; left: 0`.
- **Common Design Applications**: Full-bleed hero overlays (`position: absolute; inset: 0`), floating menu pills, sticky table headers, and modal backdrops.
- **Related Properties**: `z-index`, `overflow`, `transform`.
- **Compatibility**: `position` universal; `inset` supported in Chromium 87+, Safari 14.1+, Firefox 66+.
- **Practical Example**:
```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 50;
}
.sticky-header {
  position: sticky;
  top: 1rem;
  z-index: 40;
}
```

---

### A.3 `z-index`, `overflow`, `visibility`
- **Classification**: CSS Properties
- **Purpose**: Controls stacking context order (`z-index`), clipping and scrollbar behavior for overflowing content (`overflow`), and rendering visibility without DOM removal (`visibility`).
- **Syntax**:
  - `z-index: auto | <integer>`
  - `overflow: [ visible | hidden | clip | scroll | auto ]{1,2}`
  - `visibility: visible | hidden | collapse`
- **Useful Values**:
  - `z-index: 10` to `z-index: 9999` (Note: Only applies to positioned elements or flex/grid items).
  - `overflow: clip`: Clips content at the padding box without creating a scroll container (more performant than `hidden`).
  - `visibility: hidden`: Hides visually while preserving spatial layout dimensions and tab stop omission.
- **Common Design Applications**: Toast notification layers (`z-index: 100`), circular avatar cropping (`overflow: hidden`), preventing layout shifts during skeleton loading.
- **Related Properties**: `position`, `clip-path`, `opacity`.
- **Compatibility**: Universal; `overflow: clip` supported in modern browsers (Chromium 90+, Safari 16+, Firefox 81+).
- **Practical Example**:
```css
.card-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  z-index: 10;
}
.viewport-clipped {
  overflow: clip; /* Clips without scroll context overhead */
}
```

---

### A.4 `width`, `height`, `min-width`, `max-width`, `min-height`, `max-height`
- **Classification**: CSS Properties
- **Purpose**: Constrains the box dimensions along inline and block axes.
- **Syntax**: `[min-|max-][width|height]: auto | <length-percentage> | min-content | max-content | fit-content(<length-percentage>)`
- **Useful Values**: `100%`, `100vw`, `100dvh` (Dynamic Viewport Height), `max-w-7xl` (`80rem`), `min-h-[44px]` (accessible touch target).
- **Common Design Applications**: Preventing full-screen mobile address bar jumps (`height: 100dvh`), responsive card clamping (`max-width: 480px; width: 100%`), modal max-width constraints.
- **Related Properties**: `box-sizing`, `aspect-ratio`, `flex-basis`.
- **Compatibility**: `dvh`/`dvw` supported in Chromium 108+, Safari 15.4+, Firefox 101+.
- **Practical Example**:
```css
.mobile-app-shell {
  width: 100%;
  max-width: 480px;
  min-height: 100dvh; /* Prevents mobile browser bar jump */
  margin-inline: auto;
}
```

---

### A.5 `margin`, `padding`, `gap`, `row-gap`, `column-gap`
- **Classification**: CSS Properties
- **Purpose**: Defines external push spacing (`margin`), internal breathing room (`padding`), and multi-item gutter distribution (`gap`).
- **Syntax**:
  - `margin: <length-percentage>{1,4} | auto`
  - `padding: <length-percentage>{1,4}`
  - `gap: <length-percentage>{1,2}`
- **Useful Values**: Logical properties: `margin-inline: auto` (horizontal centering), `padding-block: 2rem`, `gap: 1.5rem`.
- **Common Design Applications**: Grid guttering without negative margins, fluid spacing scales, auto-centering containers.
- **Related Properties**: `display: flex`, `display: grid`.
- **Compatibility**: Universal; `gap` in Flexbox supported in all modern browsers.
- **Practical Example**:
```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem; /* Replaces brittle margin math on children */
  padding-inline: 1.5rem;
}
```

---

### A.6 Flexbox Core (`flex-direction`, `flex-wrap`, `flex-grow`, `flex-shrink`, `flex-basis`)
- **Classification**: CSS Properties
- **Purpose**: Controls 1-dimensional distribution and flexibility of child elements along a primary axis and cross axis.
- **Syntax**:
  - `flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`
  - `flex-direction: row | row-reverse | column | column-reverse`
  - `flex-wrap: nowrap | wrap | wrap-reverse`
- **Useful Values**:
  - `flex: 1 1 0%` (fill available space equally).
  - `flex: 0 0 auto` (rigid size based on content or width).
  - `flex: 1 0 auto` (grow if space permits, but do not shrink below intrinsic size).
- **Common Design Applications**: Responsive toolbars, auto-collapsing search bars, sticky footer shells (`flex-grow: 1` on main).
- **Related Properties**: `gap`, `justify-content`, `align-items`.
- **Compatibility**: Universal.
- **Practical Example**:
```css
.sticky-footer-layout {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}
.sticky-footer-layout main {
  flex: 1 0 auto; /* Pushes footer down even when page has little content */
}
```

---

### A.7 CSS Grid Core (`grid-template-columns`, `grid-template-rows`, `grid-area`)
- **Classification**: CSS Properties
- **Purpose**: Powers 2-dimensional spatial layouts with explicit or auto-flowing track definitions.
- **Syntax**:
  - `grid-template-columns: none | <track-list> | <auto-track-list>`
  - `grid-area: <grid-line> [ / <grid-line> ]{0,3} | <custom-ident>`
- **Useful Values**:
  - `repeat(auto-fit, minmax(280px, 1fr))`: Fully responsive, media-query-free card grid.
  - `1fr auto 1fr`: Centered middle column with balanced side columns.
  - `subgrid`: Inherits parent grid tracks for nested alignment.
- **Common Design Applications**: Bento grids, dashboard KPI card walls, complex asymmetric magazine layouts.
- **Related Properties**: `gap`, `justify-items`, `align-items`.
- **Compatibility**: CSS Grid universal; `subgrid` supported in Chromium 117+, Safari 16+, Firefox 71+.
- **Practical Example**:
```css
.responsive-card-wall {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 1.5rem;
}
.bento-featured-item {
  grid-column: span 2;
  grid-row: span 2;
}
```

---

### A.8 Alignment Models (`align-items`, `justify-content`, `align-self`, `justify-self`)
- **Classification**: CSS Properties
- **Purpose**: Governs spatial alignment of items along the block and inline axes across Flexbox, Grid, and Box Alignment.
- **Syntax**: `[align|justify]-[items|content|self]: start | end | center | stretch | baseline | space-between | space-around | space-evenly`
- **Useful Values**: `place-items: center` (shorthand for `align-items: center; justify-items: center;` in grid), `justify-content: space-between`.
- **Common Design Applications**: Absolute vertical and horizontal centering of modals or hero text, navbars with logo left and links right.
- **Related Properties**: `display`, `gap`.
- **Compatibility**: Universal.
- **Practical Example**:
```css
.center-stage {
  display: grid;
  place-items: center; /* The 1-line perfect center */
  min-height: 400px;
}
```

---

### A.9 `aspect-ratio`, `box-sizing`, Container Queries (`@container`)
- **Classification**: CSS Property & At-Rule
- **Purpose**: Establishes fixed proportional scaling for boxes (`aspect-ratio`), defines whether padding/borders add to width (`box-sizing`), and adapts styling based on parent container width rather than viewport (`@container`).
- **Syntax**:
  - `aspect-ratio: auto | <ratio>`
  - `box-sizing: content-box | border-box`
  - `@container <container-name>? ( <container-condition> ) { ... }`
- **Useful Values**:
  - `aspect-ratio: 16 / 9` (video player), `1 / 1` (avatars), `4 / 3` (product thumbnail).
  - `box-sizing: border-box` (universal modern standard).
  - `container-type: inline-size`.
- **Common Design Applications**: Responsive video containers with zero layout shift (CLS), reusable components that format differently when placed in a sidebar vs main column.
- **Related Properties**: `width`, `object-fit`.
- **Compatibility**: `aspect-ratio` universal; `@container` supported in Chromium 105+, Safari 16+, Firefox 110+.
- **Practical Example**:
```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}
.card-media {
  aspect-ratio: 16 / 9;
  width: 100%;
}
@container card (min-width: 450px) {
  .card-content {
    display: flex;
    flex-direction: row;
  }
}
```

---

## Section B: Backgrounds, Masking and Image Design

---

### B.1 `background-image`, Gradients (`linear-gradient`, `radial-gradient`, `conic-gradient`)
- **Classification**: CSS Property & Functional Notations
- **Purpose**: Renders one or more visual layers behind element content, including raster images, vector patterns, and multi-color generative gradients.
- **Syntax**:
  - `linear-gradient([ <angle> | to <side-or-corner> ]?, <color-stop-list>)`
  - `radial-gradient([ <shape> || <size> ]? [ at <position> ]?, <color-stop-list>)`
  - `conic-gradient([ from <angle> ]? [ at <position> ]?, <color-stop-list>)`
- **Useful Values**:
  - Angled linear mesh: `linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(99, 102, 241, 0.05))`
  - Glowing radial orb: `radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.25) 0%, transparent 70%)`
  - Conic border sweep: `conic-gradient(from 0deg, #38bdf8, #6366f1, #ec4899, #38bdf8)`
- **Common Design Applications**: Hero ambient lighting, glowing button borders, animated gradient canvases, dark mode depth simulation.
- **Related Properties**: `background-size`, `background-position`, `background-clip`.
- **Compatibility**: Universal.
- **Practical Example**:
```css
.aurora-hero {
  background-color: #07090e;
  background-image: 
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(56, 189, 248, 0.2), transparent),
    radial-gradient(circle 400px at 80% 60%, rgba(99, 102, 241, 0.15), transparent);
}
```

---

### B.2 `background-size`, `background-position`, `background-attachment`, `background-clip`
- **Classification**: CSS Properties
- **Purpose**: Controls background image geometry, coordinate alignment, scroll locking, and box clipping boundaries.
- **Syntax**:
  - `background-size: auto | cover | contain | <length-percentage>{1,2}`
  - `background-position: <position>`
  - `background-attachment: scroll | fixed | local`
  - `background-clip: border-box | padding-box | content-box | text`
- **Useful Values**:
  - `background-clip: text` (gradient text fill).
  - `background-attachment: fixed` (viewport locking).
  - `background-size: cover` (scale to fill container without distortion).
- **Common Design Applications**: Fullscreen background photos, clipping iridescent gradients to typography (`-webkit-background-clip: text`), dot/grid pattern alignment.
- **Related Properties**: `color: transparent`, `filter`.
- **Compatibility**: Universal (`background-clip: text` requires `-webkit-` prefix in some engines).
- **Practical Example**:
```css
.gradient-headline {
  background: linear-gradient(90deg, #38bdf8, #818cf8, #c084fc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

---

### B.3 Deep Architectural Breakdown: Fixed Background vs True 3D Parallax vs Sticky Scroll Storytelling

A critical distinction that separates senior engineers from juniors is knowing when to use CSS fixed backgrounds, multi-layer 3D parallax, or sticky scroll storytelling:

| Architecture | Implementation Mechanism | GPU / Compositor Cost | Mobile iOS Safari Behavior | Best Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Fixed Background** | `background-attachment: fixed` | High paint overhead (repaints on scroll) | Often disabled or jittery on iOS due to viewport sizing changes | Simple desktop photo reveals in editorial articles |
| **True 3D Parallax** | CSS 3D Transforms (`perspective: 1px`, `translateZ(-1px) scale(2)`) or JS rAF | Very low (runs on GPU Compositor thread) | Smooth 60 FPS when properly isolated | Layered illustration depth, stars/particles moving behind foreground |
| **Sticky Scroll Storytelling** | `position: sticky; top: 0;` inside a taller parent (`height: 300vh`) | Zero extra GPU cost; native layout | 100% reliable across all mobile browsers | Product reveals, feature walkthroughs, pinned video screens |

#### Code Comparison:
```css
/* 1. Fixed Background (CSS Only) */
.fixed-bg-section {
  background-image: url('/hero-landscape.webp');
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}

/* 2. True 3D Parallax (GPU Composited) */
.parallax-viewport {
  perspective: 1000px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}
.parallax-bg-layer {
  transform: translateZ(-300px) scale(1.3);
  transform-origin: center center;
}
.parallax-fg-layer {
  transform: translateZ(0);
}

/* 3. Sticky Scroll Storytelling (Recommended for Production) */
.sticky-story-container {
  height: 300vh; /* Scroll runway */
  position: relative;
}
.sticky-story-screen {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

### B.4 `object-fit`, `object-position`, `image-rendering`
- **Classification**: CSS Properties
- **Purpose**: Controls how replaced elements (`<img>`, `<video>`) fit inside their box without aspect ratio distortion and controls scaling algorithms.
- **Syntax**:
  - `object-fit: fill | contain | cover | none | scale-down`
  - `object-position: <position>`
  - `image-rendering: auto | crisp-edges | pixelated`
- **Useful Values**:
  - `object-fit: cover`: Fills parent container like `background-size: cover`.
  - `object-position: center top`: Keeps faces/heads visible in portrait thumbnails.
  - `image-rendering: pixelated`: Retro pixel art and QR code clarity.
- **Common Design Applications**: E-commerce product galleries, user profile avatars, video card backgrounds.
- **Related Properties**: `aspect-ratio`, `width`, `height`.
- **Compatibility**: Universal.
- **Practical Example**:
```css
.avatar-img {
  width: 48px;
  height: 48px;
  border-radius: 9999px;
  object-fit: cover;
  object-position: center top;
}
```

---

### B.5 `filter`, `backdrop-filter`, `mix-blend-mode`, `background-blend-mode`
- **Classification**: CSS Properties
- **Purpose**: Applies graphical transformations (blur, brightness, contrast, grayscale, drop-shadow) to element pixels or to the content rendered *behind* translucent elements.
- **Syntax**:
  - `backdrop-filter: none | <filter-function-list>`
  - `filter: none | <filter-function-list>`
  - `mix-blend-mode: normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | difference | exclusion`
- **Useful Values**:
  - Frosted Glass: `backdrop-filter: blur(16px) saturate(180%)`
  - Image hover grayscale: `filter: grayscale(100%)` ➔ `filter: grayscale(0%)`
  - Texture overlay: `mix-blend-mode: overlay`
- **Common Design Applications**: Glassmorphism navbar headers, dialog modals, duotone photo effects, glowing drop-shadows on transparent SVGs.
- **Related Properties**: `background-color: rgba(...)`, `opacity`.
- **Compatibility**: Universal modern support (Safari requires `-webkit-backdrop-filter`).
- **Practical Example**:
```css
.liquid-glass-nav {
  background: rgba(15, 20, 31, 0.7);
  -webkit-backdrop-filter: blur(12px) saturate(160%);
  backdrop-filter: blur(12px) saturate(160%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
```

---

### B.6 `mask-image`, `mask-size`, `mask-position`, `clip-path`
- **Classification**: CSS Properties
- **Purpose**: Clips visual output using vector shapes (`clip-path`) or alpha/luminance raster masks with gradient fades (`mask-image`).
- **Syntax**:
  - `clip-path: <clip-source> | [ <basic-shape> || <geometry-box> ] | none`
  - `mask-image: <mask-reference># | none`
- **Useful Values**:
  - Smooth fade-to-black bottom edge: `mask-image: linear-gradient(to bottom, black 70%, transparent 100%)`
  - Angled hero divider: `clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%)`
  - Circular reveal: `clip-path: circle(50% at 50% 50%)`
- **Common Design Applications**: Infinite scrolling marquee gradient edge fades, geometric card cuts, image reveal curtain animations.
- **Related Properties**: `overflow`, `transform`.
- **Compatibility**: `clip-path` universal; `mask-image` requires `-webkit-mask-image` in Chromium and Safari.
- **Practical Example**:
```css
.marquee-fade-edges {
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
  mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
}
.angled-card {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
}
```

---

## Section C: Borders, Shadows, Glows and Surfaces

---

### C.1 `border`, `border-radius`, `border-color`, `border-style`, `border-image`
- **Classification**: CSS Properties
- **Purpose**: Renders bounding outlines and corner radii around the padding edge.
- **Syntax**:
  - `border: <line-width> || <line-style> || <color>`
  - `border-radius: <length-percentage>{1,4} [ / <length-percentage>{1,4} ]?`
  - `border-image: <'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-outset'> ]? || <'border-image-repeat'>`
- **Useful Values**:
  - Pill radius: `border-radius: 9999px`
  - Asymmetric smooth organic corner: `border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%`
  - Ultra-thin retina border: `border: 1px solid rgba(255, 255, 255, 0.08)`
- **Common Design Applications**: Glass cards with translucent edge borders, pulsing buttons, circular chips.
- **Related Properties**: `outline`, `box-shadow`.
- **Compatibility**: Universal.
- **Practical Example**:
```css
.glass-surface-card {
  background: rgba(15, 23, 42, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.25rem;
}
```

---

### C.2 `outline`, `outline-offset`
- **Classification**: CSS Properties
- **Purpose**: Draws a border outside the box model that takes up no layout space, critical for accessible focus indicators.
- **Syntax**:
  - `outline: <outline-color> || <outline-style> || <outline-width>`
  - `outline-offset: <length>`
- **Useful Values**: `outline: 2px solid #38bdf8; outline-offset: 2px;`
- **Common Design Applications**: Keyboard focus rings (`:focus-visible`), interactive button active indicators.
- **Related Properties**: `:focus-visible`, `box-shadow`.
- **Compatibility**: Universal.
- **Practical Example**:
```css
button:focus-visible, a:focus-visible {
  outline: 2px solid #38bdf8;
  outline-offset: 3px;
}
```

---

### C.3 `box-shadow`, `text-shadow` (Inset Shadows, Layered Shadows & Neon Glows)
- **Classification**: CSS Properties
- **Purpose**: Casts raster shadow and glow effects outside or inside an element or text glyphs.
- **Syntax**:
  - `box-shadow: none | <single-box-shadow>#`
  - `<single-box-shadow> = inset? && [ <length>{2,4} && <color>? ]`
  - `text-shadow: none | [ <length>{2,3} && <color>? ]#`
- **The 3 Core Shadow Archetypes**:
  1. **Multi-Layered Ambient Shadows (Smooth Elevation)**: Composing 2 to 4 subtle shadows creates physically realistic atmospheric diffusion.
  2. **Neumorphic Dual-Inset Shadows**: Pairing a top-left light shadow with a bottom-right dark shadow to create embossed plastic surfaces.
  3. **Colored Neon Glows**: Zero-blur or zero-spread high-intensity colored shadows.
- **Common Design Applications**: Elevated cards, glowing status lights, neumorphic toggle buttons, glowing neon typography.
- **Related Properties**: `filter: drop-shadow()`, `border-color`.
- **Compatibility**: Universal.
- **Practical Examples**:
```css
/* 1. Multi-Layered Realistic Ambient Shadow */
.elevated-ambient-card {
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.05),
    0 4px 8px rgba(0, 0, 0, 0.08),
    0 16px 32px rgba(0, 0, 0, 0.12);
}

/* 2. Neon Cyan Glow */
.neon-glow-button {
  box-shadow: 
    0 0 15px rgba(56, 189, 248, 0.4),
    0 0 30px rgba(56, 189, 248, 0.2);
}

/* 3. Inset Neumorphic Well */
.neumorphic-well {
  background: #0f141f;
  box-shadow: 
    inset 4px 4px 8px rgba(0, 0, 0, 0.6),
    inset -4px -4px 8px rgba(255, 255, 255, 0.03);
}
```

---

## Section D: Typography, Fluid Math and Text Artistry

---

### D.1 `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`
- **Classification**: CSS Properties
- **Purpose**: Governs the typeface, glyph scale, stroke thickness, baseline rhythm, and tracking.
- **Syntax**:
  - `font-family: [ <family-name> | <generic-family> ]#`
  - `font-size: <length-percentage> | <absolute-size> | <relative-size>`
  - `font-weight: normal | bold | <number [1,1000]>`
  - `line-height: normal | <number> | <length-percentage>`
  - `letter-spacing: normal | <length>`
- **Useful Values**:
  - Headings: `font-family: 'Outfit', sans-serif; font-weight: 700; letter-spacing: -0.025em; line-height: 1.15;`
  - Body: `font-family: 'Inter', sans-serif; font-weight: 400; line-height: 1.6;`
- **Common Design Applications**: Establishing typographic scale, legible dark-mode body copy, high-impact display titles.
- **Related Properties**: `font-style`, `text-transform`.
- **Compatibility**: Universal.
- **Practical Example**:
```css
.hero-display-title {
  font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.05;
}
```

---

### D.2 Fluid Typography with Mathematical `clamp()`
- **Classification**: Functional Notation Technique
- **Purpose**: Eliminates hundreds of lines of fragmented media queries by smoothly interpolating font size between a minimum and maximum threshold based on dynamic viewport width.
- **Syntax**: `font-size: clamp(min, preferred, max)`
  - Mathematical Formula: `preferred = y_intercept + slope * 100vw`
  - Slope calculation between 390px (mobile) and 1440px (desktop):
    - Example: Min = `32px` (2rem) at `390px`; Max = `64px` (4rem) at `1440px`.
    - Slope = `(64 - 32) / (1440 - 390) = 32 / 1050 ≈ 0.03048` (`3.05vw`).
    - Y-intercept = `32 - (390 * 0.03048) = 20.1px` (`1.26rem`).
    - Formula: `clamp(2rem, 1.26rem + 3.05vw, 4rem)`.
- **Common Design Applications**: Zero-breakpoint fluid hero headlines, fluid section subheads, fluid card titles.
- **Related Properties**: `line-height`, `min()`, `max()`.
- **Compatibility**: Universal modern browsers (Chromium 79+, Safari 13.1+, Firefox 75+).
- **Practical Example**:
```css
h1.fluid-hero {
  /* Scales smoothly from 36px on mobile to 72px on ultra-wide desktop */
  font-size: clamp(2.25rem, 1.5rem + 3.5vw, 4.5rem);
  line-height: 1.1;
}
```

---

### D.3 `text-overflow`, `line-clamp`, `overflow-wrap`, `word-break`
- **Classification**: CSS Properties
- **Purpose**: Manages overflowing text, prevents awkward hyphenation, and clamps paragraphs to an exact line budget with automatic ellipses (`...`).
- **Syntax**:
  - `text-overflow: clip | ellipsis | <string>`
  - `-webkit-line-clamp: none | <integer>`
  - `overflow-wrap: normal | break-word | anywhere`
- **Useful Values**:
  - Single line ellipsis: `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`
  - 3-line card paragraph clamp: `display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden;`
- **Common Design Applications**: Truncating long filenames in tables, keeping blog preview cards at uniform heights, preventing layout breaks from long URLs.
- **Related Properties**: `white-space`, `overflow`.
- **Compatibility**: Universal.
- **Practical Example**:
```css
.card-description-clamped {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  overflow-wrap: break-word;
}
```

---

### D.4 `text-stroke`, Text Gradients & Text Glows
- **Classification**: CSS Properties & Synthetic Artistry
- **Purpose**: Creates hollow outline typography (`text-stroke`), multi-stop iridescent gradient typography, and illuminated text shadows.
- **Syntax**:
  - `-webkit-text-stroke: <width> <color>`
  - Gradient Text: `background: <gradient>; -webkit-background-clip: text; color: transparent;`
  - Neon Text Glow: `text-shadow: 0 0 10px #38bdf8, 0 0 20px #38bdf8;`
- **Common Design Applications**: Cyberpunk/futuristic aesthetic headlines, sports branding, high-conversion landing page key phrases.
- **Related Properties**: `color`, `background-clip`.
- **Compatibility**: Universal across modern engines.
- **Practical Example**:
```css
.hollow-display-text {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.4);
  font-size: clamp(3rem, 2rem + 4vw, 6rem);
  font-weight: 900;
  text-transform: uppercase;
}
```

---

## Section E: Transforms, Motion and Scroll-Driven Timelines

---

### E.1 `transform`, `transform-origin`, `transform-style`, `translate`, `rotate`, `scale`
- **Classification**: CSS Properties
- **Purpose**: Applies 2D or 3D coordinate space mutations without triggering layout reflow or repaint. Modern CSS allows discrete properties (`translate`, `rotate`, `scale`) alongside `transform`.
- **Syntax**:
  - `transform: none | <transform-list>`
  - `translate: <length-percentage> [ <length-percentage> <length>? ]?`
  - `rotate: none | <angle> | [ x | y | z | <number>{3} ]? <angle>`
  - `scale: none | <number>{1,3}`
- **Useful Values**:
  - Hardware acceleration trigger: `transform: translate3d(0, 0, 0)` or `will-change: transform`
  - Subtle hover lift: `translate: 0 -4px; scale: 1.02;`
  - Isometric angle: `transform: rotateX(55deg) rotateZ(-45deg);`
- **Common Design Applications**: Hover micro-interactions, modal fly-ins, 3D card tilts, isometric dashboard previews.
- **Related Properties**: `perspective`, `transition`.
- **Compatibility**: Universal; discrete `translate`/`rotate`/`scale` supported in Chromium 104+, Safari 14.1+, Firefox 72+.
- **Practical Example**:
```css
.interactive-hover-card {
  transition: translate 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
}
.interactive-hover-card:hover {
  translate: 0 -6px;
  box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.3);
}
```

---

### E.2 3D Perspective (`perspective`, `perspective-origin`, `backface-visibility`)
- **Classification**: CSS Properties
- **Purpose**: Establishes virtual 3D depth by projecting elements in z-space towards or away from the camera lens.
- **Syntax**:
  - `perspective: none | <length>`
  - `perspective-origin: <position>`
  - `backface-visibility: visible | hidden`
  - `transform-style: flat | preserve-3d`
- **Useful Values**: `perspective: 1000px` (natural cinematic human perspective), `transform-style: preserve-3d` (keeps nested children in shared 3D volume), `backface-visibility: hidden` (for 2-sided flip cards).
- **Common Design Applications**: Interactive 3D tilt cards, 2-sided flip cards, fanned-out card decks, floating 3D product previews.
- **Related Properties**: `transform`, `rotateY`.
- **Compatibility**: Universal.
- **Practical Example**:
```css
.card-3d-scene {
  perspective: 1000px;
}
.card-3d-flipper {
  width: 320px;
  height: 440px;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.card-3d-flipper.is-flipped {
  transform: rotateY(180deg);
}
.card-3d-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
}
.card-3d-back {
  transform: rotateY(180deg);
}
```

---

### E.3 Transitions and `@keyframes` Animations
- **Classification**: CSS Properties & At-Rule
- **Purpose**: Interpolates property values between states either dynamically (`transition`) or through scripted timeline frames (`animation` + `@keyframes`).
- **Syntax**:
  - `transition: [ <single-transition-property> || <time> || <easing-function> || <time> ]#`
  - `animation: [ <single-animation-name> || <time> || <easing-function> || <time> || <single-animation-iteration-count> || <single-animation-direction> || <single-animation-fill-mode> || <single-animation-play-state> ]#`
  - `@keyframes <custom-ident> { <keyframe-block-list> }`
- **Golden Motion Rule (Performance)**: **Only animate `transform` and `opacity`**. Animating `width`, `height`, `margin`, `top`, or `box-shadow` triggers layout/paint recalculations, dropping frames below 60 FPS.
- **Useful Values**:
  - Snappy Spring Easing: `cubic-bezier(0.16, 1, 0.3, 1)`
  - Smooth Slow-Out: `cubic-bezier(0.25, 0.1, 0.25, 1)`
- **Common Design Applications**: Toast enter/exit animations, pulsing status indicators, skeleton loading shimmer waves.
- **Related Properties**: `will-change`, `animation-fill-mode: forwards`.
- **Compatibility**: Universal.
- **Practical Example**:
```css
@keyframes pulseGlow {
  0%, 100% {
    opacity: 0.4;
    transform: scale(0.98);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.02);
  }
}
.ambient-glowing-orb {
  animation: pulseGlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

---

### E.4 Modern Scroll-Driven Animations (`scroll-timeline`, `view-timeline`, `animation-timeline`, `animation-range`)
- **Classification**: CSS Properties & At-Rule
- **Purpose**: Links CSS animation playback directly to the scroll position of a container or the visibility of an element inside the viewport, completely without JavaScript `scroll` listeners.
- **Syntax**:
  - `animation-timeline: auto | none | <dashed-ident> | scroll() | view()`
  - `animation-range: [ normal | <length-percentage> | <timeline-range-name> <length-percentage>? ]{1,2}`
  - Timeline ranges: `entry`, `entry-crossing`, `contain`, `exit`, `exit-crossing`.
- **Useful Values**:
  - Viewport entry reveal: `animation-timeline: view(); animation-range: entry 0% cover 30%;`
  - Reading progress bar: `animation-timeline: scroll(root block);`
- **Common Design Applications**: Zero-JS page reading progress indicators, fade-in/up card reveals as they enter the screen, sticky image zoom scrubbing.
- **Related Properties**: `scroll-behavior: smooth`, `scroll-snap-type`.
- **Compatibility**: Supported natively in Chromium 115+. Safari & Firefox have active implementation in progress. Always pair with graceful fallback (static state or IntersectionObserver).
- **Practical Example**:
```css
/* Reading Progress Bar (Pure CSS) */
@keyframes growProgress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
.reading-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: #38bdf8;
  transform-origin: 0% 50%;
  animation: growProgress auto linear;
  animation-timeline: scroll(root block);
  z-index: 100;
}

/* Card Reveal on Scroll Into View */
@keyframes scrollFadeIn {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@supports (animation-timeline: view()) {
  .scroll-revealed-card {
    animation: scrollFadeIn linear both;
    animation-timeline: view();
    animation-range: entry 10% cover 30%;
  }
}
```

---

### E.5 Motion Path (`offset-path`, `offset-distance`, `offset-rotate`)
- **Classification**: CSS Properties
- **Purpose**: Animates an element along an arbitrary SVG vector path or geometric trajectory.
- **Syntax**:
  - `offset-path: none | <ray()> | <path()> | <basic-shape>`
  - `offset-distance: <length-percentage>`
- **Useful Values**: `offset-path: path("M 0 0 C 100 100, 200 0, 300 100")`
- **Common Design Applications**: Floating particle orbits, drone/truck delivery simulation animations, circular progress heads.
- **Related Properties**: `animation`, `transform`.
- **Compatibility**: Supported in Chromium 55+, Safari 15.4+, Firefox 72+.
- **Practical Example**:
```css
@keyframes travelOrbit {
  0% { offset-distance: 0%; }
  100% { offset-distance: 100%; }
}
.satellite-icon {
  offset-path: path("M 10 80 Q 95 10 180 80 T 350 80");
  animation: travelOrbit 6s linear infinite;
}
```

---

## Section F: Colors, Dynamic Variables, Modern Selectors and At-Rules

---

### F.1 CSS Custom Properties (`--*`), `var()`, and Dynamic Theming
- **Classification**: CSS Language Primitive & Functional Notation
- **Purpose**: Defines cascading, reactive variables that inherit through the DOM tree and can be dynamically mutated via JavaScript or media queries.
- **Syntax**:
  - Declaration: `--custom-token-name: <declaration-value>;`
  - Consumption: `var(--custom-token-name, <fallback-value>)`
- **Useful Values**: HSL or OKLCH token strings: `--primary-hue: 215; --card-bg: oklch(0.2 0.05 var(--primary-hue));`
- **Common Design Applications**: Zero-rebuild dark/light mode switches, dynamic user-customized brand themes, shared animation durations.
- **Related Properties**: `@property`, `light-dark()`.
- **Compatibility**: Universal.
- **Practical Example**:
```css
:root {
  --theme-bg: #ffffff;
  --theme-text: #0f172a;
}
:root.dark {
  --theme-bg: #07090e;
  --theme-text: #f8fafc;
}
.app-container {
  background-color: var(--theme-bg);
  color: var(--theme-text);
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

---

### F.2 Mathematical Functions: `calc()`, `min()`, `max()`, `clamp()`
- **Classification**: Functional Notations
- **Purpose**: Performs runtime unit-mixing mathematical calculations directly inside property values.
- **Syntax**:
  - `calc(<calc-sum>)`
  - `min(<calc-sum>#)`
  - `max(<calc-sum>#)`
  - `clamp(<calc-sum>, <calc-sum>, <calc-sum>)`
- **Useful Values**:
  - Viewport-safe padding: `padding-top: max(1.5rem, env(safe-area-inset-top));`
  - Fixed-minus-header calculation: `height: calc(100vh - 64px);`
- **Common Design Applications**: Mobile notch handling, non-breaking layout scaling, dynamic grid column widths.
- **Related Properties**: `width`, `font-size`, `margin`.
- **Compatibility**: Universal.
- **Practical Example**:
```css
.notch-safe-header {
  padding-top: max(1rem, env(safe-area-inset-top));
  padding-inline: max(1.5rem, env(safe-area-inset-left));
}
```

---

### F.3 Modern Color Functions: `color-mix()`, `light-dark()`, and `oklch()`
- **Classification**: Functional Notations
- **Purpose**: Synthesizes blended tints on the fly (`color-mix()`), toggles values natively based on color-scheme (`light-dark()`), and accesses perceptually uniform color spaces (`oklch()`).
- **Syntax**:
  - `color-mix(in <color-space>, <color> [ <percentage> ]?, <color> [ <percentage> ]?)`
  - `light-dark(<light-color>, <dark-color>)`
  - `oklch(<lightness> <chroma> <hue> [ / <alpha> ]?)`
- **Useful Values**:
  - 15% transparent brand tint: `color-mix(in srgb, #38bdf8 15%, transparent)`
  - Hover darkening: `color-mix(in srgb, var(--btn-color) 85%, black)`
  - Native theme color: `color: light-dark(#1e293b, #f1f5f9)`
- **Common Design Applications**: Automated state tints (hover/active/disabled) without hardcoding 20 color codes, seamless dual-theme styling.
- **Related Properties**: `color-scheme`, `accent-color`.
- **Compatibility**: `color-mix()` supported in all major browsers (Chromium 111+, Safari 16.2+, Firefox 113+); `light-dark()` supported in Chromium 125+, Safari 17.5+, Firefox 120+.
- **Practical Example**:
```css
:root {
  color-scheme: light dark;
}
.themed-badge {
  /* Toggles automatically without writing .dark class queries */
  background: light-dark(#f1f5f9, #1e293b);
  color: light-dark(#0f172a, #f8fafc);
  /* Generates subtle hover tint automatically */
  border: 1px solid color-mix(in srgb, currentColor 20%, transparent);
}
```

---

### F.4 Relational and Modern State Pseudo-Classes: `:has()`, `:focus-visible`, `:is()`, `:where()`
- **Classification**: CSS Pseudo-Classes
- **Purpose**:
  - `:has()`: The long-awaited "parent selector", styling an ancestor based on its descendants or state.
  - `:focus-visible`: Only shows focus rings when navigating via keyboard, avoiding ugly mouse-click outlines.
  - `:is()` / `:where()`: Consolidates selector lists and manages specificity.
- **Syntax**:
  - `:has(<relative-selector-list>)`
  - `:focus-visible`
  - `:is(<forgiving-selector-list>)`
- **Useful Values**:
  - Card with checked radio: `.card:has(input[type="radio"]:checked)`
  - Form with invalid field: `form:has(:invalid) button[type="submit"] { opacity: 0.5; }`
- **Common Design Applications**: Pricing cards that highlight when a plan is selected, forms that highlight submit buttons only when valid, accessible keyboard navigation.
- **Related Properties**: `outline`, `border-color`.
- **Compatibility**: `:has()` supported in all major engines (Chromium 105+, Safari 15.4+, Firefox 121+).
- **Practical Example**:
```css
/* Card illuminates when its inner radio is checked */
.pricing-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.pricing-card:has(input[type="radio"]:checked) {
  border-color: #38bdf8;
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.25);
}
```

---

### F.5 Key At-Rules: `@media`, `@supports`, `@container`, `@property`, `@layer`
- **Classification**: Environmental Directives
- **Purpose**:
  - `@media`: Queries device capabilities (screen width, orientation, `prefers-reduced-motion`, `prefers-color-scheme`).
  - `@supports`: Detects browser CSS feature support.
  - `@container`: Responsive styling based on container dimensions.
  - `@property`: Registers type-safe CSS custom properties, allowing smooth transitions on gradients and integers.
  - `@layer`: Explicitly orders CSS cascade specificity.
- **Useful Values**:
  - Accessibility: `@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }`
  - Smooth Gradient Animation via `@property`:
- **Practical Example**:
```css
/* Enables smooth transition of gradient angles */
@property --gradient-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes rotateBorderGradient {
  to {
    --gradient-angle: 360deg;
  }
}

.animated-border-box {
  background: conic-gradient(from var(--gradient-angle), #38bdf8, #6366f1, #38bdf8);
  animation: rotateBorderGradient 4s linear infinite;
}
```
