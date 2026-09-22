/**
 * Geocoding Service using OpenStreetMap Nominatim
 * Features in-memory caching and safe error handling
 */

const cache = new Map();

export const geocodingService = {
  /**
   * Searches for a city, address, or landmark using Nominatim
   * @param {string} query 
   * @returns {Promise<Array>} list of matching locations
   */
  searchLocation: async (query) => {
    if (!query || query.trim().length < 2) return [];

    const cleanQuery = query.trim().toLowerCase();
    if (cache.has(cleanQuery)) {
      return cache.get(cleanQuery);
    }

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        cleanQuery
      )}&limit=5&addressdetails=1`;

      const res = await fetch(url, {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error(`Nominatim error: ${res.status}`);
      }

      const data = await res.json();
      const results = (data || []).map((item) => ({
        id: item.place_id,
        displayName: item.display_name,
        shortName: item.name || item.display_name.split(',')[0],
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
        type: item.type
      }));

      cache.set(cleanQuery, results);
      return results;
    } catch (err) {
      console.warn('Geocoding search failed, providing fallback:', err.message);
      return [];
    }
  }
};

export default geocodingService;
