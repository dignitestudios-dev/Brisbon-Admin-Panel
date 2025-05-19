import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useServices } from "../../../hooks/api/Get"; 
import AddServiceModal from "./AddServiceModal"; 
import SkeletonLoader from "../../global/SkeletonLoader";

const ServiceTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);  
  const navigate = useNavigate();

  
  const { loading, services, pagination } = useServices("/service", currentPage,update); 

  // Handle navigation to service details page
  const handleNavigate = (serviceId) => {
    navigate(`/app/service-details/${serviceId}`);
  };

  // Handle pagination click
  const goToPage = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Services</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#074F57] text-white px-4 py-2 rounded-md shadow hover:bg-[#066058] transition"
        >
          + Add New Service
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <SkeletonLoader />  
      ) : (
        <div className="space-y-4">
          {services?.map((service) => (
            <div
              key={service._id} // Use _id as the unique key
              className="bg-gray-50 p-4 rounded-xl shadow border border-gray-100"
            >
              {/* <p className="text-xs text-gray-500 mb-1">
                Service ID: <span className="font-semibold">{service._id}</span>
              </p> */}
              <h3 className="font-semibold text-gray-800">{service.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                {service.description}
              </p>
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm font-semibold text-gray-900">
                  ${service.price}{" "}
                  <span className="text-xs font-normal text-gray-500">
                    {service.duration} {service.durationMetric}
                  </span>
                </div>
                <button
                  className="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded-full"
                  onClick={() => handleNavigate(service._id)} // Navigate to the service details
                >
                  <FaChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <nav
          className="flex items-center justify-center space-x-2 mt-4"
          aria-label="Pagination"
        >
          <button
            type="button"
            onClick={() => goToPage(currentPage > 1 ? currentPage - 1 : currentPage)}
            className="bg-[#EDEDED] rounded-full text-gray-800 px-4 py-2"
          >
            Previous
          </button>

          {Array.from({ length: pagination.totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-4 py-2 rounded-full ${currentPage === i + 1 ? "bg-blue-500 text-white" : "text-gray-800"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            type="button"
            onClick={() => goToPage(currentPage < pagination.totalPages ? currentPage + 1 : currentPage)}
            className="bg-[#EDEDED] rounded-full text-gray-800 px-4 py-2"
          >
            Next
          </button>
        </nav>
      )}

      {/* Add Service Modal */}
      <AddServiceModal
        showModal={showModal}
        setShowModal={setShowModal}
        setUpdate={setUpdate}
      />
    </div>
  );
};

export default ServiceTable;
