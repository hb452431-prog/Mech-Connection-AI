import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BatteryCharging, 
  Disc, 
  Truck, 
  Fuel, 
  KeyRound, 
  Anchor, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { MOCK_EMERGENCY_SERVICES } from '../../services/mockData';

const iconMap = {
  BatteryCharging,
  Disc,
  Truck,
  Fuel,
  KeyRound,
  Anchor
};

export const EmergencyServicesGrid = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 animate-bounce" />
              On-Demand 24/7 Roadside Rescue
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-heading">
              Emergency Assistance Dispatched in Minutes
            </h2>
            <p className="text-slate-400 text-base">
              Flat tyres, dead batteries, lockouts, or breakdowns. Certified mobile units and tow operators are on standby 24/7 with transparent upfront pricing.
            </p>
          </div>

          <Link
            to="/user/emergency"
            className="btn-emergency px-7 py-4 rounded-2xl text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 self-start md:self-auto shadow-lg"
          >
            <span>Launch SOS Dispatch</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_EMERGENCY_SERVICES.map((service) => {
            const IconComponent = iconMap[service.icon] || Truck;
            return (
              <div
                key={service.id}
                className="clean-card p-6 flex flex-col justify-between group hover:border-amber-400 dark:hover:border-amber-500 border-2"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 font-mono font-bold">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>~{service.etaMins} mins ETA</span>
                    </div>
                  </div>

                  <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2 font-heading group-hover:text-amber-500 transition-colors">
                    {service.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-mono block font-bold">From</span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                      ${service.basePrice}
                    </span>
                  </div>

                  <Link
                    to={`/user/emergency?type=${encodeURIComponent(service.name)}`}
                    className="px-5 py-2.5 rounded-xl btn-primary text-xs sm:text-sm font-black transition-all flex items-center gap-2 shadow-sm"
                  >
                    <span>Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Assurance Strip */}
        <div className="mt-10 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-around gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Guaranteed No Price Gouging</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Real-time Live GPS Tracking on Route</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Vetted & Insured Operators</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyServicesGrid;
