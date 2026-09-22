import { useState, useEffect, useCallback, useRef } from 'react';
import { ipLocationService } from '../services/ipLocationService';

const LOCATION_STORAGE_KEY = 'mech_connect_active_location';

/**
 * Detect client device, operating system, and browser environment
 */
export const getDeviceInfo = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return {
      isMobile: false,
      isIOS: false,
      isAndroid: false,
      isWindows: false,
      isMac: false,
      isLinux: false,
      isSafari: false,
      isChrome: false,
      isEdge: false,
      isFirefox: false,
      isSecureContext: true,
      osName: 'Desktop'
    };
  }

  const ua = navigator.userAgent || '';
  const platform = navigator.userAgentData?.platform || navigator.platform || '';
  
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(ua);
  const isMobile = isIOS || isAndroid || /Mobi|Tablet|iPad/.test(ua);
  
  const isWindows = /Win/i.test(platform) || /Windows/i.test(ua);
  const isMac = (/Mac/i.test(platform) || /Macintosh/i.test(ua)) && !isIOS;
  const isLinux = /Linux/i.test(platform) && !isAndroid;

  const isEdge = /Edg\//.test(ua);
  const isChrome = /Chrome\//.test(ua) && !isEdge;
  const isSafari = /Safari\//.test(ua) && !isChrome && !isEdge;
  const isFirefox = /Firefox\//.test(ua);

  const isSecureContext = typeof window.isSecureContext === 'boolean' ? window.isSecureContext : true;

  let osName = 'Desktop';
  if (isWindows) osName = 'Windows';
  else if (isMac) osName = 'macOS';
  else if (isIOS) osName = 'iOS';
  else if (isAndroid) osName = 'Android';
  else if (isLinux) osName = 'Linux';

  return {
    isMobile,
    isIOS,
    isAndroid,
    isWindows,
    isMac,
    isLinux,
    isSafari,
    isChrome,
    isEdge,
    isFirefox,
    isSecureContext,
    osName
  };
};

// Default fallback location (San Francisco central hub)
export const DEFAULT_FALLBACK_LOCATION = {
  lat: 37.7749,
  lng: -122.4194,
  accuracy: 15,
  name: 'San Francisco, CA (Default Hub)',
  address: 'Market St & 7th St, San Francisco, CA',
  isManual: true,
  source: 'manual'
};

/**
 * useLocation - Professional Multi-Platform Location Hook for Driver & Mechanic Portals
 * 
 * Features:
 * - Multi-tier location detection (Hardware GPS -> Network/WiFi -> Automatic IP Geolocation)
 * - OS Location Services detection & friendly troubleshooting for Windows, macOS, Android, iOS
 * - Non-blocking fallback: If OS permission is off, automatically falls back to approximate IP location so the map works immediately
 * - Persistent location across route transitions
 * - Continuous live watching during emergency tracking
 * - Manual location override & Hub selector support
 */
