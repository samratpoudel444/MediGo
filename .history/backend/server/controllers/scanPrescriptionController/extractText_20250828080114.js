// extractText.js
const expectedFields = [
  "Date",
  "Patient Name",
  "Patient Age",
  "Sex",
  "Patient Address",
  "Medicine Name",
  "Prescription",
];

export const extractText = (rawText) => {
  const parsedData = {};

  rawText.split("\n").forEach((line) => {
    const [key, ...rest] = line.split(":");
    if (key && rest.length > 0) {
      let cleanedKey = key.trim();
      let value = rest.join(":").trim();

      // Normalize keys
      if (/proscription/i.test(cleanedKey)) cleanedKey = "Prescription";
      if (/prescription/i.test(cleanedKey)) cleanedKey = "Prescription";

      // Match ignoring case
      const match = expectedFields.find(
        (f) => f.toLowerCase() === cleanedKey.toLowerCase()
      );
      if (match) parsedData[match] = value;
    }
  });

  return parsedData;
};

export const isValidFormat = (parsed) => {
  return expectedFields.every((field) => Object.keys(parsed).includes(field));
};
