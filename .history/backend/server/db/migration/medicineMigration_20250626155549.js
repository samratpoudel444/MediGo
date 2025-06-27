import medicineTable from "../models/medicineModels.js";

import axios from "axios";

async function fetchAndSaveMedicines(limit = 14500) {
  try {
    const { data } = await axios.get(
      "https://rxnav.nlm.nih.gov/REST/allconcepts.json?tty=IN"
    );

    const concepts = data.minConceptGroup?.minConcept || [];
    const medicines = concepts.slice(0, limit).map(c => ({ name: c.name }));
    for(i=0; i<14500; i++)
    {
        await medicineTable.in
    }
    await medicineTable.insertMany(medicines);
      console.log(`✅ Successfully inserted ${result.length} medicines.`);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}


fetchAndSaveMedicines();
