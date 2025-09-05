import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import { cache } from "react";
import { redirect } from "next/navigation";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("token")?.value;
  const session = await decrypt(cookie);

  if (!session?.username) {
    redirect("/login");
  }

  return { isAuth: true, username: session.username, role: session.role};
});

export const getAllLocations = async () => {
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
    // TODO: make this work properly - it isn't writing to the console - do we need to return something?
    console.log(err);
    throw err;
  }
};
