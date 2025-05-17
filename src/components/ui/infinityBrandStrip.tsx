import React from "react";

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
        <polygon points="20,10 27,14 27,22 20,26 13,22 13,14" fill="none" stroke="#c2c2c2" strokeWidth="1.5" />
        <polygon points="33,14 40,18 40,26 33,30 26,26 26,18" fill="none" stroke="#c2c2c2" strokeWidth="1.5" />
        <text x="48" y="20" fontFamily="sans-serif" fontWeight="700" fontSize="18" fill="#c2c2c2">RIPE NCC</text>
        <text x="48" y="28" fontFamily="sans-serif" fontWeight="400" fontSize="9" fill="#c2c2c2" opacity="0.75">RIPE NETWORK COORDINATION CENTRE</text>
      </svg>
    ),
  },
];

export function InfinityBrandStrip() {
  return (
    <div className="relative w-full flex justify-center py-6 lg:py-10 bg-transparent z-10 select-none overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gray-100 dark:bg-gray-800" />
      <div className="absolute left-0 top-0 h-full w-24 z-20 pointer-events-none" style={{
        background: 'linear-gradient(90deg, var(--bg-gradient-start) 75%, rgba(0,0,0,0))'
      }} />
      <div className="absolute right-0 top-0 h-full w-24 z-20 pointer-events-none" style={{
        background: 'linear-gradient(270deg, var(--bg-gradient-start) 70%, rgba(0,0,0,0))'
      }} />
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
      <style>{`
        @keyframes brands-scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        :root {
          --bg-gradient-start: #ffffff;
        }
        .dark {
          --bg-gradient-start: #000000;
        }
      `}</style>
    </div>
  );
}
