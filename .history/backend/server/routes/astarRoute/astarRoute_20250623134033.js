//import { astarAlgorithm } from "../../controllers/astarController/astarAlgorithm.js";
import express from "express";

const astarRouter = express.Router();

astarRouter.route("/astar").post(astarAlgorithm);

export default astarRouter;
