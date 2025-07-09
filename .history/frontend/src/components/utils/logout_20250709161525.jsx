// hooks/useLogout.js
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "./AxiosInstance";
import { useMutation } from "@tanstack/react-query";

const logout = async () => {
  const response = await axiosInstance("/api/v1/signOutUsers");
  return response.data.message;
};

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation(logout, {
    onSuccess: (data) => {
      localStorage.removeItem("token");
      toast.success(data || "User logout successful");
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err.message || "Logout failed");
    },
  });
};
