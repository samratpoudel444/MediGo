import * as yup from "yup";
import dayjs from "dayjs";

export const verifyData = yup.object({
	firstName: yup.string().required("please provide first name").trim().max(100),
	lastName: yup.string().required("please provide last name").trim().max(100),
	email: yup.string().required("please provide email").email(),
	password: yup
		.string()
		.required("please provide the password")
		.min(8, "Password must be at least 8 characters")
		.matches(/[a-z]/, "Password must contain at least one lowercase letter")
		.matches(/[A-Z]/, "Password must contain at least one uppercase letter")
		.matches(/[0-9]/, "Password must contain at least one number")
		.matches(
			/[@$!%*?&]/,
			"Password must contain at least one special character"
		),
	dob: yup.date().max(dayjs(), "DOB cannot be a future date").notRequired(),
	gender: yup.string().required().trim().oneOf(["male", "female", "other"]),
	role: yup.string().required().trim().oneOf(["patient", "Doctor", "Admin"]),
	address: yup.string().required().trim().max(255),
	latitude: yup
		.number()
		.required("Latitude is required")
		.min(-90, "Latitude must be between -90 and 90")
		.max(90, "Latitude must be between -90 and 90"),
	lognitude: yup
		.number()
		.required("lognitude is required")
		.min(-180, "lognitude must be between -180 and 180")
		.max(180, "lognitude must be between -180 and 180"),
});
