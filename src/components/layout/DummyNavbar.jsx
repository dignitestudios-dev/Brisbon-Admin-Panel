import React from "react";
import { brisbanelogo , Logo} from "../../assets/export";
import { IoNotificationsOutline } from "react-icons/io5";

const DummyNavbar = () => {
  return (
    <div className="w-full h-[60px] bg-gray-50 border-b border-gray-300 flex justify-end items-center px-4">
      {/* <div className="flex items-center gap-6 py-4 font-normal text-gray-900">
        <button className="w-[29px] h-[29px] rounded-lg flex items-center justify-center bg-[#074F5730] p-1">
          <IoNotificationsOutline className="text-[#074F57] w-full h-full" />
        </button>

        <div className="flex items-center gap-2">
          <img
            src={Logo}
            alt="Profile"
            className="w-[35px] h-[35px] rounded-full bg-green-600"
          />
          <div className="flex flex-col items-start text-left">
            <p className="text-[11px] text-black">Welcome back,</p>
            <p className="text-[11px] font-medium text-[#074F57]">John Doe</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DummyNavbar;
