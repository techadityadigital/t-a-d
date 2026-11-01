import React from 'react';
import { Sparkles, Palette, CheckCircle2, Truck, ArrowRight, ShieldCheck, Box } from 'lucide-react';
import { triggerWhatsAppOpen } from '../utils/whatsapp';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Select & Customize Curation',
      desc: 'Choose from our luxury VIP brass hampers or digital marketing bundles. Choose your desired quantity tier and add-ons.',
      icon: Box,
      color: 'amber'
    },
    {
      step: '02',
      title: '2-Hour 3D Logo Mockup',
      desc: 'Send us your company logo vector via WhatsApp or email. Our design studio renders a photorealistic 3D proof before production.',
      icon: Palette,
      color: 'emerald'
    },
    {
      step: '03',
      title: 'Handcrafted Production',
      desc: 'Precision laser engraving, hot metallic gold foil stamping, and rigorous quality inspection of all artisanal gourmet items.',
      icon: CheckCircle2,
      color: 'blue'
    },
    {
      step: '04',
      title: 'Pan-India Insured Dispatch',
      desc: 'Direct bulk dispatch to your corporate headquarters or multi-city split shipments directly to individual employee doorsteps.',
      icon: Truck,
      color: 'amber'
    }
  ];

  const handleRequestSample = () => {
    const text = `📦 Hello Tech Aditya Digital! We would like to inspect a physical sample box before finalizing our company bulk festive order. Could you explain the sample kit dispatch process?`;
    triggerWhatsAppOpen(text);
  };

  return (
    <section id="process" className="py-16 sm:py-20 bg-[#0b1326] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Seamless Procurement</span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-4xl text-white tracking-tight">
            From Digital Approval to Doorstep in 4 Steps
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Engineered for corporate peace of mind. We take care of logistics, custom branding, and quality assurance.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="relative rounded-2xl bg-[#131b2e] border border-slate-800 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 group"
              >
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading font-bold text-3xl text-slate-700 group-hover:text-amber-500/40 transition-colors">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center text-[11px] font-semibold text-amber-400/90">
                  <span>Guaranteed On-Schedule</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sample Kit Box CTA */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#131b2e] to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-white">
                Want to touch and feel the craftsmanship first?
              </h4>
              <p className="text-xs text-slate-400">
                Order a discounted single sample box with your company logo proof before placing 50+ units.
              </p>
            </div>
          </div>

          <button
            onClick={handleRequestSample}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold border border-amber-500/30 hover:border-amber-400 transition-all cursor-pointer whitespace-nowrap"
          >
            Request Corporate Sample Kit →
          </button>
        </div>

      </div>
    </section>
  );
};
