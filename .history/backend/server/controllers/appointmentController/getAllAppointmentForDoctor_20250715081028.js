import AppointmentTable from "../../db/models/appointmentModel.js";

export const getAllFinishedAppointment = async (req, res, next) => {
  try {
    const doctorId = req.user.id;
    const data = await AppointmentTable.find({
      doctorId: doctorId,
      appointmentDate: { $lt: today },
    }).populate("doctorId");
    if (!data) {
      return next({
        code: err.code || 500,
        message: err.message || "Internal Server Error",
      });
    }
    return res.status(200).json({ message: data });
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal Server Error",
    });
  }
};
