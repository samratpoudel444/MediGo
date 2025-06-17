import express from "express";
import { bookAppointment } from "../controllers/appointmentController/bookAppointment.js";
import { authMiddleware, isPatient } from "../middleware/authMiddleware.js";
import { validateReqBody } from "../middleware/validateReqBody.js";
import { appointmentSchema } from "../controllers/utils/appointmentValidation.js";
import { deleteAppointment } from "../controllers/appointmentController/deleteAppointment.js";
import { editAppointment } from "../controllers/appointmentController/editAppointment.js";
import { FilterDoctors } from "../controllers/appointmentController/appointmentPriority/getAppointments.js";

const appointmentRoute = express.Router();

appointmentRoute.route("/getAppointment").get(getAppointments);
appointmentRoute
  .route("/bookAppointment")
  .post(
    authMiddleware,
    isPatient,
    validateReqBody(appointmentSchema),
    bookAppointment
  );

appointmentRoute
  .route("/deleteAppointment")
  .post(authMiddleware, isPatient, deleteAppointment);

appointmentRoute
  .route("/editAppointment")
  .put(authMiddleware, isPatient, editAppointment);

export default appointmentRoute;
