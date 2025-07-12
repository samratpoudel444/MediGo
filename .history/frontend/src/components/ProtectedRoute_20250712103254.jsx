import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "./utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";

const getRole = async () => {
  try {
    // Remove the artificial delay in production
    if (process.env.NODE_ENV === "development") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    const response = await axiosInstance.get("/api/v1/testRole");

    if (!response.data?.message) {
      throw new Error("Invalid role data format");
    }

    return response.data.message;
  } catch (error) {
    console.error("Role verification error:", error);
    // Clear invalid token if request fails
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    throw error;
  }
};

const ProtectedRoute = ({ allowedRole }) => {
  const token = localStorage.getItem("token");

  const {
    data: role,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryFn: getRole,
    queryKey: ["role-verification"],
    enabled: !!token,
    retry: 1,
  });

  useEffect(() => {
    // Refetch role if token changes
    if (token) {
      refetch();
    }
  }, [token, refetch]);

  // Immediate redirect if no token
  if (!token) {
    useEffect(() => {
      toast.error("Please login to access this page");
    }, []);
    return <Navigate to="/login" replace />;
  }

  // Loading state with better UX
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <CircularProgress size={80} thickness={4} />
        <p className="text-lg text-gray-600">Verifying your permissions...</p>
      </div>
    );
  }

  // Error state handling
  if (isError) {
    useEffect(() => {
      toast.error(
        error.response?.data?.message ||
          "Session verification failed. Please login again."
      );
    }, [error]);

    return <Navigate to="/login" replace />;
  }

  // Role verification
  if (allowedRole && !allowedRole.includes(role)) {
    useEffect(() => {
      toast.error(`Access restricted to: ${allowedRole.join(", ")}`);
    }, [allowedRole]);

    return <Navigate to="/unauthorized" replace />;
  }

  // All checks passed - render protected content
  return <Outlet />;
};

export default ProtectedRoute;
