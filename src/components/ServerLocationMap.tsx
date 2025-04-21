
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_PUBLIC_TOKEN } from "@/constants/mapbox";

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

const ServerLocationMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!MAPBOX_PUBLIC_TOKEN || !mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_PUBLIC_TOKEN;

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
      // Create a node for the marker
      const markerNode = document.createElement("div");
      markerNode.className = "group";
      markerNode.innerHTML = `
        <div class="flex flex-col items-center">
          <div class="mb-1.5 px-2 py-1 rounded-md text-xs font-semibold bg-blue-600 text-white shadow group-hover:bg-blue-700 transition-all">${loc.name}</div>
          <div>
            <svg width="28" height="28" fill="none" stroke="#2563eb" stroke-width="2" viewBox="0 0 24 24" class="mapbox-marker" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10.5c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z"></path>
              <circle cx="12" cy="10.5" r="3"></circle>
            </svg>
          </div>
        </div>
      `;

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
  }, []);

  return (
    <div className="relative w-full h-[640px] rounded-2xl shadow-lg mb-10 border border-gray-200 overflow-hidden">
      <div ref={mapContainer} className="w-full h-full rounded-2xl" />
    </div>
  );
};

export default ServerLocationMap;
