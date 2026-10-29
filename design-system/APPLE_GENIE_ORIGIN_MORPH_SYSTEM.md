# 🍎 Master Specification: Apple macOS 3D Genie Origin-Morph & Draggable Modal System

**File:** `design-system/APPLE_GENIE_ORIGIN_MORPH_SYSTEM.md`  
**Classification:** Motion Physics, Bi-Directional Origin Morphing & Frictionless Draggable Overlays  
**Related Documents:**
- [`design-system/FRONTEND_DESIGN_RULES.md`](./FRONTEND_DESIGN_RULES.md)
- [`design-system/05_ANIMATIONS_CATALOGUE.md`](./05_ANIMATIONS_CATALOGUE.md)
- [`design-system/03_UI_COMPONENTS_LIBRARY.md`](./03_UI_COMPONENTS_LIBRARY.md)
- [`design-system/09_IMPLEMENTATION_RECIPES.md`](./09_IMPLEMENTATION_RECIPES.md)

---

## 📑 Table of Contents
1. [Architectural Overview & The Apple macOS Genie Phenomenon](#1-architectural-overview--the-apple-macos-genie-phenomenon)
2. [The 3-Phase Lifecycle State Machine](#2-the-3-phase-lifecycle-state-machine)
3. [The Origin Button "Catch & Absorb" Micro-Interaction](#3-the-origin-button-catch--absorb-micro-interaction)
4. [Zero-Bar, Zero-Icon Top-Hold Draggable Mechanics](#4-zero-bar-zero-icon-top-hold-draggable-mechanics)
5. [Mathematical Formulas & 3D Perspective Transformations](#5-mathematical-formulas--3d-perspective-transformations)
6. [Responsive Viewports & Mobile Fallback Matrix](#6-responsive-viewports--mobile-fallback-matrix)
7. [Universal React + Tailwind Engineering Recipe](#7-universal-react--tailwind-engineering-recipe)

---

## 1. Architectural Overview & The Apple macOS Genie Phenomenon

In modern web applications, modal dialogs, popup forms, dropdown menus, and confirmation dialogs frequently feel disconnected from the user's triggering action. They typically jump in from the screen center or fade in statically.

This specification defines the web adaptation of **Apple macOS's iconic "Genie Effect"** (Dock minimize and restore motion), paired with an **Origin-Aware Bi-Directional Morph** and a **Zero-Bar Invisible Top-Hold Draggable** standard.

### Core Visual Principles:
1. **Origin Anchoring**: Every popup or modal knows the exact spatial coordinates (`DOMRect`) of the button or control that triggered it.
2. **Eject & Expand (Open)**: The modal emerges directly from the source button, rapidly unrolling and expanding into a centered dialog in 3D perspective.
3. **Suck & Absorb (Close)**: Upon clicking close (`✕`), cancel, or clicking outside, the modal funnels, twists, and rolls down directly back into the originating button.
4. **Button Tactile Reaction**: As the modal collapses into the button, the button temporarily elevates in 3D space (`translate-y-[-3px]`), glows with ambient light, and plays a tactile "absorb/catch" bounce, visually swallowing the window back into itself.
5. **Zero-Bar, Zero-Icon Top-Hold Draggability**: When open, users can hold and drag the modal by its top header area. **No separate titlebar or drag bar is created, and zero move/grip icons are displayed**. The cursor changes to `cursor-grab` on hover and `cursor-grabbing` on drag, keeping the design sleek and minimalist.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Apple macOS Genie Cycle                         │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   [ Origin Button ] ──(Eject / Unroll 3D)──► [ Centered Modal Form ]   │
│          ▲                                            │                │
│          │                                            │ (Top-Hold      │
│          │                                            ▼  Draggable)    │
│          └──(Suck / Funnel Return)───────── [ Dragged Modal State ]    │
│                 + Button Elevates                                      │
│                 + Absorbs Window                                       │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. The 3-Phase Lifecycle State Machine

The interaction sequence is governed by a strict 3-phase finite state machine:

```
[Phase 1: EJECT] ──────► [Phase 2: SETTLED & DRAGGABLE] ──────► [Phase 3: SUCK & ABSORB]
 Button Clicked           Modal Centered or Moved                 Close Action Triggered
 - Button scales 0.96      - Modal top has cursor-grab             - Button enters 'absorb'
 - Modal emerges from rect - Free movement within window           - Button translates Y -3px
 - Expands to 100% scale   - Close button isolated from drag       - Modal funnels into button
 - 320ms spring bezier     - Clamped within viewport bounds        - Button plays catch snap
```

### State Definitions:
- `IDLE`: Modal unmounted; trigger button in default ready state.
- `EJECTING`: Trigger button bounds captured; modal animates from button geometry ($S_x, S_y, \Delta X, \Delta Y$) to screen center. Duration: `340ms`. Easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- `SETTLED`: Modal is resting at viewport center or current drag coordinates. Top zone listens for pointer-down to initiate drag.
- `DRAGGING`: Modal coordinates update at 60fps via `pointermove` and CSS `translate3d(x, y, 0)`.
- `ABSORBING`: Close triggered. Source button activates absorption style. Modal animates with inverted funnel curve into the button rect. Duration: `280ms`. Easing: `cubic-bezier(0.7, 0, 0.84, 0)`.
- `RESET`: Modal unmounts; button returns to idle state.

---

## 3. The Origin Button "Catch & Absorb" Micro-Interaction

A key differentiator of this architecture is that the trigger button is not a passive bystander. It actively participates in the window's departure and return.

### Visual States of the Origin Button:
1. **Launch Recoil (`ejecting`)**:
   - Button performs a quick physical press: `scale(0.96)`.
   - Produces a subtle outward wave or glowing ring.
2. **Suspended / Active**:
   - While the modal is open, the button retains a subtle active border or muted accent ring indicating it is the parent anchor.
3. **The Absorb Elevation (`absorbing`)**:
   - The instant the modal begins its return journey, the button reacts:
     ```css
     transform: translateY(-3px) scale(1.04);
     box-shadow: 0 0 25px rgba(56, 189, 248, 0.5), 0 8px 16px -4px rgba(0, 0, 0, 0.3);
     border-color: rgba(56, 189, 248, 0.8);
     ```
   - As the modal reaches 0% scale at the button's center, the button catches it with a damped spring snap:
     ```css
     /* Snap sequence */
     transform: translateY(1px) scale(0.95); /* Impact */
     transition: transform 120ms cubic-bezier(0.34, 1.56, 0.64, 1);
     /* Settles back to translateY(0) scale(1) */
     ```

---

## 4. Zero-Bar, Zero-Icon Top-Hold Draggable Mechanics

### The Core Law:
> **Zero Extra Chrome**: Never construct a secondary window titlebar, ribbon, or separate drag bar solely for dragging. Never place move/grip icons (such as 6-dot grips or 4-way arrows) on modern modals.

### The Top-Hold Grip Zone:
- **Grip Target**: The upper padding / header area of the modal (top `48px` to `64px` from the upper border).
- **Cursor State**:
  - Hovering over top area: `cursor-grab`.
  - Holding and dragging: `cursor-grabbing`.
  - Body text selection disabled: `select-none` during drag.
- **Interactive Element Isolation**:
  - The top area frequently contains the '✕' close button, action buttons, tabs, or input controls.
  - The drag handler must strictly verify:
    ```typescript
    if ((e.target as HTMLElement).closest('button, a, input, textarea, select, [data-no-drag]')) {
      return; // Do not initiate drag
    }
    ```
- **Strict Viewport Boundary Clamping**:
  - The modal can never be dragged off-screen. Position is clamped continuously:
    $$\text{clampX} = \max(8, \min(X, \text{window.innerWidth} - \text{modalWidth} - 8))$$
    $$\text{clampY} = \max(8, \min(Y, \text{window.innerHeight} - \text{modalHeight} - 8))$$
- **Re-Open Position Reset**:
  - If a dragged modal is closed, opening it again resets its origin to the new/current trigger button position and smoothly unfolds back to screen center.

---

## 5. Mathematical Formulas & 3D Perspective Transformations

Let:
- $(B_x, B_y)$ = Center coordinates of the trigger button viewport rect.
- $(B_w, B_h)$ = Width and height of the trigger button.
- $(M_x, M_y)$ = Target center coordinates of the modal dialog.
- $(M_w, M_h)$ = Width and height of the modal dialog.

### Delta Offsets:
$$\Delta X = B_x - M_x$$
$$\Delta Y = B_y - M_y$$

### Scale Ratios:
$$S_x = \frac{B_w}{M_w}, \quad S_y = \frac{B_h}{M_h}$$

### 3D Perspective Matrix (Genie Funnel):
To replicate the 3D roll and bottom-weighted narrowing of the Genie effect:
```css
/* Start state (at button) */
transform: 
  translate3d(var(--delta-x), var(--delta-y), 0)
  scale3d(var(--scale-x), var(--scale-y), 1)
  perspective(1200px)
  rotateX(14deg);
opacity: 0.1;
filter: blur(4px);

/* End state (at center) */
transform: 
  translate3d(0, 0, 0)
  scale3d(1, 1, 1)
  perspective(1200px)
  rotateX(0deg);
opacity: 1;
filter: blur(0px);
```

---

## 6. Responsive Viewports & Mobile Fallback Matrix

| Viewport Width | Visual Presentation | Dragging Mechanics | Genie Physics |
| :--- | :--- | :--- | :--- |
| **Desktop (`>= 1024px`)** | Centered Floating Modal with high glassmorphic depth | Full Zero-Bar Top-Hold Draggable across entire screen | Full 3D Genie funnel + button absorb reaction |
| **Tablet (`768px - 1023px`)** | Centered Modal Dialog | Top-Hold Draggable with strict viewport edge padding (`16px`) | Full 3D Genie funnel + button absorb reaction |
| **Mobile (`< 768px`)** | Bottom Sheet Drawer or Centered Modal with fixed margins | Dragging disabled to prevent scrolling conflicts (touch swipe-down to dismiss enabled) | Smooth scale/origin emergence from button; simplifies to vertical spring roll |

---

## 7. Universal React + Tailwind Engineering Recipe

Save this single, production-grade file as `components/ui/AppleGenieModal.tsx`:

```tsx
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

export interface OriginRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AppleGenieModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRect: OriginRect | null;
  onAbsorbChange?: (isAbsorbing: boolean) => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: string; // e.g. 'max-w-lg', 'max-w-2xl'
  className?: string;
}

export function AppleGenieModal({
  isOpen,
  onClose,
  triggerRect,
  onAbsorbChange,
  title,
  children,
  maxWidth = 'max-w-lg',
  className = '',
}: AppleGenieModalProps) {
  const [mounted, setMounted] = useState(false);
  const [animState, setAnimState] = useState<'closed' | 'opening' | 'open' | 'closing'>('closed');
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number } | null>(null);

  // Client-side portal mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Open/Close Animation State Machine
  useEffect(() => {
    if (isOpen) {
      setPosition(null); // Reset to center
      setAnimState('opening');
      const timer = setTimeout(() => setAnimState('open'), 350);
      return () => clearTimeout(timer);
    } else if (animState === 'open') {
      setAnimState('closing');
      onAbsorbChange?.(true);
      const timer = setTimeout(() => {
        setAnimState('closed');
        onAbsorbChange?.(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && animState === 'open') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [animState, onClose]);

  // Zero-Bar Top-Hold Drag Handlers
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Exclude clicks on interactive children (close button, links, inputs)
    const target = e.target as HTMLElement;
    if (target.closest('button, a, input, textarea, select, [data-no-drag]')) {
      return;
    }

    // Only allow left click
    if (e.button !== 0 || !modalRef.current) return;

    const rect = modalRef.current.getBoundingClientRect();
    const currentX = position ? position.x : rect.left;
    const currentY = position ? position.y : rect.top;

    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: currentX,
      startY: currentY,
    };

    setIsDragging(true);
    modalRef.current.setPointerCapture(e.pointerId);
  }, [position]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current || !modalRef.current) return;

    const deltaX = e.clientX - dragStartRef.current.mouseX;
    const deltaY = e.clientY - dragStartRef.current.mouseY;

    const modalWidth = modalRef.current.offsetWidth;
    const modalHeight = modalRef.current.offsetHeight;

    // Viewport clamping
    const rawX = dragStartRef.current.startX + deltaX;
    const rawY = dragStartRef.current.startY + deltaY;

    const clampedX = Math.max(12, Math.min(rawX, window.innerWidth - modalWidth - 12));
    const clampedY = Math.max(12, Math.min(rawY, window.innerHeight - modalHeight - 12));

    setPosition({ x: clampedX, y: clampedY });
  }, [isDragging]);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging && modalRef.current) {
      setIsDragging(false);
      dragStartRef.current = null;
      try {
        modalRef.current.releasePointerCapture(e.pointerId);
      } catch {
        // Fallback for older browsers
      }
    }
  }, [isDragging]);

  if (!mounted || animState === 'closed') return null;

  // Calculate Morph Origin Variables
  let transformStyle: React.CSSProperties = {};
  if (triggerRect && (animState === 'opening' || animState === 'closing')) {
    const targetCenterX = position ? position.x + 250 : window.innerWidth / 2;
    const targetCenterY = position ? position.y + 180 : window.innerHeight / 2;

    const triggerCenterX = triggerRect.x + triggerRect.width / 2;
    const triggerCenterY = triggerRect.y + triggerRect.height / 2;

    const deltaX = triggerCenterX - targetCenterX;
    const deltaY = triggerCenterY - targetCenterY;

    const scaleX = Math.max(0.08, triggerRect.width / 500);
    const scaleY = Math.max(0.08, triggerRect.height / 350);

    if (animState === 'opening') {
      transformStyle = {
        '--genie-delta-x': `${deltaX}px`,
        '--genie-delta-y': `${deltaY}px`,
        '--genie-scale-x': `${scaleX}`,
        '--genie-scale-y': `${scaleY}`,
        animation: 'appleGenieEject 340ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
      } as React.CSSProperties;
    } else if (animState === 'closing') {
      transformStyle = {
        '--genie-delta-x': `${deltaX}px`,
        '--genie-delta-y': `${deltaY}px`,
        '--genie-scale-x': `${scaleX}`,
        '--genie-scale-y': `${scaleY}`,
        animation: 'appleGenieSuck 280ms cubic-bezier(0.7, 0, 0.84, 0) forwards',
      } as React.CSSProperties;
    }
  }

  const isPositioned = position !== null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with Blur */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300 ${
          animState === 'closing' ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          ...(isPositioned
            ? {
                position: 'fixed',
                left: `${position.x}px`,
                top: `${position.y}px`,
                margin: 0,
              }
            : {}),
          ...transformStyle,
        }}
        className={`relative w-full ${maxWidth} rounded-2xl bg-slate-900/90 dark:bg-slate-900/95 border border-slate-700/60 shadow-2xl shadow-sky-500/10 backdrop-blur-2xl text-slate-100 overflow-hidden ${
          isDragging ? 'shadow-glow-sky cursor-grabbing select-none' : ''
        } ${className}`}
      >
        {/* Top-Hold Drag Zone (Integrated Invisible Header - No separate bar, no icons!) */}
        <div className="relative px-6 pt-5 pb-3 flex items-center justify-between cursor-grab active:cursor-grabbing select-none border-b border-slate-800/80">
          <div className="flex-1">
            {typeof title === 'string' ? (
              <h3 className="text-lg font-bold text-slate-100 tracking-tight">{title}</h3>
            ) : (
              title
            )}
          </div>
          {/* Close Button - Automatically excluded from drag */}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 cursor-default">
          {children}
        </div>
      </div>

      {/* Inline Apple Genie Keyframes */}
      <style jsx global>{`
        @keyframes appleGenieEject {
          0% {
            opacity: 0.15;
            transform: translate3d(var(--genie-delta-x), var(--genie-delta-y), 0) scale3d(var(--genie-scale-x), var(--genie-scale-y), 1) perspective(1000px) rotateX(12deg);
            filter: blur(4px);
          }
          60% {
            opacity: 1;
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale3d(1, 1, 1) perspective(1000px) rotateX(0deg);
            filter: blur(0px);
          }
        }
        @keyframes appleGenieSuck {
          0% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale3d(1, 1, 1) perspective(1000px) rotateX(0deg);
            filter: blur(0px);
          }
          40% {
            opacity: 0.9;
            filter: blur(1px);
          }
          100% {
            opacity: 0;
            transform: translate3d(var(--genie-delta-x), var(--genie-delta-y), 0) scale3d(var(--genie-scale-x), var(--genie-scale-y), 1) perspective(1000px) rotateX(14deg);
            filter: blur(5px);
          }
        }
      `}</style>
    </div>,
    document.body
  );
}

/**
 * Hook to manage trigger origin capture and absorb state
 */
export function useOriginMorph() {
  const [triggerRect, setTriggerRect] = useState<OriginRect | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAbsorbing, setIsAbsorbing] = useState(false);
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);

  const openFromElement = useCallback((element: HTMLElement | null) => {
    if (element) {
      const rect = element.getBoundingClientRect();
      setTriggerRect({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      });
    }
    setIsOpen(true);
  }, []);

  const openFromEvent = useCallback((e: React.MouseEvent<HTMLElement>) => {
    openFromElement(e.currentTarget);
  }, [openFromElement]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    triggerRect,
    isAbsorbing,
    setIsAbsorbing,
    openFromElement,
    openFromEvent,
    close,
    triggerButtonRef,
    // Helper classes to apply to the origin trigger button
    buttonAbsorbProps: {
      className: isAbsorbing
        ? 'transition-all duration-300 -translate-y-1 scale-105 shadow-glow-sky border-sky-400'
        : 'transition-all duration-200',
    },
  };
}
```
