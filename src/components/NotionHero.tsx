
import { PuzzleIcon, Infinity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import PricingSection from './PricingSection';
import DashboardCarousel from './DashboardCarousel';
import React from "react";

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

// InfinityScroller component, reused and easy to customize
const SERVER_BRANDS = [
  { name: "Intel® Xeon", color: "text-blue-200", bg: "bg-[#0071C5]" },
  { name: "AMD EPYC™", color: "text-white", bg: "bg-[#232C3B]" },
  { name: "ARM Neoverse", color: "text-gray-900", bg: "bg-[#AFE3A6]" },
  { name: "IBM Power", color: "text-black", bg: "bg-[#FFD500]" },
  { name: "AWS Graviton", color: "text-green-900", bg: "bg-[#E5FFDF]" },
  { name: "Apple M-Series", color: "text-black", bg: "bg-[#D0D3D4]" },
];

function InfinityScroller() {
  return (
    <div className="w-full bg-gray-900 py-2 border-b border-gray-800 overflow-hidden">
      <div className="relative flex items-center">
        <Infinity className="text-white opacity-60 mx-6" />
        {/* Marquee effect using extra wide, doubled brand list */}
        <div
          className="flex items-center gap-6 animate-infinite-scroll"
          style={{
            minWidth: "100%",
            animation: "marquee-left 24s linear infinite",
            // Responsive: wraps if space, but force single line/scroll on all except XS
            whiteSpace: "nowrap"
          }}
        >
          {[...SERVER_BRANDS, ...SERVER_BRANDS].map((brand, idx) => (
            <span
              key={idx}
              className={`px-4 py-1 rounded-md font-mono text-sm font-bold mx-1 shadow ${
                brand.bg
              } ${brand.color} transition-transform duration-200`}
              style={{ minWidth: 110, display: 'inline-block' }}
            >
              {brand.name}
            </span>
          ))}
        </div>
      </div>
      {/* Marquee animation */}
      <style>{`
      @keyframes marquee-left {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-infinite-scroll {
        will-change: transform;
        display: flex;
        align-items: center;
      }
      `}</style>
    </div>
  );
}

const NotionHero = () => {
  return (
    <>
      {/* HERO SECTION takes full height */}
      <section className="bg-white w-full font-sans flex items-center min-h-screen relative">
        <div className="notion-page-container flex flex-col-reverse md:flex-row items-center w-full py-16 md:py-0">
          <div className="text-left flex-1">
            <h1 className="notion-heading-1">
              The happier<br />
              <span>workspace puzzle</span>
            </h1>
            <p className="mt-6 notion-paragraph max-w-2xl">
              Configure. Connect. Deploy. Put together your ideal remote desktop environment
              with our easy-to-use building blocks.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="inline-flex items-center justify-center notion-button cursor-pointer">
                <PuzzleIcon className="mr-2 h-5 w-5 text-white" />
                Start Building
              </Link>
              <Link to="/pricing" className="inline-flex items-center justify-center notion-button-outline cursor-pointer">
                View Pricing
              </Link>
            </div>
          </div>
          <div className="relative flex-1 flex justify-center">
            <img
              src="/lovable-uploads/8f2131b2-d7e7-42cb-bba7-d50ac84b91a2.png"
              alt="Puzzle RDP Logo"
              className="w-full h-auto max-w-md animate-float"
            />
          </div>
        </div>
        {/* InfinityScroller strip replaces the arrow */}
        <div className="absolute w-full left-0 bottom-0">
          <InfinityScroller />
        </div>
      </section>

      {/* SLIDESHOW SECTION (DashboardCarousel) and PRICING now below, visible on scroll */}
      <section className="bg-white w-full pt-8 pb-4 font-sans border-t border-gray-100">
        <div className="notion-page-container">
          {/* Dashboard Slideshow - appears when user scrolls below hero */}
          <div className="mb-12">
            <DashboardCarousel />
          </div>
          {/* Pricing Section */}
          <div>
            <div className="text-center">
              <h2 className="notion-heading-2">
                Choose your puzzle pieces
              </h2>
              <p className="notion-paragraph max-w-2xl mx-auto mb-6">
                Simple, transparent pricing for building your perfect workspace.
              </p>
            </div>
            <PricingSection plans={defaultPricingPlans} showDetailedComparison={false} />
          </div>
        </div>
      </section>
    </>
  );
};

export default NotionHero;
