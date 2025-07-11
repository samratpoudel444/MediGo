import { signInUsers } from "../../controllers/userAuthController/signInUser.js";
import { signUpUser } from "../../controllers/userAuthController/signUpUser.js";
import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { getRole } from "../../controllers/userAuthController/getRole.js";
import { signOut } from "../../controllers/userAuthController/signOut.js";

const authRouter = express.Router();

authRouter.route("/registerUser").post(signUpUser);
authRouter.route("/signInUsers").post(signInUsers);
authRouter.route("/testRole").get(authMiddleware, getRole);
authRouter.route("/signOutUsers").delete(authMiddleware, signOut);
authRouter.route("/changePassword").patch(authMiddleware, )

export default authRouter;
