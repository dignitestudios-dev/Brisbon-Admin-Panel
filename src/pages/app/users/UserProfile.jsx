import React, { useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { useUserProfileDetails } from "../../../hooks/api/Get"; // Import the hook
import SkeletonLoader from "../../../components/global/SkeletonLoader";

const UserProfile = () => {
  const { id } = useParams(); // Get user id from URL params
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("pending");
  const [activeSession, setActiveSession] = useState("physical");

  const { user, bookings, loading, error } = useUserProfileDetails(id); // Use the custom hook to fetch user and bookings

  const tabs = ["Pending", "Approved", "Completed", "Rejected"];
  const bookingsPerPage = 5; // Number of bookings per page
  const [currentPage, setCurrentPage] = useState(1);

  // Filter bookings based on selected status and session type
  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = booking.status?.toLowerCase() === activeTab;
    const matchesSession = booking.session?.toLowerCase() === activeSession;
    return matchesStatus && matchesSession;
  });

  // Pagination logic
  const totalBookings = filteredBookings.length;
  const totalPages = Math.ceil(totalBookings / bookingsPerPage);
  const startIndex = (currentPage - 1) * bookingsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, startIndex + bookingsPerPage);

  // Check if user data is available and prevent rendering until it is loaded
  if (loading) {
    return <div><SkeletonLoader /></div>;
  }

  // Display an error message if the data could not be fetched
  if (error) {
    return <div>{error}</div>;
  }

  // If user or bookings data is null, render a message
  if (!user) {
    return <div>User not found</div>;
  }

  if (!bookings) {
    return <div>No bookings found for this user.</div>;
  }

  // Handle page change
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="p-4 mx-auto">
      {/* Profile Header */}
      <div className="relative bg-gradient-to-t from-[#1c1f20] to-[#3f4b50] rounded-xl text-white p-4">
        <h1 className="text-2xl font-bold text-white mb-6">User Profile</h1>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <img
              src={user.profilePicture || "https://ui-avatars.com/api/?name=Mike+Smith&background=46656E&color=fff"}
              className="w-16 h-16 rounded-full object-cover border-2 border-white"
              alt="User"
            />
          </div>

          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg">{user.name || "User Name"}</h3>
            <p className="text-sm text-gray-300">{user.email || "No email available"}</p>
          </div>
        </div>
      </div>

      {/* Bookings Section */}
      <div className="mt-6">
        <h2 className="text-left text-lg font-semibold mb-4">Bookings</h2>

        {/* Session Tabs */}
        <div className="flex mb-4 rounded-full overflow-hidden bg-gray-100">
          <button
            className={`w-1/2 py-2 text-sm font-medium ${activeSession === "physical" ? "bg-gradient-to-r from-[#46656E] to-[#313D41] text-white" : "text-[#46656E]"}`}
            onClick={() => setActiveSession("physical")}
          >
            Physical Session
          </button>
          <button
            className={`w-1/2 py-2 text-sm font-medium ${activeSession === "online" ? "bg-gradient-to-r from-[#46656E] to-[#313D41] text-white" : "text-[#46656E]"}`}
            onClick={() => setActiveSession("online")}
          >
            Online Session
          </button>
        </div>

        {/* Status Tabs */}
        <div className="flex justify-around text-sm text-gray-500 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`pb-1 ${activeTab === tab.toLowerCase() ? "text-black border-b-2 border-gray-700 font-medium" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Booking Cards */}
        <div className="space-y-4">
          {currentBookings.length === 0 ? (
            <div>No bookings available for this user.</div>
          ) : (
            currentBookings.map((booking, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow border border-gray-100">
                {/* <p className="text-xs text-gray-500 mb-1">
                  Booking ID: <span className="font-semibold">{booking._id}</span> 
                </p> */}

                {/* Service Record */}
                <h3 className="font-semibold text-gray-800">
                  {booking.serviceRecord?.title || "No title available"}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                  {booking?.serviceRecord?.description || "No description available"}
                </p>

                {/* Date and Time */}
                <p className="text-sm text-gray-500 mt-2">
                  Date: <span className="font-semibold">{booking?.date}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Time: <span className="font-semibold">{booking?.time}</span>
                </p>

                {/* Status and Session Type */}
                <div className="flex gap-2 mt-2">
                  <span className="text-xs px-2 py-1 bg-gray-200 rounded-full text-gray-600">
                    Status: {booking?.status || "N/A"}
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-200 rounded-full text-gray-600">
                    Session: {booking?.session || "N/A"}
                  </span>
                </div>

                {/* Price and Duration */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm font-semibold text-gray-900">
                    {booking?.price ? `$${booking?.price}` : "$0"}{" "}
                    <span className="text-xs font-normal text-gray-500">
                      {booking?.duration || 0} {booking?.durationMetric || "hr"}
                    </span>
                  </div>

                  {/* View More Button */}
                  <button
                    className="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded-full"
                    onClick={() => navigate(`/app/booking-details/${booking?._id}`)} // Corrected to use _id
                  >
                    <FaChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <nav className="flex items-center justify-center space-x-2 mt-4" aria-label="Pagination">
          {/* Previous Button */}
          <button
            type="button"
            onClick={() => goToPage(currentPage > 1 ? currentPage - 1 : currentPage)}
            disabled={currentPage <= 1}
            className={`${
              currentPage <= 1
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-[#EDEDED] text-[#46656E] hover:bg-[#46656E] hover:text-white"
            } px-4 py-2 rounded-full flex items-center justify-center transition duration-300`}
          >
            <FaChevronLeft />
            <span className="ml-2">Previous</span>
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-4 py-2 rounded-full text-gray-800 transition duration-300 ease-in-out ${
                currentPage === i + 1
                  ? "bg-gradient-to-r from-[#46656E] to-[#313D41] text-white"
                  : "hover:bg-[#EDEDED]"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            type="button"
            onClick={() => goToPage(currentPage < totalPages ? currentPage + 1 : currentPage)}
            disabled={currentPage >= totalPages}
            className={`${
              currentPage >= totalPages
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-[#EDEDED] text-[#46656E] hover:bg-[#46656E] hover:text-white"
            } px-4 py-2 rounded-full flex items-center justify-center transition duration-300`}
          >
            <span className="mr-2">Next</span>
            <FaChevronRight />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default UserProfile;
