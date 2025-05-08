import React from "react";

const ReportsModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-auto p-6 border">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Confirm Resolution</h2>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Are you sure you want to mark this report as resolved? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-[#074F57] hover:bg-[#066058] rounded-lg transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsModal;
