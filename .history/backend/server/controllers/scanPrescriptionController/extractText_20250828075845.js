const expectedFields = [
  "Date",
  "Patient Name",
  "Patient Age",
  "Sex",
  "Patient Address",
  "Medicine Name",
  "Prescription",
];

export const extraxtText = (rawText) => {
  const parsedData = {};

  rawText.split("\n").forEach((line) => {
    const [key, ...rest] = line.split(":");
    if (key && rest.length > 0) {
      let cleanedKey = key.trim();
      let value = rest.join(":").trim();

      // Normalize keys (fix common OCR mistakes)
      if (/proscription/i.test(cleanedKey)) cleanedKey = "Prescription";
      if (/prescription/i.test(cleanedKey)) cleanedKey = "Prescription";

      // Capitalize first letter for consistency
      if (expectedFields.includes(cleanedKey)) {
        parsedData[cleanedKey] = value;
      }
    }
  });

  return parsedData;
};

// Optional: check if parsed data contains all required fields
export const isValidFormat = (parsed) => {
  return expectedFields.every((field) => Object.keys(parsed).includes(field));
};
