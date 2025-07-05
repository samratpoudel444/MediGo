import { Server } from "socket.io";
import http from "http";
import express from "express";
import { userConnection } from "./userConnectionAndDisconnection.js";

const app = express();
const server = http.createServer(app); // Create HTTP server

const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "http://localhost:3000",
]; // Added 3000

const io = new Server(server, {
  // Attach to HTTP server
  cors: {
    origin: allowedOrigins, // Simplified origin check
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000, // 2 minutes
    skipMiddlewares: true,
  },
});

// Start server on port 1000
server.listen(1000, () => {
  console.log("Socket.IO server running on port 1000");
});

userConnection(io);

export default io;
