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
        const appointmentData= await AppointmentTable.find(doctor);
        console.log(appointmentData);
    })
}

export const getAppointmentAsPerDoctor= async()=>
{
    
}