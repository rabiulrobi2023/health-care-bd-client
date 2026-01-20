"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ITablepaginationProps {
  currentPage: number;
  totalpage: number;
  maxPage?: number;
}

const getVisiblePages = (
  currentPage: number,
  totalpage: number,
  maxPage: number = 5
) => {
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

  const pages = getVisiblePages(currentPage, totalpage, maxPage);

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
              currentPage === page && "text-primary font-bold"
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
    </div>
  );
};

export default TablePagination;
