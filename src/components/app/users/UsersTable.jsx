import React, { useState, useEffect } from "react";
import { FaRegEye } from "react-icons/fa";
import { PiTrashSimpleBold } from "react-icons/pi";
import { useNavigate } from "react-router";
import { useUsers } from "../../../hooks/api/Get"; // Importing the useUsers hook
import SkeletonLoader from "../../global/SkeletonLoader"; // Importing the SkeletonLoader component

const UserTable = () => {
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState("all_users");
  const [currentPage, setCurrentPage] = useState(1); // Pagination state

  // Fetch users with pagination
  const { loading, users, pagination } = useUsers(currentPage);

  // Filter users based on their activation status (client-side filtering)
  const filteredUsers = users.filter((user) => {
    if (statusFilter === "all_users") return true; // Show all users
    if (statusFilter === "active_users") return !user.isDeactivatedByAdmin; // Active users (not deactivated)
    if (statusFilter === "offline_users") return user.isDeactivatedByAdmin; // Inactive users (deactivated)
    return true;
  });

  const handleNavigate = (userId) => {
    navigate(`/app/user-profile/${userId}`); // Navigate to the user's profile page
  };

  const handlePagination = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  const tabs = [
    { key: "all_users", label: "All" },
    { key: "active_users", label: "Active" },
    { key: "offline_users", label: "Inactive" },
  ];

  const hasNextPage = currentPage < pagination?.totalPages;
  const hasPreviousPage = currentPage > 1;

  // Function to generate the page numbers to show
  const generatePageNumbers = () => {
    const totalPages = pagination?.totalPages || 0;
    const maxVisiblePages = 5;
    const visiblePages = [];

    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start < maxVisiblePages - 1) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  return (
    <div className="w-full mx-auto p-2">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Users Management</h1>

      {/* Filter Tabs */}
      {/* <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setStatusFilter(tab.key);
              setCurrentPage(1); // Reset to first page when changing filter
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              statusFilter === tab.key
                ? "bg-[#46656E] text-white shadow"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div> */}

      <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-[#46656E] text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 text-left">User</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500 italic">
                  <SkeletonLoader />
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500 italic">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={user?.profilePicture || "/default-avatar.jpg"}
                        alt={user?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="font-medium text-gray-800">{user?.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user?.email}</td>
                  <td className="px-6 py-4">
                    {/* Check if the user is deactivated by admin */}
                    <span
                      className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${
                        user?.isDeactivatedByAdmin
                          ? "bg-gray-100 text-gray-600"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user?.isDeactivatedByAdmin ? "Inactive" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        title="View User"
                        className="bg-gray-100 hover:bg-gray-200 text-[#074F57] p-2 rounded-full"
                        onClick={() => handleNavigate(user._id)}
                      >
                        <FaRegEye size={16} />
                      </button>
                      {/* <button
                        title="Deactivate User"
                        disabled={user?.isDeactivatedByAdmin} // Disable the button if the user is already deactivated
                        onClick={() => alert("Deactivate logic")}
                        className={`p-2 rounded-full ${
                          user?.isDeactivatedByAdmin
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 hover:bg-gray-200 text-[#074F57]"
                        }`}
                      >
                        <PiTrashSimpleBold size={16} />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && filteredUsers.length > 0 && (
  <nav className="flex items-center justify-center space-x-2 mt-4" aria-label="Pagination">
    <button
      type="button"
      onClick={() => handlePagination(currentPage > 1 ? currentPage - 1 : currentPage)}
      disabled={!hasPreviousPage}
      className="bg-[#EDEDED] rounded-full text-gray-800 px-4 py-2 flex items-center justify-center"
    >
      Previous
    </button>

    {generatePageNumbers().map((page) => (
      <button
        key={page}
        onClick={() => handlePagination(page)}
        className={`px-4 py-2 rounded-full ${
          currentPage === page
            ? "bg-gradient-to-r from-[#46656E] to-[#313D41] text-white"
            : "text-gray-800 hover:bg-[#EDEDED]"
        }`}
      >
        {page}
      </button>
    ))}

    {pagination.totalPages > 5 && currentPage < pagination.totalPages - 2 && (
      <span className="text-gray-800">...</span>
    )}

    <button
      type="button"
      onClick={() => handlePagination(currentPage < pagination.totalPages ? currentPage + 1 : currentPage)}
      disabled={!hasNextPage}
      className="bg-[#EDEDED] rounded-full text-gray-800 px-4 py-2 flex items-center justify-center"
    >
      Next
    </button>
  </nav>
)}

    </div>
  );
};

export default UserTable;
