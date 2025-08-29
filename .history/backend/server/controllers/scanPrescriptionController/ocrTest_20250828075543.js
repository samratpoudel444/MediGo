import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const scanText = async (imagePath) => {
  try {
    // 1️⃣ Extract text from image using OCR.space
    const form = new FormData();
    form.append("apikey", "helloworld"); // free demo key
    form.append("file", fs.createReadStream(imagePath));
    form.append("language", "eng");
    form.append("OCREngine", 2);

    const res = await axios.post("https://api.ocr.space/parse/image", form, {
      headers: form.getHeaders(),
    });

    const extractedText = res.data.ParsedResults?.[0]?.ParsedText || "";
    if (!extractedText.trim()) {
      throw new Error("Extracted data is empty or invalid format");
    }

    console.log("OCR Text:\n", extractedText);

    // 2️⃣ Send extracted text to Gemini
    const client = new GoogleGenerativeAI("");
    const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

    const response = await model.generateContent([
      { text: `Summarize this medical prescription:\n${extractedText}` },
    ]);

    console.log("Gemini Summary:\n", response.output_text);

    return {
      rawText: extractedText,
      summary: response.output_text,
    };
  } catch (error) {
    console.error("OCR Error:", error.message);
    throw error;
  }
};
