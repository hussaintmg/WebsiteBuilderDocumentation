'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
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

  // Spring-driven rotation angle
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

  // Pointer drag handlers
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

  // Keyboard navigation
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
      {/* 3D Orbiting Stage */}
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
          // Angle of this specific card
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
              {/* Frosted Glass Card Shell */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden backdrop-blur-2xl bg-neutral-900/85 border border-white/10 shadow-2xl flex flex-col justify-between p-6 group hover:border-white/20 transition-all duration-300">
                {/* Dynamic Specular Lighting Glare */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(${135 + normalizedAngle * 0.4}deg, rgba(255,255,255,0.25) 0%, transparent 60%)`
                  }}
                />

                {/* Card Header (Tag & Icon) */}
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

                {/* Optional Image Banner */}
                {item.image && (
                  <div className="relative z-10 w-full h-36 rounded-2xl overflow-hidden my-3 border border-white/5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Card Content Footer */}
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

      {/* Navigation Controls & Pagination Dots */}
      <div className="relative z-20 flex items-center gap-6 mt-8">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous card"
          className="p-3 rounded-2xl backdrop-blur-xl bg-neutral-900/80 border border-white/10 text-neutral-300 hover:text-white hover:border-white/20 hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Paginator Dots */}
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

