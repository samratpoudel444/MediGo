import { useEffect } from "react";
import io from "socket.io-client";

let socket;

export const connectSocket = () => {
  const token = localStorage.getItem("token");

  if (!socket && token) {
    socket = io("http://localhost:1000", {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      auth: {
        token: token,
      },
      timeout: 10000,
    });

    // Corrected console.log spelling and added more event listeners
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("Socket disconnected and cleaned up");
  }
};

export const getSocket = () => socket;

// Custom hook for components that need socket connection
export const useSocket = () => {
  useEffect(() => {
    connectSocket();

    return () => {
      // Don't disconnect here - let App component handle it
      // This prevents disconnecting when unmounting a component
      // while the socket is still needed elsewhere
    };
  }, []);

  return getSocket();
};
