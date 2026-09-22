import React, { useState, useEffect } from 'react';
import MechanicNavbar from '../../components/common/MechanicNavbar';
import MechMap from '../../components/map/MechMap';
import { emergencyService } from '../../services/emergencyService';
import { authService } from '../../services/authService';
import { routingService } from '../../services/routingService';
import { calculateDistanceKm, formatDistance, calculateETA } from '../../utils/distance';
import { MapPin, Check, X, Navigation, CheckCircle2, User, Phone, Wrench, Clock, AlertTriangle } from 'lucide-react';
import { SirenLight } from '../../components/common/SirenLight';

export const MechanicRequestsPage = () => {
  const mechanic = authService.getMechanic() || {};
  const [requests, setRequests] = useState([]);
  const [navigatingReq, setNavigatingReq] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);

  // Mechanic base location (~San Francisco default or garage location)
  const mechanicBaseLocation = {
    lat: 37.7850,
    lng: -122.4100
  };

  useEffect(() => {
    setRequests(emergencyService.getActiveRequests());
  }, []);

  const handleAccept = (reqId) => {
    emergencyService.acceptRequest(reqId, mechanic);
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

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col pb-24 md:pb-12 transition-colors duration-200">
      <MechanicNavbar />

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
              Active Assistance Requests
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Live roadside breakdown alerts received from nearby vehicle drivers.
            </p>
          </div>

          <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800 self-start sm:self-auto">
            {requests.length} Requests in Queue
          </span>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {requests.length === 0 ? (
            <div className="clean-card dark:bg-slate-900 dark:border-slate-800 p-12 text-center text-slate-500 dark:text-slate-400 space-y-2 border-slate-200 shadow-sm">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">No pending requests right now.</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">You're all caught up with your assistance queue.</p>
            </div>
          ) : (
            requests.map((req) => {
              const isAccepted = req.status === 'ACCEPTED';

              return (
                <div key={req.id} className="clean-card dark:bg-slate-900 dark:border-slate-800 p-5 sm:p-6 space-y-4 border-slate-200 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900 dark:text-white text-base flex items-center gap-1.5 font-heading">
                        <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        {req.userName}
                      </span>
                      {isAccepted && (
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Request Accepted
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-lg self-start sm:self-auto border border-indigo-100 dark:border-indigo-800">
                      Distance: {req.distance}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1 border border-slate-100 dark:border-slate-800">
                      <p className="text-slate-400 dark:text-slate-500 font-bold uppercase font-mono text-[10px]">Problem</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{req.problem}</p>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1 border border-slate-100 dark:border-slate-800">
                      <p className="text-slate-400 dark:text-slate-500 font-bold uppercase font-mono text-[10px]">User Location</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                        {req.location}
                      </p>
                    </div>
                  </div>

                  {/* Action Controls */}
                  <div className="pt-2">
                    {isAccepted ? (
                      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-50/80 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
                        <div className="text-xs text-emerald-900 dark:text-emerald-300 text-center sm:text-left">
                          <p className="font-bold">You accepted this roadside assistance job.</p>
                          <p className="text-slate-600 dark:text-slate-400 mt-0.5">Driver is waiting at: <strong>{req.location}</strong></p>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={() => handleStartNavigation(req)}
                            className="btn-primary py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-1.5 flex-1 sm:flex-none shadow-xs"
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
                          className="btn-secondary px-4 py-2.5 text-xs font-bold flex items-center gap-1 text-orange-700 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/30 border-orange-200 dark:border-orange-800"
                        >
                          <X className="w-3.5 h-3.5" />
                          Reject
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAccept(req.id)}
                          className="btn-primary px-5 py-2.5 text-xs font-bold flex items-center gap-1.5 shadow-xs"
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
            <div className="clean-card dark:bg-slate-900 dark:border-slate-800 p-6 max-w-2xl w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white font-heading flex items-center gap-1.5">
                    <Navigation className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    Navigating to {navigatingReq.userName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Location: {navigatingReq.location} • Problem: <strong className="text-slate-800 dark:text-slate-200">{navigatingReq.problem}</strong>
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
                mechanicLocation={mechanicBaseLocation}
                mechanicInfo={mechanic}
                routeCoordinates={routeCoordinates}
                showRoute={true}
                activeRouteInfo={routeInfo}
                height="320px"
              />

              <div className="flex items-center justify-between pt-2">
                <a
                  href={`tel:${navigatingReq.userPhone || '+15550199'}`}
                  className="btn-secondary py-2.5 px-4 text-xs font-bold flex items-center gap-1.5"
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
      </main>
    </div>
  );
};

export default MechanicRequestsPage;
