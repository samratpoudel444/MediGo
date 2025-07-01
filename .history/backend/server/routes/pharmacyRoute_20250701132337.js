import { isAdmin } from "../middleware/authMiddleware";
import express from express;
import { addPharmacy } from "../controllers/pharmacyController/addPharmacy";
const pharmacyRouter= express.Router();

pharmacyRouter.route('/addPharmacy').post(isAdmin, addPharmacy);

export defa

