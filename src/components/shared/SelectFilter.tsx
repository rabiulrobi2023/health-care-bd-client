"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTransition } from "react";

type TSelectFilterProps = {
  paramName: string;
  placeHolder?: string;
  options: { label: string; value: string }[];
};

const SelectFilter = ({
  paramName,
  placeHolder,
  options,
}: TSelectFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentValue = searchParams.get(paramName) || "all";
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: string = currentValue) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(paramName);
    } else {
      params.set(paramName, value);
    }

    startTransition(() => {
      router.push(`${params.toString()}`);
    });
  };

  return (
    <Select onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeHolder}/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All</SelectItem>
          {options.map((option) => (
            <SelectItem value={option.value} key={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;
