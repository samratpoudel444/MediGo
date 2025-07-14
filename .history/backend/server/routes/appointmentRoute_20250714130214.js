import express from "express";
import { bookAppointment } from "../controllers/appointmentController/bookAppointment.js";
import { authMiddleware, isPatient } from "../middleware/authMiddleware.js";

import { deleteAppointment } from "../controllers/appointmentController/deleteAppointment.js";
import { editAppointment } from "../controllers/appointmentController/editAppointment.js";
import { FilterDoctors } from "../controllers/appointmentController/appointmentPriority/getAppointments.js";
import { getAllFinishedAppointment } from "../controllers/appointmentController/getAllFinishedAppointment.js";


const appointmentRoute = express.Router();

appointmentRoute.route("/getAppointment").get(FilterDoctors);
appointmentRoute
  .route("/bookAppointment")
  .post(
    authMiddleware,
    isPatient,
    bookAppointment
  );

appointmentRoute
  .route("/deleteAppointment")
  .post(authMiddleware, isPatient, deleteAppointment);

appointmentRoute
  .route("/editAppointment")
  .put(authMiddleware, isPatient, editAppointment);

export default appointmentRoute;
