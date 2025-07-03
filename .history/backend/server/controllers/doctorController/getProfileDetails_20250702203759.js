import DoctorTable from "../../db/models/doctorModel.js";

export const getDetails = async (req, res, next) => {
  try {
    const doctorId = req.user.id;

    const data = await DoctorTable.findOne({ userId: doctorId }).populate(
      "userId"
    );

    if (!data) {
      return next({ code: 404, message: "Doctor Profile Not Found" });
    }

    return res.status(200).json({ message: data });
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal Server Error",
    });
  }
};
