import React, { useState,useEffect } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import MessageBar from "./MessageBar";
import SendMessage from "./SendMessage";
import { connectSocket, disconnectSocket } from "../utils/SocketInitialize";
import { useLocation } from "react-router-dom";
useLocation

const ChatApp = () => {
    const location = useLocation;
  const[selectedUser, setSelectedUser]= useState(location.state || "" )
  const [message, setMessage]= useState([]);


  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-80 h-full fixed left-0 top-0 z-40 bg-white">
        <SideBar onSelectUser={setSelectedUser} selectedUser={selectedUser} />
      </div>

      <div className="ml-80 flex flex-col flex-1 h-full">
        <div className="h-16  bg-white border">
          <TopBar
            firstName={selectedUser?.firstName || ""}
            lastName={selectedUser?.lastName || ""}
          />
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 bg-gray-100 border">
            <MessageBar userId={selectedUser?._id || ""} />
          </div>

          <div className="h-20  bg-white p-4 border">
            <SendMessage userId={selectedUser?._id || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
