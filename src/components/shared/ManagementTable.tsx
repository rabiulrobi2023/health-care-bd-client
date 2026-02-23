"use client";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Edit,
  Eye,
  Loader2,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import React, { useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

export type TColumn<T> = {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
  sortKey?: string;
};

type TManagementTableProps<T> = {
  columns: TColumn<T>[];
  data: T[];
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  getRowKey?: (row: T) => string;
  emptyMessage?: string;
  isRefreshing?: boolean;
};

export default function ManagementTable<T>({
  columns,
  data,
  onView,
  onEdit,
  onDelete,
  getRowKey,
  emptyMessage = "No record found",
  isRefreshing = false,
}: TManagementTableProps<T>) {
  const hasAction = Boolean(onView || onEdit || onDelete);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentSortBy = searchParams.get("sortBy") || "";
  const currentSortOrder = searchParams.get("sortOrder") || "";
const handleSort = (sortKey: string) => {
  const params = new URLSearchParams(searchParams.toString());

  const isSameColumn = currentSortBy === sortKey;

  const nextOrder = isSameColumn
    ? currentSortOrder === "asc"
      ? "desc"
      : "asc"
    : "desc";

  params.set("sortBy", sortKey);
  params.set("sortOrder", nextOrder);
  params.set("page", "1");

  startTransition(() => {
    router.push(`?${params.toString()}`);
  });
};
  const getSortIcon = (sortKey?: string) => {
  if (!sortKey) return null;

  // Not active column
  if (currentSortBy !== sortKey) {
    return (
      <ArrowUpDown className="w-4 text-muted-foreground" />
    );
  }

  // Active column
  if (currentSortOrder === "asc") {
    return <ArrowUp className="w-4 text-primary" />;
  }

  return <ArrowDown className="w-4 text-primary" />;
};
  return (
    <div className="relative rounded-md border overflow-auto">
      {/* Loading Overlay */}
      {isRefreshing && (
        <div className="absolute inset-0 z-10 bg-background/60 backdrop-blur-sm flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow className="bg-green-100">
            {columns.map((column) => (
              <TableHead
                key={column.sortKey ?? column.header}
                className={cn("font-semibold", column.className)}
              >
                {column.sortKey ? (
                  <button
                    type="button"
                    onClick={() => handleSort(column.sortKey!)}
                    className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors"
                  >
                    {column.header}
                    {getSortIcon(column.sortKey)}
                  </button>
                ) : (
                  column.header
                )}
              </TableHead>
            ))}

            {hasAction && (
              <TableHead className="text-right font-semibold">
                Actions
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (hasAction ? 1 : 0)}
                className="text-center py-6  text-xl text-red-600"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data?.map((row, rowIndex) => (
              <TableRow
                key={getRowKey ? getRowKey(row) : rowIndex}
                className="hover:bg-muted/50"
              >
                {columns?.map((col, colIndex) => (
                  <TableCell key={colIndex} className={col.className}>
                    {typeof col.accessor === "function"
                      ? col.accessor(row)
                      : String(row[col.accessor] ?? "-")}
                  </TableCell>
                ))}

                {hasAction && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        {onView && (
                          <DropdownMenuItem onClick={() => onView(row)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                        )}
                        {onEdit && (
                          <DropdownMenuItem onClick={() => onEdit(row)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        )}
                        {onDelete && (
                          <DropdownMenuItem
                            onClick={() => onDelete(row)}
                            className="text-destructive"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
