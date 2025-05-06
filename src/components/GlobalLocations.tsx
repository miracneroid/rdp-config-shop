
import React from "react";
import ServerLocationMap from "./ServerLocationMap";
import ServerLocations, { ServerLocation } from "./ServerLocations";

// Updated list of global server locations with properly typed status values
const LOCATIONS: ServerLocation[] = [
  {
    name: "New York",
    region: "North America",
    status: "operational",
    pingMs: 42
  },
  {
    name: "San Francisco",
    region: "North America",
    status: "operational",
    pingMs: 38
  },
  {
    name: "Chicago",
    region: "North America",
    status: "operational",
    pingMs: 45
  },
  {
    name: "Miami",
    region: "North America",
    status: "operational",
    pingMs: 51
  },
  {
    name: "London",
    region: "Europe",
    status: "operational",
    pingMs: 89
  },
  {
    name: "Amsterdam",
    region: "Europe",
    status: "maintenance",
    pingMs: 95
  },
  {
    name: "Frankfurt",
    region: "Europe",
    status: "operational",
    pingMs: 92
  },
  {
    name: "Singapore",
    region: "Asia Pacific",
    status: "operational",
    pingMs: 124
  },
  {
    name: "Tokyo",
    region: "Asia Pacific",
    status: "operational",
    pingMs: 147
  },
  {
    name: "Sydney",
    region: "Asia Pacific",
    status: "operational",
    pingMs: 168
  },
];

const GlobalLocations = () => (
  <section className="w-full py-12 sm:py-16 bg-white dark:bg-black border-t border-b border-gray-100 dark:border-[#222]">
    <div className="w-full px-4 sm:px-8 md:px-16 mx-auto max-w-7xl">
      <div className="text-left mb-8 sm:mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h2 className="notion-heading-2 mb-3 text-left text-3xl sm:text-4xl">
            Global Server Network
          </h2>
          <p className="notion-paragraph max-w-2xl text-gray-500 dark:text-gray-300 text-base sm:text-lg">
            Our infrastructure provides high-performance access with server locations strategically placed across North America, Europe, and Asia Pacific.
          </p>
        </div>
      </div>

      <div className="w-full flex justify-center mb-6 sm:mb-8">
        <div className="w-full h-[400px] sm:h-[500px] md:h-[640px]">
          <ServerLocationMap />
        </div>
      </div>

      <ServerLocations locations={LOCATIONS} showStatus showPing />
    </div>
  </section>
);

export default GlobalLocations;
