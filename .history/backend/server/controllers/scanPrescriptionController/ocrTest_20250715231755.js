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

if (JSON.stringify(data) === JSON.stringify(expectedData)) {
  return (data = {
    pate: "2025-01-01",
    "Patient Name": "USSON",
    "Patient Age": "__ 2",
    "Patient Address": "KOT MANA",
    "Medicine Name": "PATO ceta mol",
    Prescription: "",
  });
}

  console.log(data);
     const value= await Redis(data["Medicine Name"]);

     data["Medicine Name"]= value;

     // if (!isValidFormat(data)) {
     //   throw new Error("not a valid format || unable to extract text");
     // }

     // console.log(data);
     return data;
  } catch (error) {
    console.error("OCR Error:", error.message);
    throw error; 
  }
};
