import React from 'react';
import { Sparkles, MessageCircle, Mail, Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { DISPLAY_PHONE, OFFICIAL_EMAIL, triggerWhatsAppOpen } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  const handleFooterWhatsApp = () => {
    triggerWhatsAppOpen('Hello Tech Aditya Digital! I would like to get in touch regarding your festive corporate services.');
  };

  return (
    <footer className="bg-[#070d1a] border-t border-slate-800 text-slate-400 text-xs pt-16 pb-24 sm:pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-heading font-bold text-lg text-white">
                Tech Aditya Digital
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              India’s premier corporate festive gifting and high-impact digital performance agency. Delivering luxury handcrafted hampers, custom laser logo branding, and high-RoAS festive growth campaigns.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleFooterWhatsApp}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#10b981] hover:bg-[#059669] text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-500" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Festive Curations
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#packages" className="hover:text-amber-400 transition-colors">
                  VIP Executive Hampers
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-amber-400 transition-colors">
                  Festive Gourmet Boxes
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-amber-400 transition-colors">
                  Eco-Conscious Kits
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-amber-400 transition-colors">
                  Digital Growth Bundles
                </a>
              </li>
              <li>
                <a href="#bulk-calculator" className="hover:text-amber-400 transition-colors">
                  Bulk Order Estimator
                </a>
              </li>
            </ul>
          </div>

          {/* Corporate Assurance */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Enterprise Assurance
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% On-Time Guarantee</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>18% GST Compliant B2B</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>2-Hour 3D Logo Proof</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Multi-City Remote Dropship</span>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Corporate Desk
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{DISPLAY_PHONE}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{OFFICIAL_EMAIL}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>Pan-India Logistics Hubs: Bengaluru • Mumbai • Delhi-NCR</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Tech Aditya Digital. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Diwali & Festive Corporate Specialist</span>
            <span>•</span>
            <span>Terms of Procurement</span>
            <span>•</span>
            <span>Privacy Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
