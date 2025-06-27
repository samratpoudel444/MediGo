import medicineTable from "../models/medicineModels";

import axios from "axios";

async function fetchAndSaveMedicines(limit = 14500) {
  try {
    const { data } = await axios.get(
      "https://rxnav.nlm.nih.gov/REST/allconcepts.json?tty=IN"
    );

    const concepts = data.minConceptGroup?.minConcept || [];
    const medicines = concepts.slice(0, limit).map((c) => c.name);

    await medicineTable.insertMany()
    console.log(
      `✅ Saved ${medicines.length} medicine names to medicines.json`
    );
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

fetchAndSaveMedicines();
