"use client";
import React, { useEffect, useState } from "react";
import { CompleteProfile } from "./_components/CompleteProfile";
import { PaidSection } from "./_components/BankCardSection";
import { useSearchParams } from "next/navigation";

const ProfilePage = () => {
  const [step, setStep] = useState<number>(0);

  const searchParams = useSearchParams();

  useEffect(() => {
    const getStep = parseInt(searchParams?.get("step") || "0", 10);
    setStep(getStep);
  }, [searchParams]);

  const FormSteps = [CompleteProfile, PaidSection][step];

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <FormSteps currentStep={step} />
    </div>
  );
};

export default ProfilePage;
