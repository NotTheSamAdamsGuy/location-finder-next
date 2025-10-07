import { cookies } from "next/headers";

import { Location } from "../lib/definitions";

export const getAllLocations = async (): Promise<Location[]> => {
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
      `${process.env.SITE_HOST}:${process.env.SITE_PORT}/locations`,
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

export const getLocation = async (id: string) => {
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
      `${process.env.SITE_HOST}:${process.env.SITE_PORT}/locations/${id}`,
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