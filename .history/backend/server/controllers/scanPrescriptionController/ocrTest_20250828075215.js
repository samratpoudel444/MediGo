import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import { GoogleGenerativeAI } from "@google/generative-ai";

// 1️⃣ Extract text from image using OCR.space
async function extractTextFromImageOCR(imagePath) {
  const form = new FormData();
  form.append("apikey", "helloworld"); // free demo key
  form.append("file", fs.createReadStream(imagePath));
  form.append("language", "eng");
  form.append("OCREngine", 2);

  const res = await axios.post("https://api.ocr.space/parse/image", form, {
    headers: form.getHeaders(),
  });

  return res.data.ParsedResults?.[0]?.ParsedText || "";
}

// 2️⃣ Send extracted text to Gemini
async function summarizeWithGemini(text) {
  const client = new GoogleGenerativeAI("YOUR_API_KEY");
  const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

  const response = await model.generateContent([
    { text: `Summarize this medical prescription:\n${text}` },
  ]);

  console.log("Gemini Summary:\n", response.output_text);
}

// 3️⃣ Main
(async () => {
  try {
    const extractedText = await extractTextFromImageOCR("b.jpg");
    console.log("OCR Text:\n", extractedText);

    await summarizeWithGemini(extractedText);
  } catch (err) {
    console.error("Error:", err.message);
  }
})();
