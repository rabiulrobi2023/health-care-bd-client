"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ITablepaginationProps {
  currentPage: number;
  totalpage: number;
  maxPage: number;
  limit: number;
}

const getVisiblePages = ({
  currentPage,
  totalpage,
  maxPage,
}: ITablepaginationProps) => {
  if (totalpage <= maxPage) {
    return Array.from({ length: totalpage }, (_, i) => i + 1);
  }

  const half = Math.floor(maxPage / 2);

  let start = Math.max(1, currentPage - half);
  const end = Math.min(totalpage, start + maxPage - 1);
  start = Math.max(1, end - maxPage + 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const TablePagination = ({
  currentPage,
  totalpage,
  maxPage = 5,
  limit,
}: ITablepaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  if (totalpage <= 1) {
    return null;
  }
  const navigateToPage = (page: number) => {
    const safePage = Math.min(Math.max(1, page), totalpage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", safePage.toString());
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const pages = getVisiblePages({ currentPage, totalpage, maxPage, limit });

  const changeLimit = (newLimit: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newLimit);
    params.set("page", "1");
    startTransition(() => router.push(`?${params.toString()}`));
  };

  const limits = [1, 2, 3, 4, 5, 10, 20, 30, 50];
  const currentLimit = limit;

  return (
    <div className="flex gap-2 items-center justify-end">
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage === 1 || isPending}
        className="border-0 bg-transparent shadow-none hover:bg-transparent hover:text-primary"
        onClick={() => navigateToPage(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" /> Previous
      </Button>

      <div className="flex items-center gap-6">
        {pages.map((page) => (
          <Button
            key={page}
            className={cn(
              "bg-transparent border-0 hover:text-green-700 hover:bg-transparent text-gray-400 w-0 h-0 p-0",
              currentPage === page && "text-primary font-bold",
            )}
            disabled={isPending}
            onClick={() => navigateToPage(page)}
          >
            {page}
          </Button>
        ))}
      </div>
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage === totalpage || isPending}
        className="border-0 bg-transparent shadow-none hover:bg-transparent hover:text-primary"
        onClick={() => navigateToPage(currentPage + 1)}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>

      <span className="ml-2 text-sm text-muted-foreground">
        Page {currentPage} of {totalpage}
      </span>

      <div className="flex items-center gap-2">
        <label htmlFor="limit" className="text-sm text-muted-foreground">
          Item Per Page
        </label>
        <Select
          value={String(limit)}
          onValueChange={changeLimit}
          disabled={isPending}
        >
          <SelectTrigger id="limit" aria-label="Items" className="w-[80px] h-8">
            <SelectValue placeholder={currentLimit} />
          </SelectTrigger>
          <SelectContent>
            {limits.map((limit) => (
              <SelectItem key={limit} value={String(limit)}>
                {limit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TablePagination;
