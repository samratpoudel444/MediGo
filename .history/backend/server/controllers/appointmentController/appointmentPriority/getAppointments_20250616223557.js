import AppointmentTable from "../../../db/models/appointmentModel"



export default getApointment= async()=>
{
    const data= await AppointmentTable.find({});
    console.log(data)
}