"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { MapboxSuggestion } from "@/types/mapbox.types";

type LocationSearchFormState =
  | {
      errors?: {
        id?: string[];
      };
      message?: string;
    }
  | undefined;

type MapSearchReply = {
  suggestions: MapboxSuggestion[];
  sessionToken: string;
};

export const getLocationSuggestions = async (
  searchText: string
): Promise<MapSearchReply> => {
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
      `${process.env.API_HOST}:${process.env.API_PORT}/maps/search?q=${searchText}`,
      requestOptions
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Unable to retrieve location suggestions");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * Get the coordinates of a location with the given ID. If successful, redirect to the /locations page.
 * @param formState 
 * @param formData 
 */
export const getMapLocationCoordinates = async (
  formState: LocationSearchFormState,
  formData: FormData
) => {
  const token = (await cookies()).get("token")?.value;

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const id = formData.get("mapboxLocationId");
    const sessionToken = formData.get("sessionToken");

    if (!id || id === "") throw new Error("Location ID is required");
    if (!sessionToken || sessionToken === "") throw new Error("Session token is required");

    const response = await fetch(
      `${process.env.API_HOST}:${process.env.API_PORT}/maps/location/${id}?sessionToken=${sessionToken}`,
      requestOptions
    );

    let latitude: number | null = null;
    let longitude: number | null = null;

    if (response.ok) {
      const data = await response.json();
      const coordinates =
        data[0]?.properties?.coordinates;

      if (coordinates) {
        latitude = coordinates.latitude;
        longitude = coordinates.longitude;
      }
    }

    if (latitude && longitude) {
      redirect(`/locations?lat=${latitude}&lon=${longitude}`);
    } else {
      throw new Error("Encountered error while retrieving location details");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
