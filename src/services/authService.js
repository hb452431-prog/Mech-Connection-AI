// Auth Service (Firebase-ready interface)

const STORAGE_KEY = 'mech_connect_user_session';

const DEFAULT_DRIVER_USER = {
  uid: 'usr_driver_772',
  email: 'alex.turner@example.com',
  displayName: 'Alex Turner',
  role: 'driver', // 'driver' | 'mechanic'
  phone: '+1 (415) 883-9912',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  membership: 'MechConnect+ Gold',
  joinedDate: 'Jan 2024',
  emergencyContact: {
    name: 'Emma Turner',
    relation: 'Spouse',
    phone: '+1 (415) 883-9913'
  }
};

const DEFAULT_MECHANIC_USER = {
  uid: 'usr_mech_881',
  email: 'dave.miller@rapidrescue.com',
  displayName: 'Dave Miller',
  role: 'mechanic',
  businessName: 'RapidRescue 24/7 Mobile Mechanics',
  phone: '+1 (415) 555-0199',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  rating: 4.88,
  certifications: ['ASE Master L1', 'AAA Certified Mobile Specialist'],
  isOnlineForSos: true,
  currentLocation: { lat: 37.7833, lng: -122.4167, address: 'Downtown Metro Sector 4' },
  todayEarnings: 420.00,
  completedJobsToday: 4
};

export const authService = {
  getCurrentUser: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading user session:', e);
    }
    return DEFAULT_DRIVER_USER;
  },

  setCurrentUser: (user) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Error saving user session:', e);
    }
    return user;
  },

  loginWithGoogle: async (role = 'driver') => {
    // Simulates Google OAuth popup and token resolution
    await new Promise((resolve) => setTimeout(resolve, 600));
    const user = role === 'mechanic' ? { ...DEFAULT_MECHANIC_USER } : { ...DEFAULT_DRIVER_USER };
    authService.setCurrentUser(user);
    return user;
  },

  loginWithEmail: async (email, password, role = 'driver') => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = role === 'mechanic' ? { ...DEFAULT_MECHANIC_USER, email } : { ...DEFAULT_DRIVER_USER, email };
    authService.setCurrentUser(user);
    return user;
  },

  register: async ({ email, name, role = 'driver', phone }) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const newUser = {
      uid: 'usr_' + Math.random().toString(36).substring(2, 9),
      email,
      displayName: name,
      role,
      phone: phone || '+1 (555) 000-0000',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`,
      membership: 'Free Driver Tier',
      joinedDate: 'Today'
    };
    authService.setCurrentUser(newUser);
    return newUser;
  },

  switchRole: (newRole) => {
    const user = newRole === 'mechanic' ? { ...DEFAULT_MECHANIC_USER } : { ...DEFAULT_DRIVER_USER };
    authService.setCurrentUser(user);
    return user;
  },

  logout: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};
