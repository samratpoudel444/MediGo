

const astarRouter = express.Router();

astarRouter
  .route("/showAllPatients")
  .get(authMiddleware, isAdmin, getAllPatients);