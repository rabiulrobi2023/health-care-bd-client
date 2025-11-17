"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tokens } from "@/const/const";
import { deleteToken } from "@/services/auth/tokenHandler";
import { TUserInfoFormToken } from "@/types/types";
import { CircleUserRoundIcon, LogOutIcon, Settings2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserDropdown = ({ userInfo }: { userInfo: TUserInfoFormToken }) => {
  const router = useRouter();
  const handleLogout = async () => {
    await deleteToken(Tokens.ACCESS_TOKEN);
    router.push("/login?logout=true");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" aria-label="Open account menu">
          <CircleUserRoundIcon size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 mr-4 mt-2 p-3 text-[16px]">
        <DropdownMenuLabel className="flex flex-col">
          <span>{userInfo.role}</span>
          <span className="text-xs font-normal text-foreground">
            {userInfo.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Settings2Icon />
            <Link href={"/change-password"}>Channge password</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={handleLogout}>
          <span className="flex gap-2 w-full hover:text-red-600">
            <LogOutIcon />
            <span className=" ">Logout</span>
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
