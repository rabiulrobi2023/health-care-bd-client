"use client";
import { LucideIcon, Plus } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

type TMamanagementPageHeaderProps = {
  title: string;
  description?: string;
  action?: {
    icon?: LucideIcon;
    label: string;
    onClick: () => void;
  };
  children?: React.ReactNode;
};
const MamangementPageHeader = ({
  title,
  description,
  action,
  children,
}: TMamanagementPageHeaderProps) => {
  const Icon = action?.icon ?? Plus;
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      {children}
      {action && (
        <Button onClick={action.onClick}>
          <Icon width={4} height={4}></Icon> {action?.label}
        </Button>
      )}
    </div>
  );
};

export default MamangementPageHeader;
