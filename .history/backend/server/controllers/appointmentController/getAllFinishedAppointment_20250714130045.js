import AppointmentTable from "../../db/models/appointmentModel.js";


export  const getAllFinishedAppointment= async(req, res, next)=>
{
    try{    
        const userId= req.user.id;
        const date= new Date()
        const today = new Date().toISOString().split("T")[0];
        const data= await AppointmentTable.find({userdate:{$lt: today}})
        if(!data)
        {
            return next({code:err.code || 500, message:err.message || "Internal Server Error"});
        }
        return res.status(200).json({message:data})
    }   
    catch(err)
    {
        console.log(err);
        return next({code:err.code || 500, message:err.message || "Internal Server Error"});
    }
}