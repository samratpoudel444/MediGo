import { express } from 'express';
import { bookAppointment } from '../controllers/appointmentController/bookAppointment.js';

const router = express.router;

router.post("/bookAppointment",bookAppointment)