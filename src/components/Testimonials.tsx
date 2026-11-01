import React from 'react';
import { Star, Sparkles, Quote, Building2 } from 'lucide-react';
import { CLIENT_TESTIMONIALS } from '../data/packages';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-[#0b1326] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <Star className="w-3.5 h-3.5 fill-emerald-400" />
            <span>4.9 / 5.0 Corporate Rating</span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-4xl text-white tracking-tight">
            Trusted by Ambitious Brands Across India
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Hear from VP of Marketing, People Operations leads, and founders who relied on Tech Aditya Digital for their high-stakes seasonal initiatives.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CLIENT_TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#131b2e] border border-slate-800 p-6 sm:p-7 flex flex-col justify-between hover:border-amber-500/30 transition-all shadow-xl shadow-black/40 relative"
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {t.tag}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-sm text-white">
                    {t.author}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {t.role}
                  </p>
                  <p className="text-[10px] text-amber-400/80 mt-0.5">
                    {t.location}
                  </p>
                </div>
                <Quote className="w-8 h-8 text-slate-700/60 shrink-0" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
