import { useQuery } from "@tanstack/react-query";
import { getSocket } from "../utils/SocketInitialize";
import axiosInstance from "../utils/AxiosInstance";
import { useState, useEffect } from "react";

const MessageBar = ({ userId, currentUserId }) => {
  // Add currentUserId prop
  const [liveMessages, setLiveMessages] = useState([]);

  useEffect(() => {
    const socket = getSocket();
    if (!userId) return;

    const handleNewMessage = (newMessage) => {
      // Validate message structure
      if (
        newMessage?.content &&
        (newMessage.senderId === userId || newMessage.recieverId === userId)
      ) {
        setLiveMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("message", handleNewMessage);

    return () => {
      socket.off("message", handleNewMessage);
    };
  }, [userId]);

  const getChatData = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/getAllMessage/${userId}`
      );
      return response.data;
    } catch (err) {
      console.error("Fetch error:", err);
      throw err;
    }
  };

  const { data = {} } = useQuery({
    queryFn: getChatData,
    queryKey: ["chatMessages", userId],
    enabled: !!userId,
  });

  const combinedMessages = [...(data?.messages || []), ...liveMessages].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  if (!userId) {
    return (
      <div className="text-2xl flex justify-center items-center h-full">
        Please select a user from the sidebar
      </div>
    );
  }

  return (
    <div className="space-y-2 overflow-y-auto h-full p-4">
      {combinedMessages.map((msg) => (
        <div
          key={msg._id || msg.timestamp} // Fallback key
          className={`p-3 rounded-lg max-w-xs break-words ${
            msg.senderId === currentUserId
              ? "bg-blue-200 ml-auto"
              : "bg-gray-200 mr-auto"
          }`}
        >
          <p className="text-base leading-snug">{msg.content}</p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MessageBar;
