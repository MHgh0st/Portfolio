import { HeaderNav } from "@/components/HeaderNav";
import { HeroSection } from "@/components/HeroSection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { FeaturedCaseStudySection } from "@/components/FeaturedCaseStudySection";
import { GraphNextCaseStudySection } from "@/components/GraphNextCaseStudySection";
import { WhatIDoSection } from "@/components/WhatIDoSection";
import { AboutPhilosophySection } from "@/components/AboutPhilosophySection";
import { ExperienceStackSection } from "@/components/ExperienceStackSection";
import { ContactFooter } from "@/components/ContactFooter";
import { CustomBlueprintCursor } from "@/components/CustomBlueprintCursor";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { ImageLightboxProvider } from "@/components/ImageLightboxProvider";
import { CustomScrollbar } from "@/components/CustomScrollbar";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <ImageLightboxProvider>
        <main className="min-h-screen bg-[#f4f3ef] text-[#111111] font-sans selection:bg-[#d4ff00] selection:text-[#111111] relative">
          {/* Custom Precision Reticle & Crosshair Cursor */}
          <CustomBlueprintCursor />

          {/* Interactive Floating Neobrutalist HUD Scrollbar */}
          <CustomScrollbar />

          {/* Navigation Header */}
          <HeaderNav />

          {/* Hero Section Viewport */}
          <HeroSection />

          {/* Real Case Studies Section */}
          <CaseStudiesSection />

          {/* Featured Case Study 01 (Salma Admin Panel Deep-Dive) */}
          <FeaturedCaseStudySection />

          {/* Featured Case Study 02 (GraphNext Visualization Deep-Dive) */}
          <GraphNextCaseStudySection />

          {/* What I Do Section */}
          <WhatIDoSection />

          {/* About & Philosophy Section */}
          <AboutPhilosophySection />

          {/* Experience & Stack Section */}
          <ExperienceStackSection />

          {/* Contact & Footer */}
          <ContactFooter />
        </main>
      </ImageLightboxProvider>
    </SmoothScrollProvider>
  );
}
