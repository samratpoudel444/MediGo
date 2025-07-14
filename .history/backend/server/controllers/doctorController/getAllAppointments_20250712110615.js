import AppointmentTable from "../../db/models/appointmentModel";
import UserTable from "../../db/models/userModels";


const getAllAppointments= async(req, res ,next)=>
{
    try{
        const doctorId= req.user.id;

        const doctorExists= await UserTable.findById(doctorId);
        if(!doctorExists)
        {
            return next({code:400, message:"Doctor Not Found"});
        }

        const getAppointments= await AppointmentTable.find.populate()
    }
    catch(err)
    {
        
    }
}