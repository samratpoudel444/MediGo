import express  from 'express';
import { bookAppointment } from '../controllers/appointmentController/bookAppointment.js';
import { authMiddleware, isPatient } from '../middleware/authMiddleware.js';
import { validateReqBody } from '../middleware/validateReqBody.js';
import { appointmentSchema } from '../controllers/utils/appointmentValidation.js';

const router = express.Router();

router.route("/bookAppointment").post(authMiddleware , isPatient,validateReqBody(appointmentSchema), bookAppointment);


export default router;