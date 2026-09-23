import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../components/common/BrandLogo';
import { AboutWebsiteVideo } from '../components/landing/AboutWebsiteVideo';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { Wrench, Car, ShieldCheck, Zap, AlertCircle, Sparkles, Navigation, Cpu } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col justify-between items-center px-4 py-8 sm:py-12 transition-colors duration-200 relative overflow-hidden">
      {/* Top Floating Sun / Moon Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle size="md" />
      </div>

      {/* Ambient Cybernetic Backlight Flares */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-indigo-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Top Brand Header */}
      <div className="w-full max-w-lg text-center space-y-4 pt-2">
        <div className="flex justify-center mb-1">
          <BrandLogo size="lg" clickable={false} />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold font-mono tracking-wide shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
          <span>Next-Gen AI Vehicle Assistance Platform</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white font-heading tracking-tight leading-tight">
            Smart Help When You Need It.
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium max-w-md mx-auto leading-relaxed">
            Instant AI vehicle problem diagnosis, real-time certified garage network, and priority roadside assistance.
          </p>
        </div>
      </div>

      {/* Main Portal Selection Area */}
      <div className="w-full max-w-md my-6 space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono px-1">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Select Portal</span>
          </span>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">Choose Role</span>
        </div>

        {/* Option 1: MECHANIC PORTAL (Arrow mark removed, styled uniquely) */}
        <Link
          to="/mechanic/auth"
          className="portal-card-mechanic p-6 flex flex-col justify-between group block text-left shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs border border-indigo-100 dark:border-indigo-800/60">
                <Wrench className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold font-mono uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-100/70 dark:bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-200/60 dark:border-indigo-800">
                  Auto Workshops & Techs
                </span>
                <h2 className="text-xl font-black text-slate-900 dark:text-white font-heading group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mt-1">
                  MECHANIC PORTAL
                </h2>
              </div>
            </div>

            {/* Status Chip */}
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 group-hover:border-indigo-300 dark:group-hover:border-indigo-600 transition-colors">
              Partner Access
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 leading-relaxed">
            Register your garage workshop, receive incoming live breakdown alerts, and accept nearby roadside assistance jobs.
          </p>
        </Link>

        {/* Option 2: USER / DRIVER PORTAL (Arrow mark removed, styled uniquely) */}
        <Link
          to="/user/auth"
          className="portal-card-user p-6 flex flex-col justify-between group block text-left shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 dark:bg-cyan-950/70 text-cyan-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-all shadow-xs border border-cyan-100 dark:border-cyan-800/60">
                <Car className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold font-mono uppercase tracking-wider text-cyan-700 dark:text-cyan-300 bg-cyan-100/70 dark:bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-200/60 dark:border-cyan-800">
                  Vehicle Owners & Drivers
                </span>
                <h2 className="text-xl font-black text-slate-900 dark:text-white font-heading group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mt-1">
                  USER / DRIVER PORTAL
                </h2>
              </div>
            </div>

            {/* Status Chip */}
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 group-hover:border-cyan-300 dark:group-hover:border-cyan-600 transition-colors">
              Driver Access
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 leading-relaxed">
            Get instant AI vehicle problem diagnosis, find certified garages nearby on live map, or request priority roadside dispatch.
          </p>
        </Link>
      </div>

      {/* About Website: Animated Interactive Video Player & Feature Showcase */}
      <AboutWebsiteVideo />

      {/* Trust Highlights & Footer */}
      <div className="w-full max-w-lg text-center space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Verified Garages
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            AI Diagnostic
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-orange-600" />
            24/7 Roadside
          </span>
        </div>

        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
          © {new Date().getFullYear()} MECH CONNECT AI. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
