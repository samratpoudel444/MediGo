import {Server} from 'socket.io';
import express from "express";
import http from 'http' ;
// import { userConnection } from './userConnectionAndDisconnection';

const allowedOrigins = ["http://localhost:5174", "http://localhost:5173"];
const io = new Server(5000, {
  cors: {
    	  origin: function (origin, callback) {

        if (allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
     },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});

// userConnection(io);

module.exports=io;