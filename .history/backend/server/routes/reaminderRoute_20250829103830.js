import createRemainder from "../controllers/RemainderController/createRemainder";
import express from express;
import { authMiddleware, isPatient } from "../middleware/authMiddleware";
const remainderRoute = express.Router();

createRemainder

remainderRoute.route('/createRemainder').post(authMiddleware, isPatient, remainderRoute);

export default