import React, { useState } from "react";
import { useNavigate } from "react-router";
import { brisbanelogo } from "../../assets/export";
import { useForgotPassword } from "../../hooks/api/Post";
import { initialForgotPasswordValues } from "../../init/authentication/dummyLoginValues";
import { processForgotPassword } from "../../lib/utils";

const ForgotPassword = () => {
  const [formValues, setFormValues] = useState(initialForgotPasswordValues);
  const { requestReset, loading } = useForgotPassword();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValues.email) return;

    requestReset(formValues.email, formValues.role, (res) => {
      console.log("Password reset email sent:", res);
      processForgotPassword(res, navigate, formValues.email); 
    });
  };

  return (
    <div className="w-full h-auto flex flex-col items-center p-6 justify-center md:w-[499px] md:h-[440px] rounded-[19px] bg-white">
      <img src={brisbanelogo} alt="brisbane_logo" className="w-[200px]" />
      <div className="w-auto flex flex-col mt-4 justify-center items-center">
        <h2 className="text-[32px] font-bold leading-[48px]">Forgot Password</h2>
        <p className="text-[18px] font-normal text-center leading-[27px] text-[#3C3C43D9]">
          Enter your email to reset password
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[393px] mt-5 flex flex-col justify-start items-start gap-4"
      >
        <div className="w-full flex flex-col gap-1">
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className="w-full h-[49px] border-[0.8px] bg-[#F8F8F899] outline-none rounded-[8px] placeholder:text-[#959393] text-[#262626] px-3 text-[16px] font-normal leading-[20.4px] border-[#D9D9D9]"
            placeholder="Email Address"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-[49px] rounded-[8px] bg-[#46656E] text-white flex gap-2 items-center justify-center text-md font-medium"
        >
          <span>Submit</span>
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

export default ForgotPassword;
