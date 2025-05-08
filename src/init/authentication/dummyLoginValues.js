export const loginValues = {
  email: "",
  password: "",
  role: "",
};



  // Initial values for the form
  export const initialServiceValues = {
    title: "",
    description: "",
    duration: 1,
    durationMetric: "hr",
    price: 25,
    startTime: "09:00",
    endTime: "17:30",
  };
  


  export  const initialForgotPasswordValues = {
    email: '',
    role: 'admin',
  };
  
  // src/init/authentication/dummyLoginValues.js
export const initialVerifyOtpValues = {
  email: '',
  role: 'admin',
  otp: '', // start with empty string
};



export const initialResetPasswordValues = {
  password: '',
  confirmPassword: '',
};
