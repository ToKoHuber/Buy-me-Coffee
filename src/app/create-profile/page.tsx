"use client";

import { useState } from "react";
import { ProfileInfo } from "./_components/ProfileInfo";
import { Header } from "./_components/Header";
import { PaymentInfo } from "./_components/PaymentInfo";

export default function CreateProfile() {
  const [currentStep, setCurrentStep] = useState(0);
  const CreateProfileSteps = [ProfileInfo, PaymentInfo][currentStep];
  return (
    <div className="flex flex-col items-center">
      <Header />
      <CreateProfileSteps
        onClick={() => {
          setCurrentStep(currentStep + 1);
        }}
      />
    </div>
  );
}
