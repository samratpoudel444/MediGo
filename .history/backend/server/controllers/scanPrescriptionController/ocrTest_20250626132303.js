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
    const data = extractText(text);

    // if (!isValidFormat(data)) {
    //   throw new Error("not a valid format");
    // }

    console.log(data);
    return data; // This will now be properly returned to the caller
  } catch (error) {
    console.error("OCR Error:", error.message);
    throw error; // so the caller can handle the error
  }
};
