import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { LocationFeature } from "@/app/lib/definitions";
import Marker from "@/app/components/map/mapbox/Marker";

interface LocationMarkerProps {
  location: LocationFeature;
  onHover: (data: LocationFeature) => void;
}

export function LocationMarker({ location, onHover }: LocationMarkerProps) {
  return (
    <Marker
      longitude={location.coordinates.longitude}
      latitude={location.coordinates.latitude}
      data={location}
      onHover={({ data }) => {
        onHover(data);
      }}
    >
      <div className="rounded-full flex items-center justify-center transform transition-all duration-200 bg-white text-blue-500 shadow-lg size-8 cursor-pointer hover:scale-110">
        <FontAwesomeIcon icon={faLocationDot} className="stroke-[2.5px] size-4.5" style={{width: "1.5rem", height: "1.5rem"}} />
        {/* <FontAwesomeIcon icon={faLocationDot}style={{width: "2rem", height: "2rem"}} /> */}
      </div>
    </Marker>
  );
}