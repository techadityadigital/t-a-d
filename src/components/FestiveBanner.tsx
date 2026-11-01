import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, Flame, Gift, ArrowRight, MessageCircle } from 'lucide-react';
import { triggerWhatsAppOpen } from '../utils/whatsapp';

export const FestiveBanner: React.FC = () => {
  // Simple countdown to festive dispatch cut-off
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClaimOffer = () => {
    const text = `🎉 Hello Tech Aditya Digital! I want to claim the Early-Bird Corporate Festive Offer (Free Metallic Foil Logo Branding + Flat 15% Bulk Benefit). Please share catalog details.`;
    triggerWhatsAppOpen(text);
  };

  return (
    <section className="py-6 sm:py-8 bg-[#0b1326] relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-2xl bg-gradient-to-r from-[#171f33] via-[#222a3d] to-[#171f33] border border-amber-500/30 p-5 sm:p-7 shadow-2xl overflow-hidden">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-80 h-40 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 w-80 h-40 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Offer Left Text */}
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Flame className="w-4 h-4 fill-amber-400" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Priority Festive Production Slot
                </span>
              </div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white tracking-tight">
                Early-Bird Corporate Booking: Complimentary Metallic Logo Stamping
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Lock in guaranteed pre-Diwali delivery dates before factory capacity closes. Applicable on all bulk hamper orders placed this week.
              </p>
            </div>

            {/* Countdown Timer + WhatsApp Claim CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 shrink-0">
              
              {/* Countdown Digits */}
              <div className="flex items-center gap-2 text-center">
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl px-2.5 py-2 min-w-[50px]">
                  <span className="font-heading font-bold text-lg sm:text-xl text-amber-400 block font-mono">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase">Days</span>
                </div>
                <span className="text-amber-500 font-bold">:</span>
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl px-2.5 py-2 min-w-[50px]">
                  <span className="font-heading font-bold text-lg sm:text-xl text-amber-400 block font-mono">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase">Hours</span>
                </div>
                <span className="text-amber-500 font-bold">:</span>
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl px-2.5 py-2 min-w-[50px]">
                  <span className="font-heading font-bold text-lg sm:text-xl text-amber-400 block font-mono">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase">Mins</span>
                </div>
                <span className="text-amber-500 font-bold">:</span>
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl px-2.5 py-2 min-w-[50px]">
                  <span className="font-heading font-bold text-lg sm:text-xl text-[#ffc174] block font-mono">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase">Secs</span>
                </div>
              </div>

              {/* Claim Button */}
              <button
                onClick={handleClaimOffer}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-950 transition-all cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-500" />
                <span>Claim Offer on WhatsApp</span>
              </button>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
