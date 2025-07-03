import express from "express";
import { getMyDetails } from "../../controllers/doctorcontr/getPatientDetails";


const doctorRouter = express.Router();

doctorRouter.route("/getDoctorProfile").get(getDoctorProfile);

export default doctorRouter;
