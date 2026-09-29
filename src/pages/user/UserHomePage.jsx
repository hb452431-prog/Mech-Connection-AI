import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserNavbar from '../../components/common/UserNavbar';
import { UserHomeSkeleton } from '../../components/common/Skeleton';
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
  Flame,
  Activity
} from 'lucide-react';
import { SirenLight, SirenBadge } from '../../components/common/SirenLight';
import { useNetwork } from '../../context/NetworkContext';

export const UserHomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { isSlowNetwork, isOnline } = useNetwork();
  const user = authService.getUser() || {};

  useEffect(() => {
    // Fast initial telemetry sync
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const showSkeleton = loading || isSlowNetwork || !isOnline;

  const quickServices = [
    { 
      label: 'Flat Tyre', 
      icon: Disc, 
      type: 'Flat Tyre',
      bgLight: 'bg-cyan-50 dark:bg-cyan-950/60',
      textLight: 'text-cyan-600 dark:text-cyan-400',
      hoverBg: 'group-hover:bg-cyan-500 group-hover:text-white',
      borderHover: 'hover:border-cyan-400 dark:hover:border-cyan-500'
    },
    { 
      label: 'Battery Jump', 
      icon: BatteryCharging, 
      type: 'Battery Problem',
      bgLight: 'bg-amber-50 dark:bg-amber-950/60',
      textLight: 'text-amber-600 dark:text-amber-400',
      hoverBg: 'group-hover:bg-amber-500 group-hover:text-slate-950',
      borderHover: 'hover:border-amber-400 dark:hover:border-amber-500'
    },
    { 
      label: 'Engine Stall', 
      icon: Flame, 
      type: 'Engine Problem',
      bgLight: 'bg-orange-50 dark:bg-orange-950/60',
      textLight: 'text-orange-600 dark:text-orange-400',
      hoverBg: 'group-hover:bg-orange-500 group-hover:text-white',
      borderHover: 'hover:border-orange-400 dark:hover:border-orange-500'
    },
    { 
      label: 'Towing Rescue', 
      icon: Truck, 
      type: 'Vehicle Breakdown',
      bgLight: 'bg-blue-50 dark:bg-blue-950/60',
      textLight: 'text-blue-600 dark:text-blue-400',
      hoverBg: 'group-hover:bg-blue-600 group-hover:text-white',
      borderHover: 'hover:border-blue-400 dark:hover:border-blue-500'
    },
    { 
      label: 'Lockout Aid', 
      icon: KeyRound, 
      type: 'Other',
      bgLight: 'bg-emerald-50 dark:bg-emerald-950/60',
      textLight: 'text-emerald-600 dark:text-emerald-400',
      hoverBg: 'group-hover:bg-emerald-500 group-hover:text-white',
      borderHover: 'hover:border-emerald-400 dark:hover:border-emerald-500'
    }
  ];

  const handleQuickService = (type) => {
    navigate(`/user/emergency?type=${encodeURIComponent(type)}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070B14] text-slate-900 dark:text-slate-100 flex flex-col pb-28 sm:pb-32 md:pb-16 transition-colors duration-200 relative overflow-hidden">
      <UserNavbar />

      {/* Cybernetic Ambient Aurora Background */}
      <div className="mesh-aurora-bg" />
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-40 dark:opacity-20" />

      {showSkeleton ? (
        <UserHomeSkeleton />
      ) : (
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10 animate-in fade-in duration-300 relative z-10">
        {/* Top Driver Telemetry Status Banner */}
        <div className="clean-card p-6 sm:p-8 bg-gradient-to-r from-white via-blue-50/40 to-cyan-50/40 dark:from-[#0B1222] dark:via-blue-950/40 dark:to-cyan-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-2 border-slate-200/90 dark:border-slate-800/90 shadow-glass-card dark:shadow-glass-dark rounded-3xl relative overflow-hidden">
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center flex-shrink-0 font-bold shadow-glow-blue border border-white/20">
              <Car className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading">
                  Hello, {user.name || 'Driver'}
                </h2>
                <span className="px-3 py-0.5 rounded-full bg-emerald-100/90 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold font-mono flex items-center gap-1.5 border border-emerald-300/80 dark:border-emerald-800 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Vehicle Ready
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                {user.vehicle?.year || user.vehicleBrand || 'Honda'} {user.vehicle?.model || user.vehicleModel || 'Civic'} • Plate: <span className="font-mono font-bold text-slate-700 dark:text-slate-200 uppercase">{user.vehicle?.plate || user.vehicleNumber || 'CA-8XYZ92'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="hidden lg:flex items-center gap-4 px-4 py-2 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-mono shadow-xs">
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                24/7 Coverage Active
              </span>
            </div>
            <Link
              to="/user/profile"
              className="btn-secondary px-5 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 self-start sm:self-auto rounded-2xl shadow-xs"
            >
              <span>Manage Vehicle</span>
            </Link>
          </div>
        </div>

        {/* 1-Tap Quick Roadside Services Bar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-black uppercase tracking-wider font-mono text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Instant 1-Tap Roadside Rescue:</span>
            </span>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              ~4.2 Mins Avg Arrival • 142 Technicians Online
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
                  className={`clean-card p-4 sm:p-5 flex flex-col items-center justify-center gap-3 ${srv.borderHover} hover:scale-[1.03] transition-all text-center group border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1222] rounded-2xl shadow-sm`}
                >
                  <div className={`w-12 h-12 rounded-2xl ${srv.bgLight} ${srv.textLight} flex items-center justify-center ${srv.hoverBg} transition-all duration-200 shadow-xs`}>
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

        {/* 3 Balanced Primary Action Cards for Desktop & Tablet */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Emergency SOS Dispatch */}
          <div className="clean-card emergency-card-active p-7 sm:p-8 flex flex-col justify-between group hover:shadow-2xl transition-all border-2 border-orange-300 dark:border-orange-800 rounded-3xl space-y-6 relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-glow-emergency border border-white/20">
                  <SirenLight size="md" variant="ambulance" animated={true} />
                </div>
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-orange-700 dark:text-orange-300 bg-orange-100/90 dark:bg-orange-950/80 px-3 py-1 rounded-full border border-orange-300/80 dark:border-orange-800 shadow-xs">
                  ⚡ High Priority
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  EMERGENCY SOS RESCUE
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Stranded or broken down? Dispatch instant emergency beacon with live telemetry to closest mobile mechanics.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/user/emergency"
                className="btn-emergency w-full py-4 text-center text-sm font-black flex items-center justify-center gap-2 rounded-2xl shadow-md"
              >
                <span>REQUEST EMERGENCY SOS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Find Nearby Garage */}
          <div className="portal-card-user p-7 sm:p-8 flex flex-col justify-between group hover:shadow-2xl transition-all border-2 border-cyan-300/80 dark:border-cyan-700/60 rounded-3xl space-y-6 relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-glow-cyan border border-white/20">
                  <MapPin className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 bg-cyan-100/90 dark:bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-300/80 dark:border-cyan-800 shadow-xs flex items-center gap-1">
                  <span>🏍️ Rapid Bike Dispatch</span>
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  FIND NEARBY GARAGES
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Browse certified workshops on the interactive map with rapid mobile bike mechanic dispatch, live distance radar, and roadside tools.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/user/garages"
                className="btn-primary bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 w-full py-4 text-center text-sm font-black flex items-center justify-center gap-2 rounded-2xl shadow-glow-blue"
              >
                <MapPin className="w-4 h-4" />
                <span>EXPLORE ON MAP</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 3: AI Vehicle Help */}
          <div className="portal-card-mechanic p-7 sm:p-8 flex flex-col justify-between group hover:shadow-2xl transition-all border-2 border-indigo-300/80 dark:border-indigo-700/60 rounded-3xl space-y-6 relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-glow-indigo border border-white/20">
                  <Sparkles className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-100/90 dark:bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-300/80 dark:border-indigo-800 shadow-xs">
                  Neural Diagnostic
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  AI VEHICLE DIAGNOSIS
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Describe symptoms, strange sounds, or upload dashboard photos to generate instant step-by-step diagnostic advice.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/user/ai-help"
                className="btn-rapido w-full py-4 text-center text-sm font-black flex items-center justify-center gap-2 rounded-2xl"
              >
                <Sparkles className="w-4 h-4" />
                <span>GET INSTANT AI SCAN</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Automotive Safety & Telemetry Support Footer */}
        <div className="clean-card p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-slate-200/90 dark:border-slate-800/90 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-glass-card dark:shadow-glass-dark">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-cyan-400 flex items-center justify-center flex-shrink-0 shadow-xs">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-heading">
                24/7 Roadside Driver Emergency Helpline
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct phone dispatcher available across all zones for severe highway situations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:18005556324"
              className="px-5 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-xs border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-cyan-400 transition-colors flex items-center gap-2 shadow-xs"
            >
              <PhoneCall className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              <span>+1 (800) 555-MECH</span>
            </a>
          </div>
        </div>
      </main>
      )}
    </div>
  );
};

export default UserHomePage;
