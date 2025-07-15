import express from "express";
import { getDetails } from "../../controllers/doctorController/getProfileDetails.js";
import { authMiddleware, isDoctor } from "../../middleware/authMiddleware.js";
import { getAllAppointments } from "../../controllers/doctorController/getAllAppointments.js";
import { getAllPatients } from "../../controllers/adminController.js/getAllPatients.js";


const doctorRouter = express.Router();

doctorRouter.route("/getDoctorProfile").get(authMiddleware, isDoctor, getDetails);
doctorRouter
  .route("/getAllDoctorAppointments")
  .get(authMiddleware, isDoctor, getAllAppointments);
  doctorRouter
    .route("/getAllDoctorAppointments")
    .get(authMiddleware, isDoctor, getAllPatients);

export default doctorRouter;
