const ViewPatients= ()=>
{
    const headers = [
      {
        name: "First Name",
      },
      {
        name: "First Name",
      },
      {
        name: "First Name",
      },
      {
        name: "First Name",
      },
    ];
    return (
      <div>
        <table className="border w-full">
           
          <th className="bg-gray-200">
            {headers.map((items)=>
            (<td>First Name</td>))}
          </th>

          <tr>
            <td>dsd</td>
            <td>dsd</td>
            <td>dsd</td>
            <td>dsd</td>
          </tr>
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