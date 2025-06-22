import { astarAlgorithm } from "../../controllers/astarController/astarAlgorithm.js";
import express from "express";

const astarRouter = express.Router();

astarRouter.route("/astar").po(astarAlgorithm);

export default astarRouter;
