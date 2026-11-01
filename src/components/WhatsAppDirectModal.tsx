import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  Sparkles, 
  Send, 
  PhoneCall, 
  Clock, 
  ShieldCheck, 
  Box, 
  Flame, 
  Palette 
} from 'lucide-react';
import { triggerWhatsAppOpen, DISPLAY_PHONE, OFFICIAL_EMAIL } from '../utils/whatsapp';

interface WhatsAppDirectModalProps {
  onClose: () => void;
}

export const WhatsAppDirectModal: React.FC<WhatsAppDirectModalProps> = ({ onClose }) => {
  const [customMsg, setCustomMsg] = useState('');

  const quickTopics = [
    {
      title: 'Request Corporate Sample Box',
      desc: 'Get a sample hamper box with your logo delivered to your office',
      icon: Box,
      message: 'Hello Aditya! We would like to request an official corporate sample box with our company logo before confirming a 100+ bulk hamper order.'
    },
    {
      title: 'Urgent 48-Hour Festive Dispatch',
      desc: 'Need hampers delivered fast? Check priority production availability',
      icon: Flame,
      message: 'Hello Tech Aditya Digital! We have an urgent festive requirement needing delivery within 5 business days. Please share rush production availability.'
    },
    {
      title: 'Custom Foil / Laser Logo Mockup',
      desc: 'Send your logo and get a photorealistic 3D proof in 2 hours',
      icon: Palette,
      message: 'Hello team! I would like a complimentary 3D digital mockup of our company logo on your VIP Executive hamper box.'
    },
    {
      title: 'Digital Marketing & Ads Campaign',
      desc: 'Launch festive Meta/Google ads and WhatsApp funnels',
      icon: Sparkles,
      message: 'Hello Tech Aditya Digital! I am interested in your Festive Growth Digital Bundle to scale our online brand sales this festive season.'
    }
  ];

  const handleLaunchTopic = (messageText: string) => {
    triggerWhatsAppOpen(messageText);
    onClose();
  };

  const handleLaunchCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMsg = customMsg.trim() || 'Hello Tech Aditya Digital! I am interested in your corporate festive services and bulk hampers.';
    triggerWhatsAppOpen(finalMsg);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0f172a] border border-emerald-500/40 p-5 sm:p-7 shadow-2xl text-slate-200 overflow-hidden">
        
        {/* Ambient emerald backlight */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 fill-emerald-400 text-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-bold text-lg text-white">
                Tech Aditya WhatsApp Desk
              </h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold border border-emerald-500/30">
                Online
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Direct Corporate Concierge • Avg. Reply &lt; 5 Mins
            </p>
          </div>
        </div>

        {/* Quick Topics */}
        <div className="space-y-2.5 mb-5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Select an Instant Inquiry Topic:
          </span>

          {quickTopics.map((topic, i) => {
            const Icon = topic.icon;
            return (
              <button
                key={i}
                onClick={() => handleLaunchTopic(topic.message)}
                className="w-full text-left p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex items-start gap-3 cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-slate-800 text-amber-400 group-hover:scale-105 transition-transform shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {topic.title}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {topic.desc}
                  </div>
                </div>
                <span className="text-xs text-emerald-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Chat →
                </span>
              </button>
            );
          })}
        </div>

        {/* Custom Message Field */}
        <form onSubmit={handleLaunchCustom} className="space-y-3 pt-2 border-t border-slate-800">
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Or Type Your Custom Message:
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Need 150 VIP boxes delivered to Mumbai by 8th Nov..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-950 transition-all cursor-pointer active:scale-98"
          >
            <Send className="w-4 h-4" />
            <span>Open in WhatsApp Now</span>
          </button>
        </form>

        {/* Footer note */}
        <div className="mt-4 text-center text-[11px] text-slate-500">
          Official Support: <span className="text-slate-400">{DISPLAY_PHONE}</span> • {OFFICIAL_EMAIL}
        </div>

      </div>
    </div>
  );
};
