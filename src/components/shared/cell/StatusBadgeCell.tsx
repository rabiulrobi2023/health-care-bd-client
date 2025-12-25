"use client";

import { Badge } from "@/components/ui/badge";

interface IStatusBadgeCell {
  isDeleted: boolean;
  activeText: string;
  deletedText: string;
}

const StatusBadgeCell = ({
  isDeleted,
  activeText,
  deletedText,
}: IStatusBadgeCell) => {
  return (
    <Badge variant={isDeleted ? "destructive" : "default"}>
      {isDeleted ? deletedText : activeText}
    </Badge>
  );
};

export default StatusBadgeCell;
