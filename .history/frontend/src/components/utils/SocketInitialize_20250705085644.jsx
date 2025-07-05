import { io } from "socket.io-client";

let socket = null;
let connectionPromise = null;

export const initializeSocket = () => {
  if (socket) return socket;

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token available");
  }

  connectionPromise = new Promise((resolve, reject) => {
    socket = io("http://localhost:1000", {
      transports: ["websocket"],
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 5000,
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      resolve(socket);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
      reject(err);
    });
  });

  return connectionPromise;
};

export const getSocket = async () => {
  if (socket?.connected) return socket;
  return await connectionPromise;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    connectionPromise = null;
  }
};

export const onSocketEvent = (event, callback) => {
  getSocket().then((s) => s.on(event, callback));
};

export const offSocketEvent = (event, callback) => {
  getSocket().then((s) => s.off(event, callback));
};

export const emitSocketEvent = (event, data) => {
  getSocket().then((s) => s.emit(event, data));
};
