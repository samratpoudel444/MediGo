import express from "express";
import getAllUser from "../controllers/chatController.js/getAllChatUser.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { sendMessage } from "../controllers/chatController.js/sendMessage.js";

const chatRouter= express.Router();

chatRouter.route('/getAllChatUser').get(authMiddleware, getAllUser);
chatRouter.route("/sendMessage/:recieverId").get(authMiddleware, sendMessage);

export default chatRouter;