import express from "express";
import { getUserDetails } from "../../controllers/userController/getUserDetails.js";

const userRouter = express.Router();

userRouter.route("/getUserDetails").get(getUserDetails);

export default userRouter;
