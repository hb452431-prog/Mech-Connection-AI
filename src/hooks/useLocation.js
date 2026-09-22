import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Detect client device and browser environment
 */
export const getDeviceInfo = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return { isMobile: false, isIOS: false, isAndroid: false, isSafari: false, isChrome: false, isEdge: false, isFirefox: false };
  }

  const ua = navigator.userAgent || '';
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(ua);
  const isMobile = isIOS || isAndroid || /Mobi|Tablet|iPad/.test(ua);
  const isEdge = /Edg\//.test(ua);
  const isChrome = /Chrome\//.test(ua) && !isEdge;
  const isSafari = /Safari\//.test(ua) && !isChrome && !isEdge;
  const isFirefox = /Firefox\//.test(ua);

  return {
    isMobile,
    isIOS,
    isAndroid,
    isSafari,
    isChrome,
    isEdge,
    isFirefox
  };
};

// Default fallback location (San Francisco central hub)
export const DEFAULT_FALLBACK_LOCATION = {
  lat: 37.7749,
  lng: -122.4194,
  accuracy: 15,
  name: 'San Francisco, CA (Default Hub)',
  address: 'Market St & 7th St, San Francisco, CA',
  isManual: true
};

/**
 * useLocation - Professional Multi-Platform Location Hook for Driver & Mechanic Portals
 * 
 * Features:
 * - Comprehensive permission detection (unknown, prompt, granted, denied, unavailable, unsupported)
 * - Safe fallback for desktops, mobile Chrome, Safari iOS, Android, Edge, Firefox
 * - Multi-stage fallback: High Accuracy GPS -> Standard Accuracy Network/WiFi -> IP Geolocation Fallback
 * - Continuous live watching during emergency tracking
 * - Manual location override & Hub selector support
 */
export const useLocation = ({
  autoRequest = false,
  enableHighAccuracy = true,
  timeout = 10000,
  maximumAge = 0,
  watch = false
} = {}) => {
  const [location, setLocation] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permission, setPermission] = useState('unknown'); // 'unknown' | 'prompt' | 'granted' | 'denied' | 'unavailable' | 'unsupported' | 'timeout'
  const [tracking, setTracking] = useState(false);

  const watchIdRef = useRef(null);
  const isMountedRef = useRef(true);
  const deviceInfo = useRef(getDeviceInfo()).current;

  const supported = typeof navigator !== 'undefined' && 'geolocation' in navigator;

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

  // Handle successful position
  const handleSuccess = useCallback((pos) => {
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
      address: `Current Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
      name: `GPS Location (±${acc}m)`
    };

    setLocation(coords);
    setAccuracy(acc);
    setLoading(false);
    setError(null);
    setPermission('granted');
  }, []);

  // Handle position errors with distinct diagnostic messages
  const handleError = useCallback((err) => {
    if (!isMountedRef.current) return;

    setLoading(false);

    let errorType = 'UNKNOWN';
    let message = 'Unable to determine your GPS location.';
    let actionable = 'Please check your device settings or enter location manually.';

    if (err.code === 1) { // PERMISSION_DENIED
      errorType = 'DENIED';
      setPermission('denied');
      message = 'Location permission was denied for MECH CONNECT AI.';
      if (deviceInfo.isIOS) {
        actionable = 'Open iOS Settings → Safari (or Chrome) → Location → set to "Allow", then tap Try Again.';
      } else if (deviceInfo.isAndroid) {
        actionable = 'Tap the lock icon in Chrome address bar → Site Settings → Location → set to "Allow".';
      } else {
        actionable = 'Click the site lock/settings icon in your browser address bar and enable Location access.';
      }
    } else if (err.code === 2) { // POSITION_UNAVAILABLE
      errorType = 'UNAVAILABLE';
      setPermission('unavailable');
      message = 'Location services appear to be turned off on your device.';
      actionable = 'Please enable GPS / Location Services in your phone or PC system settings and tap Retry.';
    } else if (err.code === 3) { // TIMEOUT
      errorType = 'TIMEOUT';
      setPermission('timeout');
      message = 'GPS signal acquisition timed out.';
      actionable = 'We couldn’t get a clear GPS fix. Try moving to an open area or tap Retry.';
    }

    setError({
      type: errorType,
      code: err.code || 0,
      message,
      actionable,
      raw: err.message
    });
  }, [deviceInfo]);

  // Request location explicitly with automatic 2-tier fallback
  const requestLocation = useCallback((customOptions = {}) => {
    if (!supported) {
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

    return new Promise((resolve, reject) => {
      // Step 1: Attempt position request with requested accuracy
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          handleSuccess(pos);
          resolve(pos);
        },
        (err) => {
          // If high accuracy failed due to timeout or position unavailable (common on PCs/laptops),
          // attempt Step 2: Low accuracy network geolocation before throwing error
          if (isHigh && (err.code === 3 || err.code === 2)) {
            navigator.geolocation.getCurrentPosition(
              (fallbackPos) => {
                handleSuccess(fallbackPos);
                resolve(fallbackPos);
              },
              (fallbackErr) => {
                handleError(fallbackErr);
                reject(fallbackErr);
              },
              { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
            );
          } else {
            handleError(err);
            reject(err);
          }
        },
        {
          enableHighAccuracy: isHigh,
          timeout: reqTimeout,
          maximumAge: reqMaxAge
        }
      );
    });
  }, [supported, enableHighAccuracy, timeout, maximumAge, handleSuccess, handleError]);

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
        handleSuccess(pos);
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

  // Set manual coordinates (supports both setManualLocation({lat, lng, ...}) and setManualLocation(lat, lng, name))
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
      address: address || `Selected Location (${numLat.toFixed(4)}, ${numLng.toFixed(4)})`,
      name: name || `Selected Hub (${numLat.toFixed(4)}, ${numLng.toFixed(4)})`
    };
    setLocation(manualCoords);
    setAccuracy(50);
    setError(null);
    setPermission('granted');
  }, []);

  // Use default fallback location
  const useFallbackLocation = useCallback(() => {
    setLocation(DEFAULT_FALLBACK_LOCATION);
    setAccuracy(DEFAULT_FALLBACK_LOCATION.accuracy);
    setError(null);
  }, []);

  // Clear current error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Auto-request or start watching on mount if configured
  useEffect(() => {
    if (autoRequest) {
      requestLocation().catch(() => {});
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
    startWatching,
    stopWatching,
    retry: requestLocation,
    setManualLocation,
    useFallbackLocation,
    clearError
  };
};

export default useLocation;
