import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { brisbanelogo } from "../../assets/export";
import { useVerifyOtp } from "../../hooks/api/Post";
import { initialVerifyOtpValues } from "../../init/authentication/dummyLoginValues";
import { processVerifyOtp } from "../../lib/utils";

const VerifyOtp = () => {
  const [otpArray, setOtpArray] = useState(["", "", "", ""]);
  const [formValues, setFormValues] = useState(initialVerifyOtpValues);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { verifyOtp, loading } = useVerifyOtp();

  const email = state?.email || "";
  console.log(email,"0000 email") 

  // Sync email into formValues when component mounts or email changes
  React.useEffect(() => {
    if (email) {
      setFormValues((prev) => ({ ...prev, email }));
    }
  }, [email]);

  const handleChange = (value, index) => {
    if (value.length > 1 || isNaN(value)) return;
    const updatedOtp = [...otpArray];
    updatedOtp[index] = value;
    setOtpArray(updatedOtp);

    if (value !== "" && index < otpArray.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otpArray.join("");
    const otpInt = parseInt(enteredOtp, 10);
  
    if (!email || enteredOtp.length !== 4) return;
  
    // const updatedForm = { ...formValues, otp: enteredOtp };
    // setFormValues(updatedForm);
  
    verifyOtp(email, otpInt, "admin", (res) => {
      processVerifyOtp(res, navigate, email);
    });
  };
  

  return (
    <div className="w-full h-auto flex flex-col items-center p-6 justify-center md:w-[499px] md:h-[440px] rounded-[19px] bg-white">
      <img src={brisbanelogo} alt="brisbane_logo" className="w-[200px]" />

      <div className="w-auto flex flex-col mt-4 justify-center items-center">
        <h2 className="text-[32px] font-bold leading-[48px]">Enter OTP</h2>
        <p className="text-[16px] font-normal text-center text-[#3C3C43D9] mt-1">
          We've sent a 4-digit code to your email
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[393px] mt-6 flex flex-col justify-start items-center gap-6"
      >
        <div className="flex justify-center gap-6 w-full">
          {otpArray.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-[70px] h-[65px] rounded-[10px] border border-[#D1D5DB] bg-[#F9FAFB] text-center text-[22px] font-medium text-[#1F2937] focus:outline-[#46656E] transition-all duration-150 shadow-sm"
            />
          ))}
        </div>

        <button
  type="submit"
  disabled={loading}
  className="w-full h-[49px] rounded-[8px] bg-[#46656E] text-white flex gap-2 items-center justify-center text-md font-medium transition duration-200 hover:opacity-90"
>
  <span>Verify OTP</span>
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

export default VerifyOtp;
