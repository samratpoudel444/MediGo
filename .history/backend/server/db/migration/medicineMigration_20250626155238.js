import mongoose from "mongoose";
import medicineTable from "../models/medicineModels.js";

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/yourdbname", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

async function fetchAndSaveMedicines(limit = 14500) {
  try {
    const { data } = await axios.get(
      "https://rxnav.nlm.nih.gov/REST/allconcepts.json?tty=IN"
    );

    const concepts = data.minConceptGroup?.minConcept || [];

    const medicines = concepts.slice(0, limit).map((c) => ({ name: c.name }));

    const result = await medicineTable.insertMany(medicines, {
      ordered: false,
    });
    console.log(`✅ Inserted ${result.length} medicines.`);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

async function migrate() {
  await connectDB();
  await fetchAndSaveMedicines();
  mongoose.disconnect();
}

migrate();
