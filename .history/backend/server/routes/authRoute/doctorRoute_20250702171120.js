import express from "express";
import { getMyDetails } from "../../controllers/doctorController/";


const doctorRouter = express.Router();

doctorRouter.route("/getDoctorProfile").get(getDoctorProfile);

export default doctorRouter;
