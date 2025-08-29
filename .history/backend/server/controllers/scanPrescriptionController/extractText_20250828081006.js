// extractText.js
export const extractText = (ocrText) => {
  const data = {
    date: "",
    patientName: "",
    age: "",
    sex: "",
    address: "",
    medicineName: "",
    prescription: "",
    doctorSignature: "",
  };

  try {
    const lines = ocrText
      .split(/\n|,/)
      .map((l) => l.trim())
      .filter(Boolean);

    lines.forEach((line) => {
      if (/date[:\-]/i.test(line)) data.date = line.split(/[:\-]/i)[1]?.trim();
      if (/patient name/i.test(line))
        data.patientName = line.split(/[:\-]/i)[1]?.trim();
      if (/age/i.test(line)) data.age = line.split(/[:\-]/i)[1]?.trim();
      if (/sex/i.test(line)) data.sex = line.split(/[:\-]/i)[1]?.trim();
      if (/address/i.test(line)) data.address = line.split(/[:\-]/i)[1]?.trim();
      if (/medicine/i.test(line))
        data.medicineName = line.split(/[:\-]/i)[1]?.trim();
      if (/proscription|prescription/i.test(line))
        data.prescription = line.split(/[:\-]/i)[1]?.trim();
      if (/doctor signature/i.test(line)) data.doctorSignature = "Signed";
    });
  } catch (err) {
    console.error("Parsing Error:", err.message);
  }

  return data;
};
