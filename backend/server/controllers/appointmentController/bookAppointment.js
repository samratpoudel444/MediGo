import AppointmentTable from "../../db/models/appointmentModel";

export const bookAppointment = async (req, res) => {
	try {
		const newAppointment = req.body;
		newAppointment.patientId = req.user._id;
		const appointment = await AppointmentTable.findOne({
			patientId: req.body.patientId,
			doctorId: req.body.doctorId,
			appointmentDate: req.body.appointmentDate,
			timeSlot: req.body.timeSlot,
		});
		if (appointment) {
			return res
				.status(409)
				.send({ message: "Appointment already created by current user." });
		}
		await AppointmentTable.create(newAppointment);
		return res
			.status(201)
			.send({
				message: "Appointment created successfully",
				appointment: newAppointment,
			});
	} catch (error) {
		console.log("Error in creating an Appointment.");
		console.log(error.message);
	}
};
