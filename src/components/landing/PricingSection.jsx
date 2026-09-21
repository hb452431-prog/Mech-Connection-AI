import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Zap, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const PricingSection = () => {
  const plans = [
    {
      name: 'Pay-As-You-Go Driver',
      price: '$0',
      period: 'forever free',
      description: 'Ideal for occasional drivers who want on-demand AI triage and emergency assistance when needed.',
      popular: false,
      features: [
        'Instant AI Symptom & Noise Diagnostics (3/mo)',
        'Full access to Nearby Certified Mechanics directory',
        'Transparent Parts & Labor Cost Estimator',
        'Standard Emergency SOS Dispatch (Pay per incident)',
        'Digital Garage for up to 1 vehicle'
      ],
      buttonText: 'Get Started Free',
      buttonStyle: 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
    },
    {
      name: 'MechConnect+ Gold Driver',
      price: '$9.99',
      period: 'per month',
      description: 'Total roadside peace of mind with 24/7 unlimited AI engine analysis and included emergency towing.',
      popular: true,
      features: [
        'Unlimited AI Acoustic, Warning Light & DTC Scans',
        '2 Free Roadside Rescues per Year (Jump, Flat, Tow up to 15 mi)',
        '15% Guaranteed Discount on Certified Partner Labor',
        'Priority 3-Minute Emergency SOS Dispatch Queue',
        'Digital Garage for up to 3 vehicles with VIN history',
        'Direct 24/7 Master Technician Video Advice'
      ],
      buttonText: 'Start 14-Day Free Trial',
      buttonStyle: 'btn-primary-glow'
    },
    {
      name: 'Fleet & Commercial AI',
      price: '$29.99',
      period: 'per vehicle / mo',
      description: 'Enterprise telemetry, predictive maintenance, and priority dispatch for delivery vans and business fleets.',
      popular: false,
      features: [
        'Real-Time Continuous OBD-II Telemetry Monitoring',
        'Automated Preventive Maintenance Dispatch Alerts',
        'Unlimited Multi-Vehicle Digital Garage & Reports',
        'Consolidated Monthly Fleet Invoicing',
        'Dedicated Enterprise Account Master Mechanic',
        'Custom Webhooks & REST API Access'
      ],
      buttonText: 'Contact Fleet Sales',
      buttonStyle: 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
    }
  ];

  return (
    <section className="py-20 bg-navy-950 border-t border-slate-800 relative">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            Simple & Transparent Plans
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-heading">
            Choose Your Vehicle Protection Plan
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            No surprise fees. No hidden deductibles. Cancel or change your membership anytime.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all ${
                plan.popular
                  ? 'bg-gradient-to-b from-navy-900 to-slate-900 border-2 border-cyan-500/80 shadow-2xl shadow-cyan-950/60 ring-1 ring-cyan-500/40 lg:-translate-y-2'
                  : 'bg-slate-900/40 border border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Most Popular Driver Choice
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white font-heading">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-white font-mono">{plan.price}</span>
                  <span className="text-xs font-medium text-slate-400 font-mono">/{plan.period}</span>
                </div>

                {/* Features list */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">
                    Included Benefits:
                  </p>
                  <ul className="space-y-2.5">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  to="/register"
                  className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
