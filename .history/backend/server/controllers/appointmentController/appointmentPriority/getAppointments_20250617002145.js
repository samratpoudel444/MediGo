import AppointmentTable from "../../../db/models/appointmentModel.js"

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
        console.log(Appointment)
    })
}


