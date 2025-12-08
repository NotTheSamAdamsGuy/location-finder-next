import { getImageUrl } from "@/lib/utils/imageUtils";
import { LocationFeature } from "@notthesamadamsguy/location-finder-types";
import Image from "next/image";
import MobileNavBar from "./MobileNavBar";

interface Props {
  location: LocationFeature;
}

export default function LocationContainer({ location }: Props) {
  const { name, address, city, state, postalCode, description } =
    location.properties;
  const locationImages: React.ReactNode[] = location?.properties?.images
    ? location.properties.images.map((imageData) => {
        const imageUrl = getImageUrl(imageData);
        const imageAlt = imageData.description ?? "location image";
        return (
          <Image
            key={imageAlt}
            src={imageUrl}
            alt={imageAlt}
            width={768}
            height={412}
            className="w-full h-72 object-cover object-center"
            priority
          />
        );
      })
    : [];

  return (
    <div>
      <MobileNavBar />
      <div>{locationImages[0]}</div>
      <div className="p-3">
        <h1 className="text-3xl font-bold">{name}</h1>
        <div>
          {address}, {city}, {state?.abbreviation} {postalCode}
        </div>
      </div>
      <div className="p-3">
        <h2 className="text-xl font-bold">About this location</h2>
        {description}
      </div>
    </div>
  );
}
