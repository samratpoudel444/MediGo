import chatTable from "../../db/models/chatModel.js";
import { authenticateSocket } from "../../middleware/socketAuthMiddleware.js";
import io from "../../socketIo/initializeSocket.js";
import RedisClient from "../../helper/redisHelper.js";

export const sendMessage = async (req, res, next) => {
  try {
    const senderId = req.user.id;
    const recieverId = req.params.recieverId;
    const message = req.body.message;

    if (!message) {
      return res.status(400).json("Message content is required");
    }

    const sendMessages = await chatTable.insertOne({
      senderId: senderId,
      recieverId: recieverId,
      content: message,
    });

    const socketId = await RedisClient.get(`${recieverId}`);

    if (socketId) {
      io.to(socketId).emit("message", {
        _id: sendMessages._id,
        content: message,
        senderId,
        recieverId,
        timestamp: sendMessages.timestamp,
      });
    }

    return res.status(201).json("message Sent Successfully");
  } catch (err) {
    console.log(err);
    return next({
      status: err.status || 500,
      message: err.message || "Internal Server Error",
    });
  }
};
