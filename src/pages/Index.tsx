
import React from "react";
import NotionNavbar from "@/components/NotionNavbar";
import NotionHero from "@/components/NotionHero";
import NotionFeatures from "@/components/NotionFeatures";
import SimpleFooter from "@/components/SimpleFooter";
import StatsBanner from "@/components/StatsBanner";
import GlobalLocations from "@/components/GlobalLocations";
import ControlPanelSection from "@/components/ControlPanelSection";

const Index = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-notion-background font-sans">
      <NotionNavbar />
      <main className="flex-1 flex flex-col w-full">
        {/* All major sections are now full-width */}
        <NotionHero />
        <ControlPanelSection />
        <NotionFeatures />
        <GlobalLocations />
      </main>
      <StatsBanner />
      <SimpleFooter />
    </div>
  );
};

export default Index;
