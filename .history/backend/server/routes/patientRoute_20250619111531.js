import { uploadPrescription } from "../controllers/patientController/uploadPrescription.js";
import express from 'express';
import upload from "../helper/multerHelper.js";
const patientRouter= express.Router();


patientRouter.route('/uploadPrescription').post(upload.single("prescription"),uploadPrescription);
patientRouter.route('/getAllDoctorB')

export default patientRouter;
