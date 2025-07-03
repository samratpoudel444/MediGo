import AppointmentTable from "../../db/models/appointmentModel"


export const showAllPharmacy= (req,res,next)=>
{
    try{
        const data= await AppointmentTable.();
    }
    catch(err)
    {

    }
}