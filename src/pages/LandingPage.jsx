import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../components/common/BrandLogo';
import { Wrench, Car, ArrowRight, ShieldCheck } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between items-center px-4 py-12">
      {/* Top Section / Header */}
      <div className="w-full max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <BrandLogo size="lg" clickable={false} />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading tracking-tight">
            Welcome to MECH CONNECT AI
          </h1>
          <p className="text-sm text-slate-600 font-medium">
            AI-powered vehicle assistance and emergency mechanic platform.
          </p>
        </div>
      </div>

      {/* Main Selection Area: Two Big Options */}
      <div className="w-full max-w-md my-8 space-y-4">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center font-mono">
          Select Your Portal to Continue
        </p>

        {/* Option 1: MECHANIC */}
        <Link
          to="/mechanic/auth"
          className="clean-card p-6 flex items-center justify-between group hover:border-sky-500 hover:shadow-md transition-all block text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
              <Wrench className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading group-hover:text-sky-600 transition-colors">
                MECHANIC
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Register garage, view nearby roadside requests & accept jobs.
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
        </Link>

        {/* Option 2: USER / DRIVER */}
        <Link
          to="/user/auth"
          className="clean-card p-6 flex items-center justify-between group hover:border-sky-500 hover:shadow-md transition-all block text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
              <Car className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading group-hover:text-sky-600 transition-colors">
                USER / DRIVER
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Find nearby garages, get AI vehicle diagnosis & emergency help.
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>

      {/* Footer info */}
      <div className="text-center text-xs text-slate-400 space-y-1">
        <p>© {new Date().getFullYear()} MECH CONNECT AI. All rights reserved.</p>
        <p className="text-[11px] text-slate-400">Simple & Professional Vehicle Assistance Platform</p>
      </div>
    </div>
  );
};

export default LandingPage;
