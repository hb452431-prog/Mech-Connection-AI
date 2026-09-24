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
  Cpu
} from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#080D1A] text-slate-900 dark:text-slate-100 flex flex-col justify-between items-center px-4 sm:px-8 py-10 sm:py-16 md:py-20 transition-colors duration-200 relative overflow-hidden space-y-12 sm:space-y-16">
      {/* Top Floating Sun / Moon Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle size="md" />
      </div>

      {/* Cybernetic Ambient Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[550px] bg-gradient-to-b from-indigo-500/15 via-cyan-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Top Brand Header */}
      <header className="w-full max-w-4xl text-center space-y-6 pt-4">
        <div className="flex justify-center mb-2">
          <BrandLogo size="lg" clickable={false} />
        </div>

        {/* Live Mobility Status Pill Ticker */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-5 px-5 py-2.5 rounded-full bg-white/95 dark:bg-slate-900/95 border-2 border-slate-200 dark:border-slate-800 shadow-sm text-xs font-mono">
          <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            142 Mechanics Active Nearby
          </span>
          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
          <span className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold">
            <Clock className="w-3.5 h-3.5" />
            ~4.2 Min Avg Response
          </span>
          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold">
            ⭐ 4.9/5 Service Rating
          </span>
        </div>

        {/* Hero Headline */}
        <div className="pt-2">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white font-heading tracking-tight leading-tight">
            Smart Help When You Need It.
          </h1>
        </div>
      </header>

      {/* Main Dual Portal Selection Area (Oversized & High-Impact) */}
      <section className="w-full max-w-4xl my-8 sm:my-12 space-y-6">
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono px-2">
          <span className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Select Portal</span>
          </span>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">Choose Role</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-9">
          {/* Option 1: USER / DRIVER PORTAL */}
          <div className="portal-card-user p-8 sm:p-10 flex flex-col justify-between group text-left shadow-lg border-2 border-cyan-300 dark:border-cyan-800/80 rounded-3xl space-y-8">
            <div className="space-y-5">
              <div className="flex items-start justify-between">
                <div className="w-18 h-18 rounded-3xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs border border-cyan-200 dark:border-cyan-800">
                  <Car className="w-9 h-9" />
                </div>
                <span className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                  Vehicle Owners & Drivers
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  USER / DRIVER PORTAL
                </h2>
                <div className="flex flex-wrap gap-2.5 pt-2">
                  <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs font-mono text-slate-600 dark:text-slate-300 font-medium">
                    ⚡ Instant Roadside SOS
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs font-mono text-slate-600 dark:text-slate-300 font-medium">
                    📍 GPS Live Garages
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs font-mono text-slate-600 dark:text-slate-300 font-medium">
                    🤖 AI Auto-Scan
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/user/auth"
                className="w-full btn-primary py-4 sm:py-4.5 text-base sm:text-lg font-black flex items-center justify-center gap-2.5 shadow-md group-hover:shadow-xl rounded-2xl"
              >
                <span>ENTER DRIVER PORTAL</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Option 2: MECHANIC / GARAGE PARTNER PORTAL */}
          <div className="portal-card-mechanic p-8 sm:p-10 flex flex-col justify-between group text-left shadow-lg border-2 border-indigo-300 dark:border-indigo-800/80 rounded-3xl space-y-8">
            <div className="space-y-5">
              <div className="flex items-start justify-between">
                <div className="w-18 h-18 rounded-3xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs border border-indigo-200 dark:border-indigo-800">
                  <Wrench className="w-9 h-9" />
                </div>
                <span className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Workshops & Technicians
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  MECHANIC PORTAL
                </h2>
                <div className="flex flex-wrap gap-2.5 pt-2">
                  <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs font-mono text-slate-600 dark:text-slate-300 font-medium">
                    🔔 Live Emergency Alerts
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs font-mono text-slate-600 dark:text-slate-300 font-medium">
                    🗺️ Area Dispatch Radar
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs font-mono text-slate-600 dark:text-slate-300 font-medium">
                    💰 Earn per Breakdown Job
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/mechanic/auth"
                className="w-full btn-primary py-4 sm:py-4.5 text-base sm:text-lg font-black flex items-center justify-center gap-2.5 shadow-md group-hover:shadow-xl rounded-2xl"
              >
                <span>ENTER MECHANIC PORTAL</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Official Platform Video Showcase */}
      <div className="w-full my-8 sm:my-14">
        <AboutWebsiteVideo />
      </div>

      {/* Trust Highlights & Footer */}
      <footer className="w-full max-w-3xl text-center space-y-6 pt-10 sm:pt-14 mt-12 sm:mt-16 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-bold">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            100% Certified Garages
          </span>
          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-600" />
            Instant AI Vehicle Diagnostic
          </span>
          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
          <span className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-orange-600" />
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

