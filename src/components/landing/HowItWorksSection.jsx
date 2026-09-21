import React from 'react';
import { 
  Cpu, 
  MapPin, 
  Navigation, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const HowItWorksSection = () => {
  const steps = [
    {
      step: '01',
      title: 'AI Diagnostic Triage',
      desc: 'Describe symptoms, upload an engine sound clip, snap a dashboard warning light photo, or input an OBD-II code. Our AI isolates the failure mode in seconds.',
      icon: Cpu,
      color: 'text-cyan-400',
      border: 'border-cyan-500/40',
      bg: 'bg-cyan-500/10'
    },
    {
      step: '02',
      title: 'Smart Mechanic Match',
      desc: 'Our engine matches your exact vehicle make, model, and failure code to the nearest ASE-certified workshop or mobile rapid-rescue unit.',
      icon: MapPin,
      color: 'text-amber-400',
      border: 'border-amber-500/40',
      bg: 'bg-amber-500/10'
    },
    {
      step: '03',
      title: 'Live GPS SOS Dispatch',
      desc: 'Track your assigned mobile technician or flatbed tow truck on a live interactive map with real-time ETA countdown and direct in-app communication.',
      icon: Navigation,
      color: 'text-rose-400',
      border: 'border-rose-500/40',
      bg: 'bg-rose-500/10'
    },
    {
      step: '04',
      title: 'Digital Invoice & Warranty',
      desc: 'Review transparent itemized parts and labor costs before approving. Every service is backed by a 12-Month / 12,000-Mile Nationwide Peace of Mind Warranty.',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-500/10'
    }
  ];

  return (
    <section className="py-20 bg-navy-950 relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-heading">
            How MECH CONNECT AI Works
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            From the first warning indicator to a fully restored vehicle, here is how our ecosystem empowers drivers.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 flex flex-col justify-between relative group hover:border-cyan-500/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center ${item.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black font-mono text-slate-700 group-hover:text-slate-500 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 font-heading group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-xs font-mono font-bold text-slate-500 group-hover:text-cyan-400 transition-colors">
                  <span>STEP {item.step}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
