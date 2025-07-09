import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./AxiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation(
    async () => {
      const response = await axiosInstance.get("/api/v1/signOutUsers");
      return response.data.message;
    },
    {
      onSuccess: (message) => {
        toast.success(message || "Logout successful");
        localStorage.removeItem("token");
        navigate("/login");
      },
      onError: (error) => {
        toast.error(error.message || "Logout failed");
      },
    }
  );
};
