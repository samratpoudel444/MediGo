import DoctorTable from "../../db/models/doctorModel.js";

export const get = async (req, res, next) => {
  try {
    const doctorId = req.user.id;
    const data = await DoctorTable.findById({
      _id: doctorId,
    }).populate("userId");
    console.log(data);
  } catch (err) {
    console.log(err);
    return next({ code: 500, message: "Internal Server Error" });
  }
};
