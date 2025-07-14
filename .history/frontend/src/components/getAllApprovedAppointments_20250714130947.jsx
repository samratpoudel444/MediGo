import React from "react";
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
  CircularProgress,
  Typography,
} from "@mui/material";

const fetchAppointments = async () => {
  const response = await axiosInstance.get(
    "/api/v1/getAllFinishedAppointments"
  );
  return response.data.message;
};

const GetAllApprovedAppointments = () => {
  const {
    data: appointments,
    isLoading,
    isError,
    error,
  } = useQuery(que["appointments"], fetchAppointments);

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center" mt={2}>
        {error.message || "Failed to fetch appointments"}
      </Typography>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 1000, margin: "20px auto" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Appointment ID</TableCell>
            <TableCell>Patient ID</TableCell>
            <TableCell>Doctor ID</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Appointment Date</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Approved</TableCell>
            <TableCell>Completed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((app) => (
            <TableRow key={app._id}>
              <TableCell>{app._id}</TableCell>
              <TableCell>{app.patientId}</TableCell>
              <TableCell>{app.doctorId}</TableCell>
              <TableCell>{app.Age}</TableCell>
              <TableCell>{app.appointmentDate}</TableCell>
              <TableCell>{app.reason}</TableCell>
              <TableCell>{app.appointmentType}</TableCell>
              <TableCell>{app.isApproved ? "Yes" : "No"}</TableCell>
              <TableCell>{app.appointmentCompleted ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GetAllApprovedAppointments;
