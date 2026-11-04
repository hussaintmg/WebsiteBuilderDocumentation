# 🎬 Master Specification: In-Flight Button Task Micro-Animations

> **FILE:** `design-system/BUTTON_IN_FLIGHT_TASK_ANIMATIONS_SPECIFICATION.md`  
> **CLASSIFICATION:** Visual Engineering & Micro-Interaction Standard  
> **COMPANION RECIPES:** [`design-system/09_IMPLEMENTATION_RECIPES.md#recipe-11`](./09_IMPLEMENTATION_RECIPES.md#recipe-11)  
> **PARENT DIRECTIVE:** [`design-system/TASK_ANIMATED_BUTTONS_SYSTEM.md`](./TASK_ANIMATED_BUTTONS_SYSTEM.md)  
>
> 👑 **THE IN-FLIGHT MICRO-NARRATIVE LAW**:  
> Generic, boring circular loading spinners (`animate-spin` borders) are **STRICTLY PROHIBITED** on action buttons across the entire platform.  
> When any button is clicked and an asynchronous API request is in-flight, the button's icon frame MUST execute a **task-specific vector micro-animation** that tells the physical story of that operation in an unbroken loop, transitioning into a verified checkmark or success morph upon resolution.

---

## 📑 Table of Contents

1. [Architectural Principles & The In-Flight Lifecycle](#1-architectural-principles--the-in-flight-lifecycle)
2. [Button 1: Delete Record — The In-Button Dustbin Loop](#button-1-delete-record--the-in-button-dustbin-loop)
3. [Button 2: Place Order & Dispatch — The Delivery Truck on Animated Road with Dust Lines](#button-2-place-order--dispatch--the-delivery-truck-on-animated-road-with-dust-lines)
4. [Button 3: Live Sync & Refresh — The Broadcast Tower Beacon & Concentric Radio Waves with Live Text](#button-3-live-sync--refresh--the-broadcast-tower-beacon--concentric-radio-waves-with-live-text)
5. [Button 4: Complete Payment — Credit Card Chip Insertion & Contactless NFC Waves](#button-4-complete-payment--credit-card-chip-insertion--contactless-nfc-waves)
6. [Button 5: Download PDF — Laser Scanner Beam & Tray Drop](#button-5-download-pdf--laser-scanner-beam--tray-drop)
7. [Button 6: Send Email & Inquiry — Origami Jet Plane Takeoff with Contrail Lines](#button-6-send-email--inquiry--origami-jet-plane-takeoff-with-contrail-lines)
8. [Button 7: Edit & Update — Stylus Line Tracing & Wax Seal Press](#button-7-edit--update--stylus-line-tracing--wax-seal-press)
9. [Button 8: Create & Add New — Isometric 3D Construction Bricks Assembly](#button-8-create--add-new--isometric-3d-construction-bricks-assembly)
10. [Button 9: Upload File — Antigravity Tractor Beam Suction with Cloud Puffs](#button-9-upload-file--antigravity-tractor-beam-suction-with-cloud-puffs)
11. [Button 10: Archive Record — Filing Cabinet Slide & Mechanical Latch](#button-10-archive-record--filing-cabinet-slide--mechanical-latch)
12. [Button 11: Undo & Restore — Reverse Time-Travel Clock & Paper Uncrumple](#button-11-undo--restore--reverse-time-travel-clock--paper-uncrumple)
13. [Button 12: Security Lock / FaceLock — Biometric Hexagon Sweep & Shackle Snap](#button-12-security-lock--facelock--biometric-hexagon-sweep--shackle-snap)
14. [Timing Mathematics & Fluid Looping Curves](#14-timing-mathematics--fluid-looping-curves)
15. [Verification & Compliance Checklist](#15-verification--compliance-checklist)

---

## 1. Architectural Principles & The In-Flight Lifecycle

### 1.1 The Dual-Phase Distinction: In-Button vs. Screen-Level
It is critical to distinguish between two separate animation systems:
1. **Screen-Level Portal Animation** (e.g. `GenieTrashBinPortal.tsx`): Runs across the whole screen *after* the confirmation modal closes, elevating the deleted table row or card via `getBoundingClientRect()` and sucking it into an offscreen bin.
2. **In-Button Micro-Animation** (The subject of this specification): Runs *inside the button itself* during the in-flight asynchronous network request ($T_{\text{api}}$), keeping the user visually mesmerized while waiting for the server's HTTP response.

```
+-------------------------------------------------------------------------------+
| User Clicks Button                                                            |
|       |                                                                       |
|       v                                                                       |
| [ IN-FLIGHT STATE: T_api ] ──> Button Icon plays Task-Specific Micro-Loop    |
|                                (e.g. Truck driving with tyres & dust lines;   |
|                                 or Bin sliding in, lid opening, file drop)    |
|       |                                                                       |
|       v                                                                       |
| [ API RESOLUTION ] ──────────> Graceful Completion of Current Loop            |
|       |                                                                       |
|       v                                                                       |
| [ SUCCESS / SETTLED ] ───────> Morph to Verified Checkmark / Final State      |
|       |                                                                       |
|       v                                                                       |
| [ POST-ANIMATION TOAST ] ────> Toast notification triggers STRICTLY AFTER     |
+-------------------------------------------------------------------------------+
```

---

## Button 1: Delete Record — The In-Button Dustbin Loop

### 1.1 Visual Choreography & Micro-Story
When user clicks "Delete" (or confirms deletion inside a modal), while the backend API is processing the removal:
1. **Dustbin Entry (0ms – 250ms)**: A miniature trash bin cylinder enters from the right edge of the icon bounding box (`x: 24px -> 0px`).
2. **Lid Pop (200ms – 380ms)**: The top lid rotates open around its left hinge (`rotate: 0deg -> -55deg`).
3. **File Drop (350ms – 600ms)**: A mini document sheet icon floats into view above the bin and drops directly inside (`y: -12px -> 4px`, `scale: 1.0 -> 0.4`, `opacity: 1 -> 0`).
4. **Lid Slam (580ms – 720ms)**: The bin lid snaps shut with an elastic rebound (`rotate: -55deg -> 0deg`).
5. **Dustbin Exit & Re-loop (700ms – 950ms)**: The closed bin glides out toward the left edge (`x: 0px -> -24px`, `opacity: 1 -> 0`).
6. **Continuous Loop**: If $T_{\text{api}} > 950\text{ms}$, another bin immediately enters from the right in an unbroken rhythm.
7. **Settled State**: On HTTP 200, the bin settles centrally and smoothly cross-morphs into a vibrant emerald checkmark with a circular shockwave pulse.

```
Step 1: Bin enters right   Step 2: Lid pops open   Step 3: File drops in   Step 4: Lid slams shut
   [       ] -> [_|]          [       ]  _--/        [   |__]                [       ]  _---_
                                          [_|]            |  [_|]                    [_|]
```

### 1.2 Framer Motion SVG Motion Specification
```tsx
// Inside TaskAnimatedDeleteButton Icon Frame (24x24px)
<motion.div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
  {/* Bin Body + Lid Assembly */}
  <motion.div
    animate={{
      x: [24, 0, 0, 0, -24],
      opacity: [0, 1, 1, 1, 0]
    }}
    transition={{
      duration: 0.95,
      repeat: Infinity,
      ease: [0.25, 1, 0.5, 1],
      times: [0, 0.25, 0.65, 0.8, 1]
    }}
    className="relative flex flex-col items-center"
  >
    {/* Animated Lid */}
    <motion.div
      animate={{
        rotate: [0, 0, -55, -55, 0, 0],
        y: [0, 0, -2, -2, 0, 0]
      }}
      transition={{
        duration: 0.95,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.2, 0.35, 0.6, 0.72, 1]
      }}
      style={{ originX: 0.1, originY: 1 }}
      className="w-4 h-1 bg-red-400 rounded-t-sm shadow-sm"
    />
    
    {/* Bin Container */}
    <div className="w-3.5 h-4 bg-gradient-to-b from-red-500 to-red-700 rounded-b-sm flex items-center justify-center border-t border-red-300/40">
      <div className="w-1.5 h-2 border-x border-white/40" />
    </div>
  </motion.div>

  {/* Dropping Document Icon */}
  <motion.div
    animate={{
      y: [-14, -14, 2, 2],
      scale: [1, 1, 0.4, 0],
      opacity: [0, 1, 1, 0]
    }}
    transition={{
      duration: 0.95,
      repeat: Infinity,
      ease: "easeIn",
      times: [0, 0.3, 0.6, 0.65]
    }}
    className="absolute w-2.5 h-3 bg-white/90 rounded-[2px] shadow-sm border border-neutral-300"
  />
</motion.div>
```

---

## Button 2: Place Order & Dispatch — The Delivery Truck on Animated Road with Dust Lines

### 2.1 Visual Choreography & Micro-Story
When user clicks "Place Order", "Confirm Dispatch", or "Ship Package":
1. **Box Packaging Phase (0ms – 300ms)**: A cardboard carton box wraps shut with a central seal tape line.
2. **Loading Phase (300ms – 500ms)**: The parcel slides smoothly onto the cargo flatbed of an isometric delivery truck.
3. **High-Speed Transit Phase (500ms – 1100ms)**:
   - **Spinning Tyres**: The front and rear truck wheels spin continuously at high angular velocity ($\omega = 360^\circ$ every 200ms).
   - **Moving Road Dashes**: A dotted road strip beneath the truck scrolls continuously from right to left (`x: 0px -> -24px`), creating an exhilarating sense of forward highway motion.
   - **Trailing Dust Lines & Exhaust Puffs**: Two delicate dynamic dust particle puffs and exhaust vapor streaks emit from the rear tyre contact patch, billowing outward and fading away (`x: 0 -> -16px, scale: 0.5 -> 1.4, opacity: 0.8 -> 0`).
   - **Suspension Vibration**: The truck body undergoes micro-suspension bounce (`y: [0, -1, 0, 1, 0]`), mimicking realistic pavement contact.
4. **Settled State**: On HTTP 200 confirmation, the truck eases to a smooth stop, and transforms into a shining emerald checkmark with the label morphing to `"Order Dispatched!"`.

```
        __________________
       |  PACKAGE LOADED  | \
     ==|__________________|__\__   <--- Subtle suspension bounce: y: [-1, 1]
    ( * )                    ( * ) <--- Spinning Tyres: rotate: 360deg
 ~~~  ~~~                          <--- Trailing Dust & Exhaust Lines (x: -16px, fade)
================================== <--- Road Line Dashes Moving Left: x: 0 -> -24px
```

### 2.2 Framer Motion SVG Motion Specification
```tsx
// Inside TaskAnimatedOrderTruckButton Icon/Canvas Frame (40x24px)
<div className="relative w-10 h-6 flex items-center justify-center overflow-hidden">
  {/* The Moving Delivery Truck Body */}
  <motion.div
    animate={{ y: [0, -1, 0, 0.8, 0] }}
    transition={{ duration: 0.35, repeat: Infinity, ease: "linear" }}
    className="relative flex items-end"
  >
    {/* Cargo Container + Cab */}
    <div className="relative flex items-end">
      {/* Cargo Box */}
      <div className="w-5 h-3.5 bg-cyan-600 rounded-tl-sm border-t border-l border-cyan-300/40 flex items-center justify-center">
        {/* Package Icon in Cargo */}
        <div className="w-2.5 h-2 bg-amber-500 rounded-[1px] border border-amber-300/50" />
      </div>
      {/* Driver Cab */}
      <div className="w-2.5 h-2.5 bg-cyan-500 rounded-tr-md border-t border-r border-cyan-300/40 relative">
        <div className="w-1 h-1 bg-cyan-950/80 rounded-tr-sm ml-1 mt-0.5" />
      </div>
    </div>

    {/* Front & Rear Wheels (Spinning Tyres) */}
    <div className="absolute -bottom-1 left-0.5 right-0.5 flex justify-between pointer-events-none">
      {/* Rear Wheel */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
        className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-400 flex items-center justify-center"
      >
        <div className="w-0.5 h-0.5 bg-neutral-200 rounded-full" />
      </motion.div>
      {/* Front Wheel */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
        className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-400 flex items-center justify-center"
      >
        <div className="w-0.5 h-0.5 bg-neutral-200 rounded-full" />
      </motion.div>
    </div>
  </motion.div>

  {/* Trailing Tyre Dust & Exhaust Streamers */}
  <div className="absolute bottom-1 left-0 pointer-events-none">
    <motion.div
      animate={{
        x: [0, -14],
        scale: [0.6, 1.4],
        opacity: [0.9, 0]
      }}
      transition={{ duration: 0.45, repeat: Infinity, ease: "easeOut" }}
      className="w-1.5 h-1 rounded-full bg-neutral-300/70 blur-[0.5px]"
    />
    <motion.div
      animate={{
        x: [0, -10],
        scale: [0.4, 1.2],
        opacity: [0.7, 0]
      }}
      transition={{ duration: 0.35, delay: 0.15, repeat: Infinity, ease: "easeOut" }}
      className="w-1 h-0.5 rounded-full bg-cyan-300/60 blur-[0.5px] -mt-0.5"
    />
  </div>

  {/* Moving Road Surface Dashes */}
  <div className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] overflow-hidden">
    <motion.div
      animate={{ x: [0, -20] }}
      transition={{ duration: 0.25, repeat: Infinity, ease: "linear" }}
      className="w-20 h-full border-b border-dashed border-cyan-400/80"
    />
  </div>
</div>
```

---

## Button 3: Live Sync & Refresh — The Broadcast Tower Beacon & Concentric Radio Waves with Live Text

### 3.1 Visual Choreography & Micro-Story
When user clicks "Sync Data", "Live Connect", or viewing a real-time streaming status:
1. **Broadcast Radio Tower Antenna**: A high-tech communications tower icon with lattice cross-struts.
2. **Pinnacle Transmitter Beacon**: At the very needle apex of the tower, a miniature red/amber transmitter LED beacon blinks rhythmically (`opacity: [0.2, 1, 0.2]`, duration: 400ms).
3. **Concentric RF Radio Wave Arcs**: Concentric semi-circular radio waves radiate outward into the air from the beacon (`scale: 0.8 -> 2.2, opacity: 1 -> 0, strokeWidth: 1.5 -> 0.5`).
4. **The Live Text Component**:
   - The button or badge label displays active status: `"SYNCING LIVE..."` or `"BROADCASTING..."`.
   - Accompanied by an animated green/amber pulsing status orb (`relative flex h-2 w-2` with `animate-ping`).
   - A soft sweeping radar beam gradient sweeps horizontally across the letters of the text (`background-position: -200% -> 200%`).
   - Animated miniature soundwave / signal equalizer bars jump next to the text.
5. **Settled State**: On synchronization complete, the tower beacon turns solid emerald green, radio waves lock into a circular protective perimeter, and label morphs to `"Synchronized"`.

```
         (())         <--- Radiating Concentric Radio Wave Arcs: scale: 0.8 -> 2.2
          /\          <--- Blinking Beacon Dot at Tower Needle
         /  \
        /____\        <--- Lattice Cross-Struts
       / |  | \
      
   [ (•) SYNCING LIVE... ||||| ]  <--- Pulsing Live Dot + Radar Shimmer + Signal Bars
```

### 3.2 Framer Motion SVG Motion Specification
```tsx
// Inside TaskAnimatedLiveSyncButton
<div className="flex items-center gap-2.5">
  {/* Broadcast Tower Icon with Wave Arcs */}
  <div className="relative w-6 h-6 flex items-center justify-center">
    {/* Concentric Radiating RF Waves */}
    {[0, 0.35, 0.7].map((delay, idx) => (
      <motion.div
        key={idx}
        animate={{
          scale: [0.7, 1.8],
          opacity: [0.9, 0]
        }}
        transition={{
          duration: 1.1,
          repeat: Infinity,
          delay: delay,
          ease: "easeOut"
        }}
        className="absolute top-0.5 w-3.5 h-3.5 rounded-full border border-emerald-400/80 pointer-events-none"
      />
    ))}

    {/* Tower Vector SVG */}
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-400 relative z-10" fill="none" stroke="currentColor" strokeWidth="2">
      {/* Tower Mast */}
      <path d="M12 2v20M8 22h8M9 15h6M10 9h4" />
      {/* Tower Legs */}
      <path d="M7 22l5-18 5 18" />
    </svg>

    {/* Blinking Beacon Tip */}
    <motion.div
      animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
      transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] z-20"
    />
  </div>

  {/* Live Text with Radar Beam & Equalizer Bars */}
  <div className="flex items-center gap-1.5">
    {/* Pulsing Live Dot */}
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
    </span>

    {/* Sweeping Shimmer Text */}
    <span className="font-mono text-xs font-semibold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-white to-emerald-200 bg-[length:200%_auto] animate-shimmer">
      Syncing Live
    </span>

    {/* Mini Signal Transmission Equalizer Bars */}
    <div className="flex items-end gap-0.5 h-3 ml-1">
      {[0.4, 0.8, 0.5, 1.0].map((h, i) => (
        <motion.div
          key={i}
          animate={{ height: [`${h * 40}%`, `${h * 100}%`, `${h * 40}%`] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          className="w-0.5 bg-emerald-400/90 rounded-full"
        />
      ))}
    </div>
  </div>
</div>
```

---

## Button 4: Complete Payment — Credit Card Chip Insertion & Contactless NFC Waves

### 4.1 Visual Choreography
1. **Card Insertion (0ms – 400ms)**: An obsidian-gold bank card drops smoothly into an POS reader slot.
2. **Contactless Radio Frequency Pulse (400ms – 1100ms)**: 3 concentric NFC wave arcs radiate from the chip reader.
3. **Holographic Security Shimmer**: A metallic light ray glints diagonally across the card's security hologram.
4. **Settled State**: Reader flashes an emerald verification LED ring and stamps `"PAID"` with a checkmark.

---

## Button 5: Download PDF — Laser Scanner Beam & Tray Drop

### 5.1 Visual Choreography
1. **Document Page Rendering (0ms – 400ms)**: A miniature document sheet with schematic lines appears.
2. **Neon Laser Scanline (400ms – 800ms)**: A vibrant cyan laser beam sweeps downward across the sheet from top to bottom, illuminating blueprint technical diagrams.
3. **Tray Drop (800ms – 1100ms)**: The scanned sheet folds into a red PDF badge, sliding down an arrow into a delivery tray.
4. **Settled State**: Tray ejects with a green checkmark stamp.

---

## Button 6: Send Email & Inquiry — Origami Jet Plane Takeoff with Contrail Lines

### 6.1 Visual Choreography
1. **Envelope Folding (0ms – 300ms)**: An envelope flap lifts and folds sharply into a supersonic origami jet plane.
2. **Takeoff & Vapor Trail (300ms – 800ms)**: The plane rotates 35 degrees upward and accelerates forward, leaving dynamic segmented contrail lines that ripple behind the fuselage.
3. **Looping**: If network is delayed, the supersonic jet cruises effortlessly through soft cloud layers.
4. **Settled State**: Hits a bullseye target with circular emerald shockwave.

---

## Button 7: Edit & Update — Stylus Line Tracing & Wax Seal Press

### 7.1 Visual Choreography
1. **Stylus Motion (0ms – 400ms)**: A fountain pen/stylus tilts and rapidly draws 3 dynamic cursive lines on a paper sheet.
2. **Laser Verification Scan (400ms – 750ms)**: An amber audit scanline scans across the drawn strokes.
3. **Seal Press (750ms – 1000ms)**: A warm wax stamp drops with elastic squash and stamps a verified seal.
4. **Settled State**: Document rolls into a tied scroll with a green ribbon knot.

---

## Button 8: Create & Add New — Isometric 3D Construction Bricks Assembly

### 8.1 Visual Choreography
1. **Plus Morphing (0ms – 300ms)**: The standard `+` icon spins and splits into 3 isometric geometric building blocks.
2. **Brick Stacking (300ms – 750ms)**: The blocks snap together with mechanical precision and subtle construction spark particles.
3. **Bloom (750ms – 1000ms)**: The stacked blocks blossom outward into a fresh new record card.
4. **Settled State**: Settles with an emerald checkmark and label `"Created Successfully!"`.

---

## Button 9: Upload File — Antigravity Tractor Beam Suction with Cloud Puffs

### 9.1 Visual Choreography
1. **Tractor Beam Emission (0ms – 300ms)**: A soft cyan laser cone shines downward from an open cloud glyph.
2. **Suction Lift (300ms – 800ms)**: The target file card is pulled upward against gravity, shrinking as it ascends into the cloud core.
3. **Cloud Squash & Stretch (800ms – 1000ms)**: The cloud absorbs the file with an elastic squash, emitting 3 miniature puffy vapor rings.
4. **Settled State**: Cloud locks with a padlock checkmark.

---

## Button 10: Archive Record — Filing Cabinet Slide & Mechanical Latch

### 10.1 Visual Choreography
1. **Drawer Ejection (0ms – 350ms)**: An industrial steel filing cabinet drawer glides open toward the user.
2. **Folder Drop (350ms – 700ms)**: A manila folder drops into the hanging file rack.
3. **Latch Slam (700ms – 950ms)**: The drawer kicks firmly shut with a metallic latch click and lock glint.
4. **Settled State**: Front cabinet plate displays an emerald archived badge.

---

## Button 11: Undo & Restore — Reverse Time-Travel Clock & Paper Uncrumple

### 11.1 Visual Choreography
1. **Reverse Time Warp (0ms – 400ms)**: Clock hands spin counter-clockwise at high velocity with rewind sparkles.
2. **Paper Uncrumpling (400ms – 800ms)**: A crumpled paper ball expands outward, smoothing its wrinkles into a pristine flat document.
3. **Settled State**: The restored document illuminates with green checkmark.

---

## Button 12: Security Lock / FaceLock — Biometric Hexagon Sweep & Shackle Snap

### 12.1 Visual Choreography
1. **Biometric Grid Sweep (0ms – 450ms)**: A glowing cyan hexagon grid sweeps vertically over an iris/face silhouette.
2. **Shackle Slam (450ms – 850ms)**: A heavy titanium padlock top shackle slams down into the lock body with electric spark arcs.
3. **Settled State**: Lock glows solid emerald with a verified security shield.

---

## 14. Timing Mathematics & Fluid Looping Curves

Every animated button interaction satisfies the strict mathematical timing relation:

$$\text{Loop Duration } T_{\text{cycle}} \in [800\text{ms}, 1200\text{ms}]$$

$$\text{Total Animation Time } T_{\text{total}} = N \cdot T_{\text{cycle}} + T_{\text{morph}}$$

Where:
- $N = \max\left(1, \left\lceil \frac{T_{\text{api}}}{T_{\text{cycle}}} \right\rceil\right)$
- $T_{\text{morph}} \approx 350\text{ms} - 450\text{ms}$
- **Angular Wheel Velocity**: $\omega = \frac{v_{\text{apparent}}}{r_{\text{wheel}}} = \frac{2\pi}{0.3\text{s}} \approx 20.94\text{ rad/s}$
- **Dust Particle Dispersion**: $x(t) = -v_0 t - \frac{1}{2} a t^2$, with opacity decay $\alpha(t) = 1 - \left(\frac{t}{T_{\text{puff}}}\right)^{1.5}$

---

## 15. Verification & Compliance Checklist

- [ ] **Zero Circle Spinners**: Button NEVER uses generic circular borders or rotating dots.
- [ ] **Delete In-Button Loop**: Delete button displays trash bin entering from right, lid opening, file dropping in, lid closing, and bin exiting in a smooth loop.
- [ ] **Order Truck Loop**: Order/dispatch button displays delivery truck with spinning tyres, moving road dashes, and trailing tyre dust lines.
- [ ] **Live Sync Tower & Text**: Sync/refresh button displays communications tower with blinking apex beacon, radiating RF waves, and live text badge with pulsing orb and signal bars.
- [ ] **Seamless Seams**: If network latency exceeds 3000ms, loops transition without jump cuts or visual jitter.
- [ ] **Minimum 1-Cycle Completion**: If network latency is 50ms, animation continues to 100% of cycle duration before showing success.
- [ ] **Toast Deferral**: Toast notifications fire STRICTLY AFTER the completion morph finishes.

