import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MechanicNavbar from '../../components/common/MechanicNavbar';
import { authService } from '../../services/authService';
import { emergencyService } from '../../services/emergencyService';
import { MapPin, Clock, AlertCircle, Check, Eye, ArrowRight, User, Wrench, Radio, Phone } from 'lucide-react';

export const MechanicHomePage = () => {
  const navigate = useNavigate();
  const mechanic = authService.getMechanic();
  const [requests, setRequests] = useState([]);
  const [viewRequestModal, setViewRequestModal] = useState(null);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const list = emergencyService.getActiveRequests();
    setRequests(list);
  }, []);

  const handleAccept = (req) => {
    emergencyService.acceptRequest(req.id, mechanic);
    navigate('/mechanic/requests');
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] flex flex-col pb-24 md:pb-12">
      <MechanicNavbar />

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Top Greeting & Status Toggle */}
        <div className="clean-card p-6 sm:p-7 border-l-4 border-l-indigo-600 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-slate-200 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 font-heading">
                Welcome, {mechanic.mechanicName || 'Mechanic'}
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono flex items-center gap-1.5 ${
                isOnline ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-600 animate-pulse' : 'bg-slate-400'}`} />
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {mechanic.garageName || 'Apex Auto Care & Diagnostics'} • Ready for roadside dispatch.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOnline(!isOnline)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all self-start sm:self-auto shadow-2xs ${
              isOnline
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>{isOnline ? 'Switch to Offline' : 'Go Online'}</span>
          </button>
        </div>

        {/* Nearby Assistance Requests Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <AlertCircle className="w-4 h-4" />
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading">
                Nearby Assistance Requests
              </h2>
            </div>
            <span className="text-xs font-bold font-mono px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
              {requests.length} Available
            </span>
          </div>

          {requests.length === 0 ? (
            <div className="clean-card p-12 text-center text-slate-500 space-y-2 border-slate-200">
              <Wrench className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-800">No active requests nearby right now.</p>
              <p className="text-xs text-slate-400">New driver breakdown requests will appear here automatically.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requests.map((req) => (
                <div key={req.id} className="clean-card p-5 space-y-4 flex flex-col justify-between border-slate-200 hover:border-indigo-400 hover:shadow-lg transition-all">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-slate-900 flex items-center gap-1.5 font-heading">
                        <User className="w-4 h-4 text-indigo-600" />
                        {req.userName}
                      </span>
                      <span className="text-xs font-black font-mono text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-100">
                        {req.distance} away
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs border border-slate-100">
                      <div>
                        <span className="text-slate-400 font-mono text-[10px] uppercase block font-bold">Problem:</span>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">{req.problem}</p>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                          {req.location}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-mono">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {req.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="clean-card p-6 sm:p-7 max-w-sm w-full space-y-4 shadow-2xl">
              <h3 className="text-base font-black text-slate-900 font-heading">
                Assistance Request Details
              </h3>

              <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p><strong>Customer Name:</strong> {viewRequestModal.userName}</p>
                <p><strong>Phone:</strong> {viewRequestModal.userPhone || '+1 555-0199'}</p>
                <p><strong>Problem:</strong> {viewRequestModal.problem}</p>
                <p><strong>Location:</strong> {viewRequestModal.location}</p>
                <p><strong>Distance from Garage:</strong> {viewRequestModal.distance}</p>
                <p><strong>Reported Time:</strong> {viewRequestModal.time}</p>
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
