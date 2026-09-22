/**
 * Distance Calculation Utilities using Haversine Formula
 */

/**
 * Calculates distance between two GPS coordinates in kilometers
 * @param {number} lat1 
 * @param {number} lon1 
 * @param {number} lat2 
 * @param {number} lon2 
 * @returns {number} distance in kilometers (rounded to 1 decimal)
 */
export const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
  if (
    lat1 === undefined || lon1 === undefined ||
    lat2 === undefined || lon2 === undefined ||
    isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)
  ) {
    return 0;
  }

  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return Math.round(d * 10) / 10;
};

/**
 * Formats distance with unit (e.g. "2.4 km" or "450 m")
 * @param {number} km 
 * @returns {string}
 */
export const formatDistance = (km) => {
  if (km === undefined || isNaN(km)) return 'Nearby';
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  }
  return `${km.toFixed(1)} km`;
};

/**
 * Calculates estimated arrival time (ETA) based on distance and average urban emergency vehicle speed
 * @param {number} distanceKm 
 * @param {number} speedKmh 
 * @returns {string} e.g. "6 mins"
 */
export const calculateETA = (distanceKm, speedKmh = 32) => {
  if (!distanceKm || distanceKm <= 0) return '1 min';
  const hours = distanceKm / speedKmh;
  const minutes = Math.max(1, Math.round(hours * 60));
  if (minutes > 60) {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}h ${mins}m`;
  }
  return `${minutes} mins`;
};
