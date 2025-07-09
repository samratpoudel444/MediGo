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
                
            </Table>
        </TableContainer>

    </div>
  );
};


export default ShowAllPharmacies;