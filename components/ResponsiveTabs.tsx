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
  } = useResponsiveTabs(tabs, activeTab, {
    pinActiveTab,
    gap: 6,
    moreButtonWidth: 105
  });

  // Close dropdown on outside click
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

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Keyboard navigation across visible tabs and dropdown
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

  const handleDropdownKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (overflowTabs.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => (prev + 1) % overflowTabs.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => (prev - 1 + overflowTabs.length) % overflowTabs.length);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < overflowTabs.length) {
        onChange(overflowTabs[focusedIndex].id);
        setIsDropdownOpen(false);
        moreButtonRef.current?.focus();
      }
    } else if (e.key === 'Escape') {
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
      {/* ==================================================================== */}
      {/* HIDDEN MEASUREMENT ROW (Offscreen, zero-layout interference)          */}
      {/* ==================================================================== */}
      <div
        ref={measureContainerRef}
        aria-hidden="true"
        className="absolute top-0 left-0 flex items-center gap-1.5 opacity-0 pointer-events-none -z-50"
        style={{ visibility: 'hidden' }}
      >
        {tabs.map(tab => (
          <div
            key={tab.id}
            className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium whitespace-nowrap rounded-xl border border-transparent"
          >
            {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-white/10">
                {tab.badge}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* ==================================================================== */}
      {/* ACTIVE RESPONSIVE TAB BAR CONTAINER (Zero horizontal scrolling)      */}
      {/* ==================================================================== */}
      <div
        ref={containerRef}
        role="tablist"
        aria-orientation="horizontal"
        className="relative flex items-center gap-1.5 w-full p-1.5 rounded-2xl bg-neutral-900/60 backdrop-blur-xl border border-white/10 shadow-inner overflow-hidden"
      >
        {/* Render Visible Tabs */}
        {visibleTabs.map(tab => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              id={`tab-${tab.id}`}
              aria-controls={`panel-${tab.id}`}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => {
                onChange(tab.id);
                setIsDropdownOpen(false);
              }}
              className={`relative flex items-center gap-2 px-3.5 py-2 text-sm font-medium whitespace-nowrap rounded-xl transition-colors duration-200 outline-none select-none cursor-pointer ${
                tab.disabled
                  ? 'opacity-40 cursor-not-allowed'
                  : isActive
                  ? 'text-white'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
              }`}
            >
              {/* Framer Motion Active Gliding Pill */}
              {isActive && (
                <motion.div
                  layoutId="responsive-tabs-active-pill"
                  transition={springTransition}
                  className="absolute inset-0 rounded-xl bg-white/10 border border-white/20 shadow-[0_2px_12px_rgba(255,255,255,0.06)]"
                />
              )}

              {/* Icon & Label */}
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon && <span className="w-4 h-4 shrink-0">{tab.icon}</span>}
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-semibold rounded-full transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-white/10 text-neutral-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </span>
            </button>
          );
        })}

        {/* ================================================================== */}
        {/* DROPDOWN OVERFLOW TRIGGER BUTTON                                    */}
        {/* ================================================================== */}
        {overflowTabs.length > 0 && (
          <div className="relative ml-auto shrink-0">
            <button
              ref={moreButtonRef}
              type="button"
              aria-haspopup="menu"
              aria-expanded={isDropdownOpen}
              aria-label={`${moreLabel} options`}
              onClick={() => setIsDropdownOpen(prev => !prev)}
              className={`relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium whitespace-nowrap rounded-xl transition-all duration-200 outline-none cursor-pointer select-none ${
                isActiveInOverflow
                  ? 'text-white bg-white/10 border border-white/25 shadow-sm'
                  : isDropdownOpen
                  ? 'text-white bg-white/10 border border-white/15'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {/* Active Tab Indicator Dot when selected tab is hidden inside dropdown */}
              {isActiveInOverflow && (
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
              )}

              <span>
                {isActiveInOverflow && currentActiveTab
                  ? `${moreLabel}: ${currentActiveTab.label}`
                  : `${moreLabel} (${overflowTabs.length})`}
              </span>

              <motion.span
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                className="shrink-0"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </motion.span>
            </button>

            {/* ================================================================ */}
            {/* ELEVATED GLASS DROPDOWN MENU                                      */}
            {/* ================================================================ */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  ref={dropdownRef}
                  role="menu"
                  tabIndex={-1}
                  onKeyDown={handleDropdownKeyDown}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -6, scale: 0.96 }
                  }
                  animate={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 1, y: 0, scale: 1 }
                  }
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -6, scale: 0.96 }
                  }
                  transition={springTransition}
                  className="absolute right-0 mt-2 z-50 min-w-[210px] p-1.5 rounded-xl bg-neutral-900/95 backdrop-blur-2xl border border-white/15 shadow-[0_16px_36px_rgba(0,0,0,0.5)] focus:outline-none"
                >
                  <div className="py-1">
                    {overflowTabs.map((tab, idx) => {
                      const isTabActive = tab.id === activeTab;
                      const isFocused = idx === focusedIndex;

                      return (
                        <button
                          key={tab.id}
                          role="menuitem"
                          type="button"
                          disabled={tab.disabled}
                          onClick={() => {
                            onChange(tab.id);
                            setIsDropdownOpen(false);
                            moreButtonRef.current?.focus();
                          }}
                          className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg text-left transition-colors cursor-pointer outline-none select-none ${
                            tab.disabled
                              ? 'opacity-40 cursor-not-allowed'
                              : isTabActive
                              ? 'bg-white/15 text-white font-medium'
                              : isFocused
                              ? 'bg-white/10 text-white'
                              : 'text-neutral-300 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            {tab.icon && (
                              <span className="w-4 h-4 shrink-0 text-neutral-400">
                                {tab.icon}
                              </span>
                            )}
                            <span className="truncate">{tab.label}</span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 ml-2">
                            {tab.badge !== undefined && (
                              <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-white/10 text-neutral-400">
                                {tab.badge}
                              </span>
                            )}
                            {isTabActive && (
                              <Check className="w-4 h-4 text-blue-400 shrink-0" />
                            )}
                          </div>
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
