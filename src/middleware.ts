"use server";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";

const protectedRoutes = ["/", "/admin", "/admin/locations", "/admin/locations/add"];
const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  // TODO: make this work - commenting out for nowadd path for use in building breadcrumbs
  // const headers = new Headers(req.headers);
  // headers.set("x-current-path", req.nextUrl.pathname);

  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const token: string= (await cookies()).get("token")?.value as string;
  const session = await decrypt(token);
  
  if (isProtectedRoute && !session?.username) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // TODO: figure out how to redirect the user to the originally requested page
  if (
    isPublicRoute &&
    session?.username &&
    !req.nextUrl.pathname.startsWith("/")
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
