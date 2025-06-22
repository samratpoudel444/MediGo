import { astarAlgorithm } from "../../controllers/astarController/astarAlgorithm.js";

const astarRouter = express.Router();

astarRouter.route("/astar").get(astarAlgorithm);

export default astarRouter;
