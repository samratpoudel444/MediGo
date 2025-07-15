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
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";

const fetchTodaysAppointments = async () => {
  const res = await axiosInstance.get(
    "/api/v1/getAllAppointmentForDoctor"
  );
  console.log("Today's Appointments:", res.data.message);

  const appointments = res.data.message;
  if (appointments && !Array.isArray(appointments)) {
    return [appointments];
  }

  return appointments || [];
};

const AppointmentsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["todaysAppointments"],
    queryFn: fetchTodaysAppointments,
  });

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
        No appointments Avilable
      </div>
    );
  }

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Patient Name</strong>
            </TableCell>
            <TableCell>
              <strong>Email</strong>
            </TableCell>
            <TableCell>
              <strong>Gender</strong>
            </TableCell>
            <TableCell>
              <strong>Date</strong>
            </TableCell>
            <TableCell>
              <strong>Time</strong>
            </TableCell>
            <TableCell>
              <strong>Approved</strong>
            </TableCell>
            <TableCell>
              <strong>Completed</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((appt) => (
              <TableRow key={appt._id}>
                <TableCell>
                  {appt.patientId?.firstName + " " + appt.patientId?.lastName}
                </TableCell>
                <TableCell>{appt.patientId?.gender}</TableCell>
                <TableCell>{appt.reason}</TableCell>
                <TableCell>{appt.appointmentDate}</TableCell>
                <TableCell>{appt.timeSlot || "-------------"}</TableCell>
                <TableCell>
                  <span style={{ color: appt.isApproved ? "green" : "red" }}>
                    {appt.isApproved ? "Yes" : "No"}
                  </span>
                </TableCell>
                <TableCell>
                  <span style={{ color: appt. ? "green" : "red" }}>
                    {appt.isApproved ? "Yes" : "No"}
                  </span>
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

export default AppointmentsTable;
