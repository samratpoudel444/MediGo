import ErrorIcon from "@mui/icons-material/Error";
import axiosInstance from "../utils/AxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const DeletePharmacy = ({ id, onClose }) => {
  const queryClient = useQueryClient();

  const deletePharmacyData = async (id) => {
    const response = await axiosInstance.delete(
      `/api/v1/deletePharmacies/${id}`
    );
    return response.data.message;
  };

  const mutation = useMutation({
    mutationFn: deletePharmacyData,
    onSuccess: () => {
      queryClient.invalidateQueries(["pharmacies"]); 
      onClose(); // Close modal after deletion
    },
    onError: (err) => {
      console.error("Delete failed:", err);
    },
  });

  const handleDelete = () => {
    mutation.mutate(id); // pass id here
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-transparent">
      <div className="flex flex-col text-center border w-1/2 h-80 bg-gray-400 text-white rounded-3xl">
        <span className="text-4xl font-bold mt-8">
          <ErrorIcon /> Delete Pharmacy
        </span>

        <div className="py-15 text-xl">
          Are you sure you want to remove the pharmacy from the system?
        </div>

        <div className="flex justify-center gap-5">
          <button
            className="bg-red-600 px-3 py-2 rounded-xl hover:bg-red-700"
            onClick={handleDelete}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Deleting..." : "Delete"}
          </button>

          <button
            className="bg-gray-500 px-3 py-2 rounded-xl hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
