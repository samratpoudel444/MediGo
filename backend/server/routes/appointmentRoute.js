import { express } from 'express';
import { bookAppointment } from '../controllers/appointmentController/bookAppointment.js';
import { isPatient } from '../middleware/authMiddleware.js';
import { validateReqBody } from '../middleware/validateReqBody.js';
import { appointmentSchema } from '../controllers/utils/appointmentValidation.js';

const router = express.Router;

router.post("/bookAppointment",isPatient,validateReqBody(appointmentSchema), bookAppointment)