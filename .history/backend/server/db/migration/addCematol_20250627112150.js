import mongoose from "mongoose";
import axios from "axios";
import medicineTable from "../models/medicineModels.js";
import dotenv from "dotenv";
dotenv.config({ path: "/Users/samrat/Desktop/MediGo/backend/.env" });

console.log(process.env.MONGO_DB_URL);
const MONGODB_URI = process.env.MONGO_DB_URL;

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(" Connected to MongoDB");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
    process.exit(1);
  }
}

async function fetchAndSaveMedicines(limit = 14500) {
  try {


    await medicineTable.insertOne(name:paracetamo;, { ordered: false });

    console.log("Medicines inserted successfully.");
    process.exit(0);
  } catch (error) {
    console.error(" Error during migration:", error.message);
    process.exit(1);
  }
}

async function migrate() {
  await connectDB();
  await fetchAndSaveMedicines();
}

migrate();
