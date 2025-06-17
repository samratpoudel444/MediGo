import AppointmentTable from "../../../db/models/appointmentModel"



export default getApointment= async(req, res)=>
{
    const data= await AppointmentTable.find({});
    console.log(data);
}