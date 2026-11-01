import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  MessageCircle, 
  Calculator, 
  Info, 
  X, 
  Clock, 
  ShieldCheck, 
  Package, 
  Layers, 
  Minus, 
  Plus,
  ArrowRight
} from 'lucide-react';
import { FESTIVE_PACKAGES } from '../data/packages';
import { FestivePackage } from '../types';
import { triggerWhatsAppOpen, generatePackageOrderWhatsAppMessage } from '../utils/whatsapp';

interface PackagesCatalogProps {
  onSelectForBulkOrder: (pkgId: string, qty: number) => void;
}

export const PackagesCatalog: React.FC<PackagesCatalogProps> = ({ onSelectForBulkOrder }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedDetailsPkg, setSelectedDetailsPkg] = useState<FestivePackage | null>(null);
  
  // Local quantity state per package card
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    FESTIVE_PACKAGES.forEach(pkg => {
      initial[pkg.id] = pkg.minOrderQuantity;
    });
    return initial;
  });

  const categories = [
    { id: 'all', label: 'All Curations' },
    { id: 'executive', label: 'VIP Executive Hampers' },
    { id: 'digital', label: 'Digital Growth Packs' },
    { id: 'hampers', label: 'Festive Gourmet' },
    { id: 'eco', label: 'Eco-Conscious' },
  ];

  const filteredPackages = activeCategory === 'all'
    ? FESTIVE_PACKAGES
    : FESTIVE_PACKAGES.filter(p => p.category === activeCategory);

  const handleQtyChange = (pkgId: string, delta: number, minMoq: number) => {
    setQuantities(prev => {
      const current = prev[pkgId] || minMoq;
      const next = Math.max(minMoq, current + delta);
      return { ...prev, [pkgId]: next };
    });
  };

  const handleDirectWhatsAppOrder = (pkg: FestivePackage) => {
    const qty = quantities[pkg.id] || pkg.minOrderQuantity;
    const message = generatePackageOrderWhatsAppMessage(pkg, qty);
    triggerWhatsAppOpen(message);
  };

  return (
    <section id="packages" className="py-16 sm:py-20 relative bg-[#0b1326]">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Curated Festive Solutions</span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-4xl text-white tracking-tight">
            Handcrafted Hampers & High-RoAS Digital Bundles
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Order directly via WhatsApp for quick consultation and instant mockups, or configure custom bulk volume tiers.
          </p>
        </div>

        {/* Category Filter Pills (Scrollable horizontally on mobile) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-12 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPackages.map(pkg => {
            const currentQty = quantities[pkg.id] || pkg.minOrderQuantity;
            const approxTotal = currentQty * pkg.pricePerUnit;

            return (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between rounded-2xl bg-[#131b2e] border transition-all duration-300 hover:-translate-y-1 ${
                  pkg.popular 
                    ? 'border-amber-500/40 shadow-xl shadow-amber-500/10' 
                    : 'border-slate-800 hover:border-slate-700 shadow-lg shadow-black/40'
                }`}
              >
                {/* Card Top */}
                <div className="p-5 sm:p-6">
                  
                  {/* Category and Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold text-amber-400/90 uppercase tracking-wider">
                      {pkg.categoryLabel}
                    </span>
                    {pkg.badge && (
                      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                        pkg.badge === 'Bestseller' 
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                          : pkg.badge === 'High Impact'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                      }`}>
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-white tracking-tight mb-1.5">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                    {pkg.tagline}
                  </p>

                  {/* Pricing Box */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 mb-5">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-heading font-bold text-2xl sm:text-3xl text-[#ffc174]">
                            ₹{pkg.pricePerUnit.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-slate-400">/ unit</span>
                          {pkg.originalPricePerUnit && (
                            <span className="text-xs text-slate-500 line-through">
                              ₹{pkg.originalPricePerUnit.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Min. Order: <strong className="text-slate-300">{pkg.minOrderQuantity} units</strong>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedDetailsPkg(pkg)}
                        className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium underline underline-offset-2 p-1 cursor-pointer"
                        title="View inclusions"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>Specs</span>
                      </button>
                    </div>

                    {/* Interactive Quantity Stepper directly on card */}
                    <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-xs text-slate-300 font-medium">Quantity:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQtyChange(pkg.id, -5, pkg.minOrderQuantity)}
                          disabled={currentQty <= pkg.minOrderQuantity}
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 flex items-center justify-center border border-slate-700 active:scale-95 transition-all"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-semibold font-mono text-white min-w-[32px] text-center">
                          {currentQty}
                        </span>
                        <button
                          onClick={() => handleQtyChange(pkg.id, 5, pkg.minOrderQuantity)}
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center border border-slate-700 active:scale-95 transition-all"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 text-[11px] text-right text-slate-400">
                      Est. for {currentQty} units: <span className="font-semibold text-slate-200">₹{approxTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Highlights Checklist */}
                  <div className="space-y-2 mb-4">
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                      Key Inclusions:
                    </span>
                    {pkg.itemsIncluded.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                    {pkg.itemsIncluded.length > 3 && (
                      <button 
                        onClick={() => setSelectedDetailsPkg(pkg)}
                        className="text-[11px] text-amber-400 hover:underline pl-5 cursor-pointer"
                      >
                        +{pkg.itemsIncluded.length - 3} more items included →
                      </button>
                    )}
                  </div>

                  {/* Specs Pill List */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                    <div>
                      <span className="text-slate-500 block">Turnaround:</span>
                      <span className="text-slate-300 font-medium">{pkg.specs.turnaroundTime}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Branding:</span>
                      <span className="text-slate-300 font-medium truncate block" title={pkg.specs.customBranding}>
                        {pkg.specs.customBranding}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Card Bottom CTA Actions */}
                <div className="p-4 sm:p-5 pt-0 border-t border-slate-800/80 bg-[#101728]/50 rounded-b-2xl flex flex-col gap-2 mt-auto">
                  {/* Order on WhatsApp */}
                  <button
                    onClick={() => handleDirectWhatsAppOrder(pkg)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/30 transition-all duration-200 cursor-pointer active:scale-98"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-emerald-500 shrink-0" />
                    <span>Order on WhatsApp ({currentQty} units)</span>
                  </button>

                  {/* Add to Bulk Calculator */}
                  <button
                    onClick={() => onSelectForBulkOrder(pkg.id, currentQty)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-medium border border-amber-500/20 hover:border-amber-500/50 transition-colors cursor-pointer"
                  >
                    <Calculator className="w-3.5 h-3.5 text-amber-400" />
                    <span>Configure in Bulk Calculator</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Package Detail Modal */}
      {selectedDetailsPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#131b2e] border border-amber-500/30 p-6 shadow-2xl">
            
            <button
              onClick={() => setSelectedDetailsPkg(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                {selectedDetailsPkg.categoryLabel}
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mt-1">
                {selectedDetailsPkg.name}
              </h3>
              <p className="text-sm text-slate-300 mt-2">
                {selectedDetailsPkg.description}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 mb-5 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Unit Price:</span>
                <span className="font-heading font-bold text-2xl text-[#ffc174]">
                  ₹{selectedDetailsPkg.pricePerUnit.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-400 ml-2">
                  (MOQ: {selectedDetailsPkg.minOrderQuantity} units)
                </span>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/30">
                Pan-India Free Shipping Available
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Complete What's Inside & Inclusions:
                </h4>
                <ul className="space-y-2">
                  {selectedDetailsPkg.itemsIncluded.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Turnaround Timeline:</span>
                  <span className="font-semibold text-slate-200">{selectedDetailsPkg.specs.turnaroundTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Branding Method:</span>
                  <span className="font-semibold text-slate-200">{selectedDetailsPkg.specs.customBranding}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Packaging Type:</span>
                  <span className="font-semibold text-slate-200">{selectedDetailsPkg.specs.packaging}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Ideal For:</span>
                  <span className="font-semibold text-amber-300">{selectedDetailsPkg.specs.idealFor}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const message = generatePackageOrderWhatsAppMessage(selectedDetailsPkg, selectedDetailsPkg.minOrderQuantity);
                  triggerWhatsAppOpen(message);
                  setSelectedDetailsPkg(null);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white font-semibold text-sm shadow-lg shadow-emerald-950 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-500" />
                <span>Order via WhatsApp Now</span>
              </button>

              <button
                onClick={() => {
                  onSelectForBulkOrder(selectedDetailsPkg.id, selectedDetailsPkg.minOrderQuantity);
                  setSelectedDetailsPkg(null);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-sm border border-amber-500/30 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Add to Bulk Calculator</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
