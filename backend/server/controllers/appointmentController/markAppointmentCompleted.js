import AppointmentTable from "../../db/models/appointmentModel.js";





export const markAppointmentCompleted = async (req, res, next) => {
  try {
    const appointment = await AppointmentTable.findByIdAndUpdate(
      req.params.id,
      { appointmentCompleted: true },
      { new: true }
    );

    if (!appointment) {
        console.log("daa")
      return next ({
        code: 404,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      data: appointment,
      message: "Appointment marked as completed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
