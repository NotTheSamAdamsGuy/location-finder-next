"use client";

import { useRef } from "react";
import { useSearchParams } from "next/navigation";

import MapProvider from "../providers/MapContext";
import Results from "../components/map/mapbox/Results";
import { LocationFeature } from "../lib/definitions";

export default function LocationsPage() {
  const searchParams = useSearchParams();
  const latitude = parseFloat(searchParams.get("lat") as string);
  const longitude = parseFloat(searchParams.get("lon") as string);
  const searchLocation: LocationFeature = {
    name: "current location", coordinates: { longitude: longitude, latitude: latitude },
    id: "",
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
    type: "currentLocation"
  };

  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const locations: LocationFeature[] = [];
  locations.push(searchLocation);
  locations.push(
    {
      id: "GpT_YtsUqtQi20x2ssTPI",
      name: "Union SLU",
      streetAddress: "905 Dexter Ave. N.",
      city: "Seattle",
      state: "WA",
      zip: "98109",
      description: "An apartment building",
      coordinates: {
        longitude: -122.342682,
        latitude: 47.627663,
      },
      type: "location"
    },
    {
      id: "46FKHr21GlHN4D9WBpkwy",
      name: "Tacos Chukis",
      streetAddress: "832 Dexter Ave. N.",
      city: "Seattle",
      state: "WA",
      zip: "98109",
      description: "a taco place",
      coordinates: {
        longitude: -122.34209,
        latitude: 47.627029,
      },
      type: "location"
    }
  );

  return (
    <div className="w-vw h-dvh">
      <MapProvider
        mapContainerRef={mapContainerRef}
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom: 13,
        }}
      >
        <Results locations={locations} />
      </MapProvider>
    </div>
  );
}
