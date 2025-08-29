import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "./utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useMemo } from "react";

const getRole = async () => {
  try {
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

    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: true,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const isRoleAllowed = useMemo(() => {
    if (!allowedRole || !role) return true;
    return allowedRole.includes(role);
  }, [allowedRole, role]);

  // Refetch when token changes
  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token, refetch]);

  // Handle toast side effects in one place
  useEffect(() => {
    if (!token) {
      toast.error("Please login to access this page");
    } else if (isError) {
      toast.error(
        error?.response?.data?.message ||
          "Session verification failed. Please login again."
      );
    } else if (allowedRole && !isRoleAllowed) {
      toast.error(`Access restricted to: ${allowedRole.join(", ")}`);
    }
  }, [token, isError, error, allowedRole, isRoleAllowed]);

  // Redirect logic
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <CircularProgress size={80} thickness={4} />
      </div>
    );
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && !isRoleAllowed) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
