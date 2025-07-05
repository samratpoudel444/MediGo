import chatTable from "../../db/models/chatModel.js";
import io from "../../socketIo/initializeSocket.js";
import RedisClient from "../../helper/redisHelper.js";

export const sendMessage = async (req, res, next) => {
  try {
    const { id: senderId } = req.user;
    const { receiverId } = req.params;
    const { message } = req.body;

    // Validate input
    if (!message?.trim() || !receiverId) {
      return res.status(400).json({
        success: false,
        error: "Message and receiverId are required",
      });
    }

    // Create message in database
    const newMessage = await chatTable.create({
      senderId,
      receiverId,
      content: message.trim(),
      status: "delivered",
    });

    // Get receiver's socket ID from Redis
    const receiverSocketId = await RedisClient.get(`socket:${receiverId}`);

    // Emit message if receiver is online
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("new_message", {
        id: newMessage._id,
        senderId,
        content: newMessage.content,
        timestamp: newMessage.createdAt,
      });
    }

    // Also notify sender that message was delivered
    const senderSocketId = await RedisClient.get(`socket:${senderId}`);
    if (senderSocketId) {
      io.to(senderSocketId).emit("message_delivered", {
        messageId: newMessage._id,
        receiverId,
        timestamp: new Date(),
      });
    }

    return res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (err) {
    console.error("Message sending failed:", err);
    return next({
      status: err.status || 500,
      message: err.message || "Message sending failed",
    });
  }
};
