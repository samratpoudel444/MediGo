import { Server } from "socket.io";
import http from "http";
import express from "express";
import { userConnection } from "./userConnectionAndDisconnection.js";

const app = express();
const server = http.createServer(app);
const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "http://localhost:3000",
]; 

const io = new Server(server, {

  cors: {
    origin: allowedOrigins, 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000, 
    skipMiddlewares: true,
  },
});


server.listen(1000, () => {
  console.log("Socket.IO server running on port 1000");
});

userConnection(io);

export default io;
