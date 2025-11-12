import { RouteOwner, UserRoles } from "@/const/const";

export type TUserRole = (typeof UserRoles)[keyof typeof UserRoles];
export type TRouteOwner = (typeof RouteOwner)[keyof typeof RouteOwner];
export type TRouteConfig = {
  exact: string[];
  patterns: RegExp[];
};
