import { off } from "process";
import DoctorTable from "../../db/models/doctorModel.js";

export const getDetails = async (req, res, next) => {
  try {
    const doctorId = req.user.id;
    const data = await DoctorTable.findById({
      _id: doctorId,
    }).populate("userId");
   off(!data)
  } catch (err) {
    console.log(err);
    return next({ code: 500, message: "Internal Server Error" });
  }
};
