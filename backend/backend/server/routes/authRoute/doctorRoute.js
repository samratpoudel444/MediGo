import express from "express";
import { getDoctorProfile } from "../../controllers/doctorController/getProfileDetails.js";
const doctorRouter = express.Router();

doctorRouter.route("/getDoctorProfile").get(getDoctorProfile);

export default doctorRouter;
