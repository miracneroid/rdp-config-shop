
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
        <div className="animate-fade-in">
          <NotionHero />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.12s" } as React.CSSProperties}>
          <ControlPanelSection />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.18s" } as React.CSSProperties}>
          <NotionFeatures />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.24s" } as React.CSSProperties}>
          <GlobalLocations />
        </div>
      </main>
      <div className="animate-fade-in" style={{ animationDelay: "0.30s" } as React.CSSProperties}>
        <StatsBanner />
      </div>
      <SimpleFooter />
    </div>
  );
};

export default Index;
