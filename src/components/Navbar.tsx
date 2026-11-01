import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  MessageCircle, 
  Menu, 
  X, 
  PhoneCall, 
  ShieldCheck, 
  ArrowRight,
  Flame
} from 'lucide-react';
import { DEFAULT_WHATSAPP_PHONE, DISPLAY_PHONE, triggerWhatsAppOpen } from '../utils/whatsapp';

interface NavbarProps {
  onOpenWhatsAppModal: () => void;
  onScrollToCalculator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWhatsAppModal, onScrollToCalculator }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuickWhatsApp = () => {
    const text = `Hello Tech Aditya Digital! I am looking for festive corporate hampers and digital marketing solutions. Please share your catalog and bulk pricing.`;
    triggerWhatsAppOpen(text);
  };

  return (
    <>
      {/* Top Festive Announcement Bar */}
      <div className="bg-gradient-to-r from-[#171f33] via-[#222a3d] to-[#171f33] border-b border-amber-500/20 py-2 px-4 text-xs font-medium text-amber-200/90 text-center relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 bg-amber-500/20 text-[#ffc174] px-2 py-0.5 rounded-full text-[11px] font-semibold border border-amber-500/30">
            <Flame className="w-3 h-3 text-amber-400 fill-amber-400 animate-pulse" />
            DIWALI & FESTIVE 2026
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span>Early Bird Corporate Offer: <strong>Flat 15% Extra Off</strong> on Orders 50+ Units</span>
          <span className="hidden sm:inline text-slate-400">• Free Pan-India Delivery</span>
          <button 
            onClick={onScrollToCalculator}
            className="underline hover:text-amber-300 font-semibold text-[#ffc174] ml-1 cursor-pointer transition-colors"
          >
            Calculate Quote →
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0b1326]/90 backdrop-blur-md border-b border-slate-800 shadow-xl shadow-black/40 py-3' 
            : 'bg-[#0b1326]/70 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 border border-amber-400/40 group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-5 h-5 text-slate-950" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0b1326] animate-ping" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0b1326]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                    Tech Aditya
                  </span>
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    DIGITAL
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block tracking-wide">
                  Corporate Gifting & Growth Solutions
                </p>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
              <a href="#packages" className="hover:text-amber-400 transition-colors">
                Festive Packages
              </a>
              <a href="#bulk-calculator" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                <span>Bulk Calculator</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded-full border border-emerald-500/30">
                  Instant
                </span>
              </a>
              <a href="#process" className="hover:text-amber-400 transition-colors">
                How It Works
              </a>
              <a href="#why-us" className="hover:text-amber-400 transition-colors">
                Why Us
              </a>
              <a href="#testimonials" className="hover:text-amber-400 transition-colors">
                Client Reviews
              </a>
              <a href="#faq" className="hover:text-amber-400 transition-colors">
                FAQs
              </a>
            </nav>

            {/* Desktop Right Conversion Action */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="text-right hidden xl:block">
                <div className="text-[11px] text-emerald-400 flex items-center justify-end gap-1 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  WhatsApp Online
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {DISPLAY_PHONE}
                </div>
              </div>

              {/* Primary WhatsApp Order CTA */}
              <button
                onClick={handleQuickWhatsApp}
                className="relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#10b981] hover:bg-[#059669] text-white text-sm font-semibold shadow-lg shadow-emerald-900/30 hover:shadow-emerald-500/30 transition-all duration-200 cursor-pointer active:scale-95 group"
                title="Order directly on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-500" />
                <span>Order on WhatsApp</span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-white opacity-80 group-hover:scale-125 transition-transform"></span>
              </button>

              <button
                onClick={onScrollToCalculator}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 hover:text-amber-200 text-sm font-medium border border-amber-500/30 hover:border-amber-500/60 transition-all cursor-pointer"
              >
                Bulk Quote
              </button>
            </div>

            {/* Mobile Actions: WhatsApp Icon + Hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={handleQuickWhatsApp}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10b981] text-white text-xs font-semibold shadow-md shadow-emerald-900/30 cursor-pointer active:scale-95"
                aria-label="Order on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-500" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0b1326] border-b border-slate-800 px-4 pt-4 pb-6 space-y-3 transition-all animate-in fade-in slide-in-from-top-4">
            <div className="flex flex-col gap-2.5 text-sm font-medium text-slate-300">
              <a 
                href="#packages" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-800/80 hover:text-amber-400 transition-colors"
              >
                Festive Packages Catalog
              </a>
              <a 
                href="#bulk-calculator" 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onScrollToCalculator();
                }}
                className="px-3 py-2 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold flex items-center justify-between"
              >
                <span>Bulk Order Calculator</span>
                <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-200">
                  Tier Discounts
                </span>
              </a>
              <a 
                href="#process" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-800/80 hover:text-amber-400 transition-colors"
              >
                How We Deliver (4 Steps)
              </a>
              <a 
                href="#why-us" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-800/80 hover:text-amber-400 transition-colors"
              >
                Why Tech Aditya Digital
              </a>
              <a 
                href="#testimonials" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-800/80 hover:text-amber-400 transition-colors"
              >
                Corporate Testimonials
              </a>
              <a 
                href="#faq" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-800/80 hover:text-amber-400 transition-colors"
              >
                Frequently Asked Questions
              </a>
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleQuickWhatsApp();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#10b981] hover:bg-[#059669] text-white font-semibold text-sm shadow-lg shadow-emerald-950"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-500" />
                <span>Chat & Order on WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWhatsAppModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Direct WhatsApp Consultation Topics</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
