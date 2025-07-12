import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "./utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const getRole = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const response = await axiosInstance.get("/api/v1/testRole");
    return response.data.message;
  } catch (error) {
    // Add delay even for errors if you want
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return error.response?.data?.message || "Unknown error";
  }
};

const ProtectedRoute = ({ allowedRole }) => {
  const token = localStorage.getItem("token");
  const { data: role, isLoading } = useQuery({
    queryFn: getRole,
    queryKey: ["role"],
    enabled: !!token,
    retry: false,
  });

  if (!token) {
    toast.error("Unauthorized access Please Login");
    return <Navigate to="/login" replace={false} />;
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  console.log("The allowed role is", allowedRole);
  console.log("The role is", role);

  if (allowedRole && !allowedRole.includes(role)) {
    toast.error("Unauthorized access Please Login");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
