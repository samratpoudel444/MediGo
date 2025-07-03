import AppointmentTable from "../../db/models/appointmentModel"


export const showAllPharmacy= async(req,res,next)=>
{
    try{
        const data= await AppointmentTable.find();
        const{}
    }
    catch(err)
    {

    }
}