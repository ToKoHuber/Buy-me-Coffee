"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./_context/UserContext";
import { EarningsProfile } from "./(home)/dashboard/user/[userId]/_components/EarningsProfile";
import { TransactionsProfile } from "./(home)/dashboard/user/[userId]/_components/TransactionsProfile";

const Home = () => {
  const { loggedUser } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (!loggedUser) {
      router.push("/signin");
    }
  }, [loggedUser, router]);

  !loggedUser ? null : router.push(`/dashboard/user/${loggedUser.id}`);

  return (
    <div className="flex flex-col gap-6 pr-20">
      <EarningsProfile />
      <TransactionsProfile />
    </div>
  );
};

export default Home;
