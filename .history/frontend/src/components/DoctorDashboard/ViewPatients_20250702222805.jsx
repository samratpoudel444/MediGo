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
      Appointment Type: "",
    },
  ];

  const [no, setNo]= useState(0);
  return (
    <div>
      <h1 className="text-center ">Patient List</h1>
      <div className="p-4">
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
            <tr className="text-gray-700">
              <td className="px-4 py-2 border">1</td>
              <td className="px-4 py-2 border">John</td>
              <td className="px-4 py-2 border">Doe</td>
              <td className="px-4 py-2 border">2025-07-03</td>
              <td className="px-4 py-2 border">Checkup</td>
              <td className="px-4 py-2 border">In-person</td>
              <td className="px-4 py-2 border">Confirmed</td>
            </tr>

            <tr className="text-gray-700">
              <td className="px-4 py-2 border">1</td>
              <td className="px-4 py-2 border">John</td>
              <td className="px-4 py-2 border">Doe</td>
              <td className="px-4 py-2 border">2025-07-03</td>
              <td className="px-4 py-2 border">Checkup</td>
              <td className="px-4 py-2 border">In-person</td>
              <td className="px-4 py-2 border">Confirmed</td>
            </tr>

            <tr className="text-gray-700">
              <td className="px-4 py-2 border">1</td>
              <td className="px-4 py-2 border">John</td>
              <td className="px-4 py-2 border">Doe</td>
              <td className="px-4 py-2 border">2025-07-03</td>
              <td className="px-4 py-2 border">Checkup</td>
              <td className="px-4 py-2 border">In-person</td>
              <td className="px-4 py-2 border">Confirmed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewPatients;
