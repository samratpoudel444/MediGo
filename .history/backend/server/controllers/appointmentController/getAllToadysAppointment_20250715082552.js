import AppointmentTable from "../../db/models/appointmentModel.js";

export const getAllTodaysAppointmentForDoctor = async (req, res, next) => {
  try {
    const doctorId = req.user.id;
    const today = new Date().toISOString().split("T")[0];
    const data = await AppointmentTable.find({
      doctorId: doctorId,
      appointmentDate:  today ,
    }).populate("userId");
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
