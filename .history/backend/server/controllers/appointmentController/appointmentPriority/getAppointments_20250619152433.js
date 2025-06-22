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
    const data= await getDoctors(); //1

    data.forEach(async (doctor, index)=>
    {
        const Appointment= await getAppointmentAsPerDoctor(doctor); //2
        const data=  await priorityQueueAlgo(Appointment);
          console.log("the",data);
        data.forEach(async(queue, index)=>
        {
            if(queue)
            {
                await AppointmentTable.findOneAndUpdate(queue.patientId, queue.DoctorId, queue.appointmentDate, queue.age,queue.reason{
                  timeSlot: queue.arrivalTime,
                  appointmentType: queue.appointmentType,
                });
                console.log("data Inserted");
            }
            if(!queue) return
        })
    })
}


