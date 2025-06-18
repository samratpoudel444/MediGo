import * as yup from "yup";
import dayjs from "dayjs";

export const verifyData = yup.object({
  firstName: yup.string().required("Please provide first name").trim().max(100),
  lastName: yup.string().required("Please provide last name").trim().max(100),
  email: yup.string().required("Please provide email").email(),
  password: yup
    .string()
    .required("Please provide the password")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character",
    ),
  dob: yup.date().max(dayjs(), "DOB cannot be a future date").notRequired(),
  gender: yup
    .string()
    .required("Gender is required")
    .trim()
    .oneOf(["male", "female", "other"]),
  role: yup
    .string()
    .required("Role is required")
    .trim()
    .oneOf(["Patient", "Doctor", "Admin"]),
  address: yup.string().required("Address is required").trim().max(255),
  latitude: yup
    .number()
    .required("Latitude is required")
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  longitude: yup
    .number("please ")
    .required("Longitude is required")
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),

  licenseNo: yup.string().when("role", {
    is: "Doctor",
    then: (schema) =>
      schema
        .required("License No is required")
        .matches(/^\d{6,10}$/, "License No must be 6 to 10 digits"),
    otherwise: (schema) => schema.notRequired(),
  }),

  degreeType: yup.string().when("role", {
    is: "Doctor",
    then: (schema) =>
      schema
        .required("Degree Type is required")
        .oneOf(["MBBS", "MD", "DM", "Other"]),
    otherwise: (schema) => schema.notRequired(),
  }),

  specialistType: yup.string().when("role", {
    is: "Doctor",
    then: (schema) =>
      schema
        .required("Specialty is required")
        .oneOf([
          "General",
          "Surgery",
          "Internal Medicine",
          "Pediatrics",
          "Gynecology",
          "Orthopedics",
          "Neurology",
          "Oncology",
          "Others",
        ]),
    otherwise: (schema) => schema.notRequired(),
  }),
});
