import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView() {
  useEffect(() => {
    const map = L.map("map").setView([12.9716, 77.5946], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    L.marker([12.9716, 77.5946])
      .addTo(map)
      .bindPopup("👧 Child Location: Safe Zone");
  }, []);

  return <div id="map" className="h-[400px] rounded-xl shadow" />;
}
