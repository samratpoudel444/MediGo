import React from "react";
import axiosInstance from "../utils/AxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const deleteBlog = async (id) => {
  const response = await axiosInstance.delete(`/api/v1/deleteBlog/${id}`);
  return response.data.message;
};

const DeleteBlogModal = ({ id, onClose }) => {
  const queryClient = useQueryClient();
  console

  const mutation = useMutation({
    mutationFn: () => deleteBlog(id),
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries(["blogs"]);
      onClose();
    },
    onError: (err) => {
      toast.error(err.response.data.message);
      console.error(err);
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-opacity-30">
      <div className="w-[90%] sm:w-1/2 bg-gray-400 rounded-lg p-6 text-center shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Delete Blog</h2>
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete this blog? This action cannot be
          undone.
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={handleDelete}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Deleting..." : "Delete"}
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlogModal;
