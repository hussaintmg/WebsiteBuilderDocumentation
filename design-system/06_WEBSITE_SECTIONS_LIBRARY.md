# 🏛️ Deliverable 6: Master Website Sections & Full Page Layouts Library

**File:** `design-system/06_WEBSITE_SECTIONS_LIBRARY.md`  
**Classification:** Full-Page Section Architecture, Layout Patterns & Structural Hierarchies  
**Related Documents:**
- [`design-system/01_CSS_PROPERTIES_REFERENCE.md`](./01_CSS_PROPERTIES_REFERENCE.md)
- [`design-system/03_UI_COMPONENTS_LIBRARY.md`](./03_UI_COMPONENTS_LIBRARY.md)
- [`design-system/04_CARDS_AND_CARD_STACKS_LIBRARY.md`](./04_CARDS_AND_CARD_STACKS_LIBRARY.md)
- [`design-system/07_WEBSITE_DESIGN_PATTERNS.md`](./07_WEBSITE_DESIGN_PATTERNS.md)
- [`design-system/09_IMPLEMENTATION_RECIPES.md`](./09_IMPLEMENTATION_RECIPES.md)

---

## 📑 Table of Contents
1. [Section Architecture & Grid Layout Principles](#1-section-architecture--grid-layout-principles)
2. [Category 1: Hero Sections (SEC-01 to SEC-07)](#category-1-hero-sections-sec-01-to-sec-07)
3. [Category 2: Feature Demonstrations, Bento Grids & Showcases (SEC-08 to SEC-14)](#category-2-feature-demonstrations-bento-grids--showcases-sec-08-to-sec-14)
4. [Category 3: Social Proof, Reviews, Logo Strips & Metrics (SEC-15 to SEC-21)](#category-3-social-proof-reviews-logo-strips--metrics-sec-15-to-sec-21)
5. [Category 4: Conversion, Tiered Pricing, FAQs & CTAs (SEC-22 to SEC-28)](#category-4-conversion-tiered-pricing-faqs--ctas-sec-22-to-sec-28)
6. [Category 5: Timelines, Workflows & Interactive Storytelling (SEC-29 to SEC-35)](#category-5-timelines-workflows--interactive-storytelling-sec-29-to-sec-35)
7. [Category 6: Footers, Subscriptions & Contact Hubs (SEC-36 to SEC-42)](#category-6-footers-subscriptions--contact-hubs-sec-36-to-sec-42)

---

## 1. Section Architecture & Grid Layout Principles

Every production website section is structured with consistent structural layers:

```
┌────────────────────────────────────────────────────────────────────────┐
│ <section className="relative py-20 lg:py-32 overflow-hidden">          │
│   <!-- 1. Ambient Background Layer (Gradients, Dot-Grids, Canvas) -->  │
│   <div className="absolute inset-0 pointer-events-none -z-10" />       │
│                                                                        │
│   <!-- 2. Responsive Content Constrainer (Max-W + Padding) -->         │
│   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">            │
│     <!-- Section Header (Eyebrow Tag + H2 + Subhead) -->               │
│     <!-- Main Layout Body (Grid / Flex / Stacks / Storytelling) -->     │
│   </div>                                                               │
│ </section>                                                             │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Category 1: Hero Sections (SEC-01 to SEC-07)

---

### SEC-01: Split Hero (Typography Left, Interactive UI Stage Right)
- **Visual Description**: Left column features an iridescent announcement pill, massive fluid display headline (`clamp(2.5rem, 5vw, 4.5rem)`), value proposition paragraph, and dual CTAs. Right column features a 3D isometric application mockup with floating glass badge chips.
- **Component Hierarchy**: `Section` ➔ `Container` ➔ `Grid (1-col mobile, 2-col desktop)` ➔ `Left: [Badge, H1, P, CTA Buttons]` ➔ `Right: [IsometricCardMockup, FloatingPillChip1, FloatingPillChip2]`.
- **Background**: Obsidian dark `#07090e` with ambient cyan radial gradient top-right.
- **Responsive Behavior**: On mobile (`< 1024px`), content flows into a single stacked column; right-stage mockup drops below CTA buttons and scales to 100% width.
- **Suitable Website Types**: SaaS, B2B platforms, Developer Tools, Financial Apps.

---

### SEC-02: Centered Dramatic Typography Hero with Bottom Dashboard Preview
- **Visual Description**: Centered typography with maximum impact headline, social proof star rating, and a perspective-tilted dashboard screenshot protruding out of the bottom fold.
- **Component Hierarchy**: `CenteredTextStack` ➔ `CTAButtonGroup` ➔ `Perspective3DFrame (perspective: 1200px; rotateX: 18deg)`.
- **Animation Trigger**: Dashboard mockup flattens from `rotateX: 18deg` to `0deg` on scroll down.
- **Suitable Website Types**: AI Copilots, Analytics Platforms, Modern Productivity Suites.

---

### SEC-03: Video Background Hero with Frosted Glass Overlay Card
- **Visual Description**: Looping background video (dark ambient particle motion or cinematic footage) muted and compressed, covered by a centered glassmorphic card container.
- **Component Hierarchy**: `Video (absolute inset-0 object-cover)` ➔ `OverlayMask (rgba(0,0,0,0.6))` ➔ `GlassContainer [H1, FormInput, SubmitBtn]`.
- **Accessibility**: Fallback static image loaded first; respects `prefers-reduced-motion` by freezing or hiding video.
- **Suitable Website Types**: High-End Real Estate, Luxury Resorts, Automotive, Creative Studios.

---

### SEC-04: Bento-Grid Hero (The Modern Silicon Valley Archetype)
- **Visual Description**: Header text at top; below it is an asymmetric 4-block Bento grid where Block 1 is a live code window, Block 2 is an interactive toggle, Block 3 is a metric sparkline, and Block 4 is customer logos.
- **CSS Grid**: `grid-template-columns: repeat(12, 1fr); gap: 1.5rem;`
- **Suitable Website Types**: Next-Gen Developer Platforms, AI Developer Tools, Design Systems.

---

### SEC-05: True 3D Parallax Multi-Layer Hero
- **Visual Description**: Moving the mouse over the hero moves 3 distinct graphic layers at varying speeds: background starfield (slow), 3D geometric rings (medium), and foreground product headline (sharp).
- **Implementation**: PointerEvent listener updating CSS custom properties `--mouse-x` and `--mouse-y`.
- **Suitable Website Types**: Gaming, Web3, Creative Agencies, Product Launches.

---

### SEC-06: Minimalist Monospace Editorial Hero
- **Visual Description**: Clean, high-contrast typography in JetBrains Mono / Inter pairing. Features ASCII border accents, dynamic typing effect, and clean stark black/white palette.
- **Suitable Website Types**: Technical Documentation, Open-Source Libraries, Research Labs.

---

### SEC-07: Asymmetric Split-Screen Hero with Sticky Image Rail
- **Visual Description**: Screen is divided 50/50 vertically. Left half scrolls with descriptive benefits; right half stays pinned with high-res product renders.
- **Suitable Website Types**: Luxury E-Commerce, High-Fashion, High-End Furniture.

---

## Category 2: Feature Demonstrations, Bento Grids & Showcases (SEC-08 to SEC-14)

---

### SEC-08: The Bento Grid Feature Matrix
- **Visual Description**: 5 interconnected feature cards in an asymmetric grid (2 tall cards, 1 large 2x2 centerpiece, 2 wide horizontal cards) with glowing borders.
- **Structure**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="md:col-span-2 md:row-span-2 glass-card">Large 2x2 Showcase</div>
  <div className="glass-card">Micro-Feature 1</div>
  <div className="glass-card">Micro-Feature 2</div>
  <div className="md:col-span-3 glass-card">Full-Width Interactive Bar</div>
</div>
```

---

### SEC-09: Alternating 2-Column Zigzag Feature Breakdown
- **Visual Description**: Alternating rows: Row 1 has text on left and screenshot right; Row 2 has screenshot left and text right. Features icon bullet lists and subtle background dividers.
- **Responsive Behavior**: Mobile stacks all text above screenshots consistently using Flexbox `flex-col-reverse` on alternate rows.

---

### SEC-10: Interactive Feature Tabs with Live Preview Stage
- **Visual Description**: Horizontal bar of 4 feature tabs (e.g. "Realtime Sync", "Role Permissions", "AI Automations", "Audit Logs"). Clicking a tab switches the live preview screen smoothly with an animated glider line.

---

### SEC-11: Deep Architectural Feature Comparison Matrix
- **Visual Description**: Comprehensive table comparing "Your Platform" against "Legacy Solutions" across 10 security and performance metrics with green checkmarks and gray dashes.

---

### SEC-12: Horizontal Card Showcase Rail
- **Visual Description**: Carousel of 6 feature cards that scrolls horizontally with mouse drag or snap scroll, accompanied by Prev/Next glass arrow buttons.

---

### SEC-13: Interactive Product Hotspot Stage
- **Visual Description**: Large hardware or software diagram with pulsing beacon markers. Hovering or tapping a pin opens an explanatory micro-card with technical specs.

---

### SEC-14: Asymmetric Staggered Feature Gallery
- **Visual Description**: 3 columns of feature cards with offset vertical margins (`mt-0`, `mt-12`, `mt-24`), creating an organic, energetic visual rhythm.

---

## Category 3: Social Proof, Reviews, Logo Strips & Metrics (SEC-15 to SEC-21)

---

### SEC-15: Seamless Masked Infinite Logo Wall (Ticker)
- **Visual Description**: Double-buffered continuous marquee of 12 partner company logos with gradient edge masks and pause-on-hover.
- **CSS Properties**: `@keyframes marqueeScroll`, `-webkit-mask-image: linear-gradient(90deg, transparent, black 15%, black 85%, transparent)`.

---

### SEC-16: Staggered Masonry Testimonial Wall
- **Visual Description**: 3-column masonry grid of customer reviews with varying lengths, star ratings, customer avatar photos, and company badges.

---

### SEC-17: Fanned-Out Testimonial Card Deck
- **Visual Description**: Interactive deck of 3 customer quotes. Hovering fans them out laterally; tapping advances to the next testimonial.

---

### SEC-18: High-Impact Animated Statistics Grid
- **Visual Description**: 4 large KPI metrics (`99.99% Uptime`, `10M+ Events/Sec`, `140+ Countries`, `0ms Lag`) with gradient numbers and count-up triggers.

---

### SEC-19: Case Study Spotlight with Video Modal Trigger
- **Visual Description**: Prominent customer success story featuring full-bleed company photo, large pull-quote, ROI statistics, and a "Watch 2-Min Story" video play button.

---

### SEC-20: Wall of Tweets / LinkedIn Micro-Endorsements
- **Visual Description**: Curated social media card grid with verified blue checkmarks, timestamps, and direct links to original posts.

---

### SEC-21: Interactive Rating Histogram & Review Summary
- **Visual Description**: Overall 4.9/5 score display with breakdown bars (5-star, 4-star, 3-star), customer review filters, and "Write a Review" modal trigger.

---

## Category 4: Conversion, Tiered Pricing, FAQs & CTAs (SEC-22 to SEC-28)

---

### SEC-22: Tiered 3-Column Pricing Grid with Annual Billing Toggle
- **Visual Description**: Monthly vs Annual switch (with "-20% Save" pill). 3 pricing tiers (Starter, Professional [Featured with cyan border beam], Enterprise). Features feature checklists with tooltips.

---

### SEC-23: High-Conversion Full-Bleed Gradient CTA Banner
- **Visual Description**: High-intensity cyan-to-indigo mesh background banner with bold call to action, dual email input with 1-click signup, and zero-risk money-back guarantee badge.

---

### SEC-24: Interactive FAQ Accordion with Search Bar
- **Visual Description**: 2-column FAQ section with category chips (General, Security, Billing) and smooth zero-JS accordion expansion (`grid-template-rows: 0fr` ➔ `1fr`).

---

### SEC-25: Multi-Step Interactive Price Calculator
- **Visual Description**: Slider input for "Number of Team Members" or "Monthly Active Users" that updates price in real-time with ROI estimate.

---

### SEC-26: Exit-Intent Bottom Floating Conversion Bar
- **Visual Description**: Subtle 50px glass bar that slides up from bottom when user reaches 80% scroll depth, providing quick demo booking.

---

### SEC-27: Enterprise Sales Contact Form with Role Routing
- **Visual Description**: Floating label form with company size selector, budget range radio pills, and automated webhook dispatch.

---

### SEC-28: Feature Request & Upvote Community Board
- **Visual Description**: Public roadmap section displaying planned features with vote counters and "Submit Idea" modal.

---

## Category 5: Timelines, Workflows & Interactive Storytelling (SEC-29 to SEC-35)

---

### SEC-29: Vertical Connecting Process Steps (1-2-3-4)
- **Visual Description**: Numbered circular nodes connected by a continuous vertical glowing cyan line, explaining the 4-step onboarding workflow.

---

### SEC-30: Pinned Sticky Zoom Storyteller Runway (300vh)
- **Visual Description**: Viewport stays pinned while scrolling down 300vh; application interface zooms from dashboard overview into a single detailed invoice line item.

---

### SEC-31: Horizontal Scroll Project Case Studies
- **Visual Description**: Vertical page scroll translates a wide portfolio showcase rail horizontally from right to left.

---

### SEC-32: Interactive Historical Timeline with Milestone Chips
- **Visual Description**: Company or product version history with chronological milestone cards and year navigation tabs.

---

### SEC-33: Split-Screen Feature Walkthrough (Sticky Left, Scrolling Right)
- **Visual Description**: Left column stays pinned showing active mobile screen; right column scrolls through 4 sequential explanatory chapters.

---

### SEC-34: 3D Layered Disassembly View (Hardware / Tech Exploded View)
- **Visual Description**: Scrolling separates layers of an engine or software architecture diagram in 3D perspective space.

---

### SEC-35: Interactive Decision Tree & Product Finder
- **Visual Description**: 3-question guided wizard recommending the perfect subscription tier based on user input.

---

## Category 6: Footers, Subscriptions & Contact Hubs (SEC-36 to SEC-42)

---

### SEC-36: Multi-Column Mega Footer with Newsletter Studio
- **Visual Description**: 5-column navigation tree (Product, Solutions, Resources, Company, Legal), live system status indicator ("All Systems Operational"), currency/language selector, and social icons.

---

### SEC-37: Minimalist Obsidian Glass Footer
- **Visual Description**: Compact single-row dark glass bar with logo, copyright, terms, privacy, and social icon links.

---

### SEC-38: Interactive Newsletter Subscription Box with Validation
- **Visual Description**: Compact inline email input with instant regex validation, loading spinner, and success checkmark feedback.

---

### SEC-39: Contact Section with Live Interactive Map & Form
- **Visual Description**: Split 2-column layout: left column contains direct contact details (email, WhatsApp, physical office); right column contains floating label message form.

---

### SEC-40: Global Office Locations Grid with Timezone Clocks
- **Visual Description**: 4 location cards (New York, London, Tokyo, Dubai) featuring live ticking digital clocks and local office addresses.

---

### SEC-41: Legal Terms & Privacy Policy Split Layout
- **Visual Description**: Sticky table of contents on left (`position: sticky; top: 6rem;`) tracking active reading heading via scrollspy; legal clauses on right.

---

### SEC-42: High-Converting 404 Interactive Error Page
- **Visual Description**: Creative error page with embedded mini-game, popular page quick links, and search bar.
