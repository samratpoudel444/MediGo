export const connectSocket = () => {
  const token = localStorage.getItem("token");

  socket = io("http://localhost:1000", {
    transports: ["websocket", "polling"],
    reconnection: true,
    auth: { token },
    timeout: 5000,
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connect error:", err.message);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });
};
