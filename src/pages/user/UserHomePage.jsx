import React from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from '../../components/common/UserNavbar';
import { authService } from '../../services/authService';
import { Wrench, Sparkles, AlertCircle, ArrowRight, MapPin, Car } from 'lucide-react';

export const UserHomePage = () => {
  const user = authService.getUser();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-20 md:pb-10">
      <UserNavbar />

      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8">
        {/* Welcome greeting */}
        <div className="text-center sm:text-left space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md mb-1">
            <Car className="w-3.5 h-3.5" />
            Driver: {user.name} {user.vehicleModel ? `(${user.vehicleBrand} ${user.vehicleModel})` : ''}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight">
            How can we help you?
          </h1>
          <p className="text-sm text-slate-500">
            Select an option below to diagnose a breakdown, find nearby certified mechanics, or request emergency assistance.
          </p>
        </div>

        {/* TWO MAIN OPTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Option 1: FIND NEARBY GARAGE */}
          <div className="clean-card p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-sky-500 transition-all">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Wrench className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                FIND NEARBY GARAGE
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Find certified mechanics and auto workshops near your current location.
              </p>
            </div>

            <Link
              to="/user/garages"
              className="btn-primary w-full py-3 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs"
            >
              <MapPin className="w-4 h-4" />
              Find Garage
            </Link>
          </div>

          {/* Option 2: AI VEHICLE HELP */}
          <div className="clean-card p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-sky-500 transition-all">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Sparkles className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                AI VEHICLE HELP
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Describe your vehicle problem or upload an image to get instant step-by-step diagnostic advice.
              </p>
            </div>

            <Link
              to="/user/ai-help"
              className="btn-primary w-full py-3 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              Get AI Help
            </Link>
          </div>
        </div>

        {/* CLEARLY VISIBLE EMERGENCY HELP SECTION */}
        <div className="clean-card p-6 sm:p-7 border-2 border-red-200 bg-gradient-to-r from-red-50/70 to-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 animate-pulse">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-red-700 font-mono">
                🚨 Immediate Assistance
              </div>
              <h3 className="text-lg font-black text-slate-900 font-heading">
                EMERGENCY HELP
              </h3>
              <p className="text-xs text-slate-600">
                Stranded on the road with a flat tyre, dead battery, or engine failure?
              </p>
            </div>
          </div>

          <Link
            to="/user/emergency"
            className="btn-emergency w-full sm:w-auto px-6 py-3.5 text-center text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
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
