import { useQuery } from "@tanstack/react-query";
import { getSocket } from "../utils/SocketInitialize.jsx";
import axiosInstance from "../utils/AxiosInstance.jsx";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const MessageBar = ({ userId }) => {
    const [liveMessages, setLiveMessages] = useState([]);
    console.log("the live message", liveMessages);

    useEffect(() => {
        setLiveMessages([]);
    }, [userId]);

    useEffect(() => {
        if (!userId) return;

        const socket = getSocket();
        console.log(socket)
        const handleMessage = (newMessage) => {
            if (newMessage?.content) {
                setLiveMessages((prev) => [...prev, newMessage]);

            }
        };

        socket.on("connect", () => {
          console.log("Socket.IO connected!");
        });

        socket.on("connect_error", (err) => {
          console.log("Socket.IO connection error:", err);
        });
        
        socket.on("chat-message", handleMessage);

        return () => {
            socket.off("chat-message", handleMessage);
        };
    }, [userId]);

    const getChatData = async () => {
        try {
            const response = await axiosInstance.get(
                `/api/v1/getAllMessage/${userId}`
            );
            return response.data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const { data = {} } = useQuery({
        queryFn: getChatData,
        queryKey: ["chatMessages", userId],
        enabled: !!userId,
    });

    const combinedMessages = [...(data?.messages || []), ...liveMessages];
    const uniqueMessages = combinedMessages.filter(
        (msg, index, self) => 
            index === self.findIndex((m) => (
                m._id === msg._id || 
                (m.content === msg.content && m.timestamp === msg.timestamp)
            ))
    );

    if (!userId) {
        return (
            <div className="text-2xl flex flex-row justify-center items-center h-full">
                Please Select a User from SideBar......
            </div>
        );
    }

    return (
        <div className="space-y-2 flex f">
            {uniqueMessages.map((msg) => (
                <div
                    key={msg._id || `${msg.content}-${msg.timestamp}`}
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