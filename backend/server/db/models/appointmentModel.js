import mongoose from "mongoose";
import { number } from "yup";

const appointmentSchema = new mongoose.Schema(
	{
		patientId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User", // Reference to User with role "Patient"
			required: true,
		},
		doctorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User", // Reference to Doctor
			required: true,
		},
		appointmentDate: {
			type: Date,
			required: true,
			validate: {
				validator: function (v) {
					return v >= new Date();
				},
				message: "Appointment date must be in the future",
			},
		patientAge:{
			type: number,
			required:true,
		}
		},
		timeSlot: {
			type: String,
			required: true,
			enum: [
				"09:00 - 10:00 AM",
				"10:00 - 11:00 AM",
				"11:00 - 12:00 PM",
				"01:00 - 02:00 PM",
				"02:00 - 03:00 PM",
				"03:00 - 04:00 PM",
				"04:00 - 05:00 PM",
			],
		},
		reason: {
			type: String,
			trim: true,
			maxlength: 500,
		},
		status: {
			type: String,
			enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
			default: "Pending",
		},
	},
	{
		timestamps: true, // adds createdAt and updatedAt automatically
	}
);
appointmentSchema.index(
	{ patientId: 1, doctorId: 1, appointmentDate: 1, timeSlot: 1 },
	{ unique: true }
);

const AppointmentTable = mongoose.model("Appointment", appointmentSchema);

export default AppointmentTable;
