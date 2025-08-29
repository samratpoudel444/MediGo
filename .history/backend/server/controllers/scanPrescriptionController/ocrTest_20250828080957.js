// scanText.js
import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { extractText } from "./extractText.js";

export const scanText = async (imagePath) => {
  try {
    // OCR call
    const form = new FormData();
    form.append("apikey", "helloworld"); // free demo key
    form.append("file", fs.createReadStream(imagePath));
    form.append("language", "eng");
    form.append("OCREngine", 2);

    const res = await axios.post("https://api.ocr.space/parse/image", form, {
      headers: form.getHeaders(),
    });

    const extractedText = res.data.ParsedResults?.[0]?.ParsedText || "";
    if (!extractedText.trim()) throw new Error("Extracted data is empty");

    console.log("OCR Raw Text:\n", extractedText);

    // Parse structured fields
    const structuredData = extractText(extractedText);

    // Summarize with Gemini
    const client = new GoogleGenerativeAI(process.env.GEMINI_KEY);
    const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent([
      { text: `Summarize this medical prescription:\n${extractedText}` },
    ]);

    const summary =
      response.output_text ||
      response.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "";

    return {
      rawText: extractedText,
      structured: structuredData,
      summary,
    };
  } catch (error) {
    console.error("OCR Error:", error.message);
    throw error;
  }
};
