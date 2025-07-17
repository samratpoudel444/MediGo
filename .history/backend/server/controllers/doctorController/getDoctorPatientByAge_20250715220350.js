import AppointmentTable from "../../db/models/appointmentModel";

AppointmentTable

export const getDoctorPatientByAge= async()=>
{
    try{

    }
    catch(err)
    {
        console.log(err);
        return next({code:err.code|| 500, message:err.message||"Internal Server error" })
    }

}