
import DoctorTable from "../../db/models/doctorModel.js";

export const getDetails = async (req, res, next) => {
  try {
    const doctorId = req.user.id;
    const data = await DoctorTable.findById({
      _id: doctorId,
    }).populate("userId");
   if(!data)
   {
    return next({code:401 , mesasge:"User Not Found"})
   }
   return response.status(201).json()
  } catch (err) {
    console.log(err);
    return next({ code:err.code || 500, message:err.message ||  "Internal Server Error" });
  }
};
