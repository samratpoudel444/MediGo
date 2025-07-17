const expectedFields = [
  "Date",
  "Patient Name",
  "Patient Age",
  "Sex",
  "Patient Address",
  "Medicine Name",
  "Prescription",
];

export const extraxtText= (rawText) =>{
  const parsedData = {};
  rawText.split("\n").forEach((line) => {
    const [key, ...rest] = line.split(":");
    if (key && rest.length > 0) {
      parsedData[key.trim()] = rest.join(":").trim();
    }
  });
  return parsedData;
}

// export const isValidFormat=(parsed)=> {
//   return expectedFields.every((field) => Object.keys(parsed).includes(field));
// }

