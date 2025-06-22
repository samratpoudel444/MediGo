import AppointmentTable from "../../../db/models/appointmentModel"



export default getApointment= async(req)=>
{
    const data= await AppointmentTable.find({});
    console.log(data);
}