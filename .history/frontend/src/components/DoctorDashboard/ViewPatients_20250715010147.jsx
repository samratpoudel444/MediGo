import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TablePagination,
  Button,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

const fetchAllPatients = async () => {
  const res = await axiosInstance.get("/api/v1/getAllPatients");
  console.log("Patients data:", res.data.message);

  const patients = res.data.message;
  if (patients && !Array.isArray(patients)) {
    return [patients];
  }

  return patients || [];
};

const AllPatientsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate= useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allPatients"],
    queryFn: fetchAllPatients,
  });

  const handleSendMessage = async (, firstName, lastName) => {
   
    navigate("/chat", {
      state: {
        setSelectedUser: {
          firstName: data?.userId.firstName,
          lastName: data?.userId.lastName,
          _id: data.userId._id,
        },
      },
    });
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center text-4xl font-bold">
        <CircularProgress />
      </div>
    );
  }

  if (isError || !data || data.length === 0) {
    return (
      <div className="h-full flex justify-center items-center text-4xl font-bold">
        No patients found
      </div>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Name</strong>
            </TableCell>
            <TableCell>
              <strong>Email</strong>
            </TableCell>
            <TableCell>
              <strong>Address</strong>
            </TableCell>
            <TableCell>
              <strong>Gender</strong>
            </TableCell>
            <TableCell>
              <strong>Message</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((patient) => (
              <TableRow key={patient._id}>
                <TableCell>
                  {patient.firstName + " " + patient.lastName}
                </TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.address}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleSendMessage(patient._id, patient.firstName, patient.lastName)}
                  >
                    Send Message
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </TableContainer>
  );
};

export default AllPatientsTable;
