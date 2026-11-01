import React from 'react';
import { MessageCircle, Calculator, Sparkles } from 'lucide-react';
import { triggerWhatsAppOpen } from '../utils/whatsapp';

interface MobileStickyBarProps {
  onScrollToCalculator: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onScrollToCalculator }) => {
  const handleQuickWhatsApp = () => {
    const text = `🌟 Hello Tech Aditya Digital! I'm browsing your festive corporate catalog on my phone and would like to order or inquire about customized hampers.`;
    triggerWhatsAppOpen(text);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0b1326]/95 backdrop-blur-lg border-t border-slate-800 p-2.5 sm:hidden shadow-2xl">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        
        {/* Bulk Calculator Quick Jump */}
        <button
          onClick={onScrollToCalculator}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-slate-800 text-amber-300 font-semibold text-xs border border-amber-500/30 active:scale-95 transition-transform"
        >
          <Calculator className="w-4 h-4 text-amber-400" />
          <span>Bulk Calculator</span>
        </button>

        {/* Primary WhatsApp Direct Order */}
        <button
          onClick={handleQuickWhatsApp}
          className="flex-[1.3] flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#10b981] text-white font-semibold text-xs shadow-lg shadow-emerald-950 active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4 fill-white text-emerald-500" />
          <span>Order on WhatsApp</span>
        </button>

      </div>
    </div>
  );
};
