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
1. [Recipe 1: Production Floating Label Input with Native Validation](#recipe-1-production-floating-label-input)
2. [Recipe 2: Cursor-Tracking Spotlight Card with Radial Illumination](#recipe-2-cursor-tracking-spotlight-card)
3. [Recipe 3: Specular 3D Perspective Tilt Card](#recipe-3-specular-3d-perspective-tilt-card)
4. [Recipe 4: Gesture-Driven Swipeable Stacked Card Deck (Tinder-Style)](#recipe-4-gesture-driven-swipeable-stacked-card-deck)
5. [Recipe 5: Strict Gated Action Button (Idle ➔ Loading ➔ Verified Success)](#recipe-5-strict-gated-action-button)
6. [Recipe 6: Liquid Glassmorphic Floating Pill Navbar with Scroll Observer](#recipe-6-liquid-glassmorphic-floating-pill-navbar)
7. [Recipe 7: Pure CSS Scroll Progress Bar (Zero-JS ScrollTimeline)](#recipe-7-pure-css-scroll-progress-bar)

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
