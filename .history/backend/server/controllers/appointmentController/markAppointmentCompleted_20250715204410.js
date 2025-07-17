const AppointmentTable= require("../../db/models/appointmentModel");



export const markAppointmentCompleted = async (req, res, next) => {
  try {
    const appointment = await AppointmentTable.findByIdAndUpdate(
      req.params.id,
      { appointmentCompleted: true },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
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
