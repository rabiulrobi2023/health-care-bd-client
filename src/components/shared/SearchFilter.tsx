"use client";
import useDebounce from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Input } from "../ui/input";

type TScearchFilter = {
  placeholder?: string;
  paramName?: string;
};
const SearchFilter = ({
  placeholder = "Search",
  paramName = "searchTerm",
}: TScearchFilter) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get(paramName) || "");

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const initialValue = searchParams.get(paramName) || "";

    if (debouncedValue === initialValue) {
      return;
    }
    if (debouncedValue) {
      params.set(paramName, debouncedValue);
    } else {
      params.delete(paramName);
      params.delete("page");
    }
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }, [debouncedValue, paramName, router, searchParams]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isPending}
        className="pl-10"
      />
    </div>
  );
};

export default SearchFilter;
