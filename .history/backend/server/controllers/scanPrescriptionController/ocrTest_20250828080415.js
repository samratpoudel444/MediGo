// scanText.js
import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { extractText } from "./extractText.js";

export const scanText = async (imagePath) => {
  try {
    const form = new FormData();
    form.append("apikey", "helloworld");
    form.append("file", fs.createReadStream(imagePath));
    form.append("language", "eng");
    form.append("OCREngine", 2);

    const res = await axios.post("https://api.ocr.space/parse/image", form, {
      headers: form.getHeaders(),
    });

    const extractedText = res.data.ParsedResults?.[0]?.ParsedText || "";
    if (!extractedText.trim()) throw new Error("Extracted data is empty");

    console.log("OCR Text:\n", extractedText);

    const client = new GoogleGenerativeAI(
      "AIzaSyDlW1PWWuA8nBMuHiCaT0ut8Y_vGS72qpQ"
    );
    const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent([
      { text: `Summarize this medical prescription:\n${extractedText}` },
    ]);

    // const data = extractText(extractedText);

    return {
      rawText: extractText,
      summary:
        response.output_text ||
        response.response.candidates[0].content.parts[0].text,
    };
  } catch (error) {
    console.error("OCR Error:", error.message);
    throw error;
  }
};
