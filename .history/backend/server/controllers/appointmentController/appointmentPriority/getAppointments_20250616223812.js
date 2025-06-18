import AppointmentTable from "../../../db/models/appointmentModel.js"



export default appointmentRoute.route("/getAppointmment").get(getAppointments);
 = async(req, res)=>
{
    const data= await AppointmentTable.find({});
    console.log(data);
}