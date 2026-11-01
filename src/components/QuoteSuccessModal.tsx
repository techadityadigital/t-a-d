import React, { useState } from 'react';
import { 
  CheckCircle, 
  X, 
  Copy, 
  Printer, 
  MessageCircle, 
  Sparkles, 
  Building, 
  Calendar, 
  MapPin, 
  Mail, 
  Phone, 
  FileText 
} from 'lucide-react';
import { QuoteSummary } from '../types';
import { triggerWhatsAppOpen, DEFAULT_WHATSAPP_PHONE } from '../utils/whatsapp';

interface QuoteSuccessModalProps {
  quote: QuoteSummary;
  onClose: () => void;
}

export const QuoteSuccessModal: React.FC<QuoteSuccessModalProps> = ({ quote, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyQuote = () => {
    const text = `TECH ADITYA DIGITAL - OFFICIAL BULK QUOTE ESTIMATE
Quote ID: #${quote.quoteId}
Date: ${quote.createdAt}

Company: ${quote.companyName || 'N/A'}
Contact: ${quote.contactPerson} (${quote.phone} | ${quote.email})
Delivery City: ${quote.deliveryCity || 'TBD'}
Target Delivery: ${quote.targetDeliveryDate || 'Flexible'}

Selected Package: ${quote.packageName}
Quantity: ${quote.quantity} units
Unit Price: ₹${quote.unitPrice.toLocaleString('en-IN')}
Subtotal: ₹${quote.subtotal.toLocaleString('en-IN')}
Festive Discount (${quote.discountPercentage}%): -₹${quote.discountAmount.toLocaleString('en-IN')}
Add-ons: ₹${quote.addonsTotal.toLocaleString('en-IN')}
GST (18%): ₹${quote.estimatedTax.toLocaleString('en-IN')}
------------------------------------------------
FINAL ESTIMATED INVESTMENT: ₹${quote.grandTotal.toLocaleString('en-IN')}

Special Notes: ${quote.specialInstructions || 'None'}
Portal: techadityadigital@gmail.com`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSendToWhatsApp = () => {
    const text = `🌟 *BULK QUOTE CONFIRMATION #${quote.quoteId}*
Hello Tech Aditya Digital, I just generated an official bulk estimate on your portal:

🏢 *Company:* ${quote.companyName || 'Individual / Enterprise'}
👤 *Contact:* ${quote.contactPerson}
📱 *Phone:* ${quote.phone}
📧 *Email:* ${quote.email}
📍 *City:* ${quote.deliveryCity || 'Not specified'}
📅 *Date Needed:* ${quote.targetDeliveryDate || 'Earliest available'}

📦 *Package:* ${quote.packageName}
🔢 *Quantity:* ${quote.quantity} units
💰 *Estimated Total:* ₹${quote.grandTotal.toLocaleString('en-IN')} (incl. ${quote.discountPercentage}% festive discount)

Please confirm formal proforma invoice and lock this pricing for our corporate purchase order.`;

    triggerWhatsAppOpen(text);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0f172a] border border-amber-500/40 p-6 sm:p-8 shadow-2xl text-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header */}
        <div className="text-center pb-6 border-b border-slate-800">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-8 h-8" />
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
            Official Festive Estimate Generated
          </span>
          <h3 className="font-heading font-bold text-2xl text-white mt-2">
            Quote #{quote.quoteId}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Generated on {quote.createdAt} • Valid for 14 Days
          </p>
        </div>

        {/* Company & Order Info Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 text-xs text-slate-300 border-b border-slate-800">
          <div className="space-y-1.5">
            <div className="text-slate-400 uppercase font-semibold tracking-wider text-[10px]">
              Client Information
            </div>
            <div className="font-semibold text-white text-sm">
              {quote.companyName || 'Corporate Client'}
            </div>
            <div>Attn: {quote.contactPerson}</div>
            <div>Phone / WhatsApp: {quote.phone}</div>
            <div>Email: {quote.email}</div>
          </div>

          <div className="space-y-1.5">
            <div className="text-slate-400 uppercase font-semibold tracking-wider text-[10px]">
              Dispatch & Delivery
            </div>
            <div>City / Destination: <span className="text-slate-200 font-medium">{quote.deliveryCity || 'TBD'}</span></div>
            <div>Target Date: <span className="text-slate-200 font-medium">{quote.targetDeliveryDate || 'Standard Timeline'}</span></div>
            <div>GST Status: <span className="text-emerald-400 font-medium">18% Compliant B2B Invoice</span></div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="py-5 border-b border-slate-800">
          <div className="text-slate-400 uppercase font-semibold tracking-wider text-[10px] mb-3">
            Itemized Breakdown
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center py-1">
              <div>
                <span className="font-semibold text-white">{quote.packageName}</span>
                <span className="text-slate-400 block text-[11px]">{quote.quantity} units @ ₹{quote.unitPrice.toLocaleString('en-IN')}/unit</span>
              </div>
              <span className="font-semibold text-slate-200">
                ₹{quote.subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            {quote.discountAmount > 0 && (
              <div className="flex justify-between items-center text-emerald-400 font-medium py-1">
                <span>Festive Volume Discount ({quote.discountPercentage}% OFF)</span>
                <span>-₹{quote.discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            {quote.addonsList.length > 0 && (
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-slate-400 font-medium block mb-1">Custom Add-ons:</span>
                {quote.addonsList.map((addon, i) => (
                  <div key={i} className="text-slate-300 text-[11px] pl-2 flex items-center gap-1.5">
                    <span className="text-amber-400">•</span>
                    <span>{addon}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center text-slate-300 mt-1">
                  <span className="text-slate-400">Add-ons Subtotal:</span>
                  <span className="font-semibold">₹{quote.addonsTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center text-slate-400 pt-2 border-t border-slate-800">
              <span>Estimated GST / Taxes (18%):</span>
              <span>₹{quote.estimatedTax.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between items-center text-base sm:text-lg font-bold text-white pt-2 border-t border-slate-700">
              <span>Final Estimated Investment:</span>
              <span className="text-[#ffc174] font-heading font-bold text-xl sm:text-2xl">
                ₹{quote.grandTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        {quote.specialInstructions && (
          <div className="py-4 border-b border-slate-800 text-xs">
            <span className="text-slate-400 uppercase font-semibold text-[10px] block mb-1">
              Client Instructions / Branding Specs:
            </span>
            <p className="text-slate-300 italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              "{quote.specialInstructions}"
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleSendToWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white font-semibold text-sm shadow-lg shadow-emerald-950 transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white text-emerald-500" />
            <span>Send Quote to WhatsApp</span>
          </button>

          <button
            onClick={handleCopyQuote}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium border border-slate-700 transition-colors cursor-pointer"
          >
            <Copy className="w-4 h-4 text-amber-400" />
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Quote'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium border border-slate-700 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-400" />
            <span>Print</span>
          </button>
        </div>

      </div>
    </div>
  );
};
