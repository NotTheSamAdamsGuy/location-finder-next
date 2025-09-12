"use server";

import { cookies } from "next/headers";

export const getAllTags = async (): Promise<string[]> => {
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
      `${process.env.SITE_HOST}:${process.env.SITE_PORT}/tags`,
      requestOptions
    );

    if (response.ok) {
      const data = ((await response.json()) as string[]) || Array<string>;
      return data;
    } else {
      throw new Error("Unable to retrieve tags");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getTag = async (tagToFind: string) => {
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
      `${process.env.SITE_HOST}:${process.env.SITE_PORT}/tags/${tagToFind}`,
      requestOptions
    );

    if (response.ok) {
      const data = (await response.json()) as Promise<
        string | string[] | null | undefined
      >;
      return data;
    } else {
      throw new Error("Unable to retrieve tag");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
