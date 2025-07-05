import React, { useState, useEffect } from "react";
import {
  initializeSocket,
  getSocket,
  onSocketEvent,
  offSocketEvent,
} from "../services/socketService";
import SideBar from "./SideBar";
import MessageBar from "./MessageBar";
import SendMessage from "./SendMessage";

const ChatApp = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [socketStatus, setSocketStatus] = useState("disconnected");
  const [socketInstance, setSocketInstance] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const socket = await initializeSocket();
        setSocketInstance(socket);
        setSocketStatus("connected");

        socket.on("disconnect", () => {
          setSocketStatus("disconnected");
        });

        socket.on("reconnect", () => {
          setSocketStatus("connected");
        });
      } catch (error) {
        console.error("Socket initialization failed:", error);
        setSocketStatus("error");
      }
    };

    init();

    return () => {
      if (socketInstance) {
        socketInstance.off("disconnect");
        socketInstance.off("reconnect");
      }
    };
  }, []);

  return (
    <div className="chat-container">
      <div className="sidebar">
        <SideBar onSelectUser={setSelectedUser} socketStatus={socketStatus} />
      </div>

      <div className="chat-area">
        {selectedUser ? (
          <>
            <MessageBar userId={selectedUser._id} socket={socketInstance} />
            <SendMessage userId={selectedUser._id} socket={socketInstance} />
          </>
        ) : (
          <div className="no-user-selected">
            Please select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