export const useLocation = ({
  autoRequest = false,
  enableHighAccuracy = true,
  timeout = 10000,
  maximumAge = 0,
  watch = false,
  allowIPFallback = true
} = {}) => {
  // Initialize from sessionStorage if available
  const [location, setLocation] = useState(() => {
    if (typeof sessionStorage !== 'undefined') {
      try {
        const saved = sessionStorage.getItem(LOCATION_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed.lat === 'number' && typeof parsed.lng === 'number') {
            return parsed;
          }
        }
      } catch (e) {}
    }
    return null;
  });

  const [accuracy, setAccuracy] = useState(location?.accuracy || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permission, setPermission] = useState('unknown'); // 'unknown' | 'prompt' | 'granted' | 'denied' | 'unavailable' | 'unsupported' | 'timeout' | 'ip-fallback'
  const [tracking, setTracking] = useState(false);

  const watchIdRef = useRef(null);
  const isMountedRef = useRef(true);
  const deviceInfo = useRef(getDeviceInfo()).current;

  const supported = typeof navigator !== 'undefined' && 'geolocation' in navigator;

  // Persist location updates to session storage
  const saveLocationState = useCallback((loc) => {
    if (loc && typeof loc.lat === 'number' && typeof loc.lng === 'number') {
      try {
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(loc));
        }
      } catch (e) {}
    }
  }, []);

  // Initialize permission state
  useEffect(() => {
    isMountedRef.current = true;

    if (!supported) {
      setPermission('unsupported');
      setError({
        type: 'UNSUPPORTED',
        code: 0,
        message: 'Location services are not supported by this browser.',
        actionable: 'Please enter your location manually or use a modern mobile/desktop browser.'
      });
      return;
    }

    // Try modern Permissions API if available
    if (navigator.permissions && navigator.permissions.query) {
      try {
        navigator.permissions.query({ name: 'geolocation' })
          .then((status) => {
            if (!isMountedRef.current) return;
            setPermission(status.state); // 'granted' | 'prompt' | 'denied'

            status.onchange = () => {
              if (!isMountedRef.current) return;
              setPermission(status.state);
              if (status.state === 'granted') {
                requestLocation();
              }
            };
          })
          .catch(() => {
            // Some browsers (e.g. Safari / Firefox / older Edge) fail permissions.query for geolocation
            setPermission('prompt');
          });
      } catch (e) {
        setPermission('prompt');
      }
    } else {
      setPermission('prompt');
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [supported]);

  // Handle successful position from GPS or browser
  const handleSuccess = useCallback((pos, source = 'gps') => {
    if (!isMountedRef.current) return;

    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const acc = Math.round(pos.coords.accuracy || 10);

    const coords = {
      lat,
      lng,
      accuracy: acc,
      altitude: pos.coords.altitude || null,
      heading: pos.coords.heading || null,
      speed: pos.coords.speed || null,
      timestamp: pos.timestamp || Date.now(),
      isManual: false,
      isIPFallback: false,
      source: source,
      address: `Current Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
      name: source === 'gps' ? `GPS Location (±${acc}m)` : `Network Location (±${acc}m)`
    };

    setLocation(coords);
    setAccuracy(acc);
    setLoading(false);
    setError(null);
    setPermission('granted');
    saveLocationState(coords);
  }, [saveLocationState]);

  // Handle position errors with OS-specific instructions
  const handleError = useCallback((err) => {
    if (!isMountedRef.current) return;

    setLoading(false);

    let errorType = 'UNKNOWN';
    let message = 'Unable to determine your GPS location.';
    let actionable = 'Please check your device settings or enter location manually.';
    let osInstructions = '';

    if (err.code === 1) { // PERMISSION_DENIED
      errorType = 'DENIED';
      setPermission('denied');
      message = 'Location access is blocked by your browser or operating system.';
      
      if (deviceInfo.isWindows) {
        actionable = '1. Click the lock/settings icon in the browser address bar and set Location to "Allow".\n2. Open Windows Settings → Privacy & Security → Location → Turn ON "Location services" and "Let desktop apps access your location".';
        osInstructions = 'Windows Settings: Win + I → Privacy & security → Location → Turn ON Location services.';
      } else if (deviceInfo.isMac) {
        actionable = '1. Click the site settings icon in the address bar → Allow Location.\n2. Open System Settings → Privacy & Security → Location Services → Turn ON for your browser.';
        osInstructions = 'macOS: Apple Menu → System Settings → Privacy & Security → Location Services.';
      } else if (deviceInfo.isIOS) {
        actionable = 'Open iOS Settings → Safari (or Chrome) → Location → set to "Allow", then tap Try Again.';
        osInstructions = 'iOS Settings → Privacy & Security → Location Services → Safari Websites → While Using the App.';
      } else if (deviceInfo.isAndroid) {
        actionable = 'Tap the lock icon in Chrome address bar → Site Settings → Location → set to "Allow", and ensure phone GPS toggle is ON.';
        osInstructions = 'Android: Pull down notification shade → Turn on Location.';
      } else {
        actionable = 'Click the site lock/settings icon in your browser address bar and enable Location access.';
        osInstructions = 'Check browser and system location permissions.';
      }
    } else if (err.code === 2) { // POSITION_UNAVAILABLE
      errorType = 'UNAVAILABLE';
      setPermission('unavailable');
      message = 'Operating system Location Services appear to be turned off.';
      
      if (deviceInfo.isWindows) {
        actionable = 'Open Windows Settings (Win + I) → Privacy & Security → Location → Turn ON "Location services".';
        osInstructions = 'Press Win + I → Privacy & Security → Location → Turn ON "Location services".';
      } else if (deviceInfo.isMac) {
        actionable = 'Open System Settings → Privacy & Security → Location Services → Turn ON Location Services.';
        osInstructions = 'Apple Menu → System Settings → Privacy & Security → Location Services.';
      } else if (deviceInfo.isMobile) {
        actionable = 'Please pull down your device quick settings menu and turn ON Location / GPS.';
        osInstructions = 'Turn ON device Location toggle in settings.';
      } else {
        actionable = 'Please enable GPS / Location Services in your computer system settings and tap Retry.';
        osInstructions = 'Enable operating system location services.';
      }
    } else if (err.code === 3) { // TIMEOUT
      errorType = 'TIMEOUT';
      setPermission('timeout');
      message = 'GPS signal acquisition timed out.';
      actionable = 'We couldn’t get a clear satellite GPS fix. Connected via network/IP location or tap Retry.';
      osInstructions = 'Try moving to an area with clearer signal or use WiFi network location.';
    }

    const errObj = {
      type: errorType,
      code: err.code || 0,
      message,
      actionable,
      osInstructions,
      raw: err.message
    };

    setError(errObj);
    return errObj;
  }, [deviceInfo]);

  // Request IP-based Geolocation directly
  const fetchIPLocation = useCallback(async () => {
    if (!isMountedRef.current) return null;
    setLoading(true);

    try {
      const ipData = await ipLocationService.getIPLocation();
      if (!isMountedRef.current) return null;

      if (ipData && typeof ipData.lat === 'number' && typeof ipData.lng === 'number') {
        const coords = {
          lat: ipData.lat,
          lng: ipData.lng,
          accuracy: ipData.accuracy || 3000,
          timestamp: Date.now(),
          isManual: false,
          isIPFallback: true,
          source: 'ip',
          address: ipData.address || `${ipData.city || 'Detected Region'}, ${ipData.region || ''}`,
          name: `${ipData.city || 'Detected City'} (${ipData.region || ipData.country || 'Network'})`
        };

        setLocation(coords);
        setAccuracy(coords.accuracy);
        setLoading(false);
        setPermission('ip-fallback');
        saveLocationState(coords);
        return coords;
      }
    } catch (e) {
      // Ignore
    }

    if (isMountedRef.current) {
      setLoading(false);
    }
    return null;
  }, [saveLocationState]);

  // Request location explicitly with automatic 3-tier fallback (GPS -> Network -> IP Geolocation)
  const requestLocation = useCallback(async (customOptions = {}) => {
    if (!supported) {
      // If browser doesn't have geolocation API, immediately try IP location
      const ipResult = await fetchIPLocation();
      if (ipResult) return ipResult;

      const unsuppErr = {
        type: 'UNSUPPORTED',
        code: 0,
        message: 'Geolocation is not supported by your browser.',
        actionable: 'Please use a modern browser or set your location manually.'
      };
      setError(unsuppErr);
      setPermission('unsupported');
      return Promise.reject(new Error('Geolocation unsupported'));
    }

    setLoading(true);
    setError(null);

    const isHigh = customOptions.enableHighAccuracy ?? enableHighAccuracy;
    const reqTimeout = customOptions.timeout ?? timeout;
    const reqMaxAge = customOptions.maximumAge ?? maximumAge;
    const shouldFallbackIP = customOptions.allowIPFallback ?? allowIPFallback;

    return new Promise((resolve, reject) => {
      // Stage 1: Attempt position request with requested accuracy (GPS / WiFi)
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          handleSuccess(pos, isHigh ? 'gps' : 'network');
          resolve(pos);
        },
        (err) => {
          // Stage 2: If high accuracy failed due to timeout or position unavailable (common on PCs without GPS chips),
          // attempt low accuracy network/WiFi geolocation
          if (isHigh && (err.code === 3 || err.code === 2)) {
            navigator.geolocation.getCurrentPosition(
              (fallbackPos) => {
                handleSuccess(fallbackPos, 'network');
                resolve(fallbackPos);
              },
              async (fallbackErr) => {
                handleError(fallbackErr);

                // Stage 3: Automatic IP Geolocation Fallback
                if (shouldFallbackIP) {
                  const ipResult = await fetchIPLocation();
                  if (ipResult) {
                    resolve({ coords: { latitude: ipResult.lat, longitude: ipResult.lng, accuracy: ipResult.accuracy } });
                    return;
                  }
                }
                reject(fallbackErr);
              },
              { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
            );
          } else {
            handleError(err);

            // If permission was denied or unavailable, attempt IP fallback so the user is not left stranded
            if (shouldFallbackIP && (err.code === 1 || err.code === 2 || err.code === 3)) {
              fetchIPLocation().then((ipResult) => {
                if (ipResult) {
                  resolve({ coords: { latitude: ipResult.lat, longitude: ipResult.lng, accuracy: ipResult.accuracy } });
                } else {
                  reject(err);
                }
              }).catch(() => reject(err));
            } else {
              reject(err);
            }
          }
        },
        {
          enableHighAccuracy: isHigh,
          timeout: reqTimeout,
          maximumAge: reqMaxAge
        }
      );
    });
  }, [supported, enableHighAccuracy, timeout, maximumAge, allowIPFallback, handleSuccess, handleError, fetchIPLocation]);

  // One-click guaranteed "Turn On Location" method
  const turnOnLocation = useCallback(async () => {
    try {
      return await requestLocation({ enableHighAccuracy: true, timeout: 8000, allowIPFallback: true });
    } catch (e) {
      // If native fails, force IP fallback immediately
      return await fetchIPLocation();
    }
  }, [requestLocation, fetchIPLocation]);

  // Start continuous watching (e.g. while driver is waiting or mechanic is driving)
  const startWatching = useCallback((customOptions = {}) => {
    if (!supported) return;

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    const opts = {
      enableHighAccuracy: customOptions.enableHighAccuracy ?? true,
      timeout: customOptions.timeout ?? 15000,
      maximumAge: customOptions.maximumAge ?? 5000
    };

    setTracking(true);
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        handleSuccess(pos, 'gps');
      },
      (err) => {
        console.warn('Geolocation watch notice:', err.message);
      },
      opts
    );
  }, [supported, handleSuccess]);

  // Stop watching
  const stopWatching = useCallback(() => {
    if (watchIdRef.current !== null && typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setTracking(false);
  }, []);

  // Set manual coordinates
  const setManualLocation = useCallback((arg1, arg2, arg3) => {
    let lat, lng, name, address;

    if (arg1 && typeof arg1 === 'object') {
      lat = arg1.lat;
      lng = arg1.lng;
      name = arg1.name || arg1.address || '';
      address = arg1.address || arg1.name || '';
    } else {
      lat = arg1;
      lng = arg2;
      name = arg3 || '';
      address = arg3 || '';
    }

    const numLat = Number(lat);
    const numLng = Number(lng);

    if (isNaN(numLat) || isNaN(numLng)) {
      return;
    }

    const manualCoords = {
      lat: numLat,
      lng: numLng,
      accuracy: 50,
      timestamp: Date.now(),
      isManual: true,
      isIPFallback: false,
      source: 'manual',
      address: address || `Selected Location (${numLat.toFixed(4)}, ${numLng.toFixed(4)})`,
      name: name || `Selected Hub (${numLat.toFixed(4)}, ${numLng.toFixed(4)})`
    };
    setLocation(manualCoords);
    setAccuracy(50);
    setError(null);
    setPermission('granted');
    saveLocationState(manualCoords);
  }, [saveLocationState]);

  // Use default fallback location
  const useFallbackLocation = useCallback(() => {
    setLocation(DEFAULT_FALLBACK_LOCATION);
    setAccuracy(DEFAULT_FALLBACK_LOCATION.accuracy);
    setError(null);
    saveLocationState(DEFAULT_FALLBACK_LOCATION);
  }, [saveLocationState]);

  // Clear current error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Auto-request or start watching on mount if configured
  useEffect(() => {
    if (autoRequest) {
      requestLocation({ allowIPFallback: true }).catch(() => {});
    }

    if (watch) {
      startWatching();
    }

    return () => {
      stopWatching();
    };
  }, [autoRequest, watch, requestLocation, startWatching, stopWatching]);

  return {
    location,
    accuracy,
    loading,
    error,
    permission,
    supported,
    tracking,
    deviceInfo,
    requestLocation,
    fetchIPLocation,
    turnOnLocation,
    startWatching,
    stopWatching,
    retry: turnOnLocation,
    setManualLocation,
    useFallbackLocation,
    clearError
  };
};

export default useLocation;
