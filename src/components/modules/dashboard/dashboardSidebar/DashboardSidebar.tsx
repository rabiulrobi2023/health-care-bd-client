"use server";

import { getDashboardSideNavSection } from "@/lib/dashboardSideNavbarItems";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { getUserInfoFromToken } from "@/services/auth/getUserInfoFromToken";
import { TUserInfoFormToken } from "@/types/types";
import { getDefaultDashboard } from "@/lib/auth-utils";

const DashboarSidebar = async () => {
  const userInfo = (await getUserInfoFromToken()) as TUserInfoFormToken;
  const dashboardSideNavSection = getDashboardSideNavSection(userInfo?.role);
  const dashboardHomeRoute = getDefaultDashboard(userInfo.role);

  return (
    <DashboardSidebarContent
      userInfo={userInfo}
      dashboardSideNavSection={dashboardSideNavSection}
      dashboardHomeRoute={dashboardHomeRoute}
      
    />
  );
};

export default DashboarSidebar;
