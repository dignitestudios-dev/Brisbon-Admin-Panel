import { useNavigate } from "react-router";
import { ErrorToast, SuccessToast } from "../components/global/Toaster";

export const processSignup = (data, navigate) => {
  if (data?.success) {
    navigate("/app/dashboard");
    return;
  }
};

export const processLogin = (data, navigate, loginAuth) => {
  if (data?.success) {
    loginAuth(data?.data);
    navigate("/app/dashboard");
    return;
  }
};

export const processAddService = (data, setShowModal,setUpdate) => {
  if (data?.success) {
    SuccessToast(data?.message);
    setShowModal(false)
    setUpdate((prev) => !prev);
    return;
  }
};

export const processError = (error) => {
  if (error?.response?.data?.message) {
    ErrorToast(error?.response?.data?.message);
    return;
  } else {
    ErrorToast("Something went wrong");
  }
};


// helpers/processForgotPassword.js
export const processForgotPassword = (data, navigate, email) => {
  if (data?.success) {
    navigate("/auth/verify-otp", {
      state: { email },
    });
  }
};



// src/utils/utils.js

export const processVerifyOtp = (data, navigate, email) => {
  if (data?.success) {
    SuccessToast("OTP verified successfully");
    navigate("/auth/reset-password", {
      state: { email },
    });
  } else {
    console.log("OTP verification failed");
  }
};

export const processResetPassword = (data, navigate) => {
  if (data?.success) {
    // navigate("/auth/login");
    SuccessToast("password reset successfully");

  } else {
    console.log("Reset password failed:", data?.message);
  }
};
