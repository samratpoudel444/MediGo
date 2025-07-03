const ViewPatients= ()=>
{
    const headers = [
      {
        name: "First Name",
      },
      {
        name: "Last Name",
      },
      {
        name: "Appointment Date",
      },
      {
        name: "Reasons",
      },
      {
        name:"Appointment Type"
      },
      {
        name:"Status"
      }
    ];
    return (
      <div>
        <table className="border w-full">
           
          <th className="bg-gray-200 flex flex-row gap-15 px-10 text-xl w-full">
            {headers.map((items)=>
            (<td>{items.name}</td>))}
          </th>

          <tr>
            <td>dsd</td>
            <td>dsd</td>
            <td>dsd</td>
            <td>dsd</td>
          </tr>
        </table>
      </div>
    );
}

export default ViewPatients;