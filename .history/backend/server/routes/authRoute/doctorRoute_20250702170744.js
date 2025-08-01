import express from "express";
import { getDoctorProfile } from "../../controllers/doctorController/getProfileDetails.js";
const doctorRouter = express.Router();

doctorRouter.route("/getMtProfile").get(getDoctorProfile);

export default doctorRouter;
