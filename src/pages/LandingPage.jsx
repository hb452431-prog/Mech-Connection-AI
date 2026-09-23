import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../components/common/BrandLogo';
import { AboutWebsiteVideo } from '../components/landing/AboutWebsiteVideo';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { 
  Wrench, 
  Car, 
  ShieldCheck, 
  Zap, 
  AlertCircle, 
  Sparkles, 
  Navigation, 
  Radio, 
  ArrowRight, 
  Clock, 
  MapPin, 
  CheckCircle2,
  Bike,
  Truck
} from 'lucide-react';
import { SirenLight } from '../components/common/SirenLight';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedVehicleType, setSelectedVehicleType] = useState('car');

  const vehicleOptions = [
    { id: 'bike', label: 'Bike / 2-Wheeler', icon: '🏍️', badge: 'Fastest 3-Min ETA' },
    { id: 'car', label: 'Car / 4-Wheeler', icon: '🚗', badge: 'Full Breakdown Rescue' },
    { id: 'auto', label: 'Auto / 3-Wheeler', icon: '🛺', badge: 'City Rapid Assist' },
    { id: 'heavy', label: 'Heavy / Commercial', icon: '🚚', badge: 'Tow & Heavy Repair' }
  ];

  const handleQuickRescue = (typeId) => {
    navigate(`/user/emergency?type=${encodeURIComponent(typeId === 'bike' ? 'Bike Breakdown' : 'Vehicle Breakdown')}`);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#080D1A] text-slate-900 dark:text-slate-100 flex flex-col justify-between items-center px-4 py-6 sm:py-10 transition-colors duration-200 relative overflow-hidden">
      {/* Top Floating Sun / Moon Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle size="md" />
      </div>

      {/* Cybernetic Ambient Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-gradient-to-b from-indigo-500/15 via-amber-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Top Brand Header */}
      <header className="w-full max-w-4xl text-center space-y-4 pt-2">
        <div className="flex justify-center mb-1">
          <BrandLogo size="lg" clickable={false} />
        </div>

        {/* Live Mobility Status Pill Ticker (Rapido style) */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 py-2 rounded-full bg-white/90 dark:bg-slate-900/90 border-2 border-slate-200 dark:border-slate-800 shadow-sm text-xs font-mono">
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            142 Mechanics Active Nearby
          </span>
          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold">
            <Clock className="w-3.5 h-3.5" />
            ~4.2 Min Avg Response
          </span>
          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
          <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-bold">
            ⭐ 4.9/5 Service Rating
          </span>
        </div>

        {/* Hero Headline */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white font-heading tracking-tight leading-tight">
            Fastest Vehicle Help On-Demand.
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium max-w-xl mx-auto">
            Instant AI diagnosis, real-time certified mechanics on live GPS map, and rapid roadside dispatch.
          </p>
        </div>
      </header>

      {/* Rapido-Style Quick Booking / Vehicle Type Bar */}
      <section className="w-full max-w-3xl my-6 bg-white dark:bg-slate-900/90 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Select Vehicle Type for Instant Dispatch:</span>
          </span>
          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
            ● GPS Active
          </span>
        </div>

        {/* Vehicle Selection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {vehicleOptions.map((opt) => {
            const isSelected = selectedVehicleType === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedVehicleType(opt.id)}
                className={`p-3 rounded-xl border-2 text-left transition-all flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-slate-900 dark:text-white ring-2 ring-amber-400/40 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{opt.icon}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                </div>
                <div>
                  <div className="font-extrabold text-xs sm:text-sm leading-tight">{opt.label}</div>
                  <div className="text-[10px] font-mono text-amber-700 dark:text-amber-400 font-bold mt-0.5">
                    {opt.badge}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Big Quick Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <button
            type="button"
            onClick={() => handleQuickRescue(selectedVehicleType)}
            className="btn-emergency py-4 text-sm sm:text-base font-black flex items-center justify-center gap-2 shadow-lg sm:col-span-1"
          >
            <SirenLight size="xs" variant="sticker" animated={true} />
            <span>DISPATCH SOS NOW</span>
          </button>

          <Link
            to="/user/garages"
            className="btn-primary py-4 text-sm sm:text-base font-black flex items-center justify-center gap-2 shadow-md sm:col-span-1"
          >
            <MapPin className="w-4 h-4" />
            <span>FIND WORKSHOPS</span>
          </Link>

          <Link
            to="/user/ai-help"
            className="btn-rapido py-4 text-sm sm:text-base font-black flex items-center justify-center gap-2 shadow-md sm:col-span-1"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI DIAGNOSTIC SCAN</span>
          </Link>
        </div>
      </section>

      {/* Main Dual Portal Selection Area (Oversized & High-Impact) */}
      <section className="w-full max-w-4xl my-4 space-y-4">
        <div className="text-center">
          <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 font-mono">
            Or Choose Your Dedicated Portal
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Option 1: USER / DRIVER PORTAL */}
          <div className="portal-card-user p-6 sm:p-8 flex flex-col justify-between group text-left shadow-md border-2 border-cyan-300 dark:border-cyan-800/80">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-16 h-16 rounded-2xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs border border-cyan-200 dark:border-cyan-800">
                  <Car className="w-8 h-8" />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                  Vehicle Owners & Drivers
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  USER / DRIVER PORTAL
                </h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                    ⚡ Instant Roadside SOS
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                    📍 GPS Live Garages
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                    🤖 AI Auto-Scan
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                to="/user/auth"
                className="w-full btn-primary py-4 text-base sm:text-lg font-black flex items-center justify-center gap-2 shadow-md group-hover:shadow-lg"
              >
                <span>ENTER DRIVER PORTAL</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Option 2: MECHANIC / GARAGE PARTNER PORTAL */}
          <div className="portal-card-mechanic p-6 sm:p-8 flex flex-col justify-between group text-left shadow-md border-2 border-indigo-300 dark:border-indigo-800/80">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs border border-indigo-200 dark:border-indigo-800">
                  <Wrench className="w-8 h-8" />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Workshops & Technicians
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  MECHANIC PORTAL
                </h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                    🔔 Live Emergency Alerts
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                    🗺️ Area Dispatch Radar
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                    💰 Earn per Breakdown Job
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                to="/mechanic/auth"
                className="w-full btn-primary py-4 text-base sm:text-lg font-black flex items-center justify-center gap-2 shadow-md group-hover:shadow-lg"
              >
                <span>ENTER MECHANIC PORTAL</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Official Platform Video Showcase */}
      <AboutWebsiteVideo />

      {/* Trust Highlights & Footer */}
      <footer className="w-full max-w-2xl text-center space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 dark:text-slate-400 font-bold">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            100% Certified Garages
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-indigo-600" />
            Instant AI Vehicle Diagnostic
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-orange-600" />
            24/7 Roadside Rescue
          </span>
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">
          © {new Date().getFullYear()} MECH CONNECT AI • ON-DEMAND VEHICLE MOBILITY PLATFORM
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
