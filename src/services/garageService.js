// Garage Directory Service

export const MOCK_GARAGES = [
  {
    id: 'gar_1',
    name: 'ABC Auto Care & Garage',
    mechanicName: 'David Miller',
    distance: '1.2 km',
    rating: 4.8,
    reviewsCount: 142,
    address: '142 Market Street, Downtown',
    phone: '+1 555-4321',
    services: 'Car Repair • Battery • Tyre • Oil Change',
    isOpen: true,
    lat: 37.7760,
    lng: -122.4170
  },
  {
    id: 'gar_2',
    name: 'QuickFix Motors & Diagnostics',
    mechanicName: 'Robert Johnson',
    distance: '2.4 km',
    rating: 4.6,
    reviewsCount: 98,
    address: '884 4th Avenue, Westside',
    phone: '+1 555-8822',
    services: 'Engine Repair • Brake Service • Electrical',
    isOpen: true,
    lat: 37.7820,
    lng: -122.4120
  },
  {
    id: 'gar_3',
    name: 'Metro 24/7 Roadside & Tyres',
    mechanicName: 'Carlos Ortiz',
    distance: '3.1 km',
    rating: 4.9,
    reviewsCount: 210,
    address: '520 Mission Blvd, Sector 3',
    phone: '+1 555-9011',
    services: '24/7 Emergency • Flat Tyre • Jumpstart • Towing',
    isOpen: true,
    lat: 37.7680,
    lng: -122.4240
  },
  {
    id: 'gar_4',
    name: 'Premier Auto Works',
    mechanicName: 'Alex Vance',
    distance: '4.5 km',
    rating: 4.7,
    reviewsCount: 76,
    address: '1020 Central Highway',
    phone: '+1 555-3456',
    services: 'Transmission • AC Service • Suspension',
    isOpen: true,
    lat: 37.7590,
    lng: -122.4080
  }
];

export const garageService = {
  getNearbyGarages: () => {
    return MOCK_GARAGES;
  },

  getGarageById: (id) => {
    return MOCK_GARAGES.find((g) => g.id === id) || MOCK_GARAGES[0];
  }
};
