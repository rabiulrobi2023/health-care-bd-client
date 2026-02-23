"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTransition } from "react";

type TSelectFilterProps = {
  paramName: string;
  placeholder?: string;
  defaultValue: string;
  options: { label: string; value: string }[];
};

const SelectFilter = ({
  paramName,
  placeholder,
  options,
  defaultValue,
}: TSelectFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const currentValue = searchParams.get(paramName) ?? defaultValue;

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === defaultValue) {
      params.delete(paramName);
    } else {
      params.set(paramName, value);
    }

    startTransition(() => {
      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    });
  };

  return (
    <Select
      value={currentValue}
      onValueChange={handleChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectItem value={defaultValue}>
            {defaultValue}
          </SelectItem>

          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;
