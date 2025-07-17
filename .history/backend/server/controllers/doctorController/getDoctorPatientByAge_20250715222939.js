import AppointmentTable from "../../db/models/appointmentModel.js";



export const getAllPatientByAge= async(req, res, next)=>
{
    try{
      const data = await AppointmentTable.aggregate([
        {
          $match: {
            Age: { $lt: 16 }, 
          },
        },
        {
          $group: {
            _id: null, 
            patientCount: { $sum: 1 },
          },
        },
      ]);
      const data = await AppointmentTable.aggregate([
        {
          $match: {
            Age: { $gte: 16, $lte: 70 },
          },
        },
        {
          $group: {
            _id: "$Age", 
            patientCount: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 }, // optional: sort by age ascending
        },
      ]);


        if (!data) {
             return next({
               code:  404,
               message:"Data not found",
             });
        }

            return res.status(200).json({message:data});  
    }
  
    
    catch(err)
    {
        console.log(err);
        return next({code:err.code|| 500, message:err.message||"Internal Server error" })
    }

}