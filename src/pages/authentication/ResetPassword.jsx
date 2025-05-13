import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { brisbanelogo } from "../../assets/export";
import { processResetPassword } from "../../lib/utils";
import { useResetPassword } from "../../hooks/api/Post";
import { initialResetPasswordValues } from "../../init/authentication/dummyLoginValues";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const [formValues, setFormValues] = useState(initialResetPasswordValues);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const { loading, resetPassword } = useResetPassword();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location?.state?.email;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formValues;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    resetPassword(formValues, processResetPassword);
  };

  return (
    <div className="w-full h-auto flex flex-col items-center p-6 justify-center md:w-[499px] md:h-[490px] rounded-[19px] bg-white">
      <img src={brisbanelogo} alt="brisbane_logo" className="w-[200px]" />
      <div className="w-auto flex flex-col mt-4 justify-center items-center">
        <h2 className="text-[32px] font-bold leading-[48px]">Reset Password</h2>
        <p className="text-[18px] font-normal text-center leading-[27px] text-[#3C3C43D9]">
          Enter a new password below
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[393px] mt-5 flex flex-col justify-start items-start gap-4"
      >
        {/* New Password */}
        <div className="w-full flex flex-col gap-1">
          <div className="w-full flex items-center border-[0.8px] bg-[#F8F8F899] outline-none rounded-[8px] placeholder:text-[#959393] text-[#262626] px-3 text-[16px] font-normal border-[#D9D9D9]">
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              value={formValues.password}
              onChange={handleChange}
              className="w-full h-[49px] bg-transparent outline-none text-[#262626] text-[16px] font-normal"
              placeholder="New Password"
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              className="p-2"
            >
              {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />  }
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="w-full flex flex-col gap-1">
          <div className="w-full flex items-center border-[0.8px] bg-[#F8F8F899] outline-none rounded-[8px] placeholder:text-[#959393] text-[#262626] px-3 text-[16px] font-normal border-[#D9D9D9]">
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleChange}
              className="w-full h-[49px] bg-transparent outline-none text-[#262626] text-[16px] font-normal"
              placeholder="Confirm Password"
            />
            <button
              type="button"
              onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
              className="p-2"
            >
              {isConfirmPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />  }
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-[49px] rounded-[8px] bg-[#46656E] text-white flex gap-2 items-center justify-center text-md font-medium"
        >
          <span>Reset Password</span>
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
