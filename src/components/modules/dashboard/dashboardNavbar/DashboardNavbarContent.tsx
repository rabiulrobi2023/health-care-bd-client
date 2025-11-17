"use client";

import Searchbar from "@/components/shared/Searchbar";

import { TDashboardSidebarContentProps } from "@/types/types";

import UserDropdown from "./UserDropdown";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import DashboardMobileSidebarContent from "../dashboardSidebar/DashboardMobileSidebarContent";

import { useEffect, useState } from "react";

const DashboardNavbarContent = ({
  userInfo,
  dashboardSideNavSection,
  dashboardHomeRoute,
}: TDashboardSidebarContentProps) => {
  const [isOpen, setOpen] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    const checkSmallScreen = () => {
      setSmallScreen(window.innerWidth < 768);
    };
    checkSmallScreen();

    window.addEventListener("resize", checkSmallScreen);
    return () => {
      window.removeEventListener("resize", checkSmallScreen);
    };
  }, []);
  return (
    <header className="sticky top-0 z-40  bg-gray-700 ">
      <div className="h-15 flex items-center justify-between p-4 pl-0">
        <div className="md:hidden">
          <Sheet open={isOpen && smallScreen} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button className="bg-transparent hover:bg-transparent p-0">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden w-64">
              <SheetTitle className="sr-only">
                Are you absolutely sure?
              </SheetTitle>
              <SheetDescription className="sr-only">
                Description
              </SheetDescription>
              <DashboardMobileSidebarContent
                userInfo={userInfo}
                dashboardSideNavSection={dashboardSideNavSection || []}
                dashboardHomeRoute={dashboardHomeRoute || ""}
                closeSidebar = {()=>setOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </div>
        <Searchbar />
        <UserDropdown userInfo={userInfo} />
      </div>
    </header>
  );
};

export default DashboardNavbarContent;
