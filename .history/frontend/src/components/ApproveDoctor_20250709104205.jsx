import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import axiosInstance from "./utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ApproveDoctorModal from "./modal/ApproveDoctorModal";
import RemoveDoctor from "./modal/removeDoctor"; // <-- Correct import

const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/v1/showAllUnApprovedDoctors"
    );
    return response.data.doctors;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const ApproveDoctor = () => {
  const [approveModal, setApproveModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const { data, refetch } = useQuery({
    queryKey: ["unapprovedDoctors"],
    queryFn: getAllUsers,
  });

  const handleApproveClick = (doctor) => {
    setSelectedDoctor(doctor);
    setApproveModal(true);
  };

  const handleCloseApproveModal = () => {
    setApproveModal(false);
    setSelectedDoctor(null);
  };

  // New handlers for RemoveDoctor modal
  const handleRemoveClick = (doctor) => {
    setSelectedDoctor(doctor);
    setRemoveModal(true);
  };

  const handleCloseRemoveModal = () => {
    setRemoveModal(false);
    setSelectedDoctor(null);
  };

  // When doctor is removed, refetch list and close modal
  const handleRemoveSuccess = () => {
    refetch();
    handleCloseRemoveModal();
  };

  return (
    <div>
      <div className="flex items-center justify-center h-22 w-full bg-gray-300 text-center text-4xl font-bold">
        Approve Doctors
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
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
              {Array.isArray(data) &&
                data.map((row, index) => (
                  <TableRow key={row._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {row.userId?.firstName} {row.userId?.lastName}
                    </TableCell>
                    <TableCell>{row.userId?.email}</TableCell>
                    <TableCell>{row.userId?.gender}</TableCell>
                    <TableCell>{row.licenseNo}</TableCell>
                    <TableCell>{row.degreeType}</TableCell>
                    <TableCell>{row.specialistType}</TableCell>
                    <TableCell>
                      <div className="flex gap-3">
                        <button
                          className="bg-green-600 px-3 py-1 rounded text-white hover:bg-green-700"
                          onClick={() => handleApproveClick(row)}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700"
                          onClick={() => handleRemoveClick(row)}
                        >
                          UnApprove
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Approve modal */}
      {approveModal && selectedDoctor && (
        <ApproveDoctorModal
          doctor={selectedDoctor}
          onClose={handleCloseApproveModal}
        />
      )}

  
      {removeModal && selectedDoctor && (
        <RemoveDoctor
          id={selectedDoctor._id}
          onClose={handleCloseRemoveModal}
        />
      )}
    </div>
  );
};

export default ApproveDoctor;
