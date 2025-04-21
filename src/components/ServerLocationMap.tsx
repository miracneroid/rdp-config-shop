
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";

// Server locations to display on the map
const LOCATIONS = [
  {
    name: "New York",
    coords: [-74.0087, 40.7128], // [lng, lat]
  },
  {
    name: "San Francisco",
    coords: [-122.4194, 37.7749],
  },
];

const DEFAULT_TOKEN = ""; // Optionally provide your token here for production

const ServerLocationMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const [token, setToken] = useState(DEFAULT_TOKEN);

  useEffect(() => {
    if (!token || !mapContainer.current) return;

    mapboxgl.accessToken = token;

    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
    }

    // Roughly center between NY and SF
    mapInstance.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-98.5, 39.5], // midpoint US
      zoom: 2.7,
      attributionControl: false,
      projection: "globe",
      pitch: 10,
    });

    // Add controls
    mapInstance.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

    // Add server markers
    LOCATIONS.forEach((loc) => {
      // Create a node for Lucide icon
      const markerNode = document.createElement("div");
      markerNode.className = "group";
      markerNode.innerHTML = `
        <div class="flex flex-col items-center">
          <div class="mb-1.5 px-2 py-1 rounded-md text-xs font-semibold bg-blue-600 text-white shadow group-hover:bg-blue-700 transition-all">${loc.name}</div>
          <div>
            <span style="display:inline-flex;align-items:center;">
              ${MapPin({ size: 28, color: "#2563eb" }).props.children
                ? `<svg width="28" height="28" fill="none" stroke="#2563eb" stroke-width="2" viewBox="0 0 24 24" class="mapbox-marker" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10.5c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z"></path>
                    <circle cx="12" cy="10.5" r="3"></circle>
                  </svg>`
                : ""}
            </span>
          </div>
        </div>
      `;
      // Make click highlight or tooltip if desired here

      new mapboxgl.Marker({ element: markerNode, anchor: "bottom" })
        .setLngLat(loc.coords)
        .addTo(mapInstance.current!);
    });

    // Add fog
    mapInstance.current.on("style.load", () => {
      mapInstance.current?.setFog({
        color: "rgb(255,255,255)",
        "high-color": "rgb(200,200,225)",
        "horizon-blend": 0.1,
      });
    });

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, [token]);

  return (
    <div className="relative w-full h-[520px] rounded-xl shadow-lg mb-10">
      {!token ? (
        <div className="absolute top-0 left-0 w-full h-full z-30 bg-white/90 flex flex-col items-center justify-center rounded-xl gap-4">
          <div className="text-center">
            <div className="font-bold text-lg text-blue-700 mb-1">
              Enter Your Mapbox Public Token
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              Please provide a Mapbox token to render the interactive server location map. Get one from <a href="https://mapbox.com/" target="_blank" rel="noopener" className="text-blue-600 underline">mapbox.com</a>.
            </p>
          </div>
          <input
            type="text"
            className="border border-gray-300 px-3 py-2 rounded w-96 max-w-full focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="pk.eyJ1Ijoia2luc2Nlc..." 
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
      ) : null}
      <div ref={mapContainer} className="w-full h-full rounded-xl" />
    </div>
  );
};

export default ServerLocationMap;

