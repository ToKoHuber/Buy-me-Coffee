"use client";

import { useState, useEffect } from "react";
import { FindUserName } from "./_components/FindUserName";
import { Signup } from "./_components/Singup";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState(null);
  const FormSteps = [FindUserName, Signup][currentStep];
  useEffect(() => {
    // Fetch data from the Next.js API route
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user");
        if (response.ok) {
          const data = await response.json();
          setUserData(data); // Store data in state
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log("userData", userData);

  return (
    <div className="w-[50%] v-[100vh] flex justify-center items-center relative">
      <Button
        className="absolute top-[32px] right-[108px]"
        onClick={() => router.push("/login")}
      >
        Log in
      </Button>
      <FormSteps
        userData={userData}
        setUserName={setUserName}
        userName={userName}
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
