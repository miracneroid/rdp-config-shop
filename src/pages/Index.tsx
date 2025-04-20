
import React from "react";
import NotionNavbar from "@/components/NotionNavbar";
import NotionHero from "@/components/NotionHero";
import NotionFeatures from "@/components/NotionFeatures";
import SimpleFooter from "@/components/SimpleFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-notion-background w-full">
      <NotionNavbar />
      <main className="w-full bg-transparent">
        <NotionHero />
        <NotionFeatures />
      </main>
      
      <SimpleFooter />
    </div>
  );
};

export default Index;
