import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance"; 
import { toast } from "react-toastify";
const ApproveDoctorModal = ({ doctor, onClose }) => {
  const queryClient = useQueryClient();


  const approveDoctor = async (id) => {
    const response = await axiosInstance.patch(`/api/v1/approveDoctor/${id}`);
    return response.data.message;
  };


  const mutation = useMutation({
    mutationFn: approveDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries(["doctorApproval"]);
      toast.success("Doctor Approval Successfull")
      onClose(); 
    },
    onError: (err) => {
        toast.error("Doctor Approval Successfull");
      console.error("Approve failed:", err);

    },
  });


  const handleApprove = () => {
    if (doctor && doctor._id) {
      mutation.mutate(doctor._id);
    }
  };

  // If no doctor passed, render nothing
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
      <div className="bg-gray-400 p-6 rounded-lg shadow-md w-[400px]">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <ErrorIcon /> Approve Doctor
        </h2>
        <p className="text-white mb-6 text-center">
          Are you sure you want to approve Dr.{" "}
          <strong>
            {doctor.userId?.firstName} {doctor.userId?.lastName}
          </strong>
          ?
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            onClick={handleApprove}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Approving..." : "Approve"}
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
            onClick={onClose}
            disabled={mutation.isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveDoctorModal;
