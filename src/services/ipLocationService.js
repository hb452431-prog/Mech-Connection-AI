/**
 * IP Geolocation Service
 * Provides robust fallback when browser/OS GPS is turned off or blocked.
 * Queries fast, reliable, CORS-friendly public IP geolocation endpoints.
 */

const IP_CACHE_KEY = 'mech_connect_ip_location';
let memoryCache = null;

export const ipLocationService = {
  /**
   * Fetch current location based on IP address with multi-source fallback
   * @returns {Promise<{ lat: number, lng: number, city: string, region: string, country: string, address: string, accuracy: number } | null>}
   */
  getIPLocation: async () => {
    // 1. Check memory cache
    if (memoryCache) {
      return memoryCache;
    }

    // 2. Check session storage cache
    try {
      if (typeof sessionStorage !== 'undefined') {
        const cached = sessionStorage.getItem(IP_CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.lat && parsed.lng) {
            memoryCache = parsed;
            return parsed;
          }
        }
      }
    } catch (e) {
      // Ignore storage errors
    }

    // 3. Multi-tier IP Providers list
    const providers = [
      // Provider 1: ipwho.is (fast, HTTPS, CORS enabled, no API key needed)
      async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);
        const res = await fetch('https://ipwho.is/', {
          signal: controller.signal,
          headers: { 'Accept': 'application/json' }
        });
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.success && typeof data.latitude === 'number' && typeof data.longitude === 'number') {
          return {
            lat: data.latitude,
            lng: data.longitude,
            city: data.city || 'Local City',
            region: data.region || '',
            country: data.country || '',
            address: `${data.city || 'Detected Region'}, ${data.region || ''} ${data.country || ''}`.trim().replace(/^,\s*|,\s*$/g, ''),
            accuracy: 3000,
            source: 'ip'
          };
        }
        throw new Error('ipwho invalid payload');
      },

      // Provider 2: get.geojs.io (reliable, CORS enabled)
      async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);
        const res = await fetch('https://get.geojs.io/v1/ip/geo.json', {
          signal: controller.signal,
          headers: { 'Accept': 'application/json' }
        });
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const lat = parseFloat(data.latitude);
        const lng = parseFloat(data.longitude);
        if (!isNaN(lat) && !isNaN(lng)) {
          return {
            lat,
            lng,
            city: data.city || 'Local City',
            region: data.region || '',
            country: data.country || '',
            address: `${data.city || 'Detected Region'}, ${data.region || ''} ${data.country || ''}`.trim().replace(/^,\s*|,\s*$/g, ''),
            accuracy: 4000,
            source: 'ip'
          };
        }
        throw new Error('geojs invalid payload');
      },

      // Provider 3: freeipapi.com
      async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);
        const res = await fetch('https://freeipapi.com/api/json', {
          signal: controller.signal,
          headers: { 'Accept': 'application/json' }
        });
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const lat = parseFloat(data.latitude);
        const lng = parseFloat(data.longitude);
        if (!isNaN(lat) && !isNaN(lng)) {
          return {
            lat,
            lng,
            city: data.cityName || 'Local City',
            region: data.regionName || '',
            country: data.countryName || '',
            address: `${data.cityName || 'Detected Region'}, ${data.regionName || ''} ${data.countryName || ''}`.trim().replace(/^,\s*|,\s*$/g, ''),
            accuracy: 4000,
            source: 'ip'
          };
        }
        throw new Error('freeipapi invalid payload');
      }
    ];

    for (const provider of providers) {
      try {
        const result = await provider();
        if (result && typeof result.lat === 'number' && typeof result.lng === 'number') {
          memoryCache = result;
          try {
            if (typeof sessionStorage !== 'undefined') {
              sessionStorage.setItem(IP_CACHE_KEY, JSON.stringify(result));
            }
          } catch (e) {
            // Ignore storage errors
          }
          return result;
        }
      } catch (err) {
        // Continue to next provider
      }
    }

    return null;
  },

  /**
   * Clears the cached IP location
   */
  clearCache: () => {
    memoryCache = null;
    try {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem(IP_CACHE_KEY);
      }
    } catch (e) {}
  }
};

export default ipLocationService;
