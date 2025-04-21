
import React from "react";

const LOCATIONS = [
  {
    name: "Phoenix",
    style: "left-[23%] top-[53%]",
  },
  {
    name: "Miami",
    style: "left-[29%] top-[61%]",
  },
  {
    name: "Amsterdam",
    style: "left-[63%] top-[32%]",
  },
  {
    name: "Warsaw",
    style: "left-[72%] top-[27%]",
  },
];

const GlobalLocations = () => (
  <section className="w-full py-12 sm:py-16 lg:py-20">
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-7">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1e2537] mb-2">Our Global Locations</h2>
        <p className="text-lg text-gray-500">Premium infrastructure with strategic locations worldwide</p>
      </div>
      <div className="relative w-full h-[340px] md:h-[420px] lg:h-[465px] xl:h-[520px] 2xl:h-[580px]">
        <img
          src="/lovable-uploads/39d58574-fcd5-4ca1-92d0-a5f48152b4f9.png"
          alt="World map"
          className="w-full h-full object-contain pointer-events-none select-none"
          draggable={false}
        />

        {LOCATIONS.map(loc => (
          <div
            key={loc.name}
            className={`absolute ${loc.style} flex flex-col items-center group`}
            style={{ zIndex: 2, minWidth: '90px' }}
          >
            <div className="rounded-md bg-black text-white px-3.5 py-1 text-sm font-semibold mb-1 shadow transition group-hover:bg-[#1e2537]">
              {loc.name}
            </div>
            <div className="w-3 h-3 rounded-[3px] bg-blue-600"></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default GlobalLocations;
