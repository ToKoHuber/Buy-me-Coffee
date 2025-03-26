import { useState } from "react";
import { ProfileInfo } from "./_components/ProfileInfo";
import { Header } from "./_components/Header";
import { PaymentInfo } from "./_components/PaymentInfo";

export function CreateProfile() {
  const [currentStep, setCurrentStep] = useState(0);
  //   const []
  return (
    <div className="flex flex-col items-center">
      <Header />
      <PaymentInfo />
    </div>
  );
}
