



import { Route, Routes } from "react-router";
import ForgotPassword from "../pages/authentication/ForgotPassword";
import VerifyOtp from "../pages/authentication/VerifyOtp";
import ResetPassword from "../pages/authentication/ResetPassword";
import DummyLogin from "../pages/authentication/DummyLogin";


export const AuthenticationRoutes = [
  {
    title: "forgot-password",
    url: "forgot-password",
    page: <ForgotPassword />,
  },
  {
    title: "verify-otp",
    url: "verify-otp",
    page: <VerifyOtp />,
  },
  {
    title: "reset-password",
    url: "reset-password",
    page: <ResetPassword />,
  },
  {
    title: "Login",
    url: "login",
    page: <DummyLogin />,
  },
];