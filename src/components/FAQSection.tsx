import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { triggerWhatsAppOpen } from '../utils/whatsapp';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the minimum order quantity (MOQ) for corporate hampers?',
      a: 'Our standard hamper curations have flexible minimum order quantities starting from just 15 to 25 units. For digital marketing packages, single campaigns are available. For orders above 250 units, you unlock our maximum 25% volume discount along with 100% complimentary custom logo gold foil stamping.'
    },
    {
      q: 'Can our company order a sample box to verify quality before placing a bulk order?',
      a: 'Yes, absolutely! We understand that corporate procurement teams need to evaluate quality, fragrance, packaging texture, and taste. You can order a single sample box with your logo printed. Click "Order on WhatsApp" or message our team to request a sample box dispatched within 24 hours.'
    },
    {
      q: 'How does custom logo branding work?',
      a: 'Simply provide your company logo vector file (AI, EPS, SVG, or high-res PNG). Our design studio renders a 3D digital mockup within 2 hours showing how your logo will look in metallic gold foil stamping or precision laser engraving. Once your leadership approves the proof, bulk production starts immediately.'
    },
    {
      q: 'Can you deliver individually to remote employees across multiple cities?',
      a: 'Yes. We specialize in multi-city remote employee distribution. Simply provide a secure spreadsheet of employee addresses and contact numbers. We coordinate door-to-door delivery with live courier tracking updates shared directly with your HR/admin team.'
    },
    {
      q: 'What are the payment terms and do you provide GST invoices?',
      a: 'All bulk orders come with formal 18% GST tax invoices so your enterprise can claim full Input Tax Credit (ITC). We accept direct NEFT/RTGS bank transfers, corporate cards, and UPI. For verified enterprise clients, structured milestone terms (50% advance, 50% upon dispatch) are readily available.'
    },
    {
      q: 'Can we combine festive gifting with a digital marketing campaign?',
      a: 'Yes! That is our signature advantage. As Tech Aditya Digital, we uniquely combine tangible luxury hampers for high-value clients with high-performing festive social media ads, WhatsApp automation bots, and influencer campaigns to maximize your Q4 revenue.'
    }
  ];

  const handleCustomQuestion = () => {
    const text = `Hello Tech Aditya Digital! I have a question regarding bulk orders and corporate customization that isn't listed in the FAQ. Could you please assist me?`;
    triggerWhatsAppOpen(text);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#0e1628] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-4xl text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Everything you need to know about corporate festive curations, custom foil branding, and delivery timelines.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className="rounded-xl bg-[#131b2e] border border-slate-800 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                >
                  <span className="font-heading font-semibold text-sm sm:text-base text-slate-100">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-800 text-amber-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Support Box */}
        <div className="mt-10 p-5 rounded-2xl bg-[#131b2e] border border-amber-500/20 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-heading font-bold text-base text-white">
              Still have a specific procurement or branding question?
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Chat live with our corporate concierge on WhatsApp for immediate answers.
            </p>
          </div>
          <button
            onClick={handleCustomQuestion}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white text-xs sm:text-sm font-semibold shadow-md shadow-emerald-950 transition-all cursor-pointer whitespace-nowrap active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-500" />
            <span>Ask on WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
};
