import AppointmentTable from "../../../db/models/appointmentModel.js"



export default getAppointment = async(req, res)=>
{
    const data= await AppointmentTable.find({});
    console.log(data);
}