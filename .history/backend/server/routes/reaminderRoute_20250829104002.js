import createRemainder from "../controllers/RemainderController/createRemainder";
import express from express;
import { authMiddleware, isPatient } from "../middleware/authMiddleware";
const remainderRoute = express.Router();



remainderRoute.route('/createRemainder').post(authMiddleware, isPatient, );

export default remainderRoute;