import AppointmentTable from "../../db/models/appointmentModel";



export const getDoctorPatientByAge= async(req, res, next)=>
{
    try{
        const data= await Db.AppointmentTable.aggregate([
            {
                 $group: {
            _id: "$Age",        
      patientCount: { $sum: 1 }
                 }
            },
        ])

        if (!data) {
             return next({
               code:  404,
               message:"Data not found",
             });
        }

            return res.status(200).json({message:});  
    }
  
    
    catch(err)
    {
        console.log(err);
        return next({code:err.code|| 500, message:err.message||"Internal Server error" })
    }

}