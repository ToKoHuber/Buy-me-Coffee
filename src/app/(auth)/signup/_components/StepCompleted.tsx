import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export const Stepcompleted = () => {
  return (
    <div className="text-center flex flex-col gap-4">
      <p>Registration successfully completed</p>
      <Link href="/signin">
        <Button className="w-full">Log in to order</Button>
      </Link>
    </div>
  );
};
