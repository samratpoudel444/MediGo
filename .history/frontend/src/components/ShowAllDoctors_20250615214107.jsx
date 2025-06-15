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
    return response.data.message;
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to fetch doctors");
    return [];
  }
};

function ShowAllDoctors() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState(null);

  const { data: rows = [] } = useQuery({
    queryFn: fetchDoctor,
    queryKey: ["doctors"],
  });

  const handlePageChange = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }} className="sm:w-screen">
      <Typography
        sx={{
          fontSize: "2.5rem",
          textAlign: "center",
          bgcolor: "#f5f5f5",
          py: 2,
        }}
      >
        Show Doctors
      </Typography>

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
            {visibleRows.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>
                  {item?.userId?.firstName + " " + item?.userId?.lastName}
                </TableCell>
                <TableCell>{item?.userId?.email}</TableCell>
                <TableCell>{item?.userId?.gender}</TableCell>
                <TableCell>{item?.licenseNo}</TableCell>
                <TableCell>{item?.degreeType}</TableCell>
                <TableCell>{item?.specialistType}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setDoctorDetails({
                          id: item.userId._id,
                          fullname:
                            item.userId.firstName + " " + item.userId.lastName,
                        })
                      }
                      className="text-sm px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-white"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        setSelectedDoctor({
                          id: item.userId._id,
                          fullname:
                            item.userId.firstName + " " + item.userId.lastName,
                        })
                      }
                      className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-white"
                    >
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
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

      {/* Modals should be outside the Table loop */}
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
