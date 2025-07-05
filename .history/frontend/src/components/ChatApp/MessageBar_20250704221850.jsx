import { useQuery } from "@tanstack/react-query";
import { getSocket } from "../utils/SocketInitialize.jsx";
import axiosInstance from "../utils/AxiosInstance.jsx";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const MessageBar = ({ userId }) => {
  const [liveMessages, setLiveMessages] = useState([]);

  useEffect(() => {
    setLiveMessages([]);
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const socket = getSocket();
    socket.on("message", (newMessage) => {
      setLiveMessages((prev) => [...prev, newMessage]);
      toas
    });

    return () => {
      socket.off("message");
    };
  }, [userId]);

  const getChatData = async () => {
    try {
      const response = await axiosInstance.get(
        `api/v1/getAllMessage/${userId}`
      );
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const { data = {} } = useQuery({
    queryFn: getChatData,
    queryKey: ["chatMessages", userId],
    enabled: !!userId,
  });

  // Combine fetched messages with live messages
  const combinedMessages = [...(data?.messages || []), ...liveMessages];

  // Deduplicate messages by _id to avoid duplicates
  const uniqueMessagesMap = new Map();
  combinedMessages.forEach((msg) => {
    uniqueMessagesMap.set(msg._id.toString(), msg);
  });
  const uniqueMessages = Array.from(uniqueMessagesMap.values());

  if (!userId) {
    return (
      <div className="text-2xl flex flex-row justify-center items-center h-full">
        Please Select a User from SideBar......
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {uniqueMessages.map((msg) => (
        <div
          key={msg._id}
          className={`p-3 rounded-lg max-w-xs break-words ${
            (msg.senderId !== userId && msg.recieverId !== userId) ||
            (msg.recieverId === userId && msg.senderId !== userId)
              ? "bg-blue-200 ml-auto"
              : "bg-gray-200 mr-auto"
          }`}
        >
          <p className="text-base leading-snug">{msg.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageBar;
