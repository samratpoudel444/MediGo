import DoctorTable from "../../db/models/doctorModel.js";

export const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await DoctorTable.find().populate("userId");
    if (!doctors || doctors.length === 0) {
      return next({ code: 404, message: "No doctors found" });
    }

    console.log(do)
    return res.status(200).json({ doctors });
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal server error",
    });
  }
};
