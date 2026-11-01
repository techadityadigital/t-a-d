import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { FestiveBanner } from './components/FestiveBanner';
import { Hero } from './components/Hero';
import { PackagesCatalog } from './components/PackagesCatalog';
import { BulkOrderCalculator } from './components/BulkOrderCalculator';
import { ProcessSection } from './components/ProcessSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { FloatingWhatsAppFAB } from './components/FloatingWhatsAppFAB';
import { MobileStickyBar } from './components/MobileStickyBar';
import { WhatsAppDirectModal } from './components/WhatsAppDirectModal';

export default function App() {
  const [selectedBulkPkgId, setSelectedBulkPkgId] = useState<string | undefined>(undefined);
  const [selectedBulkQty, setSelectedBulkQty] = useState<number | undefined>(undefined);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  const scrollToCalculator = () => {
    const el = document.getElementById('bulk-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPackages = () => {
    const el = document.getElementById('packages');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackageForBulk = (pkgId: string, qty: number) => {
    setSelectedBulkPkgId(pkgId);
    setSelectedBulkQty(qty);
    scrollToCalculator();
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] font-sans selection:bg-amber-500/30 selection:text-white flex flex-col">
      {/* Navigation */}
      <Navbar 
        onOpenWhatsAppModal={() => setShowWhatsAppModal(true)} 
        onScrollToCalculator={scrollToCalculator}
      />

      <main className="flex-1">
        {/* Festive Banner Alert with Countdown */}
        <FestiveBanner />

        {/* Hero Section */}
        <Hero 
          onScrollToCalculator={scrollToCalculator} 
          onScrollToPackages={scrollToPackages}
        />

        {/* Packages & Curations Catalog */}
        <PackagesCatalog 
          onSelectForBulkOrder={handleSelectPackageForBulk}
        />

        {/* Working Bulk Order Configurator & WhatsApp Order Form */}
        <BulkOrderCalculator 
          initialPackageId={selectedBulkPkgId}
          initialQuantity={selectedBulkQty}
        />

        {/* How It Works (4 Steps) */}
        <ProcessSection />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Client Reviews & Testimonials */}
        <Testimonials />

        {/* FAQs */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Emerald WhatsApp FAB with persistent pulse */}
      <FloatingWhatsAppFAB 
        onOpenModal={() => setShowWhatsAppModal(true)} 
      />

      {/* Mobile Sticky Conversion Dock */}
      <MobileStickyBar 
        onScrollToCalculator={scrollToCalculator} 
      />

      {/* WhatsApp Quick Direct Consultation Topics Modal */}
      {showWhatsAppModal && (
        <WhatsAppDirectModal 
          onClose={() => setShowWhatsAppModal(false)} 
        />
      )}
    </div>
  );
}
