import React, { useEffect, useState } from "react";
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

const GetAllApprovedAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/getAllFinishedAppointments"
      );
      setAppointments(response.data.message);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch appointments");
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={2}>
        {error}
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
