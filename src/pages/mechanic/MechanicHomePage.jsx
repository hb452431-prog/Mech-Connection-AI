import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MechanicNavbar from '../../components/common/MechanicNavbar';
import { authService } from '../../services/authService';
import { emergencyService } from '../../services/emergencyService';
import { MapPin, Clock, AlertCircle, Check, Eye, ArrowRight, User } from 'lucide-react';

export const MechanicHomePage = () => {
  const navigate = useNavigate();
  const mechanic = authService.getMechanic();
  const [requests, setRequests] = useState([]);
  const [viewRequestModal, setViewRequestModal] = useState(null);

  useEffect(() => {
    const list = emergencyService.getActiveRequests();
    setRequests(list);
  }, []);

  const handleAccept = (req) => {
    emergencyService.acceptRequest(req.id, mechanic);
    navigate('/mechanic/requests');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-20 md:pb-10">
      <MechanicNavbar />

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        {/* Top Greeting */}
        <div className="clean-card p-6 border-l-4 border-l-sky-600 space-y-1">
          <h1 className="text-2xl font-black text-slate-900 font-heading">
            Welcome, {mechanic.mechanicName || 'Mechanic'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            {mechanic.garageName || 'Apex Auto Care & Diagnostics'} • Ready to receive nearby driver requests.
          </p>
        </div>

        {/* Nearby Assistance Requests Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-sky-600" />
              Nearby Assistance Requests
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 bg-sky-50 text-sky-700 rounded-full">
              {requests.length} Active
            </span>
          </div>

          {requests.length === 0 ? (
            <div className="clean-card p-10 text-center text-slate-500 space-y-2">
              <p className="text-sm font-semibold">No active requests nearby right now.</p>
              <p className="text-xs">New breakdown requests will appear here automatically.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requests.map((req) => (
                <div key={req.id} className="clean-card p-5 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <User className="w-4 h-4 text-slate-400" />
                        {req.userName}
                      </span>
                      <span className="text-xs font-semibold font-mono text-sky-600 bg-sky-50 px-2 py-0.5 rounded">
                        {req.distance}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                      <p className="font-bold text-slate-800">Problem: {req.problem}</p>
                      <p className="text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {req.location}
                      </p>
                      <p className="text-slate-400 flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {req.time}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setViewRequestModal(req)}
                      className="btn-secondary py-2 text-xs flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAccept(req)}
                      className="btn-primary py-2 text-xs flex items-center justify-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Accept
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View Details Modal */}
        {viewRequestModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <div className="clean-card p-6 max-w-sm w-full space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Assistance Request Details
              </h3>

              <div className="space-y-2 text-xs text-slate-700">
                <p><strong>User:</strong> {viewRequestModal.userName}</p>
                <p><strong>Phone:</strong> {viewRequestModal.userPhone || '+1 555-0199'}</p>
                <p><strong>Problem:</strong> {viewRequestModal.problem}</p>
                <p><strong>Location:</strong> {viewRequestModal.location}</p>
                <p><strong>Distance:</strong> {viewRequestModal.distance}</p>
                <p><strong>Reported:</strong> {viewRequestModal.time}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setViewRequestModal(null)}
                  className="btn-secondary py-2 text-xs"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleAccept(viewRequestModal);
                    setViewRequestModal(null);
                  }}
                  className="btn-primary py-2 text-xs font-bold"
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
