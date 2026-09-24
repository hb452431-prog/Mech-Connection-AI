import React, { useState, useEffect } from 'react';
import MechanicNavbar from '../../components/common/MechanicNavbar';
import { MechanicCompletedSkeleton } from '../../components/common/Skeleton';
import { emergencyService } from '../../services/emergencyService';
import { CheckCircle2, User, Calendar, Wrench, DollarSign } from 'lucide-react';

export const MechanicCompletedPage = () => {
  const [loading, setLoading] = useState(true);
  const [completedList, setCompletedList] = useState([]);

  useEffect(() => {
    setCompletedList(emergencyService.getCompletedRequests());
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col pb-28 sm:pb-32 md:pb-16 transition-colors duration-200">
      <MechanicNavbar />

      {loading ? (
        <MechanicCompletedSkeleton />
      ) : (
        <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 md:py-14 space-y-8 sm:space-y-10 animate-in fade-in duration-300">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
            Completed Assistance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Log of completed roadside repairs and customer vehicle rescues.
          </p>
        </div>

        <div className="space-y-5 pt-6 border-t border-slate-200 dark:border-slate-800">
          {completedList.length === 0 ? (
            <div className="clean-card dark:bg-slate-900 dark:border-slate-800 p-14 text-center text-slate-500 dark:text-slate-400 space-y-3 border-2 border-slate-200 shadow-sm rounded-3xl">
              <CheckCircle2 className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-base font-bold text-slate-800 dark:text-slate-200">No completed requests yet.</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">Accepted jobs that you mark completed will appear here.</p>
            </div>
          ) : (
            completedList.map((item) => (
              <div
                key={item.id}
                className="clean-card dark:bg-slate-900 dark:border-slate-800 p-7 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-2 border-slate-200 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all rounded-3xl"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <span className="font-black text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2 font-heading">
                      <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      {item.userName}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase font-mono bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                    Problem: <span className="font-medium text-slate-600 dark:text-slate-300">{item.problem}</span>
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    {item.garage}
                  </p>
                </div>

                <div className="text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800 flex sm:flex-col justify-between items-center sm:items-end gap-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                    <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    {item.date}
                  </span>
                  <span className="text-base font-black font-mono text-emerald-600 dark:text-emerald-400 sm:mt-1 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                    {item.fee || '$49.00'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      )}
    </div>
  );
};

export default MechanicCompletedPage;
