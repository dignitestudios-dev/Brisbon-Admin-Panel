import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import Cookies from "js-cookie";
import { sidebarData } from "../../static/Sidebar";
import { brisbanelogo } from "../../assets/export";
import { RiLogoutCircleLine, RiMenuLine } from "react-icons/ri";

const StaticSidebaar = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from cookies
    Cookies.remove("token");

    // Redirect to login
    navigate("/auth/login");
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Toggle Button */}
      <button className="lg:hidden fixed top-4 left-4 z-50 text-[#074F57]">
        <RiMenuLine size={24} />
      </button>

      {/* Sidebar */}
      <div className="fixed lg:static mt-4 top-0 left-0 w-[280px] bg-gray-50 border-r border-gray-300 py-4 flex flex-col items-center z-40 h-screen overflow-y-auto">
        <div className="flex justify-center items-center w-full">
          <img
            src={brisbanelogo}
            alt="static_logo"
            className="h-[60px] w-[220px] object-contain"
          />
        </div>

        <div className="w-full flex-grow mt-6">
          <ul className="w-full space-y-4 px-4">
            {sidebarData.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `flex items-center gap-2 w-full px-6 py-3 border rounded-xl transition-all ${
                      isActive
                        ? "bg-[#46656E] text-white border-[#074F57]"
                        : "bg-white/50 text-[#074F57] border-[#074F57] hover:bg-[#46656E] hover:text-white"
                    }`
                  }
                >
                  {item.icon && <item.icon className="text-xl" />}
                  <span className="text-sm font-medium">{item.title}</span>
                </NavLink>
              </li>
            ))}

            {/* Logout Button */}
            <li className="flex items-center gap-3">
              <button
                onClick={() => setShowConfirm(true)}
                className="flex items-center gap-2 w-full px-6 py-3 bg-white/50 border border-[#074F57] text-[#074F57] rounded-xl hover:bg-[#46656E] hover:text-white transition-all"
              >
                <RiLogoutCircleLine className="text-xl" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Confirm Logout Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to logout?</h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaticSidebaar;
