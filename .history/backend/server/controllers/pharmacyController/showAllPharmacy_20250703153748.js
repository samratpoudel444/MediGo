import AppointmentTable from "../../db/models/appointmentModel"


export const showAllPharmacy= async(req,res,next)=>
{
    try{
        const data= await AppointmentTable.find();
        const values= {name, latitude, lognitude, ...data}

        console.log(values)
    }
    catch(err)
    {

    }
}