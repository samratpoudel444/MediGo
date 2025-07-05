import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import MessageBar from "./MessageBar";
import SendMessage from "./SendMessage";
import { connectSocket, getSocket } from "../utils/SocketInitialize";

const ChatApp = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  // Initialize socket connection
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      connectSocket();

      const socket = getSocket();
      if (socket) {
        socket.on("connect", () => {
          setIsSocketConnected(true);
          console.log("Socket connected in ChatApp");
        });

        socket.on("disconnect", () => {
          setIsSocketConnected(false);
        });
      }
    }

    return () => {
      const socket = getSocket();
      if (socket) {
        socket.off("connect");
        socket.off("disconnect");
      }
      // Note: We don't disconnect here to maintain connection across app
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 h-full fixed left-0 top-0 z-40 bg-white">
        <SideBar
          onSelectUser={setSelectedUser}
          selectedUser={selectedUser}
          isConnected={isSocketConnected}
        />
      </div>

      {/* Main Chat Area */}
      <div className="ml-80 flex flex-col flex-1 h-full">
        {/* Top Bar */}
        <div className="h-16 bg-white border">
          <TopBar
            firstName={selectedUser?.firstName || ""}
            lastName={selectedUser?.lastName || ""}
            connectionStatus={isSocketConnected ? "online" : "offline"}
          />
        </div>

        {/* Messages Area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 bg-gray-100 border">
            {selectedUser ? (
              <MessageBar userId={selectedUser._id} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Select a user to start chatting</p>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="h-20 bg-white p-4 border">
            {selectedUser && (
              <SendMessage
                userId={selectedUser._id}
                disabled={!isSocketConnected}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
