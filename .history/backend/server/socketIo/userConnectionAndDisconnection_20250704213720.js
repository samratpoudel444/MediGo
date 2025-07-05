import RedisClient from "../helper/redisHelper.js";
import { authenticateSocket } from "../middleware/socketAuthMiddleware.js";


   

export const userConnection = (io) => {
   io.use(authenticateSocket);
  io.on("connection", (socket) => {
    console.log(" User connected:", socket.id);

  
    console.log("The", socket.user)
     RedisClient.set(`socket.user`, socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
