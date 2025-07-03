import express from "express";
import { getDoctorProfile } from "../../controllers/doctorController/getMyProfile.js";
const doctorRouter = express.Router();

doctorRouter.route("/getDoctorProfile").get(getDoctorProfile);

export default doctorRouter;
