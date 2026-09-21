import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  DollarSign, 
  TrendingDown, 
  ShieldCheck, 
  ArrowRight, 
  Car,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { MOCK_COST_ESTIMATOR_CATEGORIES } from '../../services/mockData';

export const CostEstimatorCalculator = () => {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const [selectedItemIdx, setSelectedItemIdx] = useState(0);
  const [vehicleType, setVehicleType] = useState('Standard Domestic / Asian'); // or 'German Luxury' / 'Electric EV'

  const currentCategory = MOCK_COST_ESTIMATOR_CATEGORIES[selectedCategoryIdx];
  const currentItem = currentCategory.items[selectedItemIdx];

  // Adjust for luxury or EV multiplier
  let multiplier = 1;
  if (vehicleType === 'German Luxury') multiplier = 1.35;
  if (vehicleType === 'Electric EV') multiplier = 1.15;

  const partsCost = Math.round(currentItem.parts * multiplier);
  const laborCost = Math.round(currentItem.labor * multiplier);
  const mechPrice = Math.round(currentItem.mechPrice * multiplier);
  const dealerPrice = Math.round(currentItem.dealerPrice * multiplier);
  const savings = dealerPrice - mechPrice;

  return (
    <section className="py-20 bg-navy-900/40 border-t border-slate-800 relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <DollarSign className="w-3.5 h-3.5" />
            100% Transparent Fair Repair Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-heading">
            Calculate Fair Repair & Parts Costs
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Never get overcharged again. Compare AI-verified OEM parts and fair labor rates against typical dealership inflation.
          </p>
        </div>

        <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 border-cyan-500/30 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Inputs */}
            <div className="lg:col-span-6 space-y-5">
              {/* Vehicle Type Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider font-mono mb-2">
                  1. Vehicle Platform
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Standard Domestic / Asian', 'German Luxury', 'Electric EV'].map((vt) => (
                    <button
                      key={vt}
                      type="button"
                      onClick={() => setVehicleType(vt)}
                      className={`p-3 rounded-xl text-xs font-bold text-center border transition-all ${
                        vehicleType === vt
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {vt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Repair Category */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider font-mono mb-2">
                  2. Repair Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {MOCK_COST_ESTIMATOR_CATEGORIES.map((cat, idx) => (
                    <button
                      key={cat.category}
                      type="button"
                      onClick={() => {
                        setSelectedCategoryIdx(idx);
                        setSelectedItemIdx(0);
                      }}
                      className={`p-3 rounded-xl text-xs font-bold text-left border transition-all ${
                        selectedCategoryIdx === idx
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {cat.category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specific Service Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider font-mono mb-2">
                  3. Select Specific Service
                </label>
                <select
                  value={selectedItemIdx}
                  onChange={(e) => setSelectedItemIdx(parseInt(e.target.value))}
                  className="w-full glass-input px-4 py-3 rounded-xl text-sm font-medium"
                >
                  {currentCategory.items.map((item, idx) => (
                    <option key={idx} value={idx} className="bg-slate-900 text-white">
                      {item.service}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Cost Summary Breakdown */}
            <div className="lg:col-span-6">
              <div className="bg-navy-950 rounded-2xl p-6 border border-slate-800 space-y-6">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-mono">Service Selected</span>
                  <h4 className="text-lg font-bold text-white font-heading mt-0.5">{currentItem.service}</h4>
                </div>

                {/* Savings Pill */}
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="text-xs text-emerald-300 font-bold uppercase font-mono">Estimated Savings</p>
                      <p className="text-xs text-slate-300">vs Dealership Markup</p>
                    </div>
                  </div>
                  <span className="text-2xl font-black text-emerald-400 font-mono">
                    -${savings}
                  </span>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>OEM / Quality Parts Estimate:</span>
                    <strong className="font-mono text-white">${partsCost}</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Certified Labor Estimate:</span>
                    <strong className="font-mono text-white">${laborCost}</strong>
                  </div>
                  <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800">
                    <span>Typical Dealership Total:</span>
                    <span className="font-mono line-through">${dealerPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                    <span className="text-cyan-400">MECH CONNECT Fair Price:</span>
                    <span className="text-xl font-black text-cyan-400 font-mono">${mechPrice}</span>
                  </div>
                </div>

                <Link
                  to={`/mechanics?service=${encodeURIComponent(currentItem.service)}`}
                  className="w-full btn-primary-glow py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  Find Mechanics Offering This Rate
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostEstimatorCalculator;
