
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
    <div className="flex flex-col w-full min-h-screen h-full bg-notion-background font-sans">
      <NotionNavbar />
      <main className="flex-1 flex flex-col w-full">
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
