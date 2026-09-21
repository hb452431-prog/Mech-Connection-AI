import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../components/common/BrandLogo';
import { AboutWebsiteVideo } from '../components/landing/AboutWebsiteVideo';
import { Wrench, Car, ArrowRight, ShieldCheck, Zap, AlertCircle } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F6F8FC] flex flex-col justify-between items-center px-4 py-8 sm:py-12">
      {/* Top Brand Header */}
      <div className="w-full max-w-lg text-center space-y-4">
        <div className="flex justify-center mb-1">
          <BrandLogo size="lg" clickable={false} />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold font-mono tracking-wide shadow-2xs">
          <Zap className="w-3.5 h-3.5 text-indigo-600" />
          Next-Gen AI Vehicle Assistance
        </div>

        <div className="space-y-1.5">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight leading-tight">
            Smart Help When You Need It.
          </h1>
          <p className="text-sm text-slate-600 font-medium max-w-sm mx-auto">
            Diagnose vehicle problems with AI, find nearby mechanics, and get roadside emergency rescue.
          </p>
        </div>
      </div>

      {/* Main Portal Selection Area */}
      <div className="w-full max-w-md my-6 space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 font-mono px-1">
          <span>Select Portal</span>
          <span className="text-indigo-600 font-semibold">Choose One</span>
        </div>

        {/* Option 1: MECHANIC PORTAL */}
        <Link
          to="/mechanic/auth"
          className="clean-card p-6 flex flex-col justify-between group hover:border-indigo-500 hover:shadow-lg transition-all block text-left bg-white border-2 border-slate-200"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs">
                <Wrench className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  For Auto Workshops
                </span>
                <h2 className="text-xl font-black text-slate-900 font-heading group-hover:text-indigo-600 transition-colors mt-0.5">
                  MECHANIC
                </h2>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100 leading-relaxed">
            Register your garage, receive incoming breakdown alerts, and accept nearby roadside requests.
          </p>
        </Link>

        {/* Option 2: USER / DRIVER PORTAL */}
        <Link
          to="/user/auth"
          className="clean-card p-6 flex flex-col justify-between group hover:border-indigo-500 hover:shadow-lg transition-all block text-left bg-white border-2 border-slate-200"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs">
                <Car className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  For Vehicle Owners
                </span>
                <h2 className="text-xl font-black text-slate-900 font-heading group-hover:text-indigo-600 transition-colors mt-0.5">
                  USER / DRIVER
                </h2>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100 leading-relaxed">
            Get instant AI vehicle problem diagnosis, find certified garages nearby, or dispatch 1-tap SOS rescue.
          </p>
        </Link>

        {/* Quick SOS Trigger on Landing */}
        <div className="pt-2">
          <Link
            to="/user/emergency"
            className="w-full btn-emergency py-3.5 px-4 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm rounded-xl"
          >
            <AlertCircle className="w-4 h-4" />
            <span>Need Emergency Roadside Help Now?</span>
          </Link>
        </div>
      </div>

      {/* About Website: Animated Interactive Video Player & Feature Showcase */}
      <AboutWebsiteVideo />

      {/* Trust Highlights & Footer */}
      <div className="w-full max-w-lg text-center space-y-3 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-center gap-4 text-xs text-slate-500 font-medium">
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

        <p className="text-[11px] text-slate-400">
          © {new Date().getFullYear()} MECH CONNECT AI. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
