import express from "express";
import { errorHandler } from "./server/middleware/errorMiddleware.js";
import dotenv from "dotenv";
import authRouter from "./server/routes/authRoute/authRoute.js";
import doctorRouter from "./server/routes/authRoute/doctorRoute.js";
import connectDB from "./server/helper/dbHelper.js";
import cookieParser from "cookie-parser";
import userRouter from "./server/routes/authRoute/patientRoute.js";
import adminRouter from "./server/routes/adminRoute.js";
import appointmentRoute from "./server/routes/appointmentRoute.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cookieParser());

connectDB();
app.use("/api/v1", authRouter);
app.use("/api/v1", doctorRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", adminRouter);
app.use('/api/v1', appointmentRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
