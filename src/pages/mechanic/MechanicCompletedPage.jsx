import React, { useState, useEffect } from 'react';
import MechanicNavbar from '../../components/common/MechanicNavbar';
import { emergencyService } from '../../services/emergencyService';
import { CheckCircle2, User, Calendar, Wrench, DollarSign } from 'lucide-react';

export const MechanicCompletedPage = () => {
  const [completedList, setCompletedList] = useState([]);

  useEffect(() => {
    setCompletedList(emergencyService.getCompletedRequests());
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F8FC] flex flex-col pb-24 md:pb-12">
      <MechanicNavbar />

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            Completed Assistance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Log of completed roadside repairs and customer vehicle rescues.
          </p>
        </div>

        <div className="space-y-3">
          {completedList.length === 0 ? (
            <div className="clean-card p-12 text-center text-slate-500 border-slate-200">
              <CheckCircle2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-800">No completed requests yet.</p>
              <p className="text-xs text-slate-400">Accepted jobs that you mark completed will appear here.</p>
            </div>
          ) : (
            completedList.map((item) => (
              <div
                key={item.id}
                className="clean-card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-slate-200 shadow-xs hover:border-slate-300 transition-all"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-1.5 font-heading">
                      <User className="w-4 h-4 text-indigo-600" />
                      {item.userName}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Completed
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-slate-800">
                    Problem: {item.problem}
                  </p>

                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-slate-400" />
                    {item.garage}
                  </p>
                </div>

                <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 flex sm:flex-col justify-between items-center sm:items-end">
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {item.date}
                  </span>
                  <span className="text-sm font-black font-mono text-emerald-600 sm:mt-1 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                    {item.fee || '$49.00'}
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
