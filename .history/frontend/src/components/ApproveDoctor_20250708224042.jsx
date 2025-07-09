import { Table, TableHead, TableBody, TableCell, 
    TableRow, 
    TableContainer,
    Paper, } from "@mui/material";

export const ApproveDoctor= ()=>
{
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
            </Table>
          </TableContainer>
        </div>
      </div>
    );
}