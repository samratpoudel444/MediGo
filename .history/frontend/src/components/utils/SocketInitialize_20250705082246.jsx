import io from "socket.io-client";

let socket;

export const connectSocket = () => {
  const token = localStorage.getItem("token");

  // Only connect if not already connected and token exists
  if (!socket && token) {
    socket = io("http://localhost:1000", {
      transports: ["websocket"], // Try with just websocket first
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      auth: {
        token: token,
      },
      timeout: 10000, // increased timeout
    });

    // Add event listeners for debugging
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected:", reason);
    });
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("Socket disconnected");
  }
};

export const getSocket = () => {
  return socket;
};
