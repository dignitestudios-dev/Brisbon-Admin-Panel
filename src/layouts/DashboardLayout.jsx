import { Outlet } from "react-router";
import DummyNavbar from "../components/layout/DummyNavbar";
import DummySidebaar from "../components/layout/DummySidebaar";
import { useEffect, useState } from "react";
import NoInternetModal from "../components/global/NoInternet";
import { NoInternetImage } from "../assets/export";

const DashboardLayout = () => {
  const [openNoInternet, setOpenNoInternet] = useState(false);

  useEffect(() => {
    if (!navigator.onLine) {
      setOpenNoInternet(true);
    }
  }, []);

  return (
    <div className="w-full h-screen overflow-y-hidden flex justify-start items-start">
      {/* Sidebar */}
      <div className="w-[280px] h-full bg-gray-50 border-r border-gray-200">
        <DummySidebaar />
      </div>

      {/* Main Content Area */}
      <div className="w-full lg:w-[calc(100%-280px)] h-full flex flex-col">
        {/* Navbar */}
        <div className="w-full h-[60px] bg-white shadow-sm z-10">
          <DummyNavbar />
        </div>

        {/* Main Page Content */}
        <div className="w-full h-[calc(100%-60px)] bg-white p-4 overflow-y-auto">
          <NoInternetModal isOpen={openNoInternet} />
          <Outlet />
        </div>
      </div>

      {/* Hidden fallback image for offline */}
      <img src={NoInternetImage} alt="No Internet" className="hidden" />
    </div>
  );
};

export default DashboardLayout;
