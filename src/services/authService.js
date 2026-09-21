// Simple Auth Service for MECH CONNECT AI

const USER_STORAGE_KEY = 'mech_connect_user_data';
const MECHANIC_STORAGE_KEY = 'mech_connect_mechanic_data';

// Default Demo User
const DEFAULT_USER = {
  id: 'usr_1',
  name: 'John Doe',
  phone: '+1 555-0199',
  email: 'john.doe@example.com',
  vehicleBrand: 'Honda',
  vehicleModel: 'Civic',
  vehicleNumber: 'CA-8XYZ92'
};

// Default Demo Mechanic
const DEFAULT_MECHANIC = {
  id: 'mech_1',
  garageName: 'Apex Auto Care & Diagnostics',
  mechanicName: 'David Miller',
  phone: '+1 555-4321',
  email: 'david@apexauto.com',
  garageAddress: '142 Market Street, Downtown',
  services: 'Engine Repair, Battery, Brakes, Oil Change, 24/7 Roadside'
};

export const authService = {
  // USER METHODS
  getUser: () => {
    try {
      const data = localStorage.getItem(USER_STORAGE_KEY);
      return data ? JSON.parse(data) : DEFAULT_USER;
    } catch (e) {
      return DEFAULT_USER;
    }
  },

  saveUser: (user) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  userLogin: async (email, password) => {
    await new Promise((r) => setTimeout(r, 400));
    const user = authService.getUser();
    user.email = email || user.email;
    authService.saveUser(user);
    return user;
  },

  userRegister: async (formData) => {
    await new Promise((r) => setTimeout(r, 400));
    const newUser = {
      id: 'usr_' + Date.now(),
      name: formData.name || 'New Driver',
      phone: formData.phone || '',
      email: formData.email || '',
      vehicleBrand: formData.vehicleBrand || '',
      vehicleModel: formData.vehicleModel || '',
      vehicleNumber: formData.vehicleNumber || ''
    };
    authService.saveUser(newUser);
    return newUser;
  },

  userLogout: () => {
    localStorage.removeItem(USER_STORAGE_KEY);
  },

  // MECHANIC METHODS
  getMechanic: () => {
    try {
      const data = localStorage.getItem(MECHANIC_STORAGE_KEY);
      return data ? JSON.parse(data) : DEFAULT_MECHANIC;
    } catch (e) {
      return DEFAULT_MECHANIC;
    }
  },

  saveMechanic: (mechanic) => {
    localStorage.setItem(MECHANIC_STORAGE_KEY, JSON.stringify(mechanic));
    return mechanic;
  },

  mechanicLogin: async (email, password) => {
    await new Promise((r) => setTimeout(r, 400));
    const mech = authService.getMechanic();
    mech.email = email || mech.email;
    authService.saveMechanic(mech);
    return mech;
  },

  mechanicRegister: async (formData) => {
    await new Promise((r) => setTimeout(r, 400));
    const newMech = {
      id: 'mech_' + Date.now(),
      garageName: formData.garageName || 'My Garage',
      mechanicName: formData.mechanicName || 'Mechanic',
      phone: formData.phone || '',
      email: formData.email || '',
      garageAddress: formData.garageAddress || '',
      services: formData.services || 'General Auto Repair'
    };
    authService.saveMechanic(newMech);
    return newMech;
  },

  mechanicLogout: () => {
    localStorage.removeItem(MECHANIC_STORAGE_KEY);
  },

  // Backwards compatibility methods
  getCurrentUser: () => {
    return authService.getUser();
  },
  logout: () => {
    authService.userLogout();
    authService.mechanicLogout();
  }
};
