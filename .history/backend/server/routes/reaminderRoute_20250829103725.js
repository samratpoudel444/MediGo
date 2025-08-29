import createRemainder from "../controllers/RemainderController/createRemainder";
import express from express;
import { authMiddleware } from "../middleware/authMiddleware";
const remainderRoute = express.Router();
authMiddleware
createRemainder

remainderRoute.route('/').post()