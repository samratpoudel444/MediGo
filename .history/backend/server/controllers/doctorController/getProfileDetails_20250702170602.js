import DoctorTable from "../../db/models/doctorModel.js";

export const getDoctorProfile = async (req, res, next) => {
  try {
    const doctorId= req.body;
    const data = await DoctorTable.findById({
      _id:doctorId,
    }).populate("userId");
    console.log(data);
  } catch (err) {
    console.log(err);
    return next({ code: 500, message: "Internal Server Error" });
  }
};
