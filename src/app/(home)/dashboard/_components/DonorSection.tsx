"use client";
import React from "react";
import { DonorGenerator } from "./DonorGenerator";
import { useUser } from "@/app/_context/UserContext";
import { DonationType } from "@/utils/types";

export const DonorSection = ({
  selectedAmounts,
}: {
  selectedAmounts: string[];
}) => {
  const { loggedUser } = useUser();

  if (!loggedUser) return null;

  const sortedDonations = loggedUser.donations
    ? [...loggedUser.donations].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : [];

  const filteredDonations =
    selectedAmounts.length > 0
      ? sortedDonations.filter((donor: DonationType) =>
          selectedAmounts.includes(JSON.stringify(donor.amount))
        )
      : sortedDonations;

  return (
    <div className="flex flex-col gap-6">
      {filteredDonations.length === 0 ? (
        <div className="flex flex-col items-center">
          <h2 className="font-bold">You don't have any supporters yet</h2>
          <p>Share your page with your audience to get started</p>
        </div>
      ) : (
        filteredDonations.map((donor: DonationType, index: number) => (
          <DonorGenerator key={index} donor={donor} />
        ))
      )}
    </div>
  );
};
