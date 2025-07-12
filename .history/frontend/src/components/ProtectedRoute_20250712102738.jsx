import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "./utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const getRole = async () => {
  try {
    // Add 2-second delay to simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await axiosInstance.get("/api/v1/testRole");
    if (!response.data) {
      throw new Error("No data received");
    }
    return response.data.message;
  } catch (error) {
    console.error("Role verification error:", error);
    throw error; // Re-throw to let react-query handle it
  }
};

const ProtectedRoute = ({ allowedRole }) => {
  const token = localStorage.getItem("token");

  const {
    data: role,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: getRole,
    queryKey: ["role"],
    enabled: !!token,
    retry: false,
  });


  if (!token) {
    toast.error("Unauthorized access. Please Login");
    return <Navigate to="/login" replace />;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress size={60} />
      </div>
    );
  }

  // Error state
  if (isError) {
    console.error("Role verification failed:", error);
    toast.error("Failed to verify permissions. Please try again.");
    return <Navigate to="/login" replace />;
  }

  // Role verification
  console.log("Allowed roles:", allowedRole, "User role:", data);

  if (allowedRole && !allowedRole.includes(role)) {
    toast.error("You don't have permission to access this page");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
