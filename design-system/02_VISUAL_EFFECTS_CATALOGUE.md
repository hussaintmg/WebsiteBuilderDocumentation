# 🎨 Deliverable 2: Master Visual Effects & Styling Techniques Catalogue

**File:** `design-system/02_VISUAL_EFFECTS_CATALOGUE.md`  
**Classification:** Visual Effects Engineering & Graphic Computation  
**Related Documents:**
- [`design-system/01_CSS_PROPERTIES_REFERENCE.md`](./01_CSS_PROPERTIES_REFERENCE.md)
- [`design-system/04_CARDS_AND_CARD_STACKS_LIBRARY.md`](./04_CARDS_AND_CARD_STACKS_LIBRARY.md)
- [`design-system/05_ANIMATIONS_CATALOGUE.md`](./05_ANIMATIONS_CATALOGUE.md)
- [`design-system/09_IMPLEMENTATION_RECIPES.md`](./09_IMPLEMENTATION_RECIPES.md)

---

## 📑 Table of Contents
1. [Visual Effects Taxonomy & GPU Compositor Hierarchy](#1-visual-effects-taxonomy--gpu-compositor-hierarchy)
2. [Category 1: Glassmorphism, Frosted Glass & Translucent Surfaces](#category-1-glassmorphism-frosted-glass--translucent-surfaces)
3. [Category 2: Neumorphism & Tactile Inset Surfaces](#category-2-neumorphism--tactile-inset-surfaces)
4. [Category 3: Gradient Meshes, Animated Auroras & Liquid Blobs](#category-3-gradient-meshes-animated-auroras--liquid-blobs)
5. [Category 4: Neon Glows, Border Beams & Interactive Spotlights](#category-4-neon-glows-border-beams--interactive-spotlights)
6. [Category 5: Advanced Image Filters, Masking, Duotones & Reveals](#category-5-advanced-image-filters-masking-duotones--reveals)
7. [Category 6: Depth, 3D Perspectives, Reflections & Storytelling](#category-6-depth-3d-perspectives-reflections--storytelling)
8. [Category 7: Kinetic Marquees, Textured Grids & Typography Effects](#category-7-kinetic-marquees-textured-grids--typography-effects)

---

## 1. Visual Effects Taxonomy & GPU Compositor Hierarchy

Visual effects in modern web design dictate perceived quality, responsiveness, and brand prestige. To maintain high performance (60–120 FPS on high-refresh mobile and desktop screens), effects must be engineered using GPU-accelerated rasterization pipelines.

```
                  ┌───────────────────────────────────────────────┐
                  │          CSS Rendering Pipeline Layers        │
                  └───────────────────────┬───────────────────────┘
                                          │
            ┌─────────────────────────────┴─────────────────────────────┐
            ▼                                                           ▼
     Fast / Zero-Reflow                                          Heavy / Reflow-Risk
    (Compositor Thread)                                           (Layout/Paint Thread)
   ───────────────────────                                       ───────────────────────
   • transform: translate3d                                      • width / height
   • opacity                                                     • margin / top / left
   • backdrop-filter (isolated)                                  • un-isolated filter blurs
   • will-change: transform                                      • box-shadow recalculations
```

---

## Category 1: Glassmorphism, Frosted Glass & Translucent Surfaces

---

### FX-1.1: Classic Liquid Dark Glass (The Enterprise Standard)
- **Visual Description**: A deep, semi-transparent obsidian glass pane with an ultra-fine 1px specular highlight along the top and left edges, high background blur, and saturated backlighting.
- **Required CSS Properties**: `background`, `backdrop-filter: blur(16px) saturate(180%)`, `-webkit-backdrop-filter`, `border: 1px solid rgba(255, 255, 255, 0.08)`, `box-shadow`.
- **Implementation Technique**: Pure CSS (CSS3 Hardware Accelerated).
- **Trigger**: Static with subtle hover specular shift.
- **Desktop vs Mobile**: Identical visual appearance; mobile maintains 12px blur to conserve battery on low-end mobile GPUs.
- **Accessibility**: Requires adequate contrast ratio between text and whatever dynamic background is behind the glass pane (minimum 4.5:1).
- **Code Recipe**:
```css
.fx-liquid-dark-glass {
  background: rgba(15, 20, 31, 0.65);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 24px 48px -12px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.12); /* Specular top highlight */
  border-radius: 1rem;
}
```

---

### FX-1.2: Frosted Milky Light Glass
- **Visual Description**: A light-mode frosted crystal surface resembling sandblasted quartz, diffusing background colors into pastel tints.
- **Required CSS Properties**: `background: rgba(255, 255, 255, 0.75)`, `backdrop-filter: blur(20px)`, `border: 1px solid rgba(255, 255, 255, 0.6)`, `box-shadow: 0 8px 32px rgba(31, 38, 135, 0.07)`.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Static / Ambient.
- **Code Recipe**:
```css
.fx-frosted-milky-glass {
  background: rgba(255, 255, 255, 0.72);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  backdrop-filter: blur(20px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.65);
  box-shadow: 0 12px 30px rgba(100, 116, 139, 0.08);
  color: #0f172a;
}
```

---

### FX-1.3: Iridescent Rainbow Smoked Glass
- **Visual Description**: A moody tinted glass panel that reflects chromatic rainbow fringes along its border when viewed against dark canvases.
- **Required CSS Properties**: `backdrop-filter`, `border-image`, `box-shadow: inset 0 0 12px rgba(168, 85, 247, 0.15)`.
- **Implementation Technique**: Pure CSS with pseudo-element chromatic gradient.
- **Trigger**: Static with hover glow intensification.
- **Code Recipe**:
```css
.fx-iridescent-glass {
  position: relative;
  background: rgba(10, 14, 23, 0.8);
  backdrop-filter: blur(24px);
  border-radius: 1.25rem;
  padding: 1.5rem;
}
.fx-iridescent-glass::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, #38bdf8, #818cf8, #ec4899, #38bdf8);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

---

### FX-1.4: Multi-Layered Double Glass
- **Visual Description**: A floating inner frosted card nested within an outer translucent bezel, producing a multi-stage depth illusion.
- **Required CSS Properties**: Dual `backdrop-filter` containers, nested absolute layout.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Hover expands inner card slightly (`translateY(-4px)`).
- **Code Recipe**:
```css
.fx-double-glass-outer {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 1rem;
  border-radius: 1.5rem;
}
.fx-double-glass-inner {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
}
```

---

### FX-1.5: Gradient-Tinted Aurora Glass
- **Visual Description**: Translucent glass containing an internal colored gradient wash (emerald to cyan) that gently glows without obscuring readability.
- **Required CSS Properties**: `linear-gradient` with low opacity color stops, `backdrop-filter`.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Continuous ambient background color shift.
- **Code Recipe**:
```css
.fx-aurora-glass {
  background: linear-gradient(145deg, rgba(16, 185, 129, 0.12), rgba(6, 182, 212, 0.08));
  backdrop-filter: blur(16px);
  border: 1px solid rgba(16, 185, 129, 0.2);
  box-shadow: 0 0 30px rgba(6, 182, 212, 0.1);
}
```

---

### FX-1.6: Dynamic Frosted Glass Navbar with Scroll Transition
- **Visual Description**: Starts completely transparent at the top of the page; transitions into a solid frosted glass pill upon scrolling down 20 pixels.
- **Required CSS Properties**: `transition: background 0.3s, backdrop-filter 0.3s`, `position: sticky; top: 1rem;`.
- **Implementation Technique**: CSS Transitions paired with IntersectionObserver or scroll position listener.
- **Trigger**: Scroll-triggered threshold.
- **Code Recipe**:
```css
.fx-scroll-glass-nav {
  position: sticky;
  top: 1rem;
  z-index: 50;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  background: transparent;
  border: 1px solid transparent;
}
.fx-scroll-glass-nav.is-scrolled {
  background: rgba(10, 15, 25, 0.75);
  backdrop-filter: blur(16px);
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
}
```

---

## Category 2: Neumorphism & Tactile Inset Surfaces

---

### FX-2.1: Soft Convex Neumorphic Card (Light Theme)
- **Visual Description**: A tactile, plastic-like card surface that appears extruded seamlessly from the background plane using dual opposing shadows.
- **Required CSS Properties**: `background: #e0e5ec`, `box-shadow: 9px 9px 16px #a3b1c6, -9px -9px 16px #ffffff`, `border-radius`.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Static with active press simulation.
- **Accessibility**: Caution: Low visual contrast. Never rely on neumorphic borders alone to denote button boundaries; pair with high-contrast text or icons.
- **Code Recipe**:
```css
.fx-neumorph-light {
  background: #e0e5ec;
  border-radius: 1.5rem;
  box-shadow: 
    10px 10px 20px #bebebe, 
    -10px -10px 20px #ffffff;
}
```

---

### FX-2.2: Pressed Inset Well (Switch / Text Field)
- **Visual Description**: The surface appears pushed downward into the body cavity, ideal for toggle switches, text input wells, and progress troughs.
- **Required CSS Properties**: `box-shadow: inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff`.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Click / Active state or permanent input container.
- **Code Recipe**:
```css
.fx-neumorph-inset {
  background: #e0e5ec;
  border-radius: 9999px;
  box-shadow: 
    inset 4px 4px 8px #b8b9be, 
    inset -4px -4px 8px #ffffff;
}
```

---

### FX-2.3: Dark-Mode Obsidian Neumorphism
- **Visual Description**: Sophisticated dark-mode tactile extrusion where the top-left highlight is a crisp deep blue-gray and the bottom-right is an inky shadow.
- **Required CSS Properties**: `background: #131722`, `box-shadow: 6px 6px 14px #0b0e14, -6px -6px 14px #1b2030`.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Static / Hover.
- **Code Recipe**:
```css
.fx-neumorph-dark {
  background: #131722;
  border-radius: 1.25rem;
  box-shadow: 
    8px 8px 18px #090b10, 
    -8px -8px 18px #1d2334;
}
```

---

### FX-2.4: Neumorphic Floating Island with Colored Center Core
- **Visual Description**: Combines soft neumorphic outer elevation with an internal vibrant gradient core button or indicator.
- **Required CSS Properties**: Outer dual-shadow + inner radial gradient element.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Hover lifts outer island; active clicks core.
- **Code Recipe**:
```css
.fx-neumorph-island {
  background: #181c28;
  padding: 8px;
  border-radius: 2rem;
  box-shadow: 6px 6px 14px #0c0e16, -6px -6px 14px #242a3c;
  display: inline-flex;
}
.fx-neumorph-island-core {
  background: linear-gradient(135deg, #0284c7, #38bdf8);
  border-radius: 9999px;
  padding: 0.75rem 1.5rem;
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.4);
}
```

---

### FX-2.5: Interactive Neumorphic Toggle Switch (Physical Click Feel)
- **Visual Description**: A tactile toggle switch where the track is an inset well and the thumb thumb-knob smoothly glides with physical spring physics.
- **Required CSS Properties**: `transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)`, inset track shadow, extruded knob shadow.
- **Implementation Technique**: Pure CSS (`input[type="checkbox"]` + label sibling).
- **Trigger**: Click / Touch.
- **Code Recipe**:
```css
.fx-neumorph-toggle-track {
  width: 60px;
  height: 32px;
  background: #0f141f;
  border-radius: 9999px;
  box-shadow: inset 3px 3px 6px #07090e, inset -3px -3px 6px #171f30;
  position: relative;
  cursor: pointer;
}
.fx-neumorph-toggle-thumb {
  width: 26px;
  height: 26px;
  background: #1e2638;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  box-shadow: 2px 2px 5px #07090e, -1px -1px 3px #2b3650;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
input:checked + .fx-neumorph-toggle-track .fx-neumorph-toggle-thumb {
  transform: translateX(28px);
  background: #38bdf8;
  box-shadow: 0 0 10px #38bdf8;
}
```

---

### FX-2.6: Hybrid Glass-Neumorphism (The Modern Synthesis)
- **Visual Description**: Blends frosted glass transparency with tactile edge shadows, eliminating the flat look of pure glass and the heaviness of old neumorphism.
- **Required CSS Properties**: `backdrop-filter: blur(16px)`, `background: rgba(30, 41, 59, 0.4)`, dual external ambient shadows + dual internal inset rim lights.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Static with gentle hover elevation.
- **Code Recipe**:
```css
.fx-glass-neumorph-hybrid {
  background: rgba(24, 32, 47, 0.45);
  backdrop-filter: blur(14px);
  border-radius: 1.25rem;
  box-shadow: 
    8px 8px 20px rgba(0, 0, 0, 0.3),
    -6px -6px 16px rgba(255, 255, 255, 0.03),
    inset 1px 1px 1px rgba(255, 255, 255, 0.15),
    inset -1px -1px 1px rgba(0, 0, 0, 0.3);
}
```

---

## Category 3: Gradient Meshes, Animated Auroras & Liquid Blobs

---

### FX-3.1: Ambient Blurred Aurora Orbs (CSS Only)
- **Visual Description**: Large, soft floating spheres of cyan and indigo light that drift behind dark mode cards, creating high-tech visual depth without blocking content.
- **Required CSS Properties**: `filter: blur(80px)`, `opacity: 0.6`, `@keyframes floatAnimation`, `transform: translate3d()`.
- **Implementation Technique**: Pure CSS GPU-composited layer.
- **Trigger**: Continuous ambient loop.
- **Code Recipe**:
```css
@keyframes floatOrb1 {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(40px, -60px, 0) scale(1.15); }
}
.fx-aurora-orb-cyan {
  position: absolute;
  width: 450px;
  height: 450px;
  border-radius: 50%;
  background: radial-gradient(circle, #0ea5e9 0%, rgba(14, 165, 233, 0) 70%);
  filter: blur(80px);
  opacity: 0.35;
  animation: floatOrb1 12s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
}
```

---

### FX-3.2: 4-Corner Mesh Gradient (Zero JS)
- **Visual Description**: A smooth 4-color blend where each corner of the container emits a distinct hue (cyan top-left, indigo top-right, rose bottom-left, dark bottom-right) meeting seamlessly in the center.
- **Required CSS Properties**: Composed `radial-gradient` layers on a single `background` declaration.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Static background canvas.
- **Code Recipe**:
```css
.fx-4corner-mesh {
  background-color: #07090e;
  background-image:
    radial-gradient(at 0% 0%, rgba(56, 189, 248, 0.25) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(99, 102, 241, 0.25) 0px, transparent 50%),
    radial-gradient(at 0% 100%, rgba(244, 63, 94, 0.15) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(168, 85, 247, 0.2) 0px, transparent 50%);
}
```

---

### FX-3.3: Liquid Morphing SVG Blob
- **Visual Description**: An organic, fluid 2D blob whose contours morph continuously through elastic liquid states.
- **Required CSS Properties**: `border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%`, `@keyframes blobMorph`.
- **Implementation Technique**: Pure CSS keyframes animating 8 corner radiuses.
- **Trigger**: Continuous animation loop.
- **Code Recipe**:
```css
@keyframes blobMorph {
  0%, 100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
  33% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
  }
  66% {
    border-radius: 40% 60% 30% 70% / 40% 40% 60% 55%;
  }
}
.fx-liquid-blob {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #38bdf8, #6366f1);
  animation: blobMorph 8s ease-in-out infinite;
}
```

---

### FX-3.4: Continuous Gradient Angle Shift (CSS `@property`)
- **Visual Description**: A radiant gradient background whose angle rotates continuously 360 degrees smoothly without abrupt snapping.
- **Required CSS Properties**: `@property --angle { syntax: '<angle>'; initial-value: 0deg; }`, `conic-gradient(from var(--angle), ...)`.
- **Implementation Technique**: Pure CSS Modern Property Interpolation.
- **Trigger**: Continuous loop.
- **Code Recipe**:
```css
@property --gradient-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
@keyframes spinGradient {
  to { --gradient-angle: 360deg; }
}
.fx-angle-shifting-bg {
  background: conic-gradient(
    from var(--gradient-angle),
    #0f172a, #1e1b4b, #0f172a, #0369a1, #0f172a
  );
  animation: spinGradient 10s linear infinite;
}
```

---

### FX-3.5: Holographic Rainbow Foil Sheen
- **Visual Description**: Simulates a physical metallic holographic foil card that reflects iridescent spectral highlights across its surface.
- **Required CSS Properties**: `linear-gradient` with repeating spectrum, `mix-blend-mode: color-dodge`, opacity.
- **Implementation Technique**: Pure CSS overlay.
- **Trigger**: Hover translates sheen position.
- **Code Recipe**:
```css
.fx-holographic-sheen {
  position: relative;
  overflow: hidden;
}
.fx-holographic-sheen::after {
  content: '';
  position: absolute;
  inset: -100%;
  background: repeating-linear-gradient(
    115deg,
    transparent 0%,
    rgba(255, 0, 128, 0.15) 15%,
    rgba(0, 255, 255, 0.2) 25%,
    rgba(255, 255, 0, 0.15) 35%,
    transparent 50%
  );
  mix-blend-mode: color-dodge;
  transition: transform 0.6s ease;
  pointer-events: none;
}
.fx-holographic-sheen:hover::after {
  transform: translate(50%, 50%);
}
```

---

### FX-3.6: Multi-Color Animated Border Beam
- **Visual Description**: A luminous pulse of light travels endlessly along the perimeter border of a card or CTA container.
- **Required CSS Properties**: `@property --border-angle`, `conic-gradient`, masking.
- **Implementation Technique**: Pure CSS with pseudo-element mask.
- **Trigger**: Continuous loop.
- **Code Recipe**:
```css
@property --beam-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
@keyframes borderBeamTravel {
  to { --beam-angle: 360deg; }
}
.fx-border-beam-card {
  position: relative;
  border-radius: 1rem;
  background: #0f141f;
  padding: 1.5rem;
}
.fx-border-beam-card::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: conic-gradient(
    from var(--beam-angle),
    transparent 70%,
    #38bdf8 88%,
    #818cf8 95%,
    transparent 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  padding: 2px;
  animation: borderBeamTravel 4s linear infinite;
  pointer-events: none;
}
```

---

## Category 4: Neon Glows, Border Beams & Interactive Spotlights

---

### FX-4.1: Cursor-Following Radial Spotlight Card (JavaScript Hook + CSS Variables)
- **Visual Description**: As the user moves their cursor over a dark card, a soft circular spotlight illuminates the card surface and highlights its border under the pointer.
- **Required CSS Properties**: `background: radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(56, 189, 248, 0.15), transparent 80%)`.
- **Implementation Technique**: CSS Variables updated via lightweight pointermove event listener.
- **Trigger**: Pointer / Hover interaction.
- **Mobile Fallback**: Renders a fixed subtle top-center gradient highlight on touch devices without JS tracking.
- **Code Recipe**:
```css
.fx-spotlight-card {
  position: relative;
  background: #0f141f;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
}
.fx-spotlight-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(56, 189, 248, 0.12),
    transparent 80%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}
.fx-spotlight-card:hover::before {
  opacity: 1;
}
```

---

### FX-4.2: Electric Cyan Neon Glow
- **Visual Description**: High-intensity glowing borders and text reminiscent of neon signage, utilizing layered non-spread shadows.
- **Required CSS Properties**: `box-shadow`, `text-shadow`, `border-color: #38bdf8`.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Static with pulsing keyframe option.
- **Code Recipe**:
```css
.fx-neon-cyan {
  border: 1px solid #38bdf8;
  box-shadow:
    0 0 5px rgba(56, 189, 248, 0.8),
    0 0 15px rgba(56, 189, 248, 0.4),
    0 0 30px rgba(56, 189, 248, 0.2);
  text-shadow: 0 0 8px rgba(56, 189, 248, 0.6);
}
```

---

### FX-4.3: Pulsing Breathing Status Beacon
- **Visual Description**: A small green or cyan status dot that continuously emits an expanding translucent shockwave ring.
- **Required CSS Properties**: `::after` pseudo-element with `animation: beaconPing 2s infinite`, `box-shadow`.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Continuous loop.
- **Code Recipe**:
```css
@keyframes beaconPing {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(2.4); opacity: 0; }
}
.fx-status-beacon {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #10b981;
}
.fx-status-beacon::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #10b981;
  animation: beaconPing 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
```

---

### FX-4.4: Shimmer Sweep Wave on Hover
- **Visual Description**: A diagonal band of pure white light glides across a button or badge when the mouse hovers over it.
- **Required CSS Properties**: `linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)`, `transform: translateX()`, `overflow: hidden`.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Hover.
- **Code Recipe**:
```css
.fx-shimmer-sweep {
  position: relative;
  overflow: hidden;
}
.fx-shimmer-sweep::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.25),
    transparent
  );
  transform: skewX(-20deg);
  transition: left 0.6s ease;
}
.fx-shimmer-sweep:hover::after {
  left: 200%;
}
```

---

### FX-4.5: Diffused Multi-Color Backlight (Drop Glow)
- **Visual Description**: A blurred replica of the container is positioned directly underneath it, projecting a realistic colored shadow casting onto the background.
- **Required CSS Properties**: `::before` pseudo-element with `filter: blur(24px)`, `z-index: -1`, `opacity: 0.5`.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Static with hover expansion.
- **Code Recipe**:
```css
.fx-backlight-container {
  position: relative;
  z-index: 1;
}
.fx-backlight-container::before {
  content: '';
  position: absolute;
  inset: 8px;
  background: linear-gradient(135deg, #0284c7, #818cf8, #ec4899);
  filter: blur(24px);
  opacity: 0.5;
  border-radius: inherit;
  z-index: -1;
  transition: opacity 0.3s, filter 0.3s;
}
.fx-backlight-container:hover::before {
  opacity: 0.8;
  filter: blur(32px);
}
```

---

### FX-4.6: Animated Gradient Border (Pure CSS)
- **Visual Description**: A continuous animated color gradient border enclosing a card without clipping interior content.
- **Required CSS Properties**: Multi-layer `background` with `background-clip: padding-box, border-box`.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Continuous or hover.
- **Code Recipe**:
```css
.fx-gradient-border-card {
  border: 1px solid transparent;
  background-image: 
    linear-gradient(#0f141f, #0f141f), 
    linear-gradient(135deg, #38bdf8, #818cf8, #ec4899);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border-radius: 1rem;
}
```

---

## Category 5: Advanced Image Filters, Masking, Duotones & Reveals

---

### FX-5.1: Spotify-Style Duotone Photo Blend
- **Visual Description**: Converts a photography portrait into a 2-tone artistic poster (e.g. Electric Violet shadows and Neon Yellow highlights).
- **Required CSS Properties**: `mix-blend-mode: multiply`, `mix-blend-mode: screen`, pseudo-elements.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Static with optional hover transition back to full color.
- **Code Recipe**:
```css
.fx-duotone-wrapper {
  position: relative;
  background-color: #6366f1; /* Dark tone: Indigo */
  overflow: hidden;
}
.fx-duotone-wrapper img {
  width: 100%;
  filter: grayscale(100%) contrast(150%);
  mix-blend-mode: multiply;
}
.fx-duotone-wrapper::after {
  content: '';
  position: absolute;
  inset: 0;
  background-color: #38bdf8; /* Light tone: Cyan */
  mix-blend-mode: screen;
  pointer-events: none;
}
```

---

### FX-5.2: Grayscale to Color Reveal on Hover
- **Visual Description**: An image rests in clean monochrome desaturation; upon mouse hover, it smoothly transitions to full vibrant saturation with a gentle scale up.
- **Required CSS Properties**: `filter: grayscale(100%)`, `transition: filter 0.4s ease, transform 0.4s ease`.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Hover.
- **Code Recipe**:
```css
.fx-grayscale-reveal-img {
  filter: grayscale(100%) brightness(0.9);
  transform: scale(1);
  transition: filter 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.fx-grayscale-reveal-container:hover .fx-grayscale-reveal-img {
  filter: grayscale(0%) brightness(1);
  transform: scale(1.04);
}
```

---

### FX-5.3: Cinematic Ken Burns Pan & Zoom
- **Visual Description**: An image slowly scales from 1.0 to 1.15 over 15 seconds while subtly drifting its focus point, creating cinematic documentary movement.
- **Required CSS Properties**: `@keyframes kenBurns`, `transform: scale() translate3d()`, `overflow: hidden`.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Continuous ambient loop.
- **Accessibility**: Automatically disables when user has `prefers-reduced-motion: reduce`.
- **Code Recipe**:
```css
@keyframes kenBurnsEffect {
  0% { transform: scale(1) translate(0, 0); }
  50% { transform: scale(1.12) translate(-2%, 1%); }
  100% { transform: scale(1) translate(0, 0); }
}
.fx-ken-burns-img {
  animation: kenBurnsEffect 20s ease-in-out infinite alternate;
}
@media (prefers-reduced-motion: reduce) {
  .fx-ken-burns-img { animation: none; }
}
```

---

### FX-5.4: Soft Gradient Edge Fade Mask
- **Visual Description**: An image or card sequence whose bottom or side edges fade gently into the background color without abrupt hard borders.
- **Required CSS Properties**: `-webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%)`, `mask-image`.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Static.
- **Code Recipe**:
```css
.fx-edge-fade-mask {
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%);
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%);
}
```

---

### FX-5.5: Diagonal Clip-Path Hero Reveal
- **Visual Description**: A modern asymmetric section divider where an image is cut on an aggressive 6-degree dynamic diagonal.
- **Required CSS Properties**: `clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%)`.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Static or animated on scroll entry.
- **Code Recipe**:
```css
.fx-diagonal-slice {
  clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);
}
@media (min-width: 1024px) {
  .fx-diagonal-slice {
    clip-path: polygon(0 0, 100% 0, 100% 82%, 0 100%);
  }
}
```

---

### FX-5.6: Geometric Curtain Wipe Transition
- **Visual Description**: Upon entering the viewport, a solid colored block slides across an image and recedes, unveiling the photograph underneath.
- **Required CSS Properties**: `clip-path: inset(0 0 0 0)` to `clip-path: inset(0 100% 0 0)` or CSS `scaleX()`.
- **Implementation Technique**: Pure CSS / ViewTimeline or IntersectionObserver.
- **Trigger**: Scroll or page mount.
- **Code Recipe**:
```css
@keyframes curtainWipe {
  0% { transform: scaleX(0); transform-origin: left; }
  50% { transform: scaleX(1); transform-origin: left; }
  51% { transform-origin: right; }
  100% { transform: scaleX(0); transform-origin: right; }
}
.fx-curtain-block {
  position: absolute;
  inset: 0;
  background: #38bdf8;
  animation: curtainWipe 1.2s cubic-bezier(0.85, 0, 0.15, 1) forwards;
  z-index: 2;
}
```

---

## Category 6: Depth, 3D Perspectives, Reflections & Storytelling

---

### FX-6.1: Interactive 3D Perspective Card Tilt with Specular Reflection
- **Visual Description**: A 3D card that tilts towards the cursor in real-time, accompanied by a dynamic specular glint that tracks across the glossy face.
- **Required CSS Properties**: `perspective: 1000px`, `transform: rotateX(var(--rot-x)) rotateY(var(--rot-y))`, `transform-style: preserve-3d`.
- **Implementation Technique**: Lightweight pointer coordinates listener binding CSS variables.
- **Trigger**: Pointer movement.
- **Mobile Fallback**: Gyroscope orientation on mobile devices (or static subtle elevation on touch).
- **Code Recipe**:
```css
.fx-3d-tilt-stage {
  perspective: 1000px;
}
.fx-3d-tilt-card {
  transform: rotateX(var(--rot-x, 0deg)) rotateY(var(--rot-y, 0deg));
  transform-style: preserve-3d;
  transition: transform 0.15s ease-out;
  will-change: transform;
}
```

---

### FX-6.2: Ground Plane Mirror Reflection
- **Visual Description**: Displays an inverted, fading mirror reflection underneath a product image or floating 3D device mockup.
- **Required CSS Properties**: `-webkit-box-reflect: below 2px linear-gradient(transparent 60%, rgba(0, 0, 0, 0.4))`.
- **Implementation Technique**: Pure CSS (WebKit) or duplicated flipped element with mask.
- **Trigger**: Static.
- **Code Recipe**:
```css
.fx-ground-reflection {
  -webkit-box-reflect: below 4px linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.3));
}
```

---

### FX-6.3: Fanned-Out Card Deck Stack on Hover
- **Visual Description**: 3 stacked cards that rest in a neat column, but fan out laterally at rotated angles when the user hovers over the container.
- **Required CSS Properties**: `transform: rotate(-8deg) translateX(-40px)` on card 1; `rotate(8deg) translateX(40px)` on card 3.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Container hover.
- **Code Recipe**:
```css
.fx-fan-stack-container:hover .card-left {
  transform: rotate(-10deg) translate3d(-35px, -10px, 0);
}
.fx-fan-stack-container:hover .card-center {
  transform: translate3d(0, -20px, 0) scale(1.05);
}
.fx-fan-stack-container:hover .card-right {
  transform: rotate(10deg) translate3d(35px, -10px, 0);
}
```

---

### FX-6.4: Parallax Floating Multi-Layer Scene
- **Visual Description**: Foreground UI elements scroll faster than background decorative orbs and typography, establishing atmospheric depth.
- **Required CSS Properties**: GPU 3D transform layers with differentiated scroll-driven translations.
- **Implementation Technique**: CSS `transform: translate3d()` via requestAnimationFrame or modern CSS `view-timeline`.
- **Trigger**: Scroll.
- **Code Recipe**:
```css
.fx-parallax-deep {
  transform: translate3d(0, calc(var(--scroll-y, 0) * 0.15px), 0);
}
.fx-parallax-mid {
  transform: translate3d(0, calc(var(--scroll-y, 0) * 0.35px), 0);
}
.fx-parallax-fast {
  transform: translate3d(0, calc(var(--scroll-y, 0) * 0.65px), 0);
}
```

---

### FX-6.5: Pinned Sticky Zoom Storyteller
- **Visual Description**: A full-screen screenshot stays pinned (`position: sticky`) in the viewport over a 300vh scroll runway, scaling up to reveal fine architecture details before unpinning.
- **Required CSS Properties**: `position: sticky; top: 0;`, `transform: scale(var(--scroll-scale))`.
- **Implementation Technique**: Pure CSS `view()` animation timeline or scroll listener.
- **Trigger**: Scroll runway.
- **Code Recipe**:
```css
.fx-sticky-story-runway {
  height: 250vh;
  position: relative;
}
.fx-sticky-story-viewport {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
```

---

### FX-6.6: Horizontal Scroll Showcase (Story Carousel)
- **Visual Description**: As the user scrolls vertically down the page, the screen pins and translates a horizontal rail of portfolio cards from right to left.
- **Required CSS Properties**: `position: sticky`, `transform: translateX()`, `display: flex`.
- **Implementation Technique**: CSS Sticky container + JS scroll percentage mapping or ScrollTimeline.
- **Trigger**: Vertical scroll position.
- **Code Recipe**:
```css
.fx-horizontal-scroll-track {
  display: flex;
  gap: 2rem;
  width: max-content;
  transform: translate3d(calc(var(--scroll-progress, 0) * -100%), 0, 0);
  will-change: transform;
}
```

---

## Category 7: Kinetic Marquees, Textured Grids & Typography Effects

---

### FX-7.1: Seamless Masked Infinite Marquee (Zero-Jitter)
- **Visual Description**: A continuous scrolling ticker of logos or partner brand wordmarks with transparent gradient edge fades and pause-on-hover capability.
- **Required CSS Properties**: `@keyframes infiniteScroll`, `mask-image`, `display: flex`, `animation-play-state: paused`.
- **Implementation Technique**: Pure CSS with duplicate content track.
- **Trigger**: Continuous loop with hover pause.
- **Code Recipe**:
```css
@keyframes marqueeScroll {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}
.fx-marquee-container {
  display: flex;
  overflow: hidden;
  user-select: none;
  -webkit-mask-image: linear-gradient(90deg, transparent, black 15%, black 85%, transparent);
  mask-image: linear-gradient(90deg, transparent, black 15%, black 85%, transparent);
}
.fx-marquee-track {
  display: flex;
  gap: 3rem;
  width: max-content;
  animation: marqueeScroll 25s linear infinite;
}
.fx-marquee-container:hover .fx-marquee-track {
  animation-play-state: paused;
}
```

---

### FX-7.2: High-Tech Dot-Grid & Blueprint Line Canvas
- **Visual Description**: An architectural background pattern composed of subtle glowing dots spaced precisely on a 24px grid.
- **Required CSS Properties**: `radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)`, `background-size: 24px 24px`.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Static background.
- **Code Recipe**:
```css
.fx-dot-grid-bg {
  background-color: #07090e;
  background-image: radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px);
  background-size: 24px 24px;
}
.fx-line-grid-bg {
  background-color: #07090e;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

---

### FX-7.3: Analog Film Grain & Noise Texture Overlay
- **Visual Description**: An organic, subtle micro-grain texture layered over the entire dark interface, removing digital banding from gradients.
- **Required CSS Properties**: SVG base64 fractal noise data URI, `mix-blend-mode: overlay`, `opacity: 0.04`.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Static overlay with `pointer-events: none`.
- **Code Recipe**:
```css
.fx-film-grain-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 999;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
```

---

### FX-7.4: Knockout Image-in-Text Display
- **Visual Description**: A massive display headline where photographic textures or moving videos are visible *inside* the character glyphs.
- **Required CSS Properties**: `-webkit-background-clip: text`, `color: transparent`, `background-image: url(...)`.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Static or background-position animation.
- **Code Recipe**:
```css
.fx-image-in-text {
  font-size: clamp(4rem, 2.5rem + 6vw, 9rem);
  font-weight: 900;
  background-image: url('/hero-texture.webp');
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

---

### FX-7.5: Magnetic Hover Animated Underline
- **Visual Description**: An interactive link whose underline expands outward from the center point of the cursor on hover.
- **Required CSS Properties**: `::after` pseudo-element with `transform: scaleX(0)`, `transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)`.
- **Implementation Technique**: Pure CSS.
- **Trigger**: Hover.
- **Code Recipe**:
```css
.fx-animated-underline {
  position: relative;
  text-decoration: none;
  color: inherit;
}
.fx-animated-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #38bdf8;
  transform: scaleX(0);
  transform-origin: right center;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.fx-animated-underline:hover::after {
  transform: scaleX(1);
  transform-origin: left center;
}
```

---

### FX-7.6: Scramble Text & Cyberpunk Character Decode
- **Visual Description**: When text enters the viewport or is hovered, glyphs rapidly cycle through random ASCII symbols (`#`, `&`, `?`, `0`, `1`) before locking into the target phrase.
- **Required CSS Properties**: CSS monospace styling paired with a lightweight 15-line JavaScript decipher loop.
- **Implementation Technique**: JavaScript Character Shuffle Hook + CSS Monospace typography.
- **Trigger**: Hover or mount.
- **Code Recipe**:
```css
.fx-cyberpunk-decode {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  letter-spacing: 0.05em;
  color: #38bdf8;
}
```
