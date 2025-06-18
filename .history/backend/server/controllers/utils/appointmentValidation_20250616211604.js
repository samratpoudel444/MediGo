import yup from "yup";

const validTimeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

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

  timeSlot: yup
    .string()
    .required("Time slot is required.")
    .oneOf(validTimeSlots, "Invalid time slot."),

  patientAge: yup.number().required("Patient age is required"),

  reason: yup
    .string()
    .notRequired()
    .trim()
    .max(500, "Reason must be at most 500 characters."),

    appointmentType: yup
    .Number()
    .required: true,
    
});