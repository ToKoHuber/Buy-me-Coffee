"use client";

import React, { useState } from "react";
import { AmountEarnings } from "./AmountFilter";
import { DonorSection } from "./DonorSection";

export const TransactionsProfile = () => {
  const [selectedAmount, setSelectedAmounts] = useState<string[]>([]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h2 className="font-bold">Recent transactions</h2>
        <AmountEarnings
          selectedAmounts={selectedAmount}
          setSelectedAmounts={setSelectedAmounts}
        />
      </div>
      <div className="flex flex-col p-6 border-1 rounded-md border-[#E4E4E7] ">
        <DonorSection selectedAmounts={selectedAmount} />
      </div>
    </div>
  );
};
