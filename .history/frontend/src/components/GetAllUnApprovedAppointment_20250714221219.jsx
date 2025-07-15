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
  Chip,
} from "@mui/material";

const fetchAppointments = async () => {
  const response = await axiosInstance.get(
    "/api/v1/getAllRemainingAppointments"
  );
  return response.data.message;
};

const GetAllRemainingAppointments = () => {
  const typeLabels = {
    1: "New Checkup",
    2: "Followup",
    3: "Routine",
  };

  const {
    data: appointments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["appointmentsNew"],
    queryFn: fetchAppointments,
  });

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
      sx={{
        maxWidth: 1100,
        margin: "20px auto",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
            <TableCell>S.N.</TableCell>
            <TableCell>Doctor Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Appointment Date</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Approved</TableCell>
            <TableCell>Completed</TableCell>
            <TableCell>Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((app, index) => (
            <TableRow
              key={app._id}
              hover
              sx={{
                "&:hover": {
                  backgroundColor: "#f9f9f9",
                },
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {app.doctorId.firstName + " " + app.doctorId.lastName}
              </TableCell>
              <TableCell>{app.Age}</TableCell>
              <TableCell>{app.appointmentDate}</TableCell>
              <TableCell>{app.reason}</TableCell>
              <TableCell>
                <Chip
                  label={typeLabels[app.appointmentType] || "Unknown"}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={app.isApproved ? "Yes" : "No"}
                  color={app.isApproved ? "success" : "warning"}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={app.appointmentCompleted ? "Yes" : "No"}
                  color={app.appointmentCompleted ? "success" : "default"}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <button
                  disabled={!app.isApproved}
                  style={{
                    padding: "6px 12px",
                    fontSize: "0.8rem",
                    borderRadius: "6px",
                    cursor: app.isApproved ? "pointer" : "not-allowed",
                    backgroundColor: app.isApproved ? "#1976d2" : "#ccc",
                    color: "#fff",
                    border: "none",
                  }}
                  onClick={() => {
                    // Call API or handle complete logic
                    console.log(`Marking appointment ${app._id} as completed`);
                  }}
                >
                  {app.appointmentCompleted ? "Completed" : "Make Chat"}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GetAllRemainingAppointments;
