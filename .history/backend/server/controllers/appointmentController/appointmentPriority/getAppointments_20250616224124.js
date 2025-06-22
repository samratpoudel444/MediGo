import AppointmentTable from "../../../db/models/appointmentModel.js"



export co getAppointments = async(req, res)=>
{
    const data= await AppointmentTable.find({});
    console.log(data);
}