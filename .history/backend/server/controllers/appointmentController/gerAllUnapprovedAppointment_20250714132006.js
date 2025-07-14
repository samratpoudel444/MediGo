import AppointmentTable from "../../db/models/appointmentModel.js";

export const getAllUnApprovedAppointment = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const today = new Date().toISOString().split("T")[0];
    today.setHours(0, 0, 0, 0);
    const data = await AppointmentTable.find({
      patientId: userId,
      date: { $gte: today },
    });
    console.log(data)
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
