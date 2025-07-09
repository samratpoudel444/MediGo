import express from "express";
import { getMyDetails } from "../../controllers/patientController/getPatientDetails.js";
import { authMiddleware, isPatient } from "../../middleware/authMiddleware.js";
import { editPatientDetails } from "../../controllers/patientController/editPatientDetails.js";


const userRouter = express.Router();

userRouter.route("/getMyDetails").get(authMiddleware, isPatient, getMyDetails); //to get your own details from middleware
userRouter.route("/updateDetails").put(authMiddleware, isPatient, editPatientDetails);

export default userRouter;
