import React, { useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import SkeletonLoader from "../../global/SkeletonLoader";
import { useBookings } from "../../../hooks/api/Get";

const BookingsTable = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [activeSession, setActiveSession] = useState("physical");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const navigate = useNavigate();

  const { loading, bookings, pagination } = useBookings(
    "/booking",
    activeSession,
    activeTab,
    currentPage,
    pageSize
  );

  const handleNavigate = (bookingId) => {
    navigate(`/app/booking-details/${bookingId}`);
  };

  const goToPage = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  const tabs = ["Pending", "Approved", "Completed", "Rejected"];
  const hasNextPage = currentPage < pagination?.totalPages;
  const hasPreviousPage = currentPage > 1;

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Bookings</h1>

      {/* Session Filter */}
      <div className="flex mb-4 rounded-md overflow-hidden bg-gray-100">
        <button
          className={`w-1/2 py-2 text-sm font-medium ${
            activeSession === "physical"
              ? "bg-gradient-to-r from-[#46656E] to-[#313D41] text-white"
              : "text-[#46656E]"
          }`}
          onClick={() => {
            setActiveSession("physical");
            setCurrentPage(1);
          }}
        >
          Physical Session
        </button>
        <button
          className={`w-1/2 py-2 text-sm font-medium ${
            activeSession === "online"
              ? "bg-gradient-to-r from-[#46656E] to-[#313D41] text-white"
              : "text-[#46656E]"
          }`}
          onClick={() => {
            setActiveSession("online");
            setCurrentPage(1);
          }}
        >
          Online Session
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex justify-center rounded-md space-x-52 text-sm text-gray-500 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab.toLowerCase());
              setCurrentPage(1);
            }}
            className={`pb-1 ${
              activeTab === tab.toLowerCase()
                ? "text-black border-b-2 border-gray-700 font-medium"
                : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bookings */}
      {loading ? (
        <SkeletonLoader />
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings available</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const isFree = booking?.price === 0;

            const title =
              booking?.serviceRecord?.title?.trim() ||
              booking?.spotSuggestion?.trim() ||
              (isFree ? "Free Service" : "No Title");

            const description =
              booking?.serviceRecord?.description?.trim() ||
              (isFree ? "This Service is Free Consultation" : "No description available");

            return (
              <div
                key={booking?._id}
                className="bg-gray-50 p-4 rounded-xl shadow border border-gray-100"
              >
                <h3 className="font-semibold text-gray-800">{title}</h3>

                <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                  {description}
                </p>

                <p className="text-xs text-gray-500 mt-2">{booking?.date}</p>

                <p className="text-xs text-gray-500 mt-2 font-semibold">
                  Status: {booking?.status}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm font-semibold text-gray-900">
                    {isFree ? (
                      <span className="text-green-600 font-medium">Free</span>
                    ) : (
                      `$${booking?.price}`
                    )}{" "}
                    <span className="text-xs font-normal text-gray-500">
                      {booking?.duration} {booking?.durationMetric}
                    </span>
                  </div>

                  <button
                    className="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded-full"
                    onClick={() => handleNavigate(booking?._id)}
                  >
                    <FaChevronRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages ? (
        <nav className="flex items-center justify-end space-x-2 mt-4" aria-label="Pagination">
          <button
            type="button"
            onClick={() => goToPage(currentPage > 1 ? currentPage - 1 : currentPage)}
            disabled={!hasPreviousPage}
            className={`${
              !hasPreviousPage
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-[#EDEDED] text-[#46656E] hover:bg-[#46656E] hover:text-white"
            } px-4 py-2 rounded-full flex items-center justify-center transition duration-300`}
          >
            <FaChevronLeft />
            <span className="ml-2">Previous</span>
          </button>

          {Array.from({ length: pagination.totalPages }, (_, i) => (
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

          <button
            type="button"
            onClick={() =>
              goToPage(currentPage < pagination.totalPages ? currentPage + 1 : currentPage)
            }
            disabled={!hasNextPage}
            className={`${
              !hasNextPage
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-[#EDEDED] text-[#46656E] hover:bg-[#46656E] hover:text-white"
            } px-4 py-2 rounded-full flex items-center justify-center transition duration-300`}
          >
            <span className="mr-2">Next</span>
            <FaChevronRight />
          </button>
        </nav>
      ) : null}
    </div>
  );
};

export default BookingsTable;
