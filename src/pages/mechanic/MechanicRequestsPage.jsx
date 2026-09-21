import React, { useState, useEffect } from 'react';
import MechanicNavbar from '../../components/common/MechanicNavbar';
import { emergencyService } from '../../services/emergencyService';
import { authService } from '../../services/authService';
import { MapPin, Check, X, Navigation, CheckCircle2, User, Phone, Wrench, Clock } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const userPin = L.divIcon({
  className: 'custom-user-marker',
  html: `<div style="background-color:#EA580C; width:28px; height:28px; border-radius:50%; border:2px solid #FFFFFF; box-shadow:0 0 12px rgba(234,88,12,0.7); display:flex; align-items:center; justify-content:center; color:#FFFFFF; font-size:12px;">📍</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14]
});

export const MechanicRequestsPage = () => {
  const mechanic = authService.getMechanic();
  const [requests, setRequests] = useState([]);
  const [navigatingReq, setNavigatingReq] = useState(null);

  useEffect(() => {
    setRequests(emergencyService.getActiveRequests());
  }, []);

  const handleAccept = (reqId) => {
    const updated = emergencyService.acceptRequest(reqId, mechanic);
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
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] flex flex-col pb-24 md:pb-12">
      <MechanicNavbar />

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            Active Requests
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Active roadside breakdown and emergency assistance requests received from drivers.
          </p>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {requests.length === 0 ? (
            <div className="clean-card p-12 text-center text-slate-500 space-y-2 border-slate-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <p className="text-sm font-bold text-slate-800">No pending requests right now.</p>
              <p className="text-xs text-slate-400">You're all caught up with your assistance queue.</p>
            </div>
          ) : (
            requests.map((req) => {
              const isAccepted = req.status === 'ACCEPTED';

              return (
                <div key={req.id} className="clean-card p-5 sm:p-6 space-y-4 border-slate-200 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900 text-base flex items-center gap-1.5 font-heading">
                        <User className="w-4 h-4 text-indigo-600" />
                        {req.userName}
                      </span>
                      {isAccepted && (
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Request Accepted
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg self-start sm:self-auto border border-indigo-100">
                      Distance: {req.distance}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                    <div className="p-3 bg-slate-50 rounded-xl space-y-1 border border-slate-100">
                      <p className="text-slate-400 font-bold uppercase font-mono text-[10px]">Problem</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900">{req.problem}</p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl space-y-1 border border-slate-100">
                      <p className="text-slate-400 font-bold uppercase font-mono text-[10px]">User Location</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                        {req.location}
                      </p>
                    </div>
                  </div>

                  {/* Action Controls */}
                  <div className="pt-2">
                    {isAccepted ? (
                      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-50/80 p-4 rounded-xl border border-emerald-200">
                        <div className="text-xs text-emerald-900 text-center sm:text-left">
                          <p className="font-bold">You accepted this roadside assistance job.</p>
                          <p className="text-slate-600 mt-0.5">Driver is waiting at: <strong>{req.location}</strong></p>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={() => setNavigatingReq(req)}
                            className="btn-primary py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-1.5 flex-1 sm:flex-none shadow-xs"
                          >
                            <Navigation className="w-3.5 h-3.5" />
                            Navigate to User
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
                          className="btn-secondary px-4 py-2.5 text-xs font-bold flex items-center gap-1 text-orange-700 hover:bg-orange-50 border-orange-200"
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

        {/* Navigation Modal */}
        {navigatingReq && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="clean-card p-6 max-w-lg w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-900 font-heading flex items-center gap-1.5">
                    <Navigation className="w-4 h-4 text-indigo-600" />
                    Navigating to {navigatingReq.userName}
                  </h3>
                  <p className="text-xs text-slate-500">{navigatingReq.location} ({navigatingReq.distance})</p>
                </div>
                <button
                  onClick={() => setNavigatingReq(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Simple Leaflet Map */}
              <div className="h-64 rounded-xl overflow-hidden border border-slate-200">
                <MapContainer
                  center={[navigatingReq.lat || 37.7749, navigatingReq.lng || -122.4194]}
                  zoom={14}
                  scrollWheelZoom={false}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[navigatingReq.lat || 37.7749, navigatingReq.lng || -122.4194]} icon={userPin}>
                    <Popup>
                      <div className="text-xs font-bold">{navigatingReq.userName}'s Location</div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>

              <div className="flex items-center justify-between pt-2">
                <a
                  href={`tel:${navigatingReq.userPhone || '+15550199'}`}
                  className="btn-secondary py-2.5 px-4 text-xs font-bold flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-indigo-600" />
                  Call Driver
                </a>

                <button
                  type="button"
                  onClick={() => handleComplete(navigatingReq.id)}
                  className="btn-primary py-2.5 px-5 text-xs font-bold shadow-xs"
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
