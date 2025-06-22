import AppointmentTable from "../../../db/models/appointmentModel.js"
import bookAppointmentTable from "../../../db/models/bookedAppointment.js";
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
                await bookAppointmentTable.insertOne({patientId:queue.patientId,
                doctorId: queue.doctorId,
                appointmentDate: queue.appointmentDate,
                age:queue.patientAge,
                timeSlot:queue.arrivalTime,
                reason: queue.reason,
                appointmentType:queue.appointmentType 

                })
                console.log("data Inserted")
            }
            if(!queue) return
        })
    })
}


