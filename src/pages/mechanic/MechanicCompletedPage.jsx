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
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col pb-24 md:pb-12 transition-colors duration-200">
      <MechanicNavbar />

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
            Completed Assistance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Log of completed roadside repairs and customer vehicle rescues.
          </p>
        </div>

        <div className="space-y-3">
          {completedList.length === 0 ? (
            <div className="clean-card dark:bg-slate-900 dark:border-slate-800 p-12 text-center text-slate-500 dark:text-slate-400 border-slate-200 shadow-sm">
              <CheckCircle2 className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">No completed requests yet.</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">Accepted jobs that you mark completed will appear here.</p>
            </div>
          ) : (
            completedList.map((item) => (
              <div
                key={item.id}
                className="clean-card dark:bg-slate-900 dark:border-slate-800 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-slate-200 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-1.5 font-heading">
                      <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      {item.userName}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase font-mono bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Completed
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Problem: {item.problem}
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    {item.garage}
                  </p>
                </div>

                <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-800 flex sm:flex-col justify-between items-center sm:items-end">
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    {item.date}
                  </span>
                  <span className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400 sm:mt-1 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-900/50">
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
