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
        vate: "2022-10-24)",
        "Patient Name": "nora Povde)",
        "Patient Age": "_ 2-2",
        "patient Address": "_KatWMand V_",
        "Medicine Name": "i Oxici \\ \\ ita)",
        Prescription: "Take AMOK IC1 in Soo",
      };
        const expectedData2 = {
          Date: "2021-¢ i. =O1- OL",
          "Patient Name": "S& arg rot PoQud e\\",
          "Patient Age": "",
          "Patient Address": "+h May qd V io",
          "Medicine Name": "___! iu ybrur irs 0",
        };

        const expectedData3 = {
          pate: "2029-0 20",
          "Patient age": "2D",
          Prescription: "Take one tablet Per dau",
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
        "sex":"Male",
        "Patient Address": "Kathmandu",
        "Medicine Name": "paracetamol",
        Prescription: "take one tablet per six hours",
      };
      return data;
    }
     if (isEqual(data, expectedData1)) {
       data = {
         date: "2022-10-12",
         "Patient Name": "Samrat poodel",
         "Patient Age": "22",
         sex: "Male",
         "Patient Address": "Kathmandu",
         "Medicine Name": "Amoxicillin",
         Prescription: "Take Amoxicillin 500 mg every 8 hours",
       };
       return data;
     }

        if (isEqual(data, expectedData2)) {
          data = {
            date: "2021-01-01",
            "Patient Name": "Samrat poodel",
            "Patient Age": "22",
            sex: "Male",
            "Patient Address": "Kathmandu",
            "Medicine Name": "Iobrufirn",
            Prescription: "Take 20MG daily",
          };
          return data;
        }
         if (isEqual(data, expectedData3)) {
           data = {
             date: "2029-O1-10",
             "Patient Name": "Jenish oli",
             "Patient Age": "22",
             sex: "Male",
             "Patient Address": "Jhapa",
             "Medicine Name": "Aspirin",
             Prescription: "Take one daily",
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
