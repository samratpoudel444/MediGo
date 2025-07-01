import { isAdmin } from "../middleware/authMiddleware.js";
import express from 'express';
import { addPharmacy } from "../controllers/pharmacyController/addPharmacy.js";
import { deletePharmacy } from "../controllers/pharmacyController/deletePharmacy.js";
import { approvePharmacy } from "../controllers/pharmacyController/approvePharmacy.js";
const pharmacyRouter= express.Router();

pharmacyRouter.route('/addPharmacy').post( addPharmacy);
pharmacyRouter.route("/removePharmacy").post(deletePharmacy);
pharmacyRouter.route("/addPharmacy").post(approvePharmacy);

export default pharmacyRouter;

