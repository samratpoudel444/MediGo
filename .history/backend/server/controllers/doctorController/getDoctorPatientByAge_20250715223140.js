import AppointmentTable from "../../db/models/appointmentModel.js";

export const getAllPatientByAge = async (req, res, next) => {
  try {
    // Count patients with age less than 16
    const data1 = await AppointmentTable.aggregate([
      {
        $match: { Age: { $lt: 16 } },
      },
      {
        $group: {
          _id: null,
          patientCount: { $sum: 1 },
        },
      },
    ]);

    // Group patients between 16 and 70 by age
    const data2 = await AppointmentTable.aggregate([
      {
        $match: { Age: { $gte: 16, $lte: 70 } },
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

    // Group patients with age greater than 70 by age
    const data3 = await AppointmentTable.aggregate([
      {
        $match: { Age: { $gt: 70 } },
      },
      {
        $group: {
          _id: null,
          patientCount: { $sum: 1 },
        },
      },
    ]);

    // Prepare response object with clear keys
    const result = {
      under16: data1.length > 0 ? data1[0].patientCount : 0,
      between16And70: data2, 
      over70: data3.length > 0 ? data3[0].patientCount : 0,
    };

    return res.status(200).json({ message: result });
  } catch (err) {
    console.error(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal Server error",
    });
  }
};
