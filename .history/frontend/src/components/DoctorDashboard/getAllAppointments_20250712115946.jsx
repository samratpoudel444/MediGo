import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";

const fetchData = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/v1/getAllDoctorAppointments"
    );
    return response.data; // Expecting { message: [...] }
  } catch (err) {
    console.log("Fetching error", err);
    throw err;
  }
};

const GetAllAppointments = () => {
  const headers = [
    "S.N.",
    "First Name",
    "Last Name",
    "Appointment Date",
    "Reasons",
    "Appointment Type",
    "Status",
  ];

  const { data, isLoading, isError } = useQuery({
    queryFn: fetchData,
    queryKey: ["appoint"],
  });

  const appointments = data?.message || [];

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load data</p>
    );

  return (
    <div >
      <div className="w-full h-22 bg-gray-300 flex justify-center items-center py-4">
        <span className="font-bold text-3xl">Appointment Lists</span>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left text-xl">
              {headers.map((name, idx) => (
                <th key={idx} className="px-4 py-2 border">
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, idx) => (
              <tr key={appointment._id} className="border">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">
                  {appointment.patientId?.firstName || "N/A"}
                </td>
                <td className="px-4 py-2">
                  {appointment.patientId?.lastName || "N/A"}
                </td>
                <td className="px-4 py-2">
                  {new Date(appointment.appointmentDate).toDateString()}
                </td>
                <td className="px-4 py-2">{appointment.reason || "N/A"}</td>
                <td className="px-4 py-2">
                  {appointment.appointmentType || "N/A"}
                </td>
                <td className="px-4 py-2">{appointment.status || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllAppointments;
