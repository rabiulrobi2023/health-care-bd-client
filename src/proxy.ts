import { NextRequest, NextResponse } from "next/server";
import { Token } from "./const/const";

export function proxy(request: NextRequest) {
  const url = request.url;
  const accessToken = request.cookies.get(Token.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(Token.REFRESH_TOKEN)?.value;
  const path = request.nextUrl.pathname;

  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/settings",
    "/appointments",
  ];
  const authRoutes = ["/login", "/register", "/forgot-password"];

  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) => path === route);

if(isAuthRoute && !(accessToken && refreshToken)){
  return NextResponse.redirect(new URL("/login"))
}

  if (isAuthRoute && accessToken) {
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
