import { LocationFeature } from "@notthesamadamsguy/location-finder-types";

export function getImageUrlsFromFeature(feature: LocationFeature) {
  return feature?.properties?.images?.map((imageData) => imageData.url || "") ?? [];
}