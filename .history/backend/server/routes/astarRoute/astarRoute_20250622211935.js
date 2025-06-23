import { astarAlgorithm } from "../../controllers/astarController/astarAlgorithm.js";
import express from "express";

const astarRouter = express.Router();

astarRouter.route("/astar").p(astarAlgorithm);

export default astarRouter;
