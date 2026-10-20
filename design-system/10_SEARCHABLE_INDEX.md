# 🔍 Deliverable 10: Searchable Master Index, Faceted Taxonomy & Bidirectional Link Graph

**File:** `design-system/10_SEARCHABLE_INDEX.md`  
**Classification:** Searchable Knowledge Graph, Faceted Index & Cross-Reference Architecture  
**Related Documents:**
- [`design-system/01_CSS_PROPERTIES_REFERENCE.md`](./01_CSS_PROPERTIES_REFERENCE.md)
- [`design-system/02_VISUAL_EFFECTS_CATALOGUE.md`](./02_VISUAL_EFFECTS_CATALOGUE.md)
- [`design-system/03_UI_COMPONENTS_LIBRARY.md`](./03_UI_COMPONENTS_LIBRARY.md)
- [`design-system/04_CARDS_AND_CARD_STACKS_LIBRARY.md`](./04_CARDS_AND_CARD_STACKS_LIBRARY.md)
- [`design-system/05_ANIMATIONS_CATALOGUE.md`](./05_ANIMATIONS_CATALOGUE.md)
- [`design-system/06_WEBSITE_SECTIONS_LIBRARY.md`](./06_WEBSITE_SECTIONS_LIBRARY.md)
- [`design-system/07_WEBSITE_DESIGN_PATTERNS.md`](./07_WEBSITE_DESIGN_PATTERNS.md)
- [`design-system/08_SOURCES_AND_REFERENCES.md`](./08_SOURCES_AND_REFERENCES.md)
- [`design-system/09_IMPLEMENTATION_RECIPES.md`](./09_IMPLEMENTATION_RECIPES.md)

---

