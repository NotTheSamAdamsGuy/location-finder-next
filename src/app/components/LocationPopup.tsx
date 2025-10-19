// components/location-popup.tsx

import { LocationFeature } from "@/app/lib/definitions";
// import { cn } from "@/lib/utils";
// import {
//   LocateIcon,
//   MapPin,
//   Navigation,
//   Star,
//   ExternalLink,
// } from "lucide-react";

// import { Button } from "./ui/button";
import Popup from "@/app/components/map/mapbox/Popup";
// import { Badge } from "./ui/badge";
// import { Separator } from "./ui/separator";

import placeholder from "@/../public/placeholder.jpg";
import Image from "next/image";

type LocationPopupProps = {
  location: LocationFeature;
  onClose?: () => void;
};
export function LocationPopup({ location, onClose }: LocationPopupProps) {
  if (!location) return null;

  const { name, coordinates } = location;
  const placeholderImage = placeholder;

  const latitude = coordinates.latitude;
  const longitude = coordinates.longitude;

  return (
    <Popup
      latitude={latitude}
      longitude={longitude}
      onClose={onClose}
      offset={15}
      closeButton={true}
      closeOnClick={true}
      className="location-popup"
      focusAfterOpen={false}
    >
      <div>
        <Image src={placeholderImage} alt={name} height={100} width={100} />
        <div className="text-black">{name}</div>
      </div>
    </Popup>
  );
}