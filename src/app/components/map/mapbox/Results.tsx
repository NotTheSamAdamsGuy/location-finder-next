import { useState } from "react";

import { LocationFeature } from "@/app/lib/definitions";
import { LocationMarker } from "@/app/components/LocationMarker";
import { LocationPopup } from "@/app/components/LocationPopup";

type Props = {
  locations: LocationFeature[];
}

export default function Results({locations}: Props) {
  const [selectedLocation, setSelectedLocation] =
    useState<LocationFeature | null>(null);

  return (
    <section>
      {locations.map((location) => (
        <LocationMarker
          key={location.name}
          location={location} 
          onHover={(data) => setSelectedLocation(data)}
        />      
      ))}
      {selectedLocation && (
        <LocationPopup
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      )}
    </section>
  );
}