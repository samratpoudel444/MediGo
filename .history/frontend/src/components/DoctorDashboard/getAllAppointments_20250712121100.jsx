import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";

const fetchData = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/v1/getAllDoctorAppointments"
    );
    console.log(response.data)
    return response.data;
     // Expecting { message: [...] }
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
    "Age",
    "Reasons",
    "Appointment Type",
    "Status",
  ];

  const { data, isLoading, isError } = useQuery({
    queryFn: fetchData,
    queryKey: ["appoint"],
  });

  const appointments = data?.message || [];

  const appointmentTypeMap = {
  1: "New",
  2: "Follow-up",
  3: "Regular",
};

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load data</p>
    );

  return (
    <div className="">
      <div className="w-full h-22 bg-gray-300 flex justify-center items-center py-4">
        <span className="font-bold text-3xl">Appointment Lists</span>
      </div>

      <div className="overflow-x-auto mt-6 mr-5 ml-5">
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
            {appointments.map(
              (
                {
                  _id,
                  patientId,
                  appointmentDate,
                  age,
                  reason,
                  appointmentType,
                  isApproved,
                },
                idx
              ) => (
                <tr key={_id} className="border">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{patientId?.firstName || "N/A"}</td>
                  <td className="px-4 py-2">{patientId?.lastName || "N/A"}</td>
                  <td className="px-4 py-2">
                    {new Date(appointmentDate).toDateString()}
                  </td>
                  <td className="px-4 py-2">{ge ?? "N/A"}</td>
                  <td className="px-4 py-2">{reason || "N/A"}</td>
                  <td className="px-4 py-2">
                    {appointmentTypeMap[appointmentType] || "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {isApproved ? "Approved" : "Pending"}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllAppointments;
