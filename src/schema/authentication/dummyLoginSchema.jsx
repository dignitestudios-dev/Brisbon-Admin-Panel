import * as Yup from "yup";

export const signInSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Please enter your email"),
  password: Yup.string()
    .matches(/^(?!\s)(?!.*\s$)/, "Password must not begin or end with spaces")
    .min(6, "Password must contain atleast 6 alphanumeric characters.")
    .required("Please enter your password"),
});


export const serviceSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters long.")
    .required("Service title is required."),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters long.")
    .required("Service description is required."),
  duration: Yup.number()
    .min(1, "Duration must be at least 1 hour.")
    .required("Service duration is required."),
  durationMetric: Yup.string()
    .oneOf(["hr", "min"], "Duration metric must be 'hr' or 'min'.")
    .required("Duration metric is required."),
  price: Yup.number()
    .min(1, "Price must be at least $1.")
    .required("Price is required."),
  startTime: Yup.string().required("Start time is required."),
  endTime: Yup.string().required("End time is required."),
});