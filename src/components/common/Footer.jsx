import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Cpu, 
  Wrench, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Award
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-navy-950 relative overflow-hidden">
      {/* Glow background accent */}
      <div className="absolute top-0 left-1/4 w-96 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Emergency Hotline Banner */}
      <div className="border-b border-slate-800 bg-gradient-to-r from-navy-900 via-slate-900 to-navy-900 py-8">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 flex-shrink-0 animate-pulse">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white font-heading">
                Stranded on the road right now?
              </h4>
              <p className="text-sm text-slate-400">
                1-Tap AI Emergency Dispatch coordinates nearby mobile units with 4.2 min avg arrival.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/sos"
              className="btn-emergency-glow px-6 py-3 rounded-xl text-sm font-black uppercase tracking-wider flex items-center gap-2"
            >
              Request 1-Tap SOS
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" showTagline={true} />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The next-generation AI vehicle diagnostics & real-time emergency mechanic dispatch ecosystem. Bridging the gap between smart vehicle telemetry and trusted certified technicians.
            </p>

            {/* Trust Badges */}
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-900 border border-slate-700 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                ASE Certified Network
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-900 border border-slate-700 text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                EV & Hybrid Ready
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-900 border border-slate-700 text-slate-300">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                Price Transparency Guarantee
              </span>
            </div>
          </div>

          {/* Col 2: For Drivers */}
          <div>
            <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading">
              For Drivers
            </h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/diagnose" className="hover:text-cyan-400 transition-colors">
                  Acoustic Engine Sound AI
                </Link>
              </li>
              <li>
                <Link to="/diagnose" className="hover:text-cyan-400 transition-colors">
                  Warning Light Scanner
                </Link>
              </li>
              <li>
                <Link to="/diagnose" className="hover:text-cyan-400 transition-colors">
                  OBD-II DTC Code Lookup
                </Link>
              </li>
              <li>
                <Link to="/sos" className="hover:text-rose-400 transition-colors font-medium">
                  Emergency Roadside SOS
                </Link>
              </li>
              <li>
                <Link to="/mechanics" className="hover:text-cyan-400 transition-colors">
                  Find Verified Mechanics
                </Link>
              </li>
              <li>
                <Link to="/cost-estimator" className="hover:text-cyan-400 transition-colors">
                  Repair Cost Estimator
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">
                  My Digital Garage
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: For Mechanics & Partners */}
          <div>
            <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading">
              Mechanic Partners
            </h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/partner-portal" className="hover:text-amber-400 transition-colors">
                  Partner Radar Portal
                </Link>
              </li>
              <li>
                <Link to="/partner-portal" className="hover:text-amber-400 transition-colors">
                  Incoming SOS Live Dispatch
                </Link>
              </li>
              <li>
                <Link to="/partner-portal" className="hover:text-amber-400 transition-colors">
                  Shop Management & Invoicing
                </Link>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">
                  Fleet Diagnostics API (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">
                  OEM Telemetry Integrations
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter / Recall Alerts */}
          <div>
            <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading">
              Vehicle Health Alerts
            </h5>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Get AI safety recall alerts, preventive maintenance tips, and regional roadside bulletins.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Mech Connect AI safety bulletins!'); }} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full glass-input px-3.5 py-2 rounded-lg text-xs"
              />
              <button
                type="submit"
                className="w-full btn-primary-glow py-2 rounded-lg text-xs font-bold uppercase tracking-wider"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            <span>All AI Diagnostic & GPS Telemetry Systems Operational</span>
          </div>
          <p>© {new Date().getFullYear()} MECH CONNECT AI Technologies Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#security" className="hover:text-slate-400 transition-colors">Safety Standard</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
