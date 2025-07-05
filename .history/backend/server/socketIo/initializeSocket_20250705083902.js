import { Server } from "socket.io";
import http from "http";
import express from "express";
import jwt from "jsonwebtoken";
import RedisClient from "./helper/redisHelper.js";

const app = express();
const server = http.createServer(app);

// Configure CORS properly
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    methods: ["GET", "POST"],
    credentials: true,
    transports: ["websocket"],
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000, // 2 minutes
    skipMiddlewares: false,
  },
});

// Enhanced authentication middleware
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) throw new Error("No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = {
      id: decoded.id,
      role: decoded.role,
    };

    console.log(`Authenticated user ${decoded.id}`);
    next();
  } catch (err) {
    console.error("Socket auth failed:", err.message);
    next(new Error("Authentication failed"));
  }
});

// Connection handling with Redis
io.on("connection", async (socket) => {
  console.log(`New connection: ${socket.id} (User: ${socket.user.id})`);

  try {
    // Store connection in Redis with 24h TTL
    await RedisClient.set(`socket:${socket.user.id}`, socket.id, "EX", 86400);

    socket.on("disconnect", async (reason) => {
      console.log(`Disconnected ${socket.id} (${reason})`);
      await RedisClient.del(`socket:${socket.user.id}`);
    });

    socket.on("error", (err) => {
      console.error(`Socket error (${socket.id}):`, err);
    });
  } catch (err) {
    console.error("Redis operation failed:", err);
    socket.disconnect(true);
  }
});

server.listen(1000, () => {
  console.log("✅ Socket.IO server running on port 1000");
});

export default io;
