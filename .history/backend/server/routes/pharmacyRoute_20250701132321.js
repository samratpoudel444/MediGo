import { isAdmin } from "../middleware/authMiddleware";
import express from express;
const pharmacyRouter= express.Router();

pharmacyRouter.route('/addPharmacy').post(isAdmin, addPhar)

