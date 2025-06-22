import AppointmentTable from "../../../db/models/appointmentModel.js";
import { priorityQueueAlgo } from "./priorityQueue.js";

export const getDoctors = async () => {
const date = new Date();
date.setDate(date.getDate() + 1);
const tomorrow = date.toISOString().split("T")[0];
  const data = await AppointmentTable.distinct("doctorId", {
    appointmentDate: tomorrow,
  });

  return data;
};

export const getAppointmentAsPerDoctor = async (doctor) => {
  const getAppointment = await AppointmentTable.find({ doctorId: doctor });
  return getAppointment;
};

export const FilterDoctors = async () => {
  const data = await getDoctors(); //1

  data.forEach(async (doctor, index) => {
    const Appointment = await getAppointmentAsPerDoctor(doctor); //2
    const data = await priorityQueueAlgo(Appointment);
    data.forEach(async (queue, index) => {
      if (queue) {
       // console.log("the queue is", queue)
        await AppointmentTable.findOneAndUpdate(
          patientId: queue.patientId,
         DoctorId: queue.DoctorId,
          queue.appointmentDate,
          queue.Age,
          queue.reason,
          queue.appointmentType,
          {
            timeSlot: queue.arrivalTime,
            isApproved: true,
          }
        );
        await AppointmentTable.findOneAndUpdate(
  {
    patientId: queue.patientId,
    doctorId: queue.doctorId,
    appointmentDate: queue.appointmentDate,
     Age: queue.Age,
    reason: queue.reason,
    appointmentType: queue.appointmentType,
  },
  {
   
    timeSlot: queue.arrivalTime,
    isApproved: true,
  }, // update object
  { new: true } // options (optional, returns updated document)
);

        console.log("data Inserted");
      }
    });
  });
};
