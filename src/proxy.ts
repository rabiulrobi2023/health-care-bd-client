import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.url;
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;
  console.log(pathname);

  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/settings",
    "/appointments",
  ];
  const authRoutes = ["/login", "/register", "/forgot-password"];

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) => pathname === route);

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/appointments/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
};
