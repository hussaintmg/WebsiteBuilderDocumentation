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
10. [Recipe 10: Screen-Level Apple Genie Trash Bin & 3D Vacuum Deletion System (`GenieTrashBinPortal.tsx` & `useGenieTrashDelete.ts`)](#recipe-10-screen-level-apple-genie-trash-bin--3d-vacuum-deletion-system)
11. [Recipe 11: Task-Specific In-Flight Action Buttons Suite (`TaskAnimatedButtons.tsx`)](#recipe-11-task-specific-in-flight-action-buttons-suite)
12. [Recipe 12: Apple-Inspired Responsive Mobile Tabs Overflow System (`ResponsiveTabs.tsx` & `useResponsiveTabs.ts`)](#recipe-12-apple-inspired-responsive-mobile-tabs-overflow-system)

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

## Recipe 10: Screen-Level Apple Genie Trash Bin & 3D Vacuum Deletion System

### Overview & Mechanics
- **Components**: `GenieTrashBinPortal.tsx` + `useGenieTrashDelete.ts`
- **Technique**: Screen-level elevation via `createPortal` to escape table/card `overflow: hidden` containers. Kinetic entrance spring from right viewport edge (`x: 260 -> 0`).
- **Genie Vacuum Physics**: Cloned rows/cards deform (`scaleX: 0.12`, `scaleY: 0.05`, `rotateX: 65deg`, `rotateZ: 15deg`) and are sucked directly into the open mouth of the trash bin.
- **Physical Impact**: Hinged motorized lid pops open (`rotate: -55deg`), slams shut with elastic bounce (`rotate: 0deg, y: [0, 6, -2, 0]`), and pulses a count pill (`"-N Deleted"`).
- **Master Documentation**: [`design-system/APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md`](./APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md).

### Complete Copy-Paste Code:

```tsx
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';

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
  const [phase, setPhase] = useState<'ENTERING' | 'OPEN' | 'SIPHONING' | 'SLAM' | 'EXITING'>('ENTERING');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isActive || items.length === 0) {
      setPhase('ENTERING');
      return;
    }

    const t1 = setTimeout(() => setPhase('OPEN'), 280);
    const t2 = setTimeout(() => setPhase('SIPHONING'), 450);
    const t3 = setTimeout(() => setPhase('SLAM'), 950);
    const t4 = setTimeout(() => setPhase('EXITING'), 1500);
    const t5 = setTimeout(() => onAnimationComplete(), 1850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [isActive, items, onAnimationComplete]);

  if (!mounted || !isActive) return null;

  const targetX = typeof window !== 'undefined' ? window.innerWidth - 140 : 1200;
  const targetY = typeof window !== 'undefined' ? window.innerHeight - 180 : 700;

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* 1. Flying Elevated Clones in Screen Coordinate Space */}
      <AnimatePresence>
        {phase === 'SIPHONING' &&
          items.map((item, index) => {
            const startX = item.rect.left;
            const startY = item.rect.top;
            const deltaX = targetX - startX;

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
                  position: 'fixed',
                  left: 0,
                  top: 0,
                  transformOrigin: 'center bottom',
                  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 25px rgba(239, 68, 68, 0.25)'
                }}
                className="rounded-xl border border-rose-500/40 bg-neutral-900/90 backdrop-blur-xl overflow-hidden pointer-events-none"
              >
                {item.renderPreview()}
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* 2. Animated Kinetic Trash Bin (Rushes from right screen edge) */}
      <motion.div
        initial={{ x: 260, y: targetY, opacity: 0, rotate: 14 }}
        animate={
          phase === 'EXITING'
            ? { x: 280, opacity: 0, rotate: 10 }
            : {
                x: targetX - 30,
                y: phase === 'SLAM' ? [targetY, targetY + 6, targetY - 2, targetY] : targetY,
                opacity: 1,
                rotate: 0
              }
        }
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20
        }}
        className="fixed left-0 top-0 pointer-events-auto flex flex-col items-center select-none"
      >
        {/* Count Pill */}
        <AnimatePresence>
          {(phase === 'SIPHONING' || phase === 'SLAM') && (
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

        {/* Can Container */}
        <div className="relative flex flex-col items-center">
          {/* Motorized Hinged Lid */}
          <motion.div
            style={{ transformOrigin: 'bottom right' }}
            animate={
              phase === 'OPEN' || phase === 'SIPHONING'
                ? { rotate: -55, y: -8, x: -4 }
                : { rotate: 0, y: 0, x: 0 }
            }
            transition={{
              type: 'spring',
              stiffness: 450,
              damping: 16
            }}
            className="z-20 h-4 w-24 rounded-t-lg border border-white/20 bg-gradient-to-b from-neutral-700 to-neutral-800 shadow-md"
          >
            <div className="mx-auto h-1.5 w-6 -translate-y-1.5 rounded-t-md bg-neutral-600 border-t border-white/20" />
          </motion.div>

          {/* Siphon Vortex Portal Glow (Inside Opening) */}
          <div className="relative -mt-1 h-28 w-20 rounded-b-2xl border border-white/15 bg-gradient-to-b from-neutral-800/95 via-neutral-900/95 to-black/95 p-2 backdrop-blur-2xl shadow-2xl shadow-black/80 flex flex-col items-center justify-between">
            <div
              className={`absolute inset-x-2 top-0 h-4 rounded-full transition-all duration-300 ${
                phase === 'OPEN' || phase === 'SIPHONING'
                  ? 'bg-cyan-500/40 blur-sm shadow-[0_0_18px_rgba(34,211,238,0.7)]'
                  : 'bg-transparent'
              }`}
            />

            <div className="my-auto flex flex-col items-center justify-center gap-1 text-neutral-500">
              <motion.div
                animate={
                  phase === 'SIPHONING'
                    ? { rotate: 360, scale: [1, 1.2, 1] }
                    : { rotate: 0, scale: 1 }
                }
                transition={{ duration: 1.5, repeat: phase === 'SIPHONING' ? Infinity : 0, ease: 'linear' }}
              >
                <Trash2
                  className={`h-7 w-7 transition-colors duration-300 ${
                    phase === 'SIPHONING'
                      ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]'
                      : 'text-neutral-500'
                  }`}
                />
              </motion.div>
              <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400">
                VACUUM
              </span>
            </div>

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

export function useGenieTrashDelete() {
  const [isActive, setIsActive] = useState(false);
  const [snapshots, setSnapshots] = useState<DeletingItemSnapshot[]>([]);
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const [completionResolver, setCompletionResolver] = useState<(() => void) | null>(null);

  const triggerGenieDelete = useCallback(
    (
      items: { id: string; element?: HTMLElement | null; previewNode?: React.ReactNode }[],
      onSettled: (deletedIds: string[]) => void | Promise<void>
    ) => {
      const ids = items.map((i) => i.id);
      setPendingIds(ids);

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

## Recipe 10: Screen-Level Apple Genie Trash Bin & 3D Vacuum Deletion System

### Overview & Mechanics
- **Components**: `GenieTrashBinPortal.tsx` + `useGenieTrashDelete.ts`
- **Technique**: Screen-level elevation via `createPortal` to escape table/card `overflow: hidden` containers. Kinetic entrance spring from right viewport edge (`x: 260 -> 0`).
- **Genie Vacuum Physics**: Cloned rows/cards deform (`scaleX: 0.12`, `scaleY: 0.05`, `rotateX: 65deg`, `rotateZ: 15deg`) and are sucked directly into the open mouth of the trash bin.
- **Physical Impact**: Hinged motorized lid pops open (`rotate: -55deg`), slams shut with elastic bounce (`rotate: 0deg, y: [0, 6, -2, 0]`), and pulses a count pill (`"-N Deleted"`).
- **Master Documentation**: [`design-system/APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md`](./APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md).

### Complete Copy-Paste Code:

```tsx
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';

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
  const [phase, setPhase] = useState<'ENTERING' | 'OPEN' | 'SIPHONING' | 'SLAM' | 'EXITING'>('ENTERING');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isActive || items.length === 0) {
      setPhase('ENTERING');
      return;
    }

    const t1 = setTimeout(() => setPhase('OPEN'), 280);
    const t2 = setTimeout(() => setPhase('SIPHONING'), 450);
    const t3 = setTimeout(() => setPhase('SLAM'), 950);
    const t4 = setTimeout(() => setPhase('EXITING'), 1500);
    const t5 = setTimeout(() => onAnimationComplete(), 1850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [isActive, items, onAnimationComplete]);

  if (!mounted || !isActive) return null;

  const targetX = typeof window !== 'undefined' ? window.innerWidth - 140 : 1200;
  const targetY = typeof window !== 'undefined' ? window.innerHeight - 180 : 700;

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* 1. Flying Elevated Clones in Screen Coordinate Space */}
      <AnimatePresence>
        {phase === 'SIPHONING' &&
          items.map((item, index) => {
            const startX = item.rect.left;
            const startY = item.rect.top;
            const deltaX = targetX - startX;

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
                  position: 'fixed',
                  left: 0,
                  top: 0,
                  transformOrigin: 'center bottom',
                  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 25px rgba(239, 68, 68, 0.25)'
                }}
                className="rounded-xl border border-rose-500/40 bg-neutral-900/90 backdrop-blur-xl overflow-hidden pointer-events-none"
              >
                {item.renderPreview()}
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* 2. Animated Kinetic Trash Bin (Rushes from right screen edge) */}
      <motion.div
        initial={{ x: 260, y: targetY, opacity: 0, rotate: 14 }}
        animate={
          phase === 'EXITING'
            ? { x: 280, opacity: 0, rotate: 10 }
            : {
                x: targetX - 30,
                y: phase === 'SLAM' ? [targetY, targetY + 6, targetY - 2, targetY] : targetY,
                opacity: 1,
                rotate: 0
              }
        }
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20
        }}
        className="fixed left-0 top-0 pointer-events-auto flex flex-col items-center select-none"
      >
        {/* Count Pill */}
        <AnimatePresence>
          {(phase === 'SIPHONING' || phase === 'SLAM') && (
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

        {/* Can Container */}
        <div className="relative flex flex-col items-center">
          {/* Motorized Hinged Lid */}
          <motion.div
            style={{ transformOrigin: 'bottom right' }}
            animate={
              phase === 'OPEN' || phase === 'SIPHONING'
                ? { rotate: -55, y: -8, x: -4 }
                : { rotate: 0, y: 0, x: 0 }
            }
            transition={{
              type: 'spring',
              stiffness: 450,
              damping: 16
            }}
            className="z-20 h-4 w-24 rounded-t-lg border border-white/20 bg-gradient-to-b from-neutral-700 to-neutral-800 shadow-md"
          >
            <div className="mx-auto h-1.5 w-6 -translate-y-1.5 rounded-t-md bg-neutral-600 border-t border-white/20" />
          </motion.div>

          {/* Siphon Vortex Portal Glow (Inside Opening) */}
          <div className="relative -mt-1 h-28 w-20 rounded-b-2xl border border-white/15 bg-gradient-to-b from-neutral-800/95 via-neutral-900/95 to-black/95 p-2 backdrop-blur-2xl shadow-2xl shadow-black/80 flex flex-col items-center justify-between">
            <div
              className={`absolute inset-x-2 top-0 h-4 rounded-full transition-all duration-300 ${
                phase === 'OPEN' || phase === 'SIPHONING'
                  ? 'bg-cyan-500/40 blur-sm shadow-[0_0_18px_rgba(34,211,238,0.7)]'
                  : 'bg-transparent'
              }`}
            />

            <div className="my-auto flex flex-col items-center justify-center gap-1 text-neutral-500">
              <motion.div
                animate={
                  phase === 'SIPHONING'
                    ? { rotate: 360, scale: [1, 1.2, 1] }
                    : { rotate: 0, scale: 1 }
                }
                transition={{ duration: 1.5, repeat: phase === 'SIPHONING' ? Infinity : 0, ease: 'linear' }}
              >
                <Trash2
                  className={`h-7 w-7 transition-colors duration-300 ${
                    phase === 'SIPHONING'
                      ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]'
                      : 'text-neutral-500'
                  }`}
                />
              </motion.div>
              <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400">
                VACUUM
              </span>
            </div>

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

export function useGenieTrashDelete() {
  const [isActive, setIsActive] = useState(false);
  const [snapshots, setSnapshots] = useState<DeletingItemSnapshot[]>([]);
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const [completionResolver, setCompletionResolver] = useState<(() => void) | null>(null);

  const triggerGenieDelete = useCallback(
    (
      items: { id: string; element?: HTMLElement | null; previewNode?: React.ReactNode }[],
      onSettled: (deletedIds: string[]) => void | Promise<void>
    ) => {
      const ids = items.map((i) => i.id);
      setPendingIds(ids);

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

## Recipe 10: Screen-Level Apple Genie Trash Bin & 3D Vacuum Deletion System

### Overview & Mechanics
- **Components**: `GenieTrashBinPortal.tsx` + `useGenieTrashDelete.ts`
- **Technique**: Screen-level elevation via `createPortal` to escape table/card `overflow: hidden` containers. Kinetic entrance spring from right viewport edge (`x: 260 -> 0`).
- **Genie Vacuum Physics**: Cloned rows/cards deform (`scaleX: 0.12`, `scaleY: 0.05`, `rotateX: 65deg`, `rotateZ: 15deg`) and are sucked directly into the open mouth of the trash bin.
- **Physical Impact**: Hinged motorized lid pops open (`rotate: -55deg`), slams shut with elastic bounce (`rotate: 0deg, y: [0, 6, -2, 0]`), and pulses a count pill (`"-N Deleted"`).
- **Master Documentation**: [`design-system/APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md`](./APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md).

### Complete Copy-Paste Code:

```tsx
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';

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
  const [phase, setPhase] = useState<'ENTERING' | 'OPEN' | 'SIPHONING' | 'SLAM' | 'EXITING'>('ENTERING');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isActive || items.length === 0) {
      setPhase('ENTERING');
      return;
    }

    const t1 = setTimeout(() => setPhase('OPEN'), 280);
    const t2 = setTimeout(() => setPhase('SIPHONING'), 450);
    const t3 = setTimeout(() => setPhase('SLAM'), 950);
    const t4 = setTimeout(() => setPhase('EXITING'), 1500);
    const t5 = setTimeout(() => onAnimationComplete(), 1850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [isActive, items, onAnimationComplete]);

  if (!mounted || !isActive) return null;

  const targetX = typeof window !== 'undefined' ? window.innerWidth - 140 : 1200;
  const targetY = typeof window !== 'undefined' ? window.innerHeight - 180 : 700;

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* 1. Flying Elevated Clones in Screen Coordinate Space */}
      <AnimatePresence>
        {phase === 'SIPHONING' &&
          items.map((item, index) => {
            const startX = item.rect.left;
            const startY = item.rect.top;
            const deltaX = targetX - startX;

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
                  position: 'fixed',
                  left: 0,
                  top: 0,
                  transformOrigin: 'center bottom',
                  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 25px rgba(239, 68, 68, 0.25)'
                }}
                className="rounded-xl border border-rose-500/40 bg-neutral-900/90 backdrop-blur-xl overflow-hidden pointer-events-none"
              >
                {item.renderPreview()}
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* 2. Animated Kinetic Trash Bin (Rushes from right screen edge) */}
      <motion.div
        initial={{ x: 260, y: targetY, opacity: 0, rotate: 14 }}
        animate={
          phase === 'EXITING'
            ? { x: 280, opacity: 0, rotate: 10 }
            : {
                x: targetX - 30,
                y: phase === 'SLAM' ? [targetY, targetY + 6, targetY - 2, targetY] : targetY,
                opacity: 1,
                rotate: 0
              }
        }
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20
        }}
        className="fixed left-0 top-0 pointer-events-auto flex flex-col items-center select-none"
      >
        {/* Count Pill */}
        <AnimatePresence>
          {(phase === 'SIPHONING' || phase === 'SLAM') && (
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

        {/* Can Container */}
        <div className="relative flex flex-col items-center">
          {/* Motorized Hinged Lid */}
          <motion.div
            style={{ transformOrigin: 'bottom right' }}
            animate={
              phase === 'OPEN' || phase === 'SIPHONING'
                ? { rotate: -55, y: -8, x: -4 }
                : { rotate: 0, y: 0, x: 0 }
            }
            transition={{
              type: 'spring',
              stiffness: 450,
              damping: 16
            }}
            className="z-20 h-4 w-24 rounded-t-lg border border-white/20 bg-gradient-to-b from-neutral-700 to-neutral-800 shadow-md"
          >
            <div className="mx-auto h-1.5 w-6 -translate-y-1.5 rounded-t-md bg-neutral-600 border-t border-white/20" />
          </motion.div>

          {/* Siphon Vortex Portal Glow (Inside Opening) */}
          <div className="relative -mt-1 h-28 w-20 rounded-b-2xl border border-white/15 bg-gradient-to-b from-neutral-800/95 via-neutral-900/95 to-black/95 p-2 backdrop-blur-2xl shadow-2xl shadow-black/80 flex flex-col items-center justify-between">
            <div
              className={`absolute inset-x-2 top-0 h-4 rounded-full transition-all duration-300 ${
                phase === 'OPEN' || phase === 'SIPHONING'
                  ? 'bg-cyan-500/40 blur-sm shadow-[0_0_18px_rgba(34,211,238,0.7)]'
                  : 'bg-transparent'
              }`}
            />

            <div className="my-auto flex flex-col items-center justify-center gap-1 text-neutral-500">
              <motion.div
                animate={
                  phase === 'SIPHONING'
                    ? { rotate: 360, scale: [1, 1.2, 1] }
                    : { rotate: 0, scale: 1 }
                }
                transition={{ duration: 1.5, repeat: phase === 'SIPHONING' ? Infinity : 0, ease: 'linear' }}
              >
                <Trash2
                  className={`h-7 w-7 transition-colors duration-300 ${
                    phase === 'SIPHONING'
                      ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]'
                      : 'text-neutral-500'
                  }`}
                />
              </motion.div>
              <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400">
                VACUUM
              </span>
            </div>

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

export function useGenieTrashDelete() {
  const [isActive, setIsActive] = useState(false);
  const [snapshots, setSnapshots] = useState<DeletingItemSnapshot[]>([]);
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const [completionResolver, setCompletionResolver] = useState<(() => void) | null>(null);

  const triggerGenieDelete = useCallback(
    (
      items: { id: string; element?: HTMLElement | null; previewNode?: React.ReactNode }[],
      onSettled: (deletedIds: string[]) => void | Promise<void>
    ) => {
      const ids = items.map((i) => i.id);
      setPendingIds(ids);

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

## Recipe 10: Screen-Level Apple Genie Trash Bin & 3D Vacuum Deletion System

### Overview & Mechanics
- **Components**: `GenieTrashBinPortal.tsx` + `useGenieTrashDelete.ts`
- **Technique**: Screen-level elevation via `createPortal` to escape table/card `overflow: hidden` containers. Kinetic entrance spring from right viewport edge (`x: 260 -> 0`).
- **Genie Vacuum Physics**: Cloned rows/cards deform (`scaleX: 0.12`, `scaleY: 0.05`, `rotateX: 65deg`, `rotateZ: 15deg`) and are sucked directly into the open mouth of the trash bin.
- **Physical Impact**: Hinged motorized lid pops open (`rotate: -55deg`), slams shut with elastic bounce (`rotate: 0deg, y: [0, 6, -2, 0]`), and pulses a count pill (`"-N Deleted"`).
- **Master Documentation**: [`design-system/APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md`](./APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md).

### Complete Copy-Paste Code:

```tsx
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';

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
  const [phase, setPhase] = useState<'ENTERING' | 'OPEN' | 'SIPHONING' | 'SLAM' | 'EXITING'>('ENTERING');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isActive || items.length === 0) {
      setPhase('ENTERING');
      return;
    }

    const t1 = setTimeout(() => setPhase('OPEN'), 280);
    const t2 = setTimeout(() => setPhase('SIPHONING'), 450);
    const t3 = setTimeout(() => setPhase('SLAM'), 950);
    const t4 = setTimeout(() => setPhase('EXITING'), 1500);
    const t5 = setTimeout(() => onAnimationComplete(), 1850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [isActive, items, onAnimationComplete]);

  if (!mounted || !isActive) return null;

  const targetX = typeof window !== 'undefined' ? window.innerWidth - 140 : 1200;
  const targetY = typeof window !== 'undefined' ? window.innerHeight - 180 : 700;

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* 1. Flying Elevated Clones in Screen Coordinate Space */}
      <AnimatePresence>
        {phase === 'SIPHONING' &&
          items.map((item, index) => {
            const startX = item.rect.left;
            const startY = item.rect.top;
            const deltaX = targetX - startX;

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
                  position: 'fixed',
                  left: 0,
                  top: 0,
                  transformOrigin: 'center bottom',
                  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 25px rgba(239, 68, 68, 0.25)'
                }}
                className="rounded-xl border border-rose-500/40 bg-neutral-900/90 backdrop-blur-xl overflow-hidden pointer-events-none"
              >
                {item.renderPreview()}
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* 2. Animated Kinetic Trash Bin (Rushes from right screen edge) */}
      <motion.div
        initial={{ x: 260, y: targetY, opacity: 0, rotate: 14 }}
        animate={
          phase === 'EXITING'
            ? { x: 280, opacity: 0, rotate: 10 }
            : {
                x: targetX - 30,
                y: phase === 'SLAM' ? [targetY, targetY + 6, targetY - 2, targetY] : targetY,
                opacity: 1,
                rotate: 0
              }
        }
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20
        }}
        className="fixed left-0 top-0 pointer-events-auto flex flex-col items-center select-none"
      >
        {/* Count Pill */}
        <AnimatePresence>
          {(phase === 'SIPHONING' || phase === 'SLAM') && (
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

        {/* Can Container */}
        <div className="relative flex flex-col items-center">
          {/* Motorized Hinged Lid */}
          <motion.div
            style={{ transformOrigin: 'bottom right' }}
            animate={
              phase === 'OPEN' || phase === 'SIPHONING'
                ? { rotate: -55, y: -8, x: -4 }
                : { rotate: 0, y: 0, x: 0 }
            }
            transition={{
              type: 'spring',
              stiffness: 450,
              damping: 16
            }}
            className="z-20 h-4 w-24 rounded-t-lg border border-white/20 bg-gradient-to-b from-neutral-700 to-neutral-800 shadow-md"
          >
            <div className="mx-auto h-1.5 w-6 -translate-y-1.5 rounded-t-md bg-neutral-600 border-t border-white/20" />
          </motion.div>

          {/* Siphon Vortex Portal Glow (Inside Opening) */}
          <div className="relative -mt-1 h-28 w-20 rounded-b-2xl border border-white/15 bg-gradient-to-b from-neutral-800/95 via-neutral-900/95 to-black/95 p-2 backdrop-blur-2xl shadow-2xl shadow-black/80 flex flex-col items-center justify-between">
            <div
              className={`absolute inset-x-2 top-0 h-4 rounded-full transition-all duration-300 ${
                phase === 'OPEN' || phase === 'SIPHONING'
                  ? 'bg-cyan-500/40 blur-sm shadow-[0_0_18px_rgba(34,211,238,0.7)]'
                  : 'bg-transparent'
              }`}
            />

            <div className="my-auto flex flex-col items-center justify-center gap-1 text-neutral-500">
              <motion.div
                animate={
                  phase === 'SIPHONING'
                    ? { rotate: 360, scale: [1, 1.2, 1] }
                    : { rotate: 0, scale: 1 }
                }
                transition={{ duration: 1.5, repeat: phase === 'SIPHONING' ? Infinity : 0, ease: 'linear' }}
              >
                <Trash2
                  className={`h-7 w-7 transition-colors duration-300 ${
                    phase === 'SIPHONING'
                      ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]'
                      : 'text-neutral-500'
                  }`}
                />
              </motion.div>
              <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400">
                VACUUM
              </span>
            </div>

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

export function useGenieTrashDelete() {
  const [isActive, setIsActive] = useState(false);
  const [snapshots, setSnapshots] = useState<DeletingItemSnapshot[]>([]);
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const [completionResolver, setCompletionResolver] = useState<(() => void) | null>(null);

  const triggerGenieDelete = useCallback(
    (
      items: { id: string; element?: HTMLElement | null; previewNode?: React.ReactNode }[],
      onSettled: (deletedIds: string[]) => void | Promise<void>
    ) => {
      const ids = items.map((i) => i.id);
      setPendingIds(ids);

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

## Recipe 10: Screen-Level Apple Genie Trash Bin & 3D Vacuum Deletion System

### Overview & Mechanics
- **Components**: `GenieTrashBinPortal.tsx` + `useGenieTrashDelete.ts`
- **Technique**: Screen-level elevation via `createPortal` to escape table/card `overflow: hidden` containers. Kinetic entrance spring from right viewport edge (`x: 260 -> 0`).
- **Genie Vacuum Physics**: Cloned rows/cards deform (`scaleX: 0.12`, `scaleY: 0.05`, `rotateX: 65deg`, `rotateZ: 15deg`) and are sucked directly into the open mouth of the trash bin.
- **Physical Impact**: Hinged motorized lid pops open (`rotate: -55deg`), slams shut with elastic bounce (`rotate: 0deg, y: [0, 6, -2, 0]`), and pulses a count pill (`"-N Deleted"`).
- **Master Documentation**: [`design-system/APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md`](./APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md).

### Complete Copy-Paste Code:

```tsx
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';

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
  const [phase, setPhase] = useState<'ENTERING' | 'OPEN' | 'SIPHONING' | 'SLAM' | 'EXITING'>('ENTERING');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isActive || items.length === 0) {
      setPhase('ENTERING');
      return;
    }

    const t1 = setTimeout(() => setPhase('OPEN'), 280);
    const t2 = setTimeout(() => setPhase('SIPHONING'), 450);
    const t3 = setTimeout(() => setPhase('SLAM'), 950);
    const t4 = setTimeout(() => setPhase('EXITING'), 1500);
    const t5 = setTimeout(() => onAnimationComplete(), 1850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [isActive, items, onAnimationComplete]);

  if (!mounted || !isActive) return null;

  const targetX = typeof window !== 'undefined' ? window.innerWidth - 140 : 1200;
  const targetY = typeof window !== 'undefined' ? window.innerHeight - 180 : 700;

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* 1. Flying Elevated Clones in Screen Coordinate Space */}
      <AnimatePresence>
        {phase === 'SIPHONING' &&
          items.map((item, index) => {
            const startX = item.rect.left;
            const startY = item.rect.top;
            const deltaX = targetX - startX;

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
                  position: 'fixed',
                  left: 0,
                  top: 0,
                  transformOrigin: 'center bottom',
                  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 25px rgba(239, 68, 68, 0.25)'
                }}
                className="rounded-xl border border-rose-500/40 bg-neutral-900/90 backdrop-blur-xl overflow-hidden pointer-events-none"
              >
                {item.renderPreview()}
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* 2. Animated Kinetic Trash Bin (Rushes from right screen edge) */}
      <motion.div
        initial={{ x: 260, y: targetY, opacity: 0, rotate: 14 }}
        animate={
          phase === 'EXITING'
            ? { x: 280, opacity: 0, rotate: 10 }
            : {
                x: targetX - 30,
                y: phase === 'SLAM' ? [targetY, targetY + 6, targetY - 2, targetY] : targetY,
                opacity: 1,
                rotate: 0
              }
        }
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20
        }}
        className="fixed left-0 top-0 pointer-events-auto flex flex-col items-center select-none"
      >
        {/* Count Pill */}
        <AnimatePresence>
          {(phase === 'SIPHONING' || phase === 'SLAM') && (
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

        {/* Can Container */}
        <div className="relative flex flex-col items-center">
          {/* Motorized Hinged Lid */}
          <motion.div
            style={{ transformOrigin: 'bottom right' }}
            animate={
              phase === 'OPEN' || phase === 'SIPHONING'
                ? { rotate: -55, y: -8, x: -4 }
                : { rotate: 0, y: 0, x: 0 }
            }
            transition={{
              type: 'spring',
              stiffness: 450,
              damping: 16
            }}
            className="z-20 h-4 w-24 rounded-t-lg border border-white/20 bg-gradient-to-b from-neutral-700 to-neutral-800 shadow-md"
          >
            <div className="mx-auto h-1.5 w-6 -translate-y-1.5 rounded-t-md bg-neutral-600 border-t border-white/20" />
          </motion.div>

          {/* Siphon Vortex Portal Glow (Inside Opening) */}
          <div className="relative -mt-1 h-28 w-20 rounded-b-2xl border border-white/15 bg-gradient-to-b from-neutral-800/95 via-neutral-900/95 to-black/95 p-2 backdrop-blur-2xl shadow-2xl shadow-black/80 flex flex-col items-center justify-between">
            <div
              className={`absolute inset-x-2 top-0 h-4 rounded-full transition-all duration-300 ${
                phase === 'OPEN' || phase === 'SIPHONING'
                  ? 'bg-cyan-500/40 blur-sm shadow-[0_0_18px_rgba(34,211,238,0.7)]'
                  : 'bg-transparent'
              }`}
            />

            <div className="my-auto flex flex-col items-center justify-center gap-1 text-neutral-500">
              <motion.div
                animate={
                  phase === 'SIPHONING'
                    ? { rotate: 360, scale: [1, 1.2, 1] }
                    : { rotate: 0, scale: 1 }
                }
                transition={{ duration: 1.5, repeat: phase === 'SIPHONING' ? Infinity : 0, ease: 'linear' }}
              >
                <Trash2
                  className={`h-7 w-7 transition-colors duration-300 ${
                    phase === 'SIPHONING'
                      ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]'
                      : 'text-neutral-500'
                  }`}
                />
              </motion.div>
              <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400">
                VACUUM
              </span>
            </div>

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

export function useGenieTrashDelete() {
  const [isActive, setIsActive] = useState(false);
  const [snapshots, setSnapshots] = useState<DeletingItemSnapshot[]>([]);
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const [completionResolver, setCompletionResolver] = useState<(() => void) | null>(null);

  const triggerGenieDelete = useCallback(
    (
      items: { id: string; element?: HTMLElement | null; previewNode?: React.ReactNode }[],
      onSettled: (deletedIds: string[]) => void | Promise<void>
    ) => {
      const ids = items.map((i) => i.id);
      setPendingIds(ids);

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

## Recipe 10: Screen-Level Apple Genie Trash Bin & 3D Vacuum Deletion System

### Overview & Mechanics
- **Components**: `GenieTrashBinPortal.tsx` + `useGenieTrashDelete.ts`
- **Technique**: Screen-level elevation via `createPortal` to escape table/card `overflow: hidden` containers. Kinetic entrance spring from right viewport edge (`x: 260 -> 0`).
- **Genie Vacuum Physics**: Cloned rows/cards deform (`scaleX: 0.12`, `scaleY: 0.05`, `rotateX: 65deg`, `rotateZ: 15deg`) and are sucked directly into the open mouth of the trash bin.
- **Physical Impact**: Hinged motorized lid pops open (`rotate: -55deg`), slams shut with elastic bounce (`rotate: 0deg, y: [0, 6, -2, 0]`), and pulses a count pill (`"-N Deleted"`).
- **Master Documentation**: [`design-system/APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md`](./APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md).

### Complete Copy-Paste Code:

```tsx
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';

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
  const [phase, setPhase] = useState<'ENTERING' | 'OPEN' | 'SIPHONING' | 'SLAM' | 'EXITING'>('ENTERING');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isActive || items.length === 0) {
      setPhase('ENTERING');
      return;
    }

    const t1 = setTimeout(() => setPhase('OPEN'), 280);
    const t2 = setTimeout(() => setPhase('SIPHONING'), 450);
    const t3 = setTimeout(() => setPhase('SLAM'), 950);
    const t4 = setTimeout(() => setPhase('EXITING'), 1500);
    const t5 = setTimeout(() => onAnimationComplete(), 1850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [isActive, items, onAnimationComplete]);

  if (!mounted || !isActive) return null;

  const targetX = typeof window !== 'undefined' ? window.innerWidth - 140 : 1200;
  const targetY = typeof window !== 'undefined' ? window.innerHeight - 180 : 700;

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* 1. Flying Elevated Clones in Screen Coordinate Space */}
      <AnimatePresence>
        {phase === 'SIPHONING' &&
          items.map((item, index) => {
            const startX = item.rect.left;
            const startY = item.rect.top;
            const deltaX = targetX - startX;

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
                  position: 'fixed',
                  left: 0,
                  top: 0,
                  transformOrigin: 'center bottom',
                  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 25px rgba(239, 68, 68, 0.25)'
                }}
                className="rounded-xl border border-rose-500/40 bg-neutral-900/90 backdrop-blur-xl overflow-hidden pointer-events-none"
              >
                {item.renderPreview()}
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* 2. Animated Kinetic Trash Bin (Rushes from right screen edge) */}
      <motion.div
        initial={{ x: 260, y: targetY, opacity: 0, rotate: 14 }}
        animate={
          phase === 'EXITING'
            ? { x: 280, opacity: 0, rotate: 10 }
            : {
                x: targetX - 30,
                y: phase === 'SLAM' ? [targetY, targetY + 6, targetY - 2, targetY] : targetY,
                opacity: 1,
                rotate: 0
              }
        }
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20
        }}
        className="fixed left-0 top-0 pointer-events-auto flex flex-col items-center select-none"
      >
        {/* Count Pill */}
        <AnimatePresence>
          {(phase === 'SIPHONING' || phase === 'SLAM') && (
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

        {/* Can Container */}
        <div className="relative flex flex-col items-center">
          {/* Motorized Hinged Lid */}
          <motion.div
            style={{ transformOrigin: 'bottom right' }}
            animate={
              phase === 'OPEN' || phase === 'SIPHONING'
                ? { rotate: -55, y: -8, x: -4 }
                : { rotate: 0, y: 0, x: 0 }
            }
            transition={{
              type: 'spring',
              stiffness: 450,
              damping: 16
            }}
            className="z-20 h-4 w-24 rounded-t-lg border border-white/20 bg-gradient-to-b from-neutral-700 to-neutral-800 shadow-md"
          >
            <div className="mx-auto h-1.5 w-6 -translate-y-1.5 rounded-t-md bg-neutral-600 border-t border-white/20" />
          </motion.div>

          {/* Siphon Vortex Portal Glow (Inside Opening) */}
          <div className="relative -mt-1 h-28 w-20 rounded-b-2xl border border-white/15 bg-gradient-to-b from-neutral-800/95 via-neutral-900/95 to-black/95 p-2 backdrop-blur-2xl shadow-2xl shadow-black/80 flex flex-col items-center justify-between">
            <div
              className={`absolute inset-x-2 top-0 h-4 rounded-full transition-all duration-300 ${
                phase === 'OPEN' || phase === 'SIPHONING'
                  ? 'bg-cyan-500/40 blur-sm shadow-[0_0_18px_rgba(34,211,238,0.7)]'
                  : 'bg-transparent'
              }`}
            />

            <div className="my-auto flex flex-col items-center justify-center gap-1 text-neutral-500">
              <motion.div
                animate={
                  phase === 'SIPHONING'
                    ? { rotate: 360, scale: [1, 1.2, 1] }
                    : { rotate: 0, scale: 1 }
                }
                transition={{ duration: 1.5, repeat: phase === 'SIPHONING' ? Infinity : 0, ease: 'linear' }}
              >
                <Trash2
                  className={`h-7 w-7 transition-colors duration-300 ${
                    phase === 'SIPHONING'
                      ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]'
                      : 'text-neutral-500'
                  }`}
                />
              </motion.div>
              <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400">
                VACUUM
              </span>
            </div>

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

export function useGenieTrashDelete() {
  const [isActive, setIsActive] = useState(false);
  const [snapshots, setSnapshots] = useState<DeletingItemSnapshot[]>([]);
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const [completionResolver, setCompletionResolver] = useState<(() => void) | null>(null);

  const triggerGenieDelete = useCallback(
    (
      items: { id: string; element?: HTMLElement | null; previewNode?: React.ReactNode }[],
      onSettled: (deletedIds: string[]) => void | Promise<void>
    ) => {
      const ids = items.map((i) => i.id);
      setPendingIds(ids);

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

---

## Recipe 10: Screen-Level Apple Genie Trash Bin & 3D Vacuum Deletion System

### Overview & Mechanics
- **Components**: `GenieTrashBinPortal.tsx` + `useGenieTrashDelete.ts`
- **Technique**: Screen-level elevation via `createPortal` to escape table/card `overflow: hidden` containers. Kinetic entrance spring from right viewport edge (`x: 260 -> 0`).
- **Genie Vacuum Physics**: Cloned rows/cards deform (`scaleX: 0.12`, `scaleY: 0.05`, `rotateX: 65deg`, `rotateZ: 15deg`) and are sucked directly into the open mouth of the trash bin.
- **Physical Impact**: Hinged motorized lid pops open (`rotate: -55deg`), slams shut with elastic bounce (`rotate: 0deg, y: [0, 6, -2, 0]`), and pulses a count pill (`"-N Deleted"`).
- **Master Documentation**: [`design-system/APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md`](./APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md).

### Complete Copy-Paste Code:

```tsx
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';

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
  const [phase, setPhase] = useState<'ENTERING' | 'OPEN' | 'SIPHONING' | 'SLAM' | 'EXITING'>('ENTERING');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isActive || items.length === 0) {
      setPhase('ENTERING');
      return;
    }

    const t1 = setTimeout(() => setPhase('OPEN'), 280);
    const t2 = setTimeout(() => setPhase('SIPHONING'), 450);
    const t3 = setTimeout(() => setPhase('SLAM'), 950);
    const t4 = setTimeout(() => setPhase('EXITING'), 1500);
    const t5 = setTimeout(() => onAnimationComplete(), 1850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [isActive, items, onAnimationComplete]);

  if (!mounted || !isActive) return null;

  const targetX = typeof window !== 'undefined' ? window.innerWidth - 140 : 1200;
  const targetY = typeof window !== 'undefined' ? window.innerHeight - 180 : 700;

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* 1. Flying Elevated Clones in Screen Coordinate Space */}
      <AnimatePresence>
        {phase === 'SIPHONING' &&
          items.map((item, index) => {
            const startX = item.rect.left;
            const startY = item.rect.top;
            const deltaX = targetX - startX;

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
                  position: 'fixed',
                  left: 0,
                  top: 0,
                  transformOrigin: 'center bottom',
                  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 25px rgba(239, 68, 68, 0.25)'
                }}
                className="rounded-xl border border-rose-500/40 bg-neutral-900/90 backdrop-blur-xl overflow-hidden pointer-events-none"
              >
                {item.renderPreview()}
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* 2. Animated Kinetic Trash Bin (Rushes from right screen edge) */}
      <motion.div
        initial={{ x: 260, y: targetY, opacity: 0, rotate: 14 }}
        animate={
          phase === 'EXITING'
            ? { x: 280, opacity: 0, rotate: 10 }
            : {
                x: targetX - 30,
                y: phase === 'SLAM' ? [targetY, targetY + 6, targetY - 2, targetY] : targetY,
                opacity: 1,
                rotate: 0
              }
        }
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20
        }}
        className="fixed left-0 top-0 pointer-events-auto flex flex-col items-center select-none"
      >
        {/* Count Pill */}
        <AnimatePresence>
          {(phase === 'SIPHONING' || phase === 'SLAM') && (
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

        {/* Can Container */}
        <div className="relative flex flex-col items-center">
          {/* Motorized Hinged Lid */}
          <motion.div
            style={{ transformOrigin: 'bottom right' }}
            animate={
              phase === 'OPEN' || phase === 'SIPHONING'
                ? { rotate: -55, y: -8, x: -4 }
                : { rotate: 0, y: 0, x: 0 }
            }
            transition={{
              type: 'spring',
              stiffness: 450,
              damping: 16
            }}
            className="z-20 h-4 w-24 rounded-t-lg border border-white/20 bg-gradient-to-b from-neutral-700 to-neutral-800 shadow-md"
          >
            <div className="mx-auto h-1.5 w-6 -translate-y-1.5 rounded-t-md bg-neutral-600 border-t border-white/20" />
          </motion.div>

          {/* Siphon Vortex Portal Glow (Inside Opening) */}
          <div className="relative -mt-1 h-28 w-20 rounded-b-2xl border border-white/15 bg-gradient-to-b from-neutral-800/95 via-neutral-900/95 to-black/95 p-2 backdrop-blur-2xl shadow-2xl shadow-black/80 flex flex-col items-center justify-between">
            <div
              className={`absolute inset-x-2 top-0 h-4 rounded-full transition-all duration-300 ${
                phase === 'OPEN' || phase === 'SIPHONING'
                  ? 'bg-cyan-500/40 blur-sm shadow-[0_0_18px_rgba(34,211,238,0.7)]'
                  : 'bg-transparent'
              }`}
            />

            <div className="my-auto flex flex-col items-center justify-center gap-1 text-neutral-500">
              <motion.div
                animate={
                  phase === 'SIPHONING'
                    ? { rotate: 360, scale: [1, 1.2, 1] }
                    : { rotate: 0, scale: 1 }
                }
                transition={{ duration: 1.5, repeat: phase === 'SIPHONING' ? Infinity : 0, ease: 'linear' }}
              >
                <Trash2
                  className={`h-7 w-7 transition-colors duration-300 ${
                    phase === 'SIPHONING'
                      ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]'
                      : 'text-neutral-500'
                  }`}
                />
              </motion.div>
              <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400">
                VACUUM
              </span>
            </div>

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

export function useGenieTrashDelete() {
  const [isActive, setIsActive] = useState(false);
  const [snapshots, setSnapshots] = useState<DeletingItemSnapshot[]>([]);
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const [completionResolver, setCompletionResolver] = useState<(() => void) | null>(null);

  const triggerGenieDelete = useCallback(
    (
      items: { id: string; element?: HTMLElement | null; previewNode?: React.ReactNode }[],
      onSettled: (deletedIds: string[]) => void | Promise<void>
    ) => {
      const ids = items.map((i) => i.id);
      setPendingIds(ids);

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

## Recipe 11: Task-Specific In-Flight Action Buttons Suite (`TaskAnimatedButtons.tsx`)

### Overview & Mechanics
- **Component File**: `components/TaskAnimatedButtons.tsx`
- **Specification Reference**: [`design-system/BUTTON_IN_FLIGHT_TASK_ANIMATIONS_SPECIFICATION.md`](./BUTTON_IN_FLIGHT_TASK_ANIMATIONS_SPECIFICATION.md)
- **Non-Negotiable Rule**: Generic circular loading spinners (`animate-spin` circular borders) are strictly forbidden. Every asynchronous button execution must display an action-specific micro-animation inside the button during in-flight network requests ($T_{\text{api}}$).
- **Embedded Components**:
  1. `TaskAnimatedDeleteButton`: In-button trash bin loop (bin enters right, lid pops open, document drops in, lid snaps shut, bin departs left; repeats smoothly until API settles, then morphs to emerald checkmark).
  2. `TaskAnimatedOrderTruckButton`: Delivery truck driving on animated road (spinning tyres $\omega = 360^\circ$, moving dashed road strip, trailing dynamic tyre dust & exhaust lines, subtle suspension bounce).
  3. `TaskAnimatedLiveSyncButton`: Communications broadcast tower (blinking red transmitter beacon at apex needle, concentric radiating RF wave arcs, animated live pulsing status badge with audio equalizer bars).
  4. `TaskAnimatedPaymentButton`: POS card chip insertion with radiating contactless NFC wave pulses and verified checkmark.
  5. `TaskAnimatedDownloadPdfButton`: Laser scanner beam moving downward across document, folding into PDF badge and dropping into tray.
  6. `TaskAnimatedSendEmailButton`: Origami supersonic jet plane folding, takeoff with vapor contrail lines.
  7. `TaskAnimatedEditButton`: Stylus pen scribing flowing cursive script lines across sheet, laser verification scan, wax seal press.
  8. `TaskAnimatedCreateButton`: Isometric 3D construction bricks snapping together with spark particles, blossoming into a new record.

### Complete Copy-Paste Code:
```tsx
'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Trash2, ShoppingCart, Radio, CreditCard, FileDown, Send, Edit3, Plus } from 'lucide-react';

// ============================================================================
// CORE SYNCHRONIZATION HOOK
// ============================================================================
export interface UseTaskAnimationOptions {
  cycleDuration?: number; // Duration of one complete loop in ms
  morphDuration?: number; // Duration of success morph in ms
  onSuccessToast?: () => void;
  onErrorToast?: (err: unknown) => void;
}

export function useTaskAnimationSync(options: UseTaskAnimationOptions = {}) {
  const {
    cycleDuration = 950,
    morphDuration = 400,
    onSuccessToast,
    onErrorToast
  } = options;

  const [status, setStatus] = useState<'idle' | 'animating' | 'success' | 'error'>('idle');
  const isExecutingRef = useRef(false);

  const execute = useCallback(async (taskPromise: Promise<any>) => {
    if (isExecutingRef.current) return;
    isExecutingRef.current = true;
    setStatus('animating');
    const startTime = performance.now();

    let isSuccess = false;
    let errorObj: unknown = null;

    try {
      await taskPromise;
      isSuccess = true;
    } catch (err) {
      errorObj = err;
      isSuccess = false;
    }

    // Graceful cycle completion math
    const elapsed = performance.now() - startTime;
    const remainder = cycleDuration - (elapsed % cycleDuration);
    const waitTime = remainder === cycleDuration ? 0 : remainder;

    if (waitTime > 0) {
      await new Promise(r => setTimeout(r, waitTime));
    }

    setStatus(isSuccess ? 'success' : 'error');
    await new Promise(r => setTimeout(r, morphDuration));

    if (isSuccess) {
      onSuccessToast?.();
    } else {
      onErrorToast?.(errorObj);
    }

    isExecutingRef.current = false;
  }, [cycleDuration, morphDuration, onSuccessToast, onErrorToast]);

  const reset = useCallback(() => {
    setStatus('idle');
    isExecutingRef.current = false;
  }, []);

  return { status, isLoading: status === 'animating', isSuccess: status === 'success', isError: status === 'error', execute, reset };
}

// ============================================================================
// 1. DELETE BUTTON (IN-BUTTON DUSTBIN LOOP)
// ============================================================================
interface TaskAnimatedDeleteButtonProps {
  onDelete: () => Promise<any>;
  label?: string;
  activeLabel?: string;
  successLabel?: string;
  className?: string;
  onSuccessToast?: () => void;
}

export const TaskAnimatedDeleteButton: React.FC<TaskAnimatedDeleteButtonProps> = ({
  onDelete,
  label = "Delete Item",
  activeLabel = "Deleting...",
  successLabel = "Deleted!",
  className = "",
  onSuccessToast
}) => {
  const { status, isLoading, isSuccess, isError, execute } = useTaskAnimationSync({
    cycleDuration: 950,
    onSuccessToast
  });

  return (
    <motion.button
      whileTap={{ scale: isLoading ? 1 : 0.96 }}
      onClick={() => !isLoading && execute(onDelete())}
      disabled={isLoading}
      className={`relative inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl font-medium text-xs tracking-wide text-white transition-all duration-300 border overflow-hidden cursor-pointer ${
        isSuccess
          ? 'bg-emerald-600/90 border-emerald-500/50 shadow-lg shadow-emerald-950/40'
          : isError
          ? 'bg-rose-700 border-rose-500/50 shadow-lg shadow-rose-950/40'
          : 'bg-neutral-900/80 hover:bg-red-950/60 border-red-500/30 hover:border-red-500/60 shadow-lg shadow-red-950/20'
      } ${className}`}
    >
      {/* Icon Frame */}
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div key="idle" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
              <Trash2 className="w-4 h-4 text-red-400" />
            </motion.div>
          )}

          {status === 'animating' && (
            <motion.div key="animating" className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
              {/* Bin Body + Lid Assembly */}
              <motion.div
                animate={{
                  x: [20, 0, 0, 0, -20],
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
                {/* Popping Lid */}
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
                  className="w-3.5 h-1 bg-red-400 rounded-t-sm shadow-sm"
                />
                
                {/* Bin Base */}
                <div className="w-3 h-3.5 bg-gradient-to-b from-red-500 to-red-700 rounded-b-sm flex items-center justify-center border-t border-red-300/40">
                  <div className="w-1 h-2 border-x border-white/40" />
                </div>
              </motion.div>

              {/* Dropping Document Icon */}
              <motion.div
                animate={{
                  y: [-12, -12, 2, 2],
                  scale: [1, 1, 0.4, 0],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 0.95,
                  repeat: Infinity,
                  ease: "easeIn",
                  times: [0, 0.3, 0.6, 0.65]
                }}
                className="absolute w-2 h-2.5 bg-white/90 rounded-[1px] shadow-sm"
              />
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div key="success" initial={{ scale: 0.5, rotate: -45 }} animate={{ scale: 1, rotate: 0 }}>
              <Check className="w-4 h-4 text-emerald-300" />
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div key="error" initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
              <AlertCircle className="w-4 h-4 text-rose-300" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <span>
        {status === 'idle' && label}
        {status === 'animating' && activeLabel}
        {status === 'success' && successLabel}
        {status === 'error' && "Failed"}
      </span>
    </motion.button>
  );
};

// ============================================================================
// 2. ORDER TRUCK BUTTON (MOVING ROAD, SPINNING TYRES, TRAILING DUST LINES)
// ============================================================================
interface TaskAnimatedOrderTruckButtonProps {
  onOrder: () => Promise<any>;
  label?: string;
  activeLabel?: string;
  successLabel?: string;
  className?: string;
  onSuccessToast?: () => void;
}

export const TaskAnimatedOrderTruckButton: React.FC<TaskAnimatedOrderTruckButtonProps> = ({
  onOrder,
  label = "Place Order",
  activeLabel = "Dispatching...",
  successLabel = "Order Shipped!",
  className = "",
  onSuccessToast
}) => {
  const { status, isLoading, isSuccess, isError, execute } = useTaskAnimationSync({
    cycleDuration: 1000,
    onSuccessToast
  });

  return (
    <motion.button
      whileTap={{ scale: isLoading ? 1 : 0.96 }}
      onClick={() => !isLoading && execute(onOrder())}
      disabled={isLoading}
      className={`relative inline-flex items-center justify-center gap-3 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wide text-white transition-all duration-300 border overflow-hidden cursor-pointer ${
        isSuccess
          ? 'bg-emerald-600/90 border-emerald-400/50 shadow-lg shadow-emerald-950/40'
          : isError
          ? 'bg-rose-700 border-rose-500/50 shadow-lg shadow-rose-950/40'
          : 'bg-neutral-900/80 hover:bg-neutral-800/80 border-cyan-500/30 hover:border-cyan-400/60 shadow-lg shadow-cyan-950/20'
      } ${className}`}
    >
      {/* Icon Frame / Moving Truck */}
      <div className="relative w-8 h-5 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div key="idle" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
            </motion.div>
          )}

          {status === 'animating' && (
            <motion.div key="animating" className="relative w-8 h-5 flex items-center justify-center overflow-hidden">
              {/* Delivery Truck with Suspension Vibration */}
              <motion.div
                animate={{ y: [0, -0.8, 0, 0.6, 0] }}
                transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
                className="relative flex items-end -ml-1"
              >
                {/* Truck Cargo Body */}
                <div className="w-4 h-3 bg-cyan-600 rounded-tl-sm flex items-center justify-center border-t border-l border-cyan-300/40">
                  <div className="w-2 h-1.5 bg-amber-400 rounded-[1px]" />
                </div>
                {/* Truck Driver Cab */}
                <div className="w-2.5 h-2.5 bg-cyan-500 rounded-tr-md relative border-t border-r border-cyan-300/40">
                  <div className="w-1 h-0.8 bg-cyan-950/80 rounded-tr-sm ml-0.8 mt-0.5" />
                </div>

                {/* Spinning Tyres */}
                <div className="absolute -bottom-1 left-0.5 right-0.5 flex justify-between pointer-events-none">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.25, repeat: Infinity, ease: "linear" }}
                    className="w-1.8 h-1.8 rounded-full bg-neutral-900 border border-neutral-400 flex items-center justify-center"
                  >
                    <div className="w-0.5 h-0.5 bg-neutral-200 rounded-full" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.25, repeat: Infinity, ease: "linear" }}
                    className="w-1.8 h-1.8 rounded-full bg-neutral-900 border border-neutral-400 flex items-center justify-center"
                  >
                    <div className="w-0.5 h-0.5 bg-neutral-200 rounded-full" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Trailing Tyre Dust Lines */}
              <div className="absolute bottom-0.5 left-0 pointer-events-none">
                <motion.div
                  animate={{ x: [0, -10], scale: [0.5, 1.2], opacity: [0.9, 0] }}
                  transition={{ duration: 0.35, repeat: Infinity, ease: "easeOut" }}
                  className="w-1 h-0.8 rounded-full bg-neutral-300/70"
                />
              </div>

              {/* Moving Road Surface Dashes */}
              <div className="absolute -bottom-0.5 left-0 right-0 h-[1px] overflow-hidden">
                <motion.div
                  animate={{ x: [0, -16] }}
                  transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-full border-b border-dashed border-cyan-400/80"
                />
              </div>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div key="success" initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
              <Check className="w-4 h-4 text-emerald-300" />
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div key="error" initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
              <AlertCircle className="w-4 h-4 text-rose-300" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <span>
        {status === 'idle' && label}
        {status === 'animating' && activeLabel}
        {status === 'success' && successLabel}
        {status === 'error' && "Order Failed"}
      </span>
    </motion.button>
  );
};

// ============================================================================
// 3. LIVE SYNC / REFRESH BUTTON (BROADCAST TOWER + PULSING LIVE TEXT)
// ============================================================================
interface TaskAnimatedLiveSyncButtonProps {
  onSync: () => Promise<any>;
  label?: string;
  activeLabel?: string;
  successLabel?: string;
  className?: string;
  onSuccessToast?: () => void;
}

export const TaskAnimatedLiveSyncButton: React.FC<TaskAnimatedLiveSyncButtonProps> = ({
  onSync,
  label = "Sync Live",
  activeLabel = "Syncing Live",
  successLabel = "Synchronized!",
  className = "",
  onSuccessToast
}) => {
  const { status, isLoading, isSuccess, isError, execute } = useTaskAnimationSync({
    cycleDuration: 1100,
    onSuccessToast
  });

  return (
    <motion.button
      whileTap={{ scale: isLoading ? 1 : 0.96 }}
      onClick={() => !isLoading && execute(onSync())}
      disabled={isLoading}
      className={`relative inline-flex items-center justify-center gap-2.5 px-4 py-2 rounded-xl font-medium text-xs tracking-wide transition-all duration-300 border overflow-hidden cursor-pointer ${
        isSuccess
          ? 'bg-emerald-950/80 text-emerald-200 border-emerald-500/40 shadow-lg shadow-emerald-950/40'
          : isError
          ? 'bg-rose-950/80 text-rose-200 border-rose-500/40 shadow-lg shadow-rose-950/40'
          : 'bg-neutral-900/80 text-neutral-200 hover:bg-neutral-800/80 border-emerald-500/30 hover:border-emerald-500/60 shadow-lg shadow-emerald-950/20'
      } ${className}`}
    >
      {/* Broadcast Tower Icon with Radiating Wave Arcs */}
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isLoading && (
          <>
            {[0, 0.4].map((delay, idx) => (
              <motion.div
                key={idx}
                animate={{ scale: [0.6, 1.8], opacity: [0.9, 0] }}
                transition={{ duration: 1.1, repeat: Infinity, delay, ease: "easeOut" }}
                className="absolute top-0 w-3 h-3 rounded-full border border-emerald-400/70 pointer-events-none"
              />
            ))}
            {/* Blinking Beacon Tip */}
            <motion.div
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
              transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444] z-20"
            />
          </>
        )}
        <Radio className={`w-4 h-4 transition-colors ${isLoading ? 'text-emerald-400' : 'text-neutral-400'}`} />
      </div>

      {/* Live Text Area with Pulsing Orb & Equalizer */}
      <div className="flex items-center gap-1.5">
        {isLoading && (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        )}
        <span className={isLoading ? "font-mono font-semibold tracking-wider uppercase text-emerald-300" : ""}>
          {status === 'idle' && label}
          {status === 'animating' && activeLabel}
          {status === 'success' && successLabel}
          {status === 'error' && "Sync Failed"}
        </span>
        {isLoading && (
          <div className="flex items-end gap-0.5 h-3 ml-1">
            {[0.4, 0.9, 0.5, 1.0].map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: [`${h * 30}%`, `${h * 100}%`, `${h * 30}%`] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
                className="w-0.5 bg-emerald-400 rounded-full"
              />
            ))}
          </div>
        )}
      </div>
    </motion.button>
  );
};

