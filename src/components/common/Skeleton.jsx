import React from 'react';
import MechLoader from './MechLoader';

/**
 * Base Atomic Skeleton Element (preserved for inline/micro shimmer placeholders)
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
 * Page-Level Violet Loading Screens with Revolving Nut, Bolt & Spanner
 */
export const UserHomeSkeleton = () => (
  <MechLoader
    message="Loading Driver Portal..."
    subMessage="Syncing Vehicle Telemetry & Emergency Network"
    fullScreen={true}
  />
);

export const MechanicHomeSkeleton = () => (
  <MechLoader
    message="Loading Mechanic Workshop Portal..."
    subMessage="Connecting Emergency Dispatch & Radar Grid"
    fullScreen={true}
  />
);

export const FindGarageSkeleton = () => (
  <MechLoader
    message="Locating Nearby Certified Garages..."
    subMessage="Querying Live GPS & Workshop Availability"
    fullScreen={true}
  />
);

export const AiHelpSkeleton = () => (
  <MechLoader
    message="Connecting AI Diagnostic Engine..."
    subMessage="Loading Automotive Neural Repair Models"
    isAi={true}
    fullScreen={true}
  />
);

export const EmergencySkeleton = () => (
  <MechLoader
    message="Connecting Emergency Roadside Dispatch..."
    subMessage="Establishing Priority SOS Rescue Channel"
    fullScreen={true}
  />
);

export const MechanicRequestsSkeleton = () => (
  <MechLoader
    message="Fetching Live Emergency Breakdown Requests..."
    subMessage="Scanning Radar Radius for Drivers in Need"
    fullScreen={true}
  />
);

export const MechanicCompletedSkeleton = () => (
  <MechLoader
    message="Loading Service History & Earnings Records..."
    subMessage="Compiling Completed Work Orders"
    fullScreen={true}
  />
);

export const ProfileSkeleton = () => (
  <MechLoader
    message="Loading Profile & Vehicle Records..."
    subMessage="Retrieving Encrypted User Data"
    fullScreen={true}
  />
);

export const AuthSkeleton = () => (
  <MechLoader
    message="Initializing Secure Portal..."
    subMessage="Establishing 256-Bit Encrypted Session"
    fullScreen={true}
  />
);

export default Skeleton;
