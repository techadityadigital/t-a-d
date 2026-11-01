import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Calculator, 
  Sparkles, 
  MessageCircle, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  Check, 
  TrendingDown, 
  AlertCircle,
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { FESTIVE_PACKAGES, BULK_TIERS, ADDONS } from '../data/packages';
import { FestivePackage, BulkOrderFormData, QuoteSummary } from '../types';
import { 
  triggerWhatsAppOpen, 
  generateBulkOrderWhatsAppMessage, 
  OFFICIAL_EMAIL, 
  DEFAULT_WHATSAPP_PHONE 
} from '../utils/whatsapp';
import { QuoteSuccessModal } from './QuoteSuccessModal';

interface BulkOrderCalculatorProps {
  initialPackageId?: string;
  initialQuantity?: number;
}

export const BulkOrderCalculator: React.FC<BulkOrderCalculatorProps> = ({
  initialPackageId,
  initialQuantity
}) => {
  // Selected package
  const [selectedPkgId, setSelectedPkgId] = useState<string>(
    initialPackageId || FESTIVE_PACKAGES[0].id
  );

  // Synchronize when initialPackageId changes externally
  useEffect(() => {
    if (initialPackageId) {
      setSelectedPkgId(initialPackageId);
    }
  }, [initialPackageId]);

  const selectedPackage = FESTIVE_PACKAGES.find(p => p.id === selectedPkgId) || FESTIVE_PACKAGES[0];

  // Quantity state
  const [quantity, setQuantity] = useState<number>(
    initialQuantity || Math.max(selectedPackage.minOrderQuantity, 50)
  );

  useEffect(() => {
    if (initialQuantity && initialQuantity >= selectedPackage.minOrderQuantity) {
      setQuantity(initialQuantity);
    } else if (quantity < selectedPackage.minOrderQuantity) {
      setQuantity(selectedPackage.minOrderQuantity);
    }
  }, [selectedPkgId, initialQuantity]);

  // Form Fields
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    deliveryCity: '',
    targetDeliveryDate: '',
    specialInstructions: '',
  });

  // Add-on states
  const [includeLogoBranding, setIncludeLogoBranding] = useState(true);
  const [includePersonalizedGreeting, setIncludePersonalizedGreeting] = useState(true);
  const [includeExpressShipping, setIncludeExpressShipping] = useState(false);
  const [includeDigitalAssetAddon, setIncludeDigitalAssetAddon] = useState(false);

  // Errors state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // Quote modal state
  const [activeQuote, setActiveQuote] = useState<QuoteSummary | null>(null);

  // Calculations
  const unitPrice = selectedPackage.pricePerUnit;
  const subtotal = unitPrice * quantity;

  // Determine bulk tier discount
  const currentTier = BULK_TIERS.slice().reverse().find(tier => quantity >= tier.min) || {
    min: 0,
    max: 14,
    discountPct: 0,
    label: 'Standard Pricing'
  };

  const discountPercentage = currentTier.discountPct;
  const discountAmount = Math.round(subtotal * (discountPercentage / 100));
  const discountedSubtotal = subtotal - discountAmount;

  // Add-ons computation
  // If quantity >= 250, custom logo branding is completely FREE!
  const logoBrandingPrice = quantity >= 250 ? 0 : 75 * quantity;
  const greetingCardsPrice = 35 * quantity;
  const expressShippingPrice = 60 * quantity;
  const digitalAssetPrice = 1999;

  let addonsTotal = 0;
  const activeAddonsList: string[] = [];

  if (includeLogoBranding) {
    addonsTotal += logoBrandingPrice;
    activeAddonsList.push(
      quantity >= 250 
        ? 'Custom Laser / Gold Foil Logo Branding (FREE Tier Benefit)'
        : `Custom Laser / Gold Foil Logo Branding (₹75/unit)`
    );
  }
  if (includePersonalizedGreeting) {
    addonsTotal += greetingCardsPrice;
    activeAddonsList.push(`Personalized Festive Greeting Cards (₹35/unit)`);
  }
  if (includeExpressShipping) {
    addonsTotal += expressShippingPrice;
    activeAddonsList.push(`Priority 48-Hour Dispatch & Tracking (₹60/unit)`);
  }
  if (includeDigitalAssetAddon) {
    addonsTotal += digitalAssetPrice;
    activeAddonsList.push(`Festive Social Announcement Graphics Pack (Flat ₹1,999)`);
  }

  // Taxes (18% GST)
  const taxableAmount = discountedSubtotal + addonsTotal;
  const estimatedTax = Math.round(taxableAmount * 0.18);
  const grandTotal = taxableAmount + estimatedTax;

  // Next tier progress
  const nextTier = BULK_TIERS.find(tier => tier.min > quantity);
  const unitsToNextTier = nextTier ? nextTier.min - quantity : 0;

  // Validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Please enter your name';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your WhatsApp or phone number';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 9) {
      newErrors.phone = 'Please enter a valid 10-digit number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter work email for invoice';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createQuoteObject = (): QuoteSummary => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const quoteId = `TAD-${new Date().getFullYear()}-${randomSuffix}`;

    return {
      quoteId,
      createdAt: new Date().toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      }),
      companyName: formData.companyName,
      contactPerson: formData.contactPerson,
      email: formData.email,
      phone: formData.phone,
      packageName: selectedPackage.name,
      quantity,
      unitPrice,
      subtotal,
      discountPercentage,
      discountAmount,
      addonsTotal,
      estimatedTax,
      grandTotal,
      deliveryCity: formData.deliveryCity,
      targetDeliveryDate: formData.targetDeliveryDate,
      specialInstructions: formData.specialInstructions,
      addonsList: activeAddonsList,
    };
  };

  const handleFireConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#ffd700']
      });
    } catch (e) {
      // safe fallback
    }
  };

  // Action 1: Order via WhatsApp directly from the completed bulk form
  const handleBulkOrderWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    handleFireConfetti();
    const quote = createQuoteObject();
    const bulkData: BulkOrderFormData = {
      selectedPackageId: selectedPkgId,
      quantity,
      ...formData,
      includeLogoBranding,
      includePersonalizedGreeting,
      includeExpressShipping,
      includeDigitalAssetAddon
    };

    const message = generateBulkOrderWhatsAppMessage(bulkData, quote);
    triggerWhatsAppOpen(message);
  };

  // Action 2: Generate Official Quote modal
  const handleGenerateOfficialQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    handleFireConfetti();
    const quote = createQuoteObject();
    setActiveQuote(quote);
  };

  const presetQuantities = [25, 50, 100, 250, 500];

  return (
    <section id="bulk-calculator" className="py-16 sm:py-24 bg-[#0e1628] relative">
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[400px] bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Corporate Estimator</span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-4xl text-white tracking-tight">
            Corporate Bulk Order & Volume Configurator
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Customize quantities, select custom branding add-ons, and immediately dispatch your verified order to our team via WhatsApp.
          </p>
        </div>

        {/* 2-Column Responsive Layout: Configurator Left, Live Price Card Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Configurator Controls & Contact Details (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Package Selection */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#131b2e] border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                    Select Curated Package or Digital Pack
                  </h3>
                </div>
                <span className="text-xs text-amber-400 font-medium">
                  {FESTIVE_PACKAGES.length} Options
                </span>
              </div>

              {/* Package Dropdown Selector */}
              <div className="relative">
                <select
                  value={selectedPkgId}
                  onChange={(e) => setSelectedPkgId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3.5 text-sm sm:text-base text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer appearance-none"
                >
                  {FESTIVE_PACKAGES.map(pkg => (
                    <option key={pkg.id} value={pkg.id} className="bg-slate-900 text-white py-2">
                      {pkg.name} — ₹{pkg.pricePerUnit.toLocaleString('en-IN')}/unit (MOQ: {pkg.minOrderQuantity})
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  ▼
                </div>
              </div>

              {/* Quick Spec Card for selected package */}
              <div className="mt-4 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-slate-400">Category: </span>
                  <strong className="text-white">{selectedPackage.categoryLabel}</strong>
                  <span className="text-slate-500 mx-2">•</span>
                  <span className="text-slate-400">Turnaround: </span>
                  <strong className="text-amber-300">{selectedPackage.specs.turnaroundTime}</strong>
                </div>
                <div className="text-slate-400">
                  Base Rate: <strong className="text-[#ffc174] text-sm">₹{selectedPackage.pricePerUnit.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>

            {/* Step 2: Quantity & Volume Tier Slider */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#131b2e] border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                    Set Quantity & Unlock Volume Discounts
                  </h3>
                </div>
                {discountPercentage > 0 && (
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/30 font-semibold flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>{discountPercentage}% Bulk Discount Applied</span>
                  </span>
                )}
              </div>

              {/* Number Input + Preset Pills */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
                <div className="flex-1">
                  <label className="text-xs text-slate-400 block mb-1.5 font-medium">
                    Exact Quantity (Units):
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={selectedPackage.minOrderQuantity}
                      max={10000}
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || selectedPackage.minOrderQuantity;
                        setQuantity(Math.max(selectedPackage.minOrderQuantity, val));
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-lg font-bold font-mono text-white focus:outline-none focus:border-amber-400"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">
                      Units
                    </span>
                  </div>
                </div>

                {/* Preset Quantity Buttons */}
                <div className="sm:w-auto">
                  <label className="text-xs text-slate-400 block mb-1.5 font-medium">
                    Quick Volume Presets:
                  </label>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {presetQuantities.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setQuantity(preset)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          quantity === preset
                            ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 font-bold'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Range Slider for Mobile & Desktop */}
              <div className="space-y-2">
                <input
                  type="range"
                  min={selectedPackage.minOrderQuantity}
                  max={500}
                  step={5}
                  value={Math.min(quantity, 500)}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Min: {selectedPackage.minOrderQuantity} units</span>
                  <span>50 (10% off)</span>
                  <span>100 (15% off)</span>
                  <span>250+ (25% off + Free Foil)</span>
                </div>
              </div>

              {/* Progress to next tier prompt */}
              {unitsToNextTier > 0 && (
                <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      Add <strong>{unitsToNextTier} more units</strong> to unlock the {nextTier?.discountPct}% discount tier!
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => nextTier && setQuantity(nextTier.min)}
                    className="text-[11px] font-bold underline hover:text-white cursor-pointer ml-2 shrink-0"
                  >
                    Upgrade →
                  </button>
                </div>
              )}
            </div>

            {/* Step 3: Interactive Add-ons */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#131b2e] border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                  Custom Branding & Festive Add-ons
                </h3>
              </div>

              <div className="space-y-3">
                {/* Addon 1: Logo Branding */}
                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={includeLogoBranding}
                    onChange={(e) => setIncludeLogoBranding(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-amber-500 bg-slate-800 border-slate-700 focus:ring-amber-400 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">
                        Precision Metallic Foil / Laser Logo Branding
                      </span>
                      <span className="text-xs font-semibold text-amber-400">
                        {quantity >= 250 ? 'FREE (250+ Tier)' : `+₹75 / unit`}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Your company logo laser engraved or stamped in high-sheen gold foil on each box.
                    </p>
                  </div>
                </label>

                {/* Addon 2: Personalized Greeting Card */}
                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={includePersonalizedGreeting}
                    onChange={(e) => setIncludePersonalizedGreeting(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-amber-500 bg-slate-800 border-slate-700 focus:ring-amber-400 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">
                        Personalized Festive Greeting Card with Leadership Note
                      </span>
                      <span className="text-xs font-semibold text-amber-400">
                        +₹35 / unit
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Thick textured linen stationery with founder/CEO message and recipient name personalization.
                    </p>
                  </div>
                </label>

                {/* Addon 3: Priority Dispatch */}
                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={includeExpressShipping}
                    onChange={(e) => setIncludeExpressShipping(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-amber-500 bg-slate-800 border-slate-700 focus:ring-amber-400 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">
                        Priority 48-Hour Multi-City Express Dispatch
                      </span>
                      <span className="text-xs font-semibold text-amber-400">
                        +₹60 / unit
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Guaranteed rapid courier routing with live multi-recipient tracking dashboard.
                    </p>
                  </div>
                </label>

                {/* Addon 4: Digital Campaign Booster */}
                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={includeDigitalAssetAddon}
                    onChange={(e) => setIncludeDigitalAssetAddon(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-amber-500 bg-slate-800 border-slate-700 focus:ring-amber-400 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">
                        Festive Social Announcement Graphic Templates
                      </span>
                      <span className="text-xs font-semibold text-emerald-400">
                        Flat ₹1,999 (Special Add-on)
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Ready-to-post branded festive celebration banners for LinkedIn, Instagram & email newsletters.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 4: Company & Dispatch Details */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#131b2e] border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                  Corporate Contact & Delivery Requirements
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company Name */}
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    Company / Organization Name:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Apex FinTech Ltd"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <Building2 className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Contact Person Name (Required) */}
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    Contact Person Name <span className="text-red-400">*</span>:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Vikram Sharma"
                      value={formData.contactPerson}
                      onChange={(e) => {
                        setFormData({ ...formData, contactPerson: e.target.value });
                        if (errors.contactPerson) setErrors({ ...errors, contactPerson: '' });
                      }}
                      className={`w-full bg-slate-900 border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 ${
                        errors.contactPerson ? 'border-red-500' : 'border-slate-700'
                      }`}
                    />
                    <User className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {errors.contactPerson && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.contactPerson}
                    </p>
                  )}
                </div>

                {/* Phone / WhatsApp (Required) */}
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    WhatsApp Number <span className="text-red-400">*</span>:
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      className={`w-full bg-slate-900 border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 ${
                        errors.phone ? 'border-red-500' : 'border-slate-700'
                      }`}
                    />
                    <Phone className="w-4 h-4 text-emerald-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Work Email (Required) */}
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    Work Email Address <span className="text-red-400">*</span>:
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="e.g. vikram@apex.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full bg-slate-900 border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 ${
                        errors.email ? 'border-red-500' : 'border-slate-700'
                      }`}
                    />
                    <Mail className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {errors.email && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Delivery City */}
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    Destination City / Pincode:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Bengaluru - 560001"
                      value={formData.deliveryCity}
                      onChange={(e) => setFormData({ ...formData, deliveryCity: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <MapPin className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Target Delivery Date */}
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    Required By (Delivery Date):
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.targetDeliveryDate}
                      onChange={(e) => setFormData({ ...formData, targetDeliveryDate: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="mt-4">
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  Custom Branding Notes / Special Packaging Instructions:
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Please share logo vector mockup placement, gold foil vs laser engraving samples, or split shipping to multiple offices."
                  value={formData.specialInstructions}
                  onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

            </div>

          </div>

          {/* RIGHT: Live Price Summary & Order Actions (5 cols, sticky on desktop) */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            
            <div className="rounded-2xl bg-[#131b2e] border-2 border-amber-500/30 p-6 shadow-2xl shadow-black/80 relative overflow-hidden">
              
              {/* Subtle amber top glow */}
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/20 blur-2xl rounded-full pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-emerald-500/15 blur-2xl rounded-full pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">
                    Live Quotation Estimate
                  </span>
                  <h3 className="font-heading font-bold text-lg text-white">
                    Order Summary
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                    B2B Invoice
                  </span>
                </div>
              </div>

              {/* Selected Package Details */}
              <div className="py-4 border-b border-slate-800 text-xs space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-semibold text-white block text-sm">
                      {selectedPackage.name}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      {quantity} units × ₹{unitPrice.toLocaleString('en-IN')}/unit
                    </span>
                  </div>
                  <span className="font-semibold text-slate-200">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Volume Discount */}
                {discountAmount > 0 ? (
                  <div className="flex justify-between items-center text-emerald-400 font-medium">
                    <span className="flex items-center gap-1">
                      <span>Volume Tier Discount ({discountPercentage}%):</span>
                    </span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-500 italic">
                    Min 15 units required for volume tier discount.
                  </div>
                )}
              </div>

              {/* Addons Breakdown */}
              <div className="py-3 border-b border-slate-800 text-xs space-y-1.5">
                <span className="text-slate-400 font-medium text-[11px] block">Add-ons Subtotal:</span>
                
                {includeLogoBranding && (
                  <div className="flex justify-between text-slate-300">
                    <span>Foil / Laser Logo Branding</span>
                    <span className={quantity >= 250 ? 'text-emerald-400 font-semibold' : ''}>
                      {quantity >= 250 ? 'FREE' : `₹${logoBrandingPrice.toLocaleString('en-IN')}`}
                    </span>
                  </div>
                )}

                {includePersonalizedGreeting && (
                  <div className="flex justify-between text-slate-300">
                    <span>Personalized Greeting Cards</span>
                    <span>₹{greetingCardsPrice.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {includeExpressShipping && (
                  <div className="flex justify-between text-slate-300">
                    <span>Priority 48-Hour Express Dispatch</span>
                    <span>₹{expressShippingPrice.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {includeDigitalAssetAddon && (
                  <div className="flex justify-between text-slate-300">
                    <span>Festive Social Media Graphic Pack</span>
                    <span>₹{digitalAssetPrice.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {!includeLogoBranding && !includePersonalizedGreeting && !includeExpressShipping && !includeDigitalAssetAddon && (
                  <div className="text-[11px] text-slate-500 italic">
                    No optional add-ons selected.
                  </div>
                )}

                <div className="flex justify-between text-slate-300 pt-1 font-semibold">
                  <span>Add-ons Total:</span>
                  <span>₹{addonsTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Taxes and Grand Total */}
              <div className="py-4 border-b border-slate-800 text-xs space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>Taxable Base Value:</span>
                  <span>₹{taxableAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated GST (18% Input Credit):</span>
                  <span>₹{estimatedTax.toLocaleString('en-IN')}</span>
                </div>

                <div className="pt-2 flex justify-between items-baseline">
                  <div>
                    <span className="font-heading font-bold text-base sm:text-lg text-white block">
                      Estimated Investment:
                    </span>
                    <span className="text-[11px] text-emerald-400 font-semibold">
                      Total Savings: ₹{discountAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="font-heading font-bold text-2xl sm:text-3xl text-[#ffc174] drop-shadow-sm">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Conversion Buttons */}
              <div className="pt-5 space-y-3">
                {/* PRIMARY CONVERSION: Order via WhatsApp */}
                <button
                  type="button"
                  onClick={handleBulkOrderWhatsApp}
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-4 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white font-semibold text-sm sm:text-base shadow-xl shadow-emerald-950/60 hover:shadow-emerald-500/40 transition-all duration-200 cursor-pointer active:scale-98 group"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span>Send Bulk Order via WhatsApp</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* SECONDARY ACTION: Generate Instant Official Quote */}
                <button
                  type="button"
                  onClick={handleGenerateOfficialQuote}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-amber-300 font-semibold text-xs sm:text-sm border border-amber-500/30 hover:border-amber-400 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Generate Official PDF / Proforma Quote</span>
                </button>
              </div>

              {/* Guarantees Box */}
              <div className="mt-5 pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Digital 3D Logo Proof approved prior to production</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Pan-India Doorstep Logistics with Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Official GST Tax Invoice with Input Tax Credit (ITC)</span>
                </div>
              </div>

            </div>

            {/* Quick Consultation Badge */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Need custom items or bespoke budget?</span>
              <button
                type="button"
                onClick={() => {
                  const text = `Hello Tech Aditya Digital! I have a customized corporate gifting requirement that differs from standard packages. Could an account manager connect with me?`;
                  triggerWhatsAppOpen(text);
                }}
                className="text-amber-400 hover:text-amber-300 font-semibold underline cursor-pointer"
              >
                Talk to Director →
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Quote Success Modal if generated */}
      {activeQuote && (
        <QuoteSuccessModal
          quote={activeQuote}
          onClose={() => setActiveQuote(null)}
        />
      )}

    </section>
  );
};
