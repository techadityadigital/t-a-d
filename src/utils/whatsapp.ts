import { FestivePackage, BulkOrderFormData, QuoteSummary } from '../types';

// Default WhatsApp contact number for Tech Aditya Digital
export const DEFAULT_WHATSAPP_PHONE = '919876543210';
export const DISPLAY_PHONE = '+91 98765 43210';
export const OFFICIAL_EMAIL = 'techadityadigital@gmail.com';

/**
 * Builds the WhatsApp direct chat URL with pre-filled message
 */
export function buildWhatsAppUrl(message: string, phone: string = DEFAULT_WHATSAPP_PHONE): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Generates an instant WhatsApp message for a direct package order
 */
export function generatePackageOrderWhatsAppMessage(
  pkg: FestivePackage,
  quantity: number = pkg.minOrderQuantity,
  companyName?: string
): string {
  const approxTotal = pkg.pricePerUnit * quantity;
  return `✨ *FESTIVE ORDER INQUIRY | Tech Aditya Digital* ✨

Hello Aditya & Team, I'm interested in ordering:

📦 *Package:* ${pkg.name}
🏷️ *Category:* ${pkg.categoryLabel}
🔢 *Quantity:* ${quantity} units (Min MOQ: ${pkg.minOrderQuantity})
💵 *Unit Rate:* ₹${pkg.pricePerUnit.toLocaleString('en-IN')} ${pkg.originalPricePerUnit ? `(Regular: ₹${pkg.originalPricePerUnit.toLocaleString('en-IN')})` : ''}
💰 *Estimated Total:* ~₹${approxTotal.toLocaleString('en-IN')} + taxes

${companyName ? `🏢 *Company / Brand:* ${companyName}\n` : ''}⏱️ *Turnaround:* ${pkg.specs.turnaroundTime}
🎨 *Branding:* ${pkg.specs.customBranding}

Could you please share:
1. Physical / digital sample availability
2. Custom logo mockup details
3. Final festive discount & delivery timeline to our location

Thank you!`;
}

/**
 * Generates a full itemized WhatsApp message for a completed bulk order form
 */
export function generateBulkOrderWhatsAppMessage(
  data: BulkOrderFormData,
  quote: QuoteSummary
): string {
  const addonsText = quote.addonsList.length > 0 
    ? quote.addonsList.map(a => `  • ${a}`).join('\n')
    : '  • Standard Packaging included';

  return `🌟 *OFFICIAL BULK CORPORATE INQUIRY* 🌟
*Reference Quote ID:* #${quote.quoteId}
*Portal:* Tech Aditya Digital

🏢 *COMPANY & CONTACT DETAILS*
• Company: *${data.companyName || 'Not specified'}*
• Contact Person: *${data.contactPerson}*
• WhatsApp / Phone: *${data.phone}*
• Email: *${data.email}*
• Delivery City / Pin: *${data.deliveryCity || 'To be specified'}*
• Target Delivery Date: *${data.targetDeliveryDate || 'Flexible / ASAP'}*

📦 *ORDER SPECIFICATIONS*
• Selected Package: *${quote.packageName}*
• Quantity: *${quote.quantity} units*
• Base Price: ₹${quote.unitPrice.toLocaleString('en-IN')}/unit
• Base Subtotal: ₹${quote.subtotal.toLocaleString('en-IN')}

🎁 *FESTIVE VOLUME BENEFIT*
• Applied Discount: *${quote.discountPercentage}% OFF*
• Total Savings: -₹${quote.discountAmount.toLocaleString('en-IN')}

✨ *CUSTOM ADD-ONS INCLUDED*
${addonsText}
• Add-ons Value: ₹${quote.addonsTotal.toLocaleString('en-IN')}

💵 *FINANCIAL ESTIMATE*
• Tax / GST Estimate (18%): ₹${quote.estimatedTax.toLocaleString('en-IN')}
• *FINAL ESTIMATED INVESTMENT: ₹${quote.grandTotal.toLocaleString('en-IN')}*

📝 *SPECIAL INSTRUCTIONS / NOTES*
"${data.specialInstructions ? data.specialInstructions : 'Please provide complimentary logo visualization and sample kit approval procedure.'}"

Please confirm next steps and bank/proforma invoice details. Looking forward to your prompt response!`;
}

/**
 * Triggers opening WhatsApp in a new tab / mobile app
 */
export function triggerWhatsAppOpen(message: string, phone: string = DEFAULT_WHATSAPP_PHONE) {
  const url = buildWhatsAppUrl(message, phone);
  // Safely open window
  window.open(url, '_blank', 'noopener,noreferrer');
}
