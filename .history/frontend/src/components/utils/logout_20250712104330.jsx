import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./AxiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
queryClient

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.delete("/api/v1/signOutUsers");
      return res.data.message;
    },
    onSuccess: (message) => {
      toast.success(message || "Logout successful");
      localStorage.removeItem("token");
      queryClient.clear();
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error?.message || "Logout failed");
    },
  });
};
