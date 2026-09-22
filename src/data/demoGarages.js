import { calculateDistanceKm, formatDistance } from '../utils/distance';

/**
 * Base Demo Garages Distributed Across Locations
 */
export const BASE_DEMO_GARAGES = [
  {
    id: 'garage-1',
    name: 'ABC Auto Care & Diagnostics',
    mechanicName: 'Rahul Sharma',
    phone: '+91 98765 43210',
    address: 'Plot 42, Metro Commercial Hub',
    services: ['Battery', 'Engine', 'Tyre', 'General Repair', '24/7 Roadside'],
    rating: 4.9,
    reviewsCount: 184,
    available: true,
    lat: 19.0760,
    lng: 72.8777,
    specialty: 'Diagnostic & Engine Overhaul'
  },
  {
    id: 'garage-2',
    name: 'FastFix Express Garage',
    mechanicName: 'David Miller',
    phone: '+1 555-432-1098',
    address: '142 Market Street, Downtown',
    services: ['Brake Service', 'Flat Tyre', 'Jumpstart', 'Oil Change'],
    rating: 4.8,
    reviewsCount: 142,
    available: true,
    lat: 37.7760,
    lng: -122.4170,
    specialty: 'Instant Roadside Jumpstart'
  },
  {
    id: 'garage-3',
    name: 'Apex 24/7 Roadside Rescue',
    mechanicName: 'Carlos Ortiz',
    phone: '+1 555-901-2233',
    address: '520 Mission Blvd, Sector 3',
    services: ['Flat Tyre', 'Dead Battery', 'Towing', '24/7 Roadside'],
    rating: 4.9,
    reviewsCount: 210,
    available: true,
    lat: 37.7820,
    lng: -122.4120,
    specialty: '24/7 Heavy Towing & Rescue'
  },
  {
    id: 'garage-4',
    name: 'AutoPro Performance & Tune',
    mechanicName: 'Vikram Patel',
    phone: '+91 98112 33445',
    address: '88 MG Road, Central Plaza',
    services: ['Engine', 'Electrical', 'AC Service', 'Suspension'],
    rating: 4.7,
    reviewsCount: 96,
    available: true,
    lat: 28.6139,
    lng: 77.2090,
    specialty: 'ECU Tuning & Electrical'
  },
  {
    id: 'garage-5',
    name: 'London City Motors & Mobile Tech',
    mechanicName: 'James Wilson',
    phone: '+44 20 7946 0912',
    address: '12 Oxford Way, West End',
    services: ['Battery', 'Brakes', 'Tyre Replacement', 'Diagnostics'],
    rating: 4.8,
    reviewsCount: 130,
    available: true,
    lat: 51.5074,
    lng: -0.1278,
    specialty: 'Mobile Rapid Diagnostics'
  },
  {
    id: 'garage-6',
    name: 'Precision Gear & Clutch Center',
    mechanicName: 'Alex Vance',
    phone: '+1 555-345-6789',
    address: '1020 Central Highway',
    services: ['Clutch', 'Transmission', 'Brake Systems', 'Engine'],
    rating: 4.6,
    reviewsCount: 78,
    available: true,
    lat: 37.7590,
    lng: -122.4080,
    specialty: 'Gearbox & Transmission'
  },
  {
    id: 'garage-7',
    name: 'Bangalore Tech Auto Hub',
    mechanicName: 'Anil Kumar',
    phone: '+91 99001 55667',
    address: '100ft Road, Indiranagar',
    services: ['EV Battery', 'Hybrid Repair', 'Tyre', 'Quick Lube'],
    rating: 4.9,
    reviewsCount: 245,
    available: true,
    lat: 12.9716,
    lng: 77.5946,
    specialty: 'EV & Hybrid Powertrain'
  },
  {
    id: 'garage-8',
    name: 'EuroMaster Diagnostics & Repair',
    mechanicName: 'Stefan Weber',
    phone: '+49 30 123456',
    address: 'Hauptstraße 45',
    services: ['Full Vehicle Scan', 'Engine', 'ABS', '24/7 Roadside'],
    rating: 4.7,
    reviewsCount: 112,
    available: true,
    lat: 52.5200,
    lng: 13.4050,
    specialty: 'Bosch Certified Electronics'
  },
  {
    id: 'garage-9',
    name: 'Speedy Tyres & Battery Hub',
    mechanicName: 'Robert Taylor',
    phone: '+1 555-882-9900',
    address: '770 Bay View Expressway',
    services: ['Flat Tyre', 'Wheel Alignment', 'Battery Replacement', 'Lockout'],
    rating: 4.8,
    reviewsCount: 165,
    available: true,
    lat: 37.7680,
    lng: -122.4240,
    specialty: '15-Min Puncture & Jumpstart'
  },
  {
    id: 'garage-10',
    name: 'Tokyo Mobile Rescue & Works',
    mechanicName: 'Kenji Sato',
    phone: '+81 3 5555 0123',
    address: 'Shibuya Crossing North',
    services: ['Emergency Rescue', 'Battery', 'Inspection', 'Tyre'],
    rating: 4.9,
    reviewsCount: 290,
    available: true,
    lat: 35.6762,
    lng: 139.6503,
    specialty: '24/7 Rapid Incident Response'
  }
];

