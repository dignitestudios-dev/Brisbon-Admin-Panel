import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useParams } from "react-router";
import ReportsModal from "../../../components/app/reports/ReportsModal";
import { useReportDetails } from "../../../hooks/api/Get";
import { updateReportStatus } from "../../../hooks/api/Put";

const ReportDetails = () => {
  const { id } = useParams();
  const { report, loading, error } = useReportDetails(id);
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

  const service = report?.serviceRecord;
  const review = report?.reviewsRecord;

  return (
    <div className="mx-auto p-7 bg-white rounded-xl border shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Report Details</h1>

      <div className="space-y-6">
        {/* Status */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">Report Status:</span>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              report.status === "resolved"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
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

        {/* Reason */}
        <div>
          <p className="text-lg font-semibold text-gray-700 mb-2">Reason:</p>
          <p className="text-sm text-gray-600">{report?.reason}</p>
        </div>

        {/* Service Record */}
        {service && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Reported Service</h2>
            <div className="p-6 rounded-xl border shadow-sm bg-gray-50 space-y-3 text-sm text-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Title</p>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {service?.title || "No Title"}
                  </h3>
                </div>
                <div>
                  <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                    Rating: {service?.rating?.toFixed(2) || "N/A"}
                  </span>
                </div>
              </div>
              <p className="break-words">{service?.description || "No description provided."}</p>
              <div className="grid grid-cols-2 gap-4">
                <div><strong>Duration:</strong> {service?.duration} {service?.durationMetric}</div>
                <div><strong>Price:</strong> ${service?.price}</div>
                <div><strong>Start:</strong> {service?.startTime || "-"}</div>
                <div><strong>End:</strong> {service?.endTime || "-"}</div>
                <div><strong>Active:</strong> {service?.isActive ? "Yes" : "No"}</div>
                <div><strong>Created:</strong> {new Date(service?.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        )}

        {/* Review Record */}
        {review && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Reported Review</h2>
            <div className="p-6 rounded-xl border shadow-sm bg-gray-50 space-y-3 text-sm text-gray-700">
              <p><strong>Rating:</strong> {review?.rating}</p>
              <p><strong>Comment:</strong> {review?.comments || "No comment provided."}</p>
              <p><strong>Created:</strong> {new Date(review?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        {/* User Info */}
        <div className="rounded-xl text-black p-4 border bg-gray-50 mt-10">
          <h2 className="text-2xl font-bold mb-4">User Details</h2>
          <div className="flex items-center gap-4">
            <img
              src={report.userRecord?.profilePicture}
              alt="User"
              className="w-16 h-16 rounded-full object-cover border"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{report?.userRecord?.name}</h3>
            </div>
            <Link
              to={`/app/user-profile/${report?.userRecord?._id}`}
              className="flex bg-gray-700 items-center border p-2 rounded-lg text-white text-sm"
            >
              <AiOutlineEye className="mr-1 text-xl" />
              View Profile
            </Link>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end">
          {report.status !== "resolved" ? (
            <button
              onClick={() => setShowModal(true)}
              disabled={updating}
              className={`py-2 px-6 rounded-md font-medium transition text-white ${
                updating ? "bg-gray-400 cursor-not-allowed" : "bg-[#074F57] hover:bg-[#066058]"
              }`}
            >
              {updating ? "Marking..." : "Mark as Resolved"}
            </button>
          ) : (
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
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to mark this report as resolved? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmResolve}
                disabled={updating}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
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
