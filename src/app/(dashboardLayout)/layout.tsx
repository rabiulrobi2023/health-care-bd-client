import DashboardNavbar from "@/components/modules/dashboard/dashboardNavbar/DashboardNavbar";
import DashboarSidebar from "@/components/modules/dashboard/dashboardSidebar/DashboardSidebar";

import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <DashboarSidebar />
      <div className="flex flex-col w-screen">
        <DashboardNavbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
