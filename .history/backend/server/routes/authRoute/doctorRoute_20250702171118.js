import express from "express";
import { getMyDetails } from "../../controllers/doctorController/getPatientDetails";


const doctorRouter = express.Router();

doctorRouter.route("/getDoctorProfile").get(getDoctorProfile);

export default doctorRouter;
