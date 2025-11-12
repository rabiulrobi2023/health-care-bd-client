import { envVariable } from "@/config/envConfig";
import { RouteOwner } from "@/const/const";
import { TRouteConfig, TRouteOwner, TUserRole } from "@/types/types";
import jwt, { JwtPayload } from "jsonwebtoken";

const authRoutes = ["/login", "/register"];

const commonProtectedRoutes: TRouteConfig = {
  exact: ["/my-profile", "/settings", "/forgot-password", "/reset-password"],
  patterns: [], //[/password/change-password,]
};

const doctorProtectedRoutes: TRouteConfig = {
  exact: [], //[/assistant]
  patterns: [/^\/doctor(?:\/|$)/],
};

const adminProtectedRoutes: TRouteConfig = {
  exact: [],
  patterns: [/^\/admin(?:\/|$)/],
};

const patientProtectedRoutes: TRouteConfig = {
  exact: [],
  patterns: [/^\/dashboard(?:\/|$)/],
};

export const isAuthRoute = (pathName: string): boolean => {
  return authRoutes.some((route) => route === pathName);
};

const isRouteMatches = (pathname: string, routes: TRouteConfig): boolean => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.patterns.some((patern: RegExp) => patern.test(pathname));
};

export const getRouteOwner = (pathename: string): TRouteOwner => {
  if (isRouteMatches(pathename, commonProtectedRoutes)) {
    return "COMMON";
  }
  if (isRouteMatches(pathename, doctorProtectedRoutes)) {
    return "DOCTOR";
  }
  if (isRouteMatches(pathename, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isRouteMatches(pathename, patientProtectedRoutes)) {
    return "PATIENT";
  }
  return "NONE";
};

export const getDefaultDashboard = (role: TUserRole): string => {
  if (role === "ADMIN") {
    return "/admin/dashboard";
  }
  if (role === "DOCTOR") {
    return "/doctor/dashboard";
  }
  if (role === "PATIENT") {
    return "/dashboard";
  }
  return "/";
};

export const verifyToken = (token: string): JwtPayload => {
  const verifiedToken = jwt.verify(
    token,
    envVariable.JWT_ACCESS_SECRET as string
  ) as JwtPayload;
  return verifiedToken;
};

export const checkLoginUserAndRouteOwnerSame = (
  pathname: string,
  user: TUserRole
): boolean => {
  const routeOwner = getRouteOwner(pathname);
  if (routeOwner === RouteOwner.NONE || routeOwner === RouteOwner.COMMON) {
    return true;
  }

  return routeOwner === user;
};
