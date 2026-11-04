'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertTriangle } from 'lucide-react';

export type TaskAnimationType = 'delete' | 'truck' | 'airplane' | 'rider' | 'live-sync';

export interface AnimatedTaskButtonProps {
  taskType: TaskAnimationType;
  label?: string;
  loadingLabel?: string;
  successLabel?: string;
  errorLabel?: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'danger' | 'ghost' | 'glass';
}

/**
 * AnimatedTaskButton
 * Universal action button with task-specific in-flight micro-animations.
 * Strictly adheres to Rule 10: Zero generic spinners.
 */
export const AnimatedTaskButton: React.FC<AnimatedTaskButtonProps> = ({
  taskType,
  label,
  loadingLabel,
  successLabel,
  errorLabel,
  isLoading: controlledLoading,
  isSuccess: controlledSuccess,
  isError: controlledError,
  onClick,
  disabled = false,
  className = '',
  variant = 'glass'
}) => {
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalSuccess, setInternalSuccess] = useState(false);
  const [internalError, setInternalError] = useState(false);

  const isLoading = controlledLoading !== undefined ? controlledLoading : internalLoading;
  const isSuccess = controlledSuccess !== undefined ? controlledSuccess : internalSuccess;
  const isError = controlledError !== undefined ? controlledError : internalError;

  const defaultLabels: Record<TaskAnimationType, { idle: string; loading: string; success: string }> = {
    delete: { idle: 'Delete Record', loading: 'Deleting...', success: 'Deleted!' },
    truck: { idle: 'Place Order', loading: 'Dispatching...', success: 'Order Dispatched!' },
    airplane: { idle: 'Order by Air', loading: 'Taking Off...', success: 'Flight Dispatched!' },
    rider: { idle: 'Quick Delivery', loading: 'Rider En Route...', success: 'Rider Dispatched!' },
    'live-sync': { idle: 'Sync Live', loading: 'Syncing Live...', success: 'Synchronized!' }
  };

  const currentLabel = isSuccess
    ? successLabel || defaultLabels[taskType].success
    : isError
    ? errorLabel || 'Action Failed'
    : isLoading
    ? loadingLabel || defaultLabels[taskType].loading
    : label || defaultLabels[taskType].idle;

  const handleClick = async () => {
    if (disabled || isLoading || isSuccess) return;
    if (onClick) {
      if (controlledLoading === undefined) {
        setInternalLoading(true);
        setInternalSuccess(false);
        setInternalError(false);
        try {
          await onClick();
          setInternalLoading(false);
          setInternalSuccess(true);
          setTimeout(() => setInternalSuccess(false), 2400);
        } catch {
          setInternalLoading(false);
          setInternalError(true);
          setTimeout(() => setInternalError(false), 2400);
        }
      } else {
        onClick();
      }
    }
  };

  // Variant classes
  const variantStyles = {
    glass: 'bg-neutral-900/80 hover:bg-neutral-850 border border-white/10 hover:border-white/20 text-neutral-100 shadow-lg',
    primary: 'bg-cyan-600 hover:bg-cyan-500 border border-cyan-400/40 text-white shadow-cyan-900/30',
    danger: 'bg-rose-600/90 hover:bg-rose-500 border border-rose-400/30 text-white shadow-rose-950/40',
    ghost: 'bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 text-neutral-200'
  }[variant];

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`relative inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 backdrop-blur-xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden active:scale-[0.98] ${variantStyles} ${className}`}
    >
      {/* Background Glow Pulse on Success */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.15 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-emerald-500/20 pointer-events-none rounded-xl blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Task Micro-Animation Frame */}
      <div className="relative flex items-center justify-center min-w-[28px] h-6">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className="text-emerald-400"
            >
              <Check className="w-5 h-5 stroke-[2.5]" />
            </motion.div>
          ) : isError ? (
            <motion.div
              key="error"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="text-rose-400"
            >
              <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
            </motion.div>
          ) : isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center"
            >
              {taskType === 'delete' && <InFlightDeleteBin />}
              {taskType === 'truck' && <InFlightDeliveryTruck />}
              {taskType === 'airplane' && <InFlightAirCargoPlane />}
              {taskType === 'rider' && <InFlightCourierRider />}
              {taskType === 'live-sync' && <InFlightBroadcastTower />}
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center justify-center text-neutral-400"
            >
              {taskType === 'delete' && <IdleTrashIcon />}
              {taskType === 'truck' && <IdleTruckIcon />}
              {taskType === 'airplane' && <IdlePlaneIcon />}
              {taskType === 'rider' && <IdleRiderIcon />}
              {taskType === 'live-sync' && <IdleTowerIcon />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Button Text Label */}
      <span className="relative z-10 tracking-wide font-medium">{currentLabel}</span>
    </button>
  );
};

