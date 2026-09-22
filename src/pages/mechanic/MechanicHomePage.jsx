import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MechanicNavbar from '../../components/common/MechanicNavbar';
import MechMap from '../../components/map/MechMap';
import { authService } from '../../services/authService';
import { emergencyService } from '../../services/emergencyService';
import { MapPin, Clock, AlertCircle, Check, Eye, ArrowRight, User, Wrench, Radio, Phone, Navigation } from 'lucide-react';

export const MechanicHomePage = () => {
  const navigate = useNavigate();
  const mechanic = authService.getMechanic() || {};
  const [requests, setRequests] = useState([]);
  const [viewRequestModal, setViewRequestModal] = useState(null);
  const [isOnline, setIsOnline] = useState(true);

  const mechanicBaseLocation = {
    lat: 37.7850,
    lng: -122.4100
  };

  useEffect(() => {
    const list = emergencyService.getActiveRequests();
    setRequests(list);
  }, []);

  const handleAccept = (req) => {
    emergencyService.acceptRequest(req.id, mechanic);
    navigate('/mechanic/requests');
  };

  // Convert requests to pseudo garage/incident markers for map display
  const requestPins = requests.map((r) => ({
    id: r.id,
    name: `${r.userName} - ${r.problem}`,
    mechanicName: r.problemType || 'Emergency Breakdown',
    distance: r.distance,
    lat: r.lat || 37.7749,
    lng: r.lng || -122.4194,
    rating: 5.0,
    services: [r.problem, r.location],
    available: true
  }));

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-slate-950 flex flex-col pb-24 md:pb-12 transition-colors">
      <MechanicNavbar />

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Top Greeting & Status Toggle */}
        <div className="clean-card dark:bg-slate-900 dark:border-slate-800 p-6 sm:p-7 border-l-4 border-l-indigo-600 dark:border-l-indigo-500 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-slate-200 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white font-heading">
                Welcome, {mechanic.mechanicName || 'Mechanic'}
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono flex items-center gap-1.5 ${
                isOnline 
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-600 animate-pulse' : 'bg-slate-400'}`} />
                {isOnline ? 'Online & Ready' : 'Offline'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              {mechanic.garageName || 'Apex Auto Care & Diagnostics'} • Live GPS dispatch network active.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOnline(!isOnline)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all self-start sm:self-auto shadow-2xs ${
              isOnline
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>{isOnline ? 'Switch to Offline' : 'Go Online'}</span>
          </button>
        </div>

        {/* Live Dispatch Radar Map */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Live Area Radar Map</span>
            </h2>
            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
              Showing your garage & {requests.length} driver incident signals
            </span>
          </div>

          <MechMap
            mechanicLocation={mechanicBaseLocation}
            mechanicInfo={mechanic}
            garages={requestPins}
            onSelectGarage={(g) => {
              const target = requests.find((r) => r.id === g.id);
              if (target) setViewRequestModal(target);
            }}
            height="260px"
          />
        </div>

        {/* Nearby Assistance Requests Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-400 flex items-center justify-center">
                <AlertCircle className="w-4 h-4" />
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-heading">
                Nearby Assistance Requests
              </h2>
            </div>
            <span className="text-xs font-bold font-mono px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 rounded-full border border-indigo-100 dark:border-indigo-800">
              {requests.length} Available
            </span>
          </div>

          {requests.length === 0 ? (
            <div className="clean-card dark:bg-slate-900 dark:border-slate-800 p-12 text-center text-slate-500 dark:text-slate-400 space-y-2 border-slate-200 shadow-sm">
              <Wrench className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">No active requests nearby right now.</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">New driver breakdown requests will appear here automatically.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requests.map((req) => (
                <div key={req.id} className="clean-card dark:bg-slate-900 dark:border-slate-800 p-5 space-y-4 flex flex-col justify-between border-slate-200 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg transition-all">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5 font-heading">
                        <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        {req.userName}
                      </span>
                      <span className="text-xs font-black font-mono text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-lg border border-indigo-100 dark:border-indigo-800">
                        {req.distance} away
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1.5 text-xs border border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-slate-400 dark:text-slate-500 font-mono text-[10px] uppercase block font-bold">Problem:</span>
                        <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">{req.problem}</p>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                          {req.location}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-mono">
                          <Clock className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                          {req.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setViewRequestModal(req)}
                      className="btn-secondary py-2.5 text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View Details
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAccept(req)}
                      className="btn-primary py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Check className="w-3.5 h-3.5" />
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
      </main>
    </div>
  );
};

export default MechanicHomePage;
