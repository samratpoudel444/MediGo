import { uploadPrescription } from "../controllers/scanPrescriptionController/uploadPrescription.js";
import express from 'express';
import upload from "../helper/multerHelper.js";
import { authMiddleware, isPatient } from "../middleware/authMiddleware.js";
import { showAllDoctorByRoles } from "../controllers/patientController/showAllDoctorByRoles.js";
import { getAllDoctors } from "../controllers/adminController.js/getAllDoctors.js";
get
const patientRouter= express.Router();


patientRouter.route('/uploadPrescription').post(authMiddleware, upload.single("prescription"),uploadPrescription);
patientRouter.route('/getAllDoctorByRole/:doctorType').get(authMiddleware, isPatient, showAllDoctorByRoles);
patientRouter
  .route("/getAllDoctorsForDisplay")
  .get(authMiddleware, isPatient, getAllDoctors);

export default patientRouter;
