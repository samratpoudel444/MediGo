import RedisClient from "../helper/redisHelper";




export const userConnection = (io) => {
  io.on("connection", (socket) => {
    console.log(" User connected:", socket.id);

    io
    RedisClient.set("");

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
