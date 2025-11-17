"use client";

import { TDashboardSidebarContentProps } from "@/types/types";
import Link from "next/link";
import logo from "../../../../assets/images/logo.png";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getIconComponent } from "@/lib/icon-mapper";

const DashboardMobileSidebarContent = ({
  userInfo,
  dashboardSideNavSection,
  dashboardHomeRoute,
  closeSidebar,
}: TDashboardSidebarContentProps) => {
  const pathname = usePathname();
  return (
    <aside className="h-full top-0 flex flex-col   w-64 0 p-4">
      <div>
        <Link href={dashboardHomeRoute}>
          <span className="flex flex-col items-center  font-bold gap-4">
            <Image src={logo} height={40} width={40} alt="Logo" />
            <span className="text-primary text-xl ">Health Care BD</span>
          </span>
        </Link>
      </div>
      <div className="flex flex-col justify-between h-full">
        <ScrollArea className="pt-5">
          <div>
            {dashboardSideNavSection?.map((section, index) => (
              <div key={index}>
                {section.title && (
                  <h4 className="font-bold text-gray-500 pt-3  ">
                    {section.title}
                  </h4>
                )}
                <div>
                  {section?.items?.map((item, index) => {
                    const isActive = pathname === item.href;
                    const Icon = getIconComponent(item?.icon as string);
                    return (
                      <Link
                        onClick={closeSidebar}
                        href={item.href}
                        key={index}
                        className={cn(
                          "flex gap-2 items-center py-1 px-2 rounded-xs hover:bg-gray-500",
                          isActive
                            ? "text-white bg-gray-500 md:bg-gray-600"
                            : ""
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="stick">
          <p>User Name</p>
          <p className="lowercase text-gray-500">{userInfo.role}</p>
        </div>
      </div>
    </aside>
  );
};

export default DashboardMobileSidebarContent;
