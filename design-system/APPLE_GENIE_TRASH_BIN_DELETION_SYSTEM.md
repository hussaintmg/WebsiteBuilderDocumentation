# 🗑️ Master Specification: Screen-Level Apple Genie Trash Bin & 3D Vacuum Deletion System

**File:** `design-system/APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md`  
**Classification:** Motion Physics, Screen-Coordinate Portals & Kinetic Vacuum Deletion  
**Related Documents:**
- [`design-system/APPLE_GENIE_ORIGIN_MORPH_SYSTEM.md`](./APPLE_GENIE_ORIGIN_MORPH_SYSTEM.md)
- [`modules/DATA_TABLE_AND_CARDS_SYSTEM.md`](../modules/DATA_TABLE_AND_CARDS_SYSTEM.md)
- [`design-system/03_UI_COMPONENTS_LIBRARY.md`](./03_UI_COMPONENTS_LIBRARY.md)
- [`design-system/09_IMPLEMENTATION_RECIPES.md`](./09_IMPLEMENTATION_RECIPES.md)

---

## 📑 Table of Contents
1. [The Problem: Why Table Rows Get Trapped & Clipped](#1-the-problem-why-table-rows-get-trapped--clipped)
2. [The Screen-Level Viewport Portal Architecture](#2-the-screen-level-viewport-portal-architecture)
3. [The Kinetic Trash Bin Entrance & Motorized Lid](#3-the-kinetic-trash-bin-entrance--motorized-lid)
4. [The 3D Genie Vacuum Siphon & Trajectory Physics](#4-the-3d-genie-vacuum-siphon--trajectory-physics)
5. [The Physical Lid Slam, Impact Haptics & Auto-Dismiss](#5-the-physical-lid-slam-impact-haptics--auto-dismiss)
6. [Table & Card Glide-Up Re-flow (`layout` prop)](#6-table--card-glide-up-re-flow-layout-prop)
7. [Production React Component: `GenieTrashBinPortal.tsx`](#7-production-react-component-genietrashbinportaltsx)
8. [Production React Hook: `useGenieTrashDelete.ts`](#8-production-react-hook-usegenietrashdeletets)

---

## 1. The Problem: Why Table Rows Get Trapped & Clipped

In standard web applications, when a user deletes a table row or card:
- Table elements (`<tr>`, `<td>`, `<tbody>`) live inside parent wrapper `<div>` elements with:
  ```css
  overflow: hidden;
  overflow-x: auto; /* Required for table horizontal scrolling on mobile/desktop */
  position: relative;
  ```
- **The DOM Overflow Trap**: Any CSS transform or animation applied directly to a table row cannot escape the bounding box of the table container. The moment a row tries to translate toward the screen edge, it gets violently clipped and disappears halfway across the screen.
- Furthermore, standard table components delete items abruptly with zero physical feedback, leaving users disoriented about whether an item was deleted or if the UI lagged.

### The Solution: Screen-Coordinate Elevation
1. Before deleting, we capture the exact screen coordinates of the deleting rows/cards via `getBoundingClientRect()`.
2. We immediately clone the item into a **Fixed Screen-Level Portal Overlay** (`fixed inset-0 pointer-events-none z-[99999]`), situated directly on `document.body`.
3. In the underlying table, the real row collapses its height to `0` smoothly.
4. The clone in the screen-level portal is completely free from container clipping and flies across the full viewport into the open mouth of the animated trash bin!

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Screen Viewport (100vw x 100vh)                 │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   [ Table Container (overflow: hidden) ]                               │
│   ┌────────────────────────────────┐                                   │
│   │ Row 1 (Normal)                 │                                   │
│   │ Row 2 (Ghosted -> Height: 0)   │ ──(Clone Elevates to Portal)──┐   │
│   │ Row 3 (Normal)                 │                               │   │
│   └────────────────────────────────┘                               │   │
│                                                                    ▼   │
│                   ══════ FIXED VIEWPORT PORTAL (z-[99999]) ══════      │
│                   Flying Clone Row                                     │
│                     │                                                  │
│                     │ (Curved Bezier Trajectory)                       │
│                     │                                                  │
│                     ▼ (3D Genie Siphon: scaleX: 0.1, rotateX: 60deg)   │
│                  ┌──────────────────────┐                              │
│                  │  /\  Motorized Lid   │                              │
│                  │ ┌──┐ (Swings Open)   │                              │
│                  │ │🌀│ Glowing Vortex │ <── [ Kinetic Trash Bin ]    │
│                  │ └──┘ Metallic Can    │     (Rushes in from right)   │
│                  └──────────────────────┘                              │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. The Screen-Level Viewport Portal Architecture

The deletion lifecycle is governed by an orchestrated multi-phase state machine:

```
[1. User Triggers Delete]
         │
         ▼
[2. Snapshot DOMRects & Mount Clones into Screen Portal]
         │
         ▼
[3. Trash Bin Rushes In from Right Edge (Kinetic Spring Entrance)]
         │
         ▼
[4. Motorized Bin Lid Pops Open (-55deg) revealing Cyan Vortex]
         │
         ▼
[5. Flying Clones Sucked into Bin Aperture via 3D Genie Vacuum Physics]
         │
         ▼
[6. Bin Lid Slams Shut with Elastic Bounce & Counter Pill Sparks]
         │
         ▼
[7. Table Rows Glide Upwards smoothly (layout spring FLIP)]
         │
         ▼
[8. Bin Dismisses after 500ms; Mutate Context Array & Unmount Portal]
```

---

## 3. The Kinetic Trash Bin Entrance & Motorized Lid

The trash bin must NOT fade in statically. It rushes onto the screen like a rapid interceptor:

### 1. Entrance Physics (`x: 220 -> 0`)
- **Initial State**: Situated completely off the right edge (`x: 220, rotate: 12deg, opacity: 0`).
- **Spring Arrival**: Enters using a high-energy spring with overshoot:
  ```tsx
  transition: { type: "spring", stiffness: 280, damping: 20, mass: 0.9 }
  ```
- **Visual Appearance**:
  - Frosted glass & obsidian body: `bg-neutral-900/90 border border-white/20 backdrop-blur-xl shadow-2xl shadow-cyan-500/20`.
  - Glowing laser rim: `border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.35)]`.
  - Recycled / Biohazard neon glyph embossed on the front can face.

### 2. Motorized Hinged Lid
- When the bin reaches its resting position, the lid automatically swings open:
  - Pivot point: `origin-bottom-right` or `origin-top-left`.
  - Angle: `rotate: -55deg, y: -8px`.
  - Spring transition: `type: "spring", stiffness: 350, damping: 15`.
- Inside the bin, an ambient glowing cyan vortex (`animate-pulse bg-cyan-500/30 blur-md`) illuminates the opening, ready to receive incoming items.

---

## 4. The 3D Genie Vacuum Siphon & Trajectory Physics

As each deleted row/card takes flight from its initial table coordinate `(startX, startY)` to the target bin opening `(binX, binY)`:

### Mathematical Trajectory & Timing
1. **Curved Bezier Flight Path**:
   - The flying clone translates across the screen toward `(binX, binY - 20)`.
   - Duration: `450ms - 550ms`.
   - Easing: `cubic-bezier(0.25, 1, 0.5, 1)` for flight, accelerating into `cubic-bezier(0.7, 0, 0.84, 0)` at the mouth.

2. **The 3D Genie Vacuum Deform**:
   As the element nears the last 25% of its flight:
   - **Horizontal Compression**: `scaleX: 0.1` (squeezed to fit inside the can mouth).
   - **Vertical Flattening**: `scaleY: 0.05`.
   - **Perspective Tilt**: `perspective(600px) rotateX(65deg) rotateZ(12deg)`.
   - **Accelerating Drop**: Sucked vertically down into the can center: `y: binY + 40, opacity: 0`.

3. **Impact Spark Burst**:
   The instant the element disappears into the bin, a subtle particle puff or cyan glow ripple pulses at the can aperture (`scale: [1, 1.25, 1], opacity: [0.8, 1, 0]`).

---

## 5. The Physical Lid Slam, Impact Haptics & Auto-Dismiss

Once all items have vanished inside:

1. **The Lid Slam**:
   - The lid snaps shut with physical elasticity:
     ```tsx
     animate={{ rotate: 0, y: 0 }}
     transition={{ type: "spring", stiffness: 500, damping: 12 }}
     ```
2. **Elastic Body Shake**:
   - The can body executes a tactile bounce:
     ```tsx
     animate={{ y: [0, 4, -2, 1, 0] }}
     transition={{ duration: 0.25, ease: "easeOut" }}
     ```
3. **Floating Counter Badge**:
   - A glowing chip appears on the bin showing `"-N Deleted"` (e.g. `"-3"` in glowing rose/cyan).
4. **Auto-Dismiss**:
   - The bin pauses for `500ms` so the user experiences the physical satisfaction.
   - It then accelerates back off-screen to the right (`x: 240, opacity: 0`) and unmounts cleanly from the DOM.

---

## 6. Table & Card Glide-Up Re-flow (`layout` prop)

While the flying clones are in the portal:
1. In the underlying `<DataTable>` or `<CardsGrid>`, the deleting item's element executes:
   ```tsx
   <motion.tr
     layout
     initial={false}
     animate={{ opacity: 0, height: 0 }}
     transition={{ duration: 0.35, ease: "easeInOut" }}
     className="overflow-hidden"
   >
   ```
2. **Smooth FLIP Re-flow**:
   All rows beneath the deleted items slide upward simultaneously via Framer Motion's hardware-accelerated `layout` calculation, eliminating jarring white flashes or jumpy scroll positions.

---

## 7. Production React Component: `GenieTrashBinPortal.tsx`

```tsx
"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Sparkles, CheckCircle2 } from "lucide-react";

export interface DeletingItemSnapshot {
  id: string;
  rect: DOMRect;
  renderPreview: () => React.ReactNode;
}

export interface GenieTrashBinPortalProps {
  isActive: boolean;
  items: DeletingItemSnapshot[];
  onAnimationComplete: () => void;
}

export function GenieTrashBinPortal({
  isActive,
  items,
  onAnimationComplete
}: GenieTrashBinPortalProps) {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"ENTERING" | "OPEN" | "SIPHONING" | "SLAM" | "EXITING">("ENTERING");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isActive || items.length === 0) {
      setPhase("ENTERING");
      return;
    }

    // Step 1: Bin enters and opens lid
    const timer1 = setTimeout(() => {
      setPhase("OPEN");
    }, 280);

    // Step 2: Siphon clones into the bin
    const timer2 = setTimeout(() => {
      setPhase("SIPHONING");
    }, 450);

    // Step 3: Slam lid shut with impact
    const timer3 = setTimeout(() => {
      setPhase("SLAM");
    }, 950);

    // Step 4: Dismiss bin & complete
    const timer4 = setTimeout(() => {
      setPhase("EXITING");
    }, 1500);

    const timer5 = setTimeout(() => {
      onAnimationComplete();
    }, 1850);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [isActive, items, onAnimationComplete]);

  if (!mounted || !isActive) return null;

  // Screen coordinates for the Trash Can Target (Bottom-Right fixed dock)
  const targetX = typeof window !== "undefined" ? window.innerWidth - 140 : 1200;
  const targetY = typeof window !== "undefined" ? window.innerHeight - 180 : 700;

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* 1. Flying Elevated Clones */}
      <AnimatePresence>
        {phase === "SIPHONING" &&
          items.map((item, index) => {
            const startX = item.rect.left;
            const startY = item.rect.top;
            const deltaX = targetX - startX;
            const deltaY = targetY - startY;

            return (
              <motion.div
                key={item.id}
                initial={{
                  x: startX,
                  y: startY,
                  width: item.rect.width,
                  height: item.rect.height,
                  scale: 1,
                  opacity: 0.95,
                  rotateX: 0,
                  rotateZ: 0
                }}
                animate={{
                  x: [startX, startX + deltaX * 0.6, targetX],
                  y: [startY, startY - 40, targetY],
                  scaleX: [1, 0.6, 0.12],
                  scaleY: [1, 0.4, 0.05],
                  rotateX: [0, 30, 65],
                  rotateZ: [0, -8, 15],
                  opacity: [0.95, 0.85, 0]
                }}
                transition={{
                  duration: 0.52,
                  delay: index * 0.08,
                  ease: [0.35, 0.05, 0.85, 0.95]
                }}
                style={{
                  position: "fixed",
                  left: 0,
                  top: 0,
                  transformOrigin: "center bottom",
                  boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 25px rgba(239, 68, 68, 0.25)"
                }}
                className="rounded-xl border border-rose-500/40 bg-neutral-900/90 backdrop-blur-xl overflow-hidden pointer-events-none"
              >
                {item.renderPreview()}
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* 2. Kinetic Animated Trash Bin (Rushes from right screen edge) */}
      <motion.div
        initial={{ x: 260, y: targetY, opacity: 0, rotate: 14 }}
        animate={
          phase === "EXITING"
            ? { x: 280, opacity: 0, rotate: 10 }
            : {
                x: targetX - 30,
                y: phase === "SLAM" ? [targetY, targetY + 6, targetY - 2, targetY] : targetY,
                opacity: 1,
                rotate: 0
              }
        }
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className="fixed left-0 top-0 pointer-events-auto flex flex-col items-center select-none"
      >
        {/* Count Pill */}
        <AnimatePresence>
          {(phase === "SIPHONING" || phase === "SLAM") && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: -12, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              className="mb-2 flex items-center gap-1.5 rounded-full border border-rose-500/40 bg-rose-500/20 px-3 py-0.5 text-xs font-bold text-rose-300 backdrop-blur-md shadow-lg shadow-rose-500/20"
            >
              <Trash2 className="h-3 w-3 text-rose-400" />
              <span>-{items.length} Deleted</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trash Can Apparatus */}
        <div className="relative flex flex-col items-center">
          {/* Motorized Hinged Lid */}
          <motion.div
            style={{ transformOrigin: "bottom right" }}
            animate={
              phase === "OPEN" || phase === "SIPHONING"
                ? { rotate: -55, y: -8, x: -4 }
                : { rotate: 0, y: 0, x: 0 }
            }
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 16
            }}
            className="z-20 h-4 w-24 rounded-t-lg border border-white/20 bg-gradient-to-b from-neutral-700 to-neutral-800 shadow-md"
          >
            {/* Lid Handle */}
            <div className="mx-auto h-1.5 w-6 -translate-y-1.5 rounded-t-md bg-neutral-600 border-t border-white/20" />
          </motion.div>

          {/* Siphon Vortex Portal Glow (Inside Opening) */}
          <div className="relative -mt-1 h-28 w-20 rounded-b-2xl border border-white/15 bg-gradient-to-b from-neutral-800/95 via-neutral-900/95 to-black/95 p-2 backdrop-blur-2xl shadow-2xl shadow-black/80 flex flex-col items-center justify-between">
            {/* Vacuum Portal Glow Ring */}
            <div
              className={`absolute inset-x-2 top-0 h-4 rounded-full transition-all duration-300 ${
                phase === "OPEN" || phase === "SIPHONING"
                  ? "bg-cyan-500/40 blur-sm shadow-[0_0_18px_rgba(34,211,238,0.7)]"
                  : "bg-transparent"
              }`}
            />

            {/* Neon Recycle / Biohazard Glyph */}
            <div className="my-auto flex flex-col items-center justify-center gap-1 text-neutral-500">
              <motion.div
                animate={
                  phase === "SIPHONING"
                    ? { rotate: 360, scale: [1, 1.2, 1] }
                    : { rotate: 0, scale: 1 }
                }
                transition={{ duration: 1.5, repeat: phase === "SIPHONING" ? Infinity : 0, ease: "linear" }}
              >
                <Trash2
                  className={`h-7 w-7 transition-colors duration-300 ${
                    phase === "SIPHONING"
                      ? "text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]"
                      : "text-neutral-500"
                  }`}
                />
              </motion.div>
              <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400">
                VACUUM
              </span>
            </div>

            {/* Vertical Fluted Grooves (Metallic Can Effect) */}
            <div className="flex w-full justify-around px-1 opacity-25">
              <div className="h-6 w-0.5 bg-white/40 rounded-full" />
              <div className="h-6 w-0.5 bg-white/40 rounded-full" />
              <div className="h-6 w-0.5 bg-white/40 rounded-full" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
```

---

## 8. Production React Hook: `useGenieTrashDelete.ts`

```tsx
"use client";

import { useState, useCallback } from "react";
import { DeletingItemSnapshot } from "./GenieTrashBinPortal";

export interface DeleteRequestItem {
  id: string;
  element?: HTMLElement | null;
  previewNode?: React.ReactNode;
}

export function useGenieTrashDelete() {
  const [isActive, setIsActive] = useState(false);
  const [snapshots, setSnapshots] = useState<DeletingItemSnapshot[]>([]);
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const [completionResolver, setCompletionResolver] = useState<(() => void) | null>(null);

  /**
   * Execute Genie Vacuum Deletion
   * @param items Items to delete with their DOM element references
   * @param onSettled Callback fired when items are fully inside bin and state should mutate
   */
  const triggerGenieDelete = useCallback(
    (items: DeleteRequestItem[], onSettled: (deletedIds: string[]) => void | Promise<void>) => {
      const ids = items.map((i) => i.id);
      setPendingIds(ids);

      // Snapshot DOMRects from live DOM elements
      const capturedSnapshots: DeletingItemSnapshot[] = items
        .map((item) => {
          if (!item.element) return null;
          const rect = item.element.getBoundingClientRect();
          return {
            id: item.id,
            rect,
            renderPreview: () => item.previewNode || <div className="p-4 text-xs font-medium text-white">{item.id}</div>
          };
        })
        .filter(Boolean) as DeletingItemSnapshot[];

      setSnapshots(capturedSnapshots);
      setIsActive(true);

      // Return a promise that resolves when the animation cycle completes
      return new Promise<void>((resolve) => {
        setCompletionResolver(() => async () => {
          await onSettled(ids);
          setIsActive(false);
          setSnapshots([]);
          setPendingIds([]);
          resolve();
        });
      });
    },
    []
  );

  const handleAnimationComplete = useCallback(() => {
    if (completionResolver) {
      completionResolver();
      setCompletionResolver(null);
    }
  }, [completionResolver]);

  return {
    isActive,
    snapshots,
    pendingIds,
    triggerGenieDelete,
    handleAnimationComplete
  };
}
```

---

## 9. Integration Recipe: Data Table & Cards Grid

```tsx
"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GenieTrashBinPortal } from "@/components/ui/GenieTrashBinPortal";
import { useGenieTrashDelete } from "@/hooks/useGenieTrashDelete";

export function OrdersTable({ orders, onDeleteOrder }: { orders: any[]; onDeleteOrder: (ids: string[]) => Promise<void> }) {
  const rowRefs = useRef<Map<string, HTMLTableRowElement>>(new Map());
  const { isActive, snapshots, pendingIds, triggerGenieDelete, handleAnimationComplete } = useGenieTrashDelete();

  const handleDelete = async (orderId: string) => {
    const el = rowRefs.current.get(orderId);
    await triggerGenieDelete(
      [
        {
          id: orderId,
          element: el,
          previewNode: (
            <div className="p-3 text-xs text-white font-mono flex items-center justify-between">
              <span>Order #{orderId.slice(-6)}</span>
              <span className="text-rose-400 font-semibold">Deleting...</span>
            </div>
          )
        }
      ],
      async (ids) => {
        await onDeleteOrder(ids);
      }
    );
  };

  return (
    <>
      <table className="w-full text-left">
        <tbody>
          <AnimatePresence>
            {orders.map((order) => {
              const isDeleting = pendingIds.includes(order.id);
              return (
                <motion.tr
                  key={order.id}
                  layout
                  ref={(node) => {
                    if (node) rowRefs.current.set(order.id, node);
                    else rowRefs.current.delete(order.id);
                  }}
                  animate={isDeleting ? { opacity: 0, height: 0 } : { opacity: 1, height: "auto" }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className={isDeleting ? "pointer-events-none" : "hover:bg-white/5"}
                >
                  <td className="p-4">{order.id}</td>
                  <td className="p-4">{order.customer}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="px-3 py-1 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </tbody>
      </table>

      {/* Screen-Level Genie Portal */}
      <GenieTrashBinPortal
        isActive={isActive}
        items={snapshots}
        onAnimationComplete={handleAnimationComplete}
      />
    </>
  );
}
```

