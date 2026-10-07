import React from 'react';
import CostEstimatorCalculator from '../components/landing/CostEstimatorCalculator';
import UserNavbar from '../components/common/UserNavbar';
import Footer from '../components/common/Footer';
import { DollarSign, ShieldCheck, TrendingDown, Wrench, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CostEstimatorPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070B14] text-slate-900 dark:text-slate-100 flex flex-col items-center transition-colors duration-200 relative overflow-hidden">
      <UserNavbar />

      {/* Cybernetic Ambient Aurora Background */}
      <div className="mesh-aurora-bg" />
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-40 dark:opacity-20" />

      <main className="max-w-7xl mx-auto w-full self-center px-4 sm:px-8 py-8 sm:py-12 space-y-12 animate-in fade-in duration-300 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/user"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider font-mono">
            <DollarSign className="w-3.5 h-3.5" />
            Transparent Auto Repair Pricing
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-gradient-hero tracking-tight font-heading">
            AI Fair Cost Estimator
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Compare verified OEM parts costs and certified labor hours against standard dealership rate sheets before you approve any repair.
          </p>
        </div>

        {/* The Calculator */}
        <CostEstimatorCalculator />

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="clean-card p-6 border-2 border-slate-200/90 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-glass-card dark:shadow-glass-dark space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
              <TrendingDown className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Average 35% Savings</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Our partner mechanics use standardized labor book-time without dealership retail overhead markups.
            </p>
          </div>

          <div className="clean-card p-6 border-2 border-slate-200/90 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-glass-card dark:shadow-glass-dark space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">12-Month / 12k Mile Warranty</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Every repair booked through MECH CONNECT AI includes a nationwide parts and labor protection warranty.
            </p>
          </div>

          <div className="clean-card p-6 border-2 border-slate-200/90 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-glass-card dark:shadow-glass-dark space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">ASE Certified Mechanics Only</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Never hand your keys to unverified shops. All quotes are fulfilled by vetted master automotive technicians.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CostEstimatorPage;
