import express from "express";
import { getDetails } from "../../controllers/doctorController/getProfileDetails.js";
getDo

const doctorRouter = express.Router();

doctorRouter.route("/getDoctorProfile").get(isDoctor, getDetails);

export default doctorRouter;
