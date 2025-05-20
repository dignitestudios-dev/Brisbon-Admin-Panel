import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import SkeletonLoader from "../../../components/global/SkeletonLoader";
import AddNotificationModal from "../../../components/app/notifications/AddNotificationModal";
import useNotifications from "../../../hooks/api/Get";

const Notifications = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, notifications, pagination, fetchNotifications } = useNotifications(currentPage);

  const navigate = useNavigate();

  // Handle pagination click
  const goToPage = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  // Pass fetchNotifications to child (modal) to reload notifications after adding
  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#074F57] text-white px-4 py-2 rounded-md shadow hover:bg-[#066058] transition"
        >
          + Create Notification
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <SkeletonLoader />
      ) : (
      <div className="space-y-4">
  {notifications?.map((notification) => (
    <div
      key={notification?._id}
      className="bg-gray-50 p-4 rounded-xl shadow border border-gray-100"
    >
      <h3 className="font-semibold text-gray-800">{notification?.title}</h3>
      <p className="text-sm text-gray-500 line-clamp-2 mt-1">
        {notification?.description}
      </p>
      <div className="flex items-start justify-between mt-4">
        <div className="text-xs font-normal text-gray-500">
          {new Date(notification?.createdAt)?.toLocaleString()}
        </div>
      </div>
    </div>
  ))}
</div>


      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <nav className="flex items-center justify-center space-x-2 mt-4" aria-label="Pagination">
          <button
            type="button"
            onClick={() => goToPage(currentPage > 1 ? currentPage - 1 : currentPage)}
            className="rounded-full px-4 py-2 bg-[#EDEDED] text-[#46656E] hover:bg-[#46656E] hover:text-white"
          >
            Previous
          </button>

          {Array.from({ length: pagination.totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-4 py-2 rounded-full ${currentPage === i + 1 ? "bg-gradient-to-r from-[#46656E] to-[#313D41] text-white" : "text-gray-800"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            type="button"
            onClick={() => goToPage(currentPage < pagination.totalPages ? currentPage + 1 : currentPage)}
            className="rounded-full px-4 py-2 bg-[#EDEDED] text-[#46656E] hover:bg-[#46656E] hover:text-white"       
          >
            Next
          </button>
        </nav>
      )}

      {/* Add Notification Modal */}
      <AddNotificationModal
        showModal={showModal}
        setShowModal={setShowModal}
        fetchNotifications={fetchNotifications}  // Pass fetchNotifications to modal
      />
    </div>
  );
};

export default Notifications;
