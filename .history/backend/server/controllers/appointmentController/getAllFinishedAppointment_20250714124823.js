import AppointmentTable from "../../db/models/appointmentModel";


const getAllFinishedAppointment= async(req, res, next)=>
{
    try{    
        const userId= req.user.id;
        
    }   
    catch(err)
    {
        console.log(err);
        return next({code:err.code || 500, message:err.message || "Internal Server Error"});
    }
}