import { Server } from "socket.io";
import http from "http";
import express from "express";
import { userConnection } from "./userConnectionAndDisconnection.js";


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
  pingTimeout: 60000,
  pingInterval: 25000,
});

server.listen(1000, "0.0.0.0", () => {
  console.log("Socket.IO server running on port 1000");
});

// Apply your existing userConnection
userConnection(io);

export default io;
