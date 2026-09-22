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
  Sparkles,
  Wifi,
  Globe,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { geocodingService } from '../../services/geocodingService';

export const LocationPermissionModal = ({
  isOpen,
  onClose,
  onEnable,
  onGrant,
  onRequestPermission,
  onUseIPLocation,
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
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [activeTab, setActiveTab] = useState(deviceInfo?.isWindows ? 'windows' : deviceInfo?.isMac ? 'mac' : deviceInfo?.isIOS ? 'ios' : deviceInfo?.isAndroid ? 'android' : 'windows');

  if (!isOpen) return null;

  const popularHubs = [
    { name: 'San Francisco, Downtown', lat: 37.7749, lng: -122.4194 },
    { name: 'Bengaluru, Central Hub', lat: 12.9716, lng: 77.5946 },
    { name: 'Mumbai, Commercial Plaza', lat: 19.0760, lng: 72.8777 },
    { name: 'New Delhi, Connaught Place', lat: 28.6139, lng: 77.2090 },
    { name: 'New York, Manhattan', lat: 40.7128, lng: -74.0060 },
    { name: 'Los Angeles, CA', lat: 34.0522, lng: -118.2437 },
    { name: 'London, Central City', lat: 51.5074, lng: -0.1278 }
  ];

  const handleEnableClick = async () => {
    setIsActivating(true);
    const triggerFn = onEnable || onGrant || onRequestPermission;
    if (triggerFn) {
      try {
        await triggerFn();
        if (onClose) onClose();
      } catch (err) {
        // Modal shows error state
      } finally {
        setIsActivating(false);
      }
    } else {
      setIsActivating(false);
      if (onClose) onClose();
    }
  };

  const handleIPLocationClick = async () => {
    setIsActivating(true);
    if (onUseIPLocation) {
      try {
        await onUseIPLocation();
        if (onClose) onClose();
      } catch (err) {
        // Continue
      } finally {
        setIsActivating(false);
      }
    } else if (onRequestPermission) {
      try {
        await onRequestPermission();
        if (onClose) onClose();
      } catch (err) {
        // Continue
      } finally {
        setIsActivating(false);
      }
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery || searchQuery.trim().length < 2) return;

    setIsSearching(true);
    try {
      const results = await geocodingService.searchLocation(searchQuery);
      setSearchResults(results);
    } catch (e) {
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectHub = (hub) => {
    if (onManualSelect) {
      onManualSelect(hub.lat, hub.lng, hub.name || hub.displayName);
    }
    if (onSelectManualLocation) {
      onSelectManualLocation({ lat: hub.lat, lng: hub.lng, name: hub.name || hub.displayName, address: hub.address || hub.displayName || hub.name });
    }
    if (onClose) onClose();
  };

  const isDenied = permission === 'denied' || error?.type === 'DENIED';
  const isUnavailable = permission === 'unavailable' || error?.type === 'UNAVAILABLE';
  const isTimeout = error?.type === 'TIMEOUT' || permission === 'timeout';
  const isUnsupported = permission === 'unsupported' || error?.type === 'UNSUPPORTED';
  const isIPFallback = permission === 'ip-fallback';
  const showLoading = loading || isActivating;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="clean-card dark:bg-slate-900 dark:border-slate-800 max-w-lg w-full p-5 sm:p-7 shadow-2xl space-y-5 relative overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none -mr-12 -mt-12" />

        {/* Close button */}
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
              GPS & System Location Setup
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading">
              {isDenied 
                ? 'Location Access Blocked' 
                : isUnavailable 
                ? 'Operating System GPS Is Off' 
                : isTimeout 
                ? 'GPS Signal Acquisition' 
                : isUnsupported 
                ? 'Manual City / Hub Selection' 
                : 'Turn On Location Access'}
            </h2>
          </div>
        </div>

        {/* CASE: City Search & Manual Selection View */}
        {showManualSearch ? (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter city, area, or pin code..."
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSearching}
                className="btn-primary px-4 py-2.5 text-xs font-bold flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{isSearching ? 'Searching...' : 'Search'}</span>
              </button>
            </form>

            {/* Custom Search Results */}
            {searchResults.length > 0 && (
              <div className="space-y-1.5 max-h-40 overflow-y-auto border border-indigo-200 dark:border-indigo-800 rounded-xl p-2 bg-indigo-50/50 dark:bg-indigo-950/30">
                <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
                  Search Results ({searchResults.length}):
                </p>
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectHub(item)}
                    className="w-full text-left p-2.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-slate-200 dark:border-slate-800 transition-all flex items-center justify-between group"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{item.shortName}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{item.displayName}</p>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 font-mono bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800 flex-shrink-0">
                      Select
                    </span>
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                Popular Garage Dispatch Hubs:
              </p>
              {popularHubs.map((hub) => (
                <button
                  key={hub.name}
                  type="button"
                  onClick={() => handleSelectHub(hub)}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 border border-slate-200 dark:border-slate-700/60 transition-all flex items-center justify-between group"
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
              Back to GPS Setup
            </button>
          </div>
        ) : (
          /* Main Permission Cases & Troubleshooting */
          <div className="space-y-4">
            {/* Context Info */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 text-center leading-relaxed font-medium">
              MECH CONNECT AI uses your coordinates to dispatch nearby certified mechanics, compute live arrival ETAs, and power roadside SOS rescue.
            </p>

            {/* Operating System Specific Guide Accordion / Tabs */}
            {(isDenied || isUnavailable) && (
              <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-3.5 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 font-mono flex items-center gap-1.5">
                    <Laptop className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>How to Enable on Your OS:</span>
                  </span>
                  
                  {/* OS Selector Tabs */}
                  <div className="flex bg-slate-200 dark:bg-slate-900 p-0.5 rounded-lg text-[10px] font-bold">
                    <button
                      type="button"
                      onClick={() => setActiveTab('windows')}
                      className={`px-2 py-0.5 rounded ${activeTab === 'windows' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
                    >
                      Windows
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('mac')}
                      className={`px-2 py-0.5 rounded ${activeTab === 'mac' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
                    >
                      Mac
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('mobile')}
                      className={`px-2 py-0.5 rounded ${activeTab === 'mobile' || activeTab === 'android' || activeTab === 'ios' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
                    >
                      Phone
                    </button>
                  </div>
                </div>

                {/* Tab: Windows */}
                {activeTab === 'windows' && (
                  <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 animate-in fade-in duration-100">
                    <ol className="list-decimal pl-4 space-y-1.5 text-[11px]">
                      <li>
                        Press <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-[10px] font-mono">Win + I</kbd> to open Windows Settings.
                      </li>
                      <li>
                        Click <strong>Privacy & security</strong> &rarr; <strong>Location</strong>.
                      </li>
                      <li>
                        Turn <strong className="text-emerald-600 dark:text-emerald-400">ON</strong> <em>Location services</em> and <em>Let desktop apps access your location</em>.
                      </li>
                      <li>
                        In your browser (Chrome/Edge), click the 🔒 lock icon in the URL bar &rarr; Set Location to <strong>Allow</strong>.
                      </li>
                    </ol>
                  </div>
                )}

                {/* Tab: Mac */}
                {activeTab === 'mac' && (
                  <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 animate-in fade-in duration-100">
                    <ol className="list-decimal pl-4 space-y-1.5 text-[11px]">
                      <li>Open <strong>System Settings</strong> (Apple Menu &rarr; System Settings).</li>
                      <li>Click <strong>Privacy & Security</strong> &rarr; <strong>Location Services</strong>.</li>
                      <li>Turn <strong className="text-emerald-600 dark:text-emerald-400">ON</strong> Location Services and check your browser (Chrome/Safari).</li>
                    </ol>
                  </div>
                )}

                {/* Tab: Mobile (Android & iOS) */}
                {(activeTab === 'mobile' || activeTab === 'android' || activeTab === 'ios') && (
                  <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 animate-in fade-in duration-100">
                    <ol className="list-decimal pl-4 space-y-1.5 text-[11px]">
                      <li>Swipe down notification shade / control center and turn <strong>ON Location / GPS</strong>.</li>
                      <li>In Chrome/Safari, tap the site settings lock icon &rarr; <strong>Allow Location</strong>.</li>
                    </ol>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons Hub */}
            <div className="space-y-2.5 pt-1">
              {/* Button 1: Native High-Accuracy GPS Request */}
              <button
                type="button"
                onClick={handleEnableClick}
                disabled={showLoading}
                className="w-full btn-primary py-3.5 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20"
              >
                {showLoading ? (
                  <>
                    <Navigation className="w-4 h-4 animate-spin" />
                    <span>Detecting GPS Coordinates...</span>
                  </>
                ) : (
                  <>
                    <Compass className="w-4 h-4" />
                    <span>{isDenied || isUnavailable ? 'Retry Hardware GPS' : 'Enable Real GPS Location'}</span>
                  </>
                )}
              </button>

              {/* Button 2: Instant Smart Network / IP Geolocation Fallback (Works 100% without OS permission) */}
              <button
                type="button"
                onClick={handleIPLocationClick}
                disabled={showLoading}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <Wifi className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Turn On via Network / IP Location (Instant)</span>
              </button>

              {/* Button 3: Manual City Hub */}
              <button
                type="button"
                onClick={() => setShowManualSearch(true)}
                className="w-full btn-secondary py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search City or Select Garage Hub</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer Security Note */}
        <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center font-mono">
          🔒 Secure SSL Geolocation • Coordinates are strictly used for nearest workshop dispatch and roadside rescue.
        </p>
      </div>
    </div>
  );
};

export default LocationPermissionModal;
