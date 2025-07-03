import { off } from "process";
import DoctorTable from "../../db/models/doctorModel.js";

export const getDetails = async (req, res, next) => {
  try {
    const doctorId = req.user.id;
    const data = await DoctorTable.findById({
      _id: doctorId,
    }).populate("userId");
   if(!data)
   {
    return next({code:401 , mesasge:"User Not DFound"})
   }
  } catch (err) {
    console.log(err);
    return next({ code: 500, message: "Internal Server Error" });
  }
};
