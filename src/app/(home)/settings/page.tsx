"use client";
import React, { useEffect } from "react";
import { ChangePersonalInfo } from "./_components/ChangePersonalInfo";
import { ChangePassword } from "./_components/ChangePassword";
import { ChangePaymentInfo } from "./_components/ChangePaymentInfo";
import { ChangeSuccessMessage } from "./_components/ChangeSuccessMessage";
import { useUser } from "@/app/_context/UserContext";
import { useRouter } from "next/navigation";

const settingsPage = () => {
  const router = useRouter();
  const { loggedUser } = useUser();

  useEffect(() => {
    if (!loggedUser) {
      router.push("/signin");
    }
  }, [loggedUser, router]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1>My account</h1>
      <ChangePersonalInfo />
      <ChangePassword />
      <ChangePaymentInfo />
      <ChangeSuccessMessage />
    </div>
  );
};
export default settingsPage;
