"use client";

import { useState } from "react";
import { FindUserName } from "./_components/FindUserName";
import { Signup } from "./_components/Singup";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const FormSteps = [FindUserName, Signup][currentStep];

  return (
    <div className="w-[50%] v-[100vh] flex justify-center items-center relative">
      <Button
        className="absolute top-[32px] right-[108px]"
        onClick={() => router.push("/login")}
      >
        Log in
      </Button>
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
    </div>
  );
}
