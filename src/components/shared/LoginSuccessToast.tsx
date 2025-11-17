"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const LoginSuccessToast = () => {
  const serarchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (serarchParams.get("login") === "true") {
      toast.success("Login successfully",{duration:1000});

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("login");
      router.replace(newUrl.toString());
    }
  }, [serarchParams, router]);

  return null;
};

export default LoginSuccessToast;
