import { NextRequest, NextResponse } from "next/server";
import { RouteOwner, Tokens } from "./const/const";
import { TUserRole } from "./types/types";
import { JwtPayload } from "jsonwebtoken";
import {
  getDefaultDashboard,
  getRouteOwner,
  isAuthRoute,
} from "./lib/auth-utils";

import { envVariable } from "./config/envConfig";
import { deleteToken, getToken, verifyToken } from "./lib/token-utils";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = (await getToken(Tokens.ACCESS_TOKEN)) || null;

  let userRole: TUserRole | null = null;

  if (accessToken) {
    try {
      const verifiedToken =await verifyToken(
        accessToken,
        envVariable.JWT_ACCESS_SECRET as string
      ) as JwtPayload;
   
      userRole = verifiedToken.role as TUserRole;
    } catch {
      const response = NextResponse.redirect(new URL("/login", request.url));
      await deleteToken(Tokens.ACCESS_TOKEN);
      await deleteToken(Tokens.REFRESH_TOKEN);
      return response;
    }
  }

  const routeOwner = getRouteOwner(pathname);
  const isAuthTypeRoute = isAuthRoute(pathname);

  if (!accessToken) {
    if (routeOwner === RouteOwner.NONE) {
      return NextResponse.next();
    }
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (accessToken && isAuthTypeRoute) {
    return NextResponse.redirect(
      new URL(getDefaultDashboard(userRole as TUserRole), request.url)
    );
  }

  if (routeOwner === RouteOwner.COMMON) {
    return NextResponse.next();
  }

  if (
    routeOwner === RouteOwner.ADMIN ||
    routeOwner === RouteOwner.DOCTOR ||
    routeOwner === RouteOwner.PATIENT
  ) {
    if (userRole != routeOwner) {
      return NextResponse.redirect(
        new URL(getDefaultDashboard(userRole as TUserRole), request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
