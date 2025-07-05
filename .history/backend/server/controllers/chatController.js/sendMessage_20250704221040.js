import chatTable from "../../db/models/chatModel.js";
import io from "../../socketIo/initializeSocket.js";
import RedisClient from "../../helper/redisHelper.js";

export const sendMessage = async (req, res, next) => {
  try {
    const senderId = req.user.id;
    const recieverId = req.params.recieverId;
    const { message } = req.body;

    // Validate message content
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: "Invalid message content" });
    }

    // Save message to database
    const newMessage = await chatTable.create({
      senderId,
      recieverId,
      content: message,
      timestamp: new Date()
    });

    // Get receiver's socket ID
    const socketId = await RedisClient.get(recieverId);

    // Send real-time message if receiver is connected
    if (socketId) {
      io.to(socketId).emit("message", {
        _id: newMessage._id,
        content: message,  // Changed from 'message' to 'content' to match frontend
        senderId,
        recieverId,
        timestamp: newMessage.timestamp
      });
    }

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage
    });

  } catch (err) {
    console.error("Message send error:", err);
    return res.status(err.status || 500).json({
      error: err.message || "Internal server error"
    });
  }
};