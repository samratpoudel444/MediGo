import React, { useState } from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "./utils/AxiosInstance";
import PopUp from "./modal/PopUpModal";
import DetailsModal from "./modal/DetailsModal";

const fetchDoctor = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/showAllDoctors");

    const doctors =
      response?.data?.doctors ||
      response?.data?.message || 
      [];

    if (!Array.isArray(doctors)) {
      throw new Error("Invalid response format");
    }

    return doctors;
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to fetch doctors");
    return []; // Always return an array
  }
};

function ShowAllDoctors() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState(null);

  const {
    data: rows = [],
    isLoading,
    isError,
  } = useQuery({
    queryFn: fetchDoctor,
    queryKey: ["doctors"],
  });

  const handlePageChange = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = rows
    .filter((item) => item?.userId)
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }} className="sm:w-screen">
      <Typography
        sx={{
          fontSize: "2.5rem",
          textAlign: "center",
          bgcolor: ",
          py: 2,
        }}
      >
        Show Doctors
      </Typography>

      {isLoading && (
        <Typography textAlign="center" py={2}>
          Loading...
        </Typography>
      )}

      {isError && (
        <Typography textAlign="center" color="error" py={2}>
          Failed to load doctors.
        </Typography>
      )}

      {!isLoading && !isError && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                <TableCell>S.N.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>License No</TableCell>
                <TableCell>Degree Type</TableCell>
                <TableCell>Specialist Type</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {visibleRows.map((item, index) => {
                const user = item.userId;
                return (
                  <TableRow key={item._id || index}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      {user.firstName + " " + user.lastName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{item.licenseNo}</TableCell>
                    <TableCell>{item.degreeType}</TableCell>
                    <TableCell>{item.specialistType}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setDoctorDetails({
                              id: user._id,
                              fullname: user.firstName + " " + user.lastName,
                            })
                          }
                          className="text-sm px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-white"
                        >
                          View
                        </button>
                        <button
                          onClick={() =>
                            setSelectedDoctor({
                              id: user._id,
                              fullname: user.firstName + " " + user.lastName,
                            })
                          }
                          className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={rows.length}
            page={page}
            rowsPerPageOptions={[5, 10]}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}

      {doctorDetails && (
        <DetailsModal
          id={doctorDetails.id}
          fullname={doctorDetails.fullname}
          onClose={() => setDoctorDetails(null)}
        />
      )}

      {selectedDoctor && (
        <PopUp
          id={selectedDoctor.id}
          fullname={selectedDoctor.fullname}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </Paper>
  );
}

export default ShowAllDoctors;
