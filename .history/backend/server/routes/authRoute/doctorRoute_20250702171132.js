import express from "express";
import { getDetails } from "../../controllers/doctorController/getProfileDetails.js";


const doctorRouter = express.Router();

doctorRouter.route("/getDoctorProfile").get(getDoctorProfile);

export default doctorRouter;
