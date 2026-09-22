import React, { useState, useEffect, useRef } from 'react';
import { Search, Navigation, Globe, X, Loader2, Compass, AlertTriangle } from 'lucide-react';
import { geocodingService } from '../../services/geocodingService';

export const MapControls = ({
  onLocate,
  onSelectLocation,
  onResetWorldView,
  isLocating = false,
  locationError = null,
  activeRouteInfo = null,
  garagesCount = 0
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  // Debounced search
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const results = await geocodingService.searchLocation(searchQuery);
        setSuggestions(results);
        setShowDropdown(true);
      } catch (e) {
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (item) => {
    setSearchQuery(item.shortName || item.displayName);
    setShowDropdown(false);
    if (onSelectLocation) {
      onSelectLocation(item.lat, item.lng, item.displayName);
    }
  };

  return (
    <div className="absolute top-3 left-3 right-3 z-[1000] pointer-events-none flex flex-col gap-2">
      {/* Top Bar: Search Box & GPS Locate Button */}
      <div className="flex items-center gap-2 max-w-lg w-full pointer-events-auto" ref={containerRef}>
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="flex items-center bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 shadow-md px-3 py-2 text-xs transition-all focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
            <Search className="w-4 h-4 text-slate-400 flex-shrink-0 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
              placeholder="Search city, address, or region..."
              className="w-full bg-transparent text-slate-800 placeholder-slate-400 outline-none text-xs font-medium"
            />
            {isSearching && (
              <Loader2 className="w-3.5 h-3.5 text-indigo-600 animate-spin flex-shrink-0" />
            )}
            {searchQuery && !isSearching && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSuggestions([]);
                }}
                className="text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Suggestions Dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-2xl py-1 z-[1001] max-h-56 overflow-y-auto">
              {suggestions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectSuggestion(item)}
                  className="w-full text-left px-3 py-2 hover:bg-indigo-50/80 transition-colors flex items-start gap-2 border-b border-slate-50 last:border-b-0"
                >
                  <Compass className="w-3.5 h-3.5 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {item.shortName}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">
                      {item.displayName}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Use My Location GPS Button */}
        <button
          type="button"
          onClick={onLocate}
          disabled={isLocating}
          title="Use my location (GPS)"
          className="p-2.5 bg-white/95 hover:bg-white text-indigo-700 active:scale-95 backdrop-blur-md rounded-xl border border-slate-200 shadow-md transition-all flex items-center justify-center flex-shrink-0 group"
        >
          {isLocating ? (
            <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
          ) : (
            <Navigation className="w-4 h-4 text-indigo-600 group-hover:rotate-45 transition-transform" />
          )}
        </button>

        {/* World View Reset Button */}
        {onResetWorldView && (
          <button
            type="button"
            onClick={onResetWorldView}
            title="Reset to World Map View"
            className="hidden sm:flex p-2.5 bg-white/95 hover:bg-white text-slate-700 active:scale-95 backdrop-blur-md rounded-xl border border-slate-200 shadow-md transition-all items-center justify-center flex-shrink-0"
          >
            <Globe className="w-4 h-4 text-slate-600" />
          </button>
        )}
      </div>

      {/* Location Error Warning Pill (if permission denied or GPS failed) */}
      {locationError && (
        <div className="pointer-events-auto bg-amber-50/95 border border-amber-200 text-amber-900 rounded-xl px-3 py-2 text-xs flex items-center justify-between gap-2 shadow-sm max-w-lg">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span className="text-[11px] font-medium leading-tight">{locationError}</span>
          </div>
          <button
            type="button"
            onClick={onLocate}
            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider flex-shrink-0 transition-colors shadow-2xs"
          >
            Enable GPS
          </button>
        </div>
      )}

      {/* Active Route HUD Overlay */}
      {activeRouteInfo && (
        <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md text-white rounded-xl px-4 py-2.5 shadow-xl border border-slate-700/80 flex items-center justify-between gap-4 max-w-lg animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-600/30 border border-orange-500/50 flex items-center justify-center text-orange-400">
              🚚
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-black text-white">Mechanic En Route</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Distance: <strong>{activeRouteInfo.distance}</strong> • ETA: <strong>{activeRouteInfo.eta}</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapControls;
