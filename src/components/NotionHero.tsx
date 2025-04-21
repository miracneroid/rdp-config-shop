
import { PuzzleIcon, Infinity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import PricingSection from './PricingSection';
import DashboardCarousel from './DashboardCarousel';
import React from "react";

// Add a mock brand images (replace with actual logos if uploads exist)
const SERVER_BRANDS = [
  { name: "Intel® Xeon", color: "text-blue-900", bg: "bg-white", ring: "ring-[#0071C5]", img: null },
  { name: "AMD EPYC™", color: "text-[#232C3B]", bg: "bg-white", ring: "ring-[#232C3B]", img: null },
  { name: "ARM Neoverse", color: "text-green-900", bg: "bg-white", ring: "ring-[#AFE3A6]", img: null },
  { name: "IBM Power", color: "text-yellow-900", bg: "bg-white", ring: "ring-[#FFD500]", img: null },
  { name: "AWS Graviton", color: "text-green-900", bg: "bg-white", ring: "ring-[#E5FFDF]", img: null },
  { name: "Apple M-Series", color: "text-black", bg: "bg-white", ring: "ring-[#D0D3D4]", img: null },
];

// Optional: you can use simple SVG in place of brand logos, here using Lucide icons for demo
const BRAND_ICONS = [
  "circle", "square", "hexagon", "diamond", "star", "circle-dot"
];
import {
  Circle,
  Square,
  Hexagon,
  Diamond,
  Star,
  CircleDot,
} from "lucide-react";

// Logo icon mapping helper (cycling through Lucide icons)
const ICON_COMPONENTS = [Circle, Square, Hexagon, Diamond, Star, CircleDot];

function InfinityScroller() {
  return (
    <div className="relative w-full flex justify-center z-10 py-8 pointer-events-none">
      {/* Container with glass/blur effect */}
      <div className="relative mx-auto w-full max-w-2xl">
        {/* Gradient overlays for fading "trails" at both ends */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-28 z-20"
          style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)',
          }}
        />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-28 z-20"
          style={{
            background: 'linear-gradient(270deg, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)',
          }}
        />
        <div
          className="rounded-3xl bg-white/70 shadow-xl backdrop-blur-md border border-gray-100 overflow-hidden"
          style={{
            boxShadow: '0 6px 36px rgba(27,19,61,0.09), 0 2px 8px rgba(0,0,0,0.13)',
          }}
        >
          {/* Marquee Animation */}
          <div
            className="relative w-full flex items-center overflow-hidden"
            style={{ height: 64 }}
          >
            <div
              className="flex items-center animate-infinite-scroll"
              style={{
                gap: '32px',
                animation: 'brand-marquee 27s linear infinite',
                minWidth: "100%",
                whiteSpace: "nowrap"
              }}
            >
              {[...SERVER_BRANDS, ...SERVER_BRANDS].map((brand, idx) => {
                const Icon = ICON_COMPONENTS[idx % ICON_COMPONENTS.length];
                return (
                  <span
                    key={idx}
                    className={`
                      group relative flex items-center gap-3 px-5 py-2 rounded-full
                      shadow-md font-mono text-base font-bold hover:scale-105 transition-all duration-300
                      ${brand.bg} ${brand.color}
                      ring-2 ${brand.ring}
                      pointer-events-auto
                    `}
                    style={{
                      filter: "drop-shadow(0 2px 16px rgba(74,58,255,0.06))",
                      minWidth: "170px"
                    }}
                  >
                    <span
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-inner border border-gray-200 mr-2"
                    >
                      <Icon className="w-7 h-7 text-blue-400 group-hover:text-blue-700 transition-colors duration-200" />
                    </span>
                    <span
                      className="font-mono font-semibold text-base tracking-tight select-none"
                      style={{ textShadow: '0 1px 8px #fff9, 0 0 4px #fff9' }}
                    >
                      {brand.name}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        {/* Inline keyframes for marquee */}
        <style>{`
          @keyframes brand-marquee {
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
        {/* Improved Infinity Scroller, centered */}
        <div className="absolute w-full left-0 right-0 bottom-0 flex justify-center z-20">
          <InfinityScroller />
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
