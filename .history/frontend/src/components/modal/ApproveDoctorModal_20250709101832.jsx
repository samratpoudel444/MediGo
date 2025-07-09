import React from "react";

const ApproveDoctorModal = ({ doctor, onClose }) => {
  if (!doctor) return null;

  return (
    <div
      className="fixed inset-0 Uncaught SyntaxError: The requested module '/src/components/ApproveDoctor.jsx?t=1752035193690' does not provide an export named 'ApproveDoctor' (at App.jsx:30:10)Understand this error
App.jsx:30 Uncaught SyntaxError: The requested module '/src/components/ApproveDoctor.jsx?t=1752035316692' does not provide an export named 'ApproveDoctor' (at App.jsx:30:10)Understand this error flex items-center justify-center z-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-[400px]">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
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
              // You can integrate API call here
              console.log("Approving doctor:", doctor._id);
              onClose();
            }}
          >
            Approve
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
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
