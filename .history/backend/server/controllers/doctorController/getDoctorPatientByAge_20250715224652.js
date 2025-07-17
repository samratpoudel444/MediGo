import AppointmentTable from "../../db/models/appointmentModel.js";

export const getAllPatientByAge = async (req, res, next) => {
  try {
    const doctorId = req.user.id;

    // Age < 16
    const data1 = await AppointmentTable.aggregate([
      {
        $match: {
          Age: { $lt: 16 },
          doctorId: doctorId,
        },
      },
      {
        $group: {
          _id: null,
          patientCount: { $sum: 1 },
        },
      },
    ]);

    console.log(data1)

    // Age between 16 and 70
    const data2 = await AppointmentTable.aggregate([
      {
        $match: {
          Age: { $gte: 16, $lte: 70 },
          doctorId: doctorId,
        },
      },
      {
        $group: {
          _id: "$Age",
          patientCount: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Age > 70
    const data3 = await AppointmentTable.aggregate([
      {
        $match: {
          Age: { $gt: 70 },
          doctorId: doctorId,
        },
      },
      {
        $group: {
          _id: null,
          patientCount: { $sum: 1 },
        },
      },
    ]);

  

    const result = {
      under16: data1.length > 0 ? data1[0].patientCount : 0,
      between16And70: data2,
      over70: data3.length > 0 ? data3[0].patientCount : 0,
    };

    // Check if all are zero/empty
    if (
      result.under16 === 0 &&
      result.between16And70.length === 0 &&
      result.over70 === 0
    ) {
      return next({
        code: 404,
        message: "No patient data found for this doctor",
      });
    }

    return res.status(200).json({ message: result });
  } catch (err) {
    console.error(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal Server error",
    });
  }
};
