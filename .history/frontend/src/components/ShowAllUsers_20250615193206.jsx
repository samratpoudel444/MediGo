import * as React from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
} from "@mui/material";
import axiosInstance from "./utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import PopUp from "./modal/PopUpModal";


const FetchUsers= async()=>
{
  try{
      const response = await axiosInstance.get("/api/v1/showAllPatients");
  return response.data.message;
  }
  catch(err)
  {
    return toast.error(err.response.data.message)
    throw err;
  }
}


export default function ShowAllUsers() {
  const [page, setPage] = useState(0);
  const [count, setCount]= useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showDetails, setShowDetails]= useState(false)
    const [selectedUser, setSelectedUser] = useState(null); 

  const{data:rows=[]}= useQuery({
      queryFn:FetchUsers,
      queryKey: ["Patients"]
  })

  console.log("The values are",rows)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };

  const visibleRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }} className="sm:w-screen">
        <Typography
          variant="h6"
          sx={{
            fontSize: "2.5rem",
            textAlign: "center",
            bgcolor: "#f5f5f5",
            py: 2,
          }}
        >
          User List
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ textAlign: "left", fontSize: "1rem" }}>
                  S.N.
                </TableCell>
                <TableCell sx={{ textAlign: "left", fontSize: "1rem" }}>
                  Name
                </TableCell>
                <TableCell sx={{ textAlign: "left", fontSize: "1rem" }}>
                  Gender
                </TableCell>
                <TableCell sx={{ textAlign: "left", fontSize: "1rem" }}>
                  Email
                </TableCell>
                <TableCell sx={{ textAlign: "left", fontSize: "1rem" }}>
                  Address
                </TableCell>
                <TableCell sx={{ textAlign: "left", fontSize: "1rem" }}>
                  Date of Birth
                </TableCell>
                <TableCell sx={{ textAlign: "left", fontSize: "1rem" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row, index) => (
                <TableRow key={page * rowsPerPage + index + 1}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{row.firstName + " " + row.lastName}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.dob.slice(0, 10)}</TableCell>
                  <TableCell>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() =>
                          setSelectedUser({
                            id: row._id,
                            fullname: row?.firstName + " " + row?.lastName,
                          })
                        }
                        className="bg-green-500 hover:bg-green-600 text-white rounded px-3 py-1 text-sm"
                      >
                        View Details
                      </button>

                      <button className="bg-red-700 hover:bg-red-800 text-white rounded px-3 py-1 text-sm">
                        Delete User
                      </button>

                      <PopUp
                        id={selectedDoctor.id}
                        fullname={selectedDoctor.fullname}
                        onClose={() => setSelectedDoctor(null)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10]}
        />
      </Paper>
      <ToastContainer />
    </>
  );
}
