
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
    <div className="fixed inset-0 flex flex-col min-h-screen w-screen overflow-auto bg-notion-background font-sans">
      <NotionNavbar />
      <main className="flex-1 flex flex-col w-full bg-transparent">
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
