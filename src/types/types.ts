import { RouteOwner, Tokens, UserRoles } from "@/const/const";
import { JwtPayload } from "jsonwebtoken";
import * as Icons from "lucide-react"

export type TJwtPayload = JwtPayload & {
  email: string;
  role: TUserRole;
};
export type TUserRole = (typeof UserRoles)[keyof typeof UserRoles];
export type TRouteOwner = (typeof RouteOwner)[keyof typeof RouteOwner];
export type TRouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

export type TToken = (typeof Tokens)[keyof typeof Tokens];
export type TUserInfoFormToken = {
  email: string;
  role: TUserRole;
};

export type TDashboardSideNavItem = {
  title: string;
  href: string;
  icon?: keyof typeof Icons;
  badge?: string | number;
  description?: string;
  roles: TUserRole[];
};

export type TDashboardSideNavSection = {
  title?: string;
  items: TDashboardSideNavItem[];
};

export type TDashboardSidebarContentProps = {
  userInfo: TUserInfoFormToken;
  dashboardSideNavSection: TDashboardSideNavSection[];
  dashboardHomeRoute: string;
  closeSidebar?: ()=>void
};
