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
    <div className="min-h-screen w-full bg-notion-background font-sans">
      <NotionNavbar />
      <main className="w-full bg-transparent">
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
