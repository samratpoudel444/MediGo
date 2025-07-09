import express from "express";
import { getAllDoctors } from "../controllers/adminController.js/getAllDoctors.js";
import { getAllPatients } from "../controllers/adminController.js/getAllPatients.js";
import { getDoctorById } from "../controllers/adminController.js/getDoctorById.js";
import { getPatientsById } from "../controllers/adminController.js/getPatientById.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import { deletePatient } from "../controllers/adminController.js/deletePatient.js";
import { signUpUser } from "../controllers/userAuthController/signUpUser.js";
import { deleteDoctor } from "../controllers/adminController.js/deleteDoctor.js";
import { userCount } from "../controllers/adminController.js/userCount.js";
import { getAllPharmacies } from "../controllers/adminController.js/getAllPharmacies.js";


const adminRouter = express.Router();

adminRouter.route("/userCount").get(authMiddleware, isAdmin, userCount);

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

  adminRouter
    .route("/getAllPharmacies")
    .get(authMiddleware, isAdmin, getAllPharmacies);

    adminRouter
      .route("/deletePharmacies")
      .get(authMiddleware, isAdmin, getAllPharmacies);


adminRouter.route('/deletePatient/:id').delete(authMiddleware, isAdmin, deletePatient );
adminRouter.route('/deleteDoctor/:id').delete(authMiddleware, isAdmin, deleteDoctor );
adminRouter.route('/createDoctor').post(authMiddleware, isAdmin, signUpUser )


export default adminRouter;
