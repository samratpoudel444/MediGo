import express from "express";
import { getAllDoctors } from "../controllers/adminController/getAllDoctors.js";
import { getAllPatients } from "../controllers/adminController/getAllPatients.js";
import { getDoctorById } from "../controllers/adminController/getDoctorById.js";
import { getPatientsById } from "../controllers/adminController/getPatientById.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import { deletePatient } from "../controllers/adminController/deletePatient.js";
import { signUpUser } from "../controllers/userAuthController/signUpUser.js";
import { deleteDoctor } from "../controllers/adminController/deleteDoctor.js";
import { userCount } from "../controllers/adminController/userCount.js";
import { getAllPharmacies } from "../controllers/adminController/getAllPharmacies.js";
import { deletePharmacy } from "../controllers/adminController/deletePharmacy.js";
import { getAllUnapprovedDoctors } from "../controllers/adminController/getAllUnapprovedDoctor.js";
import { approveDoctor } from "../controllers/adminController/approveDoctors.js";

const adminRouter = express.Router();

adminRouter.route("/userCount").get(authMiddleware, isAdmin, userCount);

adminRouter
  .route("/showAllPatients")
  .get(authMiddleware, isAdmin, getAllPatients);

adminRouter
  .route("/approveDoctor/:id")
  .patch(authMiddleware, isAdmin, approveDoctor);

adminRouter
  .route("/showAllUnApprovedDoctors")
  .get(authMiddleware, isAdmin, getAllUnapprovedDoctors);
adminRouter
  .route("/showPatientById/:id")
  .get(authMiddleware, isAdmin, getPatientsById);
adminRouter
  .route("/showAllDoctors")
  .get(authMiddleware, isAdmin, getAllDoctors);
adminRouter
  .route("/showDoctorById/:id")
  .get(authMiddleware, isAdmin, getDoctorById);

adminRouter
  .route("/getAllPharmacies")
  .get(authMiddleware, isAdmin, getAllPharmacies);

adminRouter
  .route("/deletePharmacies/:id")
  .delete(authMiddleware, isAdmin, deletePharmacy);

adminRouter
  .route("/deletePatient/:id")
  .delete(authMiddleware, isAdmin, deletePatient);
adminRouter
  .route("/deleteDoctor/:id")
  .delete(authMiddleware, isAdmin, deleteDoctor);
adminRouter.route("/createDoctor").post(authMiddleware, isAdmin, signUpUser);

export default adminRouter;
