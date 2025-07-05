import {Server} from 'socket.io';
import express from "express";
import http from 'http' ;
import { userConnection } from './userConnectionAndDisconnection.js';

const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "http://localhost:3000",
];

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin:"*" ,
    // origin: function (origin, callback) {
    //   if (allowedOrigins.indexOf(origin) !== -1) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error("Not allowed by CORS"));
    //   }
    // },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});

userConnection(io)
server.listen(1000, () => {
  console.log("Socket.IO server running on port 1000");
});
 
export default io;