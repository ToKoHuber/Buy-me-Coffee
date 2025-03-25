"use client";

import { useState } from "react";
import { FindUserName } from "./_components/FindUserName";
import { Signup } from "./_components/Singup";

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const FormSteps = [FindUserName, Signup][currentStep];

  return (
    <FormSteps
      setEmail={setEmail}
      setPassword={setPassword}
      email={email}
      onClick={() => {
        setCurrentStep(currentStep + 1);
      }}
      goBack={() => {
        setCurrentStep(currentStep - 1);
      }}
    />
  );
}
