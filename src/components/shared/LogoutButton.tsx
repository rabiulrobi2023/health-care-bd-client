"use client";

import { Button } from "@/components/ui/button";
import { Tokens } from "@/const/const";
import { deleteToken } from "@/lib/token-utils";

const LogoutButton = () => {
  const handleLogout = async () => {
    await deleteToken(Tokens.ACCESS_TOKEN);
    await deleteToken(Tokens.REFRESH_TOKEN);
  };
  return (
    <Button variant={"destructive"} className="hover:bg-red-700" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
