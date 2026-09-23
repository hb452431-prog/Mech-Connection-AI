import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MechanicNavbar from '../../components/common/MechanicNavbar';
import MechMap from '../../components/map/MechMap';
import { authService } from '../../services/authService';
import { emergencyService } from '../../services/emergencyService';
import { useLocation } from '../../hooks/useLocation';
import LocationStatusBar from '../../components/common/LocationStatusBar';
import LocationPermissionModal from '../../components/common/LocationPermissionModal';
import { calculateDistanceKm, formatDistance } from '../../utils/distance';
import { MapPin, Clock, AlertCircle, Check, Eye, ArrowRight, User, Wrench, Radio, Phone, Navigation } from 'lucide-react';

export const MechanicHomePage = () => {
  const navigate = useNavigate();
  const mechanic = authService.getMechanic() || {};
  const [requests, setRequests] = useState([]);
  const [viewRequestModal, setViewRequestModal] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const {
    location: mechanicLocation,
    accuracy,
    loading: isLocating,
    error: locationError,
    permission,
    supported,
    tracking,
    isManual,
    deviceInfo,
    requestLocation,
    fetchIPLocation,
    turnOnLocation,
    setManualLocation,
    useFallbackLocation
  } = useLocation({ autoRequest: true, enableHighAccuracy: true, watch: true, allowIPFallback: true });

  useEffect(() => {
    const list = emergencyService.getActiveRequests();
    setRequests(list);
  }, []);

  const handleAccept = (req) => {
    const mechLat = mechanicLocation?.lat || 37.7749;
    const mechLng = mechanicLocation?.lng || -122.4194;
    emergencyService.acceptRequest(req.id, {
      ...mechanic,
      lat: mechLat,
      lng: mechLng
    });
    navigate('/mechanic/requests');
  };

  // Convert requests to pseudo garage/incident markers for map display with real calculated distances
  const requestPins = useMemo(() => {
    const mechLat = mechanicLocation?.lat || 37.7749;
    const mechLng = mechanicLocation?.lng || -122.4194;
    return requests.map((r) => {
      const userLat = r.lat || 37.7749;
      const userLng = r.lng || -122.4194;
      const distKm = calculateDistanceKm(mechLat, mechLng, userLat, userLng);
      const computedDistance = formatDistance(distKm);

      return {
        id: r.id,
        name: `${r.userName} - ${r.problem}`,
        mechanicName: r.problemType || 'Emergency Breakdown',
        distance: computedDistance,
        lat: userLat,
        lng: userLng,
        rating: 5.0,
        services: [r.problem, r.location],
        available: true
      };
    });
  }, [requests, mechanicLocation]);

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col pb-24 md:pb-12 transition-colors duration-200">
      <MechanicNavbar />

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Top Greeting & Status Toggle */}
        <div className="clean-card dark:bg-slate-900 dark:border-slate-800 p-6 sm:p-8 border-l-4 border-l-indigo-600 dark:border-l-indigo-500 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-2 border-slate-200 shadow-md rounded-3xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
                Welcome, {mechanic.mechanicName || 'Mechanic'}
              </h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono flex items-center gap-1.5 ${
                isOnline 
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-600 animate-pulse' : 'bg-slate-400'}`} />
                {isOnline ? 'ONLINE & READY' : 'OFFLINE'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              {mechanic.garageName || 'Apex Auto Care & Diagnostics'} • Live GPS dispatch active.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOnline(!isOnline)}
            className={`px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2 transition-all self-start sm:self-auto shadow-md ${
              isOnline
                ? 'bg-emerald-500 text-slate-950 border border-emerald-400 hover:bg-emerald-400'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>{isOnline ? 'Go Offline' : 'Go Online'}</span>
          </button>
        </div>

        {/* Garage / Mobile Mechanic Unit Telemetry Status Bar */}
        <LocationStatusBar
          location={mechanicLocation}
          accuracy={accuracy}
          loading={isLocating}
          error={locationError}
          permission={permission}
          tracking={tracking}
          isManual={isManual}
          onRefreshLocation={() => turnOnLocation()}
          onRequestPermission={() => setShowPermissionModal(true)}
          onOpenHubModal={() => setShowPermissionModal(true)}
        />

        {/* Live Dispatch Radar Map */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs sm:text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <Navigation className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Live Area Radar Map</span>
            </h2>
            <span className="text-xs font-mono text-slate-400 dark:text-slate-500 font-bold">
              {requests.length} Driver Breakdown Signals
            </span>
          </div>

          <MechMap
            mechanicLocation={mechanicLocation}
            mechanicInfo={mechanic}
            garages={requestPins}
            onSelectGarage={(g) => {
              const target = requests.find((r) => r.id === g.id);
              if (target) setViewRequestModal(target);
            }}
            height="280px"
          />
        </div>

        {/* Nearby Assistance Requests Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white font-heading">
                Nearby Assistance Requests
              </h2>
            </div>
            <span className="text-xs font-black font-mono px-3.5 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 rounded-full border border-indigo-200 dark:border-indigo-800">
              {requests.length} Available
            </span>
          </div>

          {requests.length === 0 ? (
            <div className="clean-card dark:bg-slate-900 dark:border-slate-800 p-12 text-center text-slate-500 dark:text-slate-400 space-y-2 border-2 border-slate-200 shadow-sm rounded-3xl">
              <Wrench className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
              <p className="text-base font-black text-slate-800 dark:text-slate-200 font-heading">No active requests nearby right now.</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">New driver breakdown alerts will stream in real-time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {requests.map((req) => (
                <div key={req.id} className="clean-card dark:bg-slate-900 dark:border-slate-800 p-6 space-y-4 flex flex-col justify-between border-2 border-slate-200 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-xl transition-all rounded-3xl">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2 font-heading">
                        <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        {req.userName}
                      </span>
                      <span className="text-xs font-black font-mono text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-xl border border-indigo-200 dark:border-indigo-800">
                        {req.distance} away
                      </span>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl space-y-2 text-xs border border-slate-200 dark:border-slate-700">
                      <div>
                        <span className="text-slate-400 dark:text-slate-500 font-mono text-xs uppercase block font-bold">Issue Reported:</span>
                        <p className="font-black text-slate-900 dark:text-white text-sm sm:text-base font-heading mt-0.5">{req.problem}</p>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1.5 font-bold">
                          <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0" />
                          {req.location}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-mono font-bold">
                          <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                          {req.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setViewRequestModal(req)}
                      className="btn-secondary py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAccept(req)}
                      className="btn-primary py-3 text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Check className="w-4 h-4" />
                      Accept Job
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View Details Modal */}
        {viewRequestModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="clean-card dark:bg-slate-900 dark:border-slate-800 p-6 sm:p-7 max-w-sm w-full space-y-4 shadow-2xl">
              <h3 className="text-base font-black text-slate-900 dark:text-white font-heading">
                Assistance Request Details
              </h3>

              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <p><strong className="text-slate-900 dark:text-white">Customer Name:</strong> {viewRequestModal.userName}</p>
                <p><strong className="text-slate-900 dark:text-white">Phone:</strong> {viewRequestModal.userPhone || '+1 555-0199'}</p>
                <p><strong className="text-slate-900 dark:text-white">Problem:</strong> {viewRequestModal.problem}</p>
                <p><strong className="text-slate-900 dark:text-white">Location:</strong> {viewRequestModal.location}</p>
                <p><strong className="text-slate-900 dark:text-white">Distance from Garage:</strong> {viewRequestModal.distance}</p>
                <p><strong className="text-slate-900 dark:text-white">Reported Time:</strong> {viewRequestModal.time}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setViewRequestModal(null)}
                  className="btn-secondary py-2.5 text-xs font-bold"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleAccept(viewRequestModal);
                    setViewRequestModal(null);
                  }}
                  className="btn-primary py-2.5 text-xs font-bold shadow-xs"
                >
                  Accept Job
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Automotive Location Permission & Fallback Modal */}
        {showPermissionModal && (
          <LocationPermissionModal
            isOpen={showPermissionModal}
            onClose={() => setShowPermissionModal(false)}
            onEnable={async () => {
              try {
                await turnOnLocation();
                setShowPermissionModal(false);
              } catch (e) {
                // Stays open showing error recovery guidance
              }
            }}
            onUseIPLocation={async () => {
              await fetchIPLocation();
              setShowPermissionModal(false);
            }}
            permission={permission}
            error={locationError}
            deviceInfo={deviceInfo}
            loading={isLocating}
            onManualSelect={(lat, lng, name) => {
              setManualLocation(lat, lng, name);
              setShowPermissionModal(false);
            }}
          />
        )}
      </main>
    </div>
  );
};

export default MechanicHomePage;
