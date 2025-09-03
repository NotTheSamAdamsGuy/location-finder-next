import "server-only";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET_KEY;

export function decrypt(token: string) {
  try {
    const payload: JwtPayload = jwt.verify(
      token,
      secretKey as string
    ) as JwtPayload;
    return payload;
  } catch (error) {
    // TODO: update this
    console.log(error);
    console.log("Failed to verify session");
  }
}

export async function createSession(token: string) {
  const tokenData = decrypt(token);
  const expiresAt = new Date((tokenData!.exp as number) * 1000);
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: false,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

// export async function getUserId() {
//   return (await cookies()).get("userId")?.value;
// }

// export async function updateSession() {
//   const token: string = (await cookies()).get("token")?.value as string;
//   const payload = await decrypt(token);

//   if (!token || !payload) {
//     return null;
//   }

//   const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

//   const cookieStore = await cookies();
//   cookieStore.set("session", token, {
//     httpOnly: true,
//     secure: true,
//     expires: expires,
//     sameSite: "lax",
//     path: "/",
//   });
// }

// export async function deleteSession() {
//   const cookieStore = await cookies();
//   console.log(cookieStore);
//   cookieStore.delete("token");
// }
