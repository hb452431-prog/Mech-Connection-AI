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
  KeyRound
} from 'lucide-react';

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
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12 md:py-14 space-y-10 sm:space-y-12 animate-in fade-in duration-300">
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
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 md:py-14 space-y-8 sm:space-y-10 animate-in fade-in duration-300">
      {/* Top Welcome Banner Skeleton */}
      <div className="clean-card dark:bg-slate-900 dark:border-slate-800 p-7 sm:p-10 border-l-4 border-l-indigo-600 dark:border-l-indigo-500 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-2 border-slate-200 rounded-3xl shadow-sm">
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
            <div className="w-16 h-16 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center animate-pulse">
              <Navigation className="w-8 h-8 text-indigo-500 animate-spin" />
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
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 md:py-14 space-y-8 sm:space-y-10 animate-in fade-in duration-300">
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

      {/* Large Interactive Map Skeleton */}
      <div className="relative w-full h-[460px] rounded-3xl bg-slate-100 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-800 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 skeleton-shimmer opacity-40" />
        <div className="relative z-10 flex flex-col items-center gap-3 text-slate-400 dark:text-slate-500">
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center animate-pulse">
            <MapPin className="w-8 h-8 text-indigo-600 animate-bounce" />
          </div>
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-600 dark:text-slate-300">
            Mapping Nearby Garages & Mechanics...
          </span>
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
    <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 md:py-14 space-y-8 sm:space-y-10 animate-in fade-in duration-300">
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
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 md:py-14 space-y-8 sm:space-y-10 animate-in fade-in duration-300">
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
        {/* Step 1: Vehicle type selector */}
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

        {/* Step 3: Breakdown problem options */}
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
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 md:py-14 space-y-8 sm:space-y-10 animate-in fade-in duration-300">
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
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 md:py-14 space-y-8 sm:space-y-10 animate-in fade-in duration-300">
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
    <div className="max-w-xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 md:py-14 space-y-8 sm:space-y-10 animate-in fade-in duration-300">
      <div className="space-y-2">
        <Skeleton variant="text" className="w-24 h-4" />
        <Skeleton variant="text" className="w-48 sm:w-60 h-8" />
        <Skeleton variant="text" className="w-64 sm:w-80 h-4" />
      </div>

      <div className="clean-card p-7 sm:p-10 space-y-7 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl">
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
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#0B1120] flex flex-col justify-center items-center px-4 py-8 relative">
      <div className="w-full max-w-md space-y-6">
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
