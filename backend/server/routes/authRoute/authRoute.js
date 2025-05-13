import { signUpUser } from "../../controllers/userAuthController/signUpUser.js";
import express from "express";
const authRouter= express.Router();


authRouter.route('/registerUser').post(signUpUser);



export default authRouter;