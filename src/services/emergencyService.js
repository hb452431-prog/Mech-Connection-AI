// Simple Emergency Request & Tracking Service

const REQUESTS_STORAGE_KEY = 'mech_connect_emergency_requests';
const COMPLETED_STORAGE_KEY = 'mech_connect_completed_requests';

const INITIAL_ACTIVE_REQUESTS = [
  {
    id: 'REQ-101',
    userName: 'Sarah Jenkins',
    userPhone: '+1 555-9821',
    problem: 'Flat Tyre on roadside',
    problemType: 'Flat Tyre',
    distance: '1.4 km',
    location: '450 10th St, Downtown',
    time: '5 mins ago',
    status: 'PENDING', // 'PENDING' | 'ACCEPTED' | 'COMPLETED' | 'REJECTED'
    lat: 37.7749,
    lng: -122.4194
  },
  {
    id: 'REQ-102',
    userName: 'Michael Chang',
    userPhone: '+1 555-3344',
    problem: 'Battery dead / won\'t crank',
    problemType: 'Battery Problem',
    distance: '2.1 km',
    location: '780 Mission Street',
    time: '12 mins ago',
    status: 'PENDING',
    lat: 37.7810,
    lng: -122.4110
  }
];

const INITIAL_COMPLETED_REQUESTS = [
  {
    id: 'REQ-098',
    userName: 'Elena Gomez',
    problem: 'Jumpstart & 12V Battery Check',
    date: 'Yesterday, 4:30 PM',
    garage: 'Apex Auto Care & Diagnostics',
    fee: '$49.00'
  },
  {
    id: 'REQ-095',
    userName: 'Robert Taylor',
    problem: 'Emergency Flat Tyre Replacement',
    date: '20 Sep 2026',
    garage: 'Apex Auto Care & Diagnostics',
    fee: '$55.00'
  }
];

export const emergencyService = {
  getActiveRequests: () => {
    try {
      const data = localStorage.getItem(REQUESTS_STORAGE_KEY);
      return data ? JSON.parse(data) : INITIAL_ACTIVE_REQUESTS;
    } catch (e) {
      return INITIAL_ACTIVE_REQUESTS;
    }
  },

  saveActiveRequests: (requests) => {
    localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(requests));
    return requests;
  },

  getCompletedRequests: () => {
    try {
      const data = localStorage.getItem(COMPLETED_STORAGE_KEY);
      return data ? JSON.parse(data) : INITIAL_COMPLETED_REQUESTS;
    } catch (e) {
      return INITIAL_COMPLETED_REQUESTS;
    }
  },

  saveCompletedRequests: (completed) => {
    localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(completed));
    return completed;
  },

  // User creates an emergency request
  createRequest: async ({ problemType, notes, userLocation, userName, userPhone }) => {
    await new Promise((r) => setTimeout(r, 600));
    const newReq = {
      id: 'REQ-' + Math.floor(100 + Math.random() * 900),
      userName: userName || 'John Doe',
      userPhone: userPhone || '+1 555-0199',
      problem: problemType + (notes ? ` (${notes})` : ''),
      problemType: problemType || 'Vehicle Breakdown',
      distance: '1.2 km',
      location: userLocation?.address || 'Market St & 7th St, Downtown',
      time: 'Just now',
      status: 'PENDING',
      lat: userLocation?.lat || 37.7749,
      lng: userLocation?.lng || -122.4194,
      mechanic: null
    };

    const current = emergencyService.getActiveRequests();
    emergencyService.saveActiveRequests([newReq, ...current]);
    return newReq;
  },

  // Mechanic accepts request
  acceptRequest: (requestId, mechanicInfo) => {
    const list = emergencyService.getActiveRequests();
    const updated = list.map((r) => {
      if (r.id === requestId) {
        return {
          ...r,
          status: 'ACCEPTED',
          mechanic: mechanicInfo || {
            garageName: 'Apex Auto Care & Diagnostics',
            mechanicName: 'David Miller',
            distance: '1.2 km',
            phone: '+1 555-4321',
            lat: 37.7850,
            lng: -122.4100
          }
        };
      }
      return r;
    });
    emergencyService.saveActiveRequests(updated);
    return updated.find((r) => r.id === requestId);
  },

  // Mechanic rejects request
  rejectRequest: (requestId) => {
    const list = emergencyService.getActiveRequests();
    const updated = list.filter((r) => r.id !== requestId);
    emergencyService.saveActiveRequests(updated);
    return updated;
  },

  // Complete request
  completeRequest: (requestId) => {
    const list = emergencyService.getActiveRequests();
    const target = list.find((r) => r.id === requestId);
    const updatedList = list.filter((r) => r.id !== requestId);
    emergencyService.saveActiveRequests(updatedList);

    if (target) {
      const completedList = emergencyService.getCompletedRequests();
      const newCompleted = {
        id: target.id,
        userName: target.userName,
        problem: target.problem,
        date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        garage: target.mechanic?.garageName || 'Apex Auto Care & Diagnostics',
        fee: '$49.00'
      };
      emergencyService.saveCompletedRequests([newCompleted, ...completedList]);
    }

    return updatedList;
  }
};
