import AppointmentTable from "../../../db/models/appointmentModel.js"

export const getDoctors = async()=>
{
    const data= await AppointmentTable.distinct("doctorId");
    return data;
}


export const FilterDoctors= async()=>
{
    const data= await getDoctors();

    data.foreach(async (doctor, index)=>
    {
        const Appointment= getAppointmentAsPerDoctor;
        console.log("data")
    })
}

export const getAppointmentAsPerDoctor= async()=>
{
    awa
}