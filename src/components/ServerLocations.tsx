
import React from "react";
import { Globe } from "lucide-react";

export type ServerLocation = {
  name: string;
  region: string;
  status?: "operational" | "maintenance" | "offline";
  pingMs?: number;
};

interface ServerLocationsProps {
  locations: ServerLocation[];
  showStatus?: boolean;
  showPing?: boolean;
}

const ServerLocations: React.FC<ServerLocationsProps> = ({ 
  locations, 
  showStatus = false,
  showPing = false 
}) => {
  // Group locations by region
  const locationsByRegion = locations.reduce((acc, location) => {
    if (!acc[location.region]) {
      acc[location.region] = [];
    }
    acc[location.region].push(location);
    return acc;
  }, {} as Record<string, ServerLocation[]>);

  const getStatusIndicator = (status?: string) => {
    switch(status) {
      case "operational":
        return <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>;
      case "maintenance":
        return <span className="h-2 w-2 rounded-full bg-amber-500 mr-2"></span>;
      case "offline":
        return <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>;
      default:
        return <span className="h-2 w-2 rounded-full bg-rdp-blue dark:bg-rdp-blue-light mr-2"></span>;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {Object.entries(locationsByRegion).map(([region, locations]) => (
        <div key={region} className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
          <h3 className="text-xl font-semibold mb-3 flex items-center">
            <Globe className="h-5 w-5 mr-2 text-rdp-blue dark:text-rdp-blue-light" />
            {region}
          </h3>
          <ul className="space-y-2">
            {locations.map((location) => (
              <li key={location.name} className="flex items-center justify-between">
                <span className="flex items-center">
                  {getStatusIndicator(location.status)}
                  {location.name}
                </span>
                {showPing && location.pingMs && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {location.pingMs}ms
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ServerLocations;
