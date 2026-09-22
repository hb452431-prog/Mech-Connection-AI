import { useLocation, DEFAULT_FALLBACK_LOCATION } from './useLocation';

/**
 * useUserLocation - Compatibility layer for existing pages
 * Re-exports the unified useLocation hook
 */
export const useUserLocation = (autoRequest = false) => {
  const loc = useLocation({ autoRequest, watch: autoRequest });

  return {
    location: loc.location,
    accuracy: loc.accuracy,
    loading: loc.loading,
    error: loc.error ? loc.error.message : null,
    errorObj: loc.error,
    permissionStatus: loc.permission,
    permission: loc.permission,
    supported: loc.supported,
    tracking: loc.tracking,
    deviceInfo: loc.deviceInfo,
    requestLocation: loc.requestLocation,
    startWatching: loc.startWatching,
    stopWatching: loc.stopWatching,
    setManualLocation: loc.setManualLocation,
    useFallbackLocation: loc.useFallbackLocation,
    clearError: loc.clearError,
    retry: loc.retry
  };
};

export { DEFAULT_FALLBACK_LOCATION };
export default useUserLocation;
