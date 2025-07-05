import io from "socket.io-client";

// Singleton socket instance
let socket = null;
let isConnecting = false;
const SOCKET_URL = "http://localhost:1000";

export const connectSocket = () => {
  // Prevent multiple connection attempts
  if (socket || isConnecting) return;

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token available");
    return;
  }

  isConnecting = true;

  socket = io(SOCKET_URL, {
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    auth: { token },
    timeout: 15000,
  });

  // Event handlers
  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
    isConnecting = false;
  });

  socket.on("connect_error", (err) => {
    console.error("Connection error:", err.message);
    isConnecting = false;
    setTimeout(connectSocket, 2000); // Auto-reconnect
  });

  socket.on("disconnect", (reason) => {
    console.log("Disconnected:", reason);
    if (reason === "io server disconnect") {
      setTimeout(connectSocket, 5000); // Reconnect after server disconnect
    }
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
    console.log("Socket fully disconnected");
  }
};

export const getSocket = () => {
  if (!socket) {
    console.warn("Socket not initialized. Call connectSocket() first.");
  }
  return socket;
};


const token = localStorage.getItem("token");
if (token) {
  connectSocket();
}
