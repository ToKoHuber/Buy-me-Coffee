import React from "react";
import { Coffee } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const Donations = () => {
  return (
    <ToggleGroup type="single" className="flex gap-2 ">
      <ToggleGroupItem
        value="1"
        aria-label="$1"
        className="h-[40px]  px-4  rounded-md"
      >
        <Coffee /> $1
      </ToggleGroupItem>
      <ToggleGroupItem
        value="2"
        aria-label="$2"
        className="h-[40px]  px-4 rounded-md"
      >
        <Coffee /> $2
      </ToggleGroupItem>
      <ToggleGroupItem
        value="5"
        aria-label="$5"
        className="h-[40px]  px-4  rounded-md"
      >
        <Coffee /> $5
      </ToggleGroupItem>
      <ToggleGroupItem
        value="10"
        aria-label="$10"
        className="h-[40px]  px-4  rounded-md"
      >
        <Coffee /> $10
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
