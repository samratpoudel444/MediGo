import DoctorTable from "../../db/models/doctorModel.js";

export const approveDoctor = async (req, res, next) => {
  try {
    const id= req.params.id
    const doctors = await DoctorTable.findOne({_id:id, isApproved: false }).populate(
      "userId"
    );
    if (!doctors || doctors.length === 0) {
      return next({ code: 404, message: "No doctors found" });
    }

    await DoctorTable.updateOne

    return res.status(200).json({ doctors });
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal server error",
    });
  }
};
