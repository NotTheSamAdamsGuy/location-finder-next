import { LocationFeature, LocationImage } from "@notthesamadamsguy/location-finder-types";

export function getImageUrl(image: LocationImage) {
  return `${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/${image.filename}`;
}

export function getImageUrlsFromFeature(feature: LocationFeature) {
  return feature?.properties?.images?.map((imageData) => getImageUrl(imageData)) ?? [];
}