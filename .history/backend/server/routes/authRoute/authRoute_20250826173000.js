import { signInUsers } from "../../controllers/userAuthController/signInUser.js";
import { signUpUser } from "../../controllers/userAuthController/signUpUser.js";
import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { getRole } from "../../controllers/userAuthController/getRole.js";
import { signOut } from "../../controllers/userAuthController/signOut.js";
import { changePassword } from "../../controllers/userAuthController/changePassword.js";
import forgotPassword from "../../controllers/userAuthController/forgotPassword.js";
import VerifyOtp from "../../controllers/userAuthController/verfiyOTP.js";
VerifyOtp


const authRouter = express.Router();

authRouter.route("/registerUser").post(signUpUser);
authRouter.route("/signInUsers").post(signInUsers);
authRouter.route("/testRole").get(authMiddleware, getRole);
authRouter.route("/signOutUsers").delete(authMiddleware, signOut);
authRouter.route("/changePassword/:id").patch(authMiddleware, changePassword);
authRouter.route("/forgotPassword").post(forgotPassword);
authRouter.route("/verifyOTP").post(VerifyOtp);
authRouter.route("/changePassword").patch( changePassword);


export default authRouter;
