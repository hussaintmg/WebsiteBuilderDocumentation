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
 * 9. Check required declared dependencies without mutating package.json
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
  node scaffold-engine.js [project-directory] [--apply] [--force]

Options:
  --apply    Write the planned scaffold files (default is a read-only dry run)
  --force    Back up and overwrite existing files; requires --apply
  --help     Show this help message
`);
  process.exit(0);
}
const targetDirArg = args.find(a => !a.startsWith('--'));
const targetDir = path.resolve(targetDirArg || process.cwd());
const isApply = args.includes('--apply');
const isForce = args.includes('--force');
const backupStamp = new Date().toISOString().replace(/[:.]/g, '-');

if (isForce && !isApply) {
  console.error('Error: --force requires --apply. No files were changed.');
  process.exit(1);
}
if (!fs.existsSync(targetDir) || !fs.statSync(targetDir).isDirectory()) {
  console.error('Error: Target directory does not exist: ' + targetDir);
  process.exit(1);
}
const pkgPathPreflight = path.join(targetDir, 'package.json');
let projectPackage;
try {
  projectPackage = JSON.parse(fs.readFileSync(pkgPathPreflight, 'utf8'));
} catch (error) {
  console.error('This scaffold only applies to an existing React + Tailwind project with a valid package.json. No files were changed.');
  process.exit(2);
}
const projectDeps = { ...(projectPackage.dependencies || {}), ...(projectPackage.devDependencies || {}) };
const requiredDeps = ['react', 'react-dom', 'tailwindcss', 'framer-motion', 'lucide-react', 'clsx', 'tailwind-merge'];
const missingDeps = requiredDeps.filter((dep) => !projectDeps[dep]);
if (missingDeps.length) {
  console.error('Scaffold not applicable. Missing declared dependencies: ' + missingDeps.join(', '));
  console.error('This command never installs dependencies or changes package.json. Add only the packages your project actually needs, then retry.');
  process.exit(2);
}


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

// Safe file creator: dry-run by default; force writes create timestamped backups.
function safeWrite(relPath, content) {
  const fullPath = path.join(targetDir, relPath);
  if (!isApply) {
    log(`  ${colors.cyan}Plan:${colors.reset} ${fs.existsSync(fullPath) ? (isForce ? 'Back up and replace' : 'Skip existing') : 'Create'} ${relPath}`);
    return false;
  }
  ensureDir(path.dirname(fullPath));
  if (fs.existsSync(fullPath) && !isForce) {
    log(`  ${colors.yellow}↷ Skipped (already exists):${colors.reset} ${relPath}`);
    return false;
  }
  if (fs.existsSync(fullPath) && isForce) {
    const backupPath = fullPath + '.bak-' + backupStamp;
    fs.copyFileSync(fullPath, backupPath);
    log(`  ${colors.yellow}Backup created:${colors.reset} ${path.relative(targetDir, backupPath)}`);
  }
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
  log(`  ${colors.green}✔ Written:${colors.reset} ${relPath}`);
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

// -----------------------------------------------------------------------------
// 9. components/TaskAnimatedButtons.tsx
// -----------------------------------------------------------------------------
const TASK_ANIMATED_BUTTONS_TSX = `
'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Trash2, ShoppingCart, Radio, CreditCard, FileDown, Send } from 'lucide-react';

export function useTaskAnimationSync(options: { cycleDuration?: number; morphDuration?: number; onSuccessToast?: () => void; onErrorToast?: (err: unknown) => void } = {}) {
  const { cycleDuration = 950, morphDuration = 400, onSuccessToast, onErrorToast } = options;
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

    const elapsed = performance.now() - startTime;
    const remainder = cycleDuration - (elapsed % cycleDuration);
    const waitTime = remainder === cycleDuration ? 0 : remainder;

    if (waitTime > 0) {
      await new Promise(r => setTimeout(r, waitTime));
    }

    setStatus(isSuccess ? 'success' : 'error');
    await new Promise(r => setTimeout(r, morphDuration));

    if (isSuccess) onSuccessToast?.();
    else onErrorToast?.(errorObj);
    isExecutingRef.current = false;
  }, [cycleDuration, morphDuration, onSuccessToast, onErrorToast]);

  return { status, isLoading: status === 'animating', isSuccess: status === 'success', isError: status === 'error', execute };
}

