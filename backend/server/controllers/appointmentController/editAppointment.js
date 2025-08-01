import AppointmentTable from "../../db/models/appointmentModel.js";

export const editAppointment = async (req, res) => {
	const appointmentId = req.params.id;
	const appointment = await AppointmentTable.findOne({ _id: appointmentId });

	if (!appointment) {
		return ({code:404,  message: "Appointment not found" });
	}

	const newValues = req.body;

	await AppointmentTable.updateOne(
		{ _id: appointmentId },
		{
			$set: {
				...newValues,
			},
		}
	);

	return res
		.status(200)
		.send({ message: "Appointment is created Successfully" });
};
