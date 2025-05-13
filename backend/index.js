import express from"express";
import { errorHandler } from "./server/middleware/errorMiddleware";
import dotenv from "dotenv";
dotenv.config();


const PORT= process.env.PORT || 4000;
const app= express();


app.use(express.json);


app.use("/api")
app.use(errorHandler);


app