// Emergency SOS Dispatch & Live GPS Tracking Service

const SOS_STORAGE_KEY = 'mech_connect_active_sos';

export const SOS_STATUSES = {
  IDLE: 'IDLE',
  SEARCHING: 'SEARCHING',
  ASSIGNED: 'ASSIGNED',
  EN_ROUTE: 'EN_ROUTE',
  ARRIVED: 'ARRIVED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

const DEFAULT_DISPATCH_DRIVER = {
  id: 'drv-402',
  name: 'Dave Miller',
  company: 'RapidRescue 24/7 Mobile Mechanics',
  role: 'Master Roadside Field Tech',
  phone: '+1 (415) 555-0199',
  vehicle: 'Ford Transit Mobile Workshop (Plate: 8RAPID1)',
  rating: 4.9,
  completedRescues: 840,
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  currentLocation: {
    lat: 37.7850,
    lng: -122.4100
  }
};

export const sosDispatchService = {
  getActiveRequest: () => {
    try {
      const stored = localStorage.getItem(SOS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading SOS request:', e);
    }
    return null;
  },

  saveActiveRequest: (request) => {
    try {
      if (!request) {
        localStorage.removeItem(SOS_STORAGE_KEY);
      } else {
        localStorage.setItem(SOS_STORAGE_KEY, JSON.stringify(request));
      }
    } catch (e) {
      console.error('Error saving SOS request:', e);
    }
  },

  createEmergencyRequest: async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newRequest = {
      id: 'SOS-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      serviceType: formData.serviceType || 'Roadside Assistance',
      serviceName: formData.serviceName || 'Emergency Assistance',
      vehicle: formData.vehicle || '2023 Tesla Model Y',
      notes: formData.notes || 'Car disabled on roadside',
      userLocation: formData.userLocation || {
        lat: 37.7749,
        lng: -122.4194,
        address: 'Market St & 7th St, San Francisco, CA'
      },
      status: SOS_STATUSES.SEARCHING,
      etaMins: 11,
      estimatedCost: formData.cost || 49,
      assignedDriver: null,
      driverPath: [
        { lat: 37.7880, lng: -122.4070 },
        { lat: 37.7845, lng: -122.4110 },
        { lat: 37.7810, lng: -122.4145 },
        { lat: 37.7775, lng: -122.4175 },
        { lat: 37.7749, lng: -122.4194 } // user destination
      ],
      currentStepIndex: 0,
      messages: [
        {
          id: 'msg-1',
          sender: 'system',
          text: 'Emergency SOS beacon broadcasted. Priority radar alert dispatched to 8 nearby mobile units.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    sosDispatchService.saveActiveRequest(newRequest);
    return newRequest;
  },

  simulateAssignDriver: (request) => {
    const updated = {
      ...request,
      status: SOS_STATUSES.ASSIGNED,
      assignedDriver: { ...DEFAULT_DISPATCH_DRIVER },
      messages: [
        ...request.messages,
        {
          id: 'msg-' + Date.now(),
          sender: 'system',
          text: `Mechanic Dave Miller (RapidRescue Unit #12) accepted your request! ETA is approximately 11 minutes.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          id: 'msg-' + (Date.now() + 1),
          sender: 'driver',
          text: `Hi! This is Dave. I've got your location and I'm rolling out with high-output booster cables and diagnostic gear. Turn your hazard lights on if you're on the shoulder!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
    sosDispatchService.saveActiveRequest(updated);
    return updated;
  },

  stepDriverLocation: (request) => {
    if (!request || request.status === SOS_STATUSES.CANCELLED || request.status === SOS_STATUSES.COMPLETED) {
      return request;
    }

    const nextStep = (request.currentStepIndex || 0) + 1;
    const path = request.driverPath || [];

    if (nextStep >= path.length) {
      const arrived = {
        ...request,
        status: SOS_STATUSES.ARRIVED,
        currentStepIndex: path.length - 1,
        etaMins: 0,
        messages: [
          ...request.messages,
          {
            id: 'msg-' + Date.now(),
            sender: 'driver',
            text: `I've arrived at your vehicle! Look for the white RapidRescue mobile workshop van with yellow safety strobes.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      };
      sosDispatchService.saveActiveRequest(arrived);
      return arrived;
    }

    const updated = {
      ...request,
      status: SOS_STATUSES.EN_ROUTE,
      currentStepIndex: nextStep,
      etaMins: Math.max(1, Math.round(11 * (1 - nextStep / path.length))),
      assignedDriver: {
        ...request.assignedDriver,
        currentLocation: path[nextStep]
      }
    };
    sosDispatchService.saveActiveRequest(updated);
    return updated;
  },

  sendUserMessage: (request, text) => {
    if (!request) return null;
    const updated = {
      ...request,
      messages: [
        ...request.messages,
        {
          id: 'msg-' + Date.now(),
          sender: 'user',
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
    sosDispatchService.saveActiveRequest(updated);
    return updated;
  },

  cancelEmergencyRequest: (request) => {
    const updated = {
      ...request,
      status: SOS_STATUSES.CANCELLED,
      messages: [
        ...request.messages,
        {
          id: 'msg-' + Date.now(),
          sender: 'system',
          text: 'Emergency request was cancelled.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
    sosDispatchService.saveActiveRequest(null);
    return updated;
  }
};
