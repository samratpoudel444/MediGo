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
            
        }
    }
    
    catch(err)
    {
        console.log(err);
        return next({code:err.code|| 500, message:err.message||"Internal Server error" })
    }

}