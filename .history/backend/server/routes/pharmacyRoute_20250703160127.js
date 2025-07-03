import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import express from 'express';
import { addPharmacy } from "../controllers/pharmacyController/addPharmacy.js";
import { deletePharmacy } from "../controllers/pharmacyController/deletePharmacy.js";
import { approvePharmacy } from "../controllers/pharmacyController/approvePharmacy.js";
import { showAllPharmacy } from "../controllers/pharmacyController/showAllPharmacy.js";

const pharmacyRouter= express.Router();

pharmacyRouter.route('/addPharmacy').post(authMiddleware, isAdmin, addPharmacy);
pharmacyRouter.route("/removePharmacy/:id").delete(deletePharmacy);
pharmacyRouter.route("/approvePharmacy/:id").put(approvePharmacy);
pharmacyRouter.route("/showAllPharmacies").get(authMiddleware, isUser, showAllPharmacy);

export default pharmacyRouter;

