import { useState } from "react";



const ViewPatients = () => {
  const headers = [
    "S.N.",
    "First Name",
    "Last Name",
    "Appointment Date",
    "Reasons",
    "Appointment Type",
    "Status",
  ];

  const data = [
    {
      firstName: "",
      LastName: "",
      appointmentDate: "",
      Reasons: "",
      appointmentType: "",
    },
  ];

  const [no, setNo]= useState(0);
  return (
    <div>
      <h1 className="text-center font-bold text-2xl mt-4 ">Patient List</h1>
      <div className="p-4">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left text-xl text-center">
              {headers.map((name, idx) => (
                <th key={idx} className="px-4 py-2 border">
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="text-gray-700">
              <td className="px-10 py-2 ">1</td>
              <td className="px-10 py-2 ">John</td>
              <td className="px-10 py-2 ">Doe</td>
              <td className="px-10 py-2 ">2025-07-03</td>
              <td className="px-10 py-2 ">Checkup</td>
              <td className="px-10 py-2 ">In-person</td>
              <td className="px-10 py-2 ">Confirmed</td>
            </tr>

            <tr className="text-gray-700">
              <td className="px-10 py-2 ">1</td>
              <td className="px-10 py-2 ">John</td>
              <td className="px-10 py-2 ">Doe</td>
              <td className="px-10 py-2 ">2025-07-03</td>
              <td className="px-10 py-2 ">Checkup</td>
              <td className="px-10 py-2 ">In-person</td>
              <td className="px-10 py-2 ">Confirmed</td>
            </tr>

            <tr className="text-gray-700">
              <td className="px-10 py-2 ">1</td>
              <td className="px-10 py-2 ">John</td>
              <td className="px-10 py-2 ">Doe</td>
              <td className="px-10 py-2 ">2025-07-03</td>
              <td className="px-10 py-2 ">Checkup</td>
              <td className="px-10 py-2 ">In-person</td>
              <td className="px-10 py-2 ">Confirmed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewPatients;
