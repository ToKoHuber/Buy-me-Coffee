"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { DonationType } from "@/utils/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RecentSupportersProps {
  latestDonors: DonationType[];
}

export default function RecentSupporters({
  latestDonors,
}: RecentSupportersProps) {
  const [showMore, setShowMore] = useState(false);

  const hasMoreDonors = latestDonors.length > 1;
  const donorsToShow = showMore ? Math.min(3, latestDonors.length) : 1;

  return (
    <div className="flex flex-col gap-4 w-full">
      {latestDonors.slice(0, donorsToShow).map((donor, index) => (
        <div key={index} className="flex gap-3">
          <Avatar>
            <AvatarImage
              alt=""
              src={donor.donorImage || "/guestDefault.svg"}
              className="rounded-full object-cover"
            />
            <AvatarFallback>MN</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1">
              <h2 className="font-bold text-[14px]">
                {donor.donorName || "Guest"}
              </h2>
              <p className="text-[14px]">bought</p>
              <h2 className="font-bold text-[14px]">${donor.amount}</h2>
              <p className="text-[14px]">coffee</p>
            </div>
            <p className="text-[14px]">{donor.specialMessage}</p>
          </div>
        </div>
      ))}

      {hasMoreDonors && !showMore && (
        <Button
          variant="ghost"
          className="flex items-center gap-2 w-full justify-center border-1"
          onClick={() => setShowMore(true)}
        >
          See more <ChevronDown className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
