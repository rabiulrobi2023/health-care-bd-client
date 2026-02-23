"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface IClearFilterButtonProps {
  preserveParams?: string[];
  excludeFromCount?: string[];
  onBeforeClear?: () => boolean | void;
  onAfterClear?: () => void;
  variant?: "ghost" | "outline" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  label?: string;
  showCount?: boolean;
}

const ClearFilterButton = ({
  preserveParams = [],
  excludeFromCount = ["page", "limit", "sortBy", "sortOrder"],
  onBeforeClear,
  onAfterClear,
  variant = "ghost",
  size = "default",
  className = "h-10 px-3",
  label = "Clear Filter",
  showCount = true,
}: IClearFilterButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Count only active filter params
  const activeFilterCount = Array.from(searchParams.keys()).filter(
    (key) =>
      !preserveParams.includes(key) &&
      !excludeFromCount.includes(key)
  ).length;

  const handleClear = () => {
    if (onBeforeClear?.() === false) return;

    const params = new URLSearchParams();

    preserveParams.forEach((param) => {
      const value = searchParams.get(param);
      if (value) params.set(param, value);
    });

    startTransition(() => {
      router.push(
        params.toString() ? `?${params.toString()}` : pathname
      );
    });

    onAfterClear?.();
  };

  if (activeFilterCount === 0) return null;

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClear}
      disabled={isPending}
      className={className}
    >
      <X className="h-4 w-4 mr-1" />
      {label}
      {showCount && ` (${activeFilterCount})`}
    </Button>
  );
};

export default ClearFilterButton;
