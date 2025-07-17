import express from "express";
import { getDetails } from "../../controllers/doctorController/getProfileDetails.js";
import { authMiddleware, isDoctor } from "../../middleware/authMiddleware.js";
import { getAllAppointments } from "../../controllers/doctorController/getAllAppointments.js";
import { getAllPatients } from "../../controllers/adminController.js/getAllPatients.js";
import { getPrescriptionById } from "../../controllers/doctorController/getPrescriptionOfSpecificUser.js";
import { markAppointmentCompleted } from "../../controllers/appointmentController/markAppointmentCompleted.js";


const doctorRouter = express.Router();
getAllPatientByAge;

doctorRouter
  .route("/appointment/:id/completed")
  .put(authMiddleware, isDoctor, markAppointmentCompleted);
doctorRouter
  .route("/getPrescriptionById/:id")
  .get(authMiddleware, isDoctor, getPrescriptionById);
doctorRouter.route("/getDoctorProfile").get(authMiddleware, isDoctor, getDetails);
doctorRouter
  .route("/getAllDoctorAppointments")
  .get(authMiddleware, isDoctor, getAllAppointments);
  doctorRouter
    .route("/getAllPatients")
    .get(authMiddleware, isDoctor, getAllPatients);

export default doctorRouter;
