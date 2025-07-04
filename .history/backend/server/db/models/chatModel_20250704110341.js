import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  senderId: {},
  recieverId: {},
  content: {},
  timeStamp:{}
});