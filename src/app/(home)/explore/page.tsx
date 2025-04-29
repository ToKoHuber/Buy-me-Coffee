"use client";
import { useUser } from "@/app/_context/UserContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserType } from "@/utils/types";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ExternalLink, Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const explorePage = () => {
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const { users } = useUser() as {
    users: UserType[] | null;
  };

  if (!users) return;

  useEffect(() => {
    if (users) setFilteredUsers(users);
  }, [users]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();

    if (!users) return;

    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchValue)
    );

    setFilteredUsers(filtered);
  };

  return (
    <div className="flex flex-col gap-6 p-6 border-1 rounded-md border-[#E4E4E7]">
      <h2>Explore creators</h2>
      <div className="relative w-full max-w-sm">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <Input
          type="text"
          placeholder="Search name"
          onChange={inputHandler}
          className="pl-10"
        />
      </div>
      <div className="flex flex-col gap-6 ">
        <div className="flex justify-between">
          <div className="w-full flex flex-col gap-4">
            {filteredUsers?.map((user, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col gap-4 p-6 border-1 rounded-md border-[#E4E4E7]"
                >
                  <div className="w-full flex justify-between items-center">
                    <div className="w-full flex items-center  gap-4">
                      <Avatar>
                        <AvatarImage
                          alt="creators"
                          src={user.profile.avatarImage || "/guestDefault.svg"}
                          className="object-cover object-center"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <h2 className="font-bold text-[20px]">{user.username}</h2>
                    </div>
                    <Link href={`/user/${user.id}`}>
                      <Button variant={"secondary"}>
                        <p>View profile</p>
                        <ExternalLink />
                      </Button>
                    </Link>
                  </div>
                  <div className=" flex justify-between">
                    <div className="w-[50%] flex flex-col gap-2">
                      <h3 className="font-bold text-[16px]">
                        About {user.username}
                      </h3>
                      <p className="text-[14px]">{user.profile.about}</p>
                    </div>
                    <div className="w-[50%]">
                      <h3 className="font-bold text-[16px]">
                        Social media URL
                      </h3>
                      <p className="text-[14px]">
                        {user.profile.socialMediaURL}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default explorePage;
