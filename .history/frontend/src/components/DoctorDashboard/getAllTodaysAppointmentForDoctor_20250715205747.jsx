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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";

// Fetch today's appointments
const fetchTodaysAppointments = async () => {
  const res = await axiosInstance.get(
    "/api/v1/getAllTodaysAppointmentForDoctor"
  );
  const appointments = res.data?.message;

  console.log("Fetched Appointments:", appointments);

  if (appointments && !Array.isArray(appointments)) {
    return [appointments];
  }

  return appointments || [];
};

const TodaysAppointmentsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["todaysAppointments"],
    queryFn: fetchTodaysAppointments,
  });

  console.log(data)

  const markAppointmentCompleted = useMutation({
    mutationFn: async (appointmentId) => {
      const response = await axiosInstance.put(
        `/api/v1/appointment/${appointmentId}/completed`
      );
      console.log("Completed Mutation Response:", response.data);
      return response.data;
    },
    onSuccess: () => {
      // Re-fetch the appointment list after marking as complete
      queryClient.invalidateQueries(["todaysAppointments"]);
      queryClient.refetchQueries(["todaysAppointments"]);
    },
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
        No appointments for today
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
              <strong>Gender</strong>
            </TableCell>
            <TableCell>
              <strong>Reason</strong>
            </TableCell>
            <TableCell>
              <strong>Date</strong>
            </TableCell>
            <TableCell>
              <strong>Time</strong>
            </TableCell>
            <TableCell>
              <strong>Approve Status</strong>
            </TableCell>
            <TableCell>
              <strong>Status</strong>
            </TableCell>
            <TableCell>
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((appt) => {
              const fullName =
                (appt?.patientId?.firstName || "") +
                " " +
                (appt?.patientId?.lastName || "");

              const isCompleted = appt?.isCompleted ?? false;
              const isApproved = appt?.isApproved ?? false;

              return (
                <TableRow key={appt._id}>
                  <TableCell>{fullName}</TableCell>
                  <TableCell>{appt?.patientId?.gender || "-"}</TableCell>
                  <TableCell>{appt?.reason || "-"}</TableCell>
                  <TableCell>{appt?.appointmentDate || "-"}</TableCell>
                  <TableCell>{appt?.timeSlot || "-"}</TableCell>
                  <TableCell>
                    <span style={{ color: isApproved ? "green" : "red" }}>
                      {isApproved ? "Yes" : "No"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span style={{ color: isCompleted ? "green" : "red" }}>
                      {appointmentCompleted ? "Completed" : "Pending"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {isCompleted ? (
                      <Button variant="contained" disabled>
                        Completed
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          markAppointmentCompleted.mutate(appt._id)
                        }
                        disabled={markAppointmentCompleted.isLoading}
                      >
                        {markAppointmentCompleted.isLoading
                          ? "Processing..."
                          : "Mark Completed"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
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

export default TodaysAppointmentsTable;
