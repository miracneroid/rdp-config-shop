
import React from "react";
import { Link } from 'react-router-dom';
import { PuzzleIcon } from 'lucide-react';
import PricingSection from './PricingSection';
import DashboardCarousel from './DashboardCarousel';

// Fix: define defaultPricingPlans for PricingSection
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

// Minimalist grayscale SVG placeholders for brands
const BRANDS = [
  {
    name: "AMD",
    svg: (
      <svg viewBox="0 0 80 32" fill="none" className="h-8 w-auto">
        <text x="0" y="22" fontFamily="sans-serif" fontWeight="700" fontSize="28" fill="#bdbdbd" letterSpacing="-2">AMD</text>
        <polygon points="65,8 74,8 74,24 65,24 69.5,16" fill="#bdbdbd" opacity="0.55" />
      </svg>
    ),
  },
  {
    name: "ARISTA",
    svg: (
      <svg viewBox="0 0 98 32" fill="none" className="h-8 w-auto">
        <text x="0" y="22" fontFamily="monospace" fontWeight="600" fontSize="25" fill="#c3c3c3" letterSpacing="3">ARISTA</text>
      </svg>
    ),
  },
  {
    name: "corero",
    svg: (
      <svg viewBox="0 0 102 32" fill="none" className="h-8 w-auto">
        <text x="0" y="22" fontFamily="sans-serif" fontWeight="400" fontSize="26" fill="#cecece" letterSpacing="0">corero</text>
        {/* target/crosshair circle */}
        <circle cx="89" cy="15" r="8" stroke="#cecece" strokeWidth="2" opacity="0.7" />
        <line x1="89" y1="7" x2="89" y2="23" stroke="#cecece" strokeWidth="1.2" opacity="0.7" />
        <line x1="81" y1="15" x2="97" y2="15" stroke="#cecece" strokeWidth="1.2" opacity="0.7" />
        <text x="7" y="30" fontFamily="sans-serif" fontWeight="200" fontSize="9" fill="#dddddd" opacity="0.8" style={{ letterSpacing: 0.5 }}>FIRST LINE OF DEFENSE</text>
      </svg>
    ),
  },
  {
    name: "Hewlett Packard Enterprise",
    svg: (
      <svg viewBox="0 0 108 32" fill="none" className="h-8 w-auto">
        <rect x="5" y="8" width="40" height="5" rx="1" fill="#dadada" />
        <text x="0" y="23" fontFamily="sans-serif" fontWeight="600" fontSize="11" fill="#cdcdcd">Hewlett Packard</text>
        <text x="0" y="32" fontFamily="sans-serif" fontWeight="400" fontSize="10" fill="#cdcdcd" opacity="0.8">Enterprise</text>
      </svg>
    ),
  },
  {
    name: "era1X",
    svg: (
      <svg viewBox="0 0 82 32" fill="none" className="h-8 w-auto">
        <text x="0" y="22" fontFamily="sans-serif" fontWeight="500" fontSize="22" fill="#d1d1d1">era</text>
        <rect x="43" y="8" width="8" height="7" rx="2" fill="#dadada" />
        <rect x="51" y="17" width="8" height="7" rx="2" fill="#dadada" />
      </svg>
    ),
  },
  {
    name: "RIPE NCC",
    svg: (
      <svg viewBox="0 0 112 32" fill="none" className="h-8 w-auto">
        {/* network hexagons */}
        <polygon points="20,10 27,14 27,22 20,26 13,22 13,14" fill="none" stroke="#c2c2c2" strokeWidth="1.5" />
        <polygon points="33,14 40,18 40,26 33,30 26,26 26,18" fill="none" stroke="#c2c2c2" strokeWidth="1.5" />
        <text x="48" y="20" fontFamily="sans-serif" fontWeight="700" fontSize="18" fill="#c2c2c2">RIPE NCC</text>
        <text x="48" y="28" fontFamily="sans-serif" fontWeight="400" fontSize="9" fill="#c2c2c2" opacity="0.75">RIPE NETWORK COORDINATION CENTRE</text>
      </svg>
    ),
  },
  // Loop for repeat, as in image, we'll repeat AMD at the end
  {
    name: "AMD",
    svg: (
      <svg viewBox="0 0 80 32" fill="none" className="h-8 w-auto">
        <text x="0" y="22" fontFamily="sans-serif" fontWeight="700" fontSize="28" fill="#bdbdbd" letterSpacing="-2">AMD</text>
        <polygon points="65,8 74,8 74,24 65,24 69.5,16" fill="#bdbdbd" opacity="0.55" />
      </svg>
    ),
  },
];

// Infinity Marquee/Scroller, centered and aesthetic as requested 
function InfinityBrandStrip() {
  return (
    <div className="relative w-full flex justify-center py-9 z-20 select-none">
      <div className="relative w-[90vw] max-w-6xl mx-auto overflow-hidden rounded-xl shadow-none bg-transparent flex items-center h-24">
        {/* Fade left */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-32 z-20" style={{
          background: 'linear-gradient(90deg, #fff 75%, rgba(255,255,255,0))'
        }}/>
        {/* Fade right */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-32 z-20" style={{
          background: 'linear-gradient(270deg, #fff 70%, rgba(255,255,255,0))'
        }}/>
        {/* Scroll Strip - doubled for seamless loop */}
        <div
          className="relative flex items-center"
          style={{
            minWidth: "100%",
            whiteSpace: "nowrap",
            animation: "brands-scroll-marquee 30s linear infinite"
          }}
        >
          {/* Render two sets in a row for infinite effect */}
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <span
              key={i}
              className="mx-12 inline-flex flex-col items-center justify-center opacity-60 transition-transform duration-300 hover:scale-105 hover:opacity-100"
              style={{
                minWidth: 150,
                maxWidth: 170,
                filter: "grayscale(1)",
              }}
              aria-label={brand.name}
            >
              {brand.svg}
            </span>
          ))}
        </div>
      </div>
      {/* Keyframes for marquee */}
      <style>{`
        @keyframes brands-scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

const NotionHero = () => {
  return (
    <>
      {/* HERO SECTION */}
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
        {/* New Infinity Brand Strip, centered and elegant */}
        <div className="absolute w-full left-0 right-0 bottom-0 flex justify-center z-20 pointer-events-none">
          <InfinityBrandStrip />
        </div>
      </section>

      {/* SLIDESHOW SECTION and PRICING below */}
      <section className="bg-white w-full pt-8 pb-4 font-sans border-t border-gray-100">
        <div className="notion-page-container">
          {/* Dashboard Slideshow */}
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
