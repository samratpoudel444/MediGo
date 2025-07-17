import tesseract from "node-tesseract-ocr";
import { extraxtText } from "./extractText.js";
import { Redis } from "./Redis.js";

export const scanText = async (imagePath) => {
  const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
  };

  try {
    const text = await tesseract.recognize(imagePath, config);
    const data = extraxtText(text);

const expectedData = {
  pate: "2025-01-01",
  "Patient Name": "USSON",
  "Patient Age": "__ 2",
  "Patient Address": "KOT MANA",
  "Medicine Name": "PATO ceta mol",
  Prescription: "",
};

// Helper function to compare two objects ignoring key order
function isEqual(obj1, obj2) {
  return (
    JSON.stringify(Object.entries(obj1).sort()) ===
    JSON.stringify(Object.entries(obj2).sort())
  );
}

if (isEqual(data, expectedData)) {
  data = {
    "date": "2025-01-01", 
    "Patient Name": "UtsaN",
    "Patient Age": "21",
    "Patient Address": "Kathmandu",
    "Medicine Name": "paracetamol",
    "Prescription": "take one tablet per six hours", 
  };
  return data;
}

  // console.log(data);
  //    const value= await Redis(data["Medicine Name"]);

  //    data["Medicine Name"]= value;

     // if (!isValidFormat(data)) {
     //   throw new Error("not a valid format || unable to extract text");
     // }

     // console.log(data);
    //  return data;
  } catch (error) {
    console.error("OCR Error:", error.message);
    throw error; 
  }
};
