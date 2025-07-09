import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./utils/AxiosInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { DeletePharmacy } from "./modal/DeletePharmacy";


const fetchData= async()=>
{
    try{
        const response = await axiosInstance.get("/api/v1/getAllPharmacies");
        return response.data.message
    }
    catch(err)
    {
        console.log(err)
        throw err;
    }
}
const ShowAllPharmacies = () => {
    const {data}= useQuery({
        queryKey:['pharmacies'],
        queryFn: fetchData
    })

    console.log("yhe data is", data)

  return (
    <div>
      <div className="w-full h-22 bg-gray-300 text-center font-bold text-3xl flex justify-center items-center">
        All Pharmacies
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
              S.N.
            </TableCell>
            <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
              Pharmacy Name
            </TableCell>
            <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
              License No
            </TableCell>
            <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
              Contact No
            </TableCell>
            <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
              Email
            </TableCell>
            <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
              Delete
            </TableCell>
          </TableHead>

          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.pharmacyName}</TableCell>
                <TableCell>{row.pharmacyName}</TableCell>
                <TableCell>{row.licenseNo}</TableCell>
                <TableCell>{row.contactNo}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  {
                    <button className=" rounded-2xl bg-red-600 text-white px-3 py-2 "
                    onClick={()=> {<DeletePharmacy/>}}>
                      Remove
                    </button>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};


export default ShowAllPharmacies;