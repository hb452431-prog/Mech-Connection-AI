import React from 'react';
import { 
  Car, 
  Wrench, 
  MapPin, 
  Sparkles, 
  Radio, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Navigation,
  User,
  Disc,
  BatteryCharging,
  Flame,
  Truck,
  KeyRound,
  WifiOff,
  RotateCcw,
  Activity
} from 'lucide-react';
import { useNetwork } from '../../context/NetworkContext';

/**
 * Base Atomic Skeleton Element with Shimmer Animation
 */
export const Skeleton = ({ 
  className = '', 
  variant = 'rounded', // 'text' | 'rect' | 'circle' | 'rounded' | 'pill'
  width, 
  height, 
  style = {} 
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'circle':
        return 'rounded-full';
      case 'pill':
        return 'rounded-full';
      case 'rect':
        return 'rounded-none';
      case 'text':
        return 'rounded-md h-3.5 sm:h-4 my-1';
      case 'rounded':
      default:
        return 'rounded-2xl';
    }
  };

  const inlineStyles = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...style
  };

  return (
    <div
      className={`skeleton-shimmer bg-slate-200/80 dark:bg-slate-800/80 ${getVariantClass()} ${className}`}
      style={inlineStyles}
    />
  );
};

/**
 * Low Network Notification Banner (rendered when skeleton is active due to low network)
 */
