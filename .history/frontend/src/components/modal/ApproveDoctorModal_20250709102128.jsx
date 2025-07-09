import React from "react";
import ErrorIcon from "@mui/icons-material/Error";

const ApproveDoctorModal = ({ doctor, onClose }) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0  flex items-center justify-center z-50 backdrop-blur-2xl">
      <div className="bg-gray-400 p-6 rounded-lg shadow-md w-[400px]">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          <ErrorIcon />
          Approve Doctor
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
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => {
              onClose();
            }}
          >
            Approve
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveDoctorModal;
