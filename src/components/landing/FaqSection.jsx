import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How accurate is the AI Acoustic Sound and Warning Light Diagnosis?',
      a: 'Our AI model is trained on over 3.2 million automotive acoustic waveforms and OBD-II telemetry records across 45+ manufacturers. In benchmark testing, the acoustic engine isolates common mechanical faults (such as rod knocks, squealing serpentine belts, worn brake rotors, and bad wheel bearings) with a 98.6% validated accuracy.'
    },
    {
      q: 'How does 1-Tap Emergency Roadside SOS work?',
      a: 'When you tap Emergency SOS, our system automatically retrieves your high-precision GPS coordinates, matches your breakdown type (e.g. flat tyre, jumpstart, flatbed tow), and broadcasts a priority radar dispatch to all certified mobile units and tow trucks within a 15-mile radius. You can watch your assigned driver approach on a live real-time map with an exact ETA countdown.'
    },
    {
      q: 'Are the mechanics and garages vetted and certified?',
      a: 'Yes. Every service center and mobile operator in the MECH CONNECT AI network must hold valid ASE (Automotive Service Excellence) certifications, carry comprehensive liability insurance, and pass quarterly customer satisfaction audits. We also verify EV/Hybrid safety certifications for high-voltage vehicles.'
    },
    {
      q: 'How do you guarantee fair and transparent pricing?',
      a: 'Before any technician touches your vehicle, you receive an itemized digital breakdown separating OEM parts costs from standard book-rate labor hours. Mechanics on our platform agree to adhere to transparent standardized pricing, eliminating surprise upsells or arbitrary labor markups.'
    },
    {
      q: 'Can I use MECH CONNECT AI for Electric Vehicles (EVs) and Hybrids?',
      a: 'Absolutely! Our diagnostic engine and partner network feature specialized support for Tesla, Rivian, Lucid, Toyota/Lexus Hybrids, Hyundai/Kia Ioniq, and German EVs. We provide high-voltage battery health estimates, inverter diagnostics, and low-clearance flatbed towing.'
    }
  ];

  return (
    <section className="py-20 bg-navy-900/60 border-t border-slate-800 relative">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-heading">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-slate-400 text-base">
            Everything you need to know about our AI diagnostics, roadside response, and mechanics.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border transition-all overflow-hidden ${
                openIdx === idx
                  ? 'bg-slate-900/90 border-cyan-500/50 shadow-lg shadow-cyan-950/40'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4"
              >
                <span className="text-base font-bold text-white font-heading">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-cyan-400 flex-shrink-0 transition-transform duration-200 ${
                    openIdx === idx ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              {openIdx === idx && (
                <div className="px-5 pb-5 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
