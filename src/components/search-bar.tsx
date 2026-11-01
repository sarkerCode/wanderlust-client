"use client";

import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const fields = [
  {
    id: "location",
    label: "Location",
    placeholder: "Address, City Or Zip",
  },
  {
    id: "date-duration",
    label: "Date/Duration",
    placeholder: "Anytime/3 Days",
  },
  {
    id: "budget",
    label: "Budget",
    placeholder: "$0-$3000",
  },
  {
    id: "people",
    label: "People",
    placeholder: "5-10",
  },
];

export function SearchBar() {
  return (
    <form
      role="search"
      onSubmit={(event) => event.preventDefault()}
      className="relative z-10 w-full border-t border-white/20 bg-black/25 backdrop-blur-md"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_200px]">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className={cn(
              "flex flex-col justify-center gap-1 border-white/15 px-6 py-3.5",
              index > 0 && "border-t",
              index % 2 === 1 && "sm:border-l",
              index >= 2 && "sm:border-t",
              index > 0 && "lg:border-t-0 lg:border-l",
            )}
          >
            <Label
              htmlFor={field.id}
              className="text-[13px] font-medium text-white"
            >
              {field.label}
            </Label>
            <Input
              id={field.id}
              name={field.id}
              type="text"
              placeholder={field.placeholder}
              className="h-auto rounded-none border-0 bg-transparent p-0 text-xs text-white/80 shadow-none placeholder:text-white/60 focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent"
            />
          </div>
        ))}

        <Button
          type="submit"
          className="h-14 w-full rounded-none border-t border-white/15 bg-brand text-sm font-semibold text-white hover:bg-brand-hover sm:col-span-2 lg:col-span-1 lg:h-auto lg:border-t-0 lg:border-l"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
