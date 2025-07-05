import RedisClient from "../helper/redisHelper.js";
import { authenticateSocket } from "../middleware/socketAuthMiddleware.js";


   

export const userConnection = (io) => {
   io.use(authenticateSocket);
  io.on("connection", (socket) => {
    console.log(" User connected:", socket.id);

      RedisClient.set(`${socket.user}`, socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
       RedisClient.del(`${socket.user}`);

    });

io.on("connection_error", (err) =>
  console.error("Socket.IO connection error:", err)
);
  });
};
