#!/usr/bin/env node

/**
 * ============================================================================
 * WEBSITE BUILDER ENGINE — AUTOMATED CORE SCAFFOLDER CLI
 * ============================================================================
 * 
 * Automatically provisions all mandatory Website Builder Engine core systems
 * directly into any target Next.js / React project in 2 seconds:
 * 
 * 1. lib/utils.ts (Clean cn() class merger)
 * 2. hooks/useRapidClickBatcher.ts (0ms optimistic UI, 300ms debounce, AbortController)
 * 3. components/GenieTrashBinPortal.tsx (Screen-level fixed z-[99999] 3D vacuum deletion)
 * 4. hooks/useGenieTrashDelete.ts (Screen-level boundingClientRect capture)
 * 5. components/AnimatedPageWrapper.tsx (Framer motion page transition wrapper)
 * 6. components/GlassCard.tsx (Obsidian dark glassmorphic card container)
 * 7. lib/safe-storage.ts (Multi-tier unified storage engine: local, buffer, supabase, vercel)
 * 8. context/AppContext.tsx (Context law single-source-of-truth master provider)
 * 9. Audit and update package.json for required dependencies
 * 
 * Usage:
 *   node scaffold-engine.js [project-directory]
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Usage:
  node scaffold-engine.js [project-directory] [--force]

Options:
  --force    Overwrite existing files
  --help     Show this help message
`);
  process.exit(0);
}
const targetDirArg = args.find(a => !a.startsWith('--'));
const targetDir = path.resolve(targetDirArg || process.cwd());

const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m'
};

function log(msg) { console.log(msg); }

log(`\n${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════════════${colors.reset}`);
log(`${colors.bold}${colors.white}  🚀 WEBSITE BUILDER ENGINE — CORE AUTO-SCAFFOLDER CLI${colors.reset}`);
log(`${colors.gray}  Target Directory: ${targetDir}${colors.reset}`);
log(`${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════════════${colors.reset}\n`);

// Ensure directory helper
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Safe file creator (does not overwrite existing if custom, unless --force)
const isForce = args.includes('--force');

function safeWrite(relPath, content) {
  const fullPath = path.join(targetDir, relPath);
  ensureDir(path.dirname(fullPath));
  if (fs.existsSync(fullPath) && !isForce) {
    log(`  ${colors.yellow}↷ Skipped (already exists):${colors.reset} ${relPath}`);
    return false;
  }
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
  log(`  ${colors.green}✔ Created:${colors.reset} ${relPath}`);
  return true;
}

// -----------------------------------------------------------------------------
// 1. lib/utils.ts
// -----------------------------------------------------------------------------
const UTILS_TS = `
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

// -----------------------------------------------------------------------------
// 2. hooks/useRapidClickBatcher.ts
// -----------------------------------------------------------------------------
const RAPID_CLICK_BATCHER_TS = `
import { useRef, useCallback } from 'react';

interface BatcherOptions<T> {
  delayMs?: number;
  onFlush: (finalValue: T, abortSignal: AbortSignal) => Promise<void>;
  onError?: (err: unknown, rollbackValue: T) => void;
}

export function useRapidClickBatcher<T>({
  delayMs = 300,
  onFlush,
  onError
}: BatcherOptions<T>) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const pendingValueRef = useRef<T | null>(null);
  const initialValueRef = useRef<T | null>(null);

  const trigger = useCallback((nextValue: T, optimisticAction?: (val: T) => void) => {
    if (initialValueRef.current === null) {
      initialValueRef.current = nextValue;
    }
    pendingValueRef.current = nextValue;

    // 0ms Optimistic UI update
    if (optimisticAction) {
      optimisticAction(nextValue);
    }

    // Cancel in-flight debounce timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(async () => {
      // Abort previous in-flight server network request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      const finalVal = pendingValueRef.current;
      const rollbackVal = initialValueRef.current;

      // Reset trackers
      initialValueRef.current = null;
      pendingValueRef.current = null;

      if (finalVal !== null) {
        try {
          await onFlush(finalVal, abortControllerRef.current.signal);
        } catch (err: any) {
          if (err?.name === 'AbortError') return;
          if (onError && rollbackVal !== null) {
            onError(err, rollbackVal);
          }
        }
      }
    }, delayMs);
  }, [delayMs, onFlush, onError]);

  const flushImmediately = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (pendingValueRef.current !== null && abortControllerRef.current) {
      onFlush(pendingValueRef.current, abortControllerRef.current.signal);
      pendingValueRef.current = null;
      initialValueRef.current = null;
    }
  }, [onFlush]);

  return { trigger, flushImmediately };
}
`;

// -----------------------------------------------------------------------------
// 3. hooks/useGenieTrashDelete.ts
// -----------------------------------------------------------------------------
const USE_GENIE_TRASH_DELETE_TS = `
import { useState, useCallback } from 'react';

export interface DeletingSnapshot {
  id: string;
  sourceRect: DOMRect;
  domCloneNode?: HTMLElement;
}

export function useGenieTrashDelete() {
  const [deletingItems, setDeletingItems] = useState<DeletingSnapshot[]>([]);

  const initiateDelete = useCallback((
    id: string,
    elementRef: HTMLElement | null,
    onAnimationComplete: () => Promise<void> | void
  ) => {
    if (!elementRef) {
      onAnimationComplete();
      return;
    }

    // Capture screen coordinates bypassing container overflow
    const rect = elementRef.getBoundingClientRect();
    
    // Elevate to fixed portal snapshot
    const snapshot: DeletingSnapshot = {
      id,
      sourceRect: rect
    };

    setDeletingItems(prev => [...prev, snapshot]);

    // Cleanup snapshot after animation completes
    setTimeout(async () => {
      await onAnimationComplete();
      setDeletingItems(prev => prev.filter(item => item.id !== id));
    }, 850);
  }, []);

  return { deletingItems, initiateDelete };
}
`;

// -----------------------------------------------------------------------------
// 4. components/GenieTrashBinPortal.tsx
// -----------------------------------------------------------------------------
const GENIE_TRASH_BIN_PORTAL_TSX = `
'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import type { DeletingSnapshot } from '@/hooks/useGenieTrashDelete';

interface GenieTrashBinPortalProps {
  deletingItems: DeletingSnapshot[];
}

export const GenieTrashBinPortal: React.FC<GenieTrashBinPortalProps> = ({ deletingItems }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || typeof document === 'undefined') return null;

  const isActive = deletingItems.length > 0;

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden" aria-hidden="true">
      {/* Kinetic Trash Bin rushing from screen right edge */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            key="screen-trash-bin"
            initial={{ x: 260, opacity: 0, scale: 0.85 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 260, opacity: 0, scale: 0.85, transition: { duration: 0.35, ease: 'easeIn' } }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="absolute bottom-10 right-8 flex flex-col items-center justify-center p-4 rounded-2xl bg-neutral-900/90 border border-red-500/30 backdrop-blur-2xl shadow-2xl shadow-red-950/40"
          >
            {/* Motorized Bin Lid Opening */}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: -55, y: -4 }}
              exit={{ rotate: 0, y: 0, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="origin-bottom-left mb-1"
            >
              <div className="w-12 h-2.5 bg-red-500 rounded-t-sm shadow-md" />
            </motion.div>

            {/* Trash Can Body */}
            <div className="w-12 h-14 bg-gradient-to-b from-red-600 to-red-900 rounded-b-xl flex items-center justify-center border-t border-red-400/50 shadow-inner">
              <Trash2 className="w-6 h-6 text-white/90 animate-pulse" />
            </div>

            {/* Particle Glow Core */}
            <div className="absolute -inset-1 bg-red-500/20 rounded-2xl blur-lg -z-10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Genie Vacuum Siphon Fly-In for Deleted Items */}
      <AnimatePresence>
        {deletingItems.map(item => {
          const startX = item.sourceRect.left;
          const startY = item.sourceRect.top;
          const startW = item.sourceRect.width;
          const startH = item.sourceRect.height;
          
          // Target position: screen bottom-right trash can mouth
          const targetX = typeof window !== 'undefined' ? window.innerWidth - 64 : 1000;
          const targetY = typeof window !== 'undefined' ? window.innerHeight - 76 : 800;

          return (
            <motion.div
              key={item.id}
              initial={{
                position: 'fixed',
                left: startX,
                top: startY,
                width: startW,
                height: startH,
                opacity: 1,
                scaleX: 1,
                scaleY: 1,
                rotateZ: 0,
                transformPerspective: 1000
              }}
              animate={{
                left: targetX,
                top: targetY,
                width: 48,
                height: 48,
                opacity: [1, 0.9, 0.4, 0],
                scaleX: [1, 0.5, 0.12, 0.05],
                scaleY: [1, 0.7, 0.25, 0.05],
                rotateZ: [0, -10, 25, 45],
                rotateX: [0, 30, 65, 80]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.75,
                ease: [0.25, 1, 0.5, 1]
              }}
              className="rounded-xl bg-neutral-900/90 border border-red-500/40 backdrop-blur-xl shadow-2xl flex items-center justify-center text-xs font-mono text-red-200 overflow-hidden"
            >
              <span className="truncate px-2">Deleting...</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>,
    document.body
  );
};
`;

// -----------------------------------------------------------------------------
// 5. components/AnimatedPageWrapper.tsx
// -----------------------------------------------------------------------------
const ANIMATED_PAGE_WRAPPER_TSX = `
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedPageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedPageWrapper: React.FC<AnimatedPageWrapperProps> = ({
  children,
  className
}) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "min-h-screen bg-neutral-950 text-neutral-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200",
        className
      )}
    >
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-[128px]" />
      </div>
      {children}
    </motion.main>
  );
};
`;

// -----------------------------------------------------------------------------
// 6. components/GlassCard.tsx
// -----------------------------------------------------------------------------
const GLASS_CARD_TSX = `
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: 'cyan' | 'indigo' | 'emerald' | 'none';
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  glow = 'cyan',
  children,
  className,
  ...props
}) => {
  const glowStyles = {
    cyan: 'hover:border-cyan-500/30 hover:shadow-cyan-950/30',
    indigo: 'hover:border-indigo-500/30 hover:shadow-indigo-950/30',
    emerald: 'hover:border-emerald-500/30 hover:shadow-emerald-950/30',
    none: 'hover:border-white/20 hover:shadow-neutral-950/30'
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl bg-neutral-900/60 backdrop-blur-xl border border-white/10 p-6 shadow-xl transition-all duration-300 hover:scale-[1.01]",
        glowStyles[glow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
`;

// -----------------------------------------------------------------------------
// 7. lib/safe-storage.ts
// -----------------------------------------------------------------------------
const SAFE_STORAGE_TS = `
/**
 * Safe Unified Multi-Tier Storage Manager
 * Handles: Local public storage, Vercel Blob, Supabase Storage, and Memory Buffers.
 */

export interface StorageMetadata {
  provider: 'local' | 'vercel-blob' | 'supabase' | 'buffer';
  pathOrKey: string;
  url?: string;
  mimeType: string;
  sizeBytes: number;
  uploadedAt: string;
}

export class SafeStorage {
  /**
   * Resolves public playable/displayable URL from storage metadata object
   */
  static getPublicUrl(metadata: StorageMetadata): string {
    if (metadata.url) return metadata.url;
    if (metadata.provider === 'local') {
      return metadata.pathOrKey.startsWith('/') ? metadata.pathOrKey : \`/\${metadata.pathOrKey}\`;
    }
    if (metadata.provider === 'supabase' && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return \`\${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/\${metadata.pathOrKey}\`;
    }
    return '';
  }

  /**
   * Safe data wrapper for database persistence
   */
  static serializeRecord(data: any): string {
    return JSON.stringify(data);
  }

  static deserializeRecord<T>(raw: string, fallback: T): T {
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }
}
`;

// -----------------------------------------------------------------------------
// 8. context/AppContext.tsx
// -----------------------------------------------------------------------------
const APP_CONTEXT_TSX = `
'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastMessage['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => removeToast(id), 4000);
  }, [removeToast]);

  return (
    <AppContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* Toast rendering portal */}
      <div className="fixed bottom-4 left-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={\`px-4 py-3 rounded-xl border text-sm font-medium backdrop-blur-xl shadow-lg pointer-events-auto transition-all duration-200 \${
              toast.type === 'error'
                ? 'bg-red-950/80 border-red-500/40 text-red-200'
                : toast.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200'
                : 'bg-neutral-900/80 border-white/20 text-neutral-200'
            }\`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
`;

// -----------------------------------------------------------------------------
// Write Core Files
// -----------------------------------------------------------------------------
log(`${colors.bold}Step 1: Writing Core Standard Files...${colors.reset}`);
safeWrite('lib/utils.ts', UTILS_TS);
safeWrite('hooks/useRapidClickBatcher.ts', RAPID_CLICK_BATCHER_TS);
safeWrite('hooks/useGenieTrashDelete.ts', USE_GENIE_TRASH_DELETE_TS);
safeWrite('components/GenieTrashBinPortal.tsx', GENIE_TRASH_BIN_PORTAL_TSX);
safeWrite('components/AnimatedPageWrapper.tsx', ANIMATED_PAGE_WRAPPER_TSX);
safeWrite('components/GlassCard.tsx', GLASS_CARD_TSX);
safeWrite('lib/safe-storage.ts', SAFE_STORAGE_TS);
safeWrite('context/AppContext.tsx', APP_CONTEXT_TSX);

// -----------------------------------------------------------------------------
// Step 2: Audit and Ensure Dependencies in package.json
// -----------------------------------------------------------------------------
log(`\n${colors.bold}Step 2: Checking package.json dependencies...${colors.reset}`);
const pkgPath = path.join(targetDir, 'package.json');
if (fs.existsSync(pkgPath)) {
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    pkg.dependencies = pkg.dependencies || {};
    
    const requiredDeps = {
      'clsx': '^2.1.1',
      'tailwind-merge': '^2.3.0',
      'framer-motion': '^11.2.10',
      'lucide-react': '^0.395.0'
    };

    let modified = false;
    for (const [dep, ver] of Object.entries(requiredDeps)) {
      if (!pkg.dependencies[dep]) {
        pkg.dependencies[dep] = ver;
        log(`  ${colors.cyan}+ Added missing dependency:${colors.reset} ${dep}@${ver}`);
        modified = true;
      } else {
        log(`  ${colors.green}✔ Present:${colors.reset} ${dep}`);
      }
    }

    if (modified) {
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
      log(`  ${colors.green}✔ Updated package.json.${colors.reset} Run ${colors.bold}npm install${colors.reset} to install newly added dependencies.`);
    } else {
      log(`  ${colors.green}✔ All mandatory core dependencies are already present in package.json.${colors.reset}`);
    }
  } catch (err) {
    log(`  ${colors.red}✖ Failed to parse package.json: ${err.message}${colors.reset}`);
  }
} else {
  log(`  ${colors.yellow}↷ No package.json found in ${targetDir}. Skipping dependency check.${colors.reset}`);
}

log(`\n${colors.bold}${colors.green}==============================================================================${colors.reset}`);
log(`${colors.bold}${colors.green}  🎉 CORE AUTO-SCAFFOLDING COMPLETED SUCCESSFULLY!${colors.reset}`);
log(`${colors.bold}${colors.white}  Now run the audit engine to verify compliance:${colors.reset}`);
log(`  ${colors.cyan}node C:/Users/lenovo/.gemini/config/skills/website-builder-engine/scripts/audit-engine.js .${colors.reset}`);
log(`${colors.bold}${colors.green}==============================================================================${colors.reset}\n`);
