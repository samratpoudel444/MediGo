import RedisClient from "../helper/redisHelper.js";
import { authenticateSocket } from "../middleware/socketAuthMiddleware.js";




export const userConnection = (io) => {
  io.on("connection", (socket) => {
    console.log(" User connected:", socket.id);

    io.use(authenticateSocket)
    // RedisClient.set("");

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
