import express from "express";
import getAllUser from "../controllers/chatController.js/getAllChatUser.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const chatRouter= express.Router();

chatRouter.route('/getAllChatUser').get(authMiddleware, getAllUser);


export default chatRouter;