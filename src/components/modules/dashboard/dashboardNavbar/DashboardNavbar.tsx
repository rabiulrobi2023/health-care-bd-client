"use server";

import { getUserInfoFromToken } from "@/services/auth/getUserInfoFromToken";
import DashboardNavbarContent from "./DashboardNavbarContent";
import { TUserInfoFormToken } from "@/types/types";
import { getDashboardSideNavSection } from "@/lib/dashboardSideNavbarItems";
import { getDefaultDashboard } from "@/lib/auth-utils";

const DashboardNavbar = async () => {
  const userInfo = (await getUserInfoFromToken()) as TUserInfoFormToken;
  const dashboardSideNavSection = getDashboardSideNavSection(userInfo?.role);
  const dashboardHomeRoute = getDefaultDashboard(userInfo.role);
  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      dashboardSideNavSection={dashboardSideNavSection}
      dashboardHomeRoute={dashboardHomeRoute}
    />
  );
};

export default DashboardNavbar;
