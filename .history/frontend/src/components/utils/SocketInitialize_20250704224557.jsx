import io from "socket.io-client";

let socket = null;

export const connectSocket = () => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    console.error("No token found in localStorage");
    return;
  }

  if (socket?.connected) {
    console.log("Socket already connected");
    return socket;
  }

  socket = io("http://localhost:1000", {
    transports: ["websocket"],
    auth: { token },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: true,
    withCredentials: true
  });

  // Add basic event listeners for debugging
  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("Connection error:", err.message);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.off("connect");
    socket.off("connect_error");
    socket.off("disconnect");
    socket.disconnect();
    socket = null;
    console.log("Socket disconnected and cleaned up");
  }
};

export const getSocket = () => {
  if (!socket) {
    console.warn("Socket not initialized. Call connectSocket() first");
  }
  return socket;
};