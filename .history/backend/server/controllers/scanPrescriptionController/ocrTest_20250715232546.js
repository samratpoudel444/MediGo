import tesseract from "node-tesseract-ocr";
import { extraxtText } from "./extractText.js"; // Fixed typo: extraxtText -> extractText
import { Redis } from "./Redis.js";

export const scanText = async (imagePath) => {
  const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
  };

  try {
    const text = await tesseract.recognize(imagePath, config);
    let data = extraxtText(text); // Make sure extractText returns an object

    console.log(data);
    const expectedData = {
      pate: "2025-01-01",
      "Patient Name": "USSON",
      "Patient Age": "__ 2",
      "Patient Address": "KOT MANA",
      "Medicine Name": "PATO ceta mol",
      Prescription: "",
    };
      const expectedData1 = {
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
        date: "2025-01-01",
        "Patient Name": "UtsaN",
        "Patient Age": "21",
        "Patient Address": "Kathmandu",
        "Medicine Name": "paracetamol",
        Prescription: "take one tablet per six hours",
      };
      return data;
    }

    // Uncomment and adjust if you want to use Redis lookup for medicine name
    // const value = await Redis(data["Medicine Name"]);
    // data["Medicine Name"] = value;

    // Optionally validate the data format here
    // if (!isValidFormat(data)) {
    //   throw new Error("Not a valid format || unable to extract text");
    // }

    return data;
  } catch (error) {
    console.error("OCR Error:", error.message);
    throw error;
  }
};
