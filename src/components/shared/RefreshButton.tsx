"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type TRefreshButtonProps = {
  size?: "default" | "sm" | "lg";
  vairent?: "default" | "outline" | "ghost";
  className?: string;
  showLabel?: boolean;
};

const RefreshButton = ({
  size,
  vairent,
  className,
  showLabel,
}: TRefreshButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <div>
      <Button
        onClick={handleRefresh}
        size={size}
        variant={vairent}
        className={className}
        disabled={isPending}
      >
        <RefreshCcw
          className={cn(
            "h-4 w-4",
            isPending ? "animate-spin" : "",
            showLabel ? "mr-2" : ""
          )}
        />
        {showLabel && "Refresh"}
      </Button>
    </div>
  );
};

export default RefreshButton;
