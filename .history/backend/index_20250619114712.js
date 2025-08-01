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
import patientRouter from "./server/routes/patientRoute.js";
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
const allowedOrigins = ["http://localhost:5174", "http://localhost:5173"];

app.use(
  cors({
     origin: "*",
    // origin: function (origin, callback) {

    //   if (allowedOrigins.indexOf(origin) !== -1) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);



app.use(express.json());
app.use(cookieParser());

connectDB();
app.use(express.static("uploads"));
app.use("/api/v1", authRouter);
app.use("/api/v1", doctorRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", adminRouter);
app.use('/api/v1', appointmentRoute);
app.use('/api/v1', patientRouter)

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
