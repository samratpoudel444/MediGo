import RedisClient from "../helper/redisHelper.js";
import { authenticateSocket } from "../middleware/socketAuthMiddleware.js";


   io.use(authenticateSocket);

export const userConnection = (io) => {
   
  io.on("connection", (socket) => {
    console.log(" User connected:", socket.id);

  
    console.log("The", socket.user)
     RedisClient.set();

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
