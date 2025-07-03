import express from "express";
import { getDetails } from "../../controllers/doctorController/getProfileDetails.js";


const doctorRouter = express.Router();

doctorRouter.route("/getDoctorProfile").get(isDocgetDetails);

export default doctorRouter;
