import { getImageUrlsFromFeature } from "@/lib/utils/imageUtils";
import { LocationFeature } from "@notthesamadamsguy/location-finder-types";
import Image from "next/image";

interface Props {
  feature: LocationFeature;
}
export default function FeatureCardImage({ feature }: Props) {
  const locationImageUrls = getImageUrlsFromFeature(feature);
  const cardImageUrl = locationImageUrls[0] ?? "/placeholder.jpg";

  return (
    <Image
      src={cardImageUrl}
      alt={feature.properties?.name ?? "location image"}
      width={319}
      height={136}
      className="w-full h-[136px] object-cover md:w-[319px]"
    />
  );
}
