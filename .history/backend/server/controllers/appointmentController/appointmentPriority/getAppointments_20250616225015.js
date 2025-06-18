import AppointmentTable from "../../../db/models/appointmentModel.js"

export const getAppointments = async()=>
{
    const data= await AppointmentTable.distinct("doctorId");
    return data;
}


export const FilterDoctors= async()=>
{
    const data= await getAppointments();
    foreach()
}