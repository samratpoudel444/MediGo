import AppointmentTable from "../../../db/models/appointmentModel.js"

export const getAppointments = async()=>
{
    const data= await AppointmentTable.distinct("doctorId");
    return data;
}


export const FilterDoctors= async()=>
{
    const data= await getAppointments();
    console.log("hell", datya)
    data.foreach(async (doctor, index)=>
    {
        const appointmentData= await AppointmentTable.find(doctor);
        console.log(appointmentData);
    })
}