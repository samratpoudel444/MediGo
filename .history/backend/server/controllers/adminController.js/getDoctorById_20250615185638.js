import DoctorTable from "../../db/models/doctorModel.js";
import UserTable from "../../db/models/userModels.js";

export const getDoctorById = async (req, res, next) => {
  try {

    const id= req.params.id;
  const doctor = await UserTable.findOne({
    userId: id,
  }).populate("userId");

    return res.status(200).json({ message: doctor });
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal server error",
    });
  }
};
