import tesseract from "node-tesseract-ocr";
import { extraxtText, isValidFormat } from "./extractText.js";
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

   if (
     (data = {
       vate: "2022-10-24)",
       "Patient Name": "nora Povde)",
       "Patient Age": "_ 2-2",
       "patient Address": "_KatWMand V_",
       "Medicine Name": "i Oxici \\ \\ ita)",
       Prescription: "Take AMOK IC1 in Soo",
     })
   )
     // const value= await Redis(data["Medicine Name"]);

     // data["Medicine Name"]= value;

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
