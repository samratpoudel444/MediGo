import express from "express";
import { getMyDetails } from "../../controllers/userController/getUserDetails.js";
import { authMiddleware, isPatient } from "../../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.route("/getMyDetails").get(authMiddleware, isPatient, getMyDetails); //to get your own details from middleware

export default userRouter;
