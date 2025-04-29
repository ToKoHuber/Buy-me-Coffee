"use client";
import React, { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { Stepcompleted } from "./StepCompleted";

const Page = () => {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const getStep = parseInt(searchParams.get("step") || "0", 10);
    setStep(getStep);
  }, [searchParams]);

  const FormSteps = [StepOne, StepTwo, Stepcompleted][step];

  return (
    <div className="flex gap-4 items-center justify-center w-[50%]">
      <FormSteps currentStep={step} />
    </div>
  );
};

export default Page;
