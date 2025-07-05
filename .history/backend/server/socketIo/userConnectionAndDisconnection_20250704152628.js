import RedisClient from "../helper/redisHelper";




export const userConnection = (io) => {
  io.on("connection", (socket) => {
    console.log(" User connected:", socket.id);
    RedisClient;
    
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