export const LowNetworkNotice = () => {
  const { 
    isSlowNetwork, 
    isOnline, 
    networkLabel, 
    toggleSimulateSlowNetwork, 
    recheckNetwork, 
    isRechecking, 
    isSimulatedSlow 
  } = useNetwork();

  if (!isSlowNetwork && isOnline) return null;

  return (
    <div className="w-full mb-6 p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border-2 border-amber-400/40 dark:border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-amber-900 dark:text-amber-200 animate-in fade-in duration-300 shadow-xs">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-2xl bg-amber-500/20 dark:bg-amber-500/30 flex items-center justify-center flex-shrink-0 text-amber-600 dark:text-amber-400">
          <WifiOff className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black tracking-tight">{networkLabel || 'Low Network Detected'}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-amber-500/20 text-amber-700 dark:text-amber-300">
              SKELETON LOADING ACTIVE
            </span>
          </div>
          <p className="text-xs text-amber-700/90 dark:text-amber-300/80 mt-0.5">
            Website bandwidth is constrained. Displaying wireframe skeleton loading placeholders while awaiting data sync.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <button
          type="button"
          onClick={recheckNetwork}
          disabled={isRechecking}
          className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${isRechecking ? 'animate-spin' : ''}`} />
          {isRechecking ? 'Syncing...' : 'Retry Connection'}
        </button>
        {isSimulatedSlow && (
          <button
            type="button"
            onClick={toggleSimulateSlowNetwork}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold border border-amber-300/50 dark:border-amber-700/50 transition-all shadow-xs"
          >
            Turn Off Simulation
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Telemetry Loading Header / Pill Indicator
 */
export const SkeletonTelemetryBar = () => (
  <div className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
    <div className="flex items-center gap-3">
      <Skeleton variant="circle" className="w-3.5 h-3.5" />
      <Skeleton variant="text" className="w-36 sm:w-48" />
    </div>
    <div className="flex items-center gap-2">
      <Skeleton variant="pill" className="w-20 h-6" />
      <Skeleton variant="pill" className="w-24 h-6 hidden sm:block" />
    </div>
  </div>
);

/**
 * Skeleton for User / Driver Portal Home Page
 */
export const UserHomeSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10 animate-in fade-in duration-300">
      <LowNetworkNotice />

      {/* Top Driver Telemetry Status Banner Skeleton */}
      <div className="clean-card p-7 sm:p-9 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-3xl shadow-sm">
        <div className="flex items-center gap-5">
          <Skeleton variant="rounded" className="w-16 h-16 rounded-3xl flex-shrink-0" />
          <div className="space-y-2.5 flex-1">
            <div className="flex items-center gap-3">
              <Skeleton variant="text" className="w-40 sm:w-48 h-6" />
              <Skeleton variant="pill" className="w-24 h-5" />
            </div>
            <Skeleton variant="text" className="w-56 sm:w-72 h-4" />
          </div>
        </div>
        <Skeleton variant="rounded" className="w-36 h-11 rounded-2xl self-start sm:self-auto" />
      </div>

      {/* Quick Roadside Services Bar Skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Skeleton variant="circle" className="w-4 h-4" />
            <Skeleton variant="text" className="w-44 h-4" />
          </div>
          <Skeleton variant="text" className="w-28 h-4" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 sm:gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="clean-card p-4 sm:p-5 flex flex-col items-center justify-center gap-3 border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl"
            >
              <Skeleton variant="rounded" className="w-12 h-12 rounded-2xl" />
              <Skeleton variant="text" className="w-18 sm:w-20 h-4" />
            </div>
          ))}
        </div>
      </div>

      {/* 2 Main Action Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="clean-card p-7 sm:p-9 flex flex-col justify-between border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl space-y-6"
          >
            <div className="space-y-5">
              <Skeleton variant="rounded" className="w-16 h-16 rounded-3xl" />
              <div className="space-y-3">
                <Skeleton variant="pill" className="w-24 h-5" />
                <Skeleton variant="text" className="w-48 sm:w-56 h-7" />
                <Skeleton variant="text" className="w-full h-4" />
                <Skeleton variant="text" className="w-4/5 h-4" />
              </div>
            </div>
            <Skeleton variant="rounded" className="w-full h-14 rounded-2xl mt-4" />
          </div>
        ))}
      </div>

      {/* High-Impact Emergency SOS Banner Skeleton */}
      <div className="clean-card p-8 sm:p-10 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-8 border-2 border-orange-200 dark:border-orange-950/60 bg-white dark:bg-slate-900">
        <div className="flex items-center gap-5 text-center sm:text-left">
          <Skeleton variant="rounded" className="w-20 h-20 rounded-3xl flex-shrink-0" />
          <div className="space-y-2.5">
            <Skeleton variant="pill" className="w-36 h-5" />
            <Skeleton variant="text" className="w-48 sm:w-60 h-7" />
            <Skeleton variant="text" className="w-64 sm:w-80 h-4" />
          </div>
        </div>
        <div className="w-full sm:w-auto flex flex-col items-center sm:items-end gap-2 flex-shrink-0">
          <Skeleton variant="rounded" className="w-full sm:w-64 h-16 rounded-2xl" />
          <Skeleton variant="text" className="w-36 h-3" />
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton for Mechanic Portal Home Page
 */
export const MechanicHomeSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10 animate-in fade-in duration-300">
      <LowNetworkNotice />

      {/* Top Welcome Banner Skeleton */}
      <div className="clean-card dark:bg-slate-900 dark:border-slate-800 p-7 sm:p-10 border-l-4 border-l-blue-600 dark:border-l-blue-500 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-2 border-slate-200 rounded-3xl shadow-sm">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-3">
            <Skeleton variant="text" className="w-56 sm:w-72 h-8" />
            <Skeleton variant="pill" className="w-32 h-6" />
          </div>
          <Skeleton variant="text" className="w-72 sm:w-96 h-4" />
        </div>
        <Skeleton variant="rounded" className="w-36 h-13 rounded-2xl self-start sm:self-auto" />
      </div>

      {/* Telemetry Status Bar Skeleton */}
      <SkeletonTelemetryBar />

      {/* Live Area Radar Map Skeleton */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Skeleton variant="circle" className="w-4 h-4" />
            <Skeleton variant="text" className="w-40 h-4" />
          </div>
          <Skeleton variant="text" className="w-32 h-4" />
        </div>
        {/* Map Box Placeholder with pulsating radar aura */}
        <div className="relative w-full h-80 rounded-3xl bg-slate-100 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-800 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 skeleton-shimmer opacity-40" />
          <div className="relative z-10 flex flex-col items-center gap-3 text-slate-400 dark:text-slate-500">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center animate-pulse">
              <Navigation className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
              Initializing GPS Radar Telemetry...
            </span>
          </div>
        </div>
      </div>

      {/* Incoming Requests Grid Skeleton */}
      <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton variant="rounded" className="w-12 h-12 rounded-2xl" />
            <Skeleton variant="text" className="w-64 sm:w-80 h-7" />
          </div>
          <Skeleton variant="pill" className="w-32 h-7" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="clean-card dark:bg-slate-900 dark:border-slate-800 p-7 space-y-5 border-2 border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Skeleton variant="text" className="w-36 h-5" />
                  <Skeleton variant="pill" className="w-28 h-5" />
                </div>
                <Skeleton variant="pill" className="w-20 h-6" />
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl space-y-2">
                <Skeleton variant="text" className="w-28 h-3.5" />
                <Skeleton variant="text" className="w-48 h-4" />
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl space-y-2">
                <Skeleton variant="text" className="w-36 h-3.5" />
                <Skeleton variant="text" className="w-40 h-5" />
              </div>

              <div className="grid grid-cols-2 gap-3.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Skeleton variant="rounded" className="h-11 rounded-2xl" />
                <Skeleton variant="rounded" className="h-11 rounded-2xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton for Find Nearby Garage Page
 */
export const FindGarageSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10 animate-in fade-in duration-300">
      <LowNetworkNotice />

      {/* Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-2.5">
          <Skeleton variant="text" className="w-24 h-4" />
          <div className="flex items-center gap-3">
            <Skeleton variant="text" className="w-48 sm:w-64 h-8" />
            <Skeleton variant="pill" className="w-24 h-5" />
          </div>
          <Skeleton variant="text" className="w-72 sm:w-96 h-4" />
        </div>
        <Skeleton variant="rounded" className="w-64 h-12 rounded-2xl self-start sm:self-auto" />
      </div>

      <SkeletonTelemetryBar />

      {/* Large Interactive Map Skeleton with Mechanic Bike Traveling to Stranded Vehicle */}
      <div className="relative w-full h-[460px] rounded-3xl bg-slate-900 border-2 border-slate-700/80 overflow-hidden flex flex-col justify-between p-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1226] via-[#0E1A38] to-[#111827] pointer-events-none" />
        
        {/* Top Radar Status Pill */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>DISPATCHING RAPID BIKE MECHANIC</span>
          </div>
          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
            CONNECTING GARAGE NETWORK
          </span>
        </div>

        {/* Center Animated Road & Bike Scene */}
        <div className="relative z-10 my-auto w-full max-w-2xl mx-auto h-44 flex flex-col justify-end">
          {/* Road */}
          <div className="relative w-full h-14 bg-slate-950 border-t-2 border-slate-700 rounded-xl overflow-hidden flex items-center">
            {/* Moving Road Lines */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, #F8FAFC 0, #F8FAFC 35px, transparent 35px, transparent 75px)',
                backgroundSize: '75px 100%',
                animation: 'roadLinesScroll 0.5s linear infinite'
              }}
            />

            {/* Mechanic Riding Bike with Tools (Animated moving across road) */}
            <div 
              className="absolute bottom-2 flex items-center gap-1.5 bike-suspension-bounce"
              style={{
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            >
              <div className="text-3xl filter drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">🏍️</div>
              <span className="text-xl">🔧</span>
              <span className="text-[10px] font-mono font-extrabold text-cyan-300 bg-slate-900/90 px-2 py-0.5 rounded-full border border-cyan-400/40">
                RAPID SERVICE
              </span>
            </div>

            {/* Stranded User Car with Hazard Lights (Stationed on the right) */}
            <div className="absolute right-4 bottom-2 flex items-center gap-2">
              <span className="text-xs font-mono font-extrabold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/40 hazard-light-blink">
                ⚠️ USER CAR
              </span>
              <div className="text-3xl filter drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">🚗</div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 hazard-light-blink" />
            </div>
          </div>
        </div>

        {/* Bottom Status text */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-slate-400 border-t border-slate-800 pt-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Certified Mechanic en route with rapid diagnostics toolkit...</span>
          </div>
          <span className="text-cyan-400 font-bold">ETA: 3 Mins • Distance: 1.8 km</span>
        </div>
      </div>

      {/* Garages List Grid Skeleton */}
      <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between pb-2">
          <Skeleton variant="text" className="w-64 h-7" />
          <Skeleton variant="pill" className="w-28 h-7" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="clean-card p-7 space-y-5 rounded-3xl flex flex-col justify-between border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Skeleton variant="text" className="w-36 h-5" />
                    <Skeleton variant="text" className="w-48 h-3.5" />
                  </div>
                  <Skeleton variant="pill" className="w-16 h-6" />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <Skeleton variant="pill" className="w-20 h-5" />
                  <Skeleton variant="text" className="w-24 h-4" />
                </div>

                <div className="flex gap-2 pt-2">
                  <Skeleton variant="rounded" className="w-20 h-6 rounded-lg" />
                  <Skeleton variant="rounded" className="w-24 h-6 rounded-lg" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Skeleton variant="rounded" className="h-11 rounded-xl" />
                <Skeleton variant="rounded" className="h-11 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton for AI Diagnostic Help Page
 */
export const AiHelpSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10 animate-in fade-in duration-300">
      <LowNetworkNotice />

      <div className="space-y-2.5">
        <Skeleton variant="text" className="w-24 h-4" />
        <div className="flex items-center gap-3.5 pt-1">
          <Skeleton variant="rounded" className="w-12 h-12 rounded-2xl flex-shrink-0" />
          <Skeleton variant="text" className="w-64 sm:w-80 h-8" />
        </div>
        <Skeleton variant="text" className="w-full sm:w-96 h-4" />
      </div>

      <div className="clean-card p-7 sm:p-10 space-y-7 border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl">
        <div className="space-y-3">
          <Skeleton variant="text" className="w-40 h-4 font-mono" />
          <Skeleton variant="rounded" className="w-full h-28 rounded-2xl" />
          
          <div className="space-y-2.5 pt-2">
            <Skeleton variant="text" className="w-48 h-3.5" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} variant="rounded" className="w-full h-12 rounded-xl" />
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <Skeleton variant="text" className="w-56 h-4 font-mono" />
          <Skeleton variant="rounded" className="w-56 h-12 rounded-xl" />
        </div>

        <Skeleton variant="rounded" className="w-full h-14 rounded-2xl mt-4" />
      </div>
    </div>
  );
};

/**
 * Skeleton for Emergency SOS Page
 */
export const EmergencySkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10 animate-in fade-in duration-300">
      <LowNetworkNotice />

      <div className="space-y-3">
        <Skeleton variant="text" className="w-28 h-4" />
        <div className="flex items-center gap-4 pt-1">
          <Skeleton variant="rounded" className="w-16 h-16 rounded-2xl flex-shrink-0" />
          <div className="space-y-2">
            <Skeleton variant="text" className="w-64 sm:w-80 h-8" />
            <Skeleton variant="text" className="w-72 sm:w-96 h-4" />
          </div>
        </div>
      </div>

      <SkeletonTelemetryBar />

      <div className="clean-card p-7 sm:p-10 space-y-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        {/* Step 1: Vehicle selector */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton variant="text" className="w-48 h-5" />
            <Skeleton variant="pill" className="w-24 h-5" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} variant="rounded" className="w-full h-24 rounded-2xl" />
            ))}
          </div>
        </div>

        {/* Step 2: Vehicle identification */}
        <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
          <Skeleton variant="text" className="w-48 h-5" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton variant="rounded" className="w-full h-12 rounded-xl" />
            <Skeleton variant="rounded" className="w-full h-12 rounded-xl" />
          </div>
        </div>

        {/* Step 3: Breakdown issue */}
        <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
          <Skeleton variant="text" className="w-64 h-5" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} variant="rounded" className="w-full h-20 rounded-2xl" />
            ))}
          </div>
        </div>

        {/* Action button */}
        <Skeleton variant="rounded" className="w-full h-16 rounded-2xl mt-4" />
      </div>
    </div>
  );
};

/**
 * Skeleton for Mechanic Requests Page
 */
export const MechanicRequestsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-10 space-y-8 animate-in fade-in duration-300">
      <LowNetworkNotice />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton variant="text" className="w-56 sm:w-72 h-8" />
          <Skeleton variant="text" className="w-72 sm:w-96 h-4" />
        </div>
        <Skeleton variant="pill" className="w-36 h-8 self-start sm:self-auto" />
      </div>

      <SkeletonTelemetryBar />

      <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="clean-card dark:bg-slate-900 dark:border-slate-800 p-7 space-y-5 border-2 border-slate-200 dark:border-slate-800 rounded-3xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <Skeleton variant="text" className="w-36 h-6" />
                <Skeleton variant="pill" className="w-28 h-5" />
              </div>
              <Skeleton variant="pill" className="w-24 h-6" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Skeleton variant="rounded" className="h-24 rounded-2xl" />
              <Skeleton variant="rounded" className="h-24 rounded-2xl" />
              <Skeleton variant="rounded" className="h-24 rounded-2xl" />
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
              <Skeleton variant="rounded" className="w-24 h-10 rounded-xl" />
              <Skeleton variant="rounded" className="w-32 h-10 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Skeleton for Completed Jobs Page
 */
export const MechanicCompletedSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-10 space-y-8 animate-in fade-in duration-300">
      <LowNetworkNotice />

      <div className="space-y-2">
        <Skeleton variant="text" className="w-56 sm:w-72 h-8" />
        <Skeleton variant="text" className="w-72 sm:w-96 h-4" />
      </div>

      <div className="space-y-5 pt-6 border-t border-slate-200 dark:border-slate-800">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="clean-card dark:bg-slate-900 dark:border-slate-800 p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-2 border-slate-200 rounded-3xl"
          >
            <div className="space-y-2.5 flex-1">
              <div className="flex items-center gap-3">
                <Skeleton variant="text" className="w-36 h-6" />
                <Skeleton variant="pill" className="w-24 h-5" />
              </div>
              <Skeleton variant="text" className="w-56 h-4" />
              <Skeleton variant="text" className="w-48 h-3.5" />
            </div>
            <div className="space-y-2 flex sm:flex-col items-end">
              <Skeleton variant="text" className="w-24 h-4" />
              <Skeleton variant="pill" className="w-20 h-7" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Skeleton for User & Mechanic Profile Pages
 */
export const ProfileSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-10 space-y-8 animate-in fade-in duration-300">
      <LowNetworkNotice />

      <div className="space-y-2">
        <Skeleton variant="text" className="w-24 h-4" />
        <Skeleton variant="text" className="w-48 sm:w-60 h-8" />
        <Skeleton variant="text" className="w-64 sm:w-80 h-4" />
      </div>

      <div className="clean-card p-7 sm:p-10 space-y-7 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl border-2">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <Skeleton variant="rounded" className="w-16 h-16 rounded-2xl flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <Skeleton variant="text" className="w-40 h-6" />
            <Skeleton variant="text" className="w-32 h-3.5" />
          </div>
        </div>

        <div className="space-y-3">
          <Skeleton variant="rounded" className="w-full h-14 rounded-2xl" />
          <Skeleton variant="rounded" className="w-full h-14 rounded-2xl" />
        </div>

        <div className="pt-5 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <Skeleton variant="text" className="w-36 h-4" />
          <Skeleton variant="rounded" className="w-full h-28 rounded-2xl" />
        </div>

        <div className="flex gap-3.5 pt-5 border-t border-slate-100 dark:border-slate-800">
          <Skeleton variant="rounded" className="flex-1 h-12 rounded-xl" />
          <Skeleton variant="rounded" className="flex-1 h-12 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton for Auth Pages (UserAuthPage & MechanicAuthPage)
 */
export const AuthSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070B14] flex flex-col justify-center items-center px-4 py-8 relative">
      <div className="w-full max-w-md space-y-6">
        <LowNetworkNotice />
        <Skeleton variant="text" className="w-32 h-4" />

        <div className="flex flex-col items-center space-y-3 text-center">
          <Skeleton variant="circle" className="w-14 h-14" />
          <Skeleton variant="pill" className="w-36 h-6" />
          <Skeleton variant="text" className="w-48 h-7" />
          <Skeleton variant="text" className="w-64 h-3.5" />
        </div>

        <div className="clean-card dark:bg-slate-900 dark:border-slate-800 p-6 sm:p-8 space-y-6 rounded-3xl border-2 border-slate-200">
          <Skeleton variant="rounded" className="w-full h-11 rounded-2xl" />
          <div className="space-y-4">
            <Skeleton variant="rounded" className="w-full h-12 rounded-xl" />
            <Skeleton variant="rounded" className="w-full h-12 rounded-xl" />
          </div>
          <Skeleton variant="rounded" className="w-full h-14 rounded-2xl mt-4" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
