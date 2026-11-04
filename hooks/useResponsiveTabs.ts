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

export interface UseResponsiveTabsResult<T = string> {
  containerRef: React.RefObject<HTMLDivElement | null>;
  measureContainerRef: React.RefObject<HTMLDivElement | null>;
  visibleTabs: TabItem<T>[];
  overflowTabs: TabItem<T>[];
  isActiveInOverflow: boolean;
  activeTab: TabItem<T> | undefined;
  containerWidth: number;
}

/**
 * useResponsiveTabs Hook
 * 
 * Dynamically computes visible tabs vs overflow tabs based on real-time
 * container pixel width measured by ResizeObserver.
 */
export function useResponsiveTabs<T extends string = string>(
  tabs: TabItem<T>[],
  activeId: T,
  options: UseResponsiveTabsOptions = {}
): UseResponsiveTabsResult<T> {
  const { gap = 6, moreButtonWidth = 96, pinActiveTab = true } = options;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureContainerRef = useRef<HTMLDivElement | null>(null);

  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [tabWidths, setTabWidths] = useState<number[]>([]);

  // Find active tab item
  const activeTab = useMemo(
    () => tabs.find(t => t.id === activeId) || tabs[0],
    [tabs, activeId]
  );

  // Measure tab widths from hidden measuring container
  const measureTabs = useCallback(() => {
    if (!measureContainerRef.current) return;
    const children = Array.from(measureContainerRef.current.children) as HTMLElement[];
    const widths = children.map(child => Math.ceil(child.getBoundingClientRect().width));
    setTabWidths(widths);
  }, []);

  // Set up ResizeObserver on visible container
  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setContainerWidth(Math.floor(width));
      }
    });

    observer.observe(el);
    setContainerWidth(Math.floor(el.getBoundingClientRect().width));

    return () => observer.disconnect();
  }, []);

  // Measure tab element widths on mount and whenever tabs change
  useEffect(() => {
    measureTabs();
  }, [tabs, measureTabs]);

  // Orientation and window resize listener
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

  // Compute Partitioning
  const { visibleTabs, overflowTabs, isActiveInOverflow } = useMemo(() => {
    if (tabs.length === 0) {
      return { visibleTabs: [], overflowTabs: [], isActiveInOverflow: false };
    }

    // Default fallback if not yet measured (render all visible initially to prevent flash)
    if (containerWidth === 0 || tabWidths.length !== tabs.length) {
      return { visibleTabs: tabs, overflowTabs: [], isActiveInOverflow: false };
    }

    // Calculate total width if all tabs were rendered
    const totalTabsWidth = tabWidths.reduce((acc, w) => acc + w, 0) + (tabs.length - 1) * gap;

    // Case 1: Everything fits comfortably
    if (totalTabsWidth <= containerWidth) {
      return {
        visibleTabs: tabs,
        overflowTabs: [],
        isActiveInOverflow: false
      };
    }

    // Case 2: Overflow budgeting
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

    // Ensure at least 1 tab is visible if possible
    if (visible.length === 0 && tabs.length > 0) {
      visible.push(tabs[0]);
      overflow.splice(0, 1);
    }

    const activeInOverflow = overflow.some(t => t.id === activeId);

    // If pinActiveTab is enabled and active tab was pushed to overflow, promote it!
    if (pinActiveTab && activeInOverflow && activeIndex !== -1 && visible.length > 0) {
      const activeItem = tabs[activeIndex];
      // Replace last visible tab with activeItem
      const lastVisible = visible.pop()!;
      overflow.push(lastVisible);

      // Remove activeItem from overflow
      const activeOverflowIdx = overflow.findIndex(t => t.id === activeId);
      if (activeOverflowIdx !== -1) {
        overflow.splice(activeOverflowIdx, 1);
      }
      visible.push(activeItem);

      return {
        visibleTabs: visible,
        overflowTabs: overflow,
        isActiveInOverflow: false
      };
    }

    return {
      visibleTabs: visible,
      overflowTabs: overflow,
      isActiveInOverflow: activeInOverflow
    };
  }, [tabs, activeId, tabWidths, containerWidth, gap, moreButtonWidth, pinActiveTab]);

  return {
    containerRef,
    measureContainerRef,
    visibleTabs,
    overflowTabs,
    isActiveInOverflow,
    activeTab,
    containerWidth
  };
}

