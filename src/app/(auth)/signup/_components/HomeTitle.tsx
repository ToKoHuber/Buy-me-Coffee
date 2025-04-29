import React from "react";
import Image from "next/image";

export const HomeTitle = () => {
  return (
    <div className="flex w-[50%] flex-col items-center justify-center bg-[#FBBF24] gap-4">
      <Image alt="coffeeLogo" src="coffee.svg" width={240} height={240} />
      <div className="text-center w-[40%]">
        <h1 className="font-bold">Fund your creative work</h1>
        <p className="text-wrap">
          Accept support. Start a membership. Setup a shop. It’s easier than you
          think.
        </p>
      </div>
    </div>
  );
};
