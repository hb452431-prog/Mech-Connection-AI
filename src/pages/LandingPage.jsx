import React from 'react';
import { Link } from 'react-router-dom';
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
  ArrowRight, 
  Clock, 
  MapPin, 
  CheckCircle2,
  Cpu,
  Flame,
  Activity
} from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070B14] text-slate-900 dark:text-slate-100 flex flex-col justify-between items-center px-4 sm:px-8 py-10 sm:py-16 md:py-20 transition-colors duration-200 relative overflow-hidden space-y-12 sm:space-y-16">
      {/* Top Floating Sun / Moon Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle size="md" />
      </div>

      {/* Cybernetic Ambient Aurora Glow & Grid Overlay */}
      <div className="mesh-aurora-bg" />
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-40 dark:opacity-20" />

      {/* Top Brand Header */}
      <header className="w-full max-w-5xl text-center space-y-6 pt-4 relative z-10">
        <div className="flex justify-center mb-2">
          <BrandLogo size="lg" clickable={false} />
        </div>

        {/* Live Mobility Status Pill Ticker */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-5 px-5 py-2.5 rounded-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 shadow-glass-card dark:shadow-glass-dark text-xs font-mono">
          <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            142 Mechanics Active Nearby
          </span>
          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
          <span className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold">
            <Clock className="w-3.5 h-3.5" />
            ~4.2 Min Avg Response
          </span>
          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold">
            <span className="text-amber-500">★</span> 4.9/5 Service Rating
          </span>
        </div>

        {/* Hero Headline */}
        <div className="pt-2">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-gradient-hero font-heading tracking-tight leading-tight">
            Next-Gen Vehicle Intelligence & Rapid Rescue
          </h1>
        </div>
      </header>

      {/* Main Dual Portal Selection Area (Oversized & High-Impact) */}
      <section className="w-full max-w-6xl my-8 sm:my-12 space-y-6 relative z-10">
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono px-2">
          <span className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-brand-blue dark:text-brand-cyan-light" />
            <span>Select System Portal</span>
          </span>
          <span className="text-brand-blue dark:text-brand-cyan-light font-bold flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            Live Routing Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* Option 1: USER / DRIVER PORTAL */}
          <div className="portal-card-user p-5 sm:p-8 lg:p-12 flex flex-col justify-between group text-left border-2 border-cyan-300/80 dark:border-cyan-700/60 rounded-3xl space-y-6 sm:space-y-8 relative overflow-hidden">
            {/* Top Right Decorative Ambient Sheen */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-cyan-400/20 dark:bg-cyan-500/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

            <div className="space-y-5 relative z-10">
              <div className="flex items-start justify-between">
                <div className="w-18 h-18 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-glow-cyan border border-white/20">
                  <Car className="w-9 h-9" />
                </div>
                <span className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-cyan-100/90 dark:bg-cyan-950/90 text-cyan-800 dark:text-cyan-300 border border-cyan-300/80 dark:border-cyan-700/80 shadow-xs">
                  Vehicle Owners & Drivers
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white font-heading group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  USER / DRIVER PORTAL
                </h2>
                <div className="flex flex-wrap gap-2.5 pt-2">
                  <span className="px-3 py-1 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xs text-xs font-mono text-slate-700 dark:text-slate-300 font-medium border border-cyan-200/50 dark:border-cyan-900/50 shadow-xs">
                    ⚡ Instant Roadside SOS
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xs text-xs font-mono text-slate-700 dark:text-slate-300 font-medium border border-cyan-200/50 dark:border-cyan-900/50 shadow-xs">
                    📍 GPS Live Garages
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xs text-xs font-mono text-slate-700 dark:text-slate-300 font-medium border border-cyan-200/50 dark:border-cyan-900/50 shadow-xs">
                    🤖 AI Auto-Scan
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 relative z-10">
              <Link
                to="/user/auth"
                className="w-full btn-primary bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 py-4 sm:py-4.5 text-base sm:text-lg font-black flex items-center justify-center gap-2.5 shadow-lg shadow-cyan-600/25 group-hover:shadow-glow-cyan rounded-2xl transition-all"
              >
                <span>ENTER DRIVER PORTAL</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Option 2: MECHANIC / GARAGE PARTNER PORTAL */}
          <div className="portal-card-mechanic p-5 sm:p-8 lg:p-12 flex flex-col justify-between group text-left border-2 border-indigo-300/80 dark:border-indigo-700/60 rounded-3xl space-y-6 sm:space-y-8 relative overflow-hidden">
            {/* Top Right Decorative Ambient Sheen */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-400/20 dark:bg-indigo-500/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

            <div className="space-y-5 relative z-10">
              <div className="flex items-start justify-between">
                <div className="w-18 h-18 rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-glow-indigo border border-white/20">
                  <Wrench className="w-9 h-9" />
                </div>
                <span className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-indigo-100/90 dark:bg-indigo-950/90 text-indigo-800 dark:text-indigo-300 border border-indigo-300/80 dark:border-indigo-700/80 shadow-xs">
                  Workshops & Technicians
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white font-heading group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  MECHANIC PORTAL
                </h2>
                <div className="flex flex-wrap gap-2.5 pt-2">
                  <span className="px-3 py-1 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xs text-xs font-mono text-slate-700 dark:text-slate-300 font-medium border border-indigo-200/50 dark:border-indigo-900/50 shadow-xs">
                    🔔 Live Emergency Alerts
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xs text-xs font-mono text-slate-700 dark:text-slate-300 font-medium border border-indigo-200/50 dark:border-indigo-900/50 shadow-xs">
                    🗺️ Area Dispatch Radar
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xs text-xs font-mono text-slate-700 dark:text-slate-300 font-medium border border-indigo-200/50 dark:border-indigo-900/50 shadow-xs">
                    💰 Earn per Breakdown Job
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 relative z-10">
              <Link
                to="/mechanic/auth"
                className="w-full btn-primary bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 py-4 sm:py-4.5 text-base sm:text-lg font-black flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-600/25 group-hover:shadow-glow-indigo rounded-2xl transition-all"
              >
                <span>ENTER MECHANIC PORTAL</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Official Platform Video Showcase with Luminous Ambient Rim */}
      <div className="w-full max-w-6xl my-8 sm:my-14 relative z-10">
        <AboutWebsiteVideo />
      </div>

      {/* Trust Highlights & Footer */}
      <footer className="w-full max-w-6xl text-center space-y-6 pt-10 sm:pt-14 mt-12 sm:mt-16 border-t border-slate-200/80 dark:border-slate-800/80 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold">
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/80 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            100% Certified Garages
          </span>
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/80 shadow-xs">
            <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Instant AI Vehicle Diagnostic
          </span>
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 border border-orange-200/80 dark:border-orange-800/80 shadow-xs">
            <Flame className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            24/7 Roadside Rescue
          </span>
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-500 font-mono tracking-wide">
          © {new Date().getFullYear()} MECH CONNECT AI • ON-DEMAND VEHICLE MOBILITY PLATFORM
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
