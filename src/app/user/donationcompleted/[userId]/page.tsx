"use client";
import { useUser } from "@/app/_context/UserContext";
import { CircleCheck } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const donationCompleted = () => {
  const { user } = useUser();

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
      <div className="flex flex-col gap-4 items-center">
        <div className="bg-[#18BA51] rounded-full w-[64px] h-[64px] flex justify-center items-center p-4">
          <CircleCheck color="white" size={36} />
        </div>
        <p className="font-bold text-4">Donation complete!</p>
      </div>
      <div className="border-1 w-[510px] flex flex-col gap-2 p-4 rounded-md">
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage
              alt=""
              src={user?.profile.avatarImage || "/guest.png"}
              className="rounded-full object-cover"
            />
            <AvatarFallback>MN</AvatarFallback>
          </Avatar>
          <h2 className="font-bold text-[14px]">{user?.username}:</h2>
        </div>
        <div className="flex justify-center">
          <p>{user?.profile.successMessage}</p>
        </div>
      </div>
      <Link href={"/explore"}>
        <Button className="font-light">Return to explore</Button>
      </Link>
    </div>
  );
};

export default donationCompleted;
