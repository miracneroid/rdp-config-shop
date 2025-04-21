
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
  <section className="w-full py-16">
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-left mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h2 className="notion-heading-2 mb-3 text-left">
            Global Server Network
          </h2>
          <p className="notion-paragraph max-w-2xl text-gray-500">
            Our infrastructure currently provides high-performance access with server locations strategically placed in the United States.
          </p>
        </div>
      </div>

      {/* Interactive map as the main visual */}
      <div className="w-full flex justify-center mb-8">
        <div className="w-full max-w-5xl">
          <ServerLocationMap />
        </div>
      </div>
    </div>
  </section>
);

export default GlobalLocations;
