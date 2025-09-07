"use server";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = ["/", "/admin", "/admin/locations", "/admin/locations/add"];
const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  const headers = new Headers(req.headers);

  // add path for use in building breadcrumbs
  headers.set("x-current-path", req.nextUrl.pathname);

  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie - can't use verifySession because using next/navigation is disallowed in middleware
  const token: string= (await cookies()).get("token")?.value as string;
  const session = await decrypt(token);
  
  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.username) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 5. Redirect to / if the user is authenticated
  // TODO: figure out how to redirect the user to the originally requested page
  if (
    isPublicRoute &&
    session?.username &&
    !req.nextUrl.pathname.startsWith("/")
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // return NextResponse.next({ headers });
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
