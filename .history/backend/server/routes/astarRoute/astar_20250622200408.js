

const astarRouter = express.Router();

astarRouter
  .route("/astar")
  .get(authMiddleware, isAdmin, getAllPatients);