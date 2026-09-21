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
            to="/sos"
            className="btn-emergency-glow px-6 py-3.5 rounded-xl text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 self-start md:self-auto"
          >
            Launch SOS Center
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
                className="glass-card p-6 flex flex-col justify-between group hover:border-cyan-500/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:bg-cyan-950/40 group-hover:border-cyan-500/40 transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      <span>~{service.etaMins} mins ETA</span>
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 font-heading group-hover:text-cyan-300 transition-colors">
                    {service.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase font-mono block">From</span>
                    <span className="text-xl font-black text-white font-mono">
                      ${service.basePrice}
                    </span>
                  </div>

                  <Link
                    to={`/sos?service=${service.id}`}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white border border-slate-700 hover:border-rose-500 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <span>Request</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
