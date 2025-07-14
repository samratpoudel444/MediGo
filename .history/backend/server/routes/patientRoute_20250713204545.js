import { uploadPrescription } from "../controllers/scanPrescriptionController/uploadPrescription.js";
import express from 'express';
import upload from "../helper/multerHelper.js";
import { authMiddleware, isPatient } from "../middleware/authMiddleware.js";
import { showAllDoctorByRoles } from "../controllers/patientController/showAllDoctorByRoles.js";
const patientRouter= express.Router();


patientRouter.route('/uploadPrescription').post(upload.single("prescription"),uploadPrescription);
patientRouter.route('/getAllDoctorByRole/:doctorType').get(authMiddleware, isPatient, showAllDoctorByRoles);
patientRouter
  .route("/getAllDoctors")
  .get(authMiddleware, isPatient, getAll);

export default patientRouter;
