import React from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from '../../components/common/UserNavbar';
import { authService } from '../../services/authService';
import { Wrench, Sparkles, AlertCircle, ArrowRight, MapPin, Car, ShieldCheck, Zap } from 'lucide-react';

export const UserHomePage = () => {
  const user = authService.getUser();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-24 md:pb-12">
      <UserNavbar />

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-7">
        {/* Top Driver Status Card */}
        <div className="clean-card p-5 sm:p-6 bg-gradient-to-r from-white via-sky-50/40 to-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-slate-200">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0 font-bold">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 font-heading">
                  Hello, {user.name}
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Vehicle Active
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {user.vehicleBrand ? `${user.vehicleBrand} ${user.vehicleModel} (${user.vehicleNumber || 'Registered'})` : 'Registered Vehicle Profile'}
              </p>
            </div>
          </div>

          <Link
            to="/user/profile"
            className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1 self-start sm:self-auto bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs"
          >
            <span>Edit Vehicle</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Main Heading */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading tracking-tight">
            How can we help you today?
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Choose a service below for instant AI diagnosis, local workshops, or roadside dispatch.
          </p>
        </div>

        {/* TWO MAIN OPTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Option 1: FIND NEARBY GARAGE */}
          <div className="clean-card p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-sky-500 hover:shadow-md transition-all group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  <Wrench className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-bold font-mono text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md">
                  📍 4 Garages Near You
                </span>
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-900 font-heading group-hover:text-sky-600 transition-colors">
                  FIND NEARBY GARAGE
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-1">
                  Find mechanics near your current location with ratings, distance, and instant help requests.
                </p>
              </div>
            </div>

            <Link
              to="/user/garages"
              className="btn-primary w-full py-3.5 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Find Garage</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Option 2: AI VEHICLE HELP */}
          <div className="clean-card p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-sky-500 hover:shadow-md transition-all group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  <Sparkles className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-bold font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  ⚡ Instant Diagnosis
                </span>
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-900 font-heading group-hover:text-sky-600 transition-colors">
                  AI VEHICLE HELP
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-1">
                  Describe your vehicle problem or upload an image to receive instant step-by-step troubleshooting.
                </p>
              </div>
            </div>

            <Link
              to="/user/ai-help"
              className="btn-primary w-full py-3.5 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get AI Help</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* CLEARLY VISIBLE EMERGENCY HELP SECTION */}
        <div className="clean-card p-6 sm:p-7 border-2 border-red-200 bg-gradient-to-r from-red-50/80 via-white to-red-50/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 animate-pulse">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-red-700 font-mono">
                🚨 Immediate Breakdown Rescue
              </div>
              <h3 className="text-xl font-black text-slate-900 font-heading mt-0.5">
                EMERGENCY HELP
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Flat tyre, dead battery, or broken down on the road? Send an instant alert to nearby mechanics.
              </p>
            </div>
          </div>

          <Link
            to="/user/emergency"
            className="btn-emergency w-full sm:w-auto px-7 py-4 text-center text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
          >
            <AlertCircle className="w-4 h-4" />
            Request Emergency Mechanic
          </Link>
        </div>
      </main>
    </div>
  );
};

export default UserHomePage;
