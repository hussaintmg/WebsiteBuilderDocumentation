# 🃏 Deliverable 4: Master Stacked & Layered Cards Reference Collection

**File:** `design-system/04_CARDS_AND_CARD_STACKS_LIBRARY.md`  
**Classification:** Core Spatial UI & Card Stacking Engineering Specifications  
**Related Documents:**
- [`design-system/01_CSS_PROPERTIES_REFERENCE.md`](./01_CSS_PROPERTIES_REFERENCE.md)
- [`design-system/02_VISUAL_EFFECTS_CATALOGUE.md`](./02_VISUAL_EFFECTS_CATALOGUE.md)
- [`design-system/03_UI_COMPONENTS_LIBRARY.md`](./03_UI_COMPONENTS_LIBRARY.md)
- [`design-system/05_ANIMATIONS_CATALOGUE.md`](./05_ANIMATIONS_CATALOGUE.md)
- [`design-system/09_IMPLEMENTATION_RECIPES.md`](./09_IMPLEMENTATION_RECIPES.md)

---

## 📑 Table of Contents
1. [Mathematical Foundations of Card Stacking, Z-Index & 3D Perspective](#1-mathematical-foundations-of-card-stacking-z-index--3d-perspective)
2. [Cluster 1: Foundational, Bento & Specialized Content Cards (1–10)](#cluster-1-foundational-bento--specialized-content-cards-110)
3. [Cluster 2: Visual Effect, 3D Tilt & Interactive Reveal Cards (11–20)](#cluster-2-visual-effect-3d-tilt--interactive-reveal-cards-1120)
4. [Cluster 3: Fixed Stacked Decks, Fan-Outs & Cascading Spreads (21–30)](#cluster-3-fixed-stacked-decks-fan-outs--cascading-spreads-2130)
5. [Cluster 4: Gesture-Driven, Swipeable & Physics Decks (CSS vs JS) (31–42)](#cluster-4-gesture-driven-swipeable--physics-decks-css-vs-js-3142)
6. [Architectural Matrix: CSS-Only vs JavaScript Interactive Cards](#6-architectural-matrix-css-only-vs-javascript-interactive-cards)

---

## 1. Mathematical Foundations of Card Stacking, Z-Index & 3D Perspective

Cards are the fundamental atomic currency of modern modular interfaces. When cards interact in physical space (stacking, fanning, swiping, 3D rotating), four geometric invariants govern their rendering:

```
                                  [ Camera Eye ]
                                        │
                                        ▼  perspective: 1000px
               Card 3 (z-index: 30) ────┐
               Card 2 (z-index: 20) ────┼──► translateZ(0px) scale(1.0)
               Card 1 (z-index: 10) ────┴──► translateZ(-40px) scale(0.92) translateY(24px)
```

1. **Stacking Context Creation**:
   - Stacking contexts are spawned by: `position: relative|absolute` with integer `z-index`, `transform` other than `none`, `opacity < 1`, or `filter`.
   - In stacked decks, the **active/top card must strictly hold the highest `z-index`**.
2. **Perspective Volume (`perspective: 1000px` vs `perspective: 600px`)**:
   - `600px`: High dramatic distortion, ideal for gaming/crypto/hero showcases.
   - `1000px`–`1200px`: Natural cinematic perspective, ideal for SaaS and e-commerce.
3. **The Layer Compression Formula**:
   - For card index $i$ ($0$ being top card, $1$ being middle, $2$ being bottom):
     - $\text{Scale}_i = 1 - (i \times 0.05)$
     - $\text{TranslateY}_i = i \times 12\text{px}$
     - $\text{Brightness}_i = 100\% - (i \times 15\%)$
     - $\text{Z-Index}_i = 30 - (i \times 10)$

---

## Cluster 1: Foundational, Bento & Specialized Content Cards (1–10)

---

### CARD-01: Modern Basic Surface Card
- **Visual Description**: Clean dark obsidian container with 1px border and soft ambient shadow.
- **Positioning & Layout**: `relative`, `overflow: hidden`, `padding: 1.5rem`, `border-radius: 1rem`.
- **CSS Properties**: `background: #0f141f; border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);`
- **Hover State**: `translateY(-2px)`, border becomes `rgba(255, 255, 255, 0.16)`.
- **Mobile Ergonomics**: Full-width on mobile (`w-full`), adapts padding to `1rem`.

---

### CARD-02: High-Conversion Feature Card
- **Visual Description**: Features glowing SVG icon badge, prominent headline, value explanation, and subtle arrow link.
- **Positioning & Layout**: `display: flex; flex-direction: column; gap: 1rem;`
- **Hover State**: Icon background transitions from `rgba(56, 189, 248, 0.1)` to solid `rgb(56, 189, 248)`.

---

### CARD-03: E-Commerce Product Card with Dynamic Variant Swatches
- **Visual Description**: Product photograph in 4:3 aspect ratio, discount badge pill, title, price, star ratings, and interactive color dots that update the image preview.
- **CSS Properties**: `aspect-ratio: 4 / 3`, `object-fit: cover`.

---

### CARD-04: Author & Executive Profile Card
- **Visual Description**: Circular avatar with gradient border, status badge ("Active Now"), social handle chips, and biography text.
- **Z-Index Layering**: Avatar sits at `z-index: 2` overlapping the top edge of the card body.

---

### CARD-05: Verified Customer Testimonial Card
- **Visual Description**: 5-star rating icon row, quote text in serif/sans pairing, customer company logo, and verified buyer green checkmark badge.

---

### CARD-06: Tiered Pricing Card (Highlighted / Featured Variant)
- **Visual Description**: High-impact plan card featuring a glowing cyan border beam, "Most Popular" ribbon pill, annual billing discount toggle, and primary CTA button.
- **CSS Properties**: `border: 2px solid #38bdf8; box-shadow: 0 0 35px rgba(56, 189, 248, 0.2);`

---

### CARD-07: Bento Grid 2x2 Hero Feature Card
- **Visual Description**: Spans 2 columns and 2 rows in a Bento layout; contains an interactive UI widget preview or mini-chart.
- **CSS Grid Positioning**: `grid-column: span 2; grid-row: span 2;` (collapses to `span 1` on mobile).

---

### CARD-08: Bento Grid Wide Banner Card (Span 3 Columns)
- **Visual Description**: Horizontal layout featuring a headline on the left and a live application screenshot protruding out the right edge.
- **Overflow Handling**: `overflow: hidden` clips the protruding screenshot cleanly.

---

### CARD-09: Bento Tall Vertical Pillar Card (Span 2 Rows)
- **Visual Description**: Tall vertical card accommodating a mobile screen mockup or vertical timeline sequence.

---

### CARD-10: Bento Asymmetric Micro-Card
- **Visual Description**: Compact 1x1 metric card displaying a single statistic, circular progress ring, or toggle switch.

---

## Cluster 2: Visual Effect, 3D Tilt & Interactive Reveal Cards (11–20)

---

### CARD-11: Frosted Liquid Glass Card
- **Visual Description**: Translucent surface with `backdrop-filter: blur(16px)`, specular top edge, and dark tint.
- **CSS Properties**: `background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.08);`

---

### CARD-12: Ambient Gradient Card
- **Visual Description**: Internal mesh gradient with glowing radial accents that highlight key bullet points.

---

### CARD-13: Full-Bleed Image Overlay Card
- **Visual Description**: High-resolution photography fills the entire card, with a bottom-to-top gradient darkening mask (`linear-gradient(to top, #07090e 30%, transparent 100%)`) ensuring text legibility.

---

### CARD-14: Image Zoom on Card Hover
- **Visual Description**: Image container has `overflow: hidden`; hovering scales the inner `img` by `scale(1.08)` over 0.5s ease without shifting the card boundaries.

---

### CARD-15: Expandable Accordion Card
- **Visual Description**: Collapsed state shows summary row; clicking expands content using CSS `grid-template-rows: 0fr` ➔ `grid-template-rows: 1fr` for smooth zero-JS transitions.

---

### CARD-16: 3D Flip Card (Two-Sided)
- **Visual Description**: Hovering or clicking flips the card 180 degrees around its Y-axis, revealing technical specifications or details on the back.
- **CSS Properties**: `transform-style: preserve-3d`, `backface-visibility: hidden`, `transform: rotateY(180deg)`.

---

### CARD-17: Specular 3D Tilt Card (Mouse-Tracking)
- **Visual Description**: Card tilts in 3D coordinate space towards the cursor with dynamic glint.
- **CSS & Math**: `rotateX(calc((centerY - clientY) / 15)) rotateY(calc((clientX - centerX) / 15))`.

---

### CARD-18: Radial Spotlight Card
- **Visual Description**: Dark card whose surface is illuminated by a circular spotlight following the pointer.

---

### CARD-19: Hover-Reveal Hidden Action Card
- **Visual Description**: Quick-action buttons (Share, Bookmark, Delete) remain hidden off-card or at `opacity: 0`, sliding smoothly into view only on mouse hover.

---

### CARD-20: Before-and-After Interactive Card
- **Visual Description**: Embedded slider card where user drags vertical handle across photograph to inspect retouching.

---

## Cluster 3: Fixed Stacked Decks, Fan-Outs & Cascading Spreads (21–30)

---

### CARD-21: Fixed Vertical Offset Stacked Cards
- **Visual Description**: 3 cards stacked directly on top of each other, where Card 2 peeks out 12px below Card 1, and Card 3 peeks out 24px below.
- **Stacking Mechanics**:
```css
.card-stack-offset {
  position: relative;
  height: 380px;
}
.card-stack-offset .c-top    { position: absolute; top: 0; z-index: 30; transform: scale(1); }
.card-stack-offset .c-middle { position: absolute; top: 12px; z-index: 20; transform: scale(0.96); opacity: 0.9; }
.card-stack-offset .c-bottom { position: absolute; top: 24px; z-index: 10; transform: scale(0.92); opacity: 0.8; }
```

---

### CARD-22: Rotated Card Stack (Playful Deck)
- **Visual Description**: 3 cards resting at jaunty rotation angles (`rotate(-4deg)`, `rotate(0deg)`, `rotate(5deg)`), resembling a hand of cards laid casually on a desk.
- **Hover State**: On hover, rotations straighten to `rotate(0deg)` while separating vertically.

---

### CARD-23: Fan-Out Card Deck Stack on Hover
- **Visual Description**: Cards rest in a compact column; hovering spreads Card 1 left (`-40px`, `-8deg`), Card 2 up (`-20px`, `scale(1.05)`), and Card 3 right (`40px`, `8deg`).
- **CSS Recipe**:
```css
.fan-deck:hover .card-left   { transform: translate3d(-50px, -10px, 0) rotate(-10deg); }
.fan-deck:hover .card-center { transform: translate3d(0, -30px, 0) scale(1.04); }
.fan-deck:hover .card-right  { transform: translate3d(50px, -10px, 0) rotate(10deg); }
```

---

### CARD-24: Expandable Stacked Card Deck (Accordion Spread)
- **Visual Description**: Stack of 4 summary notification cards. Clicking the stack expands them vertically into a full readable feed.

---

### CARD-25: 3D Perspective Card Deck with Depth Blur
- **Visual Description**: Cards recede along the Z-axis (`translateZ(-60px)`, `translateZ(-120px)`) into a 3D perspective camera volume with progressive depth-of-field blur (`filter: blur(2px)`).

---

### CARD-26: Card Carousel with 3D Depth
- **Visual Description**: Center card is full size and sharp; left and right cards are rotated inward at 30-degree angles with reduced opacity.

---

### CARD-27: Card Shuffle Animation Deck
- **Visual Description**: Clicking "Next" animates the top card sliding out laterally to the right, dropping to `z-index: 0`, and sliding back behind the deck smoothly.

---

### CARD-28: Spread-and-Collapse Card Stack
- **Visual Description**: Tapping a button triggers a full horizontal grid spread of all deck cards; tapping again collapses them back into a single deck.

---

### CARD-29: Cascading Staggered Waterfall Cards
- **Visual Description**: Overlapping cards arranged down a zigzag vertical staircase path.

---

### CARD-30: Stacked Notification Cards (Toast Pile)
- **Visual Description**: Multiple incoming notification alerts collapse into a single compact stacked badge ("3 New Notifications"); clicking expands the individual alerts.

---

## Cluster 4: Gesture-Driven, Swipeable & Physics Decks (CSS vs JS) (31–42)

---

### CARD-31: Tinder-Style Swipeable Card Stack (Touch & Pointer Physics)
- **Visual Description**: The user swipes the top card left (Dismiss/Dislike) or right (Accept/Like). The card rotates proportionally to drag distance ($\text{rotate} = \Delta x \times 0.08^\circ$). If released past a 120px threshold, it flies off screen; otherwise, it springs back elastically.
- **Implementation**: Pointer tracking (PointerEvent / Framer Motion / Vanilla JS rAF).
- **Mobile Considerations**: Essential touch-action: `touch-action: pan-y` to allow vertical page scroll while capturing horizontal card swipes.

---

### CARD-32: Drag-and-Drop Reorderable Card Deck
- **Visual Description**: Cards that can be dragged vertically to reorder lists or dashboard priorities with fluid drop-indicator placeholders.

---

### CARD-33: Overlapping Profile Cards Cascade
- **Visual Description**: Three overlapping circular or rounded avatar cards where each card overlaps the previous by 25% with 2px dark separation rings.

---

### CARD-34: Layered Testimonial Deck with Active Tab Indicators
- **Visual Description**: Customer quotes stacked in physical depth; clicking bullet dots cycles the front card smoothly.

---

### CARD-35: Draggable 3D Free-Floating Cards
- **Visual Description**: Canvas with freely draggable cards that bounce off container walls with friction physics.

---

### CARD-36: Horizontal Snap-Scrolling Card Rail
- **Visual Description**: Horizontal row of cards using pure CSS `scroll-snap-type: x mandatory` and `scroll-snap-align: start` with zero JavaScript.

---

### CARD-37: Image Collage Overlapping Card Cluster
- **Visual Description**: Multi-photo asymmetric editorial collage where images overlap with polaroid white borders and drop shadows.

---

### CARD-38: Portfolio Showcase Card Deck with Keyframe Hover
- **Visual Description**: Deck of project thumbnails that spread out in a 3D isometric fan on mouseenter.

---

### CARD-39: Floating Glass Morphing Card
- **Visual Description**: Liquid glass card that changes border-radius corners organically using CSS `@keyframes`.

---

### CARD-40: Interactive Before-and-After Card with Split Handle
- **Visual Description**: Compares two responsive images with draggable center bar.

---

### CARD-41: Card with Sticky Status Header & Scrollable Body
- **Visual Description**: Card body scrolls internally while the header and bottom action bar remain pinned.

---

### CARD-42: Ultra-Minimal Monospace Code Snippet Card
- **Visual Description**: Developer-focused card with macOS window dots, file name chip, language tag, copy button, and syntax-highlighted code block.

---

## 6. Architectural Matrix: CSS-Only vs JavaScript Interactive Cards

| Card Pattern | CSS-Only Capable? | JavaScript Required? | Recommended Implementation Mechanism |
| :--- | :--- | :--- | :--- |
| **Basic & Bento Grid Cards** | ✅ Yes | ❌ No | Pure CSS Grid / Tailwind |
| **Hover Fan-Out Stack** | ✅ Yes | ❌ No | Pure CSS Transitions + `:hover` |
| **3D Flip Card** | ✅ Yes | ❌ No (Hover) / Optional (Click) | Pure CSS `preserve-3d` + `rotateY` |
| **Scroll-Snap Card Rail** | ✅ Yes | ❌ No | Pure CSS `scroll-snap-type: x mandatory` |
| **Specular 3D Tilt Card** | ❌ No | ✅ Yes (Pointer tracking) | Lightweight React Hook / PointerEvent |
| **Tinder-Style Swipe Deck** | ❌ No | ✅ Yes (Physics / Gestures) | Vanilla Touch Listener or Framer Motion |
| **Card Shuffle Animation** | ❌ No | ✅ Yes (State cycle) | React State + CSS Transition End |
| **Drag-and-Drop Reorder** | ❌ No | ✅ Yes (HTML5 Drag / Pointer) | `@dnd-kit` / Native Drag API |
