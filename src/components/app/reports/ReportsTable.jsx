import React, { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa"; // Add left chevron
import { useNavigate } from "react-router";
import { useReports } from "../../../hooks/api/Get"; // Import the useReports hook
import SkeletonLoader from "../../global/SkeletonLoader"; // Import the SkeletonLoader component


const ReportsTable = () => {
  const [activeSession, setActiveSession] = useState("underreview"); // Default filter set to "underreview"
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const navigate = useNavigate();

  // Use the custom hook to fetch reports with pagination
  const { loading, reports, pagination } = useReports("/booking/reports", activeSession, currentPage);

  // Navigate to the report details page with report ID
  const handleNavigate = (reportId) => {
    navigate(`/app/report-details/${reportId}`); // Pass the reportId to the URL for dynamic routing
  };

  const handlePagination = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  // Check if the next page exists
  const hasNextPage = currentPage < pagination?.totalPages;
  const hasPreviousPage = currentPage > 1;

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Reports Management</h1>

      {/* Session Filter */}
      <div className="flex mb-4 rounded-md overflow-hidden bg-gray-100">
        <button
          className={`w-1/2 py-2 text-sm font-medium ${
            activeSession === "underreview"
              ? "bg-gradient-to-r from-[#46656E] to-[#313D41] text-white"
              : "text-[#46656E]"
          }`}
          onClick={() => {
            setActiveSession("underreview");
            setCurrentPage(1); // Reset page to 1 when filter is changed
          }}
        >
          Under Review
        </button>
        <button
          className={`w-1/2 py-2 text-sm font-medium ${
            activeSession === "resolved"
              ? "bg-gradient-to-r from-[#46656E] to-[#313D41] text-white"
              : "text-[#46656E]"
          }`}
          onClick={() => {
            setActiveSession("resolved");
            setCurrentPage(1); // Reset page to 1 when filter is changed
          }}
        >
          Resolved
        </button>
      </div>

      {/* Report Cards */}
      <div className="space-y-4">
        {loading ? (
                  <SkeletonLoader />  // Display the SkeletonLoader while loading

        ) : reports.length === 0 ? (
          <div className="bg-white p-4 rounded-xl shadow border border-gray-100 text-center text-gray-500">
            No reports found
          </div>
        ) : (
          reports.map((report) => (
            <div
              key={report._id}
              className="bg-gray-50 p-4 rounded-xl shadow border border-gray-100"
            >
              {/* Report Info */}
              <p className="text-xs text-gray-500 mb-1">
                Report ID: <span className="font-semibold">{report._id}</span>
              </p>
              <h3 className="font-semibold text-gray-800">
                {report?.serviceRecord?.title || "No Service Title"}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                {report?.serviceRecord?.description || "No description available."}
              </p>

              {/* User Info */}
              <p className="text-sm text-gray-500 mt-2">
                Reported by: <span className="font-semibold">{report.userRecord?.name || "Unknown"}</span>
              </p>
              <p className="text-xs text-gray-400">
                Reason: {report.reason || "No reason provided."}
              </p>

              {/* Report Status */}
              <p className="text-xs text-gray-400 mt-2">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    report.status === "underreview" ? "text-yellow-500" : "text-green-500"
                  }`}
                >
                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                </span>
              </p>

              <div className="flex items-center justify-between mt-4">
                {/* Price and Duration */}
                <div className="text-sm font-semibold text-gray-900">
                  {report?.serviceRecord?.price ? (
                    `$${report?.serviceRecord?.price} `
                  ) : (
                    <span className="text-gray-400">No price mentioned</span>
                  )}
                  {report?.serviceRecord?.duration ? (
                    <span className="text-xs font-normal text-gray-500">
                      {report?.serviceRecord?.duration} {report?.serviceRecord?.durationMetric}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">No duration provided</span>
                  )}
                </div>

                {/* View Details Button */}
                <button
                  className="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded-full"
                  onClick={() => handleNavigate(report._id)} // Pass the report._id to navigate to details page
                >
                  <FaChevronRight size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <nav
          className="flex items-center justify-center space-x-2 mt-4"
          aria-label="Pagination"
        >
          {/* Previous Button */}
          <button
            type="button"
            onClick={() =>
              handlePagination(currentPage > 1 ? currentPage - 1 : currentPage)
            }
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

          {/* Page Numbers */}
          {Array.from({ length: pagination.totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePagination(i + 1)}
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
            onClick={() =>
              handlePagination(
                currentPage < pagination.totalPages ? currentPage + 1 : currentPage
              )
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
      )}
    </div>
  );
};

export default ReportsTable;
