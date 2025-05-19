import React, { useState } from 'react';
import { useParams } from 'react-router';
import { FaMapMarkerAlt, FaStar, FaChevronRight } from 'react-icons/fa';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineEye } from 'react-icons/ai';
import { useBookingDetails } from '../../../hooks/api/Get';
import { completeBookingStatus, updateBookingStatus } from '../../../hooks/api/Put';
import SkeletonLoader from '../../../components/global/SkeletonLoader';
import { ErrorToast } from '../../../components/global/Toaster';

// Modal Component
const Modal = ({ isOpen, onClose, onConfirm, message, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <p className="text-lg text-center">{message}</p>
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 text-black border rounded-md mr-4"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded-md"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

const BookingDetails = () => {
  const { id } = useParams();
  const { booking, loading, error } = useBookingDetails(id);
  const [isAcceptModalOpen, setAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setRejectModalOpen] = useState(false);
  const [isCompleteModalOpen, setCompleteModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [apiError, setApiError] = useState(null);


  

  if (loading) return <div><SkeletonLoader /></div>;
  if (error) return <div>{error}</div>;
  if (!booking) return <div>No booking found</div>;

  const user = {
    name: booking.userRecord?.name || 'Unknown User',
    email: booking.userRecord?.email || 'No email provided',
    profileImage: booking.userRecord?.profilePicture || 'https://ui-avatars.com/api/?name=Unknown+User',
    uid: booking.userRecord?.uid || '',
  };
  

  console.log(booking?.review?.userRecord?.uid, 'user id');
  

  const service = {
    title: booking.serviceRecord?.title || 'No service title',
    description: booking.serviceRecord?.description || 'No service description',
    price: `$${booking.serviceRecord?.price || 0}`,
    duration: `${booking.serviceRecord?.duration || 0} hr`,
    rating: booking.serviceRecord?.rating || 0,
    id:  booking.serviceRecord?._id
  };


const handleStatusChange = async (newStatus, closeModal) => {
  setActionLoading(true);
  try {
    await updateBookingStatus(id, newStatus);
    closeModal(false);
    window.location.reload(); // Optional: Replace with refetch logic for better UX
  } catch (err) {
    // Check if the error has a specific message about status change
    const errorMessage = err?.response?.data?.message || 'Failed to update booking status';
    setApiError(errorMessage); // Store the error message in the state
    ErrorToast( errorMessage);
  } finally {
    setActionLoading(false);
  }
};

const handleCompleteBooking = async (closeModal) => {
  setActionLoading(true);
  try {
    await completeBookingStatus(id);
    closeModal(false);
    window.location.reload();
  } catch (err) {
    const errorMessage = err?.response?.data?.message || 'Failed to update booking status to completed';
    console.log('Error Message:', errorMessage); 
    setApiError(errorMessage); 
    ErrorToast( errorMessage); 
  } finally {
    setActionLoading(false);
  }
};



// Render Payment Status
  const paymentStatus = booking.isPaid ? (
    <div className="flex items-center text-green-600">
      <AiOutlineCheckCircle className="mr-2 text-xl" />
      <span className="text-sm">Payment Completed</span>
    </div>
  ) : (
    <div className="flex items-center text-red-600">
      <AiOutlineCloseCircle className="mr-2 text-xl" />
      <span className="text-sm">Payment Pending</span>
    </div>
  );

  return (
    <div className="mx-auto p-4">
      {/* Booking Info */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-3 border relative">
        <div
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
            booking.status === 'approved'
              ? 'bg-green-100 text-green-600'
              : booking.status === 'rejected'
              ? 'bg-red-100 text-red-600'
              : booking.status === 'completed'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-yellow-100 text-yellow-600'
          }`}
        >
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">Booking Details</h1>
        {[
          ['Booking ID', booking.bookingId],
          ['Session Type', booking.session],
          ['Date', booking.date],
          ['Time', booking.time || 'N/A'],
          ['Duration', `${booking.duration} hr`],
          ['Price', booking.price || 'Free'],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between text-sm text-gray-600 border-b py-2">
            <span>{label}</span>
            <span className="font-medium text-black">{value}</span>
          </div>
        ))}

        {/* Location */}
        <div className="bg-white rounded-xl shadow-sm flex items-center gap-3 p-3 mb-3 text-sm text-gray-700 border mt-4">
          <FaMapMarkerAlt className="text-xl text-[#46656E]" />
          <span>{booking.spotSuggestion}</span>
        </div>

        {/* Payment Status */}
        <div className="mt-4">
          <h4 className="font-semibold text-gray-800 text-sm mb-2">Payment Status</h4>
          {paymentStatus}
        </div>

{apiError && (
  <div className="bg-red-100 text-red-600 text-sm p-2 rounded-lg mb-4 mt-2">
    <strong>Error: </strong>{apiError}
  </div>
)}
        {/* Action Buttons */}
        <div className="flex gap-4 mt-4 justify-end items-end">
          {booking.status === 'pending' && (
            <>
              <button
                onClick={() => setAcceptModalOpen(true)}
                className="flex bg-gray-700 text-white text-sm font-semibold py-2 px-4 rounded-lg"
              >
                <AiOutlineCheckCircle className="mr-1 text-lg" /> Accept
              </button>
              <button
                onClick={() => setRejectModalOpen(true)}
                className="flex bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded-lg"
              >
                <AiOutlineCloseCircle className="mr-1 text-lg" /> Reject
              </button>
            </>
          )}

          {booking.status === 'approved' && (
            <button
              onClick={() => setCompleteModalOpen(true)}
              className="flex bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-lg"
            >
              <AiOutlineCheckCircle className="mr-1 text-lg pt-1" /> Mark as Complete
            </button>
          )}
        </div>
      </div>

      {/* User Profile */}
      <div className="relative rounded-xl text-black p-4 mb-6 border">
        <h1 className="text-2xl font-bold text-black mb-6">User Details</h1>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <img
              src={user.profileImage}
              className="w-16 h-16 rounded-full object-cover border-2 border-white"
              alt="User"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-black font-semibold text-lg">{user.name}</h3>
            <p className="text-sm text-gray-800">{user.email}</p>
          </div>
          <a
  href={`/app/user-profile/${booking.userRecord._id}`}  // Include /app/ explicitly
  className="flex bg-gray-700 items-center border p-2 rounded-lg text-white text-sm cursor-pointer"
>
  <AiOutlineEye className="mr-1 text-xl" />
  View Profile
</a>





        </div>
      </div>

      {/* Service Details */}
     {/* Service Details */}
{service?.price === '$0' ? (
  // If price is 0, show the "Free Consultation" message
  <div className="bg-white rounded-xl p-4 shadow-sm border">
    <h3 className="text-base font-semibold text-gray-800 mb-2">Service Details</h3>
    <p className="text-sm text-gray-500 mt-1">This service is a free consultation.</p>
    <p className="text-sm font-semibold text-gray-900">Free</p>
  </div>
) : (
  // Otherwise, show the normal service details
  <div className="bg-white rounded-xl p-4 shadow-sm border">
    <h3 className="text-base font-semibold text-gray-800 mb-2">Service Details</h3>
    <div className="flex justify-between items-center">
      <h4 className="font-semibold text-gray-800 text-sm">{service?.title}</h4>
      <div className="flex items-center text-sm text-gray-700 gap-1">
        <FaStar className="text-yellow-500" />
        <span className="text-xs font-semibold">{service?.rating?.toFixed(1)}</span>
      </div>
    </div>
    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{service?.description}</p>
    <div className="flex items-center justify-between mt-4">
      <p className="text-sm font-semibold text-gray-900">
        {service?.price}{' '}
        <span className="text-xs font-normal text-gray-500 ml-1">{service?.duration}</span>
      </p>
      <a
        href={`/app/service-details/${service.id}`}
        className="flex bg-gray-700 items-center border p-2 rounded-lg text-white text-sm cursor-pointer"
      >
        <AiOutlineEye className="mr-1 text-xl" />
        View Service
      </a>
    </div>
  </div>
)}





      {/* Modals */}
      <Modal
        isOpen={isAcceptModalOpen}
        onClose={() => setAcceptModalOpen(false)}
        onConfirm={() => handleStatusChange('approved', setAcceptModalOpen)}
        message="Are you sure you want to accept this booking?"
        loading={actionLoading}
      />
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        onConfirm={() => handleStatusChange('rejected', setRejectModalOpen)}
        message="Are you sure you want to reject this booking?"
        loading={actionLoading}
      />
      <Modal
        isOpen={isCompleteModalOpen}
        onClose={() => setCompleteModalOpen(false)}
        onConfirm={() => handleCompleteBooking( setCompleteModalOpen)}
        message="Are you sure you want to mark this booking as completed?"
        loading={actionLoading}
      />
    </div>
  );
};

export default BookingDetails;
