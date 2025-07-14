import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";

const fetchData= async()=>
{
    try{
        const response = await axiosInstance.get(
          "/api/v1/getAllDoctorAppointments"
        );
        return response;
    }
    catch(err)
    {
        console.log("fetcing error", err)
        throw err;
    }
}


const GetAllAppointments = ()=>
{
      const headers = [
        "S.N.",
        "First Name",
        "Last Name",
        "Appointment Date",
        "Reasons",
        "Appointment Type",
        "Status",
      ];

    const {data, isLoading, isError}= useQuery({
        queryFn: fetchData,
        queryKey:['appoint']
    })

    console.log(data)

    return (
      <div>
        <div className="w-full h-22 bg-gray-300 flex justify-center items-center ">
          <span className="font-bold text-3xl">Appointment Lists</span>
        </div>

        <div>
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
                 {data.map((name, idx) => (
                  <tr key={idx} className="px-4 py-2 border">
                <td className="px-10 py-2 ">1</td>
                <td className="px-10 py-2 ">John</td>
                <td className="px-10 py-2 ">Doe</td>
                <td className="px-10 py-2 ">2025-07-03</td>
                <td className="px-10 py-2 ">Checkup</td>
                <td className="px-10 py-2 ">In-person</td>
                <td className="px-10 py-2 ">Confirmed</td>
                  </tr>
                 )}



              <tr className="text-gray-700">
                
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default GetAllAppointments;