import AppointmentTable from "../../../db/models/appointmentModel.js"
import { priorityQueueAlgo } from "./priorityQueue.js";

export const getDoctors = async()=>
{
    const data= await AppointmentTable.distinct("doctorId");
    return data;
}

export const getAppointmentAsPerDoctor = async (doctor) => {
  const getAppointment = await AppointmentTable.find({ doctorId: doctor });
  return getAppointment;
};

export const FilterDoctors= async()=>
{
    const data= await getDoctors();

    data.forEach(async (doctor, index)=>
    {
        const Appointment= await getAppointmentAsPerDoctor(doctor);
        const data=  await priorityQueueAlgo(Appointment);
        data.forEach(async(queue, index)=>
        {
            if(queue)
            {
                await AppointmentTable.insertOne(qu)
            }
        })
    })
}


