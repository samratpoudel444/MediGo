import { Server } from "socket.io";
import http from "http";
import express from "express";
import { userConnection } from "./userConnectionAndDisconnection.js";


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }, // Allow all for testing
});

server.listen(1000, "0.0.0.0", () => {
  console.log("Socket.IO server running on port 1000");
});

// Apply your existing userConnection
userConnection(io);

export default io;
