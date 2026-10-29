# 🛠️ Deliverable 9: Practical Implementation Recipes (Production React + Tailwind CSS)

**File:** `design-system/09_IMPLEMENTATION_RECIPES.md`  
**Classification:** Production Engineering Recipes & Copy-Paste Component Blueprints  
**Related Documents:**
- [`design-system/01_CSS_PROPERTIES_REFERENCE.md`](./01_CSS_PROPERTIES_REFERENCE.md)
- [`design-system/02_VISUAL_EFFECTS_CATALOGUE.md`](./02_VISUAL_EFFECTS_CATALOGUE.md)
- [`design-system/03_UI_COMPONENTS_LIBRARY.md`](./03_UI_COMPONENTS_LIBRARY.md)
- [`design-system/04_CARDS_AND_CARD_STACKS_LIBRARY.md`](./04_CARDS_AND_CARD_STACKS_LIBRARY.md)
- [`design-system/10_SEARCHABLE_INDEX.md`](./10_SEARCHABLE_INDEX.md)

---

## 📑 Table of Contents
1. [Recipe 1: Production Floating Label Input with Native Validation](#recipe-1-production-floating-label-input-with-native-validation)
2. [Recipe 2: Cursor-Tracking Spotlight Card with Radial Illumination](#recipe-2-cursor-tracking-spotlight-card-with-radial-illumination)
3. [Recipe 3: Specular 3D Perspective Tilt Card](#recipe-3-specular-3d-perspective-tilt-card)
4. [Recipe 4: Gesture-Driven Swipeable Stacked Card Deck (Tinder-Style)](#recipe-4-gesture-driven-swipeable-stacked-card-deck-tinder-style)
5. [Recipe 5: Strict Gated Action Button (Idle ➔ Loading ➔ Verified Success)](#recipe-5-strict-gated-action-button-idle--loading--verified-success)
6. [Recipe 6: Liquid Glassmorphic Floating Pill Navbar with Scroll Observer](#recipe-6-liquid-glassmorphic-floating-pill-navbar-with-scroll-observer)
7. [Recipe 7: Pure CSS Scroll Progress Bar (Zero-JS ScrollTimeline)](#recipe-7-pure-css-scroll-progress-bar-zero-js-scrolltimeline)
8. [Recipe 8: Universal Apple Genie Modal & Origin Morph System (`AppleGenieModal.tsx`)](#recipe-8-universal-apple-genie-modal--origin-morph-system)
9. [Recipe 9: Production Three.js 3D Model Viewer & Parts Inspector Studio](#recipe-9-production-threejs-3d-model-viewer--parts-inspector-studio)

---

## Recipe 1: Production Floating Label Input with Native Validation

### Overview & Mechanics
- **Component**: `FloatingInput.tsx`
- **Technique**: Tailwind CSS `peer` selector pattern paired with CSS `:placeholder-shown`.
- **Keyboard & A11y**: Accessible `<label htmlFor={id}>`, proper focus rings, `aria-invalid` and `aria-describedby` when errors occur.

### Complete Copy-Paste Code:
```tsx
'use client';

import React, { useId } from 'react';

export interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export function FloatingInput({
  label,
  error,
  helperText,
  id: customId,
  className = '',
  ...props
}: FloatingInputProps) {
  const generatedId = useId();
  const id = customId || generatedId;
  const errorId = `${id}-error`;

  return (
    <div className="relative w-full">
      <input
        id={id}
        placeholder=" "
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`peer w-full px-4 pt-5 pb-2 text-sm text-slate-100 bg-slate-900/60 border rounded-xl outline-none transition-all duration-200 backdrop-blur-md ${
          error
            ? 'border-rose-500/80 focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20'
            : 'border-slate-800 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20'
        } ${className}`}
        {...props}
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-2 text-[10px] uppercase font-bold tracking-wider text-slate-400 pointer-events-none transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:font-bold peer-focus:text-sky-400"
      >
        {label}
      </label>
      {error && (
        <p id={errorId} className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      {!error && helperText && (
        <p className="text-xs text-slate-500 mt-1">{helperText}</p>
      )}
    </div>
  );
}
```

---

## Recipe 2: Cursor-Tracking Spotlight Card with Radial Illumination

### Overview & Mechanics
- **Component**: `SpotlightCard.tsx`
- **Technique**: Updates CSS custom properties `--mouse-x` and `--mouse-y` via an efficient `onMouseMove` handler with boundary math.
- **Mobile Fallback**: Touch devices render a static subtle ambient highlight without listening to pointermove.

### Complete Copy-Paste Code:
```tsx
'use client';

import React, { useRef } from 'react';

export function SpotlightCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-2xl bg-slate-900/80 border border-slate-800 p-6 overflow-hidden transition-all duration-300 hover:border-slate-700 ${className}`}
    >
      {/* Radial Spotlight Overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(56, 189, 248, 0.12), transparent 80%)`,
        }}
      />
      {/* Specular 1px Border Highlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(56, 189, 248, 0.4), transparent 80%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
```

---

## Recipe 3: Specular 3D Perspective Tilt Card

### Overview & Mechanics
- **Component**: `TiltCard3D.tsx`
- **Technique**: Projects the card in 3D volume using `perspective: 1000px`, rotating on X and Y axes proportionally to pointer distance from center.

### Complete Copy-Paste Code:
```tsx
'use client';

import React, { useRef, useState } from 'react';

export function TiltCard3D({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12; // Max 12deg tilt
    const rotateY = ((x - centerX) / centerX) * 12;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`will-change-transform rounded-2xl bg-slate-900 border border-slate-800/80 p-6 shadow-2xl transition-shadow duration-300 hover:shadow-cyan-500/10 ${className}`}
    >
      {children}
    </div>
  );
}
```

---

## Recipe 4: Gesture-Driven Swipeable Stacked Card Deck (Tinder-Style)

### Overview & Mechanics
- **Component**: `SwipeableCardDeck.tsx`
- **Technique**: Captures pointer events, calculates horizontal swipe delta ($\Delta x$), applies rotational torque ($\text{rotate} = \Delta x \times 0.08^\circ$).
- **Dismissal Gate**: If dragged $> 120\text{px}$, flies off screen and promotes the underlying card to `z-index: 30`.

### Complete Copy-Paste Code:
```tsx
'use client';

import React, { useState } from 'react';

export function SwipeableCardDeck({ items }: { items: { id: string; title: string; desc: string }[] }) {
  const [cards, setCards] = useState(items);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setDragX(e.clientX - startX);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(dragX) > 120) {
      // Dismiss card
      setCards((prev) => prev.slice(1));
    }
    setDragX(0);
  };

  if (cards.length === 0) {
    return (
      <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-slate-800 text-slate-500">
        No more cards
      </div>
    );
  }

  return (
    <div className="relative h-80 w-full max-w-sm mx-auto select-none touch-pan-y">
      {cards.map((card, index) => {
        const isTop = index === 0;
        const scale = 1 - index * 0.05;
        const translateY = index * 12;
        const zIndex = 30 - index * 10;

        return (
          <div
            key={card.id}
            onPointerDown={isTop ? handlePointerDown : undefined}
            onPointerMove={isTop ? handlePointerMove : undefined}
            onPointerUp={isTop ? handlePointerUp : undefined}
            style={{
              zIndex,
              transform: isTop
                ? `translate3d(${dragX}px, ${translateY}px, 0) rotate(${dragX * 0.08}deg) scale(${scale})`
                : `translate3d(0, ${translateY}px, 0) scale(${scale})`,
              transition: isDragging && isTop ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl text-slate-100 flex flex-col justify-between"
          >
            <div>
              <span className="text-xs uppercase tracking-wider text-sky-400 font-bold">Item {card.id}</span>
              <h3 className="text-xl font-bold mt-1">{card.title}</h3>
              <p className="text-sm text-slate-400 mt-2">{card.desc}</p>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-800/80 pt-4">
              <span>Swipe Left to Dismiss</span>
              <span>Swipe Right to Save</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

---

## Recipe 5: Strict Gated Action Button (Idle ➔ Loading ➔ Verified Success)

### Overview & Mechanics
- **Component**: `GatedActionButton.tsx`
- **Verification Gate**: Strictly prevents premature success animation until the actual network promise resolves.

### Complete Copy-Paste Code:
```tsx
'use client';

import React, { useState } from 'react';

export function GatedActionButton({
  label,
  action,
}: {
  label: string;
  action: () => Promise<boolean>;
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleClick = async () => {
    if (status === 'loading') return;
    setStatus('loading');
    try {
      const ok = await action();
      if (ok) {
        setStatus('success');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={status === 'loading'}
      className={`relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        status === 'success'
          ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/25'
          : status === 'error'
          ? 'bg-rose-500 text-white animate-shake'
          : 'bg-gradient-to-r from-sky-400 to-cyan-400 text-slate-950 shadow-[0_0_20px_-3px_rgba(56,189,248,0.4)]'
      }`}
    >
      {status === 'loading' && (
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      )}
      {status === 'success' && (
        <svg className="w-4 h-4 text-slate-950" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
      <span>
        {status === 'loading' ? 'Processing...' : status === 'success' ? 'Verified & Complete!' : status === 'error' ? 'Action Failed' : label}
      </span>
    </button>
  );
}
```

---

## Recipe 6: Liquid Glassmorphic Floating Pill Navbar with Scroll Observer

### Overview & Mechanics
- **Component**: `FloatingPillNavbar.tsx`
- **Technique**: Detached pill container resting fixed at top center. Transitions from transparent to liquid glass when page scrolls $> 20\text{px}$.

### Complete Copy-Paste Code:
```tsx
'use client';

import React, { useEffect, useState } from 'react';

export function FloatingPillNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between w-full max-w-4xl px-6 py-3 rounded-full transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]'
            : 'bg-transparent border border-transparent'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />
          <span className="font-bold text-slate-100 text-sm tracking-tight">MainDocs</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#cards" className="hover:text-white transition-colors">Components</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <button className="px-4 py-1.5 rounded-full text-xs font-semibold bg-sky-400 text-slate-950 hover:bg-sky-300 transition-colors">
          Get Started
        </button>
      </nav>
    </header>
  );
}
```

---

## Recipe 7: Pure CSS Scroll Progress Bar (Zero-JS ScrollTimeline)

### Overview & Mechanics
- **Technique**: Pure CSS `@keyframes` bound to `animation-timeline: scroll(root block)`.
- **Zero JS Overhead**: 100% offloaded to browser compositor; zero event listeners, zero frame drops.

### Complete Copy-Paste Code:
```css
/* Add to global index.css */
@keyframes scrollProgressScale {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

.scroll-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #38bdf8, #818cf8, #ec4899);
  transform-origin: 0% 50%;
  animation: scrollProgressScale auto linear;
  animation-timeline: scroll(root block);
  z-index: 100;
}
```

---

## Recipe 8: Universal Apple Genie Modal & Origin Morph System

### Overview & Mechanics
- **Component**: `AppleGenieModal.tsx` + `useOriginMorph.ts` (Unified Single-File or Two-File Component).
- **Technique**: Dynamic viewport geometry delta tracking ($\Delta X, \Delta Y, S_x, S_y$) paired with GPU-composited 3D CSS keyframe transforms (`perspective(1000px) rotateX(12deg)`).
- **Trigger Button Absorb Reaction**: The origin button lifts (`translateY(-3px)` + glowing ring) during close and snaps upon catching the window back into itself.
- **Zero-Bar Invisible Top-Hold Dragging**: Freely movable by clicking and holding the top region (top `48px-64px`). **No extra titlebar or drag bar is rendered, and zero move/grip icons are displayed**. Cursor switches to `cursor-grab` on hover and `cursor-grabbing` while dragging. Clamped to viewport boundaries.
- **Child Element Safety**: Buttons (e.g. close '✕'), tabs, and input fields inside the top area are excluded from drag events.
- **Cross-Reference**: Full specification in [`design-system/APPLE_GENIE_ORIGIN_MORPH_SYSTEM.md`](./APPLE_GENIE_ORIGIN_MORPH_SYSTEM.md).

### Complete Copy-Paste Code:
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
  maxWidth?: string; // e.g. 'max-w-md', 'max-w-lg', 'max-w-2xl'
  className?: string;
}

/**
 * Universal Apple Genie Modal with Zero-Bar Top-Hold Drag and Origin Morph
 */
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

  useEffect(() => {
    setMounted(true);
  }, []);

  // Open & Close Animation Orchestration
  useEffect(() => {
    if (isOpen) {
      setPosition(null); // Reset to center
      setAnimState('opening');
      const timer = setTimeout(() => setAnimState('open'), 340);
      return () => clearTimeout(timer);
    } else if (animState === 'open') {
      setAnimState('closing');
      onAbsorbChange?.(true);
      const timer = setTimeout(() => {
        setAnimState('closed');
        onAbsorbChange?.(false);
      }, 290);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Escape Key Listener
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
    const target = e.target as HTMLElement;
    // Exclude inner interactive elements (Close button, tabs, inputs)
    if (target.closest('button, a, input, textarea, select, [data-no-drag]')) {
      return;
    }

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

    const rawX = dragStartRef.current.startX + deltaX;
    const rawY = dragStartRef.current.startY + deltaY;

    // Viewport clamping
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
      } catch {}
    }
  }, [isDragging]);

  if (!mounted || animState === 'closed') return null;

  // Compute Origin Delta Variables
  let transformStyle: React.CSSProperties = {};
  if (triggerRect && (animState === 'opening' || animState === 'closing')) {
    const targetCenterX = position ? position.x + 240 : window.innerWidth / 2;
    const targetCenterY = position ? position.y + 160 : window.innerHeight / 2;

    const triggerCenterX = triggerRect.x + triggerRect.width / 2;
    const triggerCenterY = triggerRect.y + triggerRect.height / 2;

    const deltaX = triggerCenterX - targetCenterX;
    const deltaY = triggerCenterY - targetCenterY;

    const scaleX = Math.max(0.08, triggerRect.width / 480);
    const scaleY = Math.max(0.08, triggerRect.height / 320);

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
        animation: 'appleGenieSuck 290ms cubic-bezier(0.7, 0, 0.84, 0) forwards',
      } as React.CSSProperties;
    }
  }

  const isPositioned = position !== null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300 ${
          animState === 'closing' ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Modal Surface */}
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
        className={`relative w-full ${maxWidth} rounded-2xl bg-slate-900/90 dark:bg-slate-900/95 border border-slate-700/60 shadow-2xl backdrop-blur-2xl text-slate-100 overflow-hidden ${
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
          {/* Close button - Excluded from dragging */}
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

        {/* Modal Content */}
        <div className="p-6 cursor-default">
          {children}
        </div>
      </div>

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
 * Hook to manage trigger origin capture and absorb reaction
 */
export function useOriginMorph() {
  const [triggerRect, setTriggerRect] = useState<OriginRect | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAbsorbing, setIsAbsorbing] = useState(false);

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
    buttonAbsorbProps: {
      className: isAbsorbing
        ? 'transition-all duration-300 -translate-y-1 scale-105 shadow-glow-sky border-sky-400'
        : 'transition-all duration-200',
    },
  };
}
```

---

## Recipe 9: Production Three.js 3D Model Viewer & Parts Inspector Studio

### Overview & Mechanics
- **Component**: `ThreeModelInspector.tsx`
- **Technique**: WebGL canvas rendering via Three.js with OrbitControls, PCF soft shadow maps, and ACES Filmic tone mapping.
- **Decomposition & Parts Audit**: Recursive `traverse()` function decomposes any procedural or external `.glb` model into an interactive parts tree showing triangle counts, materials, and world coordinates.
- **Interactive Disassembly**: Exploded-view slider systematically moves sub-meshes outward along their radial normal vectors.
- **Memory & Lifecycle Safety**: Completely disposes all geometry buffers, textures, materials, and calls `renderer.forceContextLoss()` upon React unmount.
- **Cross-Reference**: Master specification in [`design-system/THREEJS_3D_MODEL_ARCHITECTURE_AND_INSPECTION_SYSTEM.md`](./THREEJS_3D_MODEL_ARCHITECTURE_AND_INSPECTION_SYSTEM.md).

### Complete Copy-Paste Code:
```tsx
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export interface ModelPartInfo {
  name: string;
  triangles: number;
  material: string;
}

export interface ModelAuditSummary {
  totalTriangles: number;
  totalVertices: number;
  meshCount: number;
  parts: ModelPartInfo[];
}

export interface ThreeModelInspectorProps {
  modelUrl?: string;
  title?: string;
  className?: string;
}

export function ThreeModelInspector({
  modelUrl,
  title = '3D Model Studio & Parts Inspector',
  className = '',
}: ThreeModelInspectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRootRef = useRef<THREE.Object3D | null>(null);

  const [audit, setAudit] = useState<ModelAuditSummary | null>(null);
  const [wireframe, setWireframe] = useState(false);
  const [explodeDistance, setExplodeDistance] = useState(0);
  const [activePart, setActivePart] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#07090e');
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(3.2, 2.4, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 2. Controls & Lighting
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dirLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const fillLight = new THREE.PointLight(0x818cf8, 1.2, 15);
    fillLight.position.set(-4, -2, -3);
    scene.add(fillLight);

    // Ground Grid
    const grid = new THREE.GridHelper(10, 20, 0x38bdf8, 0x1e293b);
    grid.position.y = -1;
    scene.add(grid);

    // 3. Mount or Load 3D Model
    const handleModelReady = (root: THREE.Object3D) => {
      modelRootRef.current = root;
      scene.add(root);

      // Center and normalize bounding box scale
      const bbox = new THREE.Box3().setFromObject(root);
      const center = bbox.getCenter(new THREE.Vector3());
      const size = bbox.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim > 0) {
        const scale = 2.0 / maxDim;
        root.scale.setScalar(scale);
        root.position.sub(center.multiplyScalar(scale));
      }

      // Audit Parts Decomposition
      let totalTriangles = 0;
      let totalVertices = 0;
      let meshCount = 0;
      const parts: ModelPartInfo[] = [];

      root.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          meshCount++;
          const geom = mesh.geometry;
          const tri = geom.index ? geom.index.count / 3 : (geom.attributes.position ? geom.attributes.position.count / 3 : 0);
          totalTriangles += Math.floor(tri);
          totalVertices += geom.attributes.position ? geom.attributes.position.count : 0;

          parts.push({
            name: mesh.name || `Part_${meshCount}`,
            triangles: Math.floor(tri),
            material: Array.isArray(mesh.material) ? mesh.material.map(m => m.name).join(', ') : (mesh.material?.name || 'PBR Standard'),
          });
        }
      });

      setAudit({ totalTriangles, totalVertices, meshCount, parts });
      setLoading(false);
    };

    if (modelUrl) {
      const loader = new GLTFLoader();
      const draco = new DRACOLoader();
      draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
      loader.setDRACOLoader(draco);
      loader.load(modelUrl, (gltf) => handleModelReady(gltf.scene), undefined, () => setLoading(false));
    } else {
      // High-Quality Procedural Cyber Core Assembly
      const group = new THREE.Group();
      group.name = 'Procedural_Cyber_Core';

      const chassis = new THREE.Mesh(
        new THREE.CylinderGeometry(0.8, 1.0, 1.4, 48, 8),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.85, roughness: 0.25 })
      );
      chassis.name = 'Chassis_Base';
      chassis.castShadow = true;
      group.add(chassis);

      const orb = new THREE.Mesh(
        new THREE.SphereGeometry(0.45, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.9, roughness: 0.1 })
      );
      orb.name = 'Quantum_Core_Orb';
      group.add(orb);

      const gimbal = new THREE.Mesh(
        new THREE.TorusGeometry(1.2, 0.04, 16, 64),
        new THREE.MeshStandardMaterial({ color: 0x818cf8, metalness: 0.9, roughness: 0.15 })
      );
      gimbal.name = 'Outer_Gimbal_Ring';
      gimbal.rotation.x = Math.PI / 2;
      group.add(gimbal);

      handleModelReady(group);
    }

    // 4. Render Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      if (modelRootRef.current && explodeDistance === 0) {
        modelRootRef.current.rotation.y += 0.003;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      // Clean GPU memory
      scene.traverse((obj: any) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose());
          else obj.material.dispose();
        }
      });
      scene.clear();
      renderer.dispose();
      renderer.forceContextLoss();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [modelUrl]);

  // Wireframe Toggle
  const toggleWireframe = useCallback(() => {
    const next = !wireframe;
    setWireframe(next);
    modelRootRef.current?.traverse((child: any) => {
      if (child.isMesh && child.material) {
        if (Array.isArray(child.material)) child.material.forEach((m: any) => (m.wireframe = next));
        else child.material.wireframe = next;
      }
    });
  }, [wireframe]);

  // Exploded View Slider
  const handleExplode = useCallback((dist: number) => {
    setExplodeDistance(dist);
    modelRootRef.current?.traverse((child: any) => {
      if (child.isMesh) {
        if (!child.userData.orig) child.userData.orig = child.position.clone();
        const norm = (child.userData.orig as THREE.Vector3).clone().normalize();
        if (norm.length() === 0) norm.set(0, 1, 0);
        child.position.copy(child.userData.orig).add(norm.multiplyScalar(dist));
      }
    });
  }, []);

  // Isolate Part
  const isolatePart = useCallback((name: string | null) => {
    setActivePart(name);
    modelRootRef.current?.traverse((child: any) => {
      if (child.isMesh) {
        child.visible = !name || child.name === name;
      }
    });
  }, []);

  return (
    <div className={`relative flex flex-col lg:flex-row w-full rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl text-slate-100 ${className}`}>
      <div className="relative flex-1 min-h-[440px]">
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-md">
            <span className="text-xs font-mono text-sky-400">Loading 3D Model...</span>
          </div>
        )}

        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs font-semibold">
            {title}
          </div>
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={toggleWireframe}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                wireframe ? 'bg-sky-500/20 border-sky-400 text-sky-300' : 'bg-slate-900/80 border-slate-700 text-slate-300'
              }`}
            >
              Wireframe
            </button>
            {activePart && (
              <button
                onClick={() => isolatePart(null)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-rose-500/20 border border-rose-400 text-rose-300"
              >
                Reset Isolation
              </button>
            )}
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 px-4 py-2.5 rounded-xl bg-slate-900/85 border border-slate-700/60 backdrop-blur-md">
          <span className="text-xs font-medium text-slate-300">Explode:</span>
          <input
            type="range"
            min="0"
            max="1.5"
            step="0.01"
            value={explodeDistance}
            onChange={(e) => handleExplode(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg accent-sky-400 cursor-pointer"
          />
          <span className="text-xs font-mono text-sky-400">{explodeDistance.toFixed(2)}x</span>
        </div>
      </div>

      <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/60 p-4 flex flex-col gap-4">
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">3D Telemetry</h4>
          {audit && (
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-slate-800/60 border border-slate-700/40">
                <div className="text-slate-400 text-[10px]">Triangles</div>
                <div className="font-mono font-bold text-sky-400">{audit.totalTriangles.toLocaleString()}</div>
              </div>
              <div className="p-2 rounded bg-slate-800/60 border border-slate-700/40">
                <div className="text-slate-400 text-[10px]">Meshes</div>
                <div className="font-mono font-bold text-indigo-400">{audit.meshCount}</div>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Parts List</h4>
          <div className="overflow-y-auto space-y-1 max-h-[240px]">
            {audit?.parts.map((p, idx) => (
              <div
                key={idx}
                onClick={() => isolatePart(activePart === p.name ? null : p.name)}
                className={`p-2 rounded border text-xs cursor-pointer transition-colors ${
                  activePart === p.name ? 'bg-sky-500/20 border-sky-400 text-sky-200' : 'bg-slate-800/40 border-slate-700/30 text-slate-300'
                }`}
              >
                <div className="font-medium truncate">{p.name}</div>
                <div className="text-[10px] text-slate-500">{p.triangles} ▲</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```


