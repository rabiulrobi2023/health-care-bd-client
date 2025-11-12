import LogoutButton from "@/components/shared/LogoutButton";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <LogoutButton></LogoutButton>
      {children}
    </div>
  );
};

export default AdminLayout;
