export const connectSocket = () => {
  const token = localStorage.getItem("token");

  // Only connect if not already connected and token exists
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

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });
  }
};
