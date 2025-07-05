import io from "socket.io-client";

let socket = null;
const SERVER_URL = "http://localhost:1000";

export const connectSocket = () => {
  // Clear existing connection
  if (socket) {
    socket.disconnect();
    socket = null;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No authentication token found");
    return;
  }

  socket = io(SERVER_URL, {
    transports: ["websocket"],
    auth: { token },
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    forceNew: true,
    withCredentials: true,
    path: "/socket.io/",
    secure: process.env.NODE_ENV === "production",
  });

  // Debugging events
  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("Connection error:", err.message);
    setTimeout(() => socket.connect(), 5000);
  });

  socket.on("disconnect", (reason) => {
    console.log("Disconnected:", reason);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
