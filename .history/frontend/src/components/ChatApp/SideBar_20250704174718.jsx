import React from "react";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import image from "../../assets/MEDIGO.png";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
Lin
async function fetchChatUsers() {
  try {
    const response = await axiosInstance.get("/api/v1/getAllChatUser");
    if (!response.data.success) {
      throw new Error("Failed to fetch users");
    }
    return response.data.users; // Return just the users array
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch users");
  }
}

const SideBar = ({ onSelectUser, selectedUser }) => {
  const {
    data ,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryFn: fetchChatUsers,
    queryKey: ["AllChatUser"],
  });


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4">
        <Alert severity="error">{error.message}</Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="py-2">
        <Link to="/home">
          <Button className="w-full">
            <HomeIcon /> &nbsp; Back to home
          </Button>
        </Link>

        <h1 className="text-2xl text-center font-bold mt-2">Chat App</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {data.map((user) => (
          <div
            key={user.id}
            onClick={() => onSelectUser(user)}
            className={`bg-gray-100 p-2 rounded hover:bg-gray-200 cursor-pointer flex gap-5 text-center ${
              selectedUser?.id === user.id ? "bg-blue-100" : ""
            }`}
          >
            <img
              src={user.profileImage || image}
              className="w-10 h-10 rounded-full"
              alt={user}
              onError={(e) => {
                e.target.src = image;
              }}
            />
            <span className="mt-2">{user.firstName + " " + user.lastName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
