import { getImageUrlsFromFeature } from "@/lib/utils/imageUtils";
import { LocationFeature } from "@notthesamadamsguy/location-finder-types";
import Image from "next/image";

interface Props {
  feature: LocationFeature | null;
}
export default function PopupImage({ feature }: Props) {
  const locationImageUrls = feature ? getImageUrlsFromFeature(feature) : [];
  const cardImageUrl = locationImageUrls[0] ?? "/placeholder.jpg";

  return (
    <Image
      src={cardImageUrl}
      alt={feature?.properties?.name ?? "location image"}
      width={240}
      height={142}
      className="h-36 w-full md:w-60 md:h-[142px] object-cover"
    />
  );
}
