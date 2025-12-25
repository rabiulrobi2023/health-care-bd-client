"use client";

import { formatDateTime } from "@/lib/formatters";

interface IDateCellProps {
  date: string | Date;
}
const DateCell = ({ date }: IDateCellProps) => {
  return <span>{formatDateTime(date)}</span>;
};

export default DateCell;
