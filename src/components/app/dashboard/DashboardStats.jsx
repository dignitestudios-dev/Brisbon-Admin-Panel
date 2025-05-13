import React from "react";
import { BsClipboard2Check } from "react-icons/bs"; // Icon for Bookings
import { MdMiscellaneousServices } from "react-icons/md"; // Icon for Services
import { useDashboardStats } from "../../../hooks/api/Get"; // Import the new hook
import SkeletonLoader from "../../global/SkeletonLoader"; // Import the SkeletonLoader component

const DashboardStats = () => {
  const { stats, loading, error } = useDashboardStats();

  if (loading) return <SkeletonLoader/>;
  if (error) return <div>{error}</div>;

  // Define your stats with dynamic data from API
  const dynamicStats = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: <BsClipboard2Check className="text-white text-3xl" />,
      bgColor: "bg-gradient-to-r from-[#46656E] to-[#313D41]",
      route: "/bookings",
    },
    {
      title: "Total Services",
      value: stats.totalServices,
      icon: <MdMiscellaneousServices className="text-white text-3xl" />,
      bgColor: "bg-gradient-to-r from-[#46656E] to-[#313D41]",
      route: "/services",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {dynamicStats.map((stat, index) => (
        <div
          key={index}
          className="cursor-pointer w-full rounded-xl border border-gray-200 bg-gray-50 p-6 flex items-center justify-between"
        >
          <div className="flex flex-col items-start justify-between">
            <span className="text-4xl font-semibold text-gray-900">
              {stat?.value}
            </span>
            <span className="text-gray-600 text-lg font-medium">
              {stat?.title}
            </span>
            <span className="mt-2 text-sm text-gray-400">{stat?.change}</span>
          </div>
          <div
            className={`w-16 h-16 flex items-center justify-center rounded-full ${stat?.bgColor}`}
          >
            {stat?.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
