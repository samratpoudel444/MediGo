import yup from "yup";

export const appointmentSchema = yup.object({
  patientId: yup
    .string()
    .required("Doctor ID is required.")
    .matches(/^[0-9a-fA-F]{24}$/, "Invalid Doctor ID format."),

  doctorId: yup
    .string()
    .required("Doctor ID is required.")
    .matches(/^[0-9a-fA-F]{24}$/, "Invalid Doctor ID format."),

  appointmentDate: yup
    .date()
    .required("Appointment date is required.")
    .min(new Date(), "Appointment date must be today or in the future."),

  Age: yup.number().required("Patient age is required"),

  reason: yup
    .string()
    .notRequired()
    .trim()
    .max(500, "Reason must be at most 500 characters."),

    appointmentType: yup
    .number()
    .required()
    .oneOf([1,2,3])

});