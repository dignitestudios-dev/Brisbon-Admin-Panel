import { useContext, useState } from "react";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { processError } from "../../lib/utils";
import { useNavigate } from "react-router";
import axios from "../../axios"; 
import { AppContext } from "../../context/AppContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {loginAuth} = useContext(AppContext)

  const postData = async (
    url,
    isFormData = false,
    formdata = null,
    data = null,
    callback
  ) => {
    try {
      console.log(data,"Submitting data to URL:"); // Debugging lineq
      setLoading(true);
      const response = await axios.post(url, isFormData ? formdata : data);
      if (typeof callback === "function") {
        callback(response?.data, navigate,loginAuth);
      }
      return response?.data;
    } catch (error) {
      console.log(error,"errro")
      const msg = error?.response?.data?.message || "Something went wrong";
      ErrorToast(msg);
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, postData };
};



export { useLogin };

const useCreateService = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createService = async (data, callback) => {
    try {
      setLoading(true);
      const response = await axios.post('/service', data); // Your API endpoint for creating services
      if (response?.data?.success) {
        // Call callback to handle the response, maybe navigate or show success toast
        callback(response?.data);
      }
    } catch (error) {
      console.error(error);
      alert('Error creating service');
    } finally {
      setLoading(false);
    }
  };

  return { createService, loading };
};

export {useCreateService};

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const requestReset = async (email, role = "user", callback) => {
    setLoading(true);
    try {
      const response = await axios.post("/auth/forgot", { email, role });

      if (response?.data?.success) {
        SuccessToast("Reset link sent to your email");
        if (typeof callback === "function") callback(response?.data);
      } else {
        ErrorToast("Failed to send reset email");
      }
    } catch (error) {
      console.log(error, "error in forgot password")
      const msg = error?.response?.data?.message || "Something went wrong";
      ErrorToast(msg);
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  return { requestReset, loading };
};




export {useForgotPassword};





const useVerifyOtp = () => {
  const [loading, setLoading] = useState(false);

  const verifyOtp = async (email, otp, role, callback) => {
    setLoading(true);
    try {
      const response = await axios.post("/auth/verifyForgotOTP", {
        email,
        otp,
        role
      });

      if (response?.data?.success) {
        SuccessToast("OTP Verified");
        if (typeof callback === "function") callback(response.data);
      } else {
        ErrorToast("Invalid OTP");
      }
    } catch (error) {
      console.log(error, "error in verify OTP");
      const msg = error?.response?.data?.message || "Something went wrong";
      ErrorToast(msg);
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  return { verifyOtp, loading };
};

export { useVerifyOtp };






const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resetPassword = async (data, callback) => {
    try {
      setLoading(true);
      const response = await axios.post("/auth/resetPassword", data);
      if (typeof callback === "function") {
        callback(response?.data, navigate);
      }
      return response?.data;
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong";
      ErrorToast(msg);
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, resetPassword };
};

export { useResetPassword };

