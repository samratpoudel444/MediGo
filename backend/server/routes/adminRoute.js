import express from "express";
import { getAllDoctors } from "../controllers/adminController.js/getAllDoctors.js";
import { getAllPatients } from "../controllers/adminController.js/getAllPatients.js";
import { getDoctorById } from "../controllers/adminController.js/getDoctorById.js";
import { getPatientsById } from "../controllers/adminController.js/getPatientById.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import { deletePatient } from "../controllers/adminController.js/deletePatient.js";
import { signUpUser } from "../controllers/userAuthController/signUpUser.js";


const adminRouter = express.Router();

adminRouter
  .route("/showAllPatients")
  .get(authMiddleware, isAdmin, getAllPatients);
adminRouter
  .route("/showPatientById/:id")
  .get(authMiddleware, isAdmin, getPatientsById);
adminRouter
  .route("/showAllDoctors")
  .get(authMiddleware, isAdmin, getAllDoctors);
adminRouter
  .route("/showDoctorById/:id")
  .get(authMiddleware, isAdmin, getDoctorById);

adminRouter.route('/deletePatient/:id').get(authMiddleware, isAdmin, deletePatient );
adminRouter.route('/createDoctor').post(authMiddleware, isAdmin, signUpUser )


export default adminRouter;
