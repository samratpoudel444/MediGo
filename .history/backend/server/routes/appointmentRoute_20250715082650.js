import express from "express";
import { bookAppointment } from "../controllers/appointmentController/bookAppointment.js";
import { authMiddleware, isDoctor, isPatient } from "../middleware/authMiddleware.js";

import { deleteAppointment } from "../controllers/appointmentController/deleteAppointment.js";
import { editAppointment } from "../controllers/appointmentController/editAppointment.js";
import { FilterDoctors } from "../controllers/appointmentController/appointmentPriority/getAppointments.js";
import { getAllFinishedAppointment } from "../controllers/appointmentController/getAllFinishedAppointment.js";
import { getAllUnApprovedAppointment } from "../controllers/appointmentController/gerAllUnapprovedAppointment.js";
import { getAllAppointmentForDoctor } from "../controllers/appointmentController/getAllAppointmentForDoctor.js";
import { getAllTodaysAppointmentForDoctor } from "../controllers/appointmentController/getAllToadysAppointment.js";


getAllAppointmentForDoctor
const appointmentRoute = express.Router();

appointmentRoute
  .route("/getAllTodaysAppointmentForDoctor")
  .get(authMiddleware, isDoctor, getAllTodaysAppointmentForDoctor);
appointmentRoute.route("/getAllAppointmentForDoctor").get(authMiddleware, isDoctor, getAllAppointmentForDoctor);
appointmentRoute.route("/getAllFinishedAppointments").get(authMiddleware, isPatient, getAllFinishedAppointment);
appointmentRoute
  .route("/getAllRemainingAppointments")
  .get(authMiddleware, isPatient, getAllUnApprovedAppointment);
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
