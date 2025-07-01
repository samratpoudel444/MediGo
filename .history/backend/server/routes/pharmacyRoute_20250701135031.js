import { isAdmin } from "../middleware/authMiddleware.js";
import express from 'express';
import { addPharmacy } from "../controllers/pharmacyController/addPharmacy.js";
import { deletePharmacy } from "../controllers/pharmacyController/deletePharmacy.js";
import { approvePharmacy } from "../controllers/pharmacyController/approvePharmacy.js";
const pharmacyRouter= express.Router();

pharmacyRouter.route('/addPharmacy').post( addPharmacy);
pharmacyRouter.route("/removePharmacy").delete(deletePharmacy);
pharmacyRouter.route("/addPharmacy").put(approvePharmacy);

export default pharmacyRouter;

