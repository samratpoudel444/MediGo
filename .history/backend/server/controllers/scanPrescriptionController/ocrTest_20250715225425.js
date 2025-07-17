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

    const value= await Redis(data["Medicine Name"]);
    if()
    

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
