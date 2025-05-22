import DoctorTable from "../../db/models/doctorModel.js";

export const getDoctorById = async (req, res, next) => {
  try {

    const Id= req.query;
    const doctor = await DoctorTable.findById({
      _id: id,
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
