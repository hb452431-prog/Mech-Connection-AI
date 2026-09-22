import { calculateDistanceKm, calculateETA, formatDistance } from '../utils/distance';

/**
 * Routing Service using OSRM (Open Source Routing Machine)
 * With graceful straight-line & interpolated road fallback
 */

const routeCache = new Map();

/**
 * Generates an interpolated path between two points (fallback when OSRM API is unreachable)
 */
const generateInterpolatedRoute = (startLat, startLng, endLat, endLng, pointsCount = 12) => {
  const points = [];
  for (let i = 0; i <= pointsCount; i++) {
    const t = i / pointsCount;
    // Slight jitter to make fallback route look natural
    const wobble = Math.sin(t * Math.PI) * 0.002;
    const lat = startLat + (endLat - startLat) * t + wobble;
    const lng = startLng + (endLng - startLng) * t;
    points.push([lat, lng]);
  }
  return points;
};

export const routingService = {
  /**
   * Fetches driving route between start and destination coordinates
   * @param {number} startLat 
   * @param {number} startLng 
   * @param {number} endLat 
   * @param {number} endLng 
   * @returns {Promise<object>} { coordinates: [[lat, lng], ...], distanceKm, distanceFormatted, durationMinutes, durationFormatted, isFallback }
   */
  getRoute: async (startLat, startLng, endLat, endLng) => {
    if (
      startLat === undefined || startLng === undefined ||
      endLat === undefined || endLng === undefined
    ) {
      return null;
    }

    const cacheKey = `${startLat.toFixed(4)},${startLng.toFixed(4)}_${endLat.toFixed(4)},${endLng.toFixed(4)}`;
    if (routeCache.has(cacheKey)) {
      return routeCache.get(cacheKey);
    }

    try {
      // OSRM expects: {longitude},{latitude};{longitude},{latitude}
      const url = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`OSRM HTTP error: ${response.status}`);
      }

      const data = await response.json();

      if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        // Convert GeoJSON [lng, lat] to Leaflet [lat, lng]
        const coordinates = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
        const distanceKm = Math.round((route.distance / 1000) * 10) / 10;
        const durationMinutes = Math.max(1, Math.round(route.duration / 60));

        const result = {
          coordinates,
          distanceKm,
          distanceFormatted: formatDistance(distanceKm),
          durationMinutes,
          durationFormatted: `${durationMinutes} mins`,
          isFallback: false
        };

        routeCache.set(cacheKey, result);
        return result;
      } else {
        throw new Error('OSRM returned no valid route');
      }
    } catch (err) {
      console.warn('OSRM routing request failed, using intelligent interpolated fallback:', err.message);

      const fallbackDistance = calculateDistanceKm(startLat, startLng, endLat, endLng);
      const fallbackETA = calculateETA(fallbackDistance);
      const coordinates = generateInterpolatedRoute(startLat, startLng, endLat, endLng);

      const fallbackResult = {
        coordinates,
        distanceKm: fallbackDistance,
        distanceFormatted: formatDistance(fallbackDistance),
        durationMinutes: parseInt(fallbackETA) || 8,
        durationFormatted: fallbackETA,
        isFallback: true
      };

      return fallbackResult;
    }
  }
};

export default routingService;
