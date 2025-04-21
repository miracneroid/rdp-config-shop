
import React from "react";
import ServerLocationMap from "./ServerLocationMap";

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
  <section className="w-full py-20 sm:py-24 lg:py-28 font-sans bg-gradient-to-b from-white to-gray-50">
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

      {/* Interactive map replaces the screenshot */}
      <ServerLocationMap />

      {/* Region breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
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
