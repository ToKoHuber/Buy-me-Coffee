import React, { ReactNode } from "react";
import { Sidebar } from "./dashboard/user/[userId]/_components/Sidebar";

type Props = {
  children: ReactNode;
};

const layout = (props: Props) => {
  return (
    <div className="flex w-screen pt-24 m-auto">
      <Sidebar />
      <div className="w-[78%]">{props.children}</div>
    </div>
  );
};

export default layout;
