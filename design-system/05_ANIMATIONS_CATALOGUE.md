# 🎬 Deliverable 5: Master Animation & Motion Design Catalogue

**File:** `design-system/05_ANIMATIONS_CATALOGUE.md`  
**Classification:** Motion Systems, Keyframe Choreography & Scroll Physics  
**Related Documents:**
- [`design-system/01_CSS_PROPERTIES_REFERENCE.md`](./01_CSS_PROPERTIES_REFERENCE.md)
- [`design-system/02_VISUAL_EFFECTS_CATALOGUE.md`](./02_VISUAL_EFFECTS_CATALOGUE.md)
- [`design-system/03_UI_COMPONENTS_LIBRARY.md`](./03_UI_COMPONENTS_LIBRARY.md)
- [`design-system/04_CARDS_AND_CARD_STACKS_LIBRARY.md`](./04_CARDS_AND_CARD_STACKS_LIBRARY.md)
- [`design-system/09_IMPLEMENTATION_RECIPES.md`](./09_IMPLEMENTATION_RECIPES.md)

---

## 📑 Table of Contents
1. [The 4 Motion Disciplines & Compositor Performance Rules](#1-the-4-motion-disciplines--compositor-performance-rules)
2. [Cluster 1: Entrances, Exits & Staggered Choreography (ANIM-01 to ANIM-10)](#cluster-1-entrances-exits--staggered-choreography-anim-01-to-anim-10)
3. [Cluster 2: Kinetic Transitions, Elasticity & Scale (ANIM-11 to ANIM-20)](#cluster-2-kinetic-transitions-elasticity--scale-anim-11-to-anim-20)
4. [Cluster 3: Continuous Ambient Loops, Beams & Auroras (ANIM-21 to ANIM-28)](#cluster-3-continuous-ambient-loops-beams--auroras-anim-21-to-anim-28)
5. [Cluster 4: Micro-Interactions, Feedback & SVG Drawing (ANIM-29 to ANIM-36)](#cluster-4-micro-interactions-feedback--svg-drawing-anim-29-to-anim-36)
6. [Cluster 5: Modern Scroll-Driven & Sticky Timelines (ANIM-37 to ANIM-45)](#cluster-5-modern-scroll-driven--sticky-timelines-anim-37-to-anim-45)
7. [Universal Accessibility: The Reduced-Motion Mandate](#7-universal-accessibility-the-reduced-motion-mandate)

---

## 1. The 4 Motion Disciplines & Compositor Performance Rules

Motion in professional software engineering is not monolithic. It is categorized into four distinct mechanical architectures:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               The 4 Motion Disciplines                                 │
├───────────────────────┬──────────────────────┬───────────────────┬─────────────────────┤
│ 1. CSS Transitions   │ 2. CSS Keyframes     │ 3. ScrollTimeline │ 4. JS/rAF Physics   │
│ Discrete A-to-B state │ Scripted multi-step  │ Native GPU-linked │ Spring simulations, │
│ morphs on hover/focus │ loops or entrances   │ scroll scrubbers  │ gesture tracking    │
└───────────────────────┴──────────────────────┴───────────────────┴─────────────────────┘
```

### The 60-FPS Compositor Law:
Animations must **ONLY interpolate `transform` (`translate3d`, `scale`, `rotate`) and `opacity`**.
- **Compositor Thread (Safe)**: Handled directly on the GPU without triggering layout reflows or CPU paint operations.
- **Paint/Reflow Thread (Strictly Avoid)**: Animating `width`, `height`, `margin`, `padding`, `top`, `left`, `bottom`, `right`, or `box-shadow` forces the browser to recalculate document geometry on every frame, causing battery drain and severe frame drops.

---

## Cluster 1: Entrances, Exits & Staggered Choreography (ANIM-01 to ANIM-10)

---

### ANIM-01: Fade Up Entrance (`fade-up`)
- **Visual Behavior**: Element smoothly glides upward by 24px while fading in from 0% to 100% opacity.
- **Trigger Type**: Mount / Scroll Entry / Tab Switch.
- **Start & End States**:
  - *Start*: `opacity: 0; transform: translate3d(0, 24px, 0);`
  - *End*: `opacity: 1; transform: translate3d(0, 0, 0);`
- **CSS Properties**: `opacity`, `transform: translate3d()`.
- **Duration & Easing**: `400ms cubic-bezier(0.16, 1, 0.3, 1)` (Out-Expo).
- **CSS-Only vs JS**: Pure CSS `@keyframes` or native CSS class.
- **Implementation**:
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translate3d(0, 24px, 0); }
  to   { opacity: 1; transform: translate3d(0, 0, 0); }
}
.anim-fade-up {
  animation: fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

---

### ANIM-02: Fade Down Entrance (`fade-down`)
- **Visual Behavior**: Glides downward from -20px with opacity fade, standard for top-floating navbars or alert banners.
- **Duration & Easing**: `350ms cubic-bezier(0.16, 1, 0.3, 1)`.

---

### ANIM-03: Slide Left / Right Drawer Transition (`slide-in-right`)
- **Visual Behavior**: A side drawer enters from 100% off-screen right into view, accompanied by an easing deceleration.
- **Start & End States**: `transform: translate3d(100%, 0, 0)` ➔ `transform: translate3d(0, 0, 0)`.
- **Duration & Easing**: `300ms cubic-bezier(0.32, 0.72, 0, 1)`.

---

### ANIM-04: Scale-In Center Pop (`scale-in`)
- **Visual Behavior**: Modal or popover emerges from center point, scaling from 0.95 to 1.0 with rapid opacity rise.
- **Duration & Easing**: `250ms cubic-bezier(0.16, 1, 0.3, 1)`.
- **Code Recipe**:
```css
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}
.anim-scale-in {
  animation: scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

---

### ANIM-05: Modal Exit Dismiss (`scale-out`)
- **Visual Behavior**: Modal recedes from 1.0 to 0.96 scale while fading out over 150ms. Fast exit ensures interface feels responsive.

---

### ANIM-06: Staggered Children Cascade (`stagger-fade`)
- **Visual Behavior**: A list of 6 cards or grid items reveals sequentially with a 60ms delay between each sibling.
- **Implementation**: Pure CSS using `animation-delay`:
```css
.stagger-container > *:nth-child(1) { animation-delay: 0ms; }
.stagger-container > *:nth-child(2) { animation-delay: 60ms; }
.stagger-container > *:nth-child(3) { animation-delay: 120ms; }
.stagger-container > *:nth-child(4) { animation-delay: 180ms; }
.stagger-container > *:nth-child(5) { animation-delay: 240ms; }
.stagger-container > *:nth-child(6) { animation-delay: 300ms; }
```

---

### ANIM-07: Curtain Wipe Image Reveal (`curtain-wipe`)
- **Visual Behavior**: Solid colored accent mask slides across image and recedes, unveiling the photograph underneath.
- **Duration**: `900ms cubic-bezier(0.77, 0, 0.175, 1)`.

---

### ANIM-08: Split-Text Character Stagger Reveal
- **Visual Behavior**: Display headline characters rise up individually from behind an `overflow: hidden` baseline.
- **Technique**: JavaScript span wrapping paired with CSS `translateY(100%)` ➔ `translateY(0)`.

---

### ANIM-09: Typewriter Text Effect (CSS Only)
- **Visual Behavior**: Monospace characters appear one-by-one accompanied by a blinking caret block.
- **Code Recipe**:
```css
@keyframes typing { from { width: 0; } to { width: 100%; } }
@keyframes blinkCaret { 50% { border-color: transparent; } }
.anim-typewriter {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid #38bdf8;
  font-family: monospace;
  animation: 
    typing 3.5s steps(30, end) forwards,
    blinkCaret 0.75s step-end infinite;
}
```

---

### ANIM-10: Rotating Words Text Swap
- **Visual Behavior**: A dynamic keyword in a headline glides upward, blurring out, as the next keyword glides in from below.

---

## Cluster 2: Kinetic Transitions, Elasticity & Scale (ANIM-11 to ANIM-20)

---

### ANIM-11: Elastic Spring Pop (`bounce-in`)
- **Visual Behavior**: Element overshoots target scale to 1.08 before settling gracefully back to 1.0 with spring physics.
- **Easing**: `cubic-bezier(0.34, 1.56, 0.64, 1)` (Spring Cubic Bezier).

---

### ANIM-12: Rubber-Band Stretch on Click
- **Visual Behavior**: Tactile micro-interaction where a badge stretches horizontally (`scaleX(1.15) scaleY(0.85)`) on click before snapping back.

---

### ANIM-13: 3D Flip Card Transition (`flip-x` / `flip-y`)
- **Visual Behavior**: Two-sided element rotates 180 degrees around its X or Y axis in 3D volume with `backface-visibility: hidden`.
- **Duration**: `600ms cubic-bezier(0.4, 0, 0.2, 1)`.

---

### ANIM-14: Shake / Wiggle Error Rejection (`error-shake`)
- **Visual Behavior**: When an invalid form is submitted or an error toast appears, the input shakes horizontally by ±8px 4 times over 350ms.
- **Code Recipe**:
```css
@keyframes errorShake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-8px); }
  40%, 80% { transform: translateX(8px); }
}
.anim-error-shake {
  animation: errorShake 0.35s ease-in-out;
}
```

---

### ANIM-15: Button Press Inset Micro-Interaction (`press-down`)
- **Visual Behavior**: Active state of interactive buttons scales to 0.97 and translates 1px downward, conveying physical tactile resistance.

---

### ANIM-16: Blur-to-Sharp Focus In (`blur-in`)
- **Visual Behavior**: Element transitions from `filter: blur(12px); opacity: 0;` to `filter: blur(0px); opacity: 1;` over 350ms.

---

### ANIM-17: Grayscale-to-Color Saturation Sweep
- **Visual Behavior**: Monochrome photography smoothly saturates to full color on mouseenter.

---

### ANIM-18: Smooth Accordion Open (`grid-rows-expand`)
- **Visual Behavior**: Pure CSS zero-height to auto-height accordion transition without JavaScript height measuring:
```css
.accordion-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.accordion-wrapper.is-open {
  grid-template-rows: 1fr;
}
.accordion-content {
  overflow: hidden;
}
```

---

### ANIM-19: Animated Tab Indicator Glider
- **Visual Behavior**: Active tab underline or pill slides horizontally under the currently selected tab using CSS transitions on `left` and `width` or FLIP coordinates.

---

### ANIM-20: Clip-Path Geometric Diamond Reveal
- **Visual Behavior**: Image reveals outward from a center point in an expanding geometric polygon mask.

---

## Cluster 3: Continuous Ambient Loops, Beams & Auroras (ANIM-21 to ANIM-28)

---

### ANIM-21: Continuous Floating Orbit (`float-ambient`)
- **Visual Behavior**: Decorative badge or 3D asset hovers weightlessly up and down by 8px on a smooth 4-second sine curve.
- **Code Recipe**:
```css
@keyframes floatAmbient {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.anim-float {
  animation: floatAmbient 4s ease-in-out infinite;
}
```

---

### ANIM-22: Aurora Radial Orb Drifter
- **Visual Behavior**: Large blurred colored orbs drift along fluid circular trajectories behind dark cards.

---

### ANIM-23: Continuous Gradient Border Beam (`border-beam`)
- **Visual Behavior**: Luminous concentrated ray of cyan light orbits the perimeter of a card continuously.

---

### ANIM-24: Pulse & Ping Status Beacon (`pulse-ping`)
- **Visual Behavior**: High-priority status ring continuously expands and dissipates outward from an alert indicator.

---

### ANIM-25: Shimmer Skeleton Sweep (`shimmer-wave`)
- **Visual Behavior**: A 45-degree translucent light band travels from left to right across skeleton placeholders every 1.8 seconds.

---

### ANIM-26: Infinite Logo Marquee Rail (`marquee-loop`)
- **Visual Behavior**: Horizontal ticker that glides infinitely to the left and pauses smoothly when the user points their mouse at any item.

---

### ANIM-27: Neon Border Glow Pulse (`glow-pulse`)
- **Visual Behavior**: Box-shadow neon halo cycles in brightness between 30% intensity and 80% intensity every 2.5 seconds.

---

### ANIM-28: Subtle Liquid Blob Morph (`blob-morph`)
- **Visual Behavior**: Organic 2D container whose corner radiuses continuously deform between organic oval states.

---

## Cluster 4: Micro-Interactions, Feedback & SVG Drawing (ANIM-29 to ANIM-36)

---

### ANIM-29: Animated SVG Checkmark Draw (`check-draw`)
- **Visual Behavior**: When an operation succeeds, a circular stroke draws itself, followed immediately by the checkmark polyline stroke drawing from left to right.
- **Code Recipe**:
```css
@keyframes drawStroke {
  to { stroke-dashoffset: 0; }
}
.anim-check-circle {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: drawStroke 0.4s ease-out forwards;
}
.anim-check-tick {
  stroke-dasharray: 40;
  stroke-dashoffset: 40;
  animation: drawStroke 0.3s ease-out 0.25s forwards;
}
```

---

### ANIM-30: Circular SVG Progress Ring (`progress-ring`)
- **Visual Behavior**: Smooth mathematical reduction of `stroke-dashoffset` as data or files upload.

---

### ANIM-31: Card Shuffle Deck Cycle (`card-shuffle`)
- **Visual Behavior**: Top card flies out right, drops to back of z-index stack, and slides smoothly into bottom position.

---

### ANIM-32: Fan-Out Deck Spread on Hover
- **Visual Behavior**: 3 stacked cards spread laterally in an angular fan on hover.

---

### ANIM-33: Tinder-Style Elastic Swipe Transition
- **Visual Behavior**: Card follows touch gesture with rotation physics; releases off-screen with high-velocity exit.

---

### ANIM-34: Button Click Ripple Wave (CSS-Only)
- **Visual Behavior**: Expanding translucent circular wave emanates from button center on active press.

---

### ANIM-35: Number Count-Up Interpolation (`count-up`)
- **Visual Behavior**: KPI metrics animate smoothly from 0 to final value (e.g. `$48,290`) upon entering viewport.

---

### ANIM-36: Confetti Shard Burst Emitter
- **Visual Behavior**: Particle explosion radiating outward from a button with gravity acceleration and random rotational spins.

---

## Cluster 5: Modern Scroll-Driven & Sticky Timelines (ANIM-37 to ANIM-45)

---

### ANIM-37: Pure CSS Reading Progress Bar (`scroll-progress`)
- **Visual Behavior**: 3px cyan bar fixed to viewport top scales horizontally from 0% to 100% as the document scrolls.
- **Code Recipe**:
```css
@keyframes fillProgress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
.anim-reading-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: #38bdf8;
  transform-origin: left;
  animation: fillProgress linear;
  animation-timeline: scroll(root block);
  z-index: 100;
}
```

---

### ANIM-38: Viewport Entry Card Reveal (`view-timeline-fade`)
- **Visual Behavior**: As cards scroll into view, they fade in and slide up without JavaScript `IntersectionObserver`.
- **CSS Code**:
```css
@supports (animation-timeline: view()) {
  @keyframes viewEntry {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .anim-view-entry {
    animation: viewEntry linear both;
    animation-timeline: view();
    animation-range: entry 10% cover 30%;
  }
}
```

---

### ANIM-39: Sticky Image Storytelling Zoom
- **Visual Behavior**: Pinned full-bleed screenshot smoothly scales up from 1.0 to 1.3 across a 200vh scroll runway.

---

### ANIM-40: Horizontal Scroll Gallery Rail
- **Visual Behavior**: Vertical page scrolling pins the viewport and slides a horizontal carousel from right to left.

---

### ANIM-41: Parallax Deep Background Shift
- **Visual Behavior**: Background constellations or grid lines translate at 20% of standard scroll speed.

---

### ANIM-42: Scroll-Triggered Counter Increment
- **Visual Behavior**: Fires number ticker when the statistics section crosses 50% viewport threshold.

---

### ANIM-43: Floating Glass Header Hide-on-Scroll-Down, Show-on-Scroll-Up
- **Visual Behavior**: Header translates up by `-100%` when scrolling down, and glides back into view when scrolling up even 5 pixels.

---

### ANIM-44: 3D Perspective Tilt on Scroll Scrub
- **Visual Behavior**: As an interface mockup scrolls into the center of the viewport, its isometric 3D tilt flattens to 0 degrees.

---

### ANIM-45: Curtain Wipe On Scroll Entry
- **Visual Behavior**: Geometric block wipes across section as the section intersects the lower third of the screen.

---

### ANIM-46: Apple macOS 3D Genie Origin-Morph Effect (`genie-morph`)
- **Visual Behavior**: The modal, dropdown, or confirmation window unrolls and expands outward directly from the bounding rect of the trigger button in 3D perspective (`rotateX(12deg) scale(Sx, Sy) -> scale(1) rotateX(0deg)`). When closed, it reverses—twisting and funnels down into the origin button while the button elevates with an absorb bounce.
- **Trigger Type**: Click on Trigger Button (Open) / Click on Close Button, Backdrop, or Cancel (Close).
- **Start & End States**:
  - *Eject*: `translate3d(ΔX, ΔY, 0) scale3d(Sx, Sy, 1) perspective(1000px) rotateX(12deg)` ➔ `translate3d(0, 0, 0) scale3d(1, 1, 1) perspective(1000px) rotateX(0deg)`.
  - *Suck/Absorb*: `translate3d(0, 0, 0) scale3d(1, 1, 1)` ➔ `translate3d(ΔX, ΔY, 0) scale3d(Sx, Sy, 1) rotateX(14deg) opacity(0)`.
- **Duration & Easing**: 
  - *Open*: `340ms cubic-bezier(0.16, 1, 0.3, 1)` (Out-Expo Deceleration).
  - *Close*: `280ms cubic-bezier(0.7, 0, 0.84, 0)` (Accelerating Gravitational Funnel).
- **Compositor Safety**: 100% GPU offloaded using `transform` (`translate3d`, `scale3d`, `rotateX`) and `opacity`. Zero paint reflow overhead.
- **Cross-Reference**: Master specification in [`design-system/APPLE_GENIE_ORIGIN_MORPH_SYSTEM.md`](./APPLE_GENIE_ORIGIN_MORPH_SYSTEM.md).

---

### ANIM-47: Three.js 3D Model Exploded-View Disassembly & Scroll-Dolly (`3d-scroll-explode`)
- **Visual Behavior**: As the user scrolls through product architecture sections, individual parts (chassis, circuit boards, batteries, lenses) systematically translate outward along their normal vectors in an exploded disassembly, while the camera smoothly orbits and dollies along a 3D Catmull-Rom spline curve.
- **Trigger Type**: Scroll-Driven via GSAP ScrollTrigger linked to WebGL render loop.
- **Start & End States**:
  - *Resting Assemblage*: All child meshes at local position $(0, 0, 0)$ relative to their parent node; camera at $(0, 0, 4.5)$.
  - *Exploded Disassembly*: Each sub-mesh translates outward along its radial unit vector $\mathbf{P}(t) = \mathbf{P}_{\text{orig}} + \mathbf{N}_{\text{part}} \cdot d(t)$; camera dollies to $(1.5, 0.8, 2.2)$ with FOV narrowing from $45^\circ$ to $32^\circ$.
- **Duration & Easing**: Bound to scroll progress via `scrub: 1.2` with cubic-bezier smoothing. Zero frame drops via 60fps render loop.
- **Compositor Safety**: GPU-accelerated WebGL vertex shader matrix computation; zero DOM reflows.
- **Cross-Reference**: Master architecture in [`design-system/THREEJS_3D_MODEL_ARCHITECTURE_AND_INSPECTION_SYSTEM.md`](./THREEJS_3D_MODEL_ARCHITECTURE_AND_INSPECTION_SYSTEM.md).

---

### ANIM-48: WhatsApp 3-Dot Staggered Typing Wave Bounce (`typing-dot-wave`)
- **Visual Behavior**: Three circular dots bounce rhythmically up and down with staggered intervals, creating an infinite fluid wave conveying real-time opponent keystrokes until input ceases.
- **Trigger Type**: Presence event `presence:activity` with action `'TYPING'`.
- **Start & End States**:
  - `0%, 60%, 100%`: `translateY(0)` with `opacity: 0.4`.
  - `30%`: `translateY(-5px)` with `opacity: 1.0` in WhatsApp emerald/cyan (`#00a884`).
- **Duration & Delays**: `1.2s infinite ease-in-out`; Dot 1: `0ms`, Dot 2: `150ms`, Dot 3: `300ms`.
- **Compositor Safety**: 100% GPU offloaded using `transform: translateY()` and `opacity`.
- **Cross-Reference**: Master specification in [`modules/CHAT_AND_COMMUNICATION_SYSTEM.md`](../modules/CHAT_AND_COMMUNICATION_SYSTEM.md#42-whatsapp-grade-real-time-typing--audio-recording-presence-engine).

---

### ANIM-49: WhatsApp Crimson Voice Recording Radial Soundwave Pulse (`voice-recording-pulse`)
- **Visual Behavior**: A tactile crimson-red microphone icon bounces in subtle scale accompanied by an expanding radial soundwave ring that emanates outward and dissipates, indicating active microphone audio capture.
- **Trigger Type**: Presence event `presence:activity` with action `'RECORDING_AUDIO'`.
- **Start & End States**:
  - `0%`: `scale(1)` with `box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6)`.
  - `50%`: `scale(1.18)` with `box-shadow: 0 0 0 8px rgba(239, 68, 68, 0)`.
  - `100%`: `scale(1)` with `box-shadow: 0 0 0 0 rgba(239, 68, 68, 0)`.
- **Duration & Easing**: `1.2s infinite ease-in-out` in studio crimson (`#ef4444`).
- **Compositor Safety**: Hardware-accelerated CSS keyframe transforms and box-shadow dissipation.
- **Cross-Reference**: Master specification in [`modules/CHAT_AND_COMMUNICATION_SYSTEM.md`](../modules/CHAT_AND_COMMUNICATION_SYSTEM.md#42-whatsapp-grade-real-time-typing--audio-recording-presence-engine).

---

### ANIM-50: Profile Avatar Fast-Shift 360° Tactile Spin & Scale Bounce (`avatar-fast-shift`)
- **Visual Behavior**: When the user double-taps the profile avatar button, the avatar scales down slightly to `0.9` before spinning 360° with a springy overshoot bounce to `1.08` and settling at `1.0`. Provides immediate physical confirmation that identity has rotated to the next enrolled account.
- **Trigger Type**: Double-tap gesture (`< 300ms`) via `useDoubleTapAccountShift()`.
- **Start & End States**:
  - `0%`: `transform: rotate(0deg) scale(1)`.
  - `30%`: `transform: rotate(120deg) scale(0.9)`.
  - `75%`: `transform: rotate(360deg) scale(1.08)`.
  - `100%`: `transform: rotate(360deg) scale(1)`.
- **Duration & Easing**: `360ms cubic-bezier(0.34, 1.56, 0.64, 1)` (Back-Out Spring).
- **Compositor Safety**: 100% GPU offloaded using `transform: rotate() scale()`.
- **Cross-Reference**: Master specification in [`modules/AUTH_AND_FACELOCK.md`](../modules/AUTH_AND_FACELOCK.md#44-multi-account-fast-switcher--profile-button-double-tap-mechanics).

---

### ANIM-51: Nested Reply Accordion Expand & Connecting Thread Line Reveal (`reply-accordion-reveal`)
- **Visual Behavior**: Tapping "Show Replies" triggers a smooth height expansion (`height: 0 -> auto`, `opacity: 0 -> 1`) accompanied by the sequential vertical stroke reveal of the slate thread guide line (`scaleY: 0 -> 1` origin top), visually anchoring the parent node to its newly loaded children.
- **Trigger Type**: Click / Tap on "Show N replies" accordion button.
- **Start & End States**:
  - Container: `opacity: 0, height: 0, translateY: -6px` ➔ `opacity: 1, height: auto, translateY: 0`.
  - Thread Line: `transform: scaleY(0)` with `transform-origin: top` ➔ `transform: scaleY(1)`.
- **Duration & Easing**: `280ms cubic-bezier(0.16, 1, 0.3, 1)` (Out-Quart).
- **Compositor Safety**: Hardware-accelerated GPU opacity and transform; height driven by Framer Motion layout / dynamic CSS grid.
- **Cross-Reference**: Master specification in [`modules/INFINITE_COMMENTS_AND_REPLIES_SYSTEM.md`](../modules/INFINITE_COMMENTS_AND_REPLIES_SYSTEM.md#4-recursive-ui-component-architecture--connective-thread-guides).

---

### ANIM-52: AI Chat History Drawer Slide & Item Cascade Reveal (`ai-history-drawer-cascade`)
- **Visual Behavior**: The history sidebar glides smoothly in from the left (`x: -100% -> 0%`), while individual conversation session items execute a staggered slide-and-fade reveal (`staggerChildren: 0.04s`, `translateY: 8px -> 0`, `opacity: 0 -> 1`), giving the user an instant, tactile overview of past work.
- **Trigger Type**: Click on `[ 🕒 History ]` toggle in AI Copilot header.
- **Start & End States**:
  - Drawer Shell: `transform: translateX(-100%)` ➔ `transform: translateX(0)`.
  - Staggered Items: `opacity: 0, transform: translateY(8px)` ➔ `opacity: 1, transform: translateY(0)`.
- **Duration & Easing**: `320ms cubic-bezier(0.16, 1, 0.3, 1)` (Out-Quart Deceleration).
- **Compositor Safety**: 100% GPU offloaded using `transform` and `opacity`.
- **Cross-Reference**: Master specification in [`modules/AI_ASSISTANT_AND_COPILOT_SYSTEM.md`](../modules/AI_ASSISTANT_AND_COPILOT_SYSTEM.md#75-chat-history-architecture--client-single-fetch-caching).

---

### ANIM-53: AI Context Compaction Squeeze & Summary Unfold (`ai-summary-unfold`)
- **Visual Behavior**: When older turns exceed the threshold, they smoothly collapse into an elegant frosted divider bar (`scaleY: 1 -> 0.95`, `opacity: 0.8`). Tapping the divider unrolls a frosted accordion card (`height: 0 -> auto`, `opacity: 0 -> 1`) displaying the exact structured summary the model is retaining.
- **Trigger Type**: Threshold detection (turn 12 / 4,000 tokens) & Click on `<AiCompactedSummaryDivider />`.
- **Start & End States**:
  - Divider Reveal: `opacity: 0, scale: 0.96` ➔ `opacity: 1, scale: 1`.
  - Accordion Card Unfold: `height: 0, opacity: 0` ➔ `height: auto, opacity: 1`.
- **Duration & Easing**: `260ms cubic-bezier(0.2, 0.8, 0.2, 1)` (Smooth Expansion).
- **Compositor Safety**: GPU opacity combined with Framer Motion layout hardware acceleration.
- **Cross-Reference**: Master specification in [`modules/AI_ASSISTANT_AND_COPILOT_SYSTEM.md`](../modules/AI_ASSISTANT_AND_COPILOT_SYSTEM.md#3-client-compaction-divider-aicompactedsummarydivider-).

---

## 7. Universal Accessibility: The Reduced-Motion Mandate

Every web application built must strictly respect the user's operating system accessibility preferences. Users suffering from vestibular disorders, motion sensitivity, or epilepsy require animations to be neutralized.

```css
/* Universal Motion Safety Fallback */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Preserve necessary state opacity changes without spatial motion */
  .anim-fade-up,
  .anim-scale-in,
  .anim-view-entry {
    transform: none !important;
    opacity: 1 !important;
  }
}
```
