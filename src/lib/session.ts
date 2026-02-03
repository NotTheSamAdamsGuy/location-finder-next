import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { JWTPayload, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { User } from "@notthesamadamsguy/location-finder-types";

const secretKey = process.env.JWT_SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log("Failed to verify session");
  }
  return {};
}

// export async function createSession(token: string) {
//   const tokenData = await decrypt(token);
//   const expiresAt = new Date((tokenData!.exp as number) * 1000);
//   const cookieStore = await cookies();

//   cookieStore.set("token", token, {
//     httpOnly: true,
//     secure: false,
//     expires: expiresAt,
//     sameSite: "lax",
//     path: "/",
//   });
// }

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export async function createSession(tokens: Tokens) {
  const { accessToken, refreshToken } = tokens;
  const accessTokenData = await decrypt(accessToken);
  const refreshTokenData = await decrypt(refreshToken);
  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    expires: new Date((accessTokenData!.exp as number) * 1000),
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    expires: new Date((refreshTokenData!.exp as number) * 1000),
    sameSite: "lax",
    path: "/",
  });
}

export async function getUser(accessToken: string) {
  const session: JWTPayload = await decrypt(accessToken);
  const user: User = {
    username: "",
    role: "USER",
    firstName: "",
    lastName: "",
    password: "",
    lastLoginTimestamp: 0,
  };

  if (session) {
    user.username = session.username as string;
    user.role = session.role as "USER" | "ADMIN";
  }

  return user;
}

// export async function getRole(token: string) {
//   const session = await decrypt(token);
//   return session?.role;
// }

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("accessToken")?.value;
  const session = await decrypt(cookie);

  if (!session?.sub) {
    redirect("/login");
  }

  return { isAuth: true, username: session.username, role: session.role };
});
