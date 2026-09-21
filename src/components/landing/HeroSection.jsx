import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  AlertCircle, 
  ShieldCheck, 
  Cpu, 
  Wrench, 
  MapPin, 
  Activity,
  ArrowRight,
  Zap,
  Volume2,
  CheckCircle2
} from 'lucide-react';

export const HeroSection = () => {
  const [symptomQuery, setSymptomQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (symptomQuery.trim()) {
      navigate(`/diagnose?q=${encodeURIComponent(symptomQuery.trim())}`);
    } else {
      navigate('/diagnose');
    }
  };

  const sampleQuickQueries = [
    'Engine sputtering under acceleration',
    'High pitched squeal when braking',
    'OBD Code P0300 Misfire',
    'Check Engine Light flashing',
    '12V battery clicking'
  ];

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-mesh">
      {/* Background light glow orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-40 right-10 w-[400px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Live Telemetry Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-cyan-950/30">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-semibold text-cyan-300 tracking-wide uppercase font-mono">
                MECH CONNECT AI • Next-Gen Automotive Platform
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] font-heading">
              Smart Vehicle Assistance <br className="hidden sm:inline" />
              <span className="text-gradient-cyan">When You Need It Most.</span>
            </h1>

            {/* Tagline & Description */}
            <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <strong className="text-white">Your Vehicle. Our AI. Help When You Need It.</strong><br />
              Diagnose engine issues with acoustic sound & visual AI, get transparent repair quotes, and dispatch emergency roadside mechanics in under 5 minutes.
            </p>

            {/* Interactive Symptom Search Box */}
            <div className="pt-2 max-w-2xl mx-auto lg:mx-0">
              <form
                onSubmit={handleSearchSubmit}
                className="glass-panel p-2 rounded-2xl flex flex-col sm:flex-row items-center gap-2 shadow-2xl border-cyan-500/30 relative group focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all"
              >
                <div className="flex items-center gap-3 px-3 w-full">
                  <Cpu className="w-5 h-5 text-cyan-400 flex-shrink-0 animate-pulse" />
                  <input
                    type="text"
                    value={symptomQuery}
                    onChange={(e) => setSymptomQuery(e.target.value)}
                    placeholder="Describe noise, warning light, or enter OBD code (e.g. P0300, grinding brakes)..."
                    className="w-full bg-transparent border-0 text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:ring-0 py-2 font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto btn-primary-glow px-6 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 flex-shrink-0"
                >
                  <span>AI Diagnose</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Prompt Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-3 text-xs text-slate-400">
                <span className="font-semibold text-slate-400">Try asking:</span>
                {sampleQuickQueries.slice(0, 3).map((query, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSymptomQuery(query);
                      navigate(`/diagnose?q=${encodeURIComponent(query)}`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-700/80 transition-colors"
                  >
                    "{query}"
                  </button>
                ))}
              </div>
            </div>

            {/* Direct CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/sos"
                className="w-full sm:w-auto btn-emergency-glow px-7 py-4 rounded-xl text-base font-black uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-2xl"
              >
                <AlertCircle className="w-5 h-5" />
                1-Tap Emergency SOS Dispatch
              </Link>

              <Link
                to="/mechanics"
                className="w-full sm:w-auto px-6 py-4 rounded-xl text-sm font-bold bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition-all hover:border-cyan-500/40"
              >
                <MapPin className="w-4 h-4 text-cyan-400" />
                Find Nearby Mechanics
              </Link>
            </div>

            {/* Key Trust Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-left">
              <div>
                <p className="text-2xl font-black text-white font-heading">4.2 <span className="text-cyan-400 text-lg">min</span></p>
                <p className="text-xs text-slate-400 font-medium">Avg SOS Response</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white font-heading">98.6<span className="text-emerald-400 text-lg">%</span></p>
                <p className="text-xs text-slate-400 font-medium">AI Triage Accuracy</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white font-heading">1,420<span className="text-amber-400 text-lg">+</span></p>
                <p className="text-xs text-slate-400 font-medium">ASE Certified Pros</p>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Telemetry Card */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Decorative background glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-amber-500/20 rounded-3xl blur-2xl -z-10" />

              {/* Main Futuristic Telemetry Card */}
              <div className="glass-panel-glow rounded-3xl p-6 sm:p-7 space-y-5 border-cyan-500/40">
                {/* Header with live pulse */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Activity className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-heading">AI Vehicle Health Hub</h4>
                      <p className="text-xs text-cyan-400 font-mono">Live Telemetry Active</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
                    94% HEALTH
                  </span>
                </div>

                {/* Simulated Vehicle Graphic */}
                <div className="relative rounded-2xl overflow-hidden bg-navy-950 border border-slate-800 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-left">
                      <p className="text-xs text-slate-400 uppercase font-mono">Connected Vehicle</p>
                      <p className="text-sm font-bold text-white">2023 Tesla Model Y AWD</p>
                    </div>
                    <span className="text-xs font-mono text-slate-400">VIN: 5YJ3E1...928</span>
                  </div>

                  {/* Acoustic Sound Spectrum Simulation */}
                  <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <div className="flex items-center gap-1.5 text-cyan-400 font-mono">
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Acoustic Engine Stream</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">2.4 kHz Clean</span>
                    </div>
                    <div className="flex items-center justify-between h-8 gap-1 px-1">
                      {[15, 30, 60, 45, 80, 55, 90, 75, 40, 25, 65, 85, 95, 70, 50, 30, 45, 80, 60, 35].map((val, i) => (
                        <div
                          key={i}
                          className="w-1 bg-cyan-400/80 rounded-full transition-all duration-300"
                          style={{
                            height: `${Math.max(10, (val + (i % 3) * 10) % 100)}%`,
                            backgroundColor: i === 12 ? '#38BDF8' : '#0284C7'
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Component Health Bars */}
                  <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                    <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Brake Pad Life</span>
                        <strong className="text-emerald-400 font-mono">88%</strong>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>

                    <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>12V Battery</span>
                        <strong className="text-cyan-400 font-mono">98%</strong>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-cyan-400 h-full rounded-full" style={{ width: '98%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instant Action Prompt */}
                <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs text-slate-200">
                    <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>No active critical error codes detected.</span>
                  </div>
                  <Link
                    to="/diagnose"
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                  >
                    Run Full Scan →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
