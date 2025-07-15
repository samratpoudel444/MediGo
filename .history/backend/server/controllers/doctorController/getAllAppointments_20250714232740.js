import AppointmentTable from "../../db/models/appointmentModel.js";
import UserTable from "../../db/models/userModels.js";

export const getAllAppointments = async (req, res, next) => {
  try {
    const doctorId = req.user.id;

    const doctorExists = await UserTable.findById(doctorId);
    if (!doctorExists) {
      return next({ code: 400, message: "Doctor Not Found" });
    }

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const isoDate = todayDate.toISOString().split("T")[0];

    const getAppointments = await AppointmentTable.find({
      doctorId
      appointmentDate: { $gte: isoDate },
    }).populate("patientId");

    if (!getAppointments || getAppointments.length === 0) {
      return next({ code: 400, message: "Appointments Not found" });
    }

    return res.status(200).json({ message: getAppointments });
  } catch (err) {
    return next({
      code: err.code || 500,
      message: err.message || "Internal Server Error",
    });
  }
};
