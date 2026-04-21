"use client";

import { Navbar } from "@/components/agence-dieppe/navbar";
import { Hero } from "@/components/agence-dieppe/hero";
import { Footer } from "@/components/agence-dieppe/footer";
import {
  PainPointsSection,
  GlobalSolutionSection,
  ServicesPreviewSection,
  OffersSection,
  MethodologySection,
  AboutPreviewSection,
  FinalCtaSection
} from "@/components/agence-dieppe/home-v2-components";

export default function Home() {
  return (
    <div className="min-h-screen selection:bg-[#ffc107]/30">
      <Navbar />
      <main>
        <Hero />
        
        <PainPointsSection />
        <GlobalSolutionSection />
        
        {/* Section anchor for /#cybersecurite using the services preview as an anchor */}
        <div id="cybersecurite">
          <ServicesPreviewSection />
        </div>
        
        <OffersSection />
        
        <div id="methode">
          <MethodologySection />
        </div>
        
        <div id="apropos">
          <AboutPreviewSection />
        </div>
        
        <FinalCtaSection />
        
        {/* Legacy Sections are completely removed to maintain v2 visual integrity. */}
      </main>
      <Footer />
    </div>
  );
}
