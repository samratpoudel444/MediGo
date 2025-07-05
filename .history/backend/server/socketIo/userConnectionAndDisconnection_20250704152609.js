redis


export const userConnection = (io) => {
  io.on("connection", (socket) => {
    console.log(" User connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
