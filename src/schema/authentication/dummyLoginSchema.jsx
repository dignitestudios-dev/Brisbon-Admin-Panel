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




const allowedTextRegex = /^[a-zA-Z0-9.,'’"!?()&\- ]+$/;

export const serviceSchema = Yup.object({
  title: Yup.string()
    .required("Service title is required.")
    .min(3, "Title must be at least 3 characters long.")
    .max(50, "Title must not exceed 50 characters.")
    .matches(allowedTextRegex, "Title contains invalid characters.")
    .test("not-blank", "Title cannot be only whitespace.", value => value && value.trim().length > 0),

  description: Yup.string()
    .required("Service description is required.")
    .min(10, "Description must be at least 10 characters long.")
    .max(200, "Description must not exceed 200 characters.")
    .matches(allowedTextRegex, "Description contains invalid characters.")
    .test("not-blank", "Description cannot be only whitespace.", value => value && value.trim().length > 0),

  duration: Yup.number()
    .min(1, "Duration must be at least 1 hour.")
    .required("Service duration is required."),

  // Force "hr"
  durationMetric: Yup.string()
    .oneOf(["hr"])
    .required(),

  price: Yup.number()
    .min(1, "Price must be at least $1.")
    .max(9999, "Price must not exceed $9999.")
    .required("Price is required."),

  startTime: Yup.string()
    .required("Start time is required."),

  endTime: Yup.string()
    .required("End time is required.")
    .test(
      "end-after-start",
      "End time must be at least 1 hour after start time.",
      function (endTime) {
        const { startTime } = this.parent;
        if (!startTime || !endTime) return true; // Yup will handle required checks

        const [startHour, startMin] = startTime.split(":").map(Number);
        const [endHour, endMin] = endTime.split(":").map(Number);

        const start = startHour * 60 + startMin;
        const end = endHour * 60 + endMin;

        return end - start >= 60;
      }
    ),
});

