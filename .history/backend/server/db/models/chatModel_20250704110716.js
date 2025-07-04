import mongoose from "mongoose";
import ChatApp from "../../../../frontend/src/components/ChatApp/ChatApp";

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
    type: String,
    required:true,
    trim:true
  },
});

const chatTable =  mongoose.model("chat", chatSchema);


export default chat;