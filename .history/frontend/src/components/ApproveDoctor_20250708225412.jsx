import { Table, TableHead, TableBody, TableCell, 
    TableRow, 
    TableContainer,
    Paper, } from "@mui/material";
import axiosInstance from "./utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";


const getAllUsers= async()=>
{
    try{
        const response = await axiosInstance.get(
          "/api/v1/showAllUnApprovedDoctors"
        );
        
        return response.data.message;
    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
}
export const ApproveDoctor= ()=>
{
    const {data}= useQuery({
        queryKey:["unapprovedDoctors"],
        queryFn:getAllUsers
    })


    return (
      <div>
        <div className="flex items-center justify-center h-22 w-full bg-gray-300 text-center text-4xl font-bold">
          Approve Doctors
        </div>
        <div>
          <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableCell>S.N.</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>License No</TableCell>
                    <TableCell>Degree Type</TableCell>
                    <TableCell>Specialist Type</TableCell>
                    <TableCell>Action</TableCell>
                </TableHead>
                <TableBody>
                    {
                    Array.isArray(data) &&
                        data.map((row, index)=>
                        {
                            <TableRow key={row._id}>
                              <TableCell></TableCell> <TableCell></TableCell>
                              
                              <TableCell></TableCell>
                            </TableRow>;
                        })
                    }
                    
                </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
}