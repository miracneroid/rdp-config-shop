
import React from "react";
import NotionNavbar from "@/components/NotionNavbar";
import NotionHero from "@/components/NotionHero";
import NotionFeatures from "@/components/NotionFeatures";
import NotionComparison from "@/components/NotionComparison";
import NotionFooter from "@/components/NotionFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PricingSection from "@/components/PricingSection";

const defaultPricingPlans = [
  {
    name: "Basic",
    price: 29,
    cpu: "2 Cores",
    ram: "4 GB",
    storage: "64 GB SSD",
    features: [
      "Windows or Linux OS",
      "Basic Software Package",
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
      "Basic Software Package",
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
      "Professional Software Package",
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
      "Enterprise Software Package",
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
    <div className="min-h-screen bg-notion-background w-full">
      <NotionNavbar />
      <main className="w-full bg-transparent">
        <NotionHero />
        
        <NotionFeatures />
        
        {/* Pricing Section with Notion styling */}
        <section className="bg-white py-16">
          <div className="notion-page-container">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-2 text-black border-black">Pricing</Badge>
              <h2 className="notion-heading-2">Choose your puzzle pieces</h2>
              <p className="notion-paragraph max-w-2xl mx-auto">
                Simple, transparent pricing for building your perfect workspace.
              </p>
            </div>
            
            <PricingSection plans={defaultPricingPlans} showDetailedComparison={false} />
            
            <div className="mt-10 text-center">
              <Link to="/pricing">
                <Button className="notion-button">
                  View Full Pricing Details
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <NotionComparison />
      </main>
      
      <NotionFooter />
    </div>
  );
};

export default Index;
