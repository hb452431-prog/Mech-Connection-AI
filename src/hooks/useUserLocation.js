import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * useUserLocation - Custom hook for managing browser GPS geolocation
 * 
 * @param {boolean} autoRequest - whether to attempt getting location on mount
 * @returns {object} { location, loading, error, permissionStatus, requestLocation, setManualLocation }
 */
export const useUserLocation = (autoRequest = false) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('prompt'); // 'prompt' | 'granted' | 'denied' | 'unsupported'
  const watchIdRef = useRef(null);

  // Check initial browser permission status if supported
  useEffect(() => {
    if (!navigator.geolocation) {
      setPermissionStatus('unsupported');
      setError('Geolocation is not supported by your browser.');
      return;
    }

    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setPermissionStatus(result.state);
        result.onchange = () => {
          setPermissionStatus(result.state);
        };
      }).catch(() => {
        // Fallback gracefully
      });
    }
  }, []);

  const handleSuccess = useCallback((pos) => {
    const coords = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
      accuracy: pos.coords.accuracy,
      timestamp: pos.timestamp
    };
    setLocation(coords);
    setLoading(false);
    setError(null);
    setPermissionStatus('granted');
  }, []);

  const handleError = useCallback((err) => {
    setLoading(false);
    let errMsg = 'Unable to retrieve your location.';
    if (err.code === 1) { // PERMISSION_DENIED
      errMsg = 'Location access is required to find nearby mechanics.';
      setPermissionStatus('denied');
    } else if (err.code === 2) { // POSITION_UNAVAILABLE
      errMsg = 'GPS position unavailable. Please check your device location settings.';
    } else if (err.code === 3) { // TIMEOUT
      errMsg = 'Location request timed out. Please try again.';
    }
    setError(errMsg);
  }, []);

  // Function to explicitly request GPS location
  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setPermissionStatus('unsupported');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        handleSuccess(pos);

        // Start watchPosition for continuous tracking
        if (watchIdRef.current !== null) {
          navigator.geolocation.clearWatch(watchIdRef.current);
        }

        watchIdRef.current = navigator.geolocation.watchPosition(
          handleSuccess,
          (watchErr) => {
            console.warn('Geolocation watch notice:', watchErr.message);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 15000
          }
        );
      },
      handleError,
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0
      }
    );
  }, [handleSuccess, handleError]);

  // Set manual coordinates (e.g. from location search)
  const setManualLocation = useCallback((lat, lng, name = '') => {
    setLocation({
      lat: Number(lat),
      lng: Number(lng),
      name,
      manual: true
    });
    setError(null);
  }, []);

  useEffect(() => {
    if (autoRequest) {
      requestLocation();
    }

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [autoRequest, requestLocation]);

  return {
    location,
    loading,
    error,
    permissionStatus,
    requestLocation,
    setManualLocation
  };
};

export default useUserLocation;
