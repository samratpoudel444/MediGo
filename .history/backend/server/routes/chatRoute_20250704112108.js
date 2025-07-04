import express from "express";
import getAllUser from "../controllers/chatController.js/getAllChatUser";
import { authMiddleware } from "../middleware/authMiddleware";

const chatRouter= express.Router();

chatRouter.route('/getAllChatUser').get(authMiddleware, getAllUser);