// 1. DELETE BUTTON (IN-BUTTON DUSTBIN LOOP)
export const TaskAnimatedDeleteButton: React.FC<{
  onDelete: () => Promise<any>;
  label?: string;
  activeLabel?: string;
  successLabel?: string;
  className?: string;
  onSuccessToast?: () => void;
}> = ({ onDelete, label = "Delete Item", activeLabel = "Deleting...", successLabel = "Deleted!", className = "", onSuccessToast }) => {
  const { status, isLoading, isSuccess, isError, execute } = useTaskAnimationSync({ cycleDuration: 950, onSuccessToast });

  return (
    <motion.button
      whileTap={{ scale: isLoading ? 1 : 0.96 }}
      onClick={() => !isLoading && execute(onDelete())}
      disabled={isLoading}
      className={\`relative inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl font-medium text-xs tracking-wide text-white transition-all duration-300 border overflow-hidden cursor-pointer \${
        isSuccess ? 'bg-emerald-600/90 border-emerald-500/50 shadow-lg' : isError ? 'bg-rose-700 border-rose-500/50' : 'bg-neutral-900/80 hover:bg-red-950/60 border-red-500/30'
      } \${className}\`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {status === 'idle' && <motion.div key="i" initial={{ scale: 0.8 }} animate={{ scale: 1 }}><Trash2 className="w-4 h-4 text-red-400" /></motion.div>}
          {status === 'animating' && (
            <motion.div key="a" className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
              <motion.div
                animate={{ x: [20, 0, 0, 0, -20], opacity: [0, 1, 1, 1, 0] }}
                transition={{ duration: 0.95, repeat: Infinity, ease: [0.25, 1, 0.5, 1], times: [0, 0.25, 0.65, 0.8, 1] }}
                className="relative flex flex-col items-center"
              >
                <motion.div
                  animate={{ rotate: [0, 0, -55, -55, 0, 0], y: [0, 0, -2, -2, 0, 0] }}
                  transition={{ duration: 0.95, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.35, 0.6, 0.72, 1] }}
                  style={{ originX: 0.1, originY: 1 }}
                  className="w-3.5 h-1 bg-red-400 rounded-t-sm shadow-sm"
                />
                <div className="w-3 h-3.5 bg-gradient-to-b from-red-500 to-red-700 rounded-b-sm flex items-center justify-center border-t border-red-300/40">
                  <div className="w-1 h-2 border-x border-white/40" />
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [-12, -12, 2, 2], scale: [1, 1, 0.4, 0], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 0.95, repeat: Infinity, ease: "easeIn", times: [0, 0.3, 0.6, 0.65] }}
                className="absolute w-2 h-2.5 bg-white/90 rounded-[1px] shadow-sm"
              />
            </motion.div>
          )}
          {status === 'success' && <motion.div key="s" initial={{ scale: 0.5 }} animate={{ scale: 1 }}><Check className="w-4 h-4 text-emerald-300" /></motion.div>}
          {status === 'error' && <motion.div key="e" initial={{ scale: 0.5 }} animate={{ scale: 1 }}><AlertCircle className="w-4 h-4 text-rose-300" /></motion.div>}
        </AnimatePresence>
      </div>
      <span>{status === 'idle' ? label : status === 'animating' ? activeLabel : status === 'success' ? successLabel : "Failed"}</span>
    </motion.button>
  );
};

// 2. ORDER TRUCK BUTTON (SPINNING TYRES, ROAD DASHES, TRAILING DUST LINES)
export const TaskAnimatedOrderTruckButton: React.FC<{
  onOrder: () => Promise<any>;
  label?: string;
  activeLabel?: string;
  successLabel?: string;
  className?: string;
  onSuccessToast?: () => void;
}> = ({ onOrder, label = "Place Order", activeLabel = "Dispatching...", successLabel = "Order Shipped!", className = "", onSuccessToast }) => {
  const { status, isLoading, isSuccess, isError, execute } = useTaskAnimationSync({ cycleDuration: 1000, onSuccessToast });

  return (
    <motion.button
      whileTap={{ scale: isLoading ? 1 : 0.96 }}
      onClick={() => !isLoading && execute(onOrder())}
      disabled={isLoading}
      className={\`relative inline-flex items-center justify-center gap-3 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wide text-white transition-all duration-300 border overflow-hidden cursor-pointer \${
        isSuccess ? 'bg-emerald-600/90 border-emerald-400/50' : isError ? 'bg-rose-700 border-rose-500/50' : 'bg-neutral-900/80 hover:bg-neutral-800/80 border-cyan-500/30'
      } \${className}\`}
    >
      <div className="relative w-8 h-5 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {status === 'idle' && <motion.div key="i" initial={{ scale: 0.8 }} animate={{ scale: 1 }}><ShoppingCart className="w-4 h-4 text-cyan-400" /></motion.div>}
          {status === 'animating' && (
            <motion.div key="a" className="relative w-8 h-5 flex items-center justify-center overflow-hidden">
              <motion.div animate={{ y: [0, -0.8, 0, 0.6, 0] }} transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }} className="relative flex items-end -ml-1">
                <div className="w-4 h-3 bg-cyan-600 rounded-tl-sm flex items-center justify-center border-t border-l border-cyan-300/40">
                  <div className="w-2 h-1.5 bg-amber-400 rounded-[1px]" />
                </div>
                <div className="w-2.5 h-2.5 bg-cyan-500 rounded-tr-md relative border-t border-r border-cyan-300/40">
                  <div className="w-1 h-0.8 bg-cyan-950/80 rounded-tr-sm ml-0.8 mt-0.5" />
                </div>
                <div className="absolute -bottom-1 left-0.5 right-0.5 flex justify-between pointer-events-none">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.25, repeat: Infinity, ease: "linear" }} className="w-1.8 h-1.8 rounded-full bg-neutral-900 border border-neutral-400 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 bg-neutral-200 rounded-full" />
                  </motion.div>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.25, repeat: Infinity, ease: "linear" }} className="w-1.8 h-1.8 rounded-full bg-neutral-900 border border-neutral-400 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 bg-neutral-200 rounded-full" />
                  </motion.div>
                </div>
              </motion.div>
              <div className="absolute bottom-0.5 left-0 pointer-events-none">
                <motion.div animate={{ x: [0, -10], scale: [0.5, 1.2], opacity: [0.9, 0] }} transition={{ duration: 0.35, repeat: Infinity, ease: "easeOut" }} className="w-1 h-0.8 rounded-full bg-neutral-300/70" />
              </div>
              <div className="absolute -bottom-0.5 left-0 right-0 h-[1px] overflow-hidden">
                <motion.div animate={{ x: [0, -16] }} transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }} className="w-16 h-full border-b border-dashed border-cyan-400/80" />
              </div>
            </motion.div>
          )}
          {status === 'success' && <motion.div key="s" initial={{ scale: 0.5 }} animate={{ scale: 1 }}><Check className="w-4 h-4 text-emerald-300" /></motion.div>}
          {status === 'error' && <motion.div key="e" initial={{ scale: 0.5 }} animate={{ scale: 1 }}><AlertCircle className="w-4 h-4 text-rose-300" /></motion.div>}
        </AnimatePresence>
      </div>
      <span>{status === 'idle' ? label : status === 'animating' ? activeLabel : status === 'success' ? successLabel : "Order Failed"}</span>
    </motion.button>
  );
};

// 3. LIVE SYNC BUTTON (BROADCAST TOWER + PULSING LIVE TEXT)
export const TaskAnimatedLiveSyncButton: React.FC<{
  onSync: () => Promise<any>;
  label?: string;
  activeLabel?: string;
  successLabel?: string;
  className?: string;
  onSuccessToast?: () => void;
}> = ({ onSync, label = "Sync Live", activeLabel = "Syncing Live", successLabel = "Synchronized!", className = "", onSuccessToast }) => {
  const { status, isLoading, isSuccess, isError, execute } = useTaskAnimationSync({ cycleDuration: 1100, onSuccessToast });

  return (
    <motion.button
      whileTap={{ scale: isLoading ? 1 : 0.96 }}
      onClick={() => !isLoading && execute(onSync())}
      disabled={isLoading}
      className={\`relative inline-flex items-center justify-center gap-2.5 px-4 py-2 rounded-xl font-medium text-xs tracking-wide transition-all duration-300 border overflow-hidden cursor-pointer \${
        isSuccess ? 'bg-emerald-950/80 text-emerald-200 border-emerald-500/40' : isError ? 'bg-rose-950/80 text-rose-200 border-rose-500/40' : 'bg-neutral-900/80 text-neutral-200 hover:bg-neutral-800/80 border-emerald-500/30'
      } \${className}\`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isLoading && (
          <>
            {[0, 0.4].map((delay, idx) => (
              <motion.div key={idx} animate={{ scale: [0.6, 1.8], opacity: [0.9, 0] }} transition={{ duration: 1.1, repeat: Infinity, delay, ease: "easeOut" }} className="absolute top-0 w-3 h-3 rounded-full border border-emerald-400/70 pointer-events-none" />
            ))}
            <motion.div animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }} transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444] z-20" />
          </>
        )}
        <Radio className={\`w-4 h-4 transition-colors \${isLoading ? 'text-emerald-400' : 'text-neutral-400'}\`} />
      </div>
      <div className="flex items-center gap-1.5">
        {isLoading && (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        )}
        <span className={isLoading ? "font-mono font-semibold tracking-wider uppercase text-emerald-300" : ""}>
          {status === 'idle' ? label : status === 'animating' ? activeLabel : status === 'success' ? successLabel : "Sync Failed"}
        </span>
        {isLoading && (
          <div className="flex items-end gap-0.5 h-3 ml-1">
            {[0.4, 0.9, 0.5, 1.0].map((h, i) => (
              <motion.div key={i} animate={{ height: [\`\${h * 30}%\`, \`\${h * 100}%\`, \`\${h * 30}%\`] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }} className="w-0.5 bg-emerald-400 rounded-full" />
            ))}
          </div>
        )}
      </div>
    </motion.button>
  );
};
`;

const USE_RESPONSIVE_TABS_TS = `'use client';

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
`;

const RESPONSIVE_TABS_TSX = `'use client';

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
    <div className={\`relative w-full \${className}\`} onKeyDown={handleKeyDown}>
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
              id={\`tab-\${tab.id}\`}
              aria-controls={\`panel-\${tab.id}\`}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => { onChange(tab.id); setIsDropdownOpen(false); }}
              className={\`relative flex items-center gap-2 px-3.5 py-2 text-sm font-medium whitespace-nowrap rounded-xl transition-colors duration-200 outline-none cursor-pointer \${
                tab.disabled ? 'opacity-40 cursor-not-allowed' : isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
              }\`}
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
                  <span className={\`px-1.5 py-0.5 text-[10px] font-semibold rounded-full \${isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-neutral-400'}\`}>
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
              className={\`relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium whitespace-nowrap rounded-xl transition-all cursor-pointer \${
                isActiveInOverflow ? 'text-white bg-white/10 border border-white/25 shadow-sm' : isDropdownOpen ? 'text-white bg-white/10 border border-white/15' : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
              }\`}
            >
              {isActiveInOverflow && <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]" />}
              <span>{isActiveInOverflow && currentActiveTab ? \`\${moreLabel}: \${currentActiveTab.label}\` : \`\${moreLabel} (\${overflowTabs.length})\`}</span>
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
                          className={\`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg text-left transition-colors cursor-pointer \${
                            tab.disabled ? 'opacity-40 cursor-not-allowed' : isTabActive ? 'bg-white/15 text-white font-medium' : 'text-neutral-300 hover:bg-white/10 hover:text-white'
                          }\`}
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
`;

log(`${colors.bold}Step 1: Writing Core Standard Files...${colors.reset}`);
safeWrite('lib/utils.ts', UTILS_TS);
safeWrite('hooks/useRapidClickBatcher.ts', RAPID_CLICK_BATCHER_TS);
safeWrite('hooks/useGenieTrashDelete.ts', USE_GENIE_TRASH_DELETE_TS);
safeWrite('components/GenieTrashBinPortal.tsx', GENIE_TRASH_BIN_PORTAL_TSX);
safeWrite('components/AnimatedPageWrapper.tsx', ANIMATED_PAGE_WRAPPER_TSX);
safeWrite('components/GlassCard.tsx', GLASS_CARD_TSX);
safeWrite('lib/safe-storage.ts', SAFE_STORAGE_TS);
safeWrite('context/AppContext.tsx', APP_CONTEXT_TSX);
safeWrite('components/TaskAnimatedButtons.tsx', TASK_ANIMATED_BUTTONS_TSX);
safeWrite('hooks/useResponsiveTabs.ts', USE_RESPONSIVE_TABS_TS);
safeWrite('components/ResponsiveTabs.tsx', RESPONSIVE_TABS_TSX);

// -----------------------------------------------------------------------------
// Step 2: Dependency safety — no automatic package.json mutation.
log(`\n${colors.bold}Step 2: Dependency preflight...${colors.reset}`);
log(`  ${colors.green}✔ Required dependencies were checked before planning.${colors.reset}`);
log(`  ${colors.gray}No dependency is installed and package.json is never modified by this scaffold.${colors.reset}`);

log(`\n${colors.bold}${colors.green}==============================================================================${colors.reset}`);
log(`${colors.bold}${colors.green}  ${isApply ? 'CORE SCAFFOLD WRITES FINISHED' : 'READ-ONLY SCAFFOLD PLAN GENERATED'}${colors.reset}`);
log(`${colors.bold}${colors.white}  Now run the audit engine to verify compliance:${colors.reset}`);
log(`  ${colors.cyan}node ${path.join(__dirname, 'audit-engine.js')} "${targetDir}"${colors.reset}`);
if (!isApply) log(`  ${colors.gray}Review the plan, then re-run with --apply. Add --force only when backups are acceptable.${colors.reset}`);
log(`${colors.bold}${colors.green}==============================================================================${colors.reset}\n`);
