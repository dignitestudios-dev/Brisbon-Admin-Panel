import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { FaStar, FaTrashAlt, FaEdit } from 'react-icons/fa'; // Import trash and edit icons
import { useServiceDetails, useServiceReviews } from '../../../hooks/api/Get';
import SkeletonLoader from '../../../components/global/SkeletonLoader';
import axios from '../../../axios'; 
import { ErrorToast, SuccessToast } from '../../../components/global/Toaster';
import { MdOutlineModeEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { serviceSchema } from "../../../schema/authentication/dummyLoginSchema";



// Modal for Delete Confirmation
const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
        <p className="mb-4">Are you sure you want to delete this service? This action cannot be undone.</p>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded-lg">Delete</button>
        </div>
      </div>
    </div>
  );
};



const EditModal = ({ isOpen, onClose, onSubmit, service }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Edit Service</h3>

        <Formik
          initialValues={{
            title: service.title || "",
            description: service.description || "",
            price: service.price || 1,
            duration: service.duration || 1,
            durationMetric: service.durationMetric || "hr",
            startTime: service.startTime || "09:00",
            endTime: service.endTime || "10:00",
          }}
          validationSchema={serviceSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <Field
                  type="text"
                  name="title"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <Field
                  as="textarea"
                  name="description"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <Field
                  type="number"
                  name="price"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <Field
                  type="number"
                  name="duration"
                  className="mt-1 p-2 w-full border rounded-md"
                  disabled
                />
                <ErrorMessage name="duration" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Duration Metric</label>
                <Field
                  type="text"
                  name="durationMetric"
                  className="mt-1 p-2 w-full border rounded-md"
                  disabled
                />
                <ErrorMessage name="durationMetric" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <Field
                  type="time"
                  name="startTime"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage name="startTime" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                <Field
                  type="time"
                  name="endTime"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage name="endTime" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-900 rounded-lg"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};


const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false); // State to trigger re-fetching of service details
  const { service,  loading, error } = useServiceDetails(id,update,);
  const { reviews, reviewsLoading, reviewsError } = useServiceReviews(id);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDeleteClick = () => setIsDeleteModalOpen(true);
  const handleEditClick = () => setIsEditModalOpen(true);

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/service/${id}`);
      SuccessToast('Service deleted successfully!');
      navigate('/app/services');
    } catch (err) {
      console.error(err);
      ErrorToast('Error deleting the service. Please try again.');
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleEditSubmit = async (updatedService) => {
    try {
     const response =  await axios.put(`/service/${id}`, updatedService);
     if (response?.status === 200) {
      SuccessToast('Service updated successfully!');
      setUpdate(prev=> !prev); 
     }
    } catch (err) {
      console.error(err);
      ErrorToast('Error updating the service. Please try again.');
    } finally {
      setIsEditModalOpen(false);
    }
  };

  const handleModalClose = () => {
    setIsDeleteModalOpen(false);
    setIsEditModalOpen(false);
  };

  if (loading) return <SkeletonLoader />;
  if (error) return <p>{error}</p>;
  if (!service) return <p>Service not found.</p>;

  return (
    <div className="relative mx-auto p-6 bg-white rounded-xl border shadow-md">

      {/* Trash Icon and Edit Icon Buttons (Top-right) */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={handleDeleteClick}
          className="text-md p-2 rounded-full bg-gray-800 text-white hover:bg-gray-900"
        >
          <AiOutlineDelete />
        </button>
        <button
          onClick={handleEditClick}
          className="text-md p-2 rounded-full bg-gray-800 text-white hover:bg-gray-900"
        >
          <MdOutlineModeEdit  />
        </button>
      </div>

      {/* Service Details */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-left">Service Details</h1>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{service.description}</p>
      <div className="mt-4 mb-6">
        <p className="text-lg font-bold text-gray-900">${service.price}</p>
        <p className="text-xs text-gray-500">
          For {service.duration} {service.durationMetric} session
        </p>
      </div>

      {/* Available Slots */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Available Slots</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {service.slots.map((slot, index) => (
            <div
              key={index}
              className="relative p-4 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-300 cursor-pointer group"
            >
              <span className="text-sm text-gray-700 group-hover:text-black">{slot}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-4">Reviews</h3>
        {reviewsLoading && <SkeletonLoader />}
        {reviewsError && <p className="text-red-500 text-sm">{reviewsError}</p>}

        {reviews?.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="mb-6 border-b pb-6">
              <div className="flex items-center gap-3">
                <img
                  src={review?.userRecord?.profilePicture}
                  alt="Reviewer"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">{review?.userRecord?.name}</p>
                  <p className="text-xs text-gray-500">{new Date(review?.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600 mb-3">{review?.comments}</p>
                  <div className="flex items-center text-yellow-500 mb-1">
                    {[...Array(Math.floor(review?.rating))]?.map((_, i) => (
                      <FaStar key={i} size={14} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          !reviewsLoading && <p>No reviews available yet.</p>
        )}
      </div>

      {/* Modals */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleModalClose}
        onConfirm={handleDeleteConfirm}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={handleModalClose}
        onSubmit={handleEditSubmit}
        service={service}
      />
    </div>
  );
};

export default ServiceDetails;
