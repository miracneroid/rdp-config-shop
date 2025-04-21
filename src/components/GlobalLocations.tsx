
import React from "react";
import { MapPin } from "lucide-react";

const LOCATIONS = [
  {
    name: "New York",
    style: "left-[26%] top-[40%]",
    region: "North America",
  },
  {
    name: "Miami",
    style: "left-[29%] top-[52%]",
    region: "North America",
  },
  {
    name: "San Francisco",
    style: "left-[17%] top-[43%]",
    region: "North America",
  },
  {
    name: "London",
    style: "left-[51%] top-[32%]",
    region: "Europe",
  },
  {
    name: "Amsterdam",
    style: "left-[54%] top-[30%]",
    region: "Europe",
  },
  {
    name: "Frankfurt",
    style: "left-[56%] top-[33%]",
    region: "Europe",
  },
  {
    name: "Singapore",
    style: "left-[78%] top-[58%]",
    region: "Asia Pacific",
  },
  {
    name: "Tokyo",
    style: "left-[86%] top-[42%]",
    region: "Asia Pacific",
  },
  {
    name: "Sydney",
    style: "left-[90%] top-[70%]",
    region: "Asia Pacific",
  },
  {
    name: "São Paulo",
    style: "left-[35%] top-[68%]",
    region: "South America",
  },
];

// Group locations by region
const locationsByRegion = LOCATIONS.reduce((acc, location) => {
  if (!acc[location.region]) {
    acc[location.region] = [];
  }
  acc[location.region].push(location);
  return acc;
}, {} as Record<string, typeof LOCATIONS>);

const GlobalLocations = () => (
  <section className="w-full py-20 sm:py-24 lg:py-28 font-sans bg-gradient-to-b from-white to-gray-50">
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="notion-heading-2 mb-3">
          Global Server Network
        </h2>
        <p className="notion-paragraph max-w-2xl mx-auto">
          Our premium infrastructure with strategic locations worldwide ensures low-latency access and optimal performance for your remote desktops.
        </p>
      </div>
      
      {/* Map container with increased height */}
      <div className="relative w-full h-[450px] md:h-[550px] lg:h-[650px] xl:h-[700px] mb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 opacity-30 z-10 pointer-events-none"></div>
        <img
          src="/lovable-uploads/39d58574-fcd5-4ca1-92d0-a5f48152b4f9.png"
          alt="World map"
          className="w-full h-full object-cover pointer-events-none select-none rounded-xl shadow-lg"
          draggable={false}
        />

        {LOCATIONS.map(loc => (
          <div
            key={loc.name}
            className={`absolute ${loc.style} flex flex-col items-center group z-20`}
            style={{ transform: "translate(-50%, -100%)" }}
          >
            <div className="rounded-lg bg-blue-600 text-white px-3 py-1.5 text-sm font-semibold mb-1.5 shadow-md transition-all duration-200 group-hover:bg-blue-700 whitespace-nowrap">
              {loc.name}
            </div>
            <div className="relative">
              <div className="absolute -inset-2 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
              <MapPin className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Region breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {Object.entries(locationsByRegion).map(([region, locations]) => (
          <div key={region} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{region}</h3>
            <ul className="space-y-2">
              {locations.map(location => (
                <li key={location.name} className="flex items-center text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mr-2"></div>
                  {location.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default GlobalLocations;
