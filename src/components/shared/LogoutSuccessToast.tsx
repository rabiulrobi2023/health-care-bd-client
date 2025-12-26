"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const LogoutSuccessToast = () => {
  const router = useRouter();
  const serarchParams = useSearchParams();
  useEffect(() => {
    if (serarchParams.get("logout") === "true") {
      toast.success("Logout successfully",{duration:2000});

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("logout");
      router.replace(newUrl.toString());
    }
  }, [serarchParams, router]);

  return null;
};

export default LogoutSuccessToast;
