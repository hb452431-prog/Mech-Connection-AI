import React, { useState, useEffect } from 'react';
import MechanicNavbar from '../../components/common/MechanicNavbar';
import MechMap from '../../components/map/MechMap';
import { emergencyService } from '../../services/emergencyService';
import { authService } from '../../services/authService';
import { routingService } from '../../services/routingService';
import { useLocation } from '../../hooks/useLocation';
import LocationStatusBar from '../../components/common/LocationStatusBar';
import LocationPermissionModal from '../../components/common/LocationPermissionModal';
import { calculateDistanceKm, formatDistance, calculateETA } from '../../utils/distance';
import { SirenLight } from '../../components/common/SirenLight';
import { 
  MapPin, 
  Check, 
  X, 
  Navigation, 
  CheckCircle2, 
  User, 
  Phone, 
  Wrench, 
  Clock, 
  AlertTriangle,
  Car,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export const MechanicRequestsPage = () => {
  const mechanic = authService.getMechanic() || {};
  const [requests, setRequests] = useState([]);
  const [navigatingReq, setNavigatingReq] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
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

  const mechanicBaseLocation = mechanicLocation || {
    lat: 37.7850,
    lng: -122.4100
  };

  useEffect(() => {
    setRequests(emergencyService.getActiveRequests());
  }, []);

  const handleAccept = (reqId) => {
    emergencyService.acceptRequest(reqId, {
      ...mechanic,
      lat: mechanicBaseLocation.lat,
      lng: mechanicBaseLocation.lng
    });
    setRequests(emergencyService.getActiveRequests());
  };

  const handleReject = (reqId) => {
    emergencyService.rejectRequest(reqId);
    setRequests(emergencyService.getActiveRequests());
  };

  const handleComplete = (reqId) => {
    emergencyService.completeRequest(reqId);
    setRequests(emergencyService.getActiveRequests());
    setNavigatingReq(null);
    setRouteCoordinates(null);
  };

  const handleStartNavigation = async (req) => {
    setNavigatingReq(req);
    const userLat = req.lat || 37.7749;
    const userLng = req.lng || -122.4194;

    const routeData = await routingService.getRoute(
      mechanicBaseLocation.lat,
      mechanicBaseLocation.lng,
      userLat,
      userLng
    );

    if (routeData) {
      setRouteCoordinates(routeData.coordinates);
      setRouteInfo({
        distance: routeData.distanceFormatted,
        eta: routeData.durationFormatted
      });
    } else {
      const dist = calculateDistanceKm(mechanicBaseLocation.lat, mechanicBaseLocation.lng, userLat, userLng);
      setRouteCoordinates([
        [mechanicBaseLocation.lat, mechanicBaseLocation.lng],
        [userLat, userLng]
      ]);
      setRouteInfo({
        distance: formatDistance(dist),
        eta: calculateETA(dist)
      });
    }
  };

  // Helper for urgency styling
  const getUrgencyBadge = (urgency) => {
    if (!urgency) return null;
    if (urgency.includes('Highway') || urgency.includes('Danger') || urgency.includes('⚡')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-800">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          ⚡ High Danger Priority
        </span>
      );
    }
    if (urgency.includes('Roadside') || urgency.includes('🟡')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          🟡 Roadside
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        🟢 Safe Area
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col pb-24 md:pb-12 transition-colors duration-200">
      <MechanicNavbar />

      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
              Active Assistance Requests
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Live roadside breakdown alerts with real-time driver vehicle specifications and telemetry.
            </p>
          </div>

          <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 self-start sm:self-auto">
            {requests.length} Requests in Queue
          </span>
        </div>

        {/* Live Location Telemetry Status Bar for Mechanic Unit */}
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

        {/* Requests List */}
        <div className="space-y-4">
          {requests.length === 0 ? (
            <div className="clean-card dark:bg-slate-900 dark:border-slate-800 p-12 text-center text-slate-500 dark:text-slate-400 space-y-2 border-2 border-slate-200 shadow-sm rounded-3xl">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">No pending requests right now.</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">You're all caught up with your assistance queue.</p>
            </div>
          ) : (
            requests.map((req) => {
              const isAccepted = req.status === 'ACCEPTED';

              return (
                <div 
                  key={req.id} 
                  className={`clean-card dark:bg-slate-900 dark:border-slate-800 p-5 sm:p-6 space-y-4 border-2 rounded-3xl shadow-sm transition-all ${
                    isAccepted 
                      ? 'border-emerald-400 dark:border-emerald-800 bg-emerald-50/20' 
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-black text-slate-900 dark:text-white text-base flex items-center gap-1.5 font-heading">
                        <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        {req.userName}
                      </span>
                      <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                        #{req.id}
                      </span>
                      {getUrgencyBadge(req.urgency)}
                      {isAccepted && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Accepted Job
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-xl self-start sm:self-auto border border-indigo-100 dark:border-indigo-800">
                      Distance: {req.distance}
                    </span>
                  </div>

                  {/* Vehicle & Telemetry Intake Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Vehicle info */}
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl space-y-1 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 dark:text-slate-500 font-bold uppercase font-mono text-[10px] flex items-center gap-1">
                          <Car className="w-3 h-3 text-orange-600" />
                          Vehicle Specs
                        </span>
                        <span className="font-mono text-[11px] font-black uppercase px-1.5 py-0.5 rounded bg-slate-900 text-amber-400">
                          {req.vehiclePlate || 'CA-8XYZ92'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                        {req.vehicleType || '🚗 Car / 4-Wheeler'}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {req.vehicleBrand || 'Honda'} {req.vehicleModel || 'Civic'}
                      </p>
                    </div>

                    {/* Problem */}
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl space-y-1 border border-slate-200 dark:border-slate-700">
                      <span className="text-slate-400 dark:text-slate-500 font-bold uppercase font-mono text-[10px]">
                        Reported Issue
                      </span>
                      <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                        {req.problemType || req.problem}
                      </p>
                      {req.notes && (
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 italic truncate" title={req.notes}>
                          "{req.notes}"
                        </p>
                      )}
                    </div>

                    {/* Location */}
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl space-y-1 border border-slate-200 dark:border-slate-700">
                      <span className="text-slate-400 dark:text-slate-500 font-bold uppercase font-mono text-[10px]">
                        Stranded Location
                      </span>
                      <p className="text-xs font-bold text-slate-900 dark:text-white flex items-start gap-1">
                        <MapPin className="w-3.5 h-3.5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{req.location}</span>
                      </p>
                      <div className="pt-0.5">
                        <a 
                          href={`tel:${req.userPhone || '+15550199'}`}
                          className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          {req.userPhone || '+1 555-0199'}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Action Controls */}
                  <div className="pt-2">
                    {isAccepted ? (
                      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-50/80 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                        <div className="text-xs text-emerald-900 dark:text-emerald-300 text-center sm:text-left">
                          <p className="font-bold">You accepted this roadside assistance job.</p>
                          <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                            Vehicle: <strong>{req.vehicleBrand} ({req.vehiclePlate})</strong> • Driver waiting at {req.location}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={() => handleStartNavigation(req)}
                            className="btn-primary py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-1.5 flex-1 sm:flex-none shadow-xs rounded-xl"
                          >
                            <Navigation className="w-3.5 h-3.5" />
                            Start Navigation
                          </button>

                          <button
                            type="button"
                            onClick={() => handleComplete(req.id)}
                            className="py-2.5 px-4 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex-1 sm:flex-none transition-colors shadow-xs"
                          >
                            Mark Completed
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 w-full sm:w-auto ml-auto justify-end">
                        <button
                          type="button"
                          onClick={() => handleReject(req.id)}
                          className="btn-secondary px-4 py-2.5 text-xs font-bold flex items-center gap-1 text-orange-700 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/30 border-orange-200 dark:border-orange-800 rounded-xl"
                        >
                          <X className="w-3.5 h-3.5" />
                          Reject
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAccept(req.id)}
                          className="btn-primary px-5 py-2.5 text-xs font-black flex items-center gap-1.5 shadow-xs rounded-xl"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Accept Request
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Live Navigation Modal with Interactive MechMap */}
        {navigatingReq && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="clean-card dark:bg-slate-900 dark:border-slate-800 p-6 max-w-2xl w-full space-y-4 shadow-2xl rounded-3xl border-2 border-indigo-300 dark:border-indigo-800">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white font-heading flex items-center gap-1.5">
                    <Navigation className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    Navigating to {navigatingReq.userName} ({navigatingReq.vehicleBrand} • {navigatingReq.vehiclePlate})
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Location: {navigatingReq.location} • Issue: <strong className="text-slate-800 dark:text-slate-200">{navigatingReq.problem}</strong>
                  </p>
                </div>
                <button
                  onClick={() => setNavigatingReq(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Interactive Master Map */}
              <MechMap
                userLocation={{
                  lat: navigatingReq.lat || 37.7749,
                  lng: navigatingReq.lng || -122.4194
                }}
                mechanicLocation={mechanicLocation}
                mechanicInfo={mechanic}
                routeCoordinates={routeCoordinates}
                showRoute={true}
                activeRouteInfo={routeInfo}
                height="320px"
                className="rounded-2xl overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700"
              />

              <div className="flex items-center justify-between pt-2">
                <a
                  href={`tel:${navigatingReq.userPhone || '+15550199'}`}
                  className="btn-secondary py-2.5 px-4 text-xs font-bold flex items-center gap-1.5 rounded-xl"
                >
                  <Phone className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  Call Driver ({navigatingReq.userName.split(' ')[0]})
                </a>

                <button
                  type="button"
                  onClick={() => handleComplete(navigatingReq.id)}
                  className="py-2.5 px-5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                >
                  Mark as Completed
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

export default MechanicRequestsPage;

