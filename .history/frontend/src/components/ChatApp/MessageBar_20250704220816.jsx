import { useQuery } from "@tanstack/react-query";
import { getSocket } from "../utils/SocketInitialize";
import axiosInstance from "../utils/AxiosInstance";
import { useState, useEffect, useMemo } from "react";

const MessageBar = ({ userId, currentUserId }) => {
  const [liveMessages, setLiveMessages] = useState([]);

  // Socket connection and message handling
  useEffect(() => {
    if (!userId) return;

    const socket = getSocket();

    const handleNewMessage = (newMessage) => {
      if (newMessage?.content && newMessage.recieverId === currentUserId) {
        setLiveMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("message", handleNewMessage);

    return () => {
      socket.off("message", handleNewMessage);
    };
  }, [userId, currentUserId]);

  // Fetch chat history
  const {
    data = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["chatMessages", userId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/api/v1/getAllMessage/${userId}`
      );
      return response.data;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  // Combine and sort messages
  const combinedMessages = useMemo(() => {
    return [...(data?.messages || []), ...liveMessages].sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );
  }, [data.messages, liveMessages]);

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-full text-2xl text-gray-500">
        Please select a user from the sidebar
      </div>
    );
  }

  if (isLoading)
    return <div className="flex justify-center p-4">Loading messages...</div>;
  if (isError)
    return (
      <div className="flex justify-center p-4 text-red-500">
        Error loading messages
      </div>
    );

  return (
    <div className="space-y-2 overflow-y-auto p-4 h-full">
      {combinedMessages.map((msg) => (
        <div
          key={msg._id || msg.timestamp}
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
