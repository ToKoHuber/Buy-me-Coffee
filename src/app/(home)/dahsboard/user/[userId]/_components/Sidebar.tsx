"use client";
import Link from "next/link";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SquareArrowOutUpRight } from "lucide-react";
import { useUser } from "@/app/_context/UserContext";
import { UserType } from "@/utils/types";

export const Sidebar = () => {
  const { loggedUser } = useUser() as {
    loggedUser: UserType | null;
    logoutHandler: () => void;
  };

  return (
    <div className=" h-[100vh] w-[20%] text-white flex flex-col pl-20 ">
      <ToggleGroup
        type="single"
        className="bg-white text-black flex flex-col items-start gap-2"
      >
        <Link href={`/dashboard/user/${loggedUser?.id}`}>
          <ToggleGroupItem
            value="home"
            className="w-[150px] h-[36px] flex justify-start"
          >
            Home
          </ToggleGroupItem>
        </Link>
        <Link href={"/explore"}>
          <ToggleGroupItem
            value="explore"
            className="w-[150px] h-[36px] flex justify-start"
          >
            Explore
          </ToggleGroupItem>
        </Link>
        <Link href={`/user/${loggedUser?.id}`}>
          <ToggleGroupItem
            value="view"
            className="w-[150px] h-[36px] flex justify-start"
          >
            View page <SquareArrowOutUpRight />
          </ToggleGroupItem>
        </Link>
        <Link href={"/settings"}>
          <ToggleGroupItem
            value="settings"
            className="w-[150px] h-[36px] flex justify-start"
          >
            Account settings
          </ToggleGroupItem>
        </Link>
      </ToggleGroup>
    </div>
  );
};
