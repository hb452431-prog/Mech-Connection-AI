import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  ShieldCheck, 
  Wrench, 
  Clock, 
  ArrowRight, 
  Navigation,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { MOCK_MECHANICS } from '../../services/mockData';

export const MechanicsMapPreview = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMechanic, setSelectedMechanic] = useState(MOCK_MECHANICS[0]);

  const filteredMechanics = MOCK_MECHANICS.filter((mech) => {
    if (activeFilter === 'ev') return mech.specialties.some((s) => s.toLowerCase().includes('ev') || s.toLowerCase().includes('tesla') || s.toLowerCase().includes('hybrid'));
    if (activeFilter === 'mobile') return mech.isMobileUnit;
    if (activeFilter === '247') return mech.isOpen247;
    return true;
  });

  return (
    <section className="py-20 bg-navy-950 border-t border-slate-800 relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              Verified Local Technicians
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-heading">
              Find Certified Mechanics Nearby
            </h2>
            <p className="text-slate-400 text-base">
              Every workshop and mobile technician on MECH CONNECT AI undergoes strict ASE master validation, background verification, and fair-pricing audits.
            </p>
          </div>

          {/* Specialty Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Specialists' },
              { id: 'ev', label: 'EV & Hybrid' },
              { id: 'mobile', label: 'Mobile Units' },
              { id: '247', label: 'Open 24/7' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeFilter === f.id
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Layout: Mechanics Cards + Radar Preview Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* List of Mechanics */}
          <div className="lg:col-span-7 space-y-4">
            {filteredMechanics.slice(0, 3).map((mech) => (
              <div
                key={mech.id}
                onClick={() => setSelectedMechanic(mech)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  selectedMechanic?.id === mech.id
                    ? 'bg-slate-900/90 border-cyan-500/60 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={mech.image}
                      alt={mech.name}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-700 flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-base font-bold text-white font-heading">{mech.name}</h4>
                        {mech.verifiedBadge && (
                          <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mb-2">{mech.address}</p>

                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{mech.rating}</span>
                          <span className="text-slate-400 font-normal">({mech.reviewCount})</span>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-cyan-300 font-mono bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/20">
                          <Navigation className="w-3 h-3" />
                          <span>{mech.distanceKm} km away</span>
                        </div>

                        {mech.isOpen247 && (
                          <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            24/7 Service
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="sm:text-right w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800 flex sm:flex-col justify-between items-center sm:items-end">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-500 block">Rate</span>
                      <span className="text-base font-bold text-white font-mono">${mech.hourlyRate}/hr</span>
                    </div>

                    <Link
                      to={`/mechanics?selected=${mech.id}`}
                      className="btn-primary-glow px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1 mt-2"
                    >
                      Book Slot
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Specialties tags */}
                <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {mech.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-2 text-center sm:text-left">
              <Link
                to="/mechanics"
                className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 font-mono"
              >
                <span>View all 48 nearby mechanics on interactive map</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Selected Mechanic Highlights Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel-glow rounded-3xl p-6 h-full flex flex-col justify-between border-cyan-500/30">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                      Specialist Spotlight
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">ID: {selectedMechanic.id}</span>
                </div>

                <div className="relative rounded-2xl overflow-hidden h-44">
                  <img
                    src={selectedMechanic.image}
                    alt={selectedMechanic.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white font-heading">{selectedMechanic.name}</h4>
                      <p className="text-xs text-slate-300">{selectedMechanic.owner}</p>
                    </div>
                  </div>
                </div>

                {/* Certifications List */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Verified Certifications:
                  </p>
                  <div className="space-y-1.5">
                    {selectedMechanic.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Services Menu */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Sample Instant Service Menu:
                  </p>
                  <div className="space-y-1.5">
                    {selectedMechanic.services.slice(0, 3).map((srv, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs"
                      >
                        <span className="text-slate-300 font-medium">{srv.name}</span>
                        <span className="text-cyan-400 font-bold font-mono">${srv.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800">
                <Link
                  to={`/mechanics?selected=${selectedMechanic.id}&book=true`}
                  className="w-full btn-primary-glow py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  Schedule Appointment with {selectedMechanic.name.split(' ')[0]}
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

export default MechanicsMapPreview;
