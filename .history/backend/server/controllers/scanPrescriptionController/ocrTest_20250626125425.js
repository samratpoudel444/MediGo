import tesseract from "node-tesseract-ocr";
import { extraxtText, isValidFormat } from "./extractText.js";


export const scanText = (imagePath) => {
  const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
  };

//   const imagePath = "/Users/samrat/Desktop/copy/test/viber_scanned.jpg";

  tesseract
    .recognize(imagePath, config)
    .then((text) => {
      const data =awa extraxtText(text);

      if (!isValidFormat(data)) {
        return Error("not a vaild format ");
      }

      return data;
    })
    .catch((error) => {
      console.error("OCR Error:", error.message);
    });
};

