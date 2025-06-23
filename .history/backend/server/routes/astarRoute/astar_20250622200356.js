

const astarRouter = express.Router();

adminRouter
  .route("/showAllPatients")
  .get(authMiddleware, isAdmin, getAllPatients);