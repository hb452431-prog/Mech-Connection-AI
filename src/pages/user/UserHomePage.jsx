import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserNavbar from '../../components/common/UserNavbar';
import { authService } from '../../services/authService';
import { 
  Wrench, 
  Sparkles, 
  AlertCircle, 
  ArrowRight, 
  MapPin, 
  Car, 
  ShieldCheck, 
  Zap, 
  PhoneCall, 
  Gauge, 
  BatteryCharging,
  Disc,
  Truck,
  KeyRound,
  Flame
} from 'lucide-react';
import { SirenLight, SirenBadge } from '../../components/common/SirenLight';

export const UserHomePage = () => {
  const navigate = useNavigate();
  const user = authService.getUser() || {};

  const quickServices = [
    { label: 'Flat Tyre', icon: Disc, type: 'Flat Tyre' },
    { label: 'Battery Jump', icon: BatteryCharging, type: 'Battery Problem' },
    { label: 'Engine Stall', icon: Flame, type: 'Engine Problem' },
    { label: 'Towing Rescue', icon: Truck, type: 'Vehicle Breakdown' },
    { label: 'Lockout Aid', icon: KeyRound, type: 'Other' }
  ];

  const handleQuickService = (type) => {
    navigate(`/user/emergency?type=${encodeURIComponent(type)}`);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#080D1A] text-slate-900 dark:text-slate-100 flex flex-col pb-28 sm:pb-32 md:pb-16 transition-colors duration-200">
      <UserNavbar />

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12 md:py-14 space-y-10 sm:space-y-12">
        {/* Top Driver Telemetry Status Banner */}
        <div className="clean-card p-7 sm:p-9 bg-gradient-to-r from-white via-cyan-50/40 to-indigo-50/30 dark:from-slate-900 dark:via-cyan-950/30 dark:to-indigo-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-2 border-slate-200 dark:border-slate-800 shadow-md rounded-3xl">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-3xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 flex items-center justify-center flex-shrink-0 font-bold border border-cyan-200 dark:border-cyan-800 shadow-xs">
              <Car className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading">
                  Hello, {user.name || 'Driver'}
                </h2>
                <span className="px-3 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold font-mono flex items-center gap-1.5 border border-emerald-200 dark:border-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Vehicle Ready
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                {user.vehicle?.year || user.vehicleBrand || 'Honda'} {user.vehicle?.model || user.vehicleModel || 'Civic'} • Plate: <span className="font-mono font-bold text-slate-700 dark:text-slate-200 uppercase">{user.vehicle?.plate || user.vehicleNumber || 'CA-8XYZ92'}</span>
              </p>
            </div>
          </div>

          <Link
            to="/user/profile"
            className="btn-secondary px-5 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 self-start sm:self-auto rounded-2xl"
          >
            <span>Manage Vehicle</span>
          </Link>
        </div>

        {/* Rapido-Style 1-Tap Quick Roadside Services Bar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-black uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Instant 1-Tap Roadside Rescue:</span>
            </span>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              ⚡ ~4.2 Mins Avg Arrival
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 sm:gap-4">
            {quickServices.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickService(srv.type)}
                  className="clean-card p-4 sm:p-5 flex flex-col items-center justify-center gap-3 hover:border-amber-400 dark:hover:border-amber-500 hover:scale-105 transition-all text-center group border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl shadow-sm"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200 font-heading">
                    {srv.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2 Main Action Cards (Oversized with Large Buttons) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8">
          {/* Card 1: Find Nearby Garage */}
          <div className="clean-card p-7 sm:p-9 flex flex-col justify-between group hover:border-cyan-400 dark:hover:border-cyan-500 hover:shadow-2xl transition-all border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl space-y-6">
            <div className="space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-cyan-50 dark:bg-cyan-950/70 text-cyan-600 dark:text-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform border border-cyan-100 dark:border-cyan-800/60 shadow-xs">
                <MapPin className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-200/60 dark:border-cyan-800">
                  GPS Live Radar
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white font-heading group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors pt-1">
                  FIND NEARBY GARAGE
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Locate verified repair workshops on the live interactive map with real-time distance and hours.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/user/garages"
                className="btn-primary w-full py-4 text-center text-sm sm:text-base font-black flex items-center justify-center gap-2 rounded-2xl"
              >
                <MapPin className="w-5 h-5" />
                <span>EXPLORE GARAGES ON MAP</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: AI Vehicle Help */}
          <div className="clean-card p-7 sm:p-9 flex flex-col justify-between group hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-2xl transition-all border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl space-y-6">
            <div className="space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform border border-amber-100 dark:border-amber-800/60 shadow-xs">
                <Sparkles className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 px-3 py-1 rounded-full border border-amber-200/60 dark:border-amber-800">
                  Instant AI Diagnostic
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white font-heading group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors pt-1">
                  AI VEHICLE DIAGNOSIS
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Describe symptoms or upload a dashboard photo to get instant step-by-step diagnostic solutions.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/user/ai-help"
                className="btn-rapido w-full py-4 text-center text-sm sm:text-base font-black flex items-center justify-center gap-2 rounded-2xl"
              >
                <Sparkles className="w-5 h-5" />
                <span>GET INSTANT AI HELP</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* HIGH-IMPACT EMERGENCY HELP & SIREN BEACON SECTION */}
        <div className="clean-card emergency-card-active p-8 sm:p-10 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden border-2 border-orange-300 dark:border-orange-800">
          <div className="flex items-center gap-5 text-center sm:text-left relative z-10">
            {/* Animated Siren Light Beacon */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-950 dark:to-red-950 border-2 border-orange-300 dark:border-orange-700 flex items-center justify-center shadow-inner relative">
                <SirenLight size="lg" variant="ambulance" hasWaves={true} animated={true} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
                <SirenBadge text="Immediate Breakdown Rescue" liveStatus="24/7 Ready" size="xs" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading tracking-tight flex items-center justify-center sm:justify-start gap-2">
                <span>EMERGENCY SOS</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                Send an instant high-priority GPS rescue signal to nearby mobile mechanics.
              </p>
            </div>
          </div>

          <div className="relative z-10 w-full sm:w-auto flex flex-col items-center sm:items-end gap-2 flex-shrink-0">
            <Link
              to="/user/emergency"
              className="btn-emergency w-full sm:w-auto px-8 py-5 text-center text-sm sm:text-base font-black uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl group whitespace-nowrap rounded-2xl"
            >
              <SirenLight size="sm" variant="sticker" animated={true} />
              <span className="drop-shadow-xs font-black">REQUEST EMERGENCY MECHANIC</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
              ⚡ Avg response: <strong className="text-orange-700 dark:text-orange-400 font-bold">~4.2 mins</strong>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserHomePage;

