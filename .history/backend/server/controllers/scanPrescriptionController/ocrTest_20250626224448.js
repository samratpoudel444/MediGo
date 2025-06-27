import tesseract from "node-tesseract-ocr";
import { extraxtText, isValidFormat } from "./extractText.js";

export const scanText = async (imagePath) => {
  const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
  };

  try {
    const text = await tesseract.recognize(imagePath, config);
    const data = extraxtText(text);

    console.log(data['Medicine Name'])

    
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
