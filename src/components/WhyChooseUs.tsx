import React from 'react';
import { 
  Sparkles, 
  Award, 
  Truck, 
  Clock, 
  ShieldCheck, 
  Coins, 
  Headphones, 
  Flame,
  CheckCircle2
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const perks = [
    {
      icon: Award,
      title: 'Artisanal Luxury & Zero Compromise',
      desc: 'Solid pure brass diyas, premium Grade-A dry fruits, and bespoke rigid velvet-touch packaging that leaves an indelible brand impression.',
      tag: 'Premium Quality'
    },
    {
      icon: Clock,
      title: '2-Hour 3D Digital Mockup',
      desc: 'Don’t wait days to visualize your gift. Send your logo vector and receive photorealistic mockups on WhatsApp in under 2 hours.',
      tag: 'Rapid Turnaround'
    },
    {
      icon: Truck,
      title: 'Multi-City Remote Employee Split Shipping',
      desc: 'Send us an excel sheet of your remote team addresses; we handle packaging, personalized notes, and door-to-door delivery with tracking.',
      tag: 'Pan-India Reach'
    },
    {
      icon: Headphones,
      title: 'Dedicated WhatsApp Corporate Concierge',
      desc: 'No automated ticket queues. You get a direct senior account director on WhatsApp to handle logistics, changes, and queries.',
      tag: '1-on-1 Support'
    },
    {
      icon: Coins,
      title: 'Transparent Pricing & GST Invoicing',
      desc: '100% compliant B2B tax invoices with full 18% Input Tax Credit (ITC). Flexible corporate purchase orders and net payment options.',
      tag: 'GST Compliant'
    },
    {
      icon: Flame,
      title: 'Hybrid Gifting + Digital Growth',
      desc: 'We are a premier digital marketing agency. Pair your physical executive gifting with viral festive social media ads and lead generation funnels.',
      tag: 'Growth Advantage'
    }
  ];

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-[#0e1628] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>The Tech Aditya Digital Advantage</span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-4xl text-white tracking-tight">
            Why India’s Top Founders & Enterprises Trust Us
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            We bridge luxury craftsmanship with digital performance, providing a unified solution that commands respect and drives revenue.
          </p>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#131b2e] border border-slate-800 p-6 sm:p-7 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {perk.tag}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-white mb-2">
                    {perk.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {perk.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Verified Corporate Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
