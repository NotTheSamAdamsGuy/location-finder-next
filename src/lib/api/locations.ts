"use server";

import { cookies } from "next/headers";
import {
  LocationFeature,
  LocationFeatureCollection,
} from "@notthesamadamsguy/location-finder-types";

export const getAllLocations = async (): Promise<LocationFeatureCollection> => {
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
      `${process.env.API_HOST}:${process.env.API_PORT}/locations`,
      requestOptions
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Unable to retrieve locations");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getLocation = async (
  id: string
): Promise<LocationFeature | null> => {
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
      `${process.env.API_HOST}:${process.env.API_PORT}/locations/${id}`,
      requestOptions
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Unable to retrieve location");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export type GetNearbyLocationsProps = {
  latitude: number;
  longitude: number;
  zoomlevel: number;
  mapHeightInPx: number;
  mapWidthInPx: number;
  unitOfDistance: string;
  sort?: string;
};
export const getNearbyLocations = async ({
  latitude,
  longitude,
  zoomlevel,
  mapHeightInPx,
  mapWidthInPx,
  unitOfDistance,
  sort,
}: GetNearbyLocationsProps): Promise<LocationFeatureCollection> => {
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
      `${process.env.API_HOST}:${process.env.API_PORT}/locations/nearby?latitude=${latitude}&longitude=${longitude}&zoomlevel=${zoomlevel}&mapHeightInPx=${mapHeightInPx}&mapWidthInPx=${mapWidthInPx}&unitOfDistance=${unitOfDistance}&sort=${sort}`,
      requestOptions
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Unable to retrieve nearby locations");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const postLocation = async (postData: FormData): Promise<Response> => {
  const token = (await cookies()).get("token")?.value;

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: postData,
  };

  try {
    return await fetch(
      `${process.env.API_HOST}:${process.env.API_PORT}/locations`,
      requestOptions
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const putLocation = async (putData: FormData): Promise<Response> => {
  const token = (await cookies()).get("token")?.value;

  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: putData,
  };

  try {
    return await fetch(
      `${process.env.API_HOST}:${process.env.API_PORT}/locations`,
      requestOptions
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteLocation = async (locationId: string): Promise<Response> => {
  const token = (await cookies()).get("token")?.value;

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    return await fetch(
      `${process.env.API_HOST}:${process.env.API_PORT}/locations/${locationId}`,
      requestOptions
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};