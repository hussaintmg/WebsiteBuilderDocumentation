# 🧩 Deliverable 3: Reusable UI Component Library Catalogue

**File:** `design-system/03_UI_COMPONENTS_LIBRARY.md`  
**Classification:** Production UI Component Architecture & Engineering Patterns  
**Related Documents:**
- [`design-system/01_CSS_PROPERTIES_REFERENCE.md`](./01_CSS_PROPERTIES_REFERENCE.md)
- [`design-system/02_VISUAL_EFFECTS_CATALOGUE.md`](./02_VISUAL_EFFECTS_CATALOGUE.md)
- [`design-system/04_CARDS_AND_CARD_STACKS_LIBRARY.md`](./04_CARDS_AND_CARD_STACKS_LIBRARY.md)
- [`design-system/09_IMPLEMENTATION_RECIPES.md`](./09_IMPLEMENTATION_RECIPES.md)

---

## 📑 Table of Contents
1. [Component Architecture Standards & The 5-State Life-Cycle Machine](#1-component-architecture-standards--the-5-state-life-cycle-machine)
2. [Category B: Buttons, Action Controls & Microinteractions](#category-b-buttons-action-controls--microinteractions)
3. [Category C: Navigation Systems, Menus & Command Palettes](#category-c-navigation-systems-menus--command-palettes)
4. [Category D: Forms, Validated Inputs & Selection Controls](#category-d-forms-validated-inputs--selection-controls)
5. [Category E: Feedback, Overlays, Toasts & Modals](#category-e-feedback-overlays-toasts--modals)
6. [Category F: Data Displays, Tables, Kanban & Dashboard Controls](#category-f-data-displays-tables-kanban--dashboard-controls)
7. [Category G: Media, Viewers & Image Comparison Components](#category-g-media-viewers--image-comparison-components)
8. [Category H: Commerce, Cart Workflows & Status Timelines](#category-h-commerce-cart-workflows--status-timelines)
9. [Category I: CMS, Canvas Editors & Website Builder Toolbars](#category-i-cms-canvas-editors--website-builder-toolbars)

---

## 1. Component Architecture Standards & The 5-State Life-Cycle Machine

Every interactive action component (Buttons, Form Submissions, File Downloaders, Export Panels, Payment Triggers) must strictly follow the **5-State Life-Cycle Sequence**:

```
[State 1: Idle] ──► [State 2: Hover] ──► [State 3: Pressed] ──► [State 4: Loading] ──► [State 5: Resolved]
 (Accessible,         (Micro-lift,         (Physical inset,     (Disabled pointer,      ├─► Success: Green Checkmark
  Crisp Contrast)      Specular Glow)       scale(0.97))         Indeterminate Spinner) └─► Error: Shake + Toast
```

### 🚨 The Strict Action-Verification Law:
> **Zero Premature Success Animations**: An action button MUST NEVER display a green checkmark, confetti, or "Downloaded!" text simply because an animation timer expired. The visual success animation is strictly gated on the underlying network promise or file stream completing with `{ success: true }`. If the API fails or times out, the component must immediately transition to the Error state with a polite shake and toast notification.

---

## Category B: Buttons, Action Controls & Microinteractions

---

### BTN-1: Primary Glass Brand Action Button
- **Visual Description**: A sleek sky-cyan glassmorphic button with an inset top-edge specular highlight, a subtle drop glow, and a high-contrast dark text label.
- **States Sequence**:
  - *Idle*: `bg-brand-500/90 backdrop-blur-md shadow-glow-sky text-slate-950 font-semibold`
  - *Hover*: `translate-y-[-1px] shadow-glow-sky-lg brightness-110`
  - *Pressed*: `translate-y-[1px] scale-[0.98] shadow-inner`
  - *Loading*: Renders inline SVG spinner; button text dims; `pointer-events-none`
  - *Success*: Morphs smoothly to emerald green with SVG checkmark draw.
- **Code Recipe (Tailwind + CSS)**:
```tsx
export function PrimaryGlassButton({ onClick, loading, children }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-sky-400 to-cyan-400 shadow-[0_0_20px_-3px_rgba(56,189,248,0.4)] hover:shadow-[0_0_25px_0_rgba(56,189,248,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
    >
      {loading ? <SpinnerIcon className="w-4 h-4 animate-spin text-slate-950" /> : children}
    </button>
  );
}
```

---

### BTN-2: Cyberpunk Neon Hollow Button
- **Visual Description**: An electric indigo outline button with glowing border box-shadows, uppercase tracking, and cut corners.
- **Trigger**: Hover fills button with solid glowing indigo; text changes from indigo to white.
- **Code Recipe**:
```css
.btn-neon-cyberpunk {
  background: transparent;
  border: 1.5px solid #818cf8;
  color: #818cf8;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.75rem 1.75rem;
  box-shadow: inset 0 0 8px rgba(129, 140, 248, 0.2), 0 0 12px rgba(129, 140, 248, 0.2);
  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
  transition: all 0.25s ease;
}
.btn-neon-cyberpunk:hover {
  background: #818cf8;
  color: #07090e;
  box-shadow: 0 0 25px rgba(129, 140, 248, 0.8);
}
```

---

### BTN-3: Shimmer Sweep Button
- **Visual Description**: A dark obsidian pill button where a light reflection glides across the background every 4 seconds or on mouse hover.
- **Code Recipe**:
```css
.btn-shimmer-sweep {
  position: relative;
  background: #0f172a;
  color: #f8fafc;
  padding: 0.8rem 2rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}
.btn-shimmer-sweep::after {
  content: '';
  position: absolute;
  inset: -100%;
  background: linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.2) 50%, transparent 80%);
  transform: rotate(30deg) translate(-100%, 0);
  transition: transform 0.8s ease;
}
.btn-shimmer-sweep:hover::after {
  transform: rotate(30deg) translate(100%, 0);
}
```

---

### BTN-4: Magnetic Hover Button (Cursor Attraction Physics)
- **Visual Description**: When the mouse passes within 40px of the button, the button gently detaches from its center and tracks the cursor position elastically.
- **Implementation**: Vanilla JS `pointermove` listener calculating `(clientX - rect.centerX) * 0.3` translated into `translate3d()`.
- **Accessibility**: Automatically disabled for touch screens and `prefers-reduced-motion`.

---

### BTN-5: Asynchronous Gated PDF Generation Button
- **Visual Description**: Dedicated reporting button. Displays PDF glyph and "Generate PDF". On click, transforms into progress bar with percentage. Only transitions to green "Ready - Downloaded" after server responds with blob.
- **Code Recipe**: See [`design-system/09_IMPLEMENTATION_RECIPES.md`](./09_IMPLEMENTATION_RECIPES.md) Recipe 5.

---

### BTN-6: WhatsApp Send & Notification Dispatch Button
- **Visual Description**: Emerald green gradient button featuring official WhatsApp SVG icon. On click, performs phone number validation, sends backend webhook, and displays animated checkmark badge.

---

## Category C: Navigation Systems, Menus & Command Palettes

---

### NAV-1: Liquid Glass Sticky Header
- **Visual Description**: Full-width header resting at `top: 0`, completely transparent over hero imagery, blending into `backdrop-filter: blur(16px)` with thin bottom border when scrolled.
- **Desktop vs Mobile**: Desktop shows horizontal link bar and profile menu; mobile (`< 1024px`) collapses links into drawer triggered by menu button.

---

### NAV-2: Floating Glass Pill Navbar
- **Visual Description**: A centered, detached pill navbar floating 1.5rem below the top of the viewport (`max-w-4xl mx-auto`), featuring rounded-full corners and subtle ambient glow.
- **Code Recipe**:
```css
.nav-floating-pill {
  position: fixed;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: min(92%, 800px);
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 9999px;
  padding: 0.6rem 1.5rem;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

---

### NAV-3: Public Mobile Bottom Navigation Bar with "More" Drawer
- **Visual Description**: Mandatory for all public mobile marketing sites (`< 1024px`). Fixed to the bottom edge (`fixed bottom-0 left-0 right-0`), offering 4 quick touch destinations (Home, Products, Contact, More) with 48px touch targets.
- **Dual Close Controls**: Tapping "More" slides up a glass bottom sheet with dedicated close button and outside backdrop dismiss.

---

### NAV-4: Dashboard Floating Menu Pill with Dual Close Controls
- **Visual Description**: For dashboard views on mobile. Renders a floating bottom-center pill: `"Menu"`. When clicked, full sidebar drawer animates into view from the left, and the pill morphs into `"Close"` while the sidebar header also features an `'X'` button.

---

### NAV-5: Mac-Style Floating Dock
- **Visual Description**: An interactive horizontal dock at the bottom of the screen where icon cards magnify smoothly based on cursor proximity.
- **Implementation**: Pure CSS scaling on hover or JS proximity calculation.

---

### NAV-6: Command Palette (`Ctrl + K` / `Cmd + K`)
- **Visual Description**: Modal search overlay triggered by keyboard shortcut with glass backdrop, instant fuzzy filtering, grouped search results (Pages, Actions, Products), and keyboard arrow navigation.

---

### NAV-7: Multi-Account Avatar Dropdown with Double-Tap Fast-Shift
- **Visual Description**: Dual-action profile avatar component in the navigation header:
  - *Single-Tap*: Opens frosted user dropdown showing active account card (avatar, email, role), list of enrolled multi-session accounts with one-tap switching, and "+ Add Account" link.
  - *Double-Tap (< 300ms)*: Intercepts dropdown opening, executes a tactile **360° spin & scale bounce** (`ANIM-50`), rotates active identity to the next enrolled account in circular FIFO order, updates `active_account_id` cookie, and re-evaluates route permissions seamlessly without full page reload.
- **Cross-Reference**: Master specification in [`modules/AUTH_AND_FACELOCK.md`](../modules/AUTH_AND_FACELOCK.md#44-multi-account-fast-switcher--profile-button-double-tap-mechanics).

---

## Category D: Forms, Validated Inputs & Selection Controls

---

### INP-1: Floating-Label Text Input with State Validation
- **Visual Description**: Modern input where the label rests inside the field as a placeholder, then smoothly scales down and floats to the top border when focused or filled.
- **Code Recipe**:
```tsx
export function FloatingInput({ label, id, value, onChange, error, ...props }) {
  return (
    <div className="relative">
      <input
        id={id}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="peer w-full px-4 pt-5 pb-2 text-sm text-slate-100 bg-slate-900/60 border border-slate-800 rounded-xl focus:border-sky-400 focus:ring-1 focus:ring-sky-400 focus:outline-none transition-all"
        {...props}
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-2 text-[10px] uppercase font-semibold tracking-wider text-slate-400 pointer-events-none transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-sky-400 peer-focus:uppercase"
      >
        {label}
      </label>
      {error && <span className="text-xs text-rose-400 mt-1 block">{error}</span>}
    </div>
  );
}
```

---

### INP-2: 6-Box Synchronized OTP Input
- **Visual Description**: 6 discrete monospace digit boxes. Automatically focuses the next box upon typing, handles backspace navigation, and supports pasting a 6-digit code in one click.

---

### INP-3: Multi-Select Filter Chip Tray
- **Visual Description**: Interactive pill badges with animated checkmarks and delete crosses. Supports keyboard navigation and selected count badges.

---

### INP-4: Animated Neumorphic Toggle Switch
- **Visual Description**: Tactile slider toggle with smooth spring physics, accessible keyboard tab focus, and screen-reader `role="switch" aria-checked`.

---

### INP-5: File Upload Dropzone with Live Progress Ring
- **Visual Description**: Dashed border container that illuminates sky-cyan when dragging files over it. Shows file preview thumbnail, file size, and circular SVG progress ring during upload.

---

### INP-6: Search Autocomplete with Debounced Suggestions
- **Visual Description**: Search input that displays an animated loading spinner, recent search history chips, and highlighted matching keywords in real-time.

---

## Category E: Feedback, Overlays, Toasts & Modals

---

### OVL-1: Animated Toast Notification with Linear Countdown Bar
- **Visual Description**: Glassmorphic toast notification entering from top-right with spring physics. Features status icon, message, dismiss button, and a thin bottom countdown bar indicating time before auto-dismiss.
- **Code Recipe**:
```tsx
export function ToastNotification({ type = 'success', message, onDismiss, duration = 4000 }) {
  return (
    <div className="relative flex items-center gap-3 px-5 py-4 bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 rounded-xl shadow-2xl text-sm text-slate-100 overflow-hidden animate-slide-in-right">
      <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
      <span className="flex-1">{message}</span>
      <button onClick={onDismiss} className="text-slate-400 hover:text-white">✕</button>
      <div 
        className="absolute bottom-0 left-0 h-[2px] bg-sky-400 transition-all" 
        style={{ animation: `shrinkWidth ${duration}ms linear forwards` }} 
      />
    </div>
  );
}
```

---

### OVL-2: Accessible Center Modal Dialog with Apple Genie Origin-Morph & Top-Hold Draggability
- **Visual Description**: Production dialog window featuring Apple macOS 3D Genie bi-directional origin morphing and zero-bar frictionless draggability:
  - **Origin-Aware Emergence**: Window launches directly from the trigger button's bounding rect, unrolling with 3D perspective and spring physics into center screen.
  - **Suck-to-Origin Return**: On close, the modal funnels back down into the exact origin button, while the button temporarily elevates in 3D space (`translate-y-[-3px] scale-105`), glows, and plays a tactile absorb/catch bounce.
  - **Zero-Bar, Zero-Icon Top-Hold Drag**: Once settled, holding the top header region (top `48px-64px`) allows free dragging across the desktop viewport. **Zero extra titlebar or drag bar is rendered, and zero move/grip icons are displayed**. Cursor switches to `cursor-grab` on hover and `cursor-grabbing` on drag.
  - **Safety Isolations**: Close button (`✕`), input fields, and tabs are excluded from drag events (`closest('button, a, input, textarea, select')`). Movement is clamped to viewport edges.
  - **Accessibility**: Native focus lock, Escape key dismiss, `role="dialog" aria-modal="true"`.
- **Master Documentation**: [`design-system/APPLE_GENIE_ORIGIN_MORPH_SYSTEM.md`](./APPLE_GENIE_ORIGIN_MORPH_SYSTEM.md) & [`design-system/09_IMPLEMENTATION_RECIPES.md`](./09_IMPLEMENTATION_RECIPES.md#recipe-8-universal-apple-genie-modal--origin-morph-system).

---

### OVL-3: Slide-Out Side Sheet (Cart / Details Drawer)
- **Visual Description**: Full-height drawer sliding from the right edge with smooth cubic-bezier easing and swipe-to-dismiss gesture on mobile.

---

### OVL-4: Skeleton Loader with Pulsing Gradient Shimmer
- **Visual Description**: Content placeholder blocks that simulate avatar circles, headline bars, and paragraphs with a continuous 45-degree shimmer wave.

---

### OVL-5: Circular Progress Ring (SVG Path Dasharray)
- **Visual Description**: Precision circular progress meter with smooth mathematical stroke-dashoffset interpolation.

---

### OVL-6: Particle Confetti Explosion Emitter
- **Visual Description**: Micro-interaction that launches 40 colored confetti shards upon successful checkout, order confirmation, or task completion.

---

## Category F: Data Displays, Tables, Kanban & Dashboard Controls

---

### DAT-1: High-Density KPI Metric Card
- **Visual Description**: Features large fluid metric number, sparkline trend graphic, percentage delta badge (`+14.8%` emerald green), and tooltip info icon.

---

### DAT-2: Responsive Hybrid Table / Mobile Cards Component
- **Visual Description**: Desktop displays dense multi-column tabular grid with sortable headers and bulk selection checkboxes; on mobile screens (`< 768px`), automatically morphs into stacked interactive card layout without horizontal scroll overflow.

---

### DAT-3: Interactive Kanban Board with Drag-and-Drop Columns
- **Visual Description**: 3-column kanban board (To Do, In Progress, Done) with card counts, dragging physics, drop targets, and quick-add task buttons.

---

### DAT-4: Activity Audit Timeline
- **Visual Description**: Vertical timeline connecting audit entries with glowing status nodes, timestamps, actor avatars, and diff changes.

---

### DAT-5: Collapsible Interactive Tree View
- **Visual Description**: Hierarchical folder/file explorer tree with expand/collapse carets, active selection highlights, and keyboard arrow navigation.

---

### DAT-6: Bulk Action Floating Command Toolbar
- **Visual Description**: Bottom-floating pill that animates into view when 1 or more table rows/cards are selected, providing Bulk Delete, Bulk Export PDF, and Bulk Tagging buttons.

---

## Category G: Media, Viewers & Image Comparison Components

---

### MED-1: Interactive Before-and-After Image Comparison Slider
- **Visual Description**: A split image viewer with a draggable vertical divider bar that reveals original vs edited photography in real time with touch support.

---

### MED-2: 360-Degree Product Spin Viewer
- **Visual Description**: Renders 36 sequential product photographs mapped to horizontal mouse dragging, allowing customers to rotate physical goods 360 degrees.

---

### MED-3: Masonry Dynamic Media Gallery
- **Visual Description**: Multi-column Pinterest-style gallery accommodating varied aspect ratios without vertical gaps using CSS `columns` or CSS Grid masonry.

---

### MED-4: Full-Screen Glass Lightbox with Filmstrip Thumbnails
- **Visual Description**: Lightbox overlay with zoom controls, keyboard arrow navigation, pan-and-drag capability, and bottom thumbnail strip.

---

### MED-5: Interactive Image Hotspots with Glowing Beacon Pins
- **Visual Description**: Architectural image with pulsing hotspot markers. Clicking a marker reveals a floating product card with price and "Add to Cart".

---

### MED-6: Loupe Magnifier Hover Preview
- **Visual Description**: Hovering over an e-commerce image shows a circular circular magnifying loupe displaying 4x ultra-high-resolution details.

---

### MED-7: Production Three.js 3D Model Studio & Parts Inspector
- **Visual Description**: Production WebGL 3D model viewer and developer studio featuring:
  - **OrbitControls & Studio Stage**: 60fps GPU render canvas with PCF soft shadows, ACES Filmic tone mapping, and ambient/fill lighting.
  - **Parts Tree Explorer**: Decomposes the model into an interactive hierarchy list showing triangle counts, materials, and names. Clicking any part isolates it in 3D space.
  - **Exploded View Disassembly Slider**: Dynamically explodes and separates sub-meshes outward along their radial normal vectors.
  - **Wireframe & Telemetry HUD**: Live polygon count, vertex count, mesh count, and estimated VRAM usage readout.
  - **Master Architecture**: [`design-system/THREEJS_3D_MODEL_ARCHITECTURE_AND_INSPECTION_SYSTEM.md`](./THREEJS_3D_MODEL_ARCHITECTURE_AND_INSPECTION_SYSTEM.md) & [`design-system/09_IMPLEMENTATION_RECIPES.md`](./09_IMPLEMENTATION_RECIPES.md#recipe-9-production-threejs-3d-model-viewer--parts-inspector-studio).

---

## Category H: Commerce, Cart Workflows & Status Timelines

---

### COM-1: Interactive E-Commerce Product Card
- **Visual Description**: Card with product thumbnail carousel, price tag, discount badge, quick variant swatches (colors/sizes), and 1-click Add to Cart button.

---

### COM-2: Slide-Out Cart Drawer with Live Subtotal Math
- **Visual Description**: Right-side drawer displaying line items, quantity steppers with optimistic updates, shipping threshold progress bar, and checkout CTA.

---

### COM-3: Multi-Step Checkout Stepper Bar
- **Visual Description**: 4-stage checkout sequence (Shipping ➔ Delivery ➔ Payment ➔ Review) with connected progress line and completed checkmark badges.

---

### COM-4: Real-Time Shipping & Package Delivery Tracker
- **Visual Description**: Live progress tracker with animated delivery truck SVG moving along route checkpoints.

---

### COM-5: QR Code Payment Scan Animation Sequence
- **Visual Description**: Renders high-contrast QR code with a scanning laser line moving continuously up and down until WebSocket payment confirmation is received.

---

### COM-6: Order Status Confirmation Screen with Receipt Summary
- **Visual Description**: Verified order summary page with confetti burst, order ID copy chip, downloadable PDF invoice button, and delivery estimation timeline.

---

## Category I: CMS, Canvas Editors & Website Builder Toolbars

---

### CMS-1: Page Builder Topbar with Breakpoint Switcher
- **Visual Description**: Sticky header with Desktop (1440px), Tablet (768px), and Mobile (390px) preview toggles, Undo/Redo stack, and Publish button.

---

### CMS-2: Visual Property Inspector Panel
- **Visual Description**: Right sidebar inspector with collapsible accordions for Typography, Colors, Spacing, Border Radius, and Shadows.

---

### CMS-3: Design Token Theme Editor
- **Visual Description**: Live color palette and typography editor allowing website owners to modify `--brand-500` or font family and see entire page update instantly.

---

### CMS-4: Drag-and-Drop Canvas Section Frame
- **Visual Description**: Visual canvas highlighting selected sections with cyan bounding boxes, reordering drag handles, duplicate button, and delete dustbin animation.

---

### CMS-5: Component Visibility & Role Permission Gates
- **Visual Description**: Context menu on builder components allowing owners to set visibility rules (Show on Mobile only, Show to Logged-in Users only).

---

### CMS-6: Integration Status & Test Connection Card
- **Visual Description**: Settings card for SMTP, WhatsApp, and AI providers with live "Test Connection" button providing real round-trip latency feedback.

---

## Category J: Real-Time Chat & Omnichannel Presence Components

---

### CHAT-1: Dynamic Conversation Thread Directory
- **Visual Description**: High-speed list sorting threads dynamically by latest message timestamp with unread message badges, avatar status pips, and message preview snippets.
- **Cross-Reference**: Master specification in [`modules/CHAT_AND_COMMUNICATION_SYSTEM.md`](../modules/CHAT_AND_COMMUNICATION_SYSTEM.md).

---

### CHAT-2: WhatsApp Delivery Tick State Indicator
- **Visual Description**: Micro-status icon transitioning through Clock (Pending), Single Gray Tick (Sent), Double Gray Tick (Delivered), and Double Blue/Cyan Tick (Read).
- **Cross-Reference**: Master specification in [`modules/CHAT_AND_COMMUNICATION_SYSTEM.md`](../modules/CHAT_AND_COMMUNICATION_SYSTEM.md#4-whatsapp-style-status-state-machine--delivery-ticks).

---

### CHAT-3: Interactive Voice Note Waveform Bubble Player
- **Visual Description**: Voice note bubble featuring 35-50 scrubbable normalized waveform bars, playback progress fill, timecode readout, and `1x/1.5x/2x` speed toggle pills.
- **Cross-Reference**: Master specification in [`modules/CHAT_AND_COMMUNICATION_SYSTEM.md`](../modules/CHAT_AND_COMMUNICATION_SYSTEM.md#52-interactive-voice-note-bubble-playback).

---

### CHAT-4: Real-Time Audio Recording Bar with Waveform & Slide-to-Cancel
- **Visual Description**: Active microphone recording dock displaying Web Audio API 60fps dynamic frequency waveforms, live elapsed timer, and tactile mobile thumb-drag "Slide to Cancel" action.
- **Cross-Reference**: Master specification in [`modules/CHAT_AND_COMMUNICATION_SYSTEM.md`](../modules/CHAT_AND_COMMUNICATION_SYSTEM.md#51-real-time-audio-capture--live-waveform-web-audio-api).

---

### CHAT-5: WhatsApp Real-Time Dual Presence Indicator System
- **Visual Description**: WhatsApp-grade dual presence presentation:
  1. **Bottom Floating Dock (`<ChatPresenceDock />`)**: A frosted micro-capsule pill docked directly above the input textarea showing active user avatars, animated 3-dot emerald wave (`ANIM-48`) for text typing, and pulsing crimson microphone icon (`ANIM-49`) for voice recording.
  2. **Top Header Subtitle (`<ChatHeaderPresence />`)**: Synchronized navigation header subtitle shifting from `"Online"` to `"typing..."` or `"recording audio..."`.
  3. **Group Chat First-2 FIFO Queue**: Displays strictly the first 2 users who initiated activity; 3rd+ active members enter a FIFO queue represented by a discreet `(+N others)` badge, promoting into view seamlessly upon vacancy.
- **Cross-Reference**: Master blueprint in [`modules/CHAT_AND_COMMUNICATION_SYSTEM.md`](../modules/CHAT_AND_COMMUNICATION_SYSTEM.md#42-whatsapp-grade-real-time-typing--audio-recording-presence-engine).

---

## Category K: Community Discussions & Infinite Comment Trees

---

### COM-7: Infinite Nested Comment Tree & Reply Accordion (`<InfiniteCommentThread />`)
- **Visual Description**: Recursive discussion component supporting infinite-depth replies. Features a cap of `80px` on visual indentation to prevent mobile squishing, a tactile `"Show N replies"` accordion button with smooth expand animation (`ANIM-51`), a connective vertical thread guide line (`border-l-2 hover:border-cyan-500/60`), author role badges (`Instructor`, `Verified Buyer`), upvote counter, and inline quick-reply editor.
- **Cross-Reference**: Master specification in [`modules/INFINITE_COMMENTS_AND_REPLIES_SYSTEM.md`](../modules/INFINITE_COMMENTS_AND_REPLIES_SYSTEM.md).

---

## Category L: LMS Live Education & Interactive Classrooms

---

### LMS-1: Protected YouTube Live Classroom Player & Stage (`<LmsLiveClassStage />`)
- **Visual Description**: 16:9 widescreen video stage embedding an unlisted YouTube Live stream via domain-locked IFrame Player API. Token-gated by enrollment verification; unauthorized users see a frosted enrollment lock screen. Features live status badge, lecture metadata, and desktop/mobile layout switching.
- **Cross-Reference**: Master specification in [`modules/LMS_LIVE_STREAMING_AND_INTERACTIVE_CLASSES.md`](../modules/LMS_LIVE_STREAMING_AND_INTERACTIVE_CLASSES.md).

---

### LMS-2: Interactive Real-Time Classroom Live Chat & Q&A Panel (`<LmsLiveChat />`)
- **Visual Description**: Synchronized WebSocket live chat docked alongside the live stream. Includes top header tab toggle between "Live Chat" and "Q&A", an instructor pinned announcement bar, real-time question upvoting, slow-mode 10s cooldown timer, and student role badge highlights. Requires zero Google/YouTube login for students.
- **Cross-Reference**: Master specification in [`modules/LMS_LIVE_STREAMING_AND_INTERACTIVE_CLASSES.md`](../modules/LMS_LIVE_STREAMING_AND_INTERACTIVE_CLASSES.md#3-bespoke-real-time-classroom-live-chat--qa).

---

## Category M: AI Assistant, Copilot Memory & Conversation Tools

---

### AI-1: AI Chat History Sliding Drawer with Live Search (`<AiChatHistoryDrawer />`)
- **Visual Description**: Left-sliding frosted glass drawer (`w-80 bg-slate-950/95 backdrop-blur-xl border-r border-white/10`) embedded inside the AI Assistant. Groups sessions chronologically into "Today", "Yesterday", "Previous 7 Days", and "Older" with an instant real-time search input and "+ New Chat" button. Swapping conversations operates in `< 1ms` from client memory with zero redundant DB queries.
- **Cross-Reference**: Master specification in [`modules/AI_ASSISTANT_AND_COPILOT_SYSTEM.md`](../modules/AI_ASSISTANT_AND_COPILOT_SYSTEM.md#75-chat-history-architecture--client-single-fetch-caching).

---

### AI-2: In-Session Compacted Summary Divider & Inspection Card (`<AiCompactedSummaryDivider />`)
- **Visual Description**: An in-stream frosted divider card rendering `[ 📜 Older conversation compacted (N turns) — Click to inspect ]`. Clicking it smoothly expands an accordion revealing the exact structured summary the LLM is maintaining for the session, providing 100% context transparency to the user.
- **Cross-Reference**: Master specification in [`modules/AI_ASSISTANT_AND_COPILOT_SYSTEM.md`](../modules/AI_ASSISTANT_AND_COPILOT_SYSTEM.md#3-client-compaction-divider-aicompactedsummarydivider-).

---

### AI-3: Cross-Chat AI Memory Manager & Facts Editor (`<AiMemoryManagerModal />`)
- **Visual Description**: High-end frosted modal allowing users to view, edit, or delete persistent cross-chat memories. Displays Core Profile tags (Name, Role, Location), Custom Instructions editor, and a list of automatically learned facts with confidence badges and delete chips. Includes a global "Pause AI Memory" switch.
- **Cross-Reference**: Master specification in [`modules/AI_ASSISTANT_AND_COPILOT_SYSTEM.md`](../modules/AI_ASSISTANT_AND_COPILOT_SYSTEM.md#24-aiusermemory-schema-modelsaiusermemoryts).



