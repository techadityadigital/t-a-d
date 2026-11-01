import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { triggerWhatsAppOpen, DISPLAY_PHONE } from '../utils/whatsapp';

interface FloatingWhatsAppFABProps {
  onOpenModal: () => void;
}

export const FloatingWhatsAppFAB: React.FC<FloatingWhatsAppFABProps> = ({ onOpenModal }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    // Open quick modal or direct chat
    onOpenModal();
  };

  return (
    <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-40 flex items-center gap-3">
      
      {/* Floating Prompt Pill (Visible on desktop or when hovering) */}
      <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#131b2e]/95 border border-emerald-500/40 text-slate-200 text-xs shadow-xl backdrop-blur-md animate-bounce">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="font-semibold text-emerald-400">Order on WhatsApp</span>
        <span className="text-slate-400">| Instant reply</span>
      </div>

      {/* FAB Button with Persistent Pulse */}
      <div className="relative group">
        {/* Animated Outer Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-60 blur-sm animate-ping pointer-events-none" />
        <span className="absolute -inset-1.5 rounded-full bg-emerald-400/30 animate-pulse pointer-events-none" />

        <button
          onClick={handleClick}
          className="relative w-14 h-14 rounded-full bg-[#10b981] hover:bg-[#059669] text-white flex items-center justify-center shadow-2xl shadow-emerald-950/80 hover:scale-108 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-emerald-300/40"
          aria-label="Direct WhatsApp Order and Consultation"
          title="Direct WhatsApp Order and Consultation"
        >
          <MessageCircle className="w-7 h-7 fill-white text-emerald-600" />
          
          {/* Online status badge on top right of button */}
          <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-amber-400 border-2 border-[#0b1326] flex items-center justify-center text-[8px] font-bold text-slate-950">
            1
          </span>
        </button>
      </div>

    </div>
  );
};
