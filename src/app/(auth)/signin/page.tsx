import React from "react";
import { HomeTitle } from "../signup/_components/HomeTitle";
import LoginSection from "./_components/LoginSection";

const loginPage = () => {
  return (
    <div className="flex w-screen h-screen">
      <HomeTitle />
      <LoginSection />
    </div>
  );
};

export default loginPage;
