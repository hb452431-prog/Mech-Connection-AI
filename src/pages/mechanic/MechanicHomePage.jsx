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
import { SirenLight } from '../../components/common/SirenLight';
import { 
  MapPin, 
  Clock, 
  AlertCircle, 
  Check, 
  Eye, 
  ArrowRight, 
  User, 
  Wrench, 
  Radio, 
  Phone, 
  Navigation,
  Car,
  AlertTriangle,
  ShieldAlert,
  FileText,
  X
} from 'lucide-react';

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

  // Helper for urgency styling
  const getUrgencyBadge = (urgency) => {
    if (!urgency) return null;
    if (urgency.includes('Highway') || urgency.includes('Danger') || urgency.includes('⚡')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-800 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-red-600" />
          ⚡ High Danger Priority
        </span>
      );
    }
    if (urgency.includes('Roadside') || urgency.includes('🟡')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          🟡 Roadside Breakdown
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        🟢 Safe Parking Area
      </span>
    );
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
        name: `${r.userName} (${r.vehicleBrand || 'Vehicle'} - ${r.problemType || r.problem})`,
        mechanicName: r.problemType || 'Emergency Breakdown',
        distance: computedDistance,
        lat: userLat,
        lng: userLng,
        rating: 5.0,
        services: [r.vehicleType || 'Vehicle', r.problem, r.location],
        available: true
      };
    });
  }, [requests, mechanicLocation]);

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col pb-24 md:pb-12 transition-colors duration-200">
      <MechanicNavbar />

      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
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
              {mechanic.garageName || 'Apex Auto Care & Diagnostics'} • Live GPS driver breakdown radar active.
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
              {requests.length} Driver SOS Signals Active
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
            height="290px"
          />
        </div>

        {/* Nearby Assistance Requests Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold shadow-sm">
                <SirenLight size="xs" variant="ambulance" animated={true} />
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white font-heading">
                Incoming Driver SOS Emergency Requests
              </h2>
            </div>
            <span className="text-xs font-black font-mono px-3.5 py-1.5 bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 rounded-full border border-orange-200 dark:border-orange-800">
              {requests.length} Drivers Stranded
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
                <div 
                  key={req.id} 
                  className="clean-card dark:bg-slate-900 dark:border-slate-800 p-6 space-y-4 flex flex-col justify-between border-2 border-slate-200 dark:border-slate-800 hover:border-orange-400 dark:hover:border-orange-500 hover:shadow-xl transition-all rounded-3xl relative overflow-hidden"
                >
                  {/* Top Accent Strip */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500" />

                  <div className="space-y-3.5 pt-1">
                    {/* Header: Driver Name, Urgency Badge & Distance */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-black text-slate-900 dark:text-white flex items-center gap-1.5 font-heading">
                            <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            {req.userName}
                          </span>
                          <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                            #{req.id}
                          </span>
                        </div>
                        <div className="mt-1">
                          {getUrgencyBadge(req.urgency)}
                        </div>
                      </div>

                      <span className="text-xs font-black font-mono text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/60 px-3 py-1 rounded-xl border border-orange-200 dark:border-orange-800 whitespace-nowrap shadow-xs">
                        {req.distance} away
                      </span>
                    </div>

                    {/* Rich Vehicle Identification Card (Input by Driver) */}
                    <div className="p-3.5 bg-gradient-to-r from-slate-50 to-slate-100/60 dark:from-slate-800/80 dark:to-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 font-mono uppercase flex items-center gap-1">
                          <Car className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                          Vehicle Category
                        </span>
                        <span className="font-mono text-xs font-black uppercase px-2 py-0.5 rounded-md bg-slate-900 text-amber-400 dark:bg-black border border-slate-700">
                          {req.vehiclePlate || 'CA-8XYZ92'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-slate-900 dark:text-white">
                          {req.vehicleType || '🚗 Car / 4-Wheeler'}
                        </span>
                        <span className="font-bold text-slate-600 dark:text-slate-300">
                          {req.vehicleBrand || 'Honda'} {req.vehicleModel || 'Civic'}
                        </span>
                      </div>
                    </div>

                    {/* Breakdown Issue & Notes Card */}
                    <div className="p-4 bg-orange-50/50 dark:bg-slate-800/60 rounded-2xl space-y-2 text-xs border border-orange-100 dark:border-slate-700">
                      <div>
                        <span className="text-orange-800 dark:text-orange-300 font-mono text-[11px] uppercase block font-black">
                          Reported Breakdown:
                        </span>
                        <p className="font-black text-slate-900 dark:text-white text-sm sm:text-base font-heading mt-0.5">
                          {req.problemType || req.problem}
                        </p>
                      </div>

                      {req.notes && (
                        <div className="p-2.5 bg-white dark:bg-slate-900/80 rounded-xl border border-orange-200/60 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-medium italic">
                          "{req.notes}"
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1 text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1.5 font-bold truncate max-w-[200px]" title={req.location}>
                          <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0" />
                          <span className="truncate">{req.location}</span>
                        </span>
                        <span className="flex items-center gap-1 text-xs font-mono font-bold whitespace-nowrap">
                          <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                          {req.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setViewRequestModal(req)}
                      className="btn-secondary py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 rounded-2xl"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAccept(req)}
                      className="btn-primary py-3 text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 shadow-md rounded-2xl"
                    >
                      <Check className="w-4 h-4" />
                      Accept SOS Job
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View Details Modal with Comprehensive Driver Breakdown Telemetry */}
        {viewRequestModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="clean-card dark:bg-slate-900 dark:border-slate-800 p-6 sm:p-7 max-w-md w-full space-y-4 shadow-2xl rounded-3xl border-2 border-orange-300 dark:border-orange-800">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-600 flex items-center justify-center">
                    <Car className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white font-heading">
                    Driver Breakdown Sheet ({viewRequestModal.id})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setViewRequestModal(null)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Header */}
              <div className="flex items-center justify-between">
                <div>{getUrgencyBadge(viewRequestModal.urgency)}</div>
                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                  {viewRequestModal.distance} from workshop
                </span>
              </div>

              {/* Full Specs List */}
              <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                  <strong className="text-slate-900 dark:text-white">Customer / Driver:</strong>
                  <span>{viewRequestModal.userName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                  <strong className="text-slate-900 dark:text-white">Contact Phone:</strong>
                  <a href={`tel:${viewRequestModal.userPhone || '+1 555-0199'}`} className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    {viewRequestModal.userPhone || '+1 555-0199'}
                  </a>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                  <strong className="text-slate-900 dark:text-white">Vehicle Type:</strong>
                  <span className="font-bold">{viewRequestModal.vehicleType || '🚗 Car / 4-Wheeler'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                  <strong className="text-slate-900 dark:text-white">Make & Model:</strong>
                  <span>{viewRequestModal.vehicleBrand || 'Honda'} {viewRequestModal.vehicleModel || 'Civic'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                  <strong className="text-slate-900 dark:text-white">License Plate:</strong>
                  <span className="font-mono font-black uppercase px-2 py-0.5 rounded bg-slate-900 text-amber-400 text-[11px]">{viewRequestModal.vehiclePlate || 'CA-8XYZ92'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                  <strong className="text-slate-900 dark:text-white">Primary Issue:</strong>
                  <span className="font-bold text-orange-600 dark:text-orange-400">{viewRequestModal.problemType || viewRequestModal.problem}</span>
                </div>
                {viewRequestModal.notes && (
                  <div className="py-1 border-b border-slate-200 dark:border-slate-700">
                    <strong className="text-slate-900 dark:text-white block mb-0.5">Driver Remarks:</strong>
                    <p className="italic text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
                      "{viewRequestModal.notes}"
                    </p>
                  </div>
                )}
                <div className="py-1">
                  <strong className="text-slate-900 dark:text-white block mb-0.5">Stranded GPS Location:</strong>
                  <p className="flex items-center gap-1 font-bold text-slate-800 dark:text-slate-200">
                    <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0" />
                    {viewRequestModal.location}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <a
                  href={`tel:${viewRequestModal.userPhone || '+15550199'}`}
                  className="btn-secondary py-3 text-xs font-bold flex items-center justify-center gap-1.5 rounded-xl"
                >
                  <Phone className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  Call Driver
                </a>
                <button
                  type="button"
                  onClick={() => {
                    handleAccept(viewRequestModal);
                    setViewRequestModal(null);
                  }}
                  className="btn-primary py-3 text-xs font-black shadow-md flex items-center justify-center gap-1.5 rounded-xl"
                >
                  <Check className="w-4 h-4" />
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

