"use client";

import React, { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";

const dollarAmounts = [
  {
    id: "1",
    label: "$1",
  },
  {
    id: "2",
    label: "$2",
  },
  {
    id: "5",
    label: "$5",
  },
  {
    id: "10",
    label: "$10",
  },
] as const;

export const AmountEarnings = ({
  selectedAmounts,
  setSelectedAmounts,
}: {
  selectedAmounts: string[];
  setSelectedAmounts: Dispatch<SetStateAction<string[]>>;
}) => {
  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedAmounts([...selectedAmounts, id]);
    } else {
      setSelectedAmounts(selectedAmounts.filter((amount) => amount !== id));
    }

    console.log(
      "Filtering by amounts:",
      checked
        ? [...selectedAmounts, id]
        : selectedAmounts.filter((amount) => amount !== id)
    );
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <ChevronDown />
          Amount
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-4" align="end">
        <div className="space-y-2">
          {dollarAmounts.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                id={`amount-${item.id}`}
                checked={selectedAmounts.includes(item.id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(item.id, checked === true)
                }
              />
              <Label
                htmlFor={`amount-${item.id}`}
                className="text-sm font-normal cursor-pointer"
              >
                {item.label}
              </Label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