// ============================================================================
// 4. COMPLETE PAYMENT BUTTON (CHIP INSERTION + CONTACTLESS NFC WAVES)
// ============================================================================
export const TaskAnimatedPaymentButton: React.FC<{
  onPay: () => Promise<any>;
  amount?: string;
  className?: string;
  onSuccessToast?: () => void;
}> = ({ onPay, amount = "$149.00", className = "", onSuccessToast }) => {
  const { status, isLoading, isSuccess, execute } = useTaskAnimationSync({
    cycleDuration: 1100,
    onSuccessToast
  });

  return (
    <motion.button
      whileTap={{ scale: isLoading ? 1 : 0.96 }}
      onClick={() => !isLoading && execute(onPay())}
      disabled={isLoading}
      className={`relative inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wide text-white transition-all duration-300 border overflow-hidden cursor-pointer bg-neutral-900/90 hover:bg-neutral-800/90 border-violet-500/30 hover:border-violet-500/60 shadow-lg shadow-violet-950/30 ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isLoading ? (
          <div className="relative w-5 h-5 flex items-center justify-center">
            {/* NFC Wave Radiations */}
            {[0, 0.35].map((d, i) => (
              <motion.div
                key={i}
                animate={{ scale: [0.7, 1.9], opacity: [0.8, 0] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: d, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border border-violet-400/80 pointer-events-none"
              />
            ))}
            {/* Dipping Card */}
            <motion.div
              animate={{ y: [-4, 2, -4] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              className="w-3.5 h-2.5 bg-amber-400 rounded-[1px] border border-amber-200"
            />
          </div>
        ) : isSuccess ? (
          <Check className="w-4 h-4 text-emerald-400" />
        ) : (
          <CreditCard className="w-4 h-4 text-violet-400" />
        )}
      </div>
      <span>{isLoading ? "Authorizing..." : isSuccess ? "Payment Approved!" : `Pay ${amount}`}</span>
    </motion.button>
  );
};

// ============================================================================
// 5. DOWNLOAD PDF BUTTON (LASER SCANNER BEAM + TRAY DROP)
// ============================================================================
export const TaskAnimatedDownloadPdfButton: React.FC<{
  onDownload: () => Promise<any>;
  label?: string;
  className?: string;
  onSuccessToast?: () => void;
}> = ({ onDownload, label = "Download PDF", className = "", onSuccessToast }) => {
  const { status, isLoading, isSuccess, execute } = useTaskAnimationSync({
    cycleDuration: 1000,
    onSuccessToast
  });

  return (
    <motion.button
      whileTap={{ scale: isLoading ? 1 : 0.96 }}
      onClick={() => !isLoading && execute(onDownload())}
      disabled={isLoading}
      className={`relative inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl font-medium text-xs text-white border border-cyan-500/30 bg-neutral-900/80 hover:bg-neutral-800/80 ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        {isLoading ? (
          <div className="relative w-4 h-4 bg-white/90 rounded-[2px] border border-cyan-400 overflow-hidden">
            {/* Laser Scanline */}
            <motion.div
              animate={{ y: [-2, 16, -2] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-0.5 bg-cyan-400 shadow-[0_0_4px_#22d3ee]"
            />
          </div>
        ) : isSuccess ? (
          <Check className="w-4 h-4 text-emerald-400" />
        ) : (
          <FileDown className="w-4 h-4 text-cyan-400" />
        )}
      </div>
      <span>{isLoading ? "Compiling PDF..." : isSuccess ? "Downloaded!" : label}</span>
    </motion.button>
  );
};

// ============================================================================
// 6. SEND EMAIL BUTTON (ORIGAMI JET PLANE TAKEOFF & VAPOR TRAIL)
// ============================================================================
export const TaskAnimatedSendEmailButton: React.FC<{
  onSend: () => Promise<any>;
  label?: string;
  className?: string;
  onSuccessToast?: () => void;
}> = ({ onSend, label = "Send Message", className = "", onSuccessToast }) => {
  const { status, isLoading, isSuccess, execute } = useTaskAnimationSync({
    cycleDuration: 900,
    onSuccessToast
  });

  return (
    <motion.button
      whileTap={{ scale: isLoading ? 1 : 0.96 }}
      onClick={() => !isLoading && execute(onSend())}
      disabled={isLoading}
      className={`relative inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl font-medium text-xs text-white border border-indigo-500/30 bg-neutral-900/80 hover:bg-neutral-800/80 ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        {isLoading ? (
          <motion.div
            animate={{ x: [-8, 12], y: [6, -10], scale: [0.8, 1.2], opacity: [0.2, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeIn" }}
          >
            <Send className="w-4 h-4 text-indigo-400" />
          </motion.div>
        ) : isSuccess ? (
          <Check className="w-4 h-4 text-emerald-400" />
        ) : (
          <Send className="w-4 h-4 text-indigo-400" />
        )}
      </div>
      <span>{isLoading ? "Dispatching..." : isSuccess ? "Delivered!" : label}</span>
    </motion.button>
  );
};
```

---

## Recipe 12: Apple-Inspired Responsive Mobile Tabs Overflow System

### Overview & Mechanics
- **Components**: `hooks/useResponsiveTabs.ts` and `components/ResponsiveTabs.tsx`
- **Technique**: Dynamic container measurement via `ResizeObserver` paired with an offscreen hidden measuring row. Automatically calculates visible tabs based on real-time container width and collapses un-fitting tabs into an Apple-inspired `[More ▼]` glass dropdown.
- **Active Tab Protection**: When an active tab falls into the overflow menu, it can either be pinned/promoted to the visible row (`pinActiveTab: true`) or dynamically reflected on the `[More ▼]` trigger button with an active pulsing indicator dot.
- **Micro-Interactions**: Framer Motion `layoutId="responsive-tabs-active-pill"` for fluid 60 FPS gliding tab switching, smooth dropdown spring animation (`stiffness: 450, damping: 35`), and reduced-motion fallback.
- **A11y**: Full WAI-ARIA `role="tablist"` / `role="tab"` / `aria-selected` support and accessible keyboard navigation (Left/Right arrows, Down arrow, Escape).
- **Mobile Guarantee**: Eliminates horizontal scrollbars and layout breaks on mobile viewports (`320px` to `768px`).

### Complete Implementation: `hooks/useResponsiveTabs.ts`
```tsx
'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';

export interface TabItem<T = string> {
  id: T;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface UseResponsiveTabsOptions {
  gap?: number;
  moreButtonWidth?: number;
  pinActiveTab?: boolean;
}

export function useResponsiveTabs<T extends string = string>(
  tabs: TabItem<T>[],
  activeId: T,
  options: UseResponsiveTabsOptions = {}
) {
  const { gap = 6, moreButtonWidth = 96, pinActiveTab = true } = options;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureContainerRef = useRef<HTMLDivElement | null>(null);

  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [tabWidths, setTabWidths] = useState<number[]>([]);

  const activeTab = useMemo(
    () => tabs.find(t => t.id === activeId) || tabs[0],
    [tabs, activeId]
  );

  const measureTabs = useCallback(() => {
    if (!measureContainerRef.current) return;
    const children = Array.from(measureContainerRef.current.children) as HTMLElement[];
    const widths = children.map(child => Math.ceil(child.getBoundingClientRect().width));
    setTabWidths(widths);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setContainerWidth(Math.floor(entry.contentRect.width));
      }
    });
    observer.observe(el);
    setContainerWidth(Math.floor(el.getBoundingClientRect().width));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    measureTabs();
  }, [tabs, measureTabs]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(Math.floor(containerRef.current.getBoundingClientRect().width));
      }
      measureTabs();
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [measureTabs]);

  const { visibleTabs, overflowTabs, isActiveInOverflow } = useMemo(() => {
    if (tabs.length === 0) return { visibleTabs: [], overflowTabs: [], isActiveInOverflow: false };
    if (containerWidth === 0 || tabWidths.length !== tabs.length) {
      return { visibleTabs: tabs, overflowTabs: [], isActiveInOverflow: false };
    }

    const totalTabsWidth = tabWidths.reduce((acc, w) => acc + w, 0) + (tabs.length - 1) * gap;
    if (totalTabsWidth <= containerWidth) {
      return { visibleTabs: tabs, overflowTabs: [], isActiveInOverflow: false };
    }

    const availableForVisible = containerWidth - moreButtonWidth - gap;
    let accumulatedWidth = 0;
    const visible: TabItem<T>[] = [];
    const overflow: TabItem<T>[] = [];
    const activeIndex = tabs.findIndex(t => t.id === activeId);

    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
      const width = tabWidths[i] || 80;
      const nextTotal = visible.length === 0 ? width : accumulatedWidth + gap + width;

      if (nextTotal <= availableForVisible) {
        accumulatedWidth = nextTotal;
        visible.push(tab);
      } else {
        overflow.push(tab);
      }
    }

    if (visible.length === 0 && tabs.length > 0) {
      visible.push(tabs[0]);
      overflow.splice(0, 1);
    }

    const activeInOverflow = overflow.some(t => t.id === activeId);
    if (pinActiveTab && activeInOverflow && activeIndex !== -1 && visible.length > 0) {
      const activeItem = tabs[activeIndex];
      const lastVisible = visible.pop()!;
      overflow.push(lastVisible);
      const activeOverflowIdx = overflow.findIndex(t => t.id === activeId);
      if (activeOverflowIdx !== -1) overflow.splice(activeOverflowIdx, 1);
      visible.push(activeItem);
      return { visibleTabs: visible, overflowTabs: overflow, isActiveInOverflow: false };
    }

    return { visibleTabs: visible, overflowTabs: overflow, isActiveInOverflow: activeInOverflow };
  }, [tabs, activeId, tabWidths, containerWidth, gap, moreButtonWidth, pinActiveTab]);

  return { containerRef, measureContainerRef, visibleTabs, overflowTabs, isActiveInOverflow, activeTab, containerWidth };
}
```

### Complete Implementation: `components/ResponsiveTabs.tsx`
```tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { TabItem, useResponsiveTabs } from '../hooks/useResponsiveTabs';

export interface ResponsiveTabsProps<T extends string = string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (id: T) => void;
  className?: string;
  pinActiveTab?: boolean;
  moreLabel?: string;
}

export function ResponsiveTabs<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  className = '',
  pinActiveTab = true,
  moreLabel = 'More'
}: ResponsiveTabsProps<T>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const moreButtonRef = useRef<HTMLButtonElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const {
    containerRef,
    measureContainerRef,
    visibleTabs,
    overflowTabs,
    isActiveInOverflow,
    activeTab: currentActiveTab
  } = useResponsiveTabs(tabs, activeTab, { pinActiveTab, gap: 6, moreButtonWidth: 105 });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        moreButtonRef.current &&
        !moreButtonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (visibleTabs.length === 0) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const currentIndex = visibleTabs.findIndex(t => t.id === activeTab);
      const nextIndex = (currentIndex + 1) % visibleTabs.length;
      onChange(visibleTabs[nextIndex].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const currentIndex = visibleTabs.findIndex(t => t.id === activeTab);
      const prevIndex = (currentIndex - 1 + visibleTabs.length) % visibleTabs.length;
      onChange(visibleTabs[prevIndex].id);
    } else if (e.key === 'Escape' && isDropdownOpen) {
      e.preventDefault();
      setIsDropdownOpen(false);
      moreButtonRef.current?.focus();
    }
  };

  const springTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: 'spring', stiffness: 450, damping: 35 };

  return (
    <div className={`relative w-full ${className}`} onKeyDown={handleKeyDown}>
      <div
        ref={measureContainerRef}
        aria-hidden="true"
        className="absolute top-0 left-0 flex items-center gap-1.5 opacity-0 pointer-events-none -z-50"
        style={{ visibility: 'hidden' }}
      >
        {tabs.map(tab => (
          <div key={tab.id} className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium whitespace-nowrap rounded-xl">
            {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && <span className="px-1.5 py-0.5 text-[10px] rounded-full">{tab.badge}</span>}
          </div>
        ))}
      </div>

      <div
        ref={containerRef}
        role="tablist"
        aria-orientation="horizontal"
        className="relative flex items-center gap-1.5 w-full p-1.5 rounded-2xl bg-neutral-900/60 backdrop-blur-xl border border-white/10 shadow-inner overflow-hidden"
      >
        {visibleTabs.map(tab => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => { onChange(tab.id); setIsDropdownOpen(false); }}
              className={`relative flex items-center gap-2 px-3.5 py-2 text-sm font-medium whitespace-nowrap rounded-xl transition-colors duration-200 outline-none cursor-pointer ${
                tab.disabled ? 'opacity-40 cursor-not-allowed' : isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="responsive-tabs-active-pill"
                  transition={springTransition}
                  className="absolute inset-0 rounded-xl bg-white/10 border border-white/20 shadow-[0_2px_12px_rgba(255,255,255,0.06)]"
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon && <span className="w-4 h-4 shrink-0">{tab.icon}</span>}
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`px-1.5 py-0.5 text-[10px] font-semibold rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-neutral-400'}`}>
                    {tab.badge}
                  </span>
                )}
              </span>
            </button>
          );
        })}

        {overflowTabs.length > 0 && (
          <div className="relative ml-auto shrink-0">
            <button
              ref={moreButtonRef}
              type="button"
              aria-haspopup="menu"
              aria-expanded={isDropdownOpen}
              onClick={() => setIsDropdownOpen(prev => !prev)}
              className={`relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium whitespace-nowrap rounded-xl transition-all cursor-pointer ${
                isActiveInOverflow ? 'text-white bg-white/10 border border-white/25 shadow-sm' : isDropdownOpen ? 'text-white bg-white/10 border border-white/15' : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {isActiveInOverflow && <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]" />}
              <span>{isActiveInOverflow && currentActiveTab ? `${moreLabel}: ${currentActiveTab.label}` : `${moreLabel} (${overflowTabs.length})`}</span>
              <motion.span animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}>
                <ChevronDown className="w-3.5 h-3.5" />
              </motion.span>
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  ref={dropdownRef}
                  role="menu"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.96 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.96 }}
                  transition={springTransition}
                  className="absolute right-0 mt-2 z-50 min-w-[210px] p-1.5 rounded-xl bg-neutral-900/95 backdrop-blur-2xl border border-white/15 shadow-[0_16px_36px_rgba(0,0,0,0.5)] focus:outline-none"
                >
                  <div className="py-1">
                    {overflowTabs.map(tab => {
                      const isTabActive = tab.id === activeTab;
                      return (
                        <button
                          key={tab.id}
                          role="menuitem"
                          type="button"
                          disabled={tab.disabled}
                          onClick={() => { onChange(tab.id); setIsDropdownOpen(false); moreButtonRef.current?.focus(); }}
                          className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg text-left transition-colors cursor-pointer ${
                            tab.disabled ? 'opacity-40 cursor-not-allowed' : isTabActive ? 'bg-white/15 text-white font-medium' : 'text-neutral-300 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            {tab.icon && <span className="w-4 h-4 shrink-0 text-neutral-400">{tab.icon}</span>}
                            <span className="truncate">{tab.label}</span>
                          </div>
                          {isTabActive && <Check className="w-4 h-4 text-blue-400 shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
```



---

## Recipe 13: Airplane Takeoff & Scooter Rider In-Flight Action Buttons

### Overview & Mechanics
- **Component**: `AnimatedTaskButton.tsx`
- **Location**: `components/AnimatedTaskButton.tsx`
- **Reference**: `design-system/BUTTON_IN_FLIGHT_TASK_ANIMATIONS_SPECIFICATION.md`
- **Technique**: Provides task-specific vector in-flight micro-animations replacing generic spinners for `"airplane"` (cargo flight takeoff with runway dashes, pitch angle, and contrails) and `"rider"` (urban courier on motor scooter with spinning wheels, bouncing delivery box, and asphalt streaks).

### Complete Copy-Paste Code:
```tsx
'use client';

import React from 'react';
import { AnimatedTaskButton } from '@/components/AnimatedTaskButton';

export function ActionButtonsDemo() {
  const handleAirDispatch = async () => {
    // Simulate flight dispatch network call
    await new Promise(resolve => setTimeout(resolve, 2800));
  };

  const handleRiderDispatch = async () => {
    // Simulate courier dispatch network call
    await new Promise(resolve => setTimeout(resolve, 2500));
  };

  return (
    <div className="flex flex-wrap items-center gap-4 p-8 bg-neutral-950 rounded-2xl border border-white/10">
      {/* Flight Cargo Button */}
      <AnimatedTaskButton
        taskType="airplane"
        label="Order by Air Express"
        loadingLabel="Flight Taking Off..."
        successLabel="Flight Dispatched!"
        onClick={handleAirDispatch}
        variant="primary"
      />

      {/* Urban Courier Rider Button */}
      <AnimatedTaskButton
        taskType="rider"
        label="Deliver via Rider"
        loadingLabel="Rider En Route..."
        successLabel="Rider Dispatched!"
        onClick={handleRiderDispatch}
        variant="glass"
      />
    </div>
  );
}
```

---

## Recipe 14: Liquid Gooey Navigation Tabs with SVG Filter

### Overview & Mechanics
- **Component**: `LiquidTabs.tsx`
- **Location**: `components/LiquidTabs.tsx`
- **Reference**: `design-system/LIQUID_GOOEY_NAVIGATION_TABS_SYSTEM.md`
- **Technique**: Uses an SVG `<feGaussianBlur>` and `<feColorMatrix>` filter on an isolated background layer (`z-0`) to achieve fluid, viscous meniscus stretching between tabs while preserving 100% crisp typography on the top layer (`z-10`).

### Complete Copy-Paste Code:
```tsx
'use client';

import React, { useState } from 'react';
import { LiquidTabs, LiquidTabItem } from '@/components/LiquidTabs';
import { LayoutGrid, Sparkles, Sliders, Shield } from 'lucide-react';

const navigationTabs: LiquidTabItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutGrid className="w-4 h-4" /> },
  { id: 'features', label: 'AI Features', icon: <Sparkles className="w-4 h-4" />, badge: 'New' },
  { id: 'settings', label: 'Settings', icon: <Sliders className="w-4 h-4" /> },
  { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> }
];

export function LiquidTabsDemo() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-neutral-950 min-h-[300px]">
      <LiquidTabs
        tabs={navigationTabs}
        activeTabId={activeTab}
        onChange={setActiveTab}
        variant="cyan"
      />
      <div className="mt-8 text-neutral-400 text-sm">
        Active section: <span className="text-cyan-400 font-semibold uppercase">{activeTab}</span>
      </div>
    </div>
  );
}
```

---

## Recipe 15: 3D Perspective Card Carousel UI

### Overview & Mechanics
- **Component**: `CardCarousel3D.tsx`
- **Location**: `components/CardCarousel3D.tsx`
- **Reference**: `design-system/3D_INTERACTIVE_CAROUSEL_SYSTEM.md`
- **Technique**: Cylindrical 3D perspective geometry ($R = W / (2 \tan(\pi/N))$) with pointer drag momentum, spring snapping, and dynamic specular gloss glare.

### Complete Copy-Paste Code:
```tsx
'use client';

import React from 'react';
import { CardCarousel3D, Carousel3DItem } from '@/components/CardCarousel3D';

const showcaseCards: Carousel3DItem[] = [
  {
    id: '1',
    title: 'Autonomous Builder Engine',
    subtitle: 'Next.js 15 & AI',
    description: 'Self-assembling fullstack application engine with automated compliance gates.',
    tag: 'Core System'
  },
  {
    id: '2',
    title: 'Apple macOS Genie Portals',
    subtitle: '3D Spatial Deletion',
    description: 'Screen-level portal coordinate elevation and vacuum siphon trash bin physics.',
    tag: 'Motion Physics'
  },
  {
    id: '3',
    title: 'Liquid Gooey Tabs',
    subtitle: 'Fluid Viscous Meniscus',
    description: 'Organic SVG color matrix filter indicator with zero font anti-aliasing degradation.',
    tag: 'Navigation'
  },
  {
    id: '4',
    title: 'Flight Cargo & Rider Buttons',
    subtitle: 'Task In-Flight Narratives',
    description: 'Zero generic loading spinners. Real-time vector stories during network requests.',
    tag: 'Micro-Actions'
  },
  {
    id: '5',
    title: '3D Cylinder Carousel',
    subtitle: 'Spatial Depth Matrix',
    description: 'Pointer momentum drag, velocity snapping, and specular reflection highlights.',
    tag: 'Showcase UI'
  }
];

export function Carousel3DDemo() {
  return (
    <div className="w-full py-12 bg-neutral-950 flex flex-col items-center">
      <CardCarousel3D
        items={showcaseCards}
        cardWidth={320}
        cardHeight={400}
        onSelect={(item) => console.log('Selected card:', item.title)}
      />
    </div>
  );
}
```
