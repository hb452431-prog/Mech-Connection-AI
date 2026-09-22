import React from 'react';
import { MapPin, Navigation, RotateCcw, AlertTriangle, CheckCircle2, ShieldCheck, Compass } from 'lucide-react';

export const LocationStatusBar = ({
  location,
  accuracy,
  loading = false,
  error = null,
  permission = 'unknown',
  tracking = false,
  isManual = false,
  onRequestPermission,
  onRefreshLocation,
  onLocate,
  onOpenManualModal,
  onOpenHubModal,
  className = ''
}) => {
  const triggerEnable = onRequestPermission || onRefreshLocation || onLocate;
  const triggerHubModal = onOpenManualModal || onOpenHubModal;

  const isGPS = location && !location.isManual && !isManual;
  const isDenied = permission === 'denied' || error?.type === 'DENIED';
  const isUnavailable = permission === 'unavailable' || error?.type === 'UNAVAILABLE';
  const isTimeout = error?.type === 'TIMEOUT' || permission === 'timeout';

  return (
    <div className={`clean-card dark:bg-slate-900/90 dark:border-slate-800 p-3 sm:p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs border-slate-200/90 ${className}`}>
      {/* Left: Location indicator */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 font-bold ${
          loading 
            ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400' 
            : isDenied || isUnavailable
            ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400'
            : isGPS
            ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400'
            : 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-400'
        }`}>
          {loading ? (
            <Navigation className="w-4 h-4 animate-spin text-indigo-600 dark:text-indigo-400" />
          ) : isDenied || isUnavailable ? (
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          ) : (
            <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-black text-slate-900 dark:text-white truncate">
              {location?.name || (location ? `Coordinates: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'Detecting GPS Location...')}
            </span>
            {isGPS && accuracy && (
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                ±{accuracy}m GPS Locked
              </span>
            )}
            {(location?.isManual || isManual) && (
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Manual Hub
              </span>
            )}
            {tracking && (
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                ● Live Tracking
              </span>
            )}
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
            {loading 
              ? 'Acquiring satellite GPS fix...'
              : isDenied 
              ? 'GPS blocked • Click "Enable Real GPS" or change city'
              : isUnavailable
              ? 'Device GPS off • Using calibrated hub'
              : isTimeout
              ? 'GPS timeout • Click to retry or pick city'
              : `Active GPS Dispatch Hub • Lat ${location?.lat?.toFixed(3) || '37.774'}, Lng ${location?.lng?.toFixed(3) || '-122.419'}`}
          </p>
        </div>
      </div>

      {/* Right: Quick Location Actions */}
      <div className="flex items-center gap-2 ml-auto sm:ml-0">
        {triggerEnable && (!isGPS || isDenied || isUnavailable) && (
          <button
            type="button"
            onClick={triggerEnable}
            disabled={loading}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold font-mono uppercase tracking-wider bg-indigo-600 hover:bg-indigo-700 text-white transition-colors flex items-center gap-1 shadow-xs"
          >
            {loading ? (
              <Navigation className="w-3.5 h-3.5 animate-spin text-white" />
            ) : (
              <Compass className="w-3.5 h-3.5 text-white" />
            )}
            <span>{loading ? 'Locating...' : 'Enable Real GPS'}</span>
          </button>
        )}

        {triggerHubModal && (
          <button
            type="button"
            onClick={triggerHubModal}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            Change City
          </button>
        )}

        {triggerEnable && isGPS && !isDenied && (
          <button
            type="button"
            onClick={triggerEnable}
            disabled={loading}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Recalibrate GPS"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-indigo-600' : ''}`} />
          </button>
        )}
      </div>
    </div>
  );
};

export default LocationStatusBar;
