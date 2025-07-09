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
            <TableCell>S.N.</TableCell>
            <TableCell>Pharmacy Name</TableCell>
            <TableCell>License No</TableCell>
            <TableCell>Contact No</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Delete</TableCell>
          </TableHead>

          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.pharmacyName}</TableCell>
                <TableCell>{row.pharmacyName}</TableCell>
                <TableCell>{row.count}</TableCell>
                <TableCell>{row.count}</TableCell>
                <TableCell>{row.count}</TableCell>
                <TableCell>{<button className="border rounded-2xl bg-red-600 px-3 ">Delete</button>}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};


export default ShowAllPharmacies;