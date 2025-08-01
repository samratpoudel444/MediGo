import medicineTable from "../models/medicineModels.js";

import axios from "axios";

async function fetchAndSaveMedicines(start, end) {
  try {
    const { data } = await axios.get(
      "https://rxnav.nlm.nih.gov/REST/allconcepts.json?tty=IN"
    );

    const concepts = data.minConceptGroup?.minConcept || [];
    const medicines = concepts.slice(start, end).map(c => ({ name: c.name }));
    await medicineTable.insertMany(medicines);
      console.log(`✅ Successfully inserted ${result.length} medicines.`);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

let i
for( i=0; i<14500; i=i+50)
{
    if(i+500 < 14500)
    fetchAndSaveMedicines(i, i + 50);
}

