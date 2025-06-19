import UserTable from "../../db/models/userModels.js";

export const showAllDoctorByRoles= async(req, res, next)=>
{
    try {
        const { doctorType } = req.params;
        if(!doctorType)
        {
                return next({ code: 404, message: "Doctor Type not provided" });
        }
    const doctors = await UserTable.find({doctorType:doctorType}).populate("userId");
     console.log("hello",doctors);
    if (!doctors || doctors.length === 0) {
      return next({ code: 404, message: "No doctors found" });
    }

   
    return res.status(200).json({ doctors });
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal server error",
    });
  }
};

