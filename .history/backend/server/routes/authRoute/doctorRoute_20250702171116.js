import express from "express";
import { getMyDetails } from "../../controllers/doctorcontroller/getPatientDetails";


const doctorRouter = express.Router();

doctorRouter.route("/getDoctorProfile").get(getDoctorProfile);

export default doctorRouter;