/**
 * Dynamically generates realistic demo garages around a specific user GPS location
 * so the demo works seamlessly anywhere in the world!
 */
export const generateGaragesNearLocation = (userLat, userLng, count = 6) => {
  if (!userLat || !userLng) return BASE_DEMO_GARAGES;

  const demoTemplates = [
    {
      name: 'Apex Auto Care & Diagnostics',
      mechanic: 'David Miller',
      services: ['Battery', 'Engine', 'Tyre', 'General Repair', '24/7 Roadside'],
      rating: 4.9,
      reviews: 184,
      phone: '+1 555-0192',
      specialty: 'Emergency Jumpstart & Diagnostics'
    },
    {
      name: 'QuickFix Roadside & Tyre Hub',
      mechanic: 'Rahul Sharma',
      services: ['Flat Tyre', 'Wheel Puncture', 'Battery', 'Lockout'],
      rating: 4.8,
      reviews: 142,
      phone: '+1 555-0284',
      specialty: '15-Minute Rapid Tyre Repair'
    },
    {
      name: 'Metro 24/7 Mobile Mechanic',
      mechanic: 'Carlos Ortiz',
      services: ['Dead Battery', 'Engine Breakdown', 'Towing', '24/7 Roadside'],
      rating: 4.9,
      reviews: 215,
      phone: '+1 555-0371',
      specialty: '24/7 Roadside Tow & Recovery'
    },
    {
      name: 'Precision Performance Motors',
      mechanic: 'Vikram Patel',
      services: ['Engine Repair', 'Electrical', 'Brake Systems', 'Oil Change'],
      rating: 4.7,
      reviews: 98,
      phone: '+1 555-0465',
      specialty: 'Engine & Electrical Diagnostics'
    },
    {
      name: 'Express Auto Works',
      mechanic: 'James Wilson',
      services: ['Brake Service', 'Suspension', 'AC Service', 'Coolant Leak'],
      rating: 4.6,
      reviews: 76,
      phone: '+1 555-0559',
      specialty: 'Brakes & Fluid Maintenance'
    },
    {
      name: 'All-Hour Rescue Team',
      mechanic: 'Kenji Vance',
      services: ['Lockout', 'Fuel Delivery', 'Battery', 'Tyre', '24/7 Roadside'],
      rating: 4.8,
      reviews: 160,
      phone: '+1 555-0648',
      specialty: 'Emergency Fuel & Lockout Aid'
    }
  ];

  // Pre-determined radial offsets (1 to 6 km around the point)
  const offsets = [
    { dLat: 0.009, dLng: 0.008, street: 'North High St, Sector 1' },
    { dLat: -0.012, dLng: 0.014, street: 'Grand Trunk Road, Suite 4' },
    { dLat: 0.016, dLng: -0.011, street: 'Commercial Ave & 5th Crossing' },
    { dLat: -0.018, dLng: -0.015, street: 'Central Expressway, Exit 12' },
    { dLat: 0.024, dLng: 0.021, street: 'Outer Ring Bypass Road' },
    { dLat: -0.026, dLng: 0.006, street: 'Industrial Area Phase 2' }
  ];

  return demoTemplates.slice(0, count).map((template, idx) => {
    const offset = offsets[idx % offsets.length];
    const lat = userLat + offset.dLat;
    const lng = userLng + offset.dLng;
    const distanceVal = calculateDistanceKm(userLat, userLng, lat, lng);

    return {
      id: `local-garage-${idx + 1}`,
      name: template.name,
      mechanicName: template.mechanic,
      phone: template.phone,
      address: `${Math.floor(100 + idx * 45)} ${offset.street}`,
      services: template.services,
      servicesText: template.services.join(' • '),
      rating: template.rating,
      reviewsCount: template.reviews,
      available: true,
      lat,
      lng,
      distanceKm: distanceVal,
      distance: formatDistance(distanceVal),
      specialty: template.specialty
    };
  }).sort((a, b) => a.distanceKm - b.distanceKm);
};

/**
 * Get garages with computed distances from a user location
 */
export const getGaragesWithDistance = (userLocation, fallbackCenter = { lat: 37.7749, lng: -122.4194 }) => {
  const center = userLocation || fallbackCenter;
  return generateGaragesNearLocation(center.lat, center.lng);
};
