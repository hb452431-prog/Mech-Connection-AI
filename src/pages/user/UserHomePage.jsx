import React from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from '../../components/common/UserNavbar';
import { authService } from '../../services/authService';
import { Wrench, Sparkles, AlertCircle, ArrowRight, MapPin, Car, ShieldCheck, Zap, PhoneCall, Gauge, BatteryCharging } from 'lucide-react';
import { SirenLight, SirenBadge } from '../../components/common/SirenLight';

export const UserHomePage = () => {
  const user = authService.getUser() || {};

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col pb-24 md:pb-12 transition-colors duration-200">
      <UserNavbar />

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-7">
        {/* Top Driver Telemetry Status Card */}
        <div className="clean-card p-5 sm:p-6 bg-gradient-to-r from-white via-cyan-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-cyan-950/20 dark:to-indigo-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 flex items-center justify-center flex-shrink-0 font-bold border border-cyan-200 dark:border-cyan-800 shadow-2xs">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-heading">
                  Hello, {user.name || 'Driver'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold font-mono flex items-center gap-1.5 border border-emerald-200 dark:border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Vehicle Active
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                {user.vehicle?.year || user.vehicleBrand || 'Honda'} {user.vehicle?.model || user.vehicleModel || 'Civic'} • Plate: <span className="font-mono font-bold text-slate-700 dark:text-slate-300 uppercase">{user.vehicle?.plate || user.vehicleNumber || 'CA-8XYZ92'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              to="/user/profile"
              className="btn-secondary px-4 py-2 text-xs font-bold flex items-center gap-1.5"
            >
              <span>Manage Vehicle</span>
            </Link>
          </div>
        </div>

        {/* Main Heading */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Connected Telemetry
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
            How can we assist your journey today?
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Choose an option below for instant AI diagnosis, local workshops, or high-priority roadside dispatch.
          </p>
        </div>

        {/* 2 Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Find Nearby Garage */}
          <div className="clean-card p-6 flex flex-col justify-between group hover:border-cyan-400 dark:hover:border-cyan-500 hover:shadow-lg transition-all border-2 border-slate-200 dark:border-slate-800">
            <div className="space-y-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 dark:bg-cyan-950/70 text-cyan-600 dark:text-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform border border-cyan-100 dark:border-cyan-800/60 shadow-xs">
                <MapPin className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/80 px-2 py-0.5 rounded">
                  GPS Live Radar
                </span>
                <h2 className="text-xl font-black text-slate-900 dark:text-white font-heading group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mt-1">
                  FIND NEARBY GARAGE
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                  Locate verified repair workshops on the live interactive map with real-time distance, ratings, and open hours.
                </p>
              </div>
            </div>

            <Link
              to="/user/garages"
              className="btn-primary w-full py-3.5 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Explore Garages on Map</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: AI Vehicle Help */}
          <div className="clean-card p-6 flex flex-col justify-between group hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg transition-all border-2 border-slate-200 dark:border-slate-800">
            <div className="space-y-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform border border-indigo-100 dark:border-indigo-800/60 shadow-xs">
                <Sparkles className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded">
                  Instant Diagnostic Engine
                </span>
                <h2 className="text-xl font-black text-slate-900 dark:text-white font-heading group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mt-1">
                  AI VEHICLE HELP
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                  Describe symptoms or upload a dashboard photo to receive instant step-by-step diagnostic solutions.
                </p>
              </div>
            </div>

            <Link
              to="/user/ai-help"
              className="btn-primary w-full py-3.5 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get Instant AI Help</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* HIGH-IMPACT EMERGENCY HELP & SIREN BEACON SECTION */}
        <div className="clean-card emergency-card-active p-6 sm:p-7 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden">
          <div className="flex items-center gap-4 text-center sm:text-left relative z-10">
            {/* Animated Siren Light Beacon */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-950 dark:to-red-950 border border-orange-300 dark:border-orange-700 flex items-center justify-center shadow-inner relative">
                <SirenLight size="lg" variant="ambulance" hasWaves={true} animated={true} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <SirenBadge text="Immediate Breakdown Rescue" liveStatus="24/7 Live" size="xs" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white font-heading mt-0.5 tracking-tight flex items-center justify-center sm:justify-start gap-2">
                <span>EMERGENCY HELP</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-extrabold bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
                  SOS DISPATCH
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mt-0.5">
                Flat tyre, dead battery, or broken down on the road? Send an instant priority alert to nearby mobile mechanics.
              </p>
            </div>
          </div>

          <div className="relative z-10 w-full sm:w-auto flex flex-col items-center sm:items-end gap-1.5 flex-shrink-0">
            <Link
              to="/user/emergency"
              className="btn-emergency w-full sm:w-auto px-7 py-4 text-center text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg group whitespace-nowrap"
            >
              <SirenLight size="sm" variant="sticker" animated={true} />
              <span className="drop-shadow-xs font-black">Request Emergency Mechanic</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
              ⚡ Avg response: <strong className="text-orange-700 dark:text-orange-400 font-bold">~4.2 mins</strong>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserHomePage;
