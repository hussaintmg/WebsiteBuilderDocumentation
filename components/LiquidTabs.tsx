'use client';

import React, { useRef, useEffect, useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface LiquidTabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface LiquidTabsProps {
  tabs: LiquidTabItem[];
  activeTabId: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: 'cyan' | 'emerald' | 'violet' | 'amber';
}

/**
 * LiquidTabs
 * Premium navigation tab bar featuring viscous fluid gooey physics.
 * Strict Layer-3 DOM architecture guarantees 100% crisp text anti-aliasing.
 */
export const LiquidTabs: React.FC<LiquidTabsProps> = ({
  tabs,
  activeTabId,
  onChange,
  className = '',
  variant = 'cyan'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [pillGeometry, setPillGeometry] = useState({ left: 0, width: 0, height: 0 });
  const [prevLeft, setPrevLeft] = useState(0);
  const filterId = useId().replace(/:/g, '');

  // Calculate coordinates of active tab relative to container
  useEffect(() => {
    const activeEl = tabRefs.current.get(activeTabId);
    const containerEl = containerRef.current;
    if (activeEl && containerEl) {
      const activeRect = activeEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();
      const newLeft = activeRect.left - containerRect.left;
      setPrevLeft(pillGeometry.left || newLeft);
      setPillGeometry({
        left: newLeft,
        width: activeRect.width,
        height: activeRect.height
      });
    }
  }, [activeTabId, tabs]);

  // Color variants for liquid meniscus
  const variantGradients = {
    cyan: 'from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.35)]',
    emerald: 'from-emerald-500 to-teal-600 shadow-[0_0_20px_rgba(16,185,129,0.35)]',
    violet: 'from-violet-500 to-indigo-600 shadow-[0_0_20px_rgba(139,92,246,0.35)]',
    amber: 'from-amber-500 to-orange-600 shadow-[0_0_20px_rgba(245,158,11,0.35)]'
  }[variant];

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      const nextTab = tabs[nextIndex];
      onChange(nextTab.id);
      tabRefs.current.get(nextTab.id)?.focus();
    }
  };

  const isMovingRight = pillGeometry.left >= prevLeft;

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label="Liquid Navigation Tabs"
      className={`relative inline-flex items-center p-1.5 rounded-2xl backdrop-blur-xl bg-neutral-900/70 border border-white/10 shadow-2xl select-none ${className}`}
    >
      {/* SVG Gooey Matrix Filter Definition (Hidden from DOM display) */}
      <svg className="absolute w-0 h-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <defs>
          <filter id={`liquid-goo-${filterId}`} colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 20 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Layer 1: Liquid Fluid Background (Viscous Meniscus with SVG Filter) */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
        style={{ filter: `url(#liquid-goo-${filterId})` }}
      >
        {pillGeometry.width > 0 && (
          <>
            {/* Primary Fluid Pill */}
            <motion.div
              layoutId="liquid-primary-pill"
              animate={{
                x: pillGeometry.left,
                width: pillGeometry.width,
                height: pillGeometry.height
              }}
              transition={{
                type: 'spring',
                stiffness: 480,
                damping: 30,
                mass: 0.8
              }}
              className={`absolute top-1.5 rounded-xl bg-gradient-to-r ${variantGradients}`}
            />

            {/* Trailing Capillary Droplet (Separates and recombines during motion) */}
            <motion.div
              animate={{
                x: isMovingRight ? pillGeometry.left - 6 : pillGeometry.left + pillGeometry.width - 10,
                opacity: [0, 0.9, 0],
                scale: [0.6, 1.2, 0.4]
              }}
              transition={{
                duration: 0.35,
                ease: 'easeOut'
              }}
              className={`absolute top-3 w-4 h-4 rounded-full bg-gradient-to-r ${variantGradients}`}
            />
          </>
        )}
      </div>

      {/* Layer 2: Interactive Tabs & Typography (100% Crisp, Untouched by Filter) */}
      <div className="relative z-10 flex items-center gap-1">
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              ref={el => {
                if (el) tabRefs.current.set(tab.id, el);
                else tabRefs.current.delete(tab.id);
              }}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={e => handleKeyDown(e, index)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {tab.icon && (
                <span className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'scale-110 text-white' : 'text-neutral-400'}`}>
                  {tab.icon}
                </span>
              )}
              <span className="tracking-wide">{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full transition-colors ${
                    isActive ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

