# 🎠 Master Specification: 3D Perspective Card Carousel System

> **FILE:** `design-system/3D_INTERACTIVE_CAROUSEL_SYSTEM.md`  
> **CLASSIFICATION:** 3D Spatial Geometry & Touch-Momentum Carousel  
> **COMPANION COMPONENT (generated in the target project):** `components/CardCarousel3D.tsx`  
> **RECIPE:** [`design-system/09_IMPLEMENTATION_RECIPES.md#recipe-15`](./09_IMPLEMENTATION_RECIPES.md#recipe-15)  
> **INSPIRATION:** Usman Shams ([@iusmanshams](https://www.instagram.com/iusmanshams/)) and Apple Cover Flow 3D

---

## 1. Architectural Overview & Spatial Geometry

The **3D Perspective Card Carousel System** renders an interactive circular cylinder or elliptical ring of luxury cards positioned in true 3D CSS perspective space. Users can drag, swipe, or click pagination controls, causing cards to smoothly orbit around the central axis with realistic inertia and depth attenuation.

```
                    [ Card i-1 ] (scale: 0.85, z: -100px)
                   /            \
                  /              \
[ Card i-2 ]     /                \     [ Card i+1 ] (scale: 0.85, z: -100px)
                |                  |
                 \                /
                  \              /
                   \____________/
                  [ ACTIVE CARD i ] (scale: 1.0, z: 0px, Specular Glare)
```

---

## 2. Mathematical Foundation: Cylindrical Coordinate Distribution

Given $N$ items and a carousel radius $R$ derived from card width $W_{\text{card}}$:
$$R = \frac{W_{\text{card}}}{2 \cdot \tan\left(\frac{\pi}{N}\right)}$$

For each card $i \in \{0, 1, \dots, N-1\}$ with rotational drag angle $\theta_{\text{rot}}$:
$$\theta_i = \left(\frac{360^\circ}{N} \cdot i\right) + \theta_{\text{rot}}$$

### 2.1 Depth, Scale, and Opacity Attenuation
The visual priority of each card is modulated by its angular distance from the focal plane ($\theta = 0^\circ$):
$$\Delta\theta_i = \left(\theta_i + 180^\circ \pmod{360^\circ}\right) - 180^\circ$$
$$\text{proximity}_i = \cos(\Delta\theta_i \cdot \frac{\pi}{180^\circ})$$

The 3D CSS spatial transformation applied to each card facet is:
```css
transform: rotateY(var(--card-angle)) translateZ(var(--cylinder-radius)) scale(var(--depth-scale));
```

1. **Z-Translation**: $z_i = R \cdot (\text{proximity}_i - 1)$ via `translateZ`
2. **Scale Factor**: $s_i = 0.75 + 0.25 \cdot \max(0, \text{proximity}_i)$
3. **Card Opacity**: $\alpha_i = \max(0.2, \text{proximity}_i^{1.5})$
4. **Z-Index Layering**: $z\text{-index}_i = \lfloor 100 \cdot \text{proximity}_i \rfloor$

---

## 3. Touch Drag Momentum & Inertia Snapping

1. **Pointer Down**: Captures starting client coordinate $X_0$ and resets velocity history.
2. **Pointer Move**: Calculates displacement:
   $$\Delta\theta = \frac{\Delta X}{\text{dragFactor}}$$
   Updates rotational angle with $60\text{ FPS}$ frame rendering.
3. **Pointer Up**: Evaluates release velocity $v_x = \frac{\Delta X}{\Delta t}$.
   - If $|v_x| > v_{\text{threshold}}$, momentum continues over $k$ frames with exponential decay factor $\mu = 0.92$.
   - Elastic spring snaps to the nearest exact card index:
     $$i_{\text{target}} = \operatorname{round}\left(-\frac{\theta_{\text{rot}}}{360^\circ / N}\right) \pmod N$$

---

## 4. Specular Lighting & Glass Glare Physics

Each card features an active specular highlight layer that dynamically mirrors the card's tilt angle:
```tsx
const glareOpacity = Math.max(0, proximity);
const glareTransform = `translateX(${deltaTheta * 1.5}px)`;
```
This produces an organic metallic reflection that glides across the frosted card facet as it passes the central spotlight.

---

## 5. Accessibility & Responsive Degradation

- When screen width $< 640\text{px}$ (mobile devices), cylinder radius automatically contracts, and cards transition into a clean horizontal scroll snap with touch swipe.
- When `prefers-reduced-motion` is active, 3D rotations are flattened to standard 2D sliding transitions.
- Full keyboard support: `ArrowLeft` / `ArrowRight` rotates carousel by exactly 1 card.


---

## 6. Complete Component Source Code: `components/CardCarousel3D.tsx`

When instructed to create a 3D showcase or card carousel, the AI agent must scaffold the component at `<project-root>/components/CardCarousel3D.tsx`:

```tsx
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export interface Carousel3DItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  tag?: string;
  accentColor?: string;
  actionUrl?: string;
}

export interface CardCarousel3DProps {
  items: Carousel3DItem[];
  cardWidth?: number;
  cardHeight?: number;
  className?: string;
  onSelect?: (item: Carousel3DItem) => void;
}

/**
 * CardCarousel3D
 * Cylindrical 3D perspective card carousel with touch/pointer momentum physics,
 * depth scaling, and specular lighting reflections.
 */
export const CardCarousel3D: React.FC<CardCarousel3DProps> = ({
  items,
  cardWidth = 320,
  cardHeight = 420,
  className = '',
  onSelect
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartRotation = useRef(0);

  const N = Math.max(items.length, 1);
  const anglePerItem = 360 / N;
  const radius = Math.round(cardWidth / (2 * Math.tan(Math.PI / N))) + 60;

  const rotationAngle = useMotionValue(0);
  const smoothAngle = useSpring(rotationAngle, {
    stiffness: 350,
    damping: 32,
    mass: 0.8
  });

  const [currentAngle, setCurrentAngle] = useState(0);

  useEffect(() => {
    const unsubscribe = smoothAngle.on('change', v => {
      setCurrentAngle(v);
      const normalizedIndex = (Math.round(-v / anglePerItem) % N + N) % N;
      setActiveIndex(normalizedIndex);
    });
    return () => unsubscribe();
  }, [smoothAngle, anglePerItem, N]);

  const snapToIndex = useCallback(
    (index: number) => {
      const targetAngle = -index * anglePerItem;
      rotationAngle.set(targetAngle);
    },
    [anglePerItem, rotationAngle]
  );

  const handlePrev = () => {
    const nextIndex = (activeIndex - 1 + N) % N;
    snapToIndex(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % N;
    snapToIndex(nextIndex);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartRotation.current = rotationAngle.get();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    const deltaAngle = (deltaX / cardWidth) * anglePerItem * 1.2;
    rotationAngle.set(dragStartRotation.current + deltaAngle);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if capture lost
    }
    const current = rotationAngle.get();
    const nearestIndex = Math.round(-current / anglePerItem);
    rotationAngle.set(-nearestIndex * anglePerItem);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`relative w-full flex flex-col items-center justify-center py-12 overflow-hidden select-none outline-none focus-visible:ring-1 focus-visible:ring-cyan-500/50 ${className}`}
      style={{ perspective: '1200px' }}
    >
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          width: cardWidth,
          height: cardHeight,
          transformStyle: 'preserve-3d'
        }}
      >
        {items.map((item, index) => {
          const itemBaseAngle = index * anglePerItem;
          const totalAngle = itemBaseAngle + currentAngle;
          const normalizedAngle = (((totalAngle % 360) + 540) % 360) - 180;
          const rad = (normalizedAngle * Math.PI) / 180;
          const proximity = Math.cos(rad);
          const isFront = proximity > 0.4;
          const scale = 0.75 + 0.25 * Math.max(0, proximity);
          const opacity = Math.max(0.18, Math.pow(proximity, 1.4));
          const zIndex = Math.round(proximity * 100);

          return (
            <div
              key={item.id}
              onClick={() => {
                if (index === activeIndex && onSelect) {
                  onSelect(item);
                } else {
                  snapToIndex(index);
                }
              }}
              className="absolute inset-0 rounded-3xl transition-shadow duration-300"
              style={{
                width: cardWidth,
                height: cardHeight,
                transform: `rotateY(${itemBaseAngle + currentAngle}deg) translateZ(${radius}px) scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex,
                backfaceVisibility: 'hidden',
                pointerEvents: isFront ? 'auto' : 'none'
              }}
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden backdrop-blur-2xl bg-neutral-900/85 border border-white/10 shadow-2xl flex flex-col justify-between p-6 group hover:border-white/20 transition-all duration-300">
                <div
                  className="absolute inset-0 pointer-events-none rounded-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(${135 + normalizedAngle * 0.4}deg, rgba(255,255,255,0.25) 0%, transparent 60%)`
                  }}
                />

                <div className="relative z-10 flex items-center justify-between">
                  {item.tag && (
                    <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
                      {item.tag}
                    </span>
                  )}
                  {item.actionUrl && (
                    <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-400 group-hover:text-white transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </span>
                  )}
                </div>

                {item.image && (
                  <div className="relative z-10 w-full h-36 rounded-2xl overflow-hidden my-3 border border-white/5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="relative z-10 mt-auto">
                  {item.subtitle && (
                    <p className="text-xs font-medium text-cyan-400 uppercase tracking-widest mb-1">
                      {item.subtitle}
                    </p>
                  )}
                  <h3 className="text-xl font-bold text-white tracking-tight leading-snug mb-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-20 flex items-center gap-6 mt-8">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous card"
          className="p-3 rounded-2xl backdrop-blur-xl bg-neutral-900/80 border border-white/10 text-neutral-300 hover:text-white hover:border-white/20 hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => snapToIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-7 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                  : 'w-2 bg-neutral-700 hover:bg-neutral-500'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next card"
          className="p-3 rounded-2xl backdrop-blur-xl bg-neutral-900/80 border border-white/10 text-neutral-300 hover:text-white hover:border-white/20 hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
```

---

## 7. AI Agent Scaffolding & Integration Guide

1. Place `<target-project>/components/CardCarousel3D.tsx`.
2. Import into showcase sections:
   ```tsx
   import { CardCarousel3D } from '@/components/CardCarousel3D';

   <CardCarousel3D items={showcaseData} />
   ```
