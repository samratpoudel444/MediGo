import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../utils/AxiosInstance";

const deleteUser = async (id) => {
    try{
          console.log("the id is ", id);
        const response = await axiosInstance.delete(`/api/v1/deleteDoctor/${id}`);
        return response.data.message;
    }
    catch(err)
    {
        console.log(err);
        return err
    }
  
};

function PopUp({ id, fullname, onClose }) {
    console.log("the id is ", fullname)
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      toast.success("User deleted successfully!");
      queryClient.invalidateQueries(["doctors"]);
      onClose();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete user");
    },
  });

  return (
    <div
      id="popup-modal"
      className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/10"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-500">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-2.5 text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ✕
          </button>

          <div className="p-5 text-center">
            <svg
              className="mx-auto mb-4 w-12 h-12 text-gray-400 dark:text-gray-200"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-300">
              Are you sure you want to delete <strong>{fullname}</strong>?
            </h3>

            <button
              onClick={() => mutation.mutate()}
              className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
            >
              Yes, I'm sure
            </button>

            <button
              onClick={onClose}
              className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
