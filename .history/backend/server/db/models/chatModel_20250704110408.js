import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,},
  recieverId: {
     type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
  },
  content: {
    tyoe
  },
  timeStamp:{}
});