import { astarAlgorithm } from "../../controllers/astarController/astarAlgorithm";

const astarRouter = express.Router();

astarRouter.route("/astar").get(astarAlgorithm);

export default astarRouter;
