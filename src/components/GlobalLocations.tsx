
import React from "react";
import ServerLocationMap from "./ServerLocationMap";

// Updated list of global server locations
const LOCATIONS = [
  {
    name: "New York",
    region: "North America",
  },
  {
    name: "San Francisco",
    region: "North America",
  },
  {
    name: "Chicago",
    region: "North America",
  },
  {
    name: "Miami",
    region: "North America",
  },
  {
    name: "London",
    region: "Europe",
  },
  {
    name: "Amsterdam",
    region: "Europe",
  },
  {
    name: "Frankfurt",
    region: "Europe",
  },
  {
    name: "Singapore",
    region: "Asia Pacific",
  },
  {
    name: "Tokyo",
    region: "Asia Pacific",
  },
  {
    name: "Sydney",
    region: "Asia Pacific",
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {Object.entries(locationsByRegion).map(([region, locations]) => (
          <div key={region} className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
            <h3 className="text-xl font-semibold mb-3">{region}</h3>
            <ul className="space-y-2">
              {locations.map((location) => (
                <li key={location.name} className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-rdp-blue dark:bg-rdp-blue-light mr-2"></span>
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
