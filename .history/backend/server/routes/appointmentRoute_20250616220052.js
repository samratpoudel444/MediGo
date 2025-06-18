import express from "express";
import { bookAppointment } from "../controllers/appointmentController/bookAppointment.js";
import { authMiddleware, isPatient } from "../middleware/authMiddleware.js";
import { validateReqBody } from "../middleware/validateReqBody.js";
import { appointmentSchema } from "../controllers/utils/appointmentValidation.js";
import { deleteAppointment } from "../controllers/appointmentController/deleteAppointment.js";
import { editAppointment } from "../controllers/appointmentController/editAppointment.js";

const appointmentRouter = express.Router();

appointmentRouter
  .route("/bookAppointment")
  .post(
    authMiddleware,
    isPatient,
    validateReqBody(appointmentSchema),
    bookAppointment
  );

appointmentRouter
  .route("/deleteAppointment")
  .post(authMiddleware, isPatient, deleteAppointment);

appointmentRouter
  .route("/editAppointment")
  .put(authMiddleware, isPatient, editAppointment);

export default appointmentRouter;
