import AppointmentTable from "../../../db/models/appointmentModel.js"

export const getAppointments = async()=>
{
    const data= await AppointmentTable.find({});
    return data;
}


export const FilterDoctors= async()=>
{
    const data= getAppointments();
    for
}