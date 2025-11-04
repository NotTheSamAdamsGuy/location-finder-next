"use server";

import { cookies } from "next/headers";
import { FeatureCollection } from "geojson";

export type GetNearbyFeaturesProps = {
  latitude: number;
  longitude: number;
  zoomlevel: number;
  mapHeightInPx: number;
  mapWidthInPx: number;
  unitOfDistance: string;
  sort?: string;
};
export const getNearbyFeatures = async ({
  latitude,
  longitude,
  zoomlevel,
  mapHeightInPx,
  mapWidthInPx,
  unitOfDistance,
  sort,
}: GetNearbyFeaturesProps): Promise<FeatureCollection> => {
  const token = (await cookies()).get("token")?.value;

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(
      `${process.env.API_HOST}:${process.env.API_PORT}/features/nearby?latitude=${latitude}&longitude=${longitude}&zoomlevel=${zoomlevel}&mapHeightInPx=${mapHeightInPx}&mapWidthInPx=${mapWidthInPx}&unitOfDistance=${unitOfDistance}&sort=${sort}`,
      requestOptions
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Unable to retrieve nearby features");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
