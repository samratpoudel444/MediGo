import AppointmentTable from "../../db/models/appointmentModel.js";

export const bookAppointment = async (req, res, next) => {
  try {
    console.log(req.body);
    const newAppointment = req.body;
    req.body.patientId = req.user.id;

    newAppointment.patientId = req.user.id;
    const appointment = await AppointmentTable.findOne({
      patientId: req.body.patientId,
      doctorId: req.body.doctorId,
      appointmentDate: req.body.appointmentDate.toString(),
    });
    if (appointment) {
      return next({
        code: 409,
        message: "Appointment already created by current user.",
      });
    }
    await AppointmentTable.create(newAppointment);
    return res.status(201).json({
      message: "Appointment created successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.log("Error in creating an Appointment.");
    console.log(error.message);
  }
};
