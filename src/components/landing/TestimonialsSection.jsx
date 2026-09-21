import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { MOCK_REVIEWS } from '../../services/mockData';

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-navy-900/40 border-t border-slate-800 relative">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-current" />
            Verified Customer Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-heading">
            Trusted by Over 85,000+ Drivers
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            See how MECH CONNECT AI delivers peace of mind during breakdowns and routine maintenance.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="glass-card p-6 flex flex-col justify-between relative hover:border-amber-500/40"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-700" />
                </div>

                <p className="text-sm text-slate-300 italic leading-relaxed mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white">{rev.author}</span>
                    {rev.verified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{rev.role}</p>
                </div>
                <span className="text-[11px] font-mono text-slate-500">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
