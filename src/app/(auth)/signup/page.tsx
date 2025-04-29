import React from "react";
import { HomeTitle } from "./_components/HomeTitle";
import SignUpSection from "./_components/SignUpSection";

const signUpPage = () => {
  return (
    <div className="flex w-screen h-screen ">
      <HomeTitle />
      <SignUpSection />
    </div>
  );
};

export default signUpPage;
