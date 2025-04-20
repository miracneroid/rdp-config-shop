
import React from "react";
import NotionNavbar from "@/components/NotionNavbar";
import NotionHero from "@/components/NotionHero";
import NotionFeatures from "@/components/NotionFeatures";
import SimpleFooter from "@/components/SimpleFooter";
import StatsBanner from "@/components/StatsBanner";
import ServiceOfferings from "@/components/ServiceOfferings";
import HomeFAQ from "@/components/HomeFAQ";
import ProcessorCards from "@/components/ProcessorCards";

const Index = () => {
  return (
    <div className="min-h-screen bg-notion-background w-full">
      <NotionNavbar />
      <main className="w-full bg-transparent">
        <NotionHero />
        <ProcessorCards />
        <StatsBanner />
        <NotionFeatures />
        <ServiceOfferings />
        <HomeFAQ />
      </main>
      <SimpleFooter />
    </div>
  );
};

export default Index;
