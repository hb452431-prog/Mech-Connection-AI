import React, { useState, useEffect } from 'react';
import MechanicNavbar from '../../components/common/MechanicNavbar';
import { emergencyService } from '../../services/emergencyService';
import { CheckCircle2, User, Calendar, Wrench } from 'lucide-react';

export const MechanicCompletedPage = () => {
  const [completedList, setCompletedList] = useState([]);

  useEffect(() => {
    setCompletedList(emergencyService.getCompletedRequests());
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-20 md:pb-10">
      <MechanicNavbar />

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 font-heading">
            Completed Assistance Requests
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            History of completed vehicle rescues and services.
          </p>
        </div>

        <div className="space-y-3">
          {completedList.length === 0 ? (
            <div className="clean-card p-10 text-center text-slate-500">
              <p className="text-sm font-semibold">No completed requests yet.</p>
            </div>
          ) : (
            completedList.map((item) => (
              <div
                key={item.id}
                className="clean-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <User className="w-4 h-4 text-slate-400" />
                      {item.userName}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Completed
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-700">
                    Problem: {item.problem}
                  </p>

                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Wrench className="w-3.5 h-3.5 text-slate-400" />
                    {item.garage}
                  </p>
                </div>

                <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 flex sm:flex-col justify-between items-center sm:items-end">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {item.date}
                  </span>
                  <span className="text-xs font-bold font-mono text-emerald-600 sm:mt-1">
                    {item.fee || 'Completed'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default MechanicCompletedPage;
