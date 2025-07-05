import RedisClient from "../helper/redisHelper.js";
import { authenticateSocket } from "../middleware/socketAuthMiddleware.js";


   

export const userConnection = async(io) => {
   io.use(authenticateSocket);
  io.on("connection", (socket) => {
    console.log(" User connected:", socket.id);

     await RedisClient.set(`${socket.user}`, socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
       RedisClient.del(`${socket.user}`);

    });
  });
};
