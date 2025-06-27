import {Server} from 'socket.io';
import express from "express";
import http from 'http' ;
import { userConnection } from './userConnectionAndDisconnection';


const io = new Server(1000, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});

userConnection(io)

module.exports={io};