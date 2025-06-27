import tesseract from "node-tesseract-ocr";
import { extraxtText } from "./extractText";
is

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
      const data = extraxtText(text);

      if (!isValidFormat(data)) {
        console.log("error");
      }

      console.log(data);
    })
    .catch((error) => {
      console.error("OCR Error:", error.message);
    });
};

