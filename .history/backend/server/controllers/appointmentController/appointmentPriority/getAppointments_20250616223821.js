import AppointmentTable from "../../../db/models/appointmentModel.js"



export default getApp = async(req, res)=>
{
    const data= await AppointmentTable.find({});
    console.log(data);
}