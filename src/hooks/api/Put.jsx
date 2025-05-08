// hooks/api/UpdateBookingStatus.js
import axios from "../../axios"; // ✅ Correct import based on your structure

export const updateBookingStatus = async (id, status) => {
  try {
    const response = await axios.put(`/booking/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
};

export const completeBookingStatus = async (id) => {
    try {
      const response = await axios.patch(`/booking/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  };

  

  export const updateReportStatus = async (reportId, status = "resolved") => {
    try {
      const response = await axios.put(`/booking/reports/${reportId}`, {
        status,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating report status:", error);
      throw error;
    }
  };