## 📑 Table of Contents
1. [Architectural Index Overview](#1-architectural-index-overview)
2. [Faceted Taxonomy Filter Matrix](#2-faceted-taxonomy-filter-matrix)
3. [Bidirectional Cross-Reference Link Graph](#3-bidirectional-cross-reference-link-graph)
4. [Master Alphabetical Index (A–Z)](#4-master-alphabetical-index)
5. [Quick-Lookup Cheatsheets by Use-Case](#5-quick-lookup-cheatsheets)

---

## 1. Architectural Index Overview

This document functions as the navigational nervous system of the entire web design documentation platform. It provides multidimensional access paths across properties, visual techniques, components, card physics, animations, full-page sections, and industry templates.

---

## 2. Faceted Taxonomy Filter Matrix

### By Interaction Trigger
| Trigger Type | Components & Visual Effects | Associated Deliverable |
| :--- | :--- | :--- |
| **Static / Ambient** | Basic Cards, Inset Neumorphic Wells, Dot Grids, Ambient Mesh, 404 Pages | [01](./01_CSS_PROPERTIES_REFERENCE.md), [02](./02_VISUAL_EFFECTS_CATALOGUE.md), [04](./04_CARDS_AND_CARD_STACKS_LIBRARY.md) |
| **Hover-Triggered** | 3D Tilt Cards, Spotlight Illumination, Fan-Out Decks, Shimmer Sweeps, Magnetic Buttons, Animated Underlines | [02](./02_VISUAL_EFFECTS_CATALOGUE.md), [03](./03_UI_COMPONENTS_LIBRARY.md), [04](./04_CARDS_AND_CARD_STACKS_LIBRARY.md), [05](./05_ANIMATIONS_CATALOGUE.md) |
| **Click / Focus-Triggered** | Gated Action Buttons, Floating Label Inputs, 6-Box OTP, Modal Dialogs, Accordions, Dropdown Drawers | [03](./03_UI_COMPONENTS_LIBRARY.md), [09](./09_IMPLEMENTATION_RECIPES.md) |
| **Scroll-Driven** | Pure CSS Reading Progress, Sticky Zoom Storyteller, Horizontal Scroll Rails, ViewTimeline Card Reveals | [01](./01_CSS_PROPERTIES_REFERENCE.md), [05](./05_ANIMATIONS_CATALOGUE.md), [06](./06_WEBSITE_SECTIONS_LIBRARY.md) |
| **Touch / Gesture-Driven** | Tinder Swipe Decks, Drag-and-Drop Columns, Mobile Drawer Dismissal, Before-After Comparison Sliders | [03](./03_UI_COMPONENTS_LIBRARY.md), [04](./04_CARDS_AND_CARD_STACKS_LIBRARY.md), [09](./09_IMPLEMENTATION_RECIPES.md) |
| **Continuous Loops** | Infinite Logo Marquee, Floating Orbs, Pulsing Status Beacons, Border Beams, Ken Burns Pans | [02](./02_VISUAL_EFFECTS_CATALOGUE.md), [05](./05_ANIMATIONS_CATALOGUE.md) |

---

### By Implementation Difficulty
| Difficulty Level | Technical Requirements | Key Examples |
| :--- | :--- | :--- |
| **Beginner (CSS-Only)** | Standard CSS3 properties, zero JavaScript, high compatibility | Basic Cards, Fluid `clamp()`, Simple Hover Lifts, Flexbox Alignment |
| **Intermediate (Modern CSS)** | Advanced CSS (`@container`, `:has()`, `backdrop-filter`, `@property`, `@keyframes`) | Glassmorphism, Animated Border Beams, Pure CSS Accordions, Marquees |
| **Advanced (CSS + Lightweight JS)** | React Hooks, Pointer math, Touch coordinates, IntersectionObserver | Spotlight Cards, 3D Tilt Cards, Swipeable Decks, Scroll Glass Headers |
| **Expert (Complex Systems)** | High-concurrency WebSockets, WebGL shaders, Canvas, Physics simulations | Interactive WebGL Orbs, Exploded 3D Disassembly, Free Draggable Canvas |

---

## 3. Bidirectional Cross-Reference Link Graph

The link graph enables continuous discovery across all abstraction layers:

```
[CSS Property] ────────► [Visual Effect] ────────► [UI Component] ────────► [Website Section] ────────► [Industry Archetype]
```

### Discovery Chain 1: Glassmorphism Journey
1. **CSS Property**: [`backdrop-filter: blur(16px)`](./01_CSS_PROPERTIES_REFERENCE.md#b5-filter-backdrop-filter-mix-blend-mode-background-blend-mode)
2. **Visual Effect**: [FX-1.1 Classic Liquid Dark Glass](./02_VISUAL_EFFECTS_CATALOGUE.md#fx-11-classic-liquid-dark-glass-the-enterprise-standard)
3. **UI Component**: [NAV-2 Floating Glass Pill Navbar](./03_UI_COMPONENTS_LIBRARY.md#nav-2-floating-glass-pill-navbar)
4. **Card Pattern**: [CARD-11 Frosted Liquid Glass Card](./04_CARDS_AND_CARD_STACKS_LIBRARY.md#card-11-frosted-liquid-glass-card)
5. **Website Section**: [SEC-01 Split Hero with Floating Glass Mockups](./06_WEBSITE_SECTIONS_LIBRARY.md#sec-01-split-hero-typography-left-interactive-ui-stage-right)
6. **Complete Template**: [Archetype 1: B2B Enterprise SaaS Platform](./07_WEBSITE_DESIGN_PATTERNS.md#archetype-1-b2b-enterprise-saas-platform)
7. **Implementation Recipe**: [Recipe 6: Floating Glass Pill Navbar](./09_IMPLEMENTATION_RECIPES.md#recipe-6-liquid-glassmorphic-floating-pill-navbar-with-scroll-observer)

---

### Discovery Chain 2: 3D Spatial Stacking Journey
1. **CSS Property**: [`transform: perspective(1000px) rotateY()`](./01_CSS_PROPERTIES_REFERENCE.md#e2-3d-perspective-perspective-perspective-origin-backface-visibility)
2. **Visual Effect**: [FX-6.1 Interactive 3D Perspective Tilt](./02_VISUAL_EFFECTS_CATALOGUE.md#fx-61-interactive-3d-perspective-card-tilt-with-specular-reflection)
3. **Card Pattern**: [CARD-23 Fan-Out Card Deck on Hover](./04_CARDS_AND_CARD_STACKS_LIBRARY.md#card-23-fan-out-card-deck-stack-on-hover)
4. **Motion Pattern**: [ANIM-32 Fan-Out Deck Spread](./05_ANIMATIONS_CATALOGUE.md#anim-32-fan-out-deck-spread-on-hover)
5. **Website Section**: [SEC-17 Fanned-Out Testimonial Deck](./06_WEBSITE_SECTIONS_LIBRARY.md#sec-17-fanned-out-testimonial-card-deck)
6. **Complete Template**: [Archetype 4: Staff Engineer & Designer Portfolio](./07_WEBSITE_DESIGN_PATTERNS.md#archetype-4-staff-engineer--designer-portfolio)
7. **Implementation Recipe**: [Recipe 3: Specular 3D Tilt Card](./09_IMPLEMENTATION_RECIPES.md#recipe-3-specular-3d-perspective-tilt-card)

---

### Discovery Chain 3: Kinetic Motion & Marquee Journey
1. **CSS Property**: [`mask-image: linear-gradient()`](./01_CSS_PROPERTIES_REFERENCE.md#b6-mask-image-mask-size-mask-position-clip-path)
2. **Visual Effect**: [FX-7.1 Seamless Masked Infinite Marquee](./02_VISUAL_EFFECTS_CATALOGUE.md#fx-71-seamless-masked-infinite-marquee-zero-jitter)
3. **Motion Pattern**: [ANIM-26 Infinite Logo Marquee Rail](./05_ANIMATIONS_CATALOGUE.md#anim-26-infinite-logo-marquee-rail-marquee-loop)
4. **Website Section**: [SEC-15 Masked Infinite Logo Wall](./06_WEBSITE_SECTIONS_LIBRARY.md#sec-15-seamless-masked-infinite-logo-wall-ticker)
5. **Complete Template**: [Archetype 2: Generative AI & Developer Copilot](./07_WEBSITE_DESIGN_PATTERNS.md#archetype-2-generative-ai--developer-copilot)

---

### Discovery Chain 4: Responsive Floating Form Journey
1. **CSS Pseudo-Class**: [`:focus-visible`](./01_CSS_PROPERTIES_REFERENCE.md#f4-relational-and-modern-state-pseudo-classes-has-focus-visible-is-where)
2. **UI Component**: [INP-1 Floating-Label Text Input](./03_UI_COMPONENTS_LIBRARY.md#inp-1-floating-label-text-input-with-state-validation)
3. **Website Section**: [SEC-27 Enterprise Sales Contact Form](./06_WEBSITE_SECTIONS_LIBRARY.md#sec-27-enterprise-sales-contact-form-with-role-routing)
4. **Implementation Recipe**: [Recipe 1: Production Floating Label Input](./09_IMPLEMENTATION_RECIPES.md#recipe-1-production-floating-label-input-with-native-validation)

---

## 4. Master Alphabetical Index (A–Z)

### A
- [`accent-color`](./01_CSS_PROPERTIES_REFERENCE.md#f3-modern-color-functions-color-mix-light-dark-and-oklch)
- [Accordion Expandable Card (CARD-15)](./04_CARDS_AND_CARD_STACKS_LIBRARY.md#card-15-expandable-accordion-card)
- [Action Buttons & Microinteractions (Category B)](./03_UI_COMPONENTS_LIBRARY.md#category-b-buttons-action-controls--microinteractions)
- [`align-items`, `align-content`, `align-self`](./01_CSS_PROPERTIES_REFERENCE.md#a8-alignment-models-align-items-justify-content-align-self-justify-self)
- [`animation-timeline` (Scroll & View Timelines)](./01_CSS_PROPERTIES_REFERENCE.md#e4-modern-scroll-driven-animations-scroll-timeline-view-timeline-animation-timeline-animation-range)
- [Aurora Blurred Orbs (FX-3.1)](./02_VISUAL_EFFECTS_CATALOGUE.md#fx-31-ambient-blurred-aurora-orbs-css-only)

### B
- [`backdrop-filter`](./01_CSS_PROPERTIES_REFERENCE.md#b5-filter-backdrop-filter-mix-blend-mode-background-blend-mode)
- [`background-clip: text`](./01_CSS_PROPERTIES_REFERENCE.md#b2-background-size-background-position-background-attachment-background-clip)
- [Bento Grid Feature Matrix (SEC-08)](./06_WEBSITE_SECTIONS_LIBRARY.md#sec-08-the-bento-grid-feature-matrix)
- [Border Beam Animated Ray (FX-3.6)](./02_VISUAL_EFFECTS_CATALOGUE.md#fx-36-multi-color-animated-border-beam)
- [`box-shadow` & Layered Ambient Shadows](./01_CSS_PROPERTIES_REFERENCE.md#c3-box-shadow-text-shadow-inset-shadows-layered-shadows--neon-glows)

### C
- [`calc()`, `min()`, `max()`, `clamp()`](./01_CSS_PROPERTIES_REFERENCE.md#f2-mathematical-functions-calc-min-max-clamp)
- [Card Shuffling Deck (CARD-27)](./04_CARDS_AND_CARD_STACKS_LIBRARY.md#card-27-card-shuffle-animation-deck)
- [`clip-path` Geometric Reveals](./01_CSS_PROPERTIES_REFERENCE.md#b6-mask-image-mask-size-mask-position-clip-path)
- [`color-mix()` Modern Blends](./01_CSS_PROPERTIES_REFERENCE.md#f3-modern-color-functions-color-mix-light-dark-and-oklch)
- [Command Palette `Ctrl+K` (NAV-6)](./03_UI_COMPONENTS_LIBRARY.md#nav-6-command-palette-ctrl--k--cmd--k)
- [`@container` Container Queries](./01_CSS_PROPERTIES_REFERENCE.md#a9-aspect-ratio-box-sizing-container-queries-container)

### D
- [Dual-Theme `dark:` Harmony](./01_CSS_PROPERTIES_REFERENCE.md#f1-css-custom-properties---var-and-dynamic-theming)
- [Duotone Photo Blend (FX-5.1)](./02_VISUAL_EFFECTS_CATALOGUE.md#fx-51-spotify-style-duotone-photo-blend)

### F
- [Fan-Out Card Deck on Hover (CARD-23)](./04_CARDS_AND_CARD_STACKS_LIBRARY.md#card-23-fan-out-card-deck-stack-on-hover)
- [Fixed Background vs 3D Parallax vs Sticky Storytelling Breakdown](./01_CSS_PROPERTIES_REFERENCE.md#b3-deep-architectural-breakdown-fixed-background-vs-true-3d-parallax-vs-sticky-scroll-storytelling)
- [Floating-Label Input Recipe (Recipe 1)](./09_IMPLEMENTATION_RECIPES.md#recipe-1-production-floating-label-input-with-native-validation)
- [`:focus-visible` Accessible Rings](./01_CSS_PROPERTIES_REFERENCE.md#f4-relational-and-modern-state-pseudo-classes-has-focus-visible-is-where)

### G
- [Gated Action Button with Promise Verification (Recipe 5)](./09_IMPLEMENTATION_RECIPES.md#recipe-5-strict-gated-action-button-idle--loading--verified-success)
- [Glassmorphism Architecture (Category 1)](./02_VISUAL_EFFECTS_CATALOGUE.md#category-1-glassmorphism-frosted-glass--translucent-surfaces)
- [Grayscale-to-Color Transition (FX-5.2)](./02_VISUAL_EFFECTS_CATALOGUE.md#fx-52-grayscale-to-color-reveal-on-hover)

### H
- [`:has()` Relational Parent Selector](./01_CSS_PROPERTIES_REFERENCE.md#f4-relational-and-modern-state-pseudo-classes-has-focus-visible-is-where)
- [Horizontal Scroll Story Showcase (SEC-31)](./06_WEBSITE_SECTIONS_LIBRARY.md#sec-31-horizontal-scroll-project-case-studies)

### K
- [Ken Burns Cinematic Zoom (FX-5.3)](./02_VISUAL_EFFECTS_CATALOGUE.md#fx-53-cinematic-ken-burns-pan--zoom)

### M
- [`mask-image` Edge Fades](./01_CSS_PROPERTIES_REFERENCE.md#b6-mask-image-mask-size-mask-position-clip-path)
- [Masked Infinite Logo Marquee (FX-7.1)](./02_VISUAL_EFFECTS_CATALOGUE.md#fx-71-seamless-masked-infinite-marquee-zero-jitter)
- [Mobile Floating "Menu" Pill with Dual Close Controls (NAV-4)](./03_UI_COMPONENTS_LIBRARY.md#nav-4-dashboard-floating-menu-pill-with-dual-close-controls)

### N
- [Neumorphism & Inset Wells (Category 2)](./02_VISUAL_EFFECTS_CATALOGUE.md#category-2-neumorphism--tactile-inset-surfaces)

### O
- [`oklch()` Wide-Gamut Colors](./01_CSS_PROPERTIES_REFERENCE.md#f3-modern-color-functions-color-mix-light-dark-and-oklch)

### P
- [`perspective: 1000px` 3D Camera Projection](./01_CSS_PROPERTIES_REFERENCE.md#e2-3d-perspective-perspective-perspective-origin-backface-visibility)
- [`@property` CSS Custom Property Registration](./01_CSS_PROPERTIES_REFERENCE.md#f5-key-at-rules-media-supports-container-property-layer)

### R
- [`@media (prefers-reduced-motion: reduce)` Accessible Safe Mode](./05_ANIMATIONS_CATALOGUE.md#7-universal-accessibility-the-reduced-motion-mandate)

### S
- [Specular 3D Perspective Tilt Card (Recipe 3)](./09_IMPLEMENTATION_RECIPES.md#recipe-3-specular-3d-perspective-tilt-card)
- [Spotlight Card with Cursor Tracking (Recipe 2)](./09_IMPLEMENTATION_RECIPES.md#recipe-2-cursor-tracking-spotlight-card-with-radial-illumination)
- [Sticky Scroll Storytelling Runway (SEC-30)](./06_WEBSITE_SECTIONS_LIBRARY.md#sec-30-pinned-sticky-zoom-storyteller-runway-300vh)
- [Swipeable Stacked Card Deck (Recipe 4)](./09_IMPLEMENTATION_RECIPES.md#recipe-4-gesture-driven-swipeable-stacked-card-deck-tinder-style)

### T
- [Tinder-Style Swipeable Deck (CARD-31)](./04_CARDS_AND_CARD_STACKS_LIBRARY.md#card-31-tinder-style-swipeable-card-stack-touch--pointer-physics)
- [Toast Notification with Progress Bar (OVL-1)](./03_UI_COMPONENTS_LIBRARY.md#ovl-1-animated-toast-notification-with-linear-countdown-bar)

### Z
- [`z-index` Stacking Context Layering Rules](./01_CSS_PROPERTIES_REFERENCE.md#a3-z-index-overflow-visibility)

---

## 5. Quick-Lookup Cheatsheets by Use-Case

### Use-Case A: "I need to build a high-conversion SaaS hero section"
1. Read [SEC-01 Split Hero](./06_WEBSITE_SECTIONS_LIBRARY.md#sec-01-split-hero-typography-left-interactive-ui-stage-right).
2. Use [Recipe 6 Floating Glass Pill Navbar](./09_IMPLEMENTATION_RECIPES.md#recipe-6-liquid-glassmorphic-floating-pill-navbar-with-scroll-observer).
3. Embed [CARD-17 Specular 3D Tilt Card](./04_CARDS_AND_CARD_STACKS_LIBRARY.md#card-17-specular-3d-tilt-card-mouse-tracking) on the right stage.
4. Add [SEC-15 Infinite Logo Marquee](./06_WEBSITE_SECTIONS_LIBRARY.md#sec-15-seamless-masked-infinite-logo-wall-ticker) directly below.

### Use-Case B: "I need to build an interactive stacked card showcase"
1. Read [Cluster 3: Fixed Stacked Decks & Fan-Outs](./04_CARDS_AND_CARD_STACKS_LIBRARY.md#cluster-3-fixed-stacked-decks-fan-outs--cascading-spreads).
2. Choose between **CSS-Only Fan-Out** ([CARD-23](./04_CARDS_AND_CARD_STACKS_LIBRARY.md#card-23-fan-out-card-deck-stack-on-hover)) or **Gesture Swipe Deck** ([Recipe 4](./09_IMPLEMENTATION_RECIPES.md#recipe-4-gesture-driven-swipeable-stacked-card-deck-tinder-style)).
3. Apply [FX-1.1 Liquid Glass Styling](./02_VISUAL_EFFECTS_CATALOGUE.md#fx-11-classic-liquid-dark-glass-the-enterprise-standard) to each card.

### Use-Case C: "I need to build an accessible, validated form"
1. Read [Category D: Forms & Inputs](./03_UI_COMPONENTS_LIBRARY.md#category-d-forms-validated-inputs--selection-controls).
2. Copy [Recipe 1: Production Floating Label Input](./09_IMPLEMENTATION_RECIPES.md#recipe-1-production-floating-label-input-with-native-validation).
3. Connect submit button to [Recipe 5: Strict Gated Action Button](./09_IMPLEMENTATION_RECIPES.md#recipe-5-strict-gated-action-button-idle--loading--verified-success).
