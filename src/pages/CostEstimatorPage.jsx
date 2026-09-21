import React from 'react';
import CostEstimatorCalculator from '../components/landing/CostEstimatorCalculator';
import { DollarSign, ShieldCheck, TrendingDown, Wrench, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CostEstimatorPage = () => {
  return (
    <div className="py-10 bg-navy-950 min-h-screen">
      <div className="container-custom space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider font-mono">
            <DollarSign className="w-3.5 h-3.5" />
            Transparent Auto Repair Pricing
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-heading">
            AI Fair Cost Estimator
          </h1>
          <p className="text-base text-slate-300">
            Compare verified OEM parts costs and certified labor hours against standard dealership rate sheets before you approve any repair.
          </p>
        </div>

        {/* The Calculator */}
        <CostEstimatorCalculator />

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TrendingDown className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-heading">Average 35% Savings</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our partner mechanics use standardized labor book-time without dealership retail overhead markups.
            </p>
          </div>

          <div className="glass-card p-6 border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-heading">12-Month / 12k Mile Warranty</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every repair booked through MECH CONNECT AI includes a nationwide parts and labor protection warranty.
            </p>
          </div>

          <div className="glass-card p-6 border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-heading">ASE Certified Mechanics Only</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Never hand your keys to unverified shops. All quotes are fulfilled by vetted master automotive technicians.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostEstimatorPage;
