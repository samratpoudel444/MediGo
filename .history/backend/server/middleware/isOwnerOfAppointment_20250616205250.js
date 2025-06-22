import AppointmentTable from "../db/models/appointmentModel.js";


export const isOwnerOfAppointment = async (req, res, next) => {
  const appointmentId = req.params.id;

  const appointment = await AppointmentTable.findOne({ _id: appointmentId });

  if (!appointment) {
    return res.status(400).send({ message: "appointment does not exists" });
  }
  const isOwnerOfProduct = appointment.userId.equals(req.loggedInId);
  //? alternative code
  //? const isOwnerOfProduct = product.sellerId.toString() === req.loggedInId.toString();

  if (!isOwnerOfAppointment) {
    return res
      .status(409)
      .send({ message: "You are not authorized to delete this appointment" });
  }
  next();
};