import express from "express";
import { getDetails } from "../../controllers/doctorController/getProfileDetails.js";
import { authMiddleware, isDoctor } from "../../middleware/authMiddleware.js";
import { getAllAppointments } from "../../controllers/doctorController/getAllAppointments.js";
getAllAppointments

const doctorRouter = express.Router();

doctorRouter.route("/getDoctorProfile").get(authMiddleware, isDoctor, getDetails);

export default doctorRouter;
