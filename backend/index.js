import express from"express";
import { errorHandler } from "./server/middleware/errorMiddleware.js";
import dotenv from "dotenv";
import authRouter from "./server/routes/authRoute/authRoute.js";
import connectDB from "./server/helper/dbHelper.js";
dotenv.config();


const PORT= process.env.PORT || 4000;
const app= express();


app.use(express.json());

connectDB()
app.use("/api/v1", authRouter);
app.use(errorHandler);


app.listen(PORT, ()=>
{
    console.log(`server listening on port ${PORT}`)
})