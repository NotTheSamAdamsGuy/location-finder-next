"use server";

import { cookies } from "next/headers";
import { UserProfile } from "@notthesamadamsguy/location-finder-types";

export const getAllUsernames = async (): Promise<string[]> => {
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
      `${process.env.API_HOST}:${process.env.API_PORT}/users/usernames`,
      requestOptions
    );

    if (response.ok) {
      const data = ((await response.json()) as string[]) || Array<string>;
      return data;
    } else {
      throw new Error("Unable to retrieve users");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getUserProfile = async (username: string): Promise<UserProfile | null> => {
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
      `${process.env.API_HOST}:${process.env.API_PORT}/users/${username}/profile`,
      requestOptions
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Unable to retrieve user profile");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};