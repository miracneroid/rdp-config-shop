import React from "react";
import NotionNavbar from "@/components/NotionNavbar";
import NotionHero from "@/components/NotionHero";
import NotionFeatures from "@/components/NotionFeatures";
import SimpleFooter from "@/components/SimpleFooter";
import StatsBanner from "@/components/StatsBanner";
import GlobalLocations from "@/components/GlobalLocations";
import ControlPanelSection from "@/components/ControlPanelSection";
// Slideshow and Pricing must be isolated!
import DashboardCarousel from "@/components/DashboardCarousel";
import PricingSection from "@/components/PricingSection";

// Brand strip taken from NotionHero for re-use here
const InfinityBrandStrip = NotionHero as any
  ? (NotionHero as any).__INFINITY_STRIP || (() => null)
  : () => null;

const defaultPricingPlans = [
  {
    name: "Basic",
    price: 29,
    cpu: "2 Cores",
    ram: "4 GB",
    storage: "64 GB SSD",
    features: [
      "Windows or Linux OS",
      "Basic Software Suite",
      "24/7 Access",
      "Standard Support"
    ]
  },
  {
    name: "Standard",
    price: 59,
    cpu: "4 Cores",
    ram: "8 GB",
    storage: "128 GB SSD",
    features: [
      "Windows or Linux OS",
      "Standard Software Suite",
      "24/7 Access",
      "Priority Support",
      "Daily Backups"
    ],
    popular: true
  },
  {
    name: "Premium",
    price: 99,
    cpu: "8 Cores",
    ram: "16 GB",
    storage: "256 GB SSD",
    features: [
      "Windows or Linux OS",
      "Professional Software Suite",
      "24/7 Access",
      "Priority Support",
      "Daily Backups",
      "Enhanced Security"
    ]
  },
  {
    name: "Enterprise",
    price: 199,
    cpu: "16 Cores",
    ram: "32 GB",
    storage: "512 GB SSD",
    features: [
      "Windows or Linux OS",
      "Enterprise Software Suite",
      "24/7 Access",
      "Priority Support",
      "Hourly Backups",
      "Advanced Security",
      "Dedicated Resources"
    ]
  }
];

const Index = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-notion-background font-sans">
      <NotionNavbar />
      {/* Enable vertical snap scroll */}
      <main className="flex-1 flex flex-col w-full scroll-smooth snap-y snap-mandatory overflow-y-auto">
        {/* Landing/Hero Page, ends with Infinity brand strip */}
        <section className="relative w-full min-h-screen h-screen flex flex-col snap-start snap-always bg-white">
          <div className="flex-1 flex flex-col">
            <NotionHero />
          </div>
          {/* Visually ensure the Infinity Brand Strip is at the bottom */}
          <div className="flex justify-center items-end">
            {/* The NotionHero already includes the InfinityBrandStrip, so this is for demonstration */}
          </div>
        </section>
        {/* Slideshow Section */}
        <section
          className="w-full min-h-screen flex flex-col justify-center items-center snap-start snap-always bg-white"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center py-16">
            <div className="mb-12 w-full">
              <DashboardCarousel />
            </div>
          </div>
        </section>
        {/* Pricing Section */}
        <section
          className="w-full min-h-screen flex flex-col justify-center items-center snap-start snap-always bg-white"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="w-full max-w-7xl mx-auto py-16 flex flex-col items-center justify-center">
            <div className="text-center mb-6">
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-2">Choose your puzzle pieces</h2>
              <p className="text-lg text-gray-600">Simple, transparent pricing for building your perfect workspace.</p>
            </div>
            <div className="w-full">
              <PricingSection plans={defaultPricingPlans} showDetailedComparison={false} />
            </div>
          </div>
        </section>
        {/* Control Panel ("Your workflow. Your way.") Section */}
        <section
          className="w-full min-h-screen flex flex-col justify-center items-center snap-start snap-always"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="w-full">
            <ControlPanelSection />
          </div>
        </section>
        {/* Notion Features Section */}
        <section
          className="w-full min-h-screen flex flex-col justify-center items-center snap-start snap-always"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="w-full">
            <NotionFeatures />
          </div>
        </section>
        {/* Global Server Network, center content */}
        <section
          className="w-full min-h-screen flex flex-col justify-center items-center snap-start snap-always bg-white"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="w-full flex-1 flex flex-col justify-center items-center">
            <div className="w-full flex flex-col justify-center items-center">
              <GlobalLocations />
            </div>
          </div>
        </section>
      </main>
      {/* Keep stats banner and footer out of snap scroll */}
      <div className="w-full">
        <StatsBanner />
        <SimpleFooter />
      </div>
    </div>
  );
};

export default Index;
