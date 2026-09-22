import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  ShieldCheck, 
  Check, 
  AlertTriangle, 
  RotateCcw, 
  Search, 
  X, 
  Smartphone, 
  Laptop, 
  Compass, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const LocationPermissionModal = ({
  isOpen,
  onClose,
  onEnable,
  onGrant,
  onRequestPermission,
  onManualSelect,
  onSelectManualLocation,
  onUseFallback,
  error,
  permission = 'prompt',
  loading = false,
  deviceInfo = {}
}) => {
  const [showManualSearch, setShowManualSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isActivating, setIsActivating] = useState(false);

  if (!isOpen) return null;

  const popularHubs = [
    { name: 'San Francisco, Downtown', lat: 37.7749, lng: -122.4194 },
    { name: 'Los Angeles, CA', lat: 34.0522, lng: -118.2437 },
    { name: 'New York, Manhattan', lat: 40.7128, lng: -74.0060 },
    { name: 'Austin, Downtown', lat: 30.2672, lng: -97.7431 },
    { name: 'Chicago, Loop', lat: 41.8781, lng: -87.6298 },
    { name: 'London, Central', lat: 51.5074, lng: -0.1278 }
  ];

  const handleEnableClick = async () => {
    setIsActivating(true);
    const triggerFn = onEnable || onGrant || onRequestPermission;
    if (triggerFn) {
      try {
        await triggerFn();
      } catch (err) {
        // Modal will show corresponding error state
      } finally {
        setIsActivating(false);
      }
    } else {
      setIsActivating(false);
      if (onClose) onClose();
    }
  };

  const handleSelectHub = (hub) => {
    if (onManualSelect) {
      onManualSelect(hub.lat, hub.lng, hub.name);
    }
    if (onSelectManualLocation) {
      onSelectManualLocation({ lat: hub.lat, lng: hub.lng, name: hub.name, address: hub.name });
    }
    if (onClose) onClose();
  };

  const isDenied = permission === 'denied' || error?.type === 'DENIED';
  const isUnavailable = permission === 'unavailable' || error?.type === 'UNAVAILABLE';
  const isTimeout = error?.type === 'TIMEOUT';
  const isUnsupported = permission === 'unsupported' || error?.type === 'UNSUPPORTED';
  const showLoading = loading || isActivating;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="clean-card dark:bg-slate-900 dark:border-slate-800 max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 relative overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none -mr-12 -mt-12" />

        {/* Close button if optional */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon & Title */}
        <div className="text-center space-y-2 pt-1">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 relative group">
            {showLoading ? (
              <Navigation className="w-7 h-7 animate-spin text-white" />
            ) : isDenied || isUnavailable ? (
              <AlertTriangle className="w-7 h-7 text-amber-300 animate-pulse" />
            ) : (
              <MapPin className="w-7 h-7 text-white" />
            )}
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white dark:border-slate-900 rounded-full" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
              GPS Positioning System
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading">
              {isDenied 
                ? 'Location Access Denied' 
                : isUnavailable 
                ? 'Device Location is Off' 
                : isTimeout 
                ? 'GPS Signal Timeout' 
                : isUnsupported 
                ? 'Browser Unsupported' 
                : 'LOCATION ACCESS'}
            </h2>
          </div>
        </div>

        {/* CASE: Manual City Selection View */}
        {showManualSearch ? (
          <div className="space-y-4 animate-in fade-in duration-150">
            <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
              Select a city or garage hub below to locate nearby roadside mechanics:
            </p>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {popularHubs.map((hub) => (
                <button
                  key={hub.name}
                  type="button"
                  onClick={() => handleSelectHub(hub)}
                  className="w-full text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 border border-slate-200 dark:border-slate-700/60 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{hub.name}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                        Lat: {hub.lat.toFixed(4)}, Lng: {hub.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 font-mono bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                    Select
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowManualSearch(false)}
              className="w-full btn-secondary py-2.5 text-xs font-bold"
            >
              Back to GPS Permission
            </button>
          </div>
        ) : (
          /* Main Permission Cases */
          <div className="space-y-4">
            {/* Standard Initial Prompt View */}
            {!isDenied && !isUnavailable && !isTimeout && !isUnsupported && (
              <>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 text-center leading-relaxed font-medium">
                  <strong>MECH CONNECT AI</strong> needs your location to find nearby garages, dispatch emergency units, and calculate live arrival ETAs.
                </p>

                {/* Value Checklist */}
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3.5 space-y-2 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                  <p className="font-bold text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                    Your location is used to:
                  </p>
                  <ul className="space-y-1.5 font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>Find nearby certified mechanics & workshops</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>Send your exact GPS with emergency breakdown SOS</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>Show accurate road distance & arrival time (ETA)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>Track mechanic approaching live on interactive map</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={handleEnableClick}
                    disabled={showLoading}
                    className="w-full btn-primary py-3.5 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20"
                  >
                    {showLoading ? (
                      <>
                        <Navigation className="w-4 h-4 animate-spin" />
                        <span>Detecting Coordinates...</span>
                      </>
                    ) : (
                      <>
                        <Compass className="w-4 h-4" />
                        <span>Enable Location</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowManualSearch(true)}
                    className="w-full btn-secondary py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300"
                  >
                    Select City / Hub Manually
                  </button>
                </div>
              </>
            )}

            {/* CASE 3 & 4: Permission Denied / Blocked in Browser */}
            {isDenied && (
              <div className="space-y-3.5 text-xs">
                <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 rounded-xl p-3.5 text-amber-900 dark:text-amber-200 space-y-1.5">
                  <p className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                    <span>Location permission is blocked in your browser.</span>
                  </p>
                  <p className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
                    To enable live GPS tracking, please allow location access in your browser settings:
                  </p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                  <p className="font-bold text-indigo-600 dark:text-indigo-400 uppercase font-mono">
                    How to Unblock:
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Chrome / Edge:</strong> Tap the lock 🔒 icon in the URL bar → set Location to <em>Allow</em>.</li>
                    <li><strong>iOS Safari:</strong> Tap <code>aA</code> or lock icon in address bar → Website Settings → Location → <em>Allow</em>.</li>
                    <li><strong>Android Chrome:</strong> Settings → Site Settings → Location → Allow for this site.</li>
                  </ul>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleEnableClick}
                    disabled={showLoading}
                    className="flex-1 btn-primary py-3 text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    {showLoading ? (
                      <Navigation className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <RotateCcw className="w-3.5 h-3.5" />
                    )}
                    <span>Try Again</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowManualSearch(true)}
                    className="flex-1 btn-secondary py-3 text-xs font-bold"
                  >
                    Select City
                  </button>
                </div>
              </div>
            )}

            {/* CASE 5: Device Location Services Disabled */}
            {isUnavailable && (
              <div className="space-y-3.5 text-xs">
                <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/60 rounded-xl p-3.5 text-red-900 dark:text-red-200 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                    <span>Device GPS / Location Services are turned off.</span>
                  </p>
                  <p className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
                    Your phone or computer system location toggle is currently off. Please turn on Location in device settings.
                  </p>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleEnableClick}
                    disabled={showLoading}
                    className="flex-1 btn-primary py-3 text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    {showLoading ? (
                      <Navigation className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <RotateCcw className="w-3.5 h-3.5" />
                    )}
                    <span>Check Again</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowManualSearch(true)}
                    className="flex-1 btn-secondary py-3 text-xs font-bold"
                  >
                    Manual City
                  </button>
                </div>
              </div>
            )}

            {/* CASE 6: GPS Timeout */}
            {isTimeout && (
              <div className="space-y-3.5 text-xs">
                <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 text-slate-800 dark:text-slate-200 space-y-1">
                  <p className="font-bold flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                    <Navigation className="w-4 h-4 animate-spin-slow" />
                    <span>We couldn't get a clear GPS fix yet.</span>
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    Satellite signal might be weak indoors. You can retry with network location or pick your city hub.
                  </p>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleEnableClick}
                    disabled={showLoading}
                    className="flex-1 btn-primary py-3 text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    {showLoading ? (
                      <Navigation className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <RotateCcw className="w-3.5 h-3.5" />
                    )}
                    <span>Retry GPS</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowManualSearch(true)}
                    className="flex-1 btn-secondary py-3 text-xs font-bold"
                  >
                    Select City
                  </button>
                </div>
              </div>
            )}

            {/* CASE 8: Unsupported Browser */}
            {isUnsupported && (
              <div className="space-y-3.5 text-xs">
                <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 text-slate-800 dark:text-slate-200 space-y-1">
                  <p className="font-bold">Geolocation not supported on this browser.</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Please use the interactive map search or select from pre-calibrated garage hubs.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowManualSearch(true)}
                  className="w-full btn-primary py-3 text-xs font-bold"
                >
                  Choose Your City Hub
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer Note */}
        <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center font-mono">
          🔒 Your coordinates are only used for nearby garage dispatch and active rescue.
        </p>
      </div>
    </div>
  );
};

export default LocationPermissionModal;