/* -------------------------------------------------------------------------- */
/* TASK MICRO-ANIMATION 1: IN-BUTTON DELETE BIN LOOP                          */
/* -------------------------------------------------------------------------- */
const InFlightDeleteBin: React.FC = () => (
  <div className="relative w-7 h-6 flex items-center justify-center overflow-hidden">
    <motion.div
      animate={{
        x: [24, 0, 0, 0, -24],
        opacity: [0, 1, 1, 1, 0]
      }}
      transition={{
        duration: 1.0,
        repeat: Infinity,
        ease: [0.25, 1, 0.5, 1],
        times: [0, 0.25, 0.65, 0.8, 1]
      }}
      className="relative flex flex-col items-center"
    >
      {/* Lid */}
      <motion.div
        animate={{ rotate: [0, -55, -55, 0] }}
        transition={{
          duration: 1.0,
          repeat: Infinity,
          times: [0.2, 0.38, 0.58, 0.72]
        }}
        style={{ transformOrigin: '0% 100%' }}
        className="w-4 h-1 bg-rose-400 rounded-t-sm"
      />
      {/* Bin Body */}
      <div className="w-3.5 h-3.5 bg-rose-500/90 rounded-b-sm border-t border-rose-300 flex justify-center items-center">
        <div className="w-1.5 h-2 border-x border-rose-300/60" />
      </div>
      {/* Falling File */}
      <motion.div
        animate={{
          y: [-12, 3],
          scale: [1, 0.3],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 1.0,
          repeat: Infinity,
          times: [0.35, 0.6]
        }}
        className="absolute top-0 w-2 h-2.5 bg-white rounded-[1px] border border-neutral-300"
      />
    </motion.div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* TASK MICRO-ANIMATION 2: DELIVERY TRUCK ON ANIMATED ROAD                    */
/* -------------------------------------------------------------------------- */
const InFlightDeliveryTruck: React.FC = () => (
  <div className="relative w-10 h-6 flex items-center justify-center overflow-hidden">
    {/* Truck Body */}
    <motion.div
      animate={{ y: [0, -1, 0, 0.8, 0] }}
      transition={{ duration: 0.35, repeat: Infinity, ease: 'linear' }}
      className="relative flex items-end"
    >
      <div className="relative flex items-end">
        <div className="w-5 h-3.5 bg-cyan-600 rounded-tl-sm border-t border-l border-cyan-300/40 flex items-center justify-center">
          <div className="w-2.5 h-2 bg-amber-500 rounded-[1px] border border-amber-300/50" />
        </div>
        <div className="w-2.5 h-2.5 bg-cyan-500 rounded-tr-md border-t border-r border-cyan-300/40 relative">
          <div className="w-1 h-1 bg-cyan-950/80 rounded-tr-sm ml-1 mt-0.5" />
        </div>
      </div>
      {/* Wheels */}
      <div className="absolute -bottom-1 left-0.5 right-0.5 flex justify-between pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.3, repeat: Infinity, ease: 'linear' }}
          className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-400 flex items-center justify-center"
        >
          <div className="w-0.5 h-0.5 bg-neutral-200 rounded-full" />
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.3, repeat: Infinity, ease: 'linear' }}
          className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-400 flex items-center justify-center"
        >
          <div className="w-0.5 h-0.5 bg-neutral-200 rounded-full" />
        </motion.div>
      </div>
    </motion.div>
    {/* Road Dashes */}
    <div className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] overflow-hidden">
      <motion.div
        animate={{ x: [0, -20] }}
        transition={{ duration: 0.25, repeat: Infinity, ease: 'linear' }}
        className="w-20 h-full border-b border-dashed border-cyan-400/80"
      />
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* TASK MICRO-ANIMATION 3: AIR CARGO TAKEOFF WITH RUNWAY & CONTRAILS          */
/* -------------------------------------------------------------------------- */
const InFlightAirCargoPlane: React.FC = () => (
  <div className="relative w-11 h-6 flex items-center justify-center overflow-hidden">
    {/* Clouds */}
    <motion.div
      animate={{ x: [30, -30] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
      className="absolute top-1 w-3 h-1 bg-white/20 rounded-full blur-[0.5px]"
    />
    {/* Runway Line */}
    <div className="absolute bottom-0.5 left-0 right-0 h-[1px] overflow-hidden">
      <motion.div
        animate={{ x: [0, -18] }}
        transition={{ duration: 0.2, repeat: Infinity, ease: 'linear' }}
        className="w-28 h-full border-b border-dashed border-white/60"
      />
    </div>
    {/* Jet Plane */}
    <motion.div
      animate={{
        y: [2, 0, -3, -1, 2],
        rotate: [-2, 4, 16, 8, -2],
        scale: [0.95, 1, 1.05, 1, 0.95]
      }}
      transition={{ duration: 1.6, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex items-center justify-center text-cyan-400"
    >
      <svg width="20" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
      </svg>
      {/* Contrail Streams */}
      <motion.div
        animate={{ width: [0, 14], opacity: [0.8, 0] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: 'easeOut' }}
        className="absolute -left-2.5 top-1.5 h-[1.5px] bg-gradient-to-l from-white/70 to-transparent"
      />
    </motion.div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* TASK MICRO-ANIMATION 4: URBAN COURIER RIDER ON SCOOTER                     */
/* -------------------------------------------------------------------------- */
const InFlightCourierRider: React.FC = () => (
  <div className="relative w-11 h-6 flex items-center justify-center overflow-hidden">
    {/* Headlight beam */}
    <div className="absolute right-0 top-1.5 w-5 h-2.5 bg-gradient-to-r from-amber-300/30 to-transparent rounded-full blur-[1px] pointer-events-none" />
    {/* Road Line */}
    <div className="absolute bottom-0 left-0 right-0 h-[1.5px] overflow-hidden">
      <motion.div
        animate={{ x: [0, -16] }}
        transition={{ duration: 0.22, repeat: Infinity, ease: 'linear' }}
        className="w-24 h-full border-b border-dashed border-amber-400/80"
      />
    </div>
    {/* Scooter & Rider */}
    <motion.div
      animate={{ y: [0, -1, 0, 0.7, 0] }}
      transition={{ duration: 0.28, repeat: Infinity, ease: 'linear' }}
      className="relative flex items-end"
    >
      {/* Rear Box */}
      <div className="w-3 h-2.5 bg-emerald-600 border border-emerald-400/60 rounded-[2px] flex items-center justify-center shadow-sm">
        <div className="w-1 h-1 bg-white/80 rounded-[1px]" />
      </div>
      {/* Driver */}
      <div className="relative -ml-0.5 flex flex-col items-center">
        <div className="w-2 h-2 bg-neutral-800 rounded-full border border-neutral-600 relative">
          <div className="w-1 h-0.5 bg-amber-400 rounded-r-full absolute top-0.5 right-0.5" />
        </div>
        <div className="w-2.5 h-1.5 bg-neutral-700 rounded-t-sm" />
      </div>
      {/* Scooter Fork */}
      <div className="w-1.5 h-3 bg-neutral-800 rounded-tr-md border-r border-neutral-600 relative flex items-start">
        <div className="w-1 h-1 bg-amber-300 rounded-full mt-0.5 ml-0.5" />
      </div>
      {/* Wheels */}
      <div className="absolute -bottom-1 left-0.5 right-0.5 flex justify-between pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.24, repeat: Infinity, ease: 'linear' }}
          className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-400 flex items-center justify-center"
        >
          <div className="w-0.5 h-0.5 bg-amber-400 rounded-full" />
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.24, repeat: Infinity, ease: 'linear' }}
          className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-400 flex items-center justify-center"
        >
          <div className="w-0.5 h-0.5 bg-amber-400 rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* TASK MICRO-ANIMATION 5: BROADCAST TOWER BEACON & RF WAVES                  */
/* -------------------------------------------------------------------------- */
const InFlightBroadcastTower: React.FC = () => (
  <div className="relative w-8 h-6 flex items-center justify-center overflow-hidden">
    {/* Blinking Apex Beacon */}
    <motion.div
      animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 0.45, repeat: Infinity }}
      className="absolute top-0.5 w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.9)]"
    />
    {/* Radiating RF Waves */}
    <motion.div
      animate={{ scale: [0.6, 2.2], opacity: [1, 0] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
      className="absolute top-0 w-3 h-3 rounded-full border border-cyan-400/80 pointer-events-none"
    />
    <motion.div
      animate={{ scale: [0.6, 2.2], opacity: [1, 0] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
      className="absolute top-0 w-3 h-3 rounded-full border border-cyan-400/80 pointer-events-none"
    />
    {/* Tower Structure */}
    <div className="w-3.5 h-4 flex flex-col items-center mt-2">
      <div className="w-0.5 h-2 bg-neutral-400" />
      <div className="w-3 h-2 border-b-2 border-x-2 border-neutral-500 rounded-b-sm" />
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* IDLE ICONS                                                                 */
/* -------------------------------------------------------------------------- */
const IdleTrashIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const IdleTruckIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const IdlePlaneIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
);

const IdleRiderIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="5.5" cy="17.5" r="3.5" />
    <circle cx="18.5" cy="17.5" r="3.5" />
    <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM12 17.5V14l-3-3 4-3 2 3h3" />
  </svg>
);

const IdleTowerIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4.93 4.93a10 10 0 0 1 14.14 0M7.76 7.76a6 6 0 0 1 8.48 0M12 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM12 12v9" />
  </svg>
);

