import { isAdmin } from "../middleware/authMiddleware.js";
import express from 'express';
import { addPharmacy } from "../controllers/pharmacyController/addPharmacy.js";
const pharmacyRouter= express.Router();

pharmacyRouter.route('/addPharmacy').post( addPharmacy);

export default pharmacyRouter;

