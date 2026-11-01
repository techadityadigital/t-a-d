import React from 'react';
import { 
  Sparkles, 
  MessageCircle, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  Award, 
  Flame, 
  Building2,
  Clock,
  Layers
} from 'lucide-react';
import { triggerWhatsAppOpen, DISPLAY_PHONE } from '../utils/whatsapp';

interface HeroProps {
  onScrollToCalculator: () => void;
  onScrollToPackages: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToCalculator, onScrollToPackages }) => {
  const handleHeroWhatsApp = () => {
    const text = `🌟 Hello Tech Aditya Digital! I saw your Festive Corporate & Digital Gifting catalog. I would like to explore options for our team and clients. Could you please assist me with custom branding and volume discounts?`;
    triggerWhatsAppOpen(text);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[350px] bg-gradient-to-tr from-amber-600/15 via-amber-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Floating Festive Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/15 via-amber-500/20 to-amber-600/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium shadow-lg shadow-amber-500/10 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="font-semibold text-amber-200">Diwali & Festive 2026 Collection</span>
            <span className="text-amber-400/60">•</span>
            <span className="text-slate-300 hidden sm:inline">Custom Laser Logo Foil & Pan-India Dispatch</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.15]">
            Elevate Your Brand This Festive Season With{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffc174] via-[#f59e0b] to-[#fbbf24] drop-shadow-[0_2px_15px_rgba(245,158,11,0.3)]">
              Luxury Corporate Hampers
            </span>{' '}
            & High-Impact Digital Growth
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Bespoke Diwali curations, laser-engraved corporate gift sets, and 360° festive digital marketing blitzes tailored for ambitious founders, enterprise leaders, and growing brands.
          </p>

          {/* Action Buttons: Order on WhatsApp & Bulk Order Configurator */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            {/* Conversion: Order on WhatsApp */}
            <button
              onClick={handleHeroWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white font-semibold text-base shadow-xl shadow-emerald-950/60 hover:shadow-emerald-500/30 transition-all duration-200 cursor-pointer active:scale-98 group"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              </div>
              <span className="tracking-wide">Order on WhatsApp</span>
              <span className="text-xs bg-emerald-700/60 px-2 py-0.5 rounded-md border border-emerald-400/30">
                Fast Reply
              </span>
            </button>

            {/* Primary Action: Bulk Order Form */}
            <button
              onClick={onScrollToCalculator}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-amber-300 font-semibold text-base border border-amber-500/30 hover:border-amber-400 shadow-lg shadow-black/40 transition-all duration-200 cursor-pointer group"
            >
              <Sparkles className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>Configure Bulk Order</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Quick Micro-Perks / Trust Signals */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Complimentary Logo Foil Stamping</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Pan-India Doorstep Dispatch</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>GST Compliant Invoicing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Sample Box on Request</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Visual Showcase Card */}
        <div className="mt-12 lg:mt-16 max-w-5xl mx-auto">
          <div className="relative rounded-2xl glass-panel p-4 sm:p-7 shadow-2xl shadow-black/60 border border-white/10 overflow-hidden">
            
            {/* Top Amber Ambient Highlight */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-24 bg-amber-500/20 blur-2xl rounded-full pointer-events-none" />

            {/* Quick Header Inside Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-700/60 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    Festive 2026 Executive Curation Spotlight
                  </h3>
                  <p className="text-xs text-slate-400">
                    Handcrafted luxury brass, gourmet treats & high-speed productivity gear
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Now Accepting Bulk Bookings
                </span>
                <button
                  onClick={onScrollToPackages}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 cursor-pointer"
                >
                  View All 6 Packages →
                </button>
              </div>
            </div>

            {/* 3 Value Pillars Inside the Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              
              {/* Feature 1 */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all duration-200">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold">
                    01
                  </div>
                  <h4 className="font-heading font-semibold text-sm text-slate-200">
                    VIP Executive Hampers
                  </h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Solid brass diyas, Mamra almonds, laser-engraved bamboo powerbanks, and rigid velvet presentation boxes.
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-amber-400/90 pt-2 border-t border-slate-800">
                  <span>MOQ: 15 Units</span>
                  <span className="font-semibold">From ₹1,450/unit</span>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 transition-all duration-200">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">
                    02
                  </div>
                  <h4 className="font-heading font-semibold text-sm text-slate-200">
                    Festive Digital Growth
                  </h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  High-converting Meta & Google ad funnels, 15 viral motion reels, and automated WhatsApp lead broadcast engines.
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-emerald-400/90 pt-2 border-t border-slate-800">
                  <span>Fast 48h Kickoff</span>
                  <span className="font-semibold">5.2x Avg. RoAS</span>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/40 transition-all duration-200">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                    03
                  </div>
                  <h4 className="font-heading font-semibold text-sm text-slate-200">
                    Bespoke Brand Laser Foil
                  </h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We render 3D logo digital mockups within 2 hours. Gold foil stamping, custom sleeves, and personalized leadership notes.
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-blue-400/90 pt-2 border-t border-slate-800">
                  <span>Zero Set-up Fees</span>
                  <span className="font-semibold">Free Mockup</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Statistical Metrics Callout Bar (Space Grotesk) */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 sm:p-5 rounded-xl bg-[#131b2e] border border-slate-800/90 text-center hover:border-amber-500/30 transition-colors">
            <div className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#ffc174] tracking-tight">
              10,000+
            </div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
              Festive Hampers Delivered
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-[#131b2e] border border-slate-800/90 text-center hover:border-emerald-500/30 transition-colors">
            <div className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#4edea3] tracking-tight">
              99.4%
            </div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
              On-Time Pan-India Arrival
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-[#131b2e] border border-slate-800/90 text-center hover:border-blue-500/30 transition-colors">
            <div className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#b6ccff] tracking-tight">
              500+
            </div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
              Enterprise & Brand Clients
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-[#131b2e] border border-slate-800/90 text-center hover:border-amber-500/30 transition-colors">
            <div className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#ffc174] tracking-tight">
              4.9 / 5.0
            </div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
              Corporate Client Satisfaction
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
