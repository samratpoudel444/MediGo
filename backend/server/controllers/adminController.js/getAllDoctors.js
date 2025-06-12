import DoctorTable from "../../db/models/doctorModel.js";
import UserTable from "../../db/models/userModels.js";

export const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await DoctorTable.find().populate("userId");
    if (!doctors) {
      return next({ code: 404, message: "doctors not found" });
    }

    console.log(doctors);
    return res.status(200).json({ message: doctors });
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal server error",
    });
  }
};
