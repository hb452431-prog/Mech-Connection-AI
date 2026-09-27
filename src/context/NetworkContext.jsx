import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const NetworkContext = createContext(null);

export const NetworkProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean' 
      ? navigator.onLine 
      : true
  );

  const [connectionInfo, setConnectionInfo] = useState(() => {
    if (typeof navigator !== 'undefined') {
      const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (conn) {
        return {
          effectiveType: conn.effectiveType || '4g',
          downlink: typeof conn.downlink === 'number' ? conn.downlink : 10,
          rtt: typeof conn.rtt === 'number' ? conn.rtt : 50,
          saveData: !!conn.saveData
        };
      }
    }
    return {
      effectiveType: '4g',
      downlink: 10,
      rtt: 50,
      saveData: false
    };
  });

  // User simulation mode to easily demonstrate/test "less network" skeleton UI
  const [isSimulatedSlow, setIsSimulatedSlow] = useState(() => {
    try {
      return sessionStorage.getItem('mech_simulate_slow_network') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [isRechecking, setIsRechecking] = useState(false);

  // Update connection stats
  const updateConnectionInfo = useCallback(() => {
    if (typeof navigator !== 'undefined') {
      const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (conn) {
        setConnectionInfo({
          effectiveType: conn.effectiveType || '4g',
          downlink: typeof conn.downlink === 'number' ? conn.downlink : 10,
          rtt: typeof conn.rtt === 'number' ? conn.rtt : 50,
          saveData: !!conn.saveData
        });
      }
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      updateConnectionInfo();
    };

    const handleOffline = () => {
      setIsOnline(false);
      updateConnectionInfo();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const conn = typeof navigator !== 'undefined' 
      ? (navigator.connection || navigator.mozConnection || navigator.webkitConnection)
      : null;

    if (conn && conn.addEventListener) {
      conn.addEventListener('change', updateConnectionInfo);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (conn && conn.removeEventListener) {
        conn.removeEventListener('change', updateConnectionInfo);
      }
    };
  }, [updateConnectionInfo]);

  // Toggle slow network simulation
  const toggleSimulateSlowNetwork = useCallback(() => {
    setIsSimulatedSlow(prev => {
      const next = !prev;
      try {
        sessionStorage.setItem('mech_simulate_slow_network', String(next));
      } catch (e) {}
      return next;
    });
  }, []);

  const setSimulateSlowNetwork = useCallback((val) => {
    setIsSimulatedSlow(val);
    try {
      sessionStorage.setItem('mech_simulate_slow_network', String(val));
    } catch (e) {}
  }, []);

  // Re-check / reconnect action
  const recheckNetwork = useCallback(async () => {
    setIsRechecking(true);
    // Simulate brief network probe
    await new Promise(res => setTimeout(res, 800));
    updateConnectionInfo();
    setIsOnline(navigator.onLine);
    setIsRechecking(false);
  }, [updateConnectionInfo]);

  // Determine if connection is categorized as "Less Network"
  const isRealSlow = 
    !isOnline ||
    connectionInfo.effectiveType === 'slow-2g' ||
    connectionInfo.effectiveType === '2g' ||
    (connectionInfo.downlink > 0 && connectionInfo.downlink < 0.6) ||
    connectionInfo.rtt > 800;

  const isSlowNetwork = isSimulatedSlow || isRealSlow;

  let networkLabel = 'Fast (4G/Wi-Fi)';
  let networkColor = 'emerald';

  if (!isOnline) {
    networkLabel = 'Offline (No Connection)';
    networkColor = 'red';
  } else if (isSimulatedSlow) {
    networkLabel = 'Simulated Less Network (~2G)';
    networkColor = 'amber';
  } else if (connectionInfo.effectiveType === 'slow-2g') {
    networkLabel = 'Critical Network (Slow 2G)';
    networkColor = 'red';
  } else if (connectionInfo.effectiveType === '2g') {
    networkLabel = 'Weak Network (2G)';
    networkColor = 'amber';
  } else if (connectionInfo.rtt > 800 || (connectionInfo.downlink > 0 && connectionInfo.downlink < 0.6)) {
    networkLabel = 'High Latency / Low Bandwidth';
    networkColor = 'amber';
  }

  const value = {
    isOnline,
    effectiveType: connectionInfo.effectiveType,
    downlink: connectionInfo.downlink,
    rtt: connectionInfo.rtt,
    saveData: connectionInfo.saveData,
    isSlowNetwork,
    isRealSlow,
    isSimulatedSlow,
    isRechecking,
    networkLabel,
    networkColor,
    toggleSimulateSlowNetwork,
    setSimulateSlowNetwork,
    recheckNetwork
  };

  return (
    <NetworkContext.Provider value={value}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (!context) {
    // Fallback if not wrapped
    return {
      isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
      isSlowNetwork: false,
      isSimulatedSlow: false,
      networkLabel: 'Online',
      networkColor: 'emerald',
      toggleSimulateSlowNetwork: () => {},
      setSimulateSlowNetwork: () => {},
      recheckNetwork: () => {}
    };
  }
  return context;
};

export default NetworkContext;
