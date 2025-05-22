
import React from "react";
import MainNavbar from "@/components/MainNavbar";
import HeroGradient from "@/components/HeroGradient";
import NotionFeatures from "@/components/NotionFeatures";
import SimpleFooter from "@/components/SimpleFooter";
import StatsBanner from "@/components/StatsBanner";
import GlobalLocations from "@/components/GlobalLocations";
import ControlPanelSection from "@/components/ControlPanelSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Index = () => {
  useScrollAnimation();

  return (
    <div className="w-full min-h-screen flex flex-col bg-notion-background font-sans">
      <MainNavbar />
      <main className="flex-1 flex flex-col w-full">
        <HeroGradient />
        
        <div className="scroll-animate opacity-0">
          <ControlPanelSection />
        </div>
        <div className="scroll-animate opacity-0">
          <NotionFeatures />
        </div>
        <div className="scroll-animate opacity-0">
          <TestimonialsSection />
        </div>
        <div className="scroll-animate opacity-0">
          <GlobalLocations />
        </div>
      </main>
      <div className="scroll-animate opacity-0">
        <StatsBanner />
      </div>
      <SimpleFooter />
    </div>
  );
};

export default Index;
