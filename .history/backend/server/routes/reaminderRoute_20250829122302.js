import createRemainder from "../controllers/RemainderController/createRemainder.js";
import express from "express";
import { authMiddleware, isPatient } from "../middleware/authMiddleware.js";
import listAllRemainder from "../controllers/RemainderController/listAllRemainder.js";
import deleteRemaider from "../controllers/RemainderController/deleteRemainder.js";

const remainderRoute = express.Router();



remainderRoute.route('/createRemainder').post(authMiddleware, isPatient,createRemainder );

remainderRoute
  .route("/listRemainder")
  .get(authMiddleware, isPatient, listAllRemainder);

remainderRoute
  .route("/DeleteRemainder")
  .post(authMiddleware, isPatient, deleteRemaider);


export default remainderRoute;