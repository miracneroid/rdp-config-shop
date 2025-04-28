import React from "react";
import ServerLocationMap from "./ServerLocationMap";

// Only show New York and San Francisco as locations
const LOCATIONS = [
  {
    name: "New York",
    region: "North America",
  },
  {
    name: "San Francisco",
    region: "North America",
  },
];

// Only one region now
const locationsByRegion = {
  "North America": LOCATIONS,
};

const GlobalLocations = () => (
  <section className="w-full py-12 sm:py-16 bg-white dark:bg-black border-t border-b border-gray-100 dark:border-[#222]">
    <div className="w-full px-4 sm:px-8 md:px-16 mx-auto max-w-7xl">
      <div className="text-left mb-8 sm:mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h2 className="notion-heading-2 mb-3 text-left text-3xl sm:text-4xl">
            Global Server Network
          </h2>
          <p className="notion-paragraph max-w-2xl text-gray-500 dark:text-gray-300 text-base sm:text-lg">
            Our infrastructure currently provides high-performance access with server locations strategically placed in the United States.
          </p>
        </div>
      </div>

      <div className="w-full flex justify-center mb-6 sm:mb-8">
        <div className="w-full h-[400px] sm:h-[500px] md:h-[640px]">
          <ServerLocationMap />
        </div>
      </div>
    </div>
  </section>
);

export default GlobalLocations;
