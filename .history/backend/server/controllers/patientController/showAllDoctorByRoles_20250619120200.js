doc

export const showAllDoctorByRoles= async(req, res, next)=>
{
    try {
        const { doctorType } = req.params;
        console.log(doctorType);
        if(!doctorType)
        {
                return next({ code: 404, message: "Doctor Type not provided" });
        }
    const doctors = await UserTable.find({
      specialistType: doctorType,
    }).populate("userId");

    console.log(doctors)
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

