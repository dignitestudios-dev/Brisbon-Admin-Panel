import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="w-screen min-h-screen  flex justify-center items-center bg-gradient-to-b from-[#313D41] to-[#46656E] p-3 md:py-8 ">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
  