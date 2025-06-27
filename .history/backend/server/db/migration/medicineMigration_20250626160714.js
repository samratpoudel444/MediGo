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
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

async function fetchAndSaveMedicines(limit = 14500) {
  try {
    const { data } = await axios.get(
      "https://rxnav.nlm.nih.gov/REST/allconcepts.json?tty=IN"
    );

    const concepts = data.minConceptGroup?.minConcept || [];

    const medicines = concepts
      .slice(0, limit)
      .map((c) => ({ name: c.name }))
      .filter((med) => med.name && med.name.trim() !== "");

    console.log(`Found ${medicines.length} valid medicine names.`);

    await medicineTable.insertMany(medicines, { ordered: false });

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
