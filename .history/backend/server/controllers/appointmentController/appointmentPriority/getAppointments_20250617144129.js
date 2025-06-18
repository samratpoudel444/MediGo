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
          console.log("the",data);
        data.forEach(async(queue, index)=>
        {
            if(queue)
            {
                await AppointmentTable.insertOne({patientId:queue.patientId,
                doctorId: queue.doctorId,
                appointmentDate: queue.appointmentDate,
                patientAge:queue.patientAge,
                timeSlot:queue.arrivalTom,
                reason: queue.reason,
                appointmentType:queue.appointmentType 

                })
            }
            if(!queue) return
        })
    })
}


