import AppointmentTable from "../../../db/models/appointmentModel.js";
import { priorityQueueAlgo } from "./priorityQueue.js";

export const getDoctors = async () => {
  const date = new Date();
  const tomorrow = new Date(date); 
  tomorrow.setDate(date.getDate() + 1);
  console.log(tomorrow); // Output: 2025-06-20T...

  const data = await AppointmentTable.distinct("doctorId");

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
    console.log("the", data);
    data.forEach(async (queue, index) => {
      if (queue) {
        await AppointmentTable.findOneAndUpdate(
          queue.patientId,
          queue.DoctorId,
          queue.appointmentDate,
          queue.Age,
          queue.reason,
          queue.appointmentType,
          {
            timeSlot: queue.arrivalTime,
            isApproved: true,
          }
        );
        console.log("data Inserted");
      }
    });
  });
};
