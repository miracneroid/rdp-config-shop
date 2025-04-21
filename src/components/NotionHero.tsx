import React from "react";
import { Link } from 'react-router-dom';
import { PuzzleIcon } from 'lucide-react';
import PricingSection from './PricingSection';
import DashboardCarousel from './DashboardCarousel';
import { ArrowRight, LayoutGrid, Image } from 'lucide-react';

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

// Updated Infinity Brand Strip with lighter style and subtle shadow
function InfinityBrandStrip() {
  return (
    <div className="relative w-full flex justify-center py-6 lg:py-10 bg-transparent z-10 select-none">
      {/* faint top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gray-100 dark:bg-[#181818]" />
      {/* lighter fade overlays (left/right) */}
      <div className="absolute left-0 top-0 h-full w-24 z-20 pointer-events-none" style={{
        background: 'linear-gradient(90deg, #fafaff 75%, rgba(0,0,0,0))'
      }}/>
      <div className="absolute right-0 top-0 h-full w-24 z-20 pointer-events-none" style={{
        background: 'linear-gradient(270deg, #fafaff 70%, rgba(0,0,0,0))'
      }}/>
      {/* Marquee */}
      <div
        className="relative flex items-center"
        style={{
          minWidth: "100%",
          whiteSpace: "nowrap",
          animation: "brands-scroll-marquee 30s linear infinite"
        }}
      >
        {[...BRANDS, ...BRANDS].map((brand, i) => (
          <span
            key={i}
            className="mx-8 sm:mx-12 inline-flex flex-col items-center justify-center opacity-80 transition-transform duration-300 hover:scale-105 hover:opacity-100"
            style={{
              minWidth: 120,
              maxWidth: 170,
              filter: "grayscale(1)",
            }}
            aria-label={brand.name}
          >
            {brand.svg}
          </span>
        ))}
      </div>
      {/* Keyframes for seamless scroll */}
      <style>{`
        @keyframes brands-scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

const STAT_BADGES = [
  {
    icon: <LayoutGrid className="h-4 w-4 mr-1 text-blue-700 dark:text-white" />,
    label: "147k+ deployed servers"
  },
  {
    icon: <Image className="h-4 w-4 mr-1 text-blue-700 dark:text-white" />,
    label: "99.9% uptime"
  },
  {
    icon: (
      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="10" strokeWidth="2" className="stroke-blue-700 dark:stroke-white"/>
        <path strokeWidth="2" d="M12 6v6l4 2" className="stroke-blue-700 dark:stroke-white"/>
      </svg>
    ),
    label: "5min setup time"
  }
];

// Main landing section, styled as in the screenshot
const NotionHero = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative w-full font-sans flex flex-col items-center justify-center min-h-[70vh] bg-white dark:bg-black pt-8 lg:pt-14 transition-colors">
        {/* soft purple bg blur, behind headline+text (left) */}
        <div className="absolute left-0 top-16 z-0 pointer-events-none">
          <div className="w-[320px] h-[320px] rounded-full bg-[#bca3fa]/30 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center w-full z-10 relative px-4 lg:px-10">
          <div className="flex flex-col flex-1 items-start max-w-xl sm:mt-2 md:mt-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#111827] dark:text-white leading-tight mb-6 tracking-tight font-sans">
              100%{" "}
              <span className="inline-block relative align-baseline">
                <span className="bg-[#e6eeff] rounded-md px-2 pb-1 text-[#202f5a] dark:bg-[#312545] dark:text-[#f1eefc] animate-[pulse_2.5s_ease-in-out_infinite]">
                  privacy
                </span>
              </span>{" "}
              focused
              <br/>
              hosting
            </h1>
            <p className="text-lg md:text-xl text-[#2f323a] dark:text-[#eee] font-sans mb-7 max-w-lg" style={{ fontWeight: 400 }}>
              Cloud provider backed by EU-legislation and high quality standards from The Netherlands <span role="img" aria-label="NL">🇳🇱</span>, Phoenix <span role="img" aria-label="US">🇺🇸</span> and Poland <span role="img" aria-label="PL">🇵🇱</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-5">
              <Link to="/pricing" className="inline-flex items-center rounded-lg bg-[#272d45] hover:bg-[#393f60] px-7 py-3.5 text-white text-lg font-semibold shadow transition">
                <span>Instant deployment</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            {/* STAT BADGES */}
            <div className="flex flex-wrap gap-3 mb-2 mt-2">
              {STAT_BADGES.map((b, i) => (
                <div key={i} className="flex items-center px-3 py-2 bg-[#f7f8fa] dark:bg-[#232323] border border-[#e4eaf3] dark:border-[#353549] rounded-lg text-[#333D51] dark:text-white font-mono text-base shadow-sm hover:shadow transition">
                  {b.icon}
                  {b.label}
                </div>
              ))}
            </div>
          </div>
          {/* Dashboard illustrative image mockup */}
          <div className="flex-1 flex justify-center items-center z-10 mt-10 md:mt-0 md:ml-8 lg:ml-14">
            <div className="relative shadow-2xl rounded-2xl border border-[#eff1f8] dark:border-[#222] bg-white dark:bg-[#18181a] overflow-hidden w-[92vw] max-w-xl md:w-[490px] md:max-w-none lg:w-[570px]">
              <img
                src="/lovable-uploads/dashboard-v3-dark-DkIL4YRw.webp"
                alt="Dashboard preview"
                className="w-full h-auto block"
                draggable={false}
                style={{objectFit: "cover"}}
              />
              {/* Soft highlight at top */}
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-b from-[#efeffd] dark:from-[#222] to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
        {/* Infinity Brand Strip, below hero */}
        <div className="relative w-full max-w-7xl mx-auto z-10 mt-12" style={{marginBottom: "1.5rem"}}>
          <InfinityBrandStrip />
        </div>
      </section>

      {/* SLIDESHOW SECTION and PRICING below */}
      <section className="bg-white dark:bg-black w-full pt-8 pb-4 font-sans border-t border-gray-100 dark:border-[#222]">
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
