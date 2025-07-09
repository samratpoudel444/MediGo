import DoctorTable from "../../db/models/doctorModel.js";

export const approveDoctor = async (req, res, next) => {
  try {
    const id = req.params.id;

    const doctor = await DoctorTable.findOne({
      _id: id,
      isApproved: false,
    }).populate("userId");

    if (!doctor) {
      return next({
        code: 404,
        message: "Doctor not found or already approved",
      });
    }

    doctor.isApproved = true;
    await doctor.save();

    return res
      .status(200)
      .json({ message: "Doctor approved successfully", doctor });
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal server error",
    });
  }
};
