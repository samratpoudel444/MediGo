import AppointmentTable from "../../../db/models/appointmentModel.js";
import { priorityQueueAlgo } from "./priorityQueue.js";

export const getDoctors = async () => {
  const date = new Date();
  const tomorrow = new Date(date); 
  tomorrow.setDate(date.getDate() + 1);
con

  const data = await AppointmentTable.distinct("doctorId",
    {
        appointmentDate:tomorrow
    }
  );
  console.log(data)


  return data;
};

export const getAppointmentAsPerDoctor = async (doctor) => {
  const getAppointment = await AppointmentTable.find({ doctorId: doctor });
  console.log("the appointment is", getAppointment)
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
