import AppointmentTable from "../../../db/models/appointmentModel.js"



export const getAppointments = async(req, res)=>
{
    const data= await AppointmentTable.find({});
    return data
}