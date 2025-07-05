import { useQuery } from "@tanstack/react-query";
import { getSocket } from "../utils/SocketInitialize";
import axiosInstance from "../utils/AxiosInstance";
import { useState, useEffect, useCallback } from "react";

const MessageBar = ({ userId }) => {
  const [liveMessages, setLiveMessages] = useState([]);
  const socket = getSocket();

  // Fetch initial messages
  const { data: chatData } = useQuery({
    queryKey: ["chatMessages", userId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/v1/getAllMessage/${userId}`);
      return res.data;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Handle incoming messages
  const handleNewMessage = useCallback(
    (message) => {
      if (message.senderId === userId || message.receiverId === userId) {
        setLiveMessages((prev) => [...prev, message]);
      }
    },
    [userId]
  );

  // Socket event listeners
  useEffect(() => {
    if (!socket || !userId) return;

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [socket, userId, handleNewMessage]);

  // Combine and dedupe messages
  const allMessages = [...(chatData?.messages || []), ...liveMessages].filter(
    (msg, index, self) =>
      index ===
      self.findIndex(
        (m) =>
          m._id === msg._id ||
          (m.content === msg.content && m.senderId === msg.senderId)
      )
  );

  if (!userId) {
    return (
      <div className="empty-chat-placeholder">
        Select a user to start chatting
      </div>
    );
  }

  return (
    <div className="message-container">
      {allMessages.map((msg) => (
        <div
          key={msg._id}
          className={`message-bubble ${
            msg.senderId === userId ? "sent" : "received"
          }`}
        >
          <p>{msg.content}</p>
          <span className="message-time">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MessageBar;
