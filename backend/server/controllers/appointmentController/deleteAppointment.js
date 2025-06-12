import AppointmentTable from "../../db/models/appointmentModel.js";

export const deleteAppointment = async (req, res) => {
    
	const appointmentId = req.params.id;

	const checkIfIdExists= await AppointmentTable.findOne({_id: appointmentId})

	if(!checkIfIdExists)
	{
		return next({code:404, message:"Provieded appointment doesnot exists"});
	}

	await AppointmentTable.deleteOne({ _id: appointmentId });

	return res.status(200).send({ message: "Appointment deleted Successfully" });
};
