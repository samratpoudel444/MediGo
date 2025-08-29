import createRemainder from "../controllers/RemainderController/createRemainder.js";
import express from "express";
import { authMiddleware, isPatient } from "../middleware/authMiddleware.js";
import listAllRemainder from "../controllers/RemainderController/listAllRemainder.js";
listAllRemainder
const remainderRoute = express.Router();



remainderRoute.route('/createRemainder').post(authMiddleware, isPatient,createRemainder );

export default remainderRoute;