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
  TablePagination,
  Button,
} from "@mui/material";
import { DeletePharmacy } from "./modal/DeletePharmacy";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const fetchData = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/getAllPharmacies");
    return response.data.message;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const ShowAllPharmacies = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPharmacyId, setSelectedPharmacyId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["pharmacies"],
    queryFn: fetchData,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleDeleteClick = (id) => {
    setSelectedPharmacyId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPharmacyId(null);
  };

  return (
    <div>
      <div className="px-4 py-2">
        <Button
          onClick={() => navigate(-1)}
          variant="outlined"
          color="primary"
          size="small"
        >
          ← Back
        </Button>
      </div>

      <div className="w-full h-22  text-center font-bold text-3xl flex justify-center items-center">
        All Pharmacies
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                S.N.
              </TableCell>
              <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                Pharmacy Name
              </TableCell>
              <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                License No
              </TableCell>
              <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                Contact No
              </TableCell>
              <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.isArray(paginatedData) &&
              paginatedData.map((row, index) => (
                <TableRow key={row._id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{row.pharmacyName}</TableCell>
                  <TableCell>{row.licenseNo}</TableCell>
                  <TableCell>{row.contactNo}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    <button
                      className="rounded-2xl bg-red-600 text-white px-3 py-2 hover:bg-red-700"
                      onClick={() => handleDeleteClick(row._id)}
                    >
                      Remove
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data?.length || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
      />

      {showModal && (
        <DeletePharmacy id={selectedPharmacyId} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ShowAllPharmacies;
