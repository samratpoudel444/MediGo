import AppointmentTable from "../../db/models/appointmentModel";

export const deleteAppointment = async (req, res) => {
    
	const appointmentId = req.params.id;
	await AppointmentTable.deleteOne({ _id: appointmentId });

	return res.status(200).send({ message: "Appointment deleted Successfully" });
};
