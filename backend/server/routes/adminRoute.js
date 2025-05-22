import express from "express";
import { getAllDoctors } from "../controllers/adminController.js/getAllDoctors";
import { getAllPatients } from "../controllers/adminController.js/getAllPatients";
import { getDoctorById } from "../controllers/adminController.js/getDoctorById";
import { getPatientsById } from "../controllers/adminController.js/getPatientById";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware";
const adminRouter = express.Router();

adminRouter
  .route("/showAllPatients")
  .get(authMiddleware, isAdmin, getAllPatients);
adminRouter
  .route("/showPatientById")
  .get(authMiddleware, isAdmin, getPatientsById);
adminRouter
  .route("/showAllDoctors")
  .get(authMiddleware, isAdmin, getAllDoctors);
adminRouter
  .route("/showDoctorById")
  .get(authMiddleware, isAdmin, getDoctorById);

export default adminRouter;
