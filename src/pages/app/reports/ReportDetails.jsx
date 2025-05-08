import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaCheckCircle, FaChevronRight } from "react-icons/fa";
import { Link, useParams } from "react-router";
import ReportsModal from "../../../components/app/reports/ReportsModal";
import { useReportDetails } from "../../../hooks/api/Get";
import { updateReportStatus } from "../../../hooks/api/Put"; // Import the updateReportStatus function  

const ReportDetails = () => {
  const { id } = useParams();
  const { report, loading, error, refetch } = useReportDetails(id);
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleConfirmResolve = async () => {
    try {
      setUpdating(true);
      await updateReportStatus(report._id);
      window.location.reload();
      setShowModal(false);
    } catch (err) {
      console.error("Failed to mark report as resolved:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) return <div>Loading report...</div>;
  if (error) return <div>Error loading report: {error}</div>;

  return (
    <div className="mx-auto p-7 bg-white rounded-xl border shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Report Details</h1>

      <div className="space-y-6">
        {/* Report ID and Status */}
        <div className="flex justify-between items-center">
          <div>
            <span className="text-gray-500 font-medium">Report Status:</span>
          </div>
          <div
            className={`px-3 py-1 rounded-full ${
              report.status === "resolved"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            } text-sm font-medium`}
          >
            {report.status === "resolved" ? "Resolved" : "Unresolved"}
          </div>
        </div>

        {/* Reported At */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">Reported At:</span>
          <span className="text-gray-900 font-semibold">
            {new Date(report.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Description */}
        <div>
          <p className="text-lg font-semibold text-gray-700 mb-2">Description:</p>
          <p className="text-sm text-gray-600">{report?.reason}</p>
        </div>

        {/* Reported Service */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Reported Service</h2>
          <div className="p-6 rounded-xl border shadow-sm bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">Service Title</p>
                <h3 className="text-lg font-semibold text-gray-800">
                  {report?.serviceRecord?.title || "No Title"}
                </h3>
              </div>
              <div className="text-right">
                <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                  Rating: {report?.serviceRecord?.rating?.toFixed(2) || "no rating"}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {report?.serviceRecord?.description || "No description provided"}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <span className="block text-gray-500 font-medium">Duration</span>
                {report?.serviceRecord?.duration} {report?.serviceRecord?.durationMetric}
              </div>
              <div>
                <span className="block text-gray-500 font-medium">Price</span>
                ${report?.serviceRecord?.price}
              </div>
              <div>
                <span className="block text-gray-500 font-medium">Start Time</span>
                {report?.serviceRecord?.startTime || "-"}
              </div>
              <div>
                <span className="block text-gray-500 font-medium">End Time</span>
                {report?.serviceRecord?.endTime || "-"}
              </div>
              <div>
                <span className="block text-gray-500 font-medium">Active</span>
                {report?.serviceRecord?.isActive ? "Yes" : "No"}
              </div>
              <div>
                <span className="block text-gray-500 font-medium">Created</span>
                {new Date(report?.serviceRecord?.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="relative rounded-xl text-black p-4 mb-6 border bg-gray-50">
          <h1 className="text-2xl font-bold text-black mb-6">User Details</h1>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <img
                src={`https://ui-avatars.com/api/?name=${report.userRecord}&background=46656E&color=fff`}
                className="w-16 h-16 rounded-full object-cover border-2 border-white"
                alt="User"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-black font-semibold text-lg">{report.userRecord}</h3>
            </div>
            <Link
              to={`/app/user-profile/${report.userRecord}`}
              className="flex bg-gray-700 items-center border p-2 rounded-lg text-white text-sm cursor-pointer"
            >
              <AiOutlineEye className="mr-1 text-xl" />
              View Profile
            </Link>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end">
          {report.status !== "resolved" && (
            <button
              onClick={() => setShowModal(true)}
              disabled={updating}
              className={`py-2 px-6 rounded-md font-medium transition text-white ${
                updating ? "bg-gray-400 cursor-not-allowed" : "bg-[#074F57] hover:bg-[#066058]"
              }`}
            >
              {updating ? "Marking..." : "Mark as Resolved"}
            </button>
          )}
          {report.status === "resolved" && (
            <div className="flex items-center gap-2 text-green-700 font-medium">
              <FaCheckCircle className="text-green-600" />
              Report marked as resolved
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-auto p-6 border">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Confirm Resolution</h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Are you sure you want to mark this report as resolved? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmResolve}
                disabled={updating}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition ${
                  updating ? "bg-gray-400 cursor-not-allowed" : "bg-[#074F57] hover:bg-[#066058]"
                }`}
              >
                {updating ? "Updating..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportDetails;
