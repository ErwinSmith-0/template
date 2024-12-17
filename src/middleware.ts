import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define your secret
const secret = process.env.NEXTAUTH_SECRET;
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  // Define the paths you want to exclude
  const excludedPaths = [
    "/api/public-route",
    "/public",
    "/_next/static",
    "/_next/image",
    "/favicon.ico",
    "/sitemap.xml",
    "/robots.txt",
    "/api",
  ];

  if (
    req.nextUrl.pathname === "/" ||
    excludedPaths.some((path) => req.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.next(); // Skip the middleware for excluded paths
  }

  if (!token) {
    const signInUrl = new URL("/", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}
