import React from "react";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import image from "../../assets/MEDIGO.png";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";

async function fetchChatUsers() {
  try {
    const response = await axiosInstance.get("/api/v1/getAllChatUser");
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch users");
  }
}

const SideBar = ({ onSelectUser, selectedUser }) => {
  const {
    data = [],
    isError,
    isLoading,
    error,
  } = useQuery({
    queryFn: fetchChatUsers,
    queryKey: ["AllChatUser"],
  });

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col h-full">
      {/* Fixed top section */}
      <div className="py-2">
        <Button className="w-full">
          <HomeIcon /> &nbsp; Back to home
        </Button>
        <h1 className="text-2xl text-center font-bold mt-2">Chat App</h1>
      </div>

      {/* Scrollable user list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {data.map((user) => (
          <div
            key={user.id}
            onClick={() => onSelectUser(user)}
            className="bg-gray-100 p-2 rounded hover:bg-gray-200 cursor-pointer flex gap-5 text-center"
          >
            <img
              src={image}
              className="w-10 h-10 rounded-full"
              alt={user.name}
            />
            <span className="mt-2">{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
