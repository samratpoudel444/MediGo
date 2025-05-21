import { signInUsers } from "../../controllers/userAuthController/signInUser.js";
import { signUpUser } from "../../controllers/userAuthController/signUpUser.js";
import express from "express";
const authRouter = express.Router();

authRouter.route("/registerUser").post(signUpUser);
authRouter.route("/signInUsers").post(signInUsers);

export default authRouter;
