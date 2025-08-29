import createRemainder from "../controllers/RemainderController/createRemainder";
import express from express;
import { authMiddleware, isAdmin } from "../middleware/authMiddleware";
const remainderRoute = express.Router();

createRemainder

remainderRoute.route('/').post(authMiddleware, isUse)