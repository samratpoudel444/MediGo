import { useQuery } from "@tanstack/react-query";
import { getSocket } from "../utils/SocketInitialize.jsx";
import axiosInstance from "../utils/AxiosInstance.jsx";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const MessageBar = ({ userId }) => {
  const [liveMessages, setLiveMessages] = useState([]);

  // Get the existing socket instance instead of creating a new one
  const socket = getSocket();

  useEffect(() => {
    if (!socket || !userId) return;

    const handleNewMessage = (newMessage) => {
      // Only add messages relevant to this chat
      if (newMessage.senderId === userId || newMessage.receiverId === userId) {
        setLiveMessages((prev) => [...prev, newMessage]);
      }
    };

    // Set up event listeners
    socket.on("new_message", handleNewMessage);
    socket.on("notifications", (msg) => {
      toast.info(msg);
    });
    socket.on("chat-message", (msg) => {
      console.log(msg);
      toast.info(`${msg.remainderType} \n ${msg.message}`);
    });

    // Clean up listeners when component unmounts or userId changes
    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("notifications");
      socket.off("chat-message");
    };
  }, [socket, userId]);

  const getChatData = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/getAllMessage/${userId}`
      );
      return response.data;
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      throw err;
    }
  };

  const {
    data = {},
    isError,
    error,
  } = useQuery({
    queryFn: getChatData,
    queryKey: ["chatMessages", userId],
    enabled: !!userId,
  });

  // Show error if query fails
  useEffect(() => {
    if (isError) {
      toast.error(error.message || "Failed to load messages");
    }
  }, [isError, error]);

  // Combine and dedupe messages
  const combinedMessages = [...(data?.messages || []), ...liveMessages].filter(
    (msg, index, self) =>
      index ===
      self.findIndex(
        (m) =>
          m._id === msg._id ||
          (m.content === msg.content && m.timestamp === m.timestamp)
      )
  );

  if (!userId) {
    return (
      <div className="text-2xl flex flex-row justify-center items-center h-full">
        Please Select a User from SideBar......
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {combinedMessages.map((msg) => (
        <div
          key={msg._id || `${msg.content}-${msg.timestamp}`}
          className={`p-3 rounded-lg max-w-xs break-words ${
            msg.senderId === userId
              ? "bg-blue-200 ml-auto"
              : "bg-gray-200 mr-auto"
          }`}
        >
          <p className="text-base leading-snug">{msg.content}</p>
          {msg.timestamp && (
            <span className="text-xs text-gray-500 block mt-1">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageBar;
