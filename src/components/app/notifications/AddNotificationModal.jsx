import React, { useState } from "react";
import { ErrorToast, SuccessToast } from "../../global/Toaster";
import { FaTimes } from "react-icons/fa";
import axios from "../../../axios";

const AddNotificationModal = ({ showModal, setShowModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title || !description) {
    ErrorToast("Both title and description are required.");
    return;
  }

  setIsLoading(true);

  try {
    const response = await axios.post("/notifications", { title, description });

    if (response.status === 201 || response.status === 200) {
      SuccessToast("Notification added successfully!");
      setShowModal(false); // Close the modal after success
      setTimeout(() => {
        // Trigger the page reload by calling a parent function to refresh notifications
        window.location.reload(); // Reload the page to get the latest notifications
      }, 1500);
    }
  } catch (error) {
    console.error(error);

    ErrorToast(error?.response?.data?.message || "Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    showModal && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
          {/* <button
            onClick={closeModal}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={18} />
          </button> */}

          <h3 className="text-lg font-semibold mb-4 text-left">
            Add New Notification
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
                placeholder="Enter title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
                placeholder="Enter description"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 bg-[#074F57] text-white rounded-md ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Adding..." : "Add Notification"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddNotificationModal;
