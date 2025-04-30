import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DonationType } from "@/utils/types";
import ExpandableText from "./ExpandableText";
import { DateAgo } from "@/utils/DateAgo";

export const DonorGenerator = ({ donor }: { donor: DonationType }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            {donor.donorImage ? (
              <AvatarImage
                src={donor.donorImage}
                alt={donor.donorName}
                className="object-cover"
              />
            ) : (
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt=""
                className="object-cover"
              />
            )}

            <AvatarFallback>MN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-[14px] font-semibold">
              {donor.donorName ? donor.donorName : "Guest"}
            </h3>
            <p className="text-[12px]">{donor.socialURLOrBuyMeACoffee}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex gap-1">
            <p>+</p>
            <h2 className="font-bold">${donor.amount}</h2>
          </div>

          <DateAgo date={donor.createdAt} />
        </div>
      </div>

      <ExpandableText text={donor.specialMessage} />
    </div>
  );
